import { Debate } from "../debate/types";
import { Group } from "../group/types";
import { User } from "../user/types";

export enum NotificationTypes {
    LOAD_NOTIFICATIONS = '@notification/LOAD_NOTIFICATIONS',
    GETUNREAD_REQUEST = '@notification/GETUNREAD_REQUEST',
    FINDBYUSERSOLICITATION_REQUEST = '@notification/FINDBYUSERSOLICITATION_REQUEST',    
    FINDBYUSERWITHOUTGROUP_REQUEST = '@notification/FINDBYUSERWITHOUTGROUP_REQUEST',    

    CHANGEDSTATUSNOTIFICATION = '@notification/CHANGEDSTATUSNOTIFICATION',
    
    CREATE_REQUEST = '@notification/CREATE_REQUEST',

    ACCEPTDEBATE_REQUEST = '@notification/ACCEPTDEBATE_REQUEST',    
    ACCEPTGROUP_REQUEST = '@notification/ACCEPTGROUP_REQUEST',    
    
    SUCCESS_LOAD_NOTIFICATIONS = '@notification/SUCCESS_LOAD_NOTIFICATIONS',
    SUCCESS_GETUNREAD = '@notification/SUCCESS_GETUNREAD'
}

export enum NotificationStatus {
    ACCPEPTED = 'Accepted',
    WAITING = 'Waiting',
    REJECTED = 'Rejected'
}

export enum NotificationType {
    USERSOLICIT = 'Usersolicit',
    GROUPSOLICIT = 'Groupsolicit',    
}

export interface Notification {
    idNotification: number       
        
    typeNotification: NotificationType
    
    statusNotification: NotificationStatus

    debateNotification: Debate

    groupNotification: Group

    fromUserNotification: User

    forUserNotification: User

    created_at: Date
    updated_at: Date
    version: number
}

export interface NotificationState {
    readonly notifications: Notification[]
    readonly quantityUnread: number
    readonly loading: boolean
    readonly error: boolean
}