import {all, takeLatest} from 'redux-saga/effects'

import {UserTypes} from './user/types'
import {changePhotoProfileUser, login, readList, readOneUser, register, verifyToken} from './user/saga'

import {DebateTypes} from './debate/types'
import {addMessage, createDebate, FindByGroupDebate, FindByUserDebate, loadOneDebate, read} from './debate/saga'

import { GroupTypes } from './group/types'
import { createGroup, FindByUserGroups, loadGroups, loadGroupSelected, loadGroupsInvite, loadGroupsRecruit, loadUsersRecruit, loadUsersSolicitation, outputMessage, refreshMessages, solicitGroup } from './group/saga'

import {NotificationTypes} from './notification/types'
import {acceptDebateNotification, acceptGroupNotification, FindByUserWithoutGroup, createNotification, FindByUserSolicitationNotifications, getUnreadNotification, loadNotifications} from './notification/saga'

import {NotificationGroupTypes} from './notificationGroup/types'
import {createNotificationGroup, AcceptNotificationGroup, LoadNotificationsGroupByGroup, LoadNotificationsGroupByUser, ReturnGroupsByNotificationGroup, ReturnUsersByNotificationGroup, RejectNotificationGroup} from './notificationGroup/saga'

export default function* rootSaga() {
    // @ts-ignore
    return yield all([
        takeLatest(UserTypes.LOGIN_REQUEST, login),

        takeLatest(UserTypes.REGISTER_REQUEST, register),
        
        takeLatest(UserTypes.TOKEN_AUTHENTICATE, verifyToken),

        takeLatest(UserTypes.READLIST_REQUEST, readList),

        takeLatest(UserTypes.READONE_REQUEST, readOneUser),

        takeLatest(UserTypes.CHANGE_PHOTOPROFILE, changePhotoProfileUser),


        takeLatest(DebateTypes.READ_REQUEST, read),

        takeLatest(DebateTypes.LOAD_ONE_REQUEST, loadOneDebate),

        takeLatest(DebateTypes.ADDMESSAGE_REQUEST, addMessage),
        
        takeLatest(DebateTypes.CREATE_REQUEST, createDebate),

        takeLatest(DebateTypes.FINDBYGROUP_DEBATE, FindByGroupDebate),

        takeLatest(DebateTypes.FINDBYUSER_DEBATE, FindByUserDebate),
        

        takeLatest(GroupTypes.REQUEST_LOAD_GROUPS, loadGroups),

        takeLatest(GroupTypes.REQUEST_LOAD_GROUPSELECTED, loadGroupSelected),

        takeLatest(GroupTypes.REQUEST_LOAD_GROUPSINVITES, loadGroupsInvite),

        takeLatest(GroupTypes.REQUEST_LOAD_GROUPSRECRUIT, loadGroupsRecruit),

        takeLatest(GroupTypes.REQUEST_LOAD_USERSRECRUIT, loadUsersRecruit),

        takeLatest(GroupTypes.REQUEST_LOAD_USERSSOLICITATION, loadUsersSolicitation),

        takeLatest(GroupTypes.CREATEGROUP_REQUEST, createGroup),

        takeLatest(GroupTypes.OUTPUT_CHATMESSAGE, outputMessage),

        takeLatest(GroupTypes.REFRESH_MESSAGES, refreshMessages),
        
        takeLatest(GroupTypes.FINDBYUSER_REQUEST, FindByUserGroups),
        

        takeLatest(NotificationTypes.LOAD_NOTIFICATIONS, loadNotifications),

        takeLatest(NotificationTypes.ACCEPTDEBATE_REQUEST, acceptDebateNotification),

        takeLatest(NotificationTypes.CREATE_REQUEST, createNotification),

        takeLatest(NotificationTypes.FINDBYUSERSOLICITATION_REQUEST, FindByUserSolicitationNotifications),

        takeLatest(NotificationTypes.FINDBYUSERWITHOUTGROUP_REQUEST, FindByUserWithoutGroup),
    
        takeLatest(NotificationTypes.ACCEPTGROUP_REQUEST, acceptGroupNotification),

        takeLatest(NotificationTypes.GETUNREAD_REQUEST, getUnreadNotification),


        takeLatest(NotificationGroupTypes.CREATE_NOTIFICATIONGROUP, createNotificationGroup),
        
        takeLatest(NotificationGroupTypes.LOAD_NOTIFICATIONSBYGROUP, LoadNotificationsGroupByGroup),
        
        takeLatest(NotificationGroupTypes.LOAD_NOTIFICATIONSBYUSER, LoadNotificationsGroupByUser),
        
        takeLatest(NotificationGroupTypes.RETURN_GROUPSBYNOTIFICATIONGROUP, ReturnGroupsByNotificationGroup),
        
        takeLatest(NotificationGroupTypes.RETURN_USERSBYNOTIFICATIONGROUP, ReturnUsersByNotificationGroup),

        takeLatest(NotificationGroupTypes.ACCEPT_NOTIFICATIONGROUP, AcceptNotificationGroup),

        takeLatest(NotificationGroupTypes.REJECT_NOTIFICATIONGROUP, RejectNotificationGroup)
    ])
}

