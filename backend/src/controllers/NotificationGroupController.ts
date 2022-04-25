import {Request, Response} from 'express'
import { getRepository } from 'typeorm';

import { Group } from '@models/Group';
import { NotificationType, NotificationStatus as NotificationGroupStatus } from '@models/NotificationGroup';
import { PatentMember } from '@models/PatentMember';
import { Notification } from '@models/Notification';
import { User } from '@models/User';

import {NotificationGroup, NotificationStatus} from '../entities/NotificationGroup'

class NotificationGroupController {
    async all(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);

        try {
            const notificationsGroup = await notificationGroupRepository.createQueryBuilder('notificationGroup')            
            .leftJoinAndSelect("notificationGroup.forUserNotificationGroup", "user")
            .leftJoinAndSelect("notificationGroup.fromUserNotificationGroup", "fromuser")
            .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")            
            .leftJoinAndSelect("notificationGroup.fromGroupNotificationGroup", "fromgroup")            
            .getMany()

            return response.send({ notificationsGroup });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);

        try {
            const notificationGroup = await notificationGroupRepository.findOne({where: {idNotificationGroup: request.params.id}});
            return response.send({ notificationGroup });            
        } catch (error) {
            console.error(error)
        }
    } 

    async acceptSolicit(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);
        const patentMemberRepository = getRepository(PatentMember);        

        try {
            const idNotificationGroup = parseInt(request.params.id)
            
            const notificationGroup = await notificationGroupRepository.createQueryBuilder("notification")
                .leftJoinAndSelect("notification.forGroupNotificationGroup", "group")                
                .leftJoinAndSelect("notification.fromUserNotificationGroup", "user")
                .where("notification.idNotificationGroup = :id", {
                    id: idNotificationGroup
                })
                .getOne()

                notificationGroup.statusNotificationGroup = NotificationStatus.ACCPEPTED
            
            const patentMemberExists = await patentMemberRepository.createQueryBuilder("patentMember")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .leftJoinAndSelect("patentMember.userPatentMember", "user")
                .where("group.idGroup = :idgroup and user.idUser = :iduser", {
                    idgroup: notificationGroup.forGroupNotificationGroup.idGroup, 
                    iduser: notificationGroup.fromUserNotificationGroup.idUser
                })
                .getOne()                

            if(patentMemberExists) {
                return response.send({error: "this user already belong in group"})
            }
           
           const patentMember = patentMemberRepository.create({
                groupPatentMember: notificationGroup.forGroupNotificationGroup,
                honorPatentMember: 0,
                namePatentMember: 'Membro',
                userPatentMember: notificationGroup.fromUserNotificationGroup,                
            })            

            await patentMemberRepository.insert(patentMember)                                               
            await notificationGroupRepository.save(notificationGroup)
            
            return response.send({ message: "sucess" });
        } catch (error) {
            console.error(error)
        }
    }    

    async rejectNotificationGroup(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);

        try {
            const idNotificationGroup = parseInt(request.params.id)
            
            const notificationGroup = await notificationGroupRepository.createQueryBuilder("notification")
                .leftJoinAndSelect("notification.forGroupNotificationGroup", "group")                
                .leftJoinAndSelect("notification.fromUserNotificationGroup", "user")
                .where("notification.idNotificationGroup = :id", {
                    id: idNotificationGroup
                })
                .getOne()

                notificationGroup.statusNotificationGroup = NotificationStatus.REJECTED                    
            
            await notificationGroupRepository.save(notificationGroup)
            
            return response.send({ message: "sucess" });
        } catch (error) {
            console.error(error)
        }
    }    

    async acceptInviteGroup(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);
        const patentMemberRepository = getRepository(PatentMember);        
        
        try {
            const idNotificationGroup = request.params.id
            
            const notificationGroup = await notificationGroupRepository.createQueryBuilder("notification")
                .leftJoinAndSelect("notification.forGroupNotificationGroup", "forgroup")                
                .leftJoinAndSelect("notification.fromGroupNotificationGroup", "fromgroup")                                
                .where("notification.idNotificationGroup = :id", {
                    id: idNotificationGroup,
                })
                .getOne()

                notificationGroup.statusNotificationGroup = NotificationStatus.ACCPEPTED
            
                const patentMemberExists = await patentMemberRepository.createQueryBuilder("patentMember")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")
                .leftJoinAndSelect("patentMember.memberGroupPatentMember", "memberGroup")
                .where("group.idGroup = :idgroup and memberGroup.idGroup = :idmembergroup", {
                    idgroup: notificationGroup.fromGroupNotificationGroup.idGroup, 
                    idmembergroup: notificationGroup.forGroupNotificationGroup.idGroup
                })
                .getOne()                

            if(patentMemberExists) {
                return response.send({error: "this user already belong in group"})
            }
           
           const patentMember = patentMemberRepository.create({
                groupPatentMember: notificationGroup.fromGroupNotificationGroup,
                honorPatentMember: 0,
                namePatentMember: 'Associado',
                memberGroupPatentMember: notificationGroup.forGroupNotificationGroup,                
            })            

            await patentMemberRepository.insert(patentMember) 
            await notificationGroupRepository.save(notificationGroup)
            
            return response.send({ message: "sucess" });
        } catch (error) {
            console.error(error)
        }
    }    
    
    async save(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);
        const userRepository = getRepository(User);        
        const groupRepository = getRepository(Group);        
        
        try {
            
            const { forGroupNotificationGroup, fromGroupNotificationGroup, fromUserNotificationGroup, forUserNotificationGroup, typeNotificationGroup } =
              request.body.notificationGroup as NotificationGroup;                                                                                                           

            const userExists = await userRepository.findOne({where: {
                    idUser: forUserNotificationGroup
                }
            })         

            const fromUserExists = await userRepository.findOne({where: {
                    idUser: fromUserNotificationGroup
                }
            })                                 

            const forGroupExists = await groupRepository.findOne({where: {
                    idGroup: forGroupNotificationGroup
                }
            })                    

            const fromGroupExists = await groupRepository.findOne({where: {
                    idGroup: fromGroupNotificationGroup
                }
            })                                                                        

            const notificationGroup = notificationGroupRepository.create({
                statusNotificationGroup: NotificationStatus.WAITING,
                fromGroupNotificationGroup: fromGroupExists ?? null,
                forGroupNotificationGroup: forGroupExists ?? null,
                forUserNotificationGroup: userExists ?? null,
                fromUserNotificationGroup: fromUserExists ?? null,
                typeNotificationGroup: typeNotificationGroup
            });

            await notificationGroupRepository.save(notificationGroup);
        
            return response.send({ notificationGroup });
        } catch (error) {
            console.error(error)
        }
    }

    async FindByGroup(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);        
        
        try {                                    
            const notificationsGroup = await notificationGroupRepository.createQueryBuilder('notificationGroup')                
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")
                .leftJoinAndSelect("notificationGroup.forUserNotificationGroup", "foruser")                
                .leftJoinAndSelect("notificationGroup.fromUserNotificationGroup", "fromuser")                
                .where("CASE WHEN :iduser is NULL THEN" + 
                        " forgroup.idGroup = :idgroup ELSE" +
                        " forgroup.idGroup = :idgroup and (foruser.idUser = :iduser or fromuser.idUser = :iduser ) END", { 
                    iduser:request.query.iduser ?? null, 
                    idgroup: request.query.idgroup
                })                
                .orderBy("notificationGroup.updated_at", "ASC")
                .getMany()

            return response.send({ notificationsGroup })
        } catch (error) {
            console.error(error)
        }
    }    

    async FindByUserSolicitation(request: Request, response: Response) {
        const userRepository = getRepository(User);        

        const idgroup = request.query.idgroup.length ? request.query.idgroup[0] : request.query.idgroup
        const statusnotificationgroup = typeof request.query.statusnotificationgroup != 'string' ? request.query.statusnotificationgroup[0] : request.query.statusnotificationgroup

        try {
            const users = await userRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.patentMembersUser", "patentMember")
                .leftJoinAndSelect("user.fromNotificationsGroupUser", "notificationGroup")
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "group")
                .where("CASE WHEN :idgroup is NULL THEN" + 
                       " notificationGroup.statusNotificationGroup = :status ELSE" + 
                       " group.idGroup = :idgroup and notificationGroup.statusNotificationGroup = :status END", {                     
                    idgroup: idgroup,
                    status: statusnotificationgroup
                })                
                .getMany()

            return response.send({ users });            
        } catch (error) {
            console.error(error)
        }
    }

    async FindByGroupInvite(request: Request, response: Response) {
        const groupRepository = getRepository(Group);

        try {
            const idgroup = request.params.idgroup
            const statusnotificationgroup = typeof request.query.statusnotificationgroup != 'string' ? request.query.statusnotificationgroup[0] : request.query.statusnotificationgroup

            const groups = await groupRepository.createQueryBuilder("group")
                .leftJoinAndSelect("group.fromGlobalNotificationsGroup", "notificationGroup")
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")
                .leftJoinAndSelect("notificationGroup.fromGroupNotificationGroup", "fromgroup")
                .leftJoinAndSelect("group.belongingPatentMembersGroup", "groupsBelonging")
                .where("forgroup.idGroup = :idgroup and notificationGroup.statusNotificationGroup = :status", {
                    idgroup,
                    status: statusnotificationgroup
                })
                .getMany()

            return response.send({ groups });            
        } catch (error) {
            console.error(error)
        }
    }

    async FindByGroupWithoutInvite(request: Request, response: Response) {
        const groupRepository = getRepository(Group);
        
        try {
            const idgroup = parseInt(request.params.idgroup)

            const groups = await groupRepository.createQueryBuilder("group")                                
                .leftJoinAndSelect("group.forGlobalNotificationsGroup", "notificationGroup")                                       
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "groups")                                                       
                .leftJoinAndSelect("group.belongingPatentMembersGroup", "patent")                                                       
                .leftJoinAndSelect("patent.groupPatentMember", "groupBelonging")
                .where("group.idGroup != :idgroup", {
                    idgroup
                })                                                       
                .getMany()
                
                
                const groupsWithoutInvite: Group[] = []

                groups.map(group => {
                    
                    if(!group.forGlobalNotificationsGroup.find(notification => notification.fromGroupNotificationGroup?.idGroup == idgroup && notification.statusNotificationGroup == NotificationStatus.REJECTED)
                        && !group.belongingPatentMembersGroup.find(patent => patent.memberGroupPatentMember.idGroup == idgroup) ) {
    
                        const referenceNotification = group.forGlobalNotificationsGroup.find(not => {
                            return not.fromGroupNotificationGroup?.idGroup == idgroup && not.statusNotificationGroup != NotificationStatus.REJECTED
                        })
    
                        //@ts-ignore
                        groupsWithoutInvite.push({
                            forGlobalNotificationsGroup: referenceNotification ? [referenceNotification] : [],
                            ...group
                        })
                    }
                })
            
            return response.send({ groups: groupsWithoutInvite });            
        } catch (error) {
            console.error(error)
        }
    }

    async FindUsers(request: Request, response: Response) {
        const userRepository = getRepository(User);
        
        try {
            const users = await userRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.patentMembersUser", "patentMember")
                .leftJoinAndSelect("patentMember.groupPatentMember", "group")                    
                .leftJoinAndSelect("user.forNotificationsGroupUser", "notificationGroup",
                    "notificationGroup.typeNotificationGroup = :type", {type: request.query.type}
                )
                .leftJoinAndSelect("notificationGroup.fromGroupNotificationGroup", "fromGroup")
                .getMany()

            const usersOn = []

            users.map(user => {
                if(!user.patentMembersUser.find(patent => patent.groupPatentMember.idGroup == parseInt(request.params.idgroup))) {
                    if(user.forNotificationsGroupUser.find(notgroup => notgroup.statusNotificationGroup == NotificationStatus.WAITING && notgroup.fromGroupNotificationGroup.idGroup == parseInt(String(request.params.idgroup)) && notgroup.statusNotificationGroup == request.query.status))
                        user.forNotificationsGroupUser = [user.forNotificationsGroupUser.find(notgroup => notgroup.statusNotificationGroup == NotificationStatus.WAITING && notgroup.fromGroupNotificationGroup.idGroup == parseInt(String(request.params.idgroup)) && notgroup.statusNotificationGroup == request.query.status)]

                    usersOn.push(user)
                }
            })
            return response.send({ users: usersOn });            
        } catch (error) {
            console.error(error)
        }
    }

    async FindByUser(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);        
                
        try {                        
            let notificationsGroup

            if(request.query.side)
                notificationsGroup = await notificationGroupRepository.createQueryBuilder('notificationGroup')                
                    .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")
                    .leftJoinAndSelect("notificationGroup.fromGroupNotificationGroup", "fromgroup")
                    .leftJoinAndSelect("notificationGroup.forUserNotificationGroup", "foruser")
                    .leftJoinAndSelect("notificationGroup.fromUserNotificationGroup", "fromuser")
                    .where("foruser.idUser = :idUser", {
                                idUser: request.params.iduser,
                            })               
                    .getMany()
            else
                notificationsGroup = await notificationGroupRepository.createQueryBuilder('notificationGroup')                
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")
                .leftJoinAndSelect("notificationGroup.fromGroupNotificationGroup", "fromgroup")
                .leftJoinAndSelect("notificationGroup.forUserNotificationGroup", "foruser")
                .leftJoinAndSelect("notificationGroup.fromUserNotificationGroup", "fromuser")
                .where("(fromuser.idUser = :idUser or foruser.idUser = :idUser) and notificationGroup.statusNotificationGroup = :status", {
                            idUser: request.params.iduser,
                            status: request.query.statusNotification ?? NotificationStatus.WAITING
                        })               
                .getMany()
            
            return response.send({ notificationsGroup })
        } catch (error) {
            console.error(error)
        }
    }    

    async getUnread(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);                

        try {
            const quantityUnread = await notificationGroupRepository.createQueryBuilder("notificationGroup")                
                .leftJoinAndSelect("notificationGroup.forUserNotificationGroup", "forUser")
                .where("forUser.idUser = :id", {id: request.params.iduser})
                .andWhere("notificationGroup.statusNotificationGroup = :waiting", {waiting: NotificationStatus.WAITING})
                .getCount()

            return response.send({quantityUnread})
        } catch (error) {
            console.error(error)
        }
    }    

    async FindByUserAndGroup(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);        
                
        try {                        
            const notificationsGroup = await notificationGroupRepository.createQueryBuilder('notificationGroup')                
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")                
                .leftJoinAndSelect("notificationGroup.fromUserNotificationGroup", "fromuser")
                .where("fromuser.idUser = :iduser and forgroup.idGroup = :idgroup", {
                    iduser: request.query.iduser,
                    idgroup: request.query.idgroup
                })               
                .getMany()
            
            return response.send({ notificationsGroup })
        } catch (error) {
            console.error(error)
        }
    }    

    async remove(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup)

        await notificationGroupRepository.delete({idNotificationGroup: parseInt(request.params.id)})

        return response.send({message: "foi"})
    }
}

export default new NotificationGroupController()