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

import {IsInt, IsDate} from 'class-validator'

export class BaseEntity {    
    @Column()
    @IsDate()
    created_at: Date

    @Column()
    @IsDate()
    updated_at: Date;
    
    @Column()
    @IsInt()
    version: number

    @BeforeUpdate()
    versionUpdate() {
        this.version++
        this.updated_at = new Date()        
    }
    
    @BeforeInsert()
    setDefault() {
        this.version = 1
        this.created_at = new Date()
        this.updated_at = new Date()
    }

}
