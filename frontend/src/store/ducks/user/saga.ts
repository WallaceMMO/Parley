import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import api from '../../../services/api'
import {loginSuccess, loginFailure, loginRequest, tokenAuthenticateSuccess, registerRequest, readListSuccess, readListRequest, tokenAuthenticateError, readOneRequest, readOneSuccess, changePhotoProfile} from './actions'
import {User} from './types'


export function* login({ payload: {emailUser, passwordUser}}: ReturnType<typeof loginRequest>) {
    try {
        const response: AxiosResponse = yield call(api.post, "user/auth", {
            user: {
                emailUser,
                passwordUser
            }
        });
        
        if(response.data.error)
        throw response.data.error
            
        localStorage.setItem("@parley/token", response.data.token)

        yield put(loginSuccess(response.data.user))
    } catch (err) {
        yield put(loginFailure(String(err)))
    }
}

export function* register({ payload: {emailUser, nameUser, passwordUser}}: ReturnType<typeof registerRequest>) {
    try {
        const response: AxiosResponse = yield call(api.post, "user/save", { 
            user: {
                emailUser,
                nameUser,
                passwordUser
            }
        });
                
         if(response.data.error)
            throw response.data.error
            
        localStorage.setItem("@parley/token", response.data.token)

        yield put(loginSuccess(response.data.user))
    } catch (err) {
        yield put(loginFailure(String(err)))
    }
}

export function* verifyToken() {
    const token: string = localStorage.getItem("@parley/token") ?? ''

    try {
        const response: AxiosResponse = yield call(api.get, "/", {
            headers: {
                authorization: token
            }
        });                
        
            
        if(response.data.userID) {
            const responseUser: AxiosResponse = yield call(api.get, `user/read/${response.data.userID}`);
                        
            yield put(tokenAuthenticateSuccess(responseUser.data.user))
        }

    } catch (err) {
        yield put(tokenAuthenticateError())
    }
}

export function* readList() {
    try {
        const response: AxiosResponse = yield call(api.get, 'user/read')

        if(response.data.error)
            throw response.data.error
        
        yield put(readListSuccess(response.data.users))
    } catch (error) {
        console.error(error)
    }
}

export function* readOneUser({payload: {idUser}}: ReturnType<typeof readOneRequest>) {
    try {
        const response: AxiosResponse = yield call(api.get, `user/read/${idUser}`)

        if(response.data.error)
            throw response.data.error
        
        yield put(readOneSuccess(response.data.user))
    } catch (error) {
        console.error(error)
    }
}

export function* changePhotoProfileUser({payload: {base64, idUser}}: ReturnType<typeof changePhotoProfile>) {
    try {            
        const response: AxiosResponse = yield call(api.post, `user/changephoto/${idUser}`, {
            photo: base64
        })

        if(response.data.error)
            throw response.data.error
        
        yield put(readOneSuccess(response.data.user))
    } catch (error) {
        console.error(error)
    }
}