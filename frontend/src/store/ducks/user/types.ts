import { Debate, SideDebate } from "../debate/types";
import { PatentMember } from "../group/types";
import { Notification } from "../notification/types";
import { NotificationGroup } from "../notificationGroup/types";

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

    CHANGE_PHOTOPROFILE = '@user/CHANGE_PHOTOPROFILE',
    CHANGE_THEME = '@config/CHANGE_THEME',
}

export interface User {
    idUser: number 

    nameUser: string;

    descriptionUser: string        

    activityUser: Date
    
    emailUser: string;

    passwordUser: string;

    followersUser: number
    
    photoProfileUser: string    
    

    patentMembersUser: PatentMember[]

    proDebatesUser: SideDebate[]

    conDebatesUser: SideDebate[]

    fromNotificationsUser: Notification[]

    forNotificationsUser: Notification[]

    fromNotificationsGroupUser: NotificationGroup[]

    forNotificationsGroupUser: NotificationGroup[]

    userStarred: User[]

    userFavorites: User[]
    
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
    readonly error: string | null
}