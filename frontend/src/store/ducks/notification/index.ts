import {Reducer} from 'redux'
import {Notification, NotificationTypes, NotificationState} from './types'
import {HYDRATE} from 'next-redux-wrapper'

const INITIAL_STATE = {
    notifications: [] as Notification[],
    quantityUnread: 0,
    error: false,
    loading: false
}

const reducer: Reducer<NotificationState> = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.notifications}
        
        case NotificationTypes.LOAD_NOTIFICATIONS:
        case NotificationTypes.ACCEPTDEBATE_REQUEST:
        case NotificationTypes.GETUNREAD_REQUEST:
        case NotificationTypes.FINDBYUSERSOLICITATION_REQUEST:
        case NotificationTypes.FINDBYUSERWITHOUTGROUP_REQUEST:
            return { ...state, loading: true, error: false}

        case NotificationTypes.CHANGEDSTATUSNOTIFICATION:
        let indexNotification = state.notifications.findIndex(not => not.idNotification == action.payload.idNotification)

        state.notifications[indexNotification].statusNotification = action.payload.statusNotification

        return {
            ...state,
            notificationsInGroup: state.notifications
        }
        case NotificationTypes.SUCCESS_LOAD_NOTIFICATIONS:
            const notifications: Notification[] = action.payload.notifications

            notifications.map(notification => {
              notification.updated_at = new Date(notification.updated_at)
              notification.created_at = new Date(notification.created_at)
  
              return notification
            })
            return { ...state, loading: false, error: false, notifications: action.payload.notifications}

        case NotificationTypes.SUCCESS_GETUNREAD:
            return { ...state, loading: false, error: false, quantityUnread: action.payload.quantityUnread}

        default:
            return state
    }
}

export default reducer