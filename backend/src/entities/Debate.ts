import {
    Entity,
    Column,    
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import {BaseEntity} from './BaseEntity'
import { SideDebate } from './SideDebate'

import { Message } from './Message';
import { Notification } from './Notification';

import { IsEnum, IsInt, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ViewsDebate } from './ViewsDebate';

export enum StatusDebate {
    OPEN = 'Open',
    DEBATING = 'Debating',
    CLOSED = "Closed"
}

@Entity()
export class Debate extends BaseEntity {  
    @PrimaryGeneratedColumn()
    @IsInt()
    idDebate: number

    @Column()
    @IsString()
    titleDebate: string;

    @OneToMany(type => ViewsDebate, views => views.quantityViewsDebate)
    viewsDebate: ViewsDebate;
    
    quantityViews: number
    
    @Column()
    @IsString()
    tagsDebate: string  
    
    @Column()
    @IsInt()
    honorDebate: number       

    @Column()
    @IsInt()
    roundsDebate: number    

    @Column({
        type: "enum",
        enum: StatusDebate,
        enumName: 'StatusDebate',
        default: StatusDebate.DEBATING
    })    
    @IsEnum(StatusDebate)
    statusDebate: StatusDebate    
    
    @OneToMany(type => SideDebate, conDebate => conDebate.debateSideDebate)
    @ValidateNested({each: true})
    @Type(() => SideDebate)
    sidesDebate: SideDebate[]

    @OneToMany((type) => Message, (message) => message.debateMessage)
    @ValidateNested({each: true})
    @Type(() => Message)
    messagesDebate: Message[]

    @OneToMany(type => Notification, notification => notification.debateNotification)
    notificationsDebate: Notification[]
}
