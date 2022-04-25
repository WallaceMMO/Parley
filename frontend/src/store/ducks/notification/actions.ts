import {action} from 'typesafe-actions'
import {Notification, NotificationTypes, NotificationType, NotificationStatus} from './types'

export const loadNotificationsRequest = (userId: number) => {
    return action(NotificationTypes.LOAD_NOTIFICATIONS, userId)
}

export const getUnreadRequest = (userId: number) => {
    return action(NotificationTypes.GETUNREAD_REQUEST, {userId})
}

export const ChangedStatusNotification = ({idNotificationGroup, statusNotificationGroup}: {
    idNotificationGroup: number,
    statusNotificationGroup: NotificationStatus
}) => {
    return action(NotificationTypes.CHANGEDSTATUSNOTIFICATION, {idNotificationGroup, statusNotificationGroup})
}

export const successNotificationsrequest = (notifications: Notification[]) => {
    return action(NotificationTypes.SUCCESS_LOAD_NOTIFICATIONS, {notifications})
}

export const successGetUnread = (quantityUnread: number) => {
    return action(NotificationTypes.SUCCESS_GETUNREAD, {quantityUnread})
}

interface PropsCreate {
    forIdUser: number
    fromIdUser: number
    idGroup: number
    typeNotification: NotificationType
}
export const createNotificationRequest = ({idGroup, forIdUser, fromIdUser, typeNotification}:  PropsCreate) => {
    return action(NotificationTypes.CREATE_REQUEST, {idGroup, forIdUser, fromIdUser, typeNotification})
}

interface PropsFindByUserSolicitation {
    typeNotification: NotificationType
    statusNotification: NotificationStatus
}
export const FindByUserSolicitationsRequest = ({statusNotification, typeNotification}: PropsFindByUserSolicitation) => {
    return action(NotificationTypes.FINDBYUSERSOLICITATION_REQUEST, {statusNotification, typeNotification})
}

interface PropsAcceptDebate {
    idNotification: number
    idGroup: number
    idUser: number
}
export const acceptDebateRequest = ({idNotification, idGroup, idUser}: PropsAcceptDebate) => {
    return action(NotificationTypes.ACCEPTDEBATE_REQUEST, {idNotification, idGroup, idUser})
}

export const FindByUserWithoutGroupRequest = (idGroup: number) => {
    return action(NotificationTypes.FINDBYUSERWITHOUTGROUP_REQUEST, {idGroup})
}

interface PropsAcceptGroup {
    idGroup: number    
    idUser: number
}
export const acceptGroupRequest = ({idGroup, idUser}: PropsAcceptGroup) => {
    return action(NotificationTypes.ACCEPTGROUP_REQUEST, {idGroup, idUser})
}