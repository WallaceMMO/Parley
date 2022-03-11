import {Reducer} from 'redux'
import {HYDRATE} from 'next-redux-wrapper'
import {UserState, UserTypes, User} from './types'
import Router from "next/router";

const INITIAL_STATE: UserState = {
    user: null,
    userList: [] as User[],
    userSelected: null,
    token: '',
    error: false,
    loading: false
}

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
        case HYDRATE:
          return { ...state, ...action.payload.user}

        case UserTypes.LOGIN_REQUEST:
        case UserTypes.READONE_REQUEST:
        case UserTypes.TOKEN_AUTHENTICATE:  
          return { ...state, loading: true };

        case UserTypes.LOGIN_SUCCESS:
          Router.replace('/')
          return {
          ...state, loading: false, error: false, user: action.payload.user,
          };
        case UserTypes.LOGIN_FAILURE:
          return {
          ...state, loading: false, error: true, user: null,
          };                 
        case UserTypes.TOKEN_AUTHENTICATE_SUCCESS:
          
          return {
          ...state, loading: true, user: action.payload.user
          };

        case UserTypes.READONE_SUCCESS:
          
          return {
          ...state, loading: true, userSelected: action.payload.user
          };

        case UserTypes.TOKEN_AUTHENTICATE_ERROR:
          Router.replace('/login')
          return {
            ...state, loading: false
          }
        case UserTypes.CHANGE_THEME:
          const user = state.user as User
          user.themeActive = user.themeActive == 'dark' ?  'light' : 'dark'
          return {
            ...state,
            user
          }
        case UserTypes.READLIST_REQUEST:
          return {
            ...state, loading: true, userList: []
            };
        case UserTypes.READLIST_SUCCESS:
          return {
            ...state, loading: true, userList: action.payload.users
            };   
        default:
          return state;
      }
}

export default reducer