import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'
import {readFailure, readRequest, readSuccess, createRequest, loadOneRequest, addMessageRequest, addMessageSuccess, FindByGroupRequest, FindByUserRequest} from './actions'
import {Debate, DebateTypes} from './types'

export function* read() {
    try {
        const response: AxiosResponse = yield call(api.get, "debate/read");
        if(response.data.error)
        throw response.data.error
        
        yield put(readSuccess(response.data.debates))
    } catch (err) {
        yield put(readFailure(String(err)))
    }
}

export function* createDebate({ payload: {
    firstArgument,
    rounds,    
    time,
    titleDebate,
    conDebate,
    proDebate,
    side
}}: ReturnType<typeof createRequest>) {
    
    try {
        const response: AxiosResponse = yield call(api.post, "debate/save", {
            debate: {
                titleDebate,                                 
                roundsDebate: rounds,
                timeToArgueDebate: time,
                conDebate,
                proDebate,
                side  
            },
            message: {
                text: firstArgument
            }
        });
        
        
        if(response.data.error)
        throw response.data.error
        
        yield put(readSuccess([response.data.debate]))
    } catch (err) {
        console.log(err)
    }
}

export function* loadOneDebate({payload: {id, idUser}}: ReturnType<typeof loadOneRequest>) {
    try {
        const response: AxiosResponse = yield call(api.post, `/debate/read/${id}`, {idUser})        

        if(response.data.error) {
            throw response.data.error
        }

        response.data.debate.created_at = new Date(response.data.debate.created_at)
        
        yield put(readSuccess([response.data.debate]))
    } catch (error) {
        console.log(error)
    }    
}

export function* addMessage({payload: {message, debateId, sideDebateId}}: ReturnType<typeof addMessageRequest>) {
    try {
        const response: AxiosResponse = yield call(api.post, `/message/save`, {
            message: {
                textMessage: message,
                debateMessage: debateId,
                sideDebateMessage: sideDebateId
            }
        })        

        if(response.data.error) {
            throw response.data.error
        }

        yield put(addMessageSuccess(response.data.message))

    } catch (error) {
        console.log(error)
    }
}

export function* FindByGroupDebate({payload: {idGroup}}: ReturnType<typeof FindByGroupRequest>) {
    try {        
        const response: AxiosResponse = yield call(api.post, `/debate/findbygroup/${idGroup}`)        

        if(response.data.error) {
            throw response.data.error
        }

        yield put(readSuccess(response.data.debates))

    } catch (error) {
        console.log(error)
    }
}

export function* FindByUserDebate({payload: {idUser}}: ReturnType<typeof FindByUserRequest>) {
    try {        
        const response: AxiosResponse = yield call(api.post, `/debate/findbyuser/${idUser}`)        

        if(response.data.error) {
            throw response.data.error
        }

        yield put(readSuccess(response.data.debates))

    } catch (error) {
        console.log(error)
    }
}