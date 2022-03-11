
import { Group } from '../group/types';
import {User} from '../user/types'

export enum DebateTypes {
    READ_REQUEST = '@debate/READ_REQUEST',
    READ_SUCCESS = '@debate/READ_SUCCESS',
    READ_FAILURE = '@debate/READ_FAILURE',

    LOAD_ONE_REQUEST = '@debate/LOAD_ONE_REQUEST',
    FINDBYGROUP_DEBATE = '@debate/FINDBYGROUP_DEBATE',
    FINDBYUSER_DEBATE = '@debate/FINDBYUSER_DEBATE',
    
    ADDMESSAGE_REQUEST = '@message/ADDMESSAGE_REQUEST',
    ADDMESSAGE_SUCCESS = '@message/ADDMESSAGE_SUCCESS',

    CREATE_REQUEST = '@debate/CREATE_REQUEST'
}

export interface Message {
    id: number
    textMessage: string 
    sideDebateMessage: SideDebate
}

export enum SideEnum {
    PRODEBATE = 'ProDebate',
    CONDEBATE = 'conDebate'
}
export interface SideDebate {
    idSideDebate: number
    userSideDebate: User
    groupSideDebate: Group
    side: SideEnum    
}

export interface Debate {
    idDebate: number
    titleDebate: string    
    quantityViews: number
    tagsDebate: string
    statusDebate: string
    sidesDebate: SideDebate[]
    messagesDebate: Message[]
    roundsDebate: number
    created_at: Date
    updated_at: Date
    version: number
}

export interface DebateState {
    readonly debates: Debate[]
    readonly debateSelected: Debate | null
    readonly loading: boolean
    readonly error: boolean
}