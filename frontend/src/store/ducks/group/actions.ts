import {action} from 'typesafe-actions'
import {GroupTypes, Group, ItemChat} from './types'
import {User} from '../user/types'
import { Socket } from 'socket.io-client'

export const loadRequest = () => {
    return action(GroupTypes.LOAD_GROUPS)
}

export const successLoadRequest = (groups: Group[]) => {
    return action(GroupTypes.SUCCESS_LOAD_GROUPS, { groups })
}

export const successLoadOneRequest = (group: Group) => {
    return action(GroupTypes.SUCCESS_LOAD_GROUP, { group })
}

export const failureLoadRequest = (error: string) => action(GroupTypes.FAILURE_GROUPS, {error})

export const loadOneRequest = (id: string) => action(GroupTypes.LOAD_ONE_REQUEST, {id})

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