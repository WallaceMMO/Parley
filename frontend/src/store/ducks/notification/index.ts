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
            return { ...state, loading: true, error: false}

        case NotificationTypes.SUCCESS_LOAD_NOTIFICATIONS:
            return { ...state, loading: false, error: false, notifications: action.payload.notifications}

        case NotificationTypes.SUCCESS_GETUNREAD:
            return { ...state, loading: false, error: false, quantityUnread: action.payload.quantityUnread}

        default:
            return state
    }
}

export default reducer