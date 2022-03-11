import {
    Entity,
    Column,    
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'

import {BaseEntity} from './BaseEntity'
import { SideDebate } from './SideDebate'

import { Message } from './Message';
import { Notification } from './Notification';

import { IsEnum, IsInt, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Debate } from './Debate';
import { User } from './User';

export enum StatusDebate {
    OPEN = 'Open',
    DEBATING = 'Debating',
    CLOSED = "Closed"
}

@Entity()
export class ViewsDebate extends BaseEntity {  
    @PrimaryGeneratedColumn()
    @IsInt()
    idViewsDebate: number

    @ManyToOne(type => Debate, debate => debate.viewsDebate)
    quantityViewsDebate: Debate   

    @ManyToOne(type => User, user => user.viewsDebateUser)
    quantityViewsUser: User
}
