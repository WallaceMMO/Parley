import {action} from 'typesafe-actions'
import { NotificationType } from '../notification/types'
import {NotificationGroup, NotificationGroupTypes, NotificationGroupState} from './types'

export const FindByGroupNotificationsGroupRequest = (groupId: number) => {
    return action(NotificationGroupTypes.FINDBYGROUP_NOTIFICATIONSGROUP, groupId)
}

export const successNotificationsrequest = (notificationsGroup: NotificationGroup[]) => {
    return action(NotificationGroupTypes.SUCCESS_LOAD_NOTIFICATIONSGROUP, {notificationsGroup})
}

interface PropsCreate {
    idUser: number
    idForGroup: number    
    idFromGroup?: number
    typeNotificationGroup: NotificationType
}
export const createNotificationRequest = ({idForGroup, idFromGroup, idUser, typeNotificationGroup}:  PropsCreate) => {
    return action(NotificationGroupTypes.CREATE_REQUEST, {idForGroup, idUser, idFromGroup, typeNotificationGroup})
}