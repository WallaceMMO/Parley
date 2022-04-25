import {Reducer} from 'redux'
import {NotificationGroup, NotificationGroupState, NotificationGroupTypes} from './types'
import {HYDRATE} from 'next-redux-wrapper'

const INITIAL_STATE: NotificationGroupState = {
    notificationsInGroup: [] as NotificationGroup[],
    error: false,
    loading: false,
}

const reducer: Reducer<NotificationGroupState> = (state = INITIAL_STATE, action) => {
    
    let indexNotificationGroup

    switch(action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.notifications}        
        case NotificationGroupTypes.CREATE_NOTIFICATIONGROUP:
        case NotificationGroupTypes.LOAD_NOTIFICATIONSBYUSER:
        case NotificationGroupTypes.LOAD_NOTIFICATIONSBYGROUP:
        case NotificationGroupTypes.ACCEPT_NOTIFICATIONGROUP:
        case NotificationGroupTypes.REJECT_NOTIFICATIONGROUP:
        case NotificationGroupTypes.INTERSECTS_USER_AND_GROUP:
        case NotificationGroupTypes.RETURN_USERSBYNOTIFICATIONGROUP:
            return { ...state, loading: true, error: false}
        case NotificationGroupTypes.SUCCESS_LOAD_NOTIFICATIONSGROUP:
            const notificationsGroup: NotificationGroup[] = action.payload.notificationsGroup

            notificationsGroup.map(notification => {
              notification.updated_at = new Date(notification.updated_at)
              notification.created_at = new Date(notification.created_at)
  
              return notification
            })            
            return { ...state, loading: false, error: false, notificationsInGroup: action.payload.notificationsGroup}        
        case NotificationGroupTypes.CHANGEDSTATUSNOTIFICATINOGROUP:
            indexNotificationGroup = state.notificationsInGroup.findIndex(not => not.idNotificationGroup == action.payload.idNotificationGroup)

            state.notificationsInGroup[indexNotificationGroup].statusNotificationGroup = action.payload.statusNotificationGroup

            return {
                ...state,
                notificationsInGroup: state.notificationsInGroup
            }
        case NotificationGroupTypes.CHANGEDTYPENOTIFICATIONGROUP:
            indexNotificationGroup = state.notificationsInGroup.findIndex(not => not.idNotificationGroup == action.payload.idNotificationGroup)

            state.notificationsInGroup[indexNotificationGroup].typeNotificationGroup = action.payload.typeNotificationGroup

            return {
                ...state,
                notificationsInGroup: state.notificationsInGroup
            }
        default:
            return state
    }
}

export default reducer