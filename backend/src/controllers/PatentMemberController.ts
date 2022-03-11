import { Group } from '@models/Group';
import { User } from '@models/User';
import {NextFunction, Request, Response} from 'express'
import { getRepository } from 'typeorm';

import {PatentMember} from '../entities/PatentMember'

class PatentMemberController {
    async all(request: Request, response: Response, next: NextFunction) {
        const patentMemberRepository = getRepository(PatentMember);

        try {
            const patentMembers = await patentMemberRepository.createQueryBuilder("patentMember")
                .leftJoinAndSelect("patentMember.userPatentMember", "user")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .getMany()

            return response.send({ patentMembers });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const patentMemberRepository = getRepository(PatentMember);

        try {
            const patentMember = await patentMemberRepository.createQueryBuilder("patentMember")
                .leftJoinAndSelect("patentMember.userPatentMember", "user")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .getOne()

            return response.send({ patentMember });            
        } catch (error) {
            console.error(error)
        }
    }    

    async save(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const patentMemberRepository = getRepository(PatentMember);
        const groupRepository = getRepository(Group);
        
        try {
            
            const { namePatentMember, groupPatentMember, userPatentMember } =
              request.body.patentMember as PatentMember;                            
    
            if(!namePatentMember) {
                return response.send({error: "namePatentMember undefined"})
            }
    
            if(!groupPatentMember) { //Vai vir o id
                return response.send({error: "groupPatentMember undefined"}) 
            } 

             if(!userPatentMember) { //Vai vir o id
                return response.send({error: "userPatentMember undefined"}) 
            }              
            
            const userExists = await userRepository.findOne({where: {idUser: userPatentMember}})
            const groupPatentMemberExists = await groupRepository.findOne({where: {id: groupPatentMember}})
        
            if(!userExists) {
                return response.send({error: "userExists undefined"}) 
            }

            if(!groupPatentMemberExists) {
                return response.send({error: "groupPatentMemberExists undefined"}) 
            }

            const patentMember = patentMemberRepository.create({
               namePatentMember,
               userPatentMember: userExists,
               groupPatentMember: groupPatentMemberExists
            });
    
            await patentMemberRepository.save(patentMember);
        
            return response.send({ patentMember });
        } catch (error) {
            console.error(error)
        }
    }
}

export default new PatentMemberController()