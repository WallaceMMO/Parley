import {Reducer} from 'redux'
import {DebateTypes, Debate, DebateState} from './types'
import {HYDRATE} from 'next-redux-wrapper'

const INICIAL_STATE: DebateState = {
    debates: [] as Debate[],    
    debateSelected: null,
    error: false,
    loading: false
}

const reducer: Reducer<DebateState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case HYDRATE:
          return {...state, ...action.payload}
        case DebateTypes.READ_REQUEST:
        case DebateTypes.FINDBYGROUP_DEBATE:          
        case DebateTypes.FINDBYUSER_DEBATE:          
          return { ...state, loading: true, error: false };
          
        case DebateTypes.READ_SUCCESS:
          const debates: Debate[] = action.payload.debates

          debates.map(debate => {
            debate.updated_at = new Date(debate.updated_at)
            debate.created_at = new Date(debate.created_at)

            return debate
          })
          return {
            ...state, loading: false, error: false, 
            debates: debates,            
            debateSelected: debates[0]          
          };

          case DebateTypes.CONCAT_DEBATES:
          const debatesConcat: Debate[] = action.payload.debates

          debatesConcat.map(debate => {
            debate.updated_at = new Date(debate.updated_at)
            debate.created_at = new Date(debate.created_at)

            return debate
          })
          return {
            ...state, loading: false, error: false, 
            debates: [...state.debates, ...debatesConcat]                        
          };
        case DebateTypes.READ_FAILURE:
          return {
          ...state, loading: false, error: true, debates: [] as Debate[],
          };

        case DebateTypes.ADDMESSAGE_REQUEST:
          return {
            ...state, loading: true, error: false
          }

        case DebateTypes.ADDMESSAGE_SUCCESS:          
          const debate = state.debateSelected
          debate?.messagesDebate.push(action.payload.message)

          return {
            ...state, loading: true, error: false, debateSelected: {
              ...debate,
              messagesDebate: debate?.messagesDebate
            }
          }

        default:
          return state;
      }
}

export default reducer