import { Debate, StatusDebate } from '@models/Debate';
import { SideDebate } from '@models/SideDebate';
import {NextFunction, Request, Response} from 'express'
import { getRepository } from 'typeorm';

import {Message} from '../entities/Message'

class MessageController {
    async all(request: Request, response: Response, next: NextFunction) {
        const messageRepository = getRepository(Message);

        try {
            const messages = await messageRepository.find();
            return response.send({ messages });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const messageRepository = getRepository(Message);

        try {
            const message = await messageRepository.findOne({where: {idMessage: request.params.id}});
            return response.send({ message });            
        } catch (error) {
            console.error(error)
        }
    }    

    async save(request: Request, response: Response, next: NextFunction) {
        const messageRepository = getRepository(Message);
        const sideDebateRepository = getRepository(SideDebate);
        const debateRepository = getRepository(Debate);
        
        try {
            
            const { textMessage, sideDebateMessage, debateMessage } =
              request.body.message as Message;                            
    
            if(!textMessage) {
                return response.send({error: "textMessage undefined"})
            }
    
            if(!sideDebateMessage) { //Vai vir o id
                return response.send({error: "sideDebateMessage undefined"}) 
            } 

             if(!debateMessage) { //Vai vir o id
                return response.send({error: "debateMessage undefined"}) 
            }              
            
            const sideDebateExists = await sideDebateRepository.findOne({where: {idSideDebate: sideDebateMessage}, join: {
                alias: 'sidedebate',
                leftJoinAndSelect: {
                    user: 'sidedebate.userSideDebate',
                    group: 'sidedebate.groupSideDebate'
                }
            }})
            const debateExists = await debateRepository.createQueryBuilder("debate")
                .where("debate.idDebate = :id", {id: debateMessage})
                .leftJoinAndSelect("debate.messagesDebate", "message")
                .leftJoinAndSelect("message.sideDebateMessage", "sideDebate")
                .leftJoinAndSelect("sideDebate.userSideDebate", "user")
                .getOne()
                                
            if(!sideDebateExists) {
                return response.send({error: "sideDebateExists undefined"}) 
            }

            if(!debateExists) {
                return response.send({error: "debateExists undefined"}) 
            }

            if(debateExists.messagesDebate.length / 2 >= debateExists.roundsDebate) {
                return response.send({error: "Rounds exceeds"})
            }

            const topMessage = debateExists.messagesDebate.length - 1
            
            if(debateExists.messagesDebate[topMessage].sideDebateMessage.userSideDebate.idUser != 
                sideDebateExists.userSideDebate.idUser) {
                    const message = messageRepository.create({
                        textMessage,
                        sideDebateMessage: sideDebateExists,
                        debateMessage: debateExists
                    });

                    debateExists.updated_at = new Date()
                    await debateRepository.save(debateExists)
                    
                    
                    await messageRepository.save(message);
                    
                    if((debateExists.messagesDebate.length + 1) / 2 == debateExists.roundsDebate)
                        await debateRepository.update(debateExists.idDebate, {statusDebate: StatusDebate.CLOSED})

                    return response.send({ message });
                }


            return response.send({error: 'Is not time for this user'})
        
        } catch (error) {
            console.error(error)
        }
    }
}

export default new MessageController()