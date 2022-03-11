import { Group } from '@models/Group';
import { User } from '@models/User';
import {NextFunction, Request, Response} from 'express'
import { getRepository } from 'typeorm';

import {SideDebate} from '../entities/SideDebate'

class ItemChatController {
    async all(request: Request, response: Response, next: NextFunction) {
        const sideDebateRepository = getRepository(SideDebate);

        try {
            const sideDebates = await sideDebateRepository.createQueryBuilder("sidedebate")                
                .getMany()

            return response.send({ sideDebates });            
        } catch (error) {
            console.error(error)
        }
    }

    async FindByGroup(request: Request, response: Response, next: NextFunction) {
        const itemChatRepository = getRepository(SideDebate);

        try {
            const sideDebates = await itemChatRepository.createQueryBuilder("SideDebate")                
                .leftJoinAndSelect("SideDebate.userItemChat", "user")
                .leftJoinAndSelect("SideDebate.groupItemChat", "group")
                .where("group.id = :id", {id: request.params.idgroup})
                .getMany()

            return response.send({ sideDebates });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const itemChatRepository = getRepository(SideDebate);

        try {
            const SideDebate = await itemChatRepository.createQueryBuilder("SideDebate")
                .leftJoinAndSelect("SideDebate.userItemChat", "user")
                .leftJoinAndSelect("SideDebate.groupItemChat", "group")
                .getOne()

            return response.send({ SideDebate });            
        } catch (error) {
            console.error(error)
        }
    }    

    // async save(request: Request, response: Response, next: NextFunction) {
    //     const userRepository = getRepository(User);
    //     const itemChatRepository = getRepository(SideDebate);
    //     const groupRepository = getRepository(Group);
        
    //     try {
            
    //         const {  } =
    //           request.body.SideDebate as SideDebate;                            
    
    //           console.log(request.body)
    //         if(!messageItemChat) {
    //             return response.send({error: "messageItemChat undefined"})
    //         }
    
    //         if(!groupItemChat) { 
    //             return response.send({error: "groupItemChat undefined"}) 
    //         } 

    //          if(!userItemChat) { 
    //             return response.send({error: "userItemChat undefined"}) 
    //         }              
            
    //         const userExists = await userRepository.findOne({where: {id: userItemChat}})
    //         const groupItemChatExists = await groupRepository.findOne({where: {id: groupItemChat}})
        
    //         if(!userExists) {
    //             return response.send({error: "userExists undefined"}) 
    //         }

    //         if(!groupItemChatExists) {
    //             return response.send({error: "groupItemChatExists undefined"}) 
    //         }

    //         const SideDebate = itemChatRepository.create({
    //            messageItemChat,
    //            userItemChat: userExists,
    //            groupItemChat: groupItemChatExists
    //         });
    
    //         await itemChatRepository.save(SideDebate);
        
    //         return response.send({ SideDebate });
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
}

export default new ItemChatController()