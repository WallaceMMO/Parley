import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    ManyToOne,
} from 'typeorm'

import {BaseEntity} from './BaseEntity'

import { Group } from './Group';
import { User } from './User';

import {IsInt} from 'class-validator'

@Entity()
export class PatentMember extends BaseEntity {
    @PrimaryGeneratedColumn()
    @IsInt()
    idPatentMember: number

    @Column()
    namePatentMember: string

    @Column()
    honorPatentMember: number

    @ManyToOne((type) => User, user => user.patentMembersUser)
    userPatentMember: User

    @ManyToOne((type) => Group, group => group.patentMembersGroup)
    groupPatentMember: Group
}
