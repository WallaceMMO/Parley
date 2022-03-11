import {NextFunction, Request, Response} from 'express'
import { getRepository } from 'typeorm';
import {validate} from 'class-validator'

import {Debate, StatusDebate} from '../entities/Debate'
import { Message } from '@models/Message';
import { SideDebate, SideEnum } from '@models/SideDebate';
import { User } from '@models/User';
import { Group } from '@models/Group';
import { Notification, NotificationStatus } from '@models/Notification';
import { ViewsDebate } from '@models/ViewsDebate';

class DebateController {
    async all(request: Request, response: Response, next: NextFunction) {
        const debateRepository = getRepository(Debate);

        try {
            const debates = await debateRepository.createQueryBuilder("debate")                
                .leftJoinAndSelect("debate.messagesDebate", "message")                
                .leftJoinAndSelect("debate.sidesDebate", "sidedebate")
                .leftJoinAndSelect("sidedebate.userSideDebate", "user")
                .leftJoinAndSelect("sidedebate.groupSideDebate", "group")
                .leftJoinAndSelect("message.sideDebateMessage", "sidedebatemessage")
                .leftJoinAndSelect("sidedebatemessage.userSideDebate", "usersidedebate")
                .loadRelationCountAndMap("debate.quantityViews", 'debate.viewsDebate')
                .getMany()                

            return response.send({ debates });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const debateRepository = getRepository(Debate);
        const userRepository = getRepository(User);
        const viewsDebateRepository = getRepository(ViewsDebate);

        try {
            const {idUser} = request.body
                        
            const debate = await debateRepository.createQueryBuilder("debate")                
                .leftJoinAndSelect("debate.messagesDebate", "message")                
                .leftJoinAndSelect("debate.sidesDebate", "sidedebate")
                .leftJoinAndSelect("sidedebate.userSideDebate", "user")
                .leftJoinAndSelect("sidedebate.groupSideDebate", "group")
                .leftJoinAndSelect("message.sideDebateMessage", "sidedebatemessage")
                .leftJoinAndSelect("sidedebatemessage.userSideDebate", "usersidedebate")
                .where("debate.idDebate = :id", {id: request.params.id})
                .loadRelationCountAndMap("debate.quantityViews", 'debate.viewsDebate')
                .getOne()

            const userExists = await userRepository.findOne({
                where: {
                    idUser
                }
            })

            let quantityViews = debate.quantityViews

            if(userExists) {                
                var userViewed = await viewsDebateRepository.findOne({
                    where: {
                        quantityViewsDebate: {idDebate: debate.idDebate},
                        quantityViewsUser: {idUser: userExists.idUser}
                    },
                    join: {
                        alias: 'viewsDebate',
                        leftJoinAndSelect: {
                            debate: 'viewsDebate.quantityViewsDebate',
                            user: 'viewsDebate.quantityViewsUser'
                        }
                    }
                })

                if(!userViewed) {
                    const newUserViewed = viewsDebateRepository.create({
                        quantityViewsDebate: debate,
                        quantityViewsUser: userExists
                    })                    

                    await viewsDebateRepository.save(newUserViewed)
                    quantityViews++
                }
            }            
            
            return response.send({ 
                debate: {
                    ...debate,
                    quantityViews
                } 
            });            
        } catch (error) {
            console.error(error)
        }
    }    

    async FindByGroup(request: Request, response: Response, next: NextFunction) {
        const debateRepository = getRepository(Debate);        
        
        try {            
            const debates = await debateRepository.createQueryBuilder("debate")                
                .leftJoinAndSelect("debate.messagesDebate", "message")                
                .leftJoinAndSelect("debate.sidesDebate", "sidedebate")
                .leftJoinAndSelect("sidedebate.userSideDebate", "user")
                .leftJoinAndSelect("sidedebate.groupSideDebate", "group")
                .leftJoinAndSelect("message.sideDebateMessage", "sidedebatemessage")
                .leftJoinAndSelect("sidedebatemessage.userSideDebate", "usersidedebate")                
                .where("group.idGroup = :id", {id: request.params.idgroup})
                .loadRelationCountAndMap("debate.quantityViews", 'debate.viewsDebate')
                .getMany()                            
            
            return response.send({ debates });            
        } catch (error) {
            console.error(error)
        }
    }   

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const debateRepository = getRepository(Debate);        
        
        try {            
            const debates = await debateRepository.createQueryBuilder("debate")                
                .leftJoinAndSelect("debate.messagesDebate", "message")                
                .leftJoinAndSelect("debate.sidesDebate", "sidedebate")
                .leftJoinAndSelect("sidedebate.userSideDebate", "user")
                .leftJoinAndSelect("sidedebate.groupSideDebate", "group")
                .leftJoinAndSelect("message.sideDebateMessage", "sidedebatemessage")
                .leftJoinAndSelect("sidedebatemessage.userSideDebate", "usersidedebate")                
                .where("user.idUser = :id", {id: request.params.iduser})
                .loadRelationCountAndMap("debate.quantityViews", 'debate.viewsDebate')
                .getMany()                            
            
            return response.send({ debates });            
        } catch (error) {
            console.error(error)
        }
    }    

    async save(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const debateRepository = getRepository(Debate);
        const messageRepository = getRepository(Message);
        const sideDebateRepository = getRepository(SideDebate);
        const groupRepository = getRepository(Group);
        const notificationRepository = getRepository(Notification);

        try {
            
            const { 
                titleDebate, 
                tagsDebate = '',                 
                roundsDebate,
                timeToArgueDebate,
                conDebate,
                proDebate,
                side,

                honorDebate = 0
            } =
              request.body.debate;                            
    
            const {text} = request.body.message                                        
    
            if(!conDebate) { //Vai vir o id
                return response.send({error: "conDebate undefined"}) 
            } 

            if(!proDebate) { //Vai vir o id
                return response.send({error: "proDebate undefined"}) 
            }                         

            const groupCon = await groupRepository.findOne({idGroup: conDebate.groupSideDebate})
            const groupPro = await groupRepository.findOne({idGroup: proDebate.groupSideDebate})

            console.log("side")
            console.log(conDebate)
            console.log(proDebate)

            console.log("group")
            console.log(groupCon)
            console.log(groupPro)
            const userConExists = await userRepository.findOne({where: {idUser: conDebate.userSideDebate}})
            const userProExists = await userRepository.findOne({where: {idUser: proDebate.userSideDebate}})

            if(!userConExists) {
                return response.send({error: "userConExists undefined"}) 
            }

            if(!userProExists) {
                return response.send({error: "userProExists undefined"}) 
            }                                                                    

            const debate = new Debate()
            debate.tagsDebate = tagsDebate            
            debate.titleDebate = titleDebate            

            debate.timeToArgueDebate = parseInt(timeToArgueDebate)
            debate.roundsDebate = roundsDebate
            debate.honorDebate = honorDebate
            debate.statusDebate = StatusDebate.OPEN
            
            const {raw: rawDebate} = await debateRepository.insert(debate);
            
            const errorsDebate = await validate(debate)                        

            if(errorsDebate.length)
                throw "Errors debate: " + errorsDebate[0]
    
            const proUserDebate = new SideDebate()

            proUserDebate.side = SideEnum.PRODEBATE
            proUserDebate.groupSideDebate = groupPro
            proUserDebate.userSideDebate = userProExists
            proUserDebate.debateSideDebate = debate

            
            
            const conUserDebate = new SideDebate()

            conUserDebate.side = SideEnum.CONDEBATE
            conUserDebate.groupSideDebate = groupCon
            conUserDebate.userSideDebate = userConExists
            conUserDebate.debateSideDebate = debate
            
           
            const fromUser = side == 0 ? proUserDebate : conUserDebate
            const forUser = side == 1 ? proUserDebate : conUserDebate

            const {raw: rawPro} = await sideDebateRepository.insert(fromUser)

            const notification = notificationRepository.create({
                forUserNotification: forUser.userSideDebate,
                fromUserNotification: fromUser.userSideDebate,
                statusNotification: NotificationStatus.WAITING,
                debateNotification: debate                                    
            })

            await notificationRepository.save(notification)

                   

            const message = new Message()
            message.textMessage = text,
            message.sideDebateMessage = side == 0 ? proUserDebate : conUserDebate  
            message.debateMessage = {
                idDebate: rawDebate.insertId,
                ...debate
            } as Debate

            const {raw: rawMessage} = await messageRepository.insert(message)                         

            const errorsMessage = await validate(message)
            

            if(errorsMessage.length)
                throw "Errors message: " + errorsMessage[0].constraints

            delete proUserDebate.debateSideDebate
            delete conUserDebate.debateSideDebate
            
            debate.messagesDebate = [message]                                                                         
            debate.sidesDebate = [proUserDebate, conUserDebate]
            
            return response.send({ debate });
        } catch (error) {
            console.error(error)
        }        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const debateRepository = getRepository(Debate)

        await debateRepository.delete({idDebate: parseInt(request.params.id)})

        return response.send({message: 'foi'})
    }    
            
}

export default new DebateController()
