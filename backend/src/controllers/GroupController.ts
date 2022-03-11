import { Debate } from '@models/Debate';
import { User } from '@models/User';
import {NextFunction, Request, Response} from 'express'
import { getRepository } from 'typeorm';

import {Group} from '../entities/Group'
import {PatentMember} from '../entities/PatentMember'

class GroupController {
    async all(request: Request, response: Response, next: NextFunction) {
        const groupRepository = getRepository(Group);

        try {
            const groups = await groupRepository.createQueryBuilder("group")
                .leftJoinAndSelect("group.patentMembersGroup", "patentMember")                                
                .leftJoinAndSelect("patentMember.userPatentMember", "user")
                .leftJoinAndSelect("group.proDebatesGroup", "proDebate")
                .leftJoinAndSelect("group.conDebatesGroup", "conDebate")
                .leftJoinAndSelect("proDebate.debateSideDebate", "proDebateSideDebate")
                .leftJoinAndSelect("conDebate.debateSideDebate", "conDebateSideDebate")                
                .loadRelationCountAndMap("group.participantsGroup", "group.patentMembersGroup")                
                .getMany()

                groups.map(group => {
                    let quantity = 0
                    const debatesMade: Debate[] = []

                    for(var i = 0;i < group.proDebatesGroup.length;i++) {
                        if(!debatesMade.find(debate => debate.idDebate == group.proDebatesGroup[i].debateSideDebate.idDebate)) {
                            quantity++
                            debatesMade.push(group.proDebatesGroup[i].debateSideDebate)
                        }
                    }

                    for(var i = 0;i < group.conDebatesGroup.length;i++) {
                        if(!debatesMade.find(debate => debate.idDebate == group.conDebatesGroup[i].debateSideDebate.idDebate)) {
                            quantity++
                            debatesMade.push(group.conDebatesGroup[i].debateSideDebate)
                        }
                    }

                    group.debatesMade = quantity                    
                    return group
                })

            return response.send({ groups });            
        } catch (error) {
            console.error(error)
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const groupRepository = getRepository(Group);

        try {
            const group = await groupRepository.createQueryBuilder("group")
                .where("group.idGroup = :id", {id: request.params.id})
                .leftJoinAndSelect("group.itemChatsGroup", "itemchat")
                .leftJoinAndSelect("group.patentMembersGroup", "patentmember")
                .leftJoinAndSelect("patentmember.userPatentMember", "user")
                .leftJoinAndSelect("itemchat.userItemChat", "userChat")
                .getOne()

            return response.send({ group });            
        } catch (error) {
            console.error(error)
        }
    }    

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const groupRepository = getRepository(Group);

        try {
            const groups = await groupRepository.createQueryBuilder("group")                                
                .leftJoinAndSelect("group.patentMembersGroup", "patentMember")                                
                .leftJoinAndSelect("patentMember.userPatentMember", "user")
                .leftJoinAndSelect("group.proDebatesGroup", "proDebate")
                .leftJoinAndSelect("group.conDebatesGroup", "conDebate")
                .leftJoinAndSelect("proDebate.debateSideDebate", "proDebateSideDebate")
                .leftJoinAndSelect("conDebate.debateSideDebate", "conDebateSideDebate")
                .where("user.idUser = :id", {id: request.params.iduser})
                .loadRelationCountAndMap("group.participantsGroup", "group.patentMembersGroup")                
                .getMany()

                groups.map(group => {
                    let quantity = 0
                    const debatesMade: Debate[] = []

                    for(var i = 0;i < group.proDebatesGroup.length;i++) {
                        if(!debatesMade.find(debate => debate.idDebate == group.proDebatesGroup[i].debateSideDebate.idDebate)) {
                            quantity++
                            debatesMade.push(group.proDebatesGroup[i].debateSideDebate)
                        }
                    }

                    for(var i = 0;i < group.conDebatesGroup.length;i++) {
                        if(!debatesMade.find(debate => debate.idDebate == group.conDebatesGroup[i].debateSideDebate.idDebate)) {
                            quantity++
                            debatesMade.push(group.conDebatesGroup[i].debateSideDebate)
                        }
                    }

                    group.debatesMade = quantity                    
                    return group
                })
            return response.send({ groups });            
        } catch (error) {
            console.error(error)
        }
    }    

    async save(request: Request, response: Response, next: NextFunction) {
        const groupRepository = getRepository(Group);
        const userRepository = getRepository(User);
        const patentMemberRepository = getRepository(PatentMember);
        
        try {
            
            const { nameGroup, descriptionGroup } =
                request.body.group as Group;                            

            const { idUser } =
                request.body.user as User;                            

            if(!idUser) {
                return response.send({error: "idUser undefined"})
            }
            
            if(!nameGroup) {
                return response.send({error: "nameGroup undefined"})
            }                                     
                  
            if(!descriptionGroup) {
                return response.send({error: "descriptionGroup undefined"})
            }        

            const userExists = await userRepository.findOne({
               idUser
            });      

            if(!userExists) {
                return response.send({error: "userExists not found"})
            }

            const group = groupRepository.create({
               nameGroup,
               descriptionGroup
            });
    
            await groupRepository.save(group);

            const leaderMember = patentMemberRepository.create({
                namePatentMember: 'Leader',
                honorPatentMember: 0,
                groupPatentMember: group,
                userPatentMember: userExists,                         
            })

            patentMemberRepository.save(leaderMember)

            group.patentMembersGroup = [leaderMember]

            return response.send({ group });
        } catch (error) {
            console.error(error)
        }
    }
}

export default new GroupController()