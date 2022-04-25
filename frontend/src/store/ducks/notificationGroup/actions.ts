import {action} from 'typesafe-actions'
import { NotificationStatus } from '../notification/types'

import {NotificationGroup, NotificationGroupTypes, NotificationGroupState, NotificationGroupType, Situation} from './types'

interface PropsFindByGroup {
    groupId: number
    userId?: number
    statusNotification?: NotificationStatus
} // FindByGroupWithoutInviteRequest
export const LoadNotificationsGroupByGroupRequest = ({groupId, userId, statusNotification}: PropsFindByGroup) => {        
    return action(NotificationGroupTypes.LOAD_NOTIFICATIONSBYGROUP, {groupId, userId, statusNotification})
}

export const LoadNotificationsGroupByUserRequest = ({idUser, statusNotification}: {
    idUser: number,
    statusNotification: NotificationStatus
}) => {
    return action(NotificationGroupTypes.LOAD_NOTIFICATIONSBYUSER, {idUser, statusNotification})
} //FindByUserSolicitationsRequest

interface FindbyUserProps {
    statusNotification: NotificationStatus
    idGroup: number    
    typeNotificationGroup: NotificationGroupType
}
export const ReturnUsersByNotificationGroupRequest = ({statusNotification, idGroup, typeNotificationGroup}: FindbyUserProps) => {
    return action(NotificationGroupTypes.RETURN_USERSBYNOTIFICATIONGROUP, {statusNotification, idGroup, typeNotificationGroup})
}

export const ReturnGroupsByNotificationGroupRequest = ({statusNotification, idGroup}: FindbyUserProps) => {
    return action(NotificationGroupTypes.RETURN_GROUPSBYNOTIFICATIONGROUP, {statusNotification, idGroup})
}

export const AcceptNotificationGroupRequest = ({
    idNotificationGroup,
    typeNotificationGroup,
    idGroup
}: {
    idNotificationGroup: number,
    typeNotificationGroup: NotificationGroupType,
    idGroup: number
}) => {
    return action(NotificationGroupTypes.ACCEPT_NOTIFICATIONGROUP, {idNotificationGroup, typeNotificationGroup, idGroup})
}

export const RejectNotificationGroupRequest = (idNotificationGroup: number) => {
    return action(NotificationGroupTypes.REJECT_NOTIFICATIONGROUP, {idNotificationGroup})
}

export const successNotificationsrequest = (notificationsGroup: NotificationGroup[]) => {
    return action(NotificationGroupTypes.SUCCESS_LOAD_NOTIFICATIONSGROUP, {notificationsGroup})
}

export const ChangedStatusNotificationGroup = ({idNotificationGroup, statusNotificationGroup}: {
    idNotificationGroup: number,
    statusNotificationGroup: NotificationStatus
}) => {
    return action(NotificationGroupTypes.CHANGEDSTATUSNOTIFICATINOGROUP, {idNotificationGroup, statusNotificationGroup})
}

export const ChangedTypeNotificationGroup = ({idNotificationGroup, typeNotificationGroup}: {
    idNotificationGroup: number,
    typeNotificationGroup: NotificationGroupType
}) => {
    return action(NotificationGroupTypes.CHANGEDTYPENOTIFICATIONGROUP, {idNotificationGroup, typeNotificationGroup})
}
interface PropsCreate {
    idForUser?: number
    idFromUser: number
    idForGroup?: number    
    idFromGroup?: number
    typeNotificationGroup: NotificationGroupType
}
export const createNotificationRequest = ({idForGroup, idFromGroup, idForUser, idFromUser, typeNotificationGroup}:  PropsCreate) => {
    return action(NotificationGroupTypes.CREATE_NOTIFICATIONGROUP, {idForGroup, idForUser, idFromUser, idFromGroup, typeNotificationGroup})
}