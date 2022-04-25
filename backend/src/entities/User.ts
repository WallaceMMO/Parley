import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
    OneToMany,
    ManyToMany,
    OneToOne
} from 'typeorm'

import bcrypt from 'bcryptjs'

import {BaseEntity} from './BaseEntity'
import { Message } from './Message';
import { Debate } from './Debate';
import { PatentMember } from './PatentMember';
import { Notification } from './Notification';
import { SideDebate } from './SideDebate';

import { ItemChat } from './ItemChat';
import { ViewsDebate } from './ViewsDebate';
import { NotificationGroup } from './NotificationGroup';

import { IsEmail, IsInt, IsNotEmpty, MinLength } from 'class-validator';
@Entity()
export class User extends BaseEntity{   
    @PrimaryGeneratedColumn()    
    idUser: number 

    @Column()
    @IsNotEmpty()
    @MinLength(1)
    nameUser: string;

    @Column()
    descriptionUser: string            
    
    @Column()
    @IsNotEmpty()
    @MinLength(1)  
    @IsEmail()  
    emailUser: string;

    @Column()
    @IsNotEmpty()
    @MinLength(6)    
    passwordUser: string;    
    
    @Column("longblob", {nullable: true})
    photoProfileUser: Buffer    
    
    @OneToMany(type => ViewsDebate, views => views.quantityViewsUser)
    viewsDebateUser: ViewsDebate;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.passwordUser = bcrypt.hashSync(this.passwordUser, 8)
    }        

    @OneToMany((type) => PatentMember, (patent) => patent.userPatentMember)
    patentMembersUser: PatentMember[]

    @OneToMany((type) => SideDebate, (pro) => pro.userSideDebate)
    proDebatesUser: SideDebate[]

    @OneToMany((type) => SideDebate, (pro) => pro.userSideDebate)
    conDebatesUser: SideDebate[]

    @OneToMany(type => Notification, notification => notification.fromUserNotification)
    fromNotificationsUser: Notification[]

    @OneToMany(type => Notification, notification => notification.forUserNotification)
    forNotificationsUser: Notification[]

    @OneToMany(type => NotificationGroup, notification => notification.forUserNotificationGroup)
    forNotificationsGroupUser: NotificationGroup[]

    @OneToMany(type => NotificationGroup, notification => notification.fromUserNotificationGroup)
    fromNotificationsGroupUser: NotificationGroup[]

    @ManyToMany(type => User, user => user.userFavorites)
    userStarred: User[]

    @ManyToMany(type => User, user => user.userStarred)
    userFavorites: User[]

    @OneToMany(type => ItemChat, item => item.userItemChat)
    itemsChatUser: ItemChat[]
}
