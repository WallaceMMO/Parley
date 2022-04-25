import { Socket } from "socket.io-client";
import { Debate, SideDebate } from "../debate/types";
import { NotificationGroup } from "../notificationGroup/types";
import { User } from "../user/types";


export enum GroupTypes {
    
    REQUEST_LOAD_GROUPS = '@group/REQUEST_LOAD_GROUPS',
    REQUEST_LOAD_GROUPSELECTED = '@group/REQUEST_LOAD_GROUPSELECTED',
    REQUEST_LOAD_GROUPSRECRUIT = '@group/REQUEST_LOAD_GROUPSRECRUIT',
    REQUEST_LOAD_USERSRECRUIT = '@group/REQUEST_LOAD_USERSRECRUIT',
    REQUEST_LOAD_USERSSOLICITATION = '@group/REQUEST_LOAD_USERSSOLICITATION',
    REQUEST_LOAD_GROUPSINVITES = '@group/REQUEST_LOAD_GROUPSINVITES',
    
    SUCCESS_LOAD_GROUPS = '@group/SUCCESS_LOAD_GROUPS',
    SUCCESS_LOAD_GROUPSELECTED = '@group/SUCCESS_LOAD_GROUPSELECTED',
    SUCCESS_LOAD_GROUPSRECRUIT = '@group/SUCCESS_LOAD_GROUPSRECRUIT',
    SUCCESS_LOAD_USERSRECRUIT = '@group/SUCCESS_LOAD_USERSRECRUIT',
    SUCCESS_LOAD_USERSSOLICITATION = '@group/SUCCESS_LOAD_USERSSOLICITATION',
    SUCCESS_LOAD_GROUPSINVITES = '@group/SUCCESS_LOAD_GROUPSINVITES',

    FAILURE_GROUPS = '@group/FAILURE_GROUPS',
    
    FINDBYUSER_REQUEST = '@group/FINDBYUSER_REQUEST',

    SOLICIT_REQUEST = '@group/SOLICIT_REQUEST',
    CHANGEDSITUATIONUSERORGROUP = '@group/CHANGEDSITUATIONUSERORGROUP',        

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
    memberGroupPatentMember: Group
    
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
    idGroup: number

    nameGroup: string;           
    
    descriptionGroup: string            

    patentMembersGroup: PatentMember[]

    proDebatesGroup: SideDebate[]
    
    conDebatesGroup: SideDebate[]

    groupsBelongings: Group[]

    groupsMember: Group[]

    itemChatsGroup: ItemChat[]

    notificationsGroup: Notification[]

    forGlobalNotificationsGroup: NotificationGroup[]

    fromGlobalNotificationsGroup: NotificationGroup[]

    participantsGroup?: number
    debatesMade?: number    
}

export interface GroupState {
    readonly groupSelected: Group | null
    readonly groups: Group[]

    readonly usersRecruit: User[]
    readonly groupsRecruit: Group[]            

    readonly usersSolicitation: User[]
    readonly groupsInvites: Group[]            
    
    readonly loading: boolean
    readonly error: boolean
}