import { Group } from '@models/Group';
import { User } from '@models/User';
import {NextFunction, Request, Response} from 'express'
import { getRepository } from 'typeorm';

import {ItemChat} from '../entities/ItemChat'

class ItemChatController {
    async all(request: Request, response: Response, next: NextFunction) {
        const itemChatRepository = getRepository(ItemChat);

        try {
            const itemChats = await itemChatRepository.createQueryBuilder("itemChat")
                .leftJoinAndSelect("itemChat.userItemChat", "user")
                .leftJoinAndSelect("itemChat.groupItemChat", "group")
                .getMany()

            return response.send({ itemChats });            
        } catch (error) {
            console.error(error)
        }
    }

    async FindByGroup(request: Request, response: Response, next: NextFunction) {
        const itemChatRepository = getRepository(ItemChat);

        try {
            const itemChats = await itemChatRepository.createQueryBuilder("itemChat")                
                .leftJoinAndSelect("itemChat.userItemChat", "user")
                .leftJoinAndSelect("itemChat.groupItemChat", "group")
                .where("group.idGroup = :id", {id: request.params.idgroup})
                .getMany()

            return response.send({ itemChats });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const itemChatRepository = getRepository(ItemChat);

        try {
            const itemChat = await itemChatRepository.createQueryBuilder("itemChat")
                .leftJoinAndSelect("itemChat.userItemChat", "user")
                .leftJoinAndSelect("itemChat.groupItemChat", "group")
                .getOne()

            return response.send({ itemChat });            
        } catch (error) {
            console.error(error)
        }
    }    

    async save(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const itemChatRepository = getRepository(ItemChat);
        const groupRepository = getRepository(Group);
        
        try {
            
            const { messageItemChat, groupItemChat, userItemChat } =
              request.body.itemChat as ItemChat;                            
    
            if(!messageItemChat) {
                return response.send({error: "messageItemChat undefined"})
            }
    
            if(!groupItemChat) { 
                return response.send({error: "groupItemChat undefined"}) 
            } 

             if(!userItemChat) { 
                return response.send({error: "userItemChat undefined"}) 
            }              
            
            const userExists = await userRepository.findOne({where: {idUser: userItemChat}})
            const groupItemChatExists = await groupRepository.findOne({where: {idGroup: groupItemChat}})
        
            if(!userExists) {
                return response.send({error: "userExists undefined"}) 
            }

            if(!groupItemChatExists) {
                return response.send({error: "groupItemChatExists undefined"}) 
            }

            const itemChat = itemChatRepository.create({
               messageItemChat,
               userItemChat: userExists,
               groupItemChat: groupItemChatExists
            });
    
            await itemChatRepository.save(itemChat);
        
            return response.send({ itemChat });
        } catch (error) {
            console.error(error)
        }
    }
}

export default new ItemChatController()