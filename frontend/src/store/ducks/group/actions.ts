import {action} from 'typesafe-actions'
import {GroupTypes, Group, ItemChat} from './types'
import {User} from '../user/types'
import { Socket } from 'socket.io-client'
import { NotificationGroup, NotificationGroupType, Situation } from '../notificationGroup/types'
import { NotificationStatus } from '../notification/types'

export const loadGroupsRequest = () => {
    return action(GroupTypes.REQUEST_LOAD_GROUPS)
}

export const loadGroupsSuccess = (groups: Group[]) => {
    return action(GroupTypes.SUCCESS_LOAD_GROUPS, { groups })
}


export const loadGroupSelectedRequest = (idGroup: number) => {
    return action(GroupTypes.REQUEST_LOAD_GROUPSELECTED, { idGroup })
}

export const loadGroupSelectedSuccess = (group: Group) => {
    return action(GroupTypes.SUCCESS_LOAD_GROUPSELECTED, { group })
}


export const loadGroupsRecruitRequest = (idGroup: number) => {
    return action(GroupTypes.REQUEST_LOAD_GROUPSRECRUIT, { idGroup })
}

export const loadGroupsRecruitSuccess = (groups: Group[]) => {
    return action(GroupTypes.SUCCESS_LOAD_GROUPSRECRUIT, { groups })
}


export const loadUsersRecruitRequest = ({
    idGroup, 
    typeNotificationGroup,
    statusNotificationGroup,    
}: {
    idGroup: number
    typeNotificationGroup: NotificationGroupType,
    statusNotificationGroup: NotificationStatus,
}) => {
    return action(GroupTypes.REQUEST_LOAD_USERSRECRUIT, { idGroup, typeNotificationGroup, statusNotificationGroup })
}

export const loadUsersRecruitSuccess = (users: User[]) => {
    return action(GroupTypes.SUCCESS_LOAD_USERSRECRUIT, { users })
}


export const loadUsersSolicitationRequest = ({
    idGroup,
    statusNotificationGroup
}: {
    idGroup: number
    statusNotificationGroup: NotificationStatus
}) => {
    return action(GroupTypes.REQUEST_LOAD_USERSSOLICITATION, { idGroup, statusNotificationGroup })
}

export const loadUsersSolicitationSuccess = (users: User[]) => {
    return action(GroupTypes.SUCCESS_LOAD_USERSSOLICITATION, { users })
}

export const loadGroupsInviteRequest = ({
    idGroup,
    statusNotificationGroup
}: {
    idGroup: number
    statusNotificationGroup: NotificationStatus
}) => {
    return action(GroupTypes.REQUEST_LOAD_GROUPSINVITES, { idGroup, statusNotificationGroup })
}

export const loadGroupsInviteSuccess = (groups: Group[]) => {
    return action(GroupTypes.SUCCESS_LOAD_GROUPSINVITES, { groups })
}

export const failureLoadRequest = (error: string) => action(GroupTypes.FAILURE_GROUPS, {error})

export const ChangedSituationNotificationGroup = ({notificationGroup, situationNotificationGroup, idGroup, idUser}: {
    notificationGroup: NotificationGroup,
    situationNotificationGroup: Situation,

    idGroup?: number
    idUser?: number
}) => {
    return action(GroupTypes.CHANGEDSITUATIONUSERORGROUP, {notificationGroup, situationNotificationGroup, idGroup, idUser})
}

interface CreateGroup {    
    nameGroup: string;
    descriptionGroup: string;  
    idUser: number      
}
export const createRequest = ({
    nameGroup, 
    descriptionGroup,
    idUser
}: CreateGroup) => action(GroupTypes.CREATEGROUP_REQUEST, {
    nameGroup, 
    descriptionGroup,
    idUser
})

export const redirectGroup = ((idGroup: number) => action(GroupTypes.REDIRECT_GROUP, {idGroup}))

interface outputMessageProps {
    message: string,
    idUser: number,
    idGroup: number,
    socket: Socket
}
export const outputMessageRequest = ({
    message, 
    idUser, 
    idGroup, 
    socket
}: outputMessageProps) => action(GroupTypes.OUTPUT_CHATMESSAGE, {
    message, 
    idGroup, 
    idUser, 
    socket
})

export const outputMessageSuccess = (itemChats: ItemChat[]) => action(GroupTypes.OUTPUT_CHATMESSAGE_SUCCESS, itemChats)

export const refreshMessagesRequest = ({
    idGroup
}: {idGroup: number}) => action(GroupTypes.REFRESH_MESSAGES, {
    idGroup
})

interface PropsSolicitRequest {
    idGroup: number
    userId: number
}
export const solicitRequest = ({
    idGroup,
    userId
}: PropsSolicitRequest) => action(GroupTypes.SOLICIT_REQUEST, {
    idGroup,
    userId
})

export const FindByUserRequest = (idUser: number) => 
    action(GroupTypes.FINDBYUSER_REQUEST, {        
        idUser
    })