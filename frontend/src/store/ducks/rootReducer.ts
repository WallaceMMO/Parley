import {combineReducers} from 'redux'

import user from './user'
import debate from './debate'
import group from './group'
import notification from './notification'
import notificationGroup from './notificationGroup'

const reducers = combineReducers({
    userReducer: user,
    debateReducer: debate,
    groupReducer: group,
    notificationReducer: notification,
    notificationGroupReducer: notificationGroup
})

export default reducers

export type AppState = ReturnType<typeof reducers>