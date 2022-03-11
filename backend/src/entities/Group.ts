import { Socket } from 'socket.io';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    ManyToOne,
    ManyToMany
} from 'typeorm'

import {BaseEntity} from './BaseEntity'
import { SideDebate } from './SideDebate';

import {Debate} from './Debate'
import { ItemChat } from './ItemChat';
import { PatentMember } from './PatentMember';
import { IsInt } from 'class-validator';
import { Notification } from './Notification';
import { NotificationGroup } from './NotificationGroup';

@Entity('group')
export class Group extends BaseEntity {  
    @PrimaryGeneratedColumn()
    @IsInt()
    idGroup: number

    @Column()
    nameGroup: string;           
    
    @Column({
        length: 1500
    })
    descriptionGroup: string    
    
    participantsGroup: number

    debatesMade: number    

    @OneToMany((type) => PatentMember, (patent) => patent.groupPatentMember)
    patentMembersGroup: PatentMember[]

    @OneToMany(type => SideDebate, pro => pro.groupSideDebate)
    proDebatesGroup: SideDebate[]
    
    @OneToMany(type => SideDebate, pro => pro.groupSideDebate)
    conDebatesGroup: SideDebate[]

    @ManyToMany(type => Group, group => group.groupsMember)
    groupsBelongings: Group[]

    @ManyToMany(type => Group, group => group.groupsBelongings)
    groupsMember: Group[]

    @OneToMany(type => ItemChat, item => item.groupItemChat)
    itemChatsGroup: ItemChat[]

    @OneToMany(type => Notification, notification => notification.groupNotification)
    notificationsGroup: Notification[]

    @OneToMany(type => NotificationGroup, notification => notification.forGroupNotificationGroup)
    forGlobalNotificationsGroup: NotificationGroup[]

    @OneToMany(type => NotificationGroup, notification => notification.fromGroupNotificationGroup)
    fromGlobalNotificationsGroup: NotificationGroup[]
}
