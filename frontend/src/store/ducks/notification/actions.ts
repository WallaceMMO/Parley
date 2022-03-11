import {action} from 'typesafe-actions'
import {Notification, NotificationTypes, NotificationType} from './types'

export const loadNotificationsRequest = (userId: number) => {
    return action(NotificationTypes.LOAD_NOTIFICATIONS, userId)
}

export const getUnreadRequest = (userId: number) => {
    return action(NotificationTypes.GETUNREAD_REQUEST, {userId})
}

export const successNotificationsrequest = (notifications: Notification[]) => {
    return action(NotificationTypes.SUCCESS_LOAD_NOTIFICATIONS, {notifications})
}

export const successGetUnread = (quantityUnread: number) => {
    return action(NotificationTypes.SUCCESS_GETUNREAD, {quantityUnread})
}

interface PropsCreate {
    idUser: number
    idGroup: number
    typeNotification: NotificationType
}
export const createNotificationRequest = ({idGroup, idUser, typeNotification}:  PropsCreate) => {
    return action(NotificationTypes.CREATE_REQUEST, {idGroup, idUser, typeNotification})
}

interface PropsAcceptDebate {
    idNotification: number
    idGroup: number
    idUser: number
}
export const acceptDebateRequest = ({idNotification, idGroup, idUser}: PropsAcceptDebate) => {
    return action(NotificationTypes.ACCEPTDEBATE_REQUEST, {idNotification, idGroup, idUser})
}
