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
    DEBATESOLICITATION_FORUSER = 'DebateSolicitationForUser',
    GROUPSOLICIT = 'Groupsolicit',    
}

@Entity()
export class Notification extends BaseEntity {   
    @PrimaryGeneratedColumn()
    @IsInt()
    idNotification: number       
    
    @Column({
        type: 'enum',
        enum: NotificationStatus,
        enumName: 'NotificationStatus',
        default: NotificationStatus.WAITING
    })
    statusNotification: NotificationStatus

    @Column({
        type: 'enum',
        enum: NotificationType,
        enumName: 'NotificationType',
        default: NotificationType.DEBATESOLICITATION_FORUSER
    })
    typeNotification: NotificationType
    
    @ManyToOne(type => Debate, debate => debate.notificationsDebate, {nullable: true})    
    debateNotification: Debate

    @ManyToOne(type => Group, group => group.notificationsGroup, {nullable: true})    
    groupNotification: Group

    @ManyToOne(type => User, user => user.fromNotificationsUser)
    fromUserNotification: User

    @ManyToOne(type => User, user => user.forNotificationsUser)
    forUserNotification: User
}
