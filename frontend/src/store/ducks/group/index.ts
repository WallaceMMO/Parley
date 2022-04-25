import {Reducer} from 'redux'
import {GroupTypes, GroupState, Group, ItemChat} from './types'
import {HYDRATE} from 'next-redux-wrapper'
import Router from 'next/router'
import { Situation } from '../notificationGroup/types'

const INITIAL_STATE: GroupState = {
    groupSelected: null,
    groups: [],

    groupsRecruit: [],
    usersRecruit: [],

    groupsInvites: [],
    usersSolicitation: [],

    error: false,
    loading: false
}

const reducer: Reducer<GroupState> = (state = INITIAL_STATE, action) => {

    const groupSelected = <Group>state.groupSelected

    switch(action.type) {
        case HYDRATE:
          return { ...state, ...action.payload.group};                  

        case GroupTypes.REQUEST_LOAD_GROUPS:
        case GroupTypes.REQUEST_LOAD_GROUPSELECTED:
        case GroupTypes.REQUEST_LOAD_GROUPSINVITES:
        case GroupTypes.REQUEST_LOAD_GROUPSRECRUIT:
        case GroupTypes.REQUEST_LOAD_USERSSOLICITATION:        
        case GroupTypes.OUTPUT_CHATMESSAGE:
        case GroupTypes.SOLICIT_REQUEST:
        case GroupTypes.FINDBYUSER_REQUEST:
            return {
                ...state, loading: true, error: false
            }

        case GroupTypes.SUCCESS_LOAD_GROUPS:
            return { ...state, loading: false, error: false, groups: action.payload.groups}

        case GroupTypes.SUCCESS_LOAD_GROUPSELECTED:
            return { ...state, loading: false, error: false, groupSelected: action.payload.group}

        case GroupTypes.SUCCESS_LOAD_GROUPSINVITES:
            return { ...state, loading: false, error: false, groupsInvites: action.payload.groups}

        case GroupTypes.SUCCESS_LOAD_GROUPSRECRUIT:
            return { ...state, loading: false, error: false, groupsRecruit: action.payload.groups}

        case GroupTypes.SUCCESS_LOAD_USERSRECRUIT:
            return { ...state, loading: false, error: false, usersRecruit: action.payload.users}
        
        case GroupTypes.SUCCESS_LOAD_USERSSOLICITATION:
            return { ...state, loading: false, error: false, usersSolicitation: action.payload.users}

        case GroupTypes.FAILURE_GROUPS:
            return {
            ...state, loading: false, error: true, group: INITIAL_STATE.groupSelected,
            };

        case GroupTypes.REDIRECT_GROUP:
            Router.replace(`/group/${action.payload.idGroup}`)
            return {
                ...state, loading: false, error: false
            }

        case GroupTypes.CHANGEDSITUATIONUSERORGROUP:
            let index
            let changeUsers, changeGroups            
            if(action.payload.idUser) {
                index = state.usersRecruit.findIndex(user => user.idUser == action.payload.idUser)
                
                state.usersRecruit[index].forNotificationsGroupUser = [action.payload.notificationGroup]

                changeUsers = state.usersRecruit.slice()
            } else {
                index = state.groupsRecruit.findIndex(group => group.idGroup == action.payload.idGroup)
                
                state.groupsRecruit[index].forGlobalNotificationsGroup = [action.payload.notificationGroup]
                
                changeGroups = state.groupsRecruit.slice()
            }

            return {
                ...state,
                groupsRecruit: changeGroups,
                usersRecruit: changeUsers
            }            
                   
        case GroupTypes.OUTPUT_CHATMESSAGE_SUCCESS:                        
            return {
                ...state, loading: true, error: false, group: {
                    ...groupSelected,
                    itemChatsGroup: action.payload.length == 1 ?
                        [...groupSelected.itemChatsGroup, ...action.payload] :
                        action.payload
                }
            }
                     
        default:
            return state;
    }
}

export default reducer