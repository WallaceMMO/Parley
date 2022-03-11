import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'
import {
    createRequest, 
    failureLoadRequest, 
    loadOneRequest, 
    loadRequest, 
    outputMessageRequest, 
    outputMessageSuccess, 
    refreshMessagesRequest, 
    successLoadRequest,
    redirectGroup,
    solicitRequest,
    successLoadOneRequest,
    FindByUserRequest
} from './actions'
import {Group} from './types'

export function* loadGroups() {
    try {
        const response: AxiosResponse = yield call(api.get, `/group/read`)

        if(response.data.error) {
            throw response.data.error
        }

        yield put(successLoadRequest(response.data.groups))
    } catch (error) {
        console.error(error)
    }    
}

export function* loadOne({payload: {id}}: ReturnType<typeof loadOneRequest>) {
    try {
        const response: AxiosResponse = yield call(api.get, `/group/read/${id}`)

        if(response.data.error) {
            throw response.data.error
        }
        yield put(successLoadOneRequest(response.data.group))
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

        console.log(response.data)
        if(response.data.error) {
            throw response.data.error
        }

        yield put(redirectGroup(response.data.idGroup))
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

        yield put(successLoadRequest(response.data.groups))
    } catch (error) {
        console.log(error)
    }    
}