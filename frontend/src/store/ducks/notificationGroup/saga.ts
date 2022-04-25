import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'

import {
    AcceptNotificationGroupRequest,
    LoadNotificationsGroupByGroupRequest,
    LoadNotificationsGroupByUserRequest,
    RejectNotificationGroupRequest,
    ReturnUsersByNotificationGroupRequest,
    createNotificationRequest,
    successNotificationsrequest,
    ReturnGroupsByNotificationGroupRequest,
    ChangedStatusNotificationGroup,    
    ChangedTypeNotificationGroup
} from './actions'

import {
    loadGroupsInviteRequest,
    loadUsersSolicitationRequest
} from '../group/actions'

import  {
    ChangedSituationNotificationGroup, loadGroupsRecruitSuccess, loadUsersRecruitRequest, loadUsersRecruitSuccess
} from '../group/actions'

import { NotificationStatus } from '../notification/types'
import { Situation, NotificationGroupType } from './types'

export function* LoadNotificationsGroupByGroup({payload: {userId, groupId, statusNotification}}: ReturnType<typeof LoadNotificationsGroupByGroupRequest>) {    
    try {        
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findbygroup/?idgroup=${groupId}` + 
                                                            `${userId ? `&iduser=` + userId : ''}` + 
                                                            `${statusNotification ? `&statusnotificationgroup=` + statusNotification : ''}`)
        
        if(response.data.error) {
            throw response.data.error
        }        
                
        yield put(successNotificationsrequest(response.data.notificationsGroup))
    } catch (error) {
        console.log(error)
    }
}

export function* LoadNotificationsGroupByUser({payload: {idUser, statusNotification}}: ReturnType<typeof LoadNotificationsGroupByUserRequest>) {
    
    try {        
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findbyuser/${idUser}/?statusNotification=${statusNotification}`)
        
        if(response.data.error) {
            throw response.data.error
        }        
        
        yield put(successNotificationsrequest(response.data.notificationsGroup))
    } catch (error) {
        console.log(error)
    }
}

export function* ReturnUsersByNotificationGroup({payload: {statusNotification, idGroup, typeNotificationGroup}}: ReturnType<typeof ReturnUsersByNotificationGroupRequest>) {    
    try {                
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findusers/${idGroup}/?statusnotificationgroup=${statusNotification}` +
                                                            (typeNotificationGroup ? '&typenotification=' + typeNotificationGroup : ''))
        
        if(response.data.error) {
            throw response.data.error
        }        

        yield put(loadUsersRecruitSuccess(response.data.users))
    } catch (error) {
        console.log(error)
    }
}

export function* ReturnGroupsByNotificationGroup({payload: {idGroup}}: ReturnType<typeof ReturnGroupsByNotificationGroupRequest>) {    
    try {                        
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findbygroupwithoutinvite/${idGroup}`)
        
        if(response.data.error) {
            throw response.data.error
        }        

        yield put(loadGroupsRecruitSuccess(response.data.groups))
    } catch (error) {
        console.log(error)
    }
}

export function* AcceptNotificationGroup({payload: {idNotificationGroup, idGroup, typeNotificationGroup}}: ReturnType<typeof AcceptNotificationGroupRequest>) {    
    try {                
        if(typeNotificationGroup == NotificationGroupType.SOLICITATIONFORGROUP) {
            const response: AxiosResponse = yield call(api.put, `/notificationgroup/accept/solicit/${idNotificationGroup}`)
    
            if(response.data.error) {
                throw response.data.error
            }        
            
            yield put(ChangedStatusNotificationGroup({
                idNotificationGroup,
                statusNotificationGroup: NotificationStatus.ACCPEPTED
            }))
        } else if(typeNotificationGroup == NotificationGroupType.INVITEFORGROUP) {            
            const response: AxiosResponse = yield call(api.put, `/notificationgroup/accept/invite/${idNotificationGroup}`)
    
            if(response.data.error) {
                throw response.data.error
            }        
            
            yield put(ChangedStatusNotificationGroup({
                idNotificationGroup,
                statusNotificationGroup: NotificationStatus.ACCPEPTED
            }))
        }
    } catch (error) {
        console.log(error)
    }
}

export function* RejectNotificationGroup({payload: {idNotificationGroup}}: ReturnType<typeof RejectNotificationGroupRequest>) {    
    try {                
            const response: AxiosResponse = yield call(api.put, `/notificationgroup/reject/${idNotificationGroup}`)
    
            if(response.data.error) {
                throw response.data.error
            }        
                        
    } catch (error) {
        console.log(error)
    }
}

export function* createNotificationGroup({payload: {idForGroup, idFromGroup, idForUser, idFromUser, typeNotificationGroup}}: ReturnType<typeof createNotificationRequest>) {

    try {

        const response: AxiosResponse = yield call(api.post, `/notificationgroup/save`, {
            notificationGroup: {
                forGroupNotificationGroup: idForGroup,
                fromGroupNotificationGroup: idFromGroup,
                forUserNotificationGroup: idForUser,
                fromUserNotificationGroup: idFromUser,
                typeNotificationGroup
            }
        })


        if(response.data.error) {
            throw response.data.error
        }        
                
        if(typeNotificationGroup == NotificationGroupType.INVITEFORUSER)
            yield put(ChangedSituationNotificationGroup({
                notificationGroup: response.data.notificationGroup,
                situationNotificationGroup: Situation.INVITE,                
                idUser: idForUser
            })) 
        else if(typeNotificationGroup == NotificationGroupType.INVITEFORGROUP){
            yield put(ChangedSituationNotificationGroup({
                notificationGroup: response.data.notificationGroup,
                situationNotificationGroup: Situation.INVITE,                
                idGroup: idForGroup
            })) 
        } else if(typeNotificationGroup == NotificationGroupType.SOLICITATIONFORGROUP) {
            yield put(LoadNotificationsGroupByGroupRequest({groupId:  idForGroup ?? 0}))
        }

    } catch (error) {
        console.log(error)
    }
}