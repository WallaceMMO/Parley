import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'

import {User} from '../entities/User'
import {Debate} from '../entities/Debate'

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
                
        return response.send({ 
            user: {
                ...user,
                mostViewedDebate: user.proDebatesUser[mostViewedCon].debateSideDebate.quantityViews
                                > user.proDebatesUser[mostViewedPro].debateSideDebate.quantityViews ? user.proDebatesUser[mostViewedCon].debateSideDebate : user.proDebatesUser[mostViewedPro].debateSideDebate,
                madeDebates: user.proDebatesUser.length + user.proDebatesUser.length,
            } 
        });
    }

    async auth(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User)                
        
        try {            
            const {emailUser, passwordUser} = request.body.user as User
        
            if(!passwordUser) {
                return response.status(204).send({error: "userpassword undefined"})
            }
            if(!emailUser) {
                return response.status(204).send({error: "useremail undefined"})
            }
            
            const user = await userRepository.findOne({
                where: {emailUser}
            })
    
            if(!user) {
                return response.status(208).send({error: "useremail not found"})
            }
    
            const isValidPassword = await bcrypt.compare(
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
                
            if(!emailUser) {
                return response.status(204).send({error: "useremail undefined"})
            }
    
            if(!nameUser) {
                return response.status(204).send({error: "nameUser undefined"})
            }
    
            if(!passwordUser) {
                return response.status(204).send({error: "passwordUser undefined"})
            }        
        
            const userexists = await userRepository.findOne({ where: { emailUser } });
            
            if (userexists)
              return response.status(209).send({ error: "Email exists" });                    
        
            const user = userRepository.create({
                emailUser,
                nameUser,
                passwordUser,
                photoProfileUser,
                activityUser: new Date,
                descriptionUser: '',
                gloryUser: 0,
                honorUser: 0,
                followersUser: 0,
            });
    
            const token = jwt.sign({id: user.idUser}, "secret", {
                expiresIn: "1d"
            })
            await userRepository.save(user);
        
            return response.send({ user, token });
        } catch (error) {
            console.error(error)
        }
    }
}

export default new UserController()