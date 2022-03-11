import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'

import {
    acceptDebateRequest,
    createNotificationRequest,
    getUnreadRequest,
    loadNotificationsRequest,    
    successGetUnread,
    successNotificationsrequest
} from './actions'

import {NotificationType} from './types'

export function* loadNotifications({payload}: ReturnType<typeof loadNotificationsRequest>) {
    try {
        const response: AxiosResponse = yield call(api.get, `/notification/findbyuser/${payload}`)

        
        if(response.data.error) {
            throw response.data.error
        }        
        
        yield put(successNotificationsrequest(response.data.notifications))
    } catch (error) {
        console.log(error)
    }
}

export function* createNotification({payload: {idGroup, idUser, typeNotification}}: ReturnType<typeof createNotificationRequest>) {
    try {
        const response: AxiosResponse = yield call(api.post, `/notification/save`, {
            notification: {
                groupNotificationGroup: idGroup,
                userNotificationGroup: idUser,
                typeNotification: typeNotification
            }
        })

        
        if(response.data.error) {
            throw response.data.error
        }        
        
        yield put(successNotificationsrequest(response.data.notifications))
    } catch (error) {
        console.log(error)
    }
}

export function* acceptDebateNotification({payload: {idGroup, idNotification, idUser}}: ReturnType<typeof acceptDebateRequest> ) {
    try {
        const response: AxiosResponse = yield call(api.put, `/notification/accept/debate/${idNotification}`, {
            sideDebate: {
                groupSideDebate: idGroup                
            }
        })

         if(response.data.error) {
            throw response.data.error
        } 

        yield put(getUnreadRequest(idUser))
        yield put(loadNotificationsRequest(idUser))
    } catch (error) {
        console.log(error)
    }
}

export function* getUnreadNotification({payload: {userId}}: ReturnType<typeof getUnreadRequest> ) {
    try {
        const response: AxiosResponse = yield call(api.get, `/notification/getunread/${userId}`)

         if(response.data.error) {
            throw response.data.error
        } 

        yield put(successGetUnread(response.data.quantityUnread))
    } catch (error) {
        console.log(error)
    }
}