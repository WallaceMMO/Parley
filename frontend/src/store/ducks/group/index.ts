import {Reducer} from 'redux'
import {GroupTypes, GroupState, Group, ItemChat} from './types'
import {HYDRATE} from 'next-redux-wrapper'
import Router from 'next/router'

const INITIAL_STATE = {
    group: null,
    groups: [],
    error: false,
    loading: false
}

const reducer: Reducer<GroupState> = (state = INITIAL_STATE, action) => {

    const groupSelected = <Group>state.group

    switch(action.type) {
        case HYDRATE:
          return { ...state, ...action.payload.group};                  

        case GroupTypes.LOAD_GROUPS:
        case GroupTypes.LOAD_ONE_REQUEST:
        case GroupTypes.OUTPUT_CHATMESSAGE:
        case GroupTypes.SOLICIT_REQUEST:
        case GroupTypes.FINDBYUSER_REQUEST:
            return {
                ...state, loading: true, error: false
            }

        case GroupTypes.SUCCESS_LOAD_GROUPS:            
            return { ...state, loading: false, error: false, groups: action.payload.groups}

        case GroupTypes.SUCCESS_LOAD_GROUP:            
            return { ...state, loading: false, error: false, group: action.payload.group}

        case GroupTypes.FAILURE_GROUPS:
            return {
            ...state, loading: false, error: true, group: INITIAL_STATE.group,
            };

        case GroupTypes.REDIRECT_GROUP:
            Router.replace(`/group/${action.payload.idGroup}`)
            return {
                ...state, loading: false, error: false
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