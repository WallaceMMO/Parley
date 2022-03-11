import {Request, Response} from 'express'
import { getRepository } from 'typeorm';

import { Group } from '@models/Group';
import { NotificationType } from '@models/NotificationGroup';
import { PatentMember } from '@models/PatentMember';
import { User } from '@models/User';

import {NotificationGroup, NotificationStatus} from '../entities/NotificationGroup'

class NotificationGroupController {
    async all(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);

        try {
            const notificationsGroup = await notificationGroupRepository.createQueryBuilder('notificationGroup')            
            .leftJoinAndSelect("notificationGroup.userNotificationGroup", "user")
            .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")            
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
        const groupRepository = getRepository(Group);

        try {
            const notificationGroup = await notificationGroupRepository.createQueryBuilder("notificationGroup")
                .leftJoinAndSelect("notificationGroup.userNotificationGroup", "user")
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")
                .leftJoinAndSelect("notificationGroup.fromGroupNotificationGroup", "fromgroup")
                .leftJoinAndSelect("forgroup.groupsMember", "groupsMember")
                .where("notificationGroup.idNotificationGroup = :id", {id: request.params.id})
                .getOne()

            notificationGroup.statusNotificationGroup = NotificationStatus.ACCPEPTED
            
            await notificationGroupRepository.save(notificationGroup)            

            if(notificationGroup.typeNotificationGroup == NotificationType.USERSOLICITATION) {
                const newPatentMember = new PatentMember()
                newPatentMember.groupPatentMember = notificationGroup.forGroupNotificationGroup
                newPatentMember.userPatentMember = notificationGroup.userNotificationGroup
                newPatentMember.honorPatentMember = 0
                newPatentMember.namePatentMember = 'Membro'
            
                await patentMemberRepository.insert(newPatentMember)
                                                
                return response.send({ newPatentMember, notificationGroup });            
            } else if(notificationGroup.typeNotificationGroup == NotificationType.GROUPSOLICITATION){
                if(!notificationGroup.forGroupNotificationGroup.groupsMember.find(groupMember => groupMember.idGroup == notificationGroup.fromGroupNotificationGroup.idGroup)) {
                    notificationGroup.forGroupNotificationGroup.groupsMember.push(notificationGroup.fromGroupNotificationGroup)

                    await groupRepository.update(notificationGroup.forGroupNotificationGroup.idGroup, notificationGroup.forGroupNotificationGroup)

                    return response.send({ 
                        forGroupNotificationGroup: notificationGroup.forGroupNotificationGroup, 
                        notificationGroup 
                    });            
                }
            }
            
        } catch (error) {
            console.error(error)
        }
    }    
    
    async save(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);
        const userRepository = getRepository(User);        
        const groupRepository = getRepository(Group);        
        
        try {
            
            const { forGroupNotificationGroup, fromGroupNotificationGroup, userNotificationGroup, typeNotificationGroup } =
              request.body.notificationGroup as NotificationGroup;                                                
                                        
            if(!userNotificationGroup) { 
                return response.send({error: "userNotificationGroup undefined"}) 
            }          

            const userExists = await userRepository.findOne({where: {
                    idUser: userNotificationGroup
                }
            })         

            if(!userExists)
                return response.send({error: 'group does\'n exists'})

            if(!forGroupNotificationGroup) { 
                return response.send({error: "forGroupNotificationGroup undefined"}) 
            } 

            const groupExists = await groupRepository.findOne({where: {
                    idGroup: forGroupNotificationGroup.idGroup
                }
            })
            
            if(!groupExists)
                return response.send({error: 'group does\'n exists'})

            const fromGroupExists = await groupRepository.findOne({where: {
                    idGroup: fromGroupNotificationGroup.idGroup
                }
            })                    
                
            const notificationGroupExists = await notificationGroupRepository.createQueryBuilder('notificationGroup')
                .leftJoinAndSelect("notificationGroup.userNotificationGroup", "user")
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")
                .leftJoinAndSelect("forgroup.patentMembersGroup", "patentMember")
                .leftJoinAndSelect("patentMember.userPatentMember", "userPatentMember")
                .where("userPatentMember.idUser = :idUser" +
                        " or user.idUser = :idUser and forgroup.idGroup = :idGroup", {
                            idUser: userExists.idUser, 
                            idGroup: groupExists.idGroup
                        })                
                .getOne()
            
            if(notificationGroupExists)
                return response.send({error: 'this user has already this notification or member already is from this group'})

            const notificationGroup = notificationGroupRepository.create({
                statusNotificationGroup: NotificationStatus.WAITING,
                forGroupNotificationGroup: groupExists,
                fromGroupNotificationGroup: fromGroupExists,
                userNotificationGroup: userExists,
                typeNotificationGroup: typeNotificationGroup ?? NotificationType.USERSOLICITATION
            });
    
            await notificationGroupRepository.save(notificationGroup);
        
            return response.send({ notificationGroup });
        } catch (error) {
            console.error(error)
        }
    }

    async FindByGroup(request: Request, response: Response) {
        const notificationGroupRepository = getRepository(NotificationGroup);
        const groupRepository = getRepository(Group);        
        
        try {
            const groupExists = await groupRepository.findOne({
                where: {
                    idGroup: request.params.idgroup
                }
            })
            const notificationsGroup = await notificationGroupRepository.createQueryBuilder('notificationGroup')                
                .leftJoinAndSelect("notificationGroup.forGroupNotificationGroup", "forgroup")
                .leftJoinAndSelect("notificationGroup.userNotificationGroup", "user")
                .where("forgroup.idGroup = :id", {id:groupExists.idGroup})
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