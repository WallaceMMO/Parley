import {action} from 'typesafe-actions'
import {UserTypes, User} from './types'
import Link from 'next/link'

interface RegisterProps {
    nameUser: string
    passwordUser: string
    emailUser: string
}

export const registerRequest = (userRegister: RegisterProps) => {
    return action(UserTypes.REGISTER_REQUEST, userRegister)
}

interface loginProps {
    emailUser: string
    passwordUser: string
}
export const loginRequest = (userLogin: loginProps) => {
    return action(UserTypes.LOGIN_REQUEST, userLogin)
}

export const readOneRequest = (idUser: number) => {
    return action(UserTypes.READONE_REQUEST, {idUser})
}

export const loginSuccess = (user: User) => {    
    return action(UserTypes.LOGIN_SUCCESS, { user })
}

export const loginFailure = (error: string) => action(UserTypes.LOGIN_FAILURE, {error})

export const changeTheme = () => action(UserTypes.CHANGE_THEME)

export const tokenAuthenticateRequest = () => {    
    return action(UserTypes.TOKEN_AUTHENTICATE)
}

export const tokenAuthenticateSuccess = (user: User) => action(UserTypes.TOKEN_AUTHENTICATE_SUCCESS, {user})

export const tokenAuthenticateError = () => action(UserTypes.TOKEN_AUTHENTICATE_ERROR)

export const readListRequest = () => 
    action(UserTypes.READLIST_REQUEST)

export const readOneSuccess = (user: User) => 
    action(UserTypes.READONE_SUCCESS, {user})

export const readListSuccess = (users: User[]) => 
    action(UserTypes.READLIST_SUCCESS, {users})