import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'
import {
    createRequest, 
    failureLoadRequest,          
    outputMessageRequest, 
    outputMessageSuccess, 
    refreshMessagesRequest,     
    redirectGroup,
    solicitRequest,    
    FindByUserRequest,
    ChangedSituationNotificationGroup,
    loadGroupSelectedRequest,
    loadGroupSelectedSuccess,
    loadGroupsRecruitRequest,
    loadGroupsRecruitSuccess,
    loadGroupsRequest,
    loadGroupsSuccess,
    loadUsersRecruitRequest,
    loadUsersRecruitSuccess,
    loadUsersSolicitationRequest,
    loadUsersSolicitationSuccess,
    loadGroupsInviteRequest,
    loadGroupsInviteSuccess
} from './actions'
import {Group} from './types'
import { NotificationStatus } from '../notification/types'

export function* loadGroups() {
    try {
        const response: AxiosResponse = yield call(api.get, `/group/read`)

        if(response.data.error) {
            throw response.data.error
        }

        yield put(loadGroupsSuccess(response.data.groups))
    } catch (error) {
        console.error(error)
    }    
}

export function* loadGroupSelected({payload: {idGroup}}: ReturnType<typeof loadGroupSelectedRequest>) {
    try {
        const response: AxiosResponse = yield call(api.get, `/group/read/${idGroup}`)

        if(response.data.error) {
            throw response.data.error
        }
        yield put(loadGroupSelectedSuccess(response.data.group))
    } catch (error) {
        
    }    
}

export function* createGroup({payload: {
    descriptionGroup, 
    nameGroup,    
    idUser
}}: ReturnType<typeof createRequest>) {
    try {
        const response: AxiosResponse = yield call(api.post, `/group/save`, {
            group: {
                nameGroup,
                descriptionGroup
            },
            user: {
                idUser
            }
        })
        
        if(response.data.error) {
            throw response.data.error
        }

        yield put(redirectGroup(response.data.group.idGroup))
    } catch (error) {
        console.error(error)
    }    
}


export function* outputMessage({payload: {message, idUser, idGroup, socket}}: ReturnType<typeof outputMessageRequest>) {    

    try {
        const response: AxiosResponse = yield call(api.post, `/itemchat/save`, {
            itemChat: {
                messageItemChat: message,
                userItemChat: idUser,
                groupItemChat: idGroup
            }
        })
        
        if(response.data.error) {
            throw response.data.error
        }
        
        socket.emit("message", idUser, idGroup)
        
        yield put(outputMessageSuccess([response.data.itemChat]))
    } catch (error) {
        console.log(error)
    }    
}

export function* refreshMessages({payload: {idGroup}}: ReturnType<typeof refreshMessagesRequest>) {    

    try {
        const response: AxiosResponse = yield call(api.get, `/itemchat/findbygroup/${idGroup}`)
        
        if(response.data.error) {
            throw response.data.error
        }

        yield put(outputMessageSuccess(response.data.itemChats))
    } catch (error) {
        console.log(error)
    }    
}

export function* solicitGroup({payload: {idGroup, userId}}: ReturnType<typeof solicitRequest>) {    
    
    try {
        const response: AxiosResponse = yield call(api.post, `/notificationgroup/save`, {
            notificationGroup: {
                textNotificationGroup: 'solicit',
                userNotificationGroup: userId,
                groupNotificationGroup: idGroup
            }
        })
        
        if(response.data.error) {
            throw response.data.error
        }

        
    } catch (error) {
        console.log(error)
    }    
}

export function* FindByUserGroups({payload: {idUser}}: ReturnType<typeof FindByUserRequest>) {    
    
    try {
        const response: AxiosResponse = yield call(api.post, `/group/findbyuser/${idUser}`)
        
        if(response.data.error) {
            throw response.data.error
        }

        yield put(loadGroupsRecruitSuccess(response.data.groups))
    } catch (error) {
        console.log(error)
    }    
}

export function* loadGroupsRecruit({payload: {idGroup}}: ReturnType<typeof loadGroupsRecruitRequest>) {    
    
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

export function* loadUsersRecruit({payload: {idGroup, typeNotificationGroup, statusNotificationGroup}}: ReturnType<typeof loadUsersRecruitRequest>) {    
    
    try {
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findusers/${idGroup}/?type=${typeNotificationGroup}&status=${ statusNotificationGroup}`)
        
        if(response.data.error) {
            throw response.data.error
        }        

        yield put(loadUsersRecruitSuccess(response.data.users))
    } catch (error) {
        console.log(error)
    }    
}

export function* loadUsersSolicitation({payload: {idGroup, statusNotificationGroup}}: ReturnType<typeof loadUsersSolicitationRequest>) {    
    
    try {        
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findbyusersolicitation/?idgroup=${1}&statusnotificationgroup=${NotificationStatus.WAITING}`)
                
        if(response.data.error) {
            throw response.data.error
        }
        
        console.log(response.data)

        yield put(loadUsersSolicitationSuccess(response.data.users))
    } catch (error) {
        console.log(error)
    }    
}

export function* loadGroupsInvite({payload: {idGroup, statusNotificationGroup}}: ReturnType<typeof loadGroupsInviteRequest>) {    
    
    try {
        const response: AxiosResponse = yield call(api.get, `/notificationgroup/findbygroupinvite/${idGroup}/?statusnotificationgroup=${statusNotificationGroup}`)
        
        if(response.data.error) {
            throw response.data.error
        }

        yield put(loadGroupsInviteSuccess(response.data.groups))
    } catch (error) {
        console.log(error)
    }    
}

