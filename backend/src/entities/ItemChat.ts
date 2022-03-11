import { IsInt } from 'class-validator';
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import {BaseEntity} from './BaseEntity'
import { Group } from './Group';
import { User } from './User';

@Entity()
export class ItemChat extends BaseEntity {   
    @PrimaryGeneratedColumn()
    @IsInt()
    idItemChat: number

    @Column()
    messageItemChat: string

    @ManyToOne((type) => Group, group => group.itemChatsGroup)
    groupItemChat: Group 

    @ManyToOne((type) => User, chat => chat.itemsChatUser)
    userItemChat: User
}
