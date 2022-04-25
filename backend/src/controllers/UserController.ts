import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'

import {User} from '../entities/User'
import {Debate} from '../entities/Debate'
import { validate } from 'class-validator';

import {returnValidateErrorString} from '../helpers/returnValidationError'
class UserController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            return response.send({userID: request.userId})        
        } catch (error) {
            console.error(error)
        }
    }

    async all(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);

        try {
            const users = await userRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.patentMembersUser", "patentMember")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .getMany()
                
            return response.send({ users });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {        
        const userRepository = getRepository(User);
        const user = await userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.patentMembersUser", "patentMember")
            .leftJoinAndSelect("patentMember.groupPatentMember", "group")            
            .leftJoinAndSelect("user.conDebatesUser", "conDebate")            
            .leftJoinAndSelect("user.proDebatesUser", "proDebate")            
            .leftJoinAndSelect("conDebate.debateSideDebate", "debateCon")            
            .leftJoinAndSelect("proDebate.debateSideDebate", "debatePro")            
            .where("user.idUser = :id", {id: request.params.id})
            .loadRelationCountAndMap("debateCon.quantityViews", 'debateCon.viewsDebate')
            .loadRelationCountAndMap("debatePro.quantityViews", 'debatePro.viewsDebate')
            .getOne()
            
        let mostViewedCon = 0, mostViewedPro = 0        

        for (var i = 0;i < user.conDebatesUser.length;i++) {
            mostViewedCon = user.conDebatesUser[i].debateSideDebate.quantityViews
                            > user.conDebatesUser[mostViewedCon].debateSideDebate.quantityViews ? i : mostViewedCon
        }
        for (var i = 0;i < user.proDebatesUser.length;i++) {
            mostViewedPro = user.proDebatesUser[i].debateSideDebate.quantityViews
                            > user.proDebatesUser[mostViewedPro].debateSideDebate.quantityViews ? i : mostViewedPro
        }
                
        let mostViewedDebate 

        if(user.proDebatesUser[mostViewedCon])
            mostViewedDebate = user.proDebatesUser[mostViewedCon].debateSideDebate.quantityViews
              > user.proDebatesUser[mostViewedPro].debateSideDebate.quantityViews ? 
                user.proDebatesUser[mostViewedCon].debateSideDebate : 
                user.proDebatesUser[mostViewedPro].debateSideDebate 

        return response.send({ 
            user: {
                ...user,
                mostViewedDebate,
                madeDebates: user.proDebatesUser.length + user.proDebatesUser.length,
                photoProfileUser: user.photoProfileUser?.toString()
            } 
        });
    }    

    async auth(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User)                
                
        try {            
            const {emailUser, passwordUser} = request.body.user as User
                    
            console.log('apareça aqui')
            if(!passwordUser || passwordUser == '') {
                return response.send({error: "userpassword undefined"})
            }
            if(!emailUser || emailUser == '') {
                return response.send({error: "useremail undefined"})
            }
            
            const user = await userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.patentMembersUser", "patent")
            .where("user.emailUser = :emailUser", {
                emailUser
            })
            .getOne()
    
            if(!user) {
                return response.status(208).send({error: "useremail not found"})
            }
    
            const isValidPassword = await bcrypt.compareSync(
                passwordUser,
                user.passwordUser
            )
    
            if(!isValidPassword) {
                return response.status(207).send({error: "password don't match"})
            }
    
            const token = jwt.sign({id: user.idUser}, "secret", {
                expiresIn: "1d"
            })
    
            delete user.passwordUser
    
            return response.send({
                user: {
                    ...user, 
                    photoProfileUser: user.photoProfileUser?.toString(),
                    themeActive: 'light'
                },
                token
            })
        } catch (error) {
            console.error(error)
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        
        try {
            
            const { nameUser, passwordUser, photoProfileUser, emailUser } =
              request.body.user as User;                            
        
            const userexists = await userRepository.findOne({ where: { emailUser } });
            
            if (userexists)
              return response.status(209).send({ error: "Email exists" });                    
        
            const user = userRepository.create({
                emailUser,
                nameUser,
                passwordUser,
                photoProfileUser,
                descriptionUser: ''                
            });
    
            const errors = await validate(user)
                
            console.log({error: returnValidateErrorString(errors[0])})
            if(errors.length > 0) {
                return response.send({error: returnValidateErrorString(errors[0])})
            }

            const token = jwt.sign({id: user.idUser}, "secret", {
                expiresIn: "1d"
            })
            await userRepository.save(user);
        
            return response.send({ user, token });
        } catch (error) {
            console.error(error)
        }
    }

    async changePhotoProfile(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        
        try {
            
            const { photo } =
              request.body;
           
            const userexists = await userRepository.findOne({ 
                where: { 
                    idUser: request.params.id
                } 
            });
            
            if (!userexists)
              return response.status(209).send({ error: "id doesn't exists" });                                       
    
            userexists.photoProfileUser = photo

            await userRepository.update(userexists.idUser, userexists)
                        
            return response.send({ user: userexists });
        } catch (error) {
            console.error(error)
        }
    }
}

export default new UserController()