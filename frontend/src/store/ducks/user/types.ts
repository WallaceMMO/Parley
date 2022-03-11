import { Debate } from "../debate/types";
import { PatentMember } from "../group/types";

export enum UserTypes {
    REGISTER_REQUEST = '@user/REGISTER_REQUEST',
    
    LOGIN_REQUEST = '@user/LOGIN_REQUEST',
    READONE_REQUEST = '@user/READONE_REQUEST',
    READLIST_REQUEST = '@user/READLIST_REQUEST',

    LOGIN_SUCCESS = '@user/LOGIN_SUCCESS',
    
    READLIST_SUCCESS = '@user/READLIST_SUCCESS',
    READONE_SUCCESS = '@user/READONE_SUCCESS',

    LOGIN_FAILURE = '@user/LOGIN_FAILURE',
    TOKEN_AUTHENTICATE = '@user/CHANGE_THEME',
    TOKEN_AUTHENTICATE_SUCCESS = '@user/TOKEN_AUTHENTICATE_SUCCESS',
    TOKEN_AUTHENTICATE_ERROR = '@user/TOKEN_AUTHENTICATE_ERROR',

    CHANGE_THEME = '@config/CHANGE_THEME'

}

export interface User {
    idUser: number
    nameUser: string
    descriptionUser: string
    emailUser: string
    photoProfileUser: Buffer
    passwordUser: string

    themeActive: string

    patentMembersUser: PatentMember[]
    mostViewedDebate?: Debate
    madeDebates?: number
    totalDebates?: Debate[]
}

export interface UserState {
    readonly user: User | null
    readonly userSelected: User | null
    readonly userList: User[]
    readonly token: string
    readonly loading: boolean
    readonly error: boolean
}