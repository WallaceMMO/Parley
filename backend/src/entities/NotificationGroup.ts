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
    GROUPSOLICITATION = 'GroupSolicitation',
    USERSOLICITATION = 'UserSolicitation'
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
        default: NotificationType.USERSOLICITATION
    })
    typeNotificationGroup: NotificationType
    
    @ManyToOne(type => User, user => user.notificationsGroupUser)
    userNotificationGroup: User

    @ManyToOne(type => Group, group => group.forGlobalNotificationsGroup)
    forGroupNotificationGroup: Group

    @ManyToOne(type => Group, group => group.fromGlobalNotificationsGroup)
    fromGroupNotificationGroup: Group
}
