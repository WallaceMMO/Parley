import DebateController from '@controllers/DebateController'
import GroupController from '@controllers/GroupController'
import ItemChatController from '@controllers/ItemChatController'
import MessageController from '@controllers/MessageController'
import PatentMemberController from '@controllers/PatentMemberController'
import SideDebateController from '@controllers/SideDebateController'
import NotificationController from '@controllers/NotificationController'
import NotificationGroupController from '@controllers/NotificationGroupController'

import {Router} from 'express'

import UserController from './controllers/UserController'
import authMiddleware from './middlewares/authMiddleware'

const routes = Router()

//User
routes.get('/', authMiddleware, UserController.index)
routes.get('/user/read/:id', UserController.one)
routes.get('/user/read', UserController.all)
routes.post('/user/auth', UserController.auth)
routes.post('/user/save', UserController.save)
routes.post('/user/changephoto/:id', UserController.changePhotoProfile)

//Debate
routes.get('/debate/read', DebateController.all)
routes.post('/debate/read/:id', DebateController.one)
routes.post('/debate/findbygroup/:idgroup', DebateController.FindByGroup)
routes.post('/debate/findbyuser/:iduser', DebateController.FindByUser)
routes.post('/debate/save', DebateController.save)
routes.delete('/debate/remove/:id', DebateController.remove)

//Message
routes.get('/message/read', MessageController.all)
routes.get('/message/read/:id', MessageController.one)
routes.post('/message/save', MessageController.save)

//Group
routes.get('/group/read', GroupController.all)
routes.get('/group/read/:id', GroupController.one)
routes.get('/group/getgroupspatent/:id', GroupController.GetGroupsPatent)
routes.post('/group/findbyuser/:iduser', GroupController.FindByUser)
routes.post('/group/save', GroupController.save)

//PatentMember
routes.get('/patentmember/read', PatentMemberController.all)
routes.get('/patentmember/read/:id', PatentMemberController.one)
routes.post('/patentmember/save', PatentMemberController.save)

//sideDebate
routes.get('/sidedebate/read', SideDebateController.all)
// routes.get('/sidedebate/read/:id', PatentMemberController.one)
// routes.post('/sidedebate/save', PatentMemberController.save)

//ItemChat
routes.get('/itemchat/read', ItemChatController.all)
routes.get('/itemchat/read/:id', ItemChatController.one)
routes.get('/itemchat/findbygroup/:idgroup', ItemChatController.FindByGroup)
routes.post('/itemchat/save', ItemChatController.save)

// Notification
routes.get('/notification/read', NotificationController.all)
routes.get('/notification/read/:id', NotificationController.one)
routes.get('/notification/getunread/:iduser', NotificationController.getUnread)
routes.get('/notification/findbyuser/:iduser', NotificationController.FindByUser)
routes.get('/notification/findbyusersolicitation/:idgroup', NotificationController.FindByUserSolicitation)
routes.get('/notification/findbyuserwithoutgroup/:idgroup', NotificationController.FindByUserWithoutGroup)
routes.put('/notification/accept/debate/:id', NotificationController.acceptDebate)
routes.put('/notification/accept/group', NotificationController.acceptGroup)
routes.put('/notification/reject/:id', NotificationController.acceptDebate)
routes.post('/notification/save', NotificationController.save)
routes.delete('/notification/remove/:id', NotificationController.remove)

// NotificationGroup
routes.get('/notificationgroup/read', NotificationGroupController.all)
routes.get('/notificationgroup/read/:id', NotificationGroupController.one)
routes.get('/notificationgroup/getunread/:iduser', NotificationGroupController.getUnread)
routes.get('/notificationgroup/findbygroup', NotificationGroupController.FindByGroup)
routes.get('/notificationgroup/findbygroupinvite/:idgroup', NotificationGroupController.FindByGroupInvite)
routes.get('/notificationgroup/findbygroupwithoutinvite/:idgroup', NotificationGroupController.FindByGroupWithoutInvite)
routes.get('/notificationgroup/findbyuser/:iduser', NotificationGroupController.FindByUser)
routes.get('/notificationgroup/findbyuserandgroup', NotificationGroupController.FindByUserAndGroup)
routes.get('/notificationgroup/findusers/:idgroup', NotificationGroupController.FindUsers)
routes.get('/notificationgroup/findbyusersolicitation', NotificationGroupController.FindByUserSolicitation)
routes.put('/notificationgroup/accept/solicit/:id', NotificationGroupController.acceptSolicit)
routes.put('/notificationgroup/accept/invite/:id', NotificationGroupController.acceptInviteGroup)
routes.put('/notificationgroup/reject/:id', NotificationGroupController.rejectNotificationGroup)
routes.post('/notificationgroup/save', NotificationGroupController.save)
routes.delete('/notificationgroup/remove/:id', NotificationGroupController.remove)


export default routes