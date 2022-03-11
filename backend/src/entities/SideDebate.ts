import { IsInt } from 'class-validator';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import {BaseEntity} from './BaseEntity'
import { Debate } from './Debate';

import { Group } from './Group';
import { User } from './User';

export enum SideEnum {
    PRODEBATE = 'ProDebate',
    CONDEBATE = 'conDebate'
}

@Entity()
export class SideDebate {  
    @PrimaryGeneratedColumn()
    @IsInt()
    idSideDebate: number

    @ManyToOne((type) => User, user => user.conDebatesUser)
    userSideDebate: User

    @ManyToOne((type) => Group, group => group.conDebatesGroup, {
        nullable: true
    })
    groupSideDebate: Group 
    
    @ManyToOne((type) => Debate, group => group.sidesDebate)
    debateSideDebate: Debate

    @OneToMany((type) => SideDebate, sideDebate => sideDebate.messagesSideDebate)
    messagesSideDebate: SideDebate

    @Column({
        type: 'enum',
        enum: SideEnum,
        enumName: 'SideEnum'
    })
    side: SideEnum
}
