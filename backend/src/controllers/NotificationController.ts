import { Debate, StatusDebate } from '@models/Debate';
import { Group } from '@models/Group';
import { NotificationGroup } from '@models/NotificationGroup';
import { PatentMember } from '@models/PatentMember';
import { SideDebate, SideEnum } from '@models/SideDebate';
import { User } from '@models/User';
import {NextFunction, Request, Response} from 'express'
import { getRepository } from 'typeorm';

import {Notification, NotificationStatus, NotificationType} from '../entities/Notification'

class NotificationController {
    async all(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification);

        try {
            const notifications = await notificationRepository.createQueryBuilder('notification')
            .leftJoinAndSelect("notification.fromUserNotification", "fromUser")
            .leftJoinAndSelect("notification.forUserNotification", "forUser")
            .leftJoinAndSelect("notification.groupNotification", "group")
            .leftJoinAndSelect("notification.debateNotification", "debate")            
            .getMany()

            return response.send({ notifications });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification);

        try {
            const notification = await notificationRepository.findOne({where: {idNotification: request.params.id}});
            return response.send({ notification });            
        } catch (error) {
            console.error(error)
        }
    } 

    async acceptDebate(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification);
        const sideDebateRepository = getRepository(SideDebate);
        const debateRepository = getRepository(Debate);
        const groupRepository = getRepository(Group);

        try {
            const {groupSideDebate} = request.body.sideDebate as SideDebate

            const notification = await notificationRepository.createQueryBuilder("notification")
                .leftJoinAndSelect("notification.debateNotification", "debate")                
                .leftJoinAndSelect("notification.forUserNotification", "forUser")
                .where("notification.idNotification = :id", {id: request.params.id})
                .getOne()

            notification.statusNotification = NotificationStatus.ACCPEPTED


            const otherSideDebate = await sideDebateRepository.createQueryBuilder("sidedebate")
                .leftJoinAndSelect("sidedebate.userSideDebate", "user")
                .leftJoinAndSelect("sidedebate.debateSideDebate", "debate")
                .leftJoinAndSelect('debate.sidesDebate', 'sidesDebate')
                .leftJoinAndSelect("sidedebate.groupSideDebate", "group")
                .where("debate.idDebate = :id", {id: notification.debateNotification.idDebate})
                .getOne()

            const groupExists = await groupRepository.findOne({
                where: {
                    idGroup: groupSideDebate
                }
            })
            
            if(otherSideDebate.debateSideDebate.sidesDebate.length >= 2) {
                return response.send({ error: '2 '})
            }
            const newSideDebate = new SideDebate()
            newSideDebate.debateSideDebate = otherSideDebate.debateSideDebate
            newSideDebate.groupSideDebate = groupExists ?? null
            newSideDebate.side = otherSideDebate.side == SideEnum.CONDEBATE ? SideEnum.PRODEBATE : SideEnum.CONDEBATE
            newSideDebate.userSideDebate = notification.forUserNotification
           
            await sideDebateRepository.insert(newSideDebate)
            
            await notificationRepository.save(notification)

            await debateRepository.update(otherSideDebate.debateSideDebate.idDebate, {statusDebate: StatusDebate.DEBATING})
            
            return response.send({ newSideDebate, notification });            
        } catch (error) {
            console.error(error)
        }
    }    

    async acceptGroup(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification);
        const patentMemberRepository = getRepository(PatentMember);
        const notificationGroupRepository = getRepository(NotificationGroup);

        try {
            const notification = await notificationRepository.createQueryBuilder("notification")
                .leftJoinAndSelect("notification.groupNotification", "group")                
                .leftJoinAndSelect("notification.forUserNotification", "forUser")
                .where("group.idGroup = :idgroup and forUser.idUser = :iduser", {
                    idgroup: request.query.idgroup,
                    iduser: request.query.iduser
                })
                .getOne()
                
            notification.statusNotification = NotificationStatus.ACCPEPTED
            
            const patentMemberExists = await patentMemberRepository.createQueryBuilder("patentMember")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .leftJoinAndSelect("patentMember.userPatentMember", "user")
                .where("group.idGroup = :idgroup and user.idUser = :iduser", {
                    idgroup: notification.groupNotification.idGroup,
                    iduser: request.query.iduser
                })
                .getOne()                

            if(patentMemberExists) {
                notificationRepository.delete({idNotification: notification.idNotification})
                return response.send({error: "this user already belong in group"})
            }
           
           const patentMember = patentMemberRepository.create({
                groupPatentMember: notification.groupNotification,
                honorPatentMember: 0,
                namePatentMember: 'Novato',
                userPatentMember: notification.forUserNotification,                
            })            

            await patentMemberRepository.insert(patentMember)                                               
            await notificationRepository.save(notification)

            const notificatonsDelete = await notificationRepository.createQueryBuilder("notification")
                .leftJoinAndSelect("notification.groupNotification", "group")
                .leftJoinAndSelect("notification.forUserNotification", "user")
                .where("user.idUser = :idUser and group.idGroup = :idGroup", {
                    idUser: notification.forUserNotification.idUser,
                    idGroup: notification.groupNotification.idGroup
                })
                .getMany()

            notificatonsDelete.map(notification => {
                notificationRepository.delete({idNotification: notification.idNotification})
            })
            return response.send({ patentMember, notification });            
        } catch (error) {
            console.error(error)
        }
    }    

    async getUnread(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification);                

        try {
            const quantityUnread = await notificationRepository.createQueryBuilder("notification")                
                .leftJoinAndSelect("notification.forUserNotification", "forUser")
                .where("forUser.idUser = :id", {id: request.params.iduser})
                .andWhere("notification.statusNotification = :waiting", {waiting: NotificationStatus.WAITING})
                .getCount()

            return response.send({quantityUnread})
        } catch (error) {
            console.error(error)
        }
    }    

    async save(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification);
        const userRepository = getRepository(User);        
        const debateRepository = getRepository(Debate);        
        const groupRepository = getRepository(Group);        
        
        try {
            
            const { debateNotification, forUserNotification, fromUserNotification, groupNotification, typeNotification } =
              request.body.notification as Notification;                                                
              
              
            if(!forUserNotification) { 
                return response.send({error: "forUserNotification undefined"}) 
            } 

            if(!fromUserNotification) { 
                return response.send({error: "fromUserNotification undefined"}) 
            } 
            
            const forUserExists = await userRepository.findOne({
                where: {
                    idUser: forUserNotification,
                },
                join: {
                    alias: 'user',
                    leftJoinAndSelect: {
                        patentMember: "user.patentMembersUser",
                        group: "patentMember.groupPatentMember"
                    }
                }
            })        
            
            if(!forUserExists) { 
                return response.send({error: "forUserExists undefined"}) 
            } 

            const fromUserExists = await userRepository.findOne({
                where: {
                    idUser: fromUserNotification
                },
                join: {
                    alias: 'user',
                    leftJoinAndSelect: {
                        patentMember: "user.patentMembersUser",
                        group: "patentMember.groupPatentMember"
                    }
                }
            })        

            if(!fromUserExists) { 
                return response.send({error: "fromUserExists undefined"}) 
            } 

            const debateExists = await debateRepository.findOne({where: {
                    idDebate: debateNotification
                }
            })

            const groupExists = await groupRepository.findOne({where: {
                    idGroup: groupNotification
                }
            })

            if((debateExists && groupExists) || (!debateExists && !groupExists))
                return response.send({error: "choose between debate or group"})             

            if(!fromUserExists.patentMembersUser.find(patentMember => patentMember.groupPatentMember.idGroup == groupExists.idGroup))
                return response.send({error: "unauthorized"})

            if(forUserExists.patentMembersUser.find(patentMember => patentMember.groupPatentMember.idGroup == groupExists.idGroup))
                return response.send({error: "this user already is from this group"})
            
            const notification = notificationRepository.create({
                statusNotification: NotificationStatus.WAITING,
                groupNotification: groupExists || null,
                debateNotification: debateExists || null,
                fromUserNotification: fromUserExists,
                forUserNotification: forUserExists,  
                typeNotification:  typeNotification == 'Groupsolicit' ? NotificationType.GROUPSOLICIT :NotificationType.DEBATESOLICITATION_FORUSER
            });
    
            await notificationRepository.save(notification);
        
            return response.send({ notification });
        } catch (error) {
            console.error(error)
        }
    }

    async FindByUserSolicitation(request: Request, response: Response) {
        const userRepository = getRepository(User);
        
        try {
            const users = await userRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.patentMembersUser", "patentMember")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .leftJoinAndSelect("user.forNotificationsUser", "notification")
                .where("notification.statusNotification = :status and notification.typeNotification = :type", {
                    status: request.query.statusnotification,
                    type: request.query.typenotification
                })
                .getMany()

            return response.send({ users });            
        } catch (error) {
            console.error(error)
        }
    }   

    async FindByUserWithoutGroup(request: Request, response: Response) {
        const userRepository = getRepository(User);
        try {
            const idgroup = parseInt(request.params.idgroup)
            
            const users = await userRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.patentMembersUser", "patentMember")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .leftJoinAndSelect("user.forNotificationsUser", "notification")
                .leftJoinAndSelect("notification.groupNotification", "inviteGroup")                                
                .getMany()
                                
            const usersWithoutGroup: User[] = []
            users.map(user => {
                if(!user.forNotificationsUser.find(notification => notification.groupNotification?.idGroup == idgroup && notification.statusNotification == NotificationStatus.REJECTED)
                    && !user.patentMembersUser.find(patent => patent.groupPatentMember.idGroup == idgroup) ) {

                    const referenceNotification = user.forNotificationsUser.find(not => {
                        return not.groupNotification.idGroup == idgroup && not.statusNotification != NotificationStatus.REJECTED
                    })

                    //@ts-ignore
                    usersWithoutGroup.push({
                        forNotificationsUser: referenceNotification ? [referenceNotification] : [],
                        ...user
                    })
                }
            })
            return response.send({ users: usersWithoutGroup });            
        } catch (error) {
            console.error(error)
        }
    }

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification);
        const userRepository = getRepository(User);        
        
        try {
           
            const notifications = await notificationRepository.createQueryBuilder('notification')
                .leftJoinAndSelect("notification.fromUserNotification", "fromUser")
                .leftJoinAndSelect("notification.forUserNotification", "forUser")
                .leftJoinAndSelect("notification.debateNotification", "debate")
                .leftJoinAndSelect("debate.sidesDebate", "sides")
                .leftJoinAndSelect("sides.userSideDebate", "userSide")
                .leftJoinAndSelect("sides.groupSideDebate", "groupSide")
                .where("forUser.idUser = :id", {id: request.params.iduser})
                .getMany()
            
            return response.send({ notifications })
        } catch (error) {
            console.error(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const notificationRepository = getRepository(Notification)

        await notificationRepository.delete({idNotification: parseInt(request.params.id)})

        return response.send({message: "foi"})
    }
}

export default new NotificationController()