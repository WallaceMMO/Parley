import {Reducer} from 'redux'
import {NotificationGroup, NotificationGroupState, NotificationGroupTypes} from './types'
import {HYDRATE} from 'next-redux-wrapper'

const INITIAL_STATE = {
    notificationsInGroup: [] as NotificationGroup[],
    error: false,
    loading: false
}

const reducer: Reducer<NotificationGroupState> = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.notifications}
        case NotificationGroupTypes.FINDBYGROUP_NOTIFICATIONSGROUP:
            return { ...state, loading: true, error: false, notificationsInGroup: []}
        case NotificationGroupTypes.CREATE_REQUEST:
            return { ...state, loading: false, error: false}
        case NotificationGroupTypes.SUCCESS_LOAD_NOTIFICATIONSGROUP:
            return { ...state, loading: false, error: false, notificationsInGroup: action.payload.notificationsGroup}
        default:
            return state
    }
}

export default reducer