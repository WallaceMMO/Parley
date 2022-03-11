import {action} from 'typesafe-actions'
import {DebateTypes, Debate, Message} from './types'

export const readRequest = () => action(DebateTypes.READ_REQUEST)

export const readSuccess = (debates: Debate[]) => {
    return action(DebateTypes.READ_SUCCESS, { debates })
}

export const FindByGroupRequest = (idGroup: number) => {
    return action(DebateTypes.FINDBYGROUP_DEBATE, { idGroup })
}

export const FindByUserRequest = (idUser: number) => {
    return action(DebateTypes.FINDBYUSER_DEBATE, { idUser })
}

export const readFailure = (error: string) => action(DebateTypes.READ_FAILURE, {error})


interface PropsSideDebate {
    groupSideDebate: number
    userSideDebate: number
}
interface PropsCreateDebate {    
    titleDebate: string
    firstArgument: string
    rounds: number
    time: string    
    conDebate: PropsSideDebate
    proDebate: PropsSideDebate
    side: number
}
export const createRequest = ({firstArgument, titleDebate, time, rounds, conDebate, proDebate, side}: PropsCreateDebate) => 
    action(DebateTypes.CREATE_REQUEST, {firstArgument, titleDebate, time, rounds, conDebate, proDebate, side})

interface PropsAddMessage {
    message: string
    debateId: number
    sideDebateId: number
}
export const loadOneRequest = (id: string, idUser: string) => 
    action(DebateTypes.LOAD_ONE_REQUEST, {id, idUser})

export const addMessageRequest = ({message, debateId, sideDebateId}: PropsAddMessage) => 
    action(DebateTypes.ADDMESSAGE_REQUEST, {message, debateId, sideDebateId})

export const addMessageSuccess = (message: Message) =>
    action(DebateTypes.ADDMESSAGE_SUCCESS, {message})
