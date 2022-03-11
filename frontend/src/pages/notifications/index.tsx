import  {useEffect} from 'react'
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

import {DebateNotification} from '../../components/molecules/ItemNotification'

import Header from '../../components/templates/Header'

import * as NotificationActions from '../../store/ducks/notification/actions'
import * as GroupActions from '../../store/ducks/group/actions'

const NotificationPage: NextPage = () => {
    const dispatch = useDispatch()   
    
    const notifications = useSelector(state => state.notificationReducer.notifications) || null
    const user = useSelector(state => state.userReducer.user)

    useEffect(() => {     
        if(user) {
            dispatch(NotificationActions.loadNotificationsRequest(user.idUser))
            dispatch(GroupActions.FindByUserRequest(user.idUser))
        }   
    }, [user])
        
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            maxHeight: 900,
            overflowY: 'auto'
        }}>
            <Header />
            {                
                notifications.map(notification => <DebateNotification notification={notification}/>)
            }
        </div>
    )
}

export default NotificationPage