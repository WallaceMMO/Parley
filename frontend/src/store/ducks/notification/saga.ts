import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'

import {
    acceptDebateRequest,
    acceptGroupRequest,
    createNotificationRequest,
    FindByUserSolicitationsRequest,
    getUnreadRequest,
    loadNotificationsRequest,    
    successGetUnread,
    successNotificationsrequest,
    FindByUserWithoutGroupRequest
} from './actions'

import { readListSuccess } from '../user/actions'

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

export function* createNotification({payload: {idGroup, forIdUser, fromIdUser, typeNotification}}: ReturnType<typeof createNotificationRequest>) {
    try {
        
        const response: AxiosResponse = yield call(api.post, `/notification/save`, {
            notification: {
                groupNotification: idGroup,
                fromUserNotification: fromIdUser,
                forUserNotification: forIdUser,
                typeNotification: typeNotification
            }
        })

        
        if(response.data.error) {
            throw response.data.error
        }        
        
        yield put(FindByUserWithoutGroupRequest(idGroup))
        yield put(successNotificationsrequest(response.data.notifications))
    } catch (error) {
        console.log(error)
    }
}

export function* FindByUserSolicitationNotifications({payload: {typeNotification, statusNotification}}: ReturnType<typeof FindByUserSolicitationsRequest>) {    
    try {
        const response: AxiosResponse = yield call(api.get, `/notification/findbyusersolicitation/?statusnotification=${statusNotification}&typenotification=${typeNotification}`)
        
        if(response.data.error) {
            throw response.data.error
        }        

        yield put(readListSuccess(response.data.users))
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

export function* FindByUserWithoutGroup({payload: {idGroup}}: ReturnType<typeof FindByUserWithoutGroupRequest>) {    
    try {
        
        const response: AxiosResponse = yield call(api.get, `/notification/findbyuserwithoutgroup/${idGroup}`)
        
        if(response.data.error) {
            throw response.data.error
        }                        

        yield put(readListSuccess(response.data.users))
    } catch (error) {
        console.log(error)
    }
}

export function* acceptGroupNotification({payload: {idGroup, idUser}}: ReturnType<typeof acceptGroupRequest> ) {
    try {
        
        const response: AxiosResponse = yield call(api.put, `/notification/accept/group/?idgroup=${idGroup}&iduser=${idUser}`)

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

        const responseAnother: AxiosResponse = yield call(api.get, `/notificationgroup/getunread/${userId}`)

        if(response.data.error) {
            throw response.data.error
        } 

        if(responseAnother.data.error) {
            throw responseAnother.data.error
        } 

        yield put(successGetUnread(response.data.quantityUnread + responseAnother.data.quantityUnread))
    } catch (error) {
        console.log(error)
    }
}