import { Group } from "../group/types";
import { NotificationStatus } from "../notification/types";
import { User } from "../user/types";

export enum NotificationGroupTypes {    
    CREATE_NOTIFICATIONGROUP = '@notificationgroup/CREATE_NOTIFICATIONGROUP',        
    
    LOAD_NOTIFICATIONSBYUSER = '@notificationgroup/LOAD_NOTIFICATIONSBYUSER',        
    LOAD_NOTIFICATIONSBYGROUP = '@notificationgroup/LOAD_NOTIFICATIONSBYGROUP',        

    ACCEPT_NOTIFICATIONGROUP = '@notificationgroup/ACCEPT_NOTIFICATION',        
    REJECT_NOTIFICATIONGROUP = '@notificationgroup/REJECT_NOTIFICATIONGROUP',        
    CHANGEDSTATUSNOTIFICATINOGROUP = '@notificationgroup/CHANGEDSTATUSNOTIFICATINOGROUP',                

    INTERSECTS_USER_AND_GROUP = '@notificationgroup/INTERSECTS_USER_AND_GROUP',
    
    RETURN_USERSBYNOTIFICATIONGROUP = '@notificationgroup/RETURN_USERSBYNOTIFICATIONGROUP',
    RETURN_GROUPSBYNOTIFICATIONGROUP = '@notificationgroup/RETURN_GROUPSBYNOTIFICATIONGROUP',

    SUCCESS_LOAD_NOTIFICATIONSGROUP = '@notificationgroup/SUCCESS_LOAD_NOTIFICATIONSGROUP',
    CHANGEDTYPENOTIFICATIONGROUP = '@notificationgroup/CHANGEDTYPENOTIFICATIONGROUP'
}

export enum NotificationGroupType {
    INVITEFORUSER = 'InviteForUser',
    INVITEFORGROUP = 'InviteForGroup',
    SOLICITATIONFORGROUP = 'SolicitationForGroup',
}

export interface NotificationGroup {   
    idNotificationGroup: number       
    
    statusNotificationGroup: NotificationStatus

    typeNotificationGroup: NotificationGroupType
    
    forUserNotificationGroup: User

    fromUserNotificationGroup: User

    forGroupNotificationGroup: Group

    fromGroupNotificationGroup: Group
}

export enum Situation {
    INVITE = "Invite",
    CANCEL = "Cancel"
}

export interface NotificationGroupState {
    readonly notificationsInGroup: NotificationGroup[]
    
    readonly loading: boolean
    readonly error: boolean
}