import { Group } from "../group/types";
import { NotificationStatus } from "../notification/types";
import { User } from "../user/types";

export enum NotificationGroupTypes {
    FINDBYGROUP_NOTIFICATIONSGROUP = '@notificationgroup/FINDBYGROUP_NOTIFICATIONSGROUP',
    SUCCESS_LOAD_NOTIFICATIONSGROUP = '@notificationgroup/SUCCESS_LOAD_NOTIFICATIONSGROUP',

    CREATE_REQUEST = '@notificationgroup/CREATE_REQUEST',    
}

export interface NotificationGroup {
    idNotificationGroup: number                   
    
    statusNotificationGroup: NotificationStatus
    
    groupNotificationGroup: Group

    userNotificationGroup: User    
}

export interface NotificationGroupState {
    readonly notificationsInGroup: NotificationGroup[]
    readonly loading: boolean
    readonly error: boolean
}