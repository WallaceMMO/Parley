import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'

import {
    FindByGroupNotificationsGroupRequest,
    createNotificationRequest,
    successNotificationsrequest
} from './actions'

export function* FindByGroupNotificationsGroup({payload}: ReturnType<typeof FindByGroupNotificationsGroupRequest>) {
    
    try {
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findbygroup/${payload}`)
        
        if(response.data.error) {
            throw response.data.error
        }        
        
        console.log(response.data.notificationsGroup)

        yield put(successNotificationsrequest(response.data.notificationsGroup))
    } catch (error) {
        console.log(error)
    }
}

export function* createNotificationGroup({payload: {idForGroup, idFromGroup, idUser, typeNotificationGroup}}: ReturnType<typeof createNotificationRequest>) {
    try {
        
        const response: AxiosResponse = yield call(api.post, `/notificationgroup/save`, {
            notificationGroup: {
                forGroupNotificationGroup: idForGroup,
                fromGroupNotificationGroup: idFromGroup,
                userNotificationGroup: idUser,
                typeNotificationGroup
            }
        })

        
        if(response.data.error) {
            throw response.data.error
        }        
        
        yield put(successNotificationsrequest(response.data.notificationsGroup))
    } catch (error) {
        console.log(error)
    }
}