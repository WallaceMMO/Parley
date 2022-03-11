import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    ManyToMany,
    ManyToOne,
} from 'typeorm'

import {BaseEntity} from './BaseEntity'

import {Debate} from './Debate'
import { User } from './User';

import {IsInt, IsString, ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import { SideDebate } from './SideDebate';

@Entity()
export class Message extends BaseEntity { 
    @PrimaryGeneratedColumn()
    @IsInt()
    idMessage: number

    @Column()
    @IsString()
    textMessage: string;    
    
    @ManyToOne((type) => Debate, (debate) => debate.messagesDebate)
    @ValidateNested()
    @Type(() => Debate)
    debateMessage: Debate    

    @ManyToOne((type) => SideDebate, (sideDebate) => sideDebate.messagesSideDebate)
    @ValidateNested()
    @Type(() => SideDebate)
    sideDebateMessage: SideDebate
}
