import { Socket } from "socket.io-client";
import { Debate } from "../debate/types";
import { User } from "../user/types";


export enum GroupTypes {
    LOAD_GROUPS = '@group/LOAD_GROUPS',
    LOAD_ONE_REQUEST = '@group/LOAD_ONE_REQUEST',
    
    SUCCESS_LOAD_GROUPS = '@group/SUCESS_LOAD_GROUPS',
    SUCCESS_LOAD_GROUP = '@group/SUCCESS_LOAD_GROUP',

    FAILURE_GROUPS = '@group/FAILURE_GROUPS',
    
    FINDBYUSER_REQUEST = '@group/FINDBYUSER_REQUEST',

    SOLICIT_REQUEST = '@group/SOLICIT_REQUEST',

    CREATEGROUP_REQUEST = '@group/CREATEGROUP_REQUEST',
    REDIRECT_GROUP = '@group/REDIRECT_GROUP',
    
    OUTPUT_CHATMESSAGE = '@itemchat/OUTPUT_CHATMESSAGE',
    REFRESH_MESSAGES = '@itemchat/REFRESH_MESSAGES',
    
    OUTPUT_CHATMESSAGE_SUCCESS = '@itemchat/OUTPUT_CHATMESSAGE_SUCCESS',    
}

export interface PatentMember {
    namePatentMember: string;
    honorPatentMember: number;
    userPatentMember: User;

    groupPatentMember?: Group
}

export interface ConDebate {
    userConDebate: User
    groupConDebate: Group 
    debateConDebate: Debate
}

export interface ProDebate {
    userConDebate: User
    groupConDebate: Group 
    debateConDebate: Debate
}

export interface ItemChat {
    idGroup: number;
    messageItemChat: string;
    userItemChat: User
}

export interface Group {
    idGroup: number;
    nameGroup: string;
    descriptionGroup: string;
    patentMembersGroup: PatentMember[]

    proDebatesGroup: ProDebate[]    
    conDebatesGroup: ConDebate[]

    groupsBelongings: Group[]
    groupsMember: Group[]

    itemChatsGroup: ItemChat[]   

    participantsGroup?: number
    debatesMade?: number    
}

export interface GroupState {
    readonly group: Group | null
    readonly groups: Group[]
    readonly loading: boolean
    readonly error: boolean
}