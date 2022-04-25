import { IsInt } from 'class-validator';
import {
    Entity,
    Column,    
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm'

import {BaseEntity} from './BaseEntity'
import { Debate } from './Debate';
import { Group } from './Group';
import { User } from './User';

export enum NotificationStatus {
    ACCPEPTED = 'Accepted',
    WAITING = 'Waiting',
    REJECTED = 'Rejected'
}

export enum NotificationType {
    INVITEFORUSER = 'InviteForUser',
    INVITEFORGROUP = 'InviteForGroup',
    SOLICITATIONFORGROUP = 'SolicitationForGroup',
}

@Entity()
export class NotificationGroup extends BaseEntity {   
    @PrimaryGeneratedColumn()
    @IsInt()
    idNotificationGroup: number       
    
    @Column({
        type: 'enum',
        enum: NotificationStatus,
        enumName: 'NotificationStatus',
        default: NotificationStatus.WAITING
    })
    statusNotificationGroup: NotificationStatus

    @Column({
        type: 'enum',
        enum: NotificationType,
        enumName: 'NotificationType',
        default: NotificationType.INVITEFORUSER        
    })
    typeNotificationGroup: NotificationType
    
    @ManyToOne(type => User, user => user.forNotificationsGroupUser, {nullable: true})
    forUserNotificationGroup: User

    @ManyToOne(type => User, user => user.fromNotificationsGroupUser, {nullable: true})
    fromUserNotificationGroup: User

    @ManyToOne(type => Group, group => group.forGlobalNotificationsGroup, {nullable: true})
    forGroupNotificationGroup: Group

    @ManyToOne(type => Group, group => group.fromGlobalNotificationsGroup, {
        nullable: true
    })
    fromGroupNotificationGroup: Group
}
