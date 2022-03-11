import React, { useEffect } from "react";
import Router from 'next/router'

import {
    Circle,
    Header, 
    IconNotification,
    LabelUnread,
    SectionIconNotification,
    ContentHeader,
    SectionProfile
} from './styles'

import NotificationBar from '../../molecules/NotificationBar'

import * as UserActions from '../../../store/ducks/user/actions'
import * as NotificationActions from '../../../store/ducks/notification/actions'

import { useDispatch, useSelector } from "react-redux";
import ButtonsPanel from "../../organisms/ButtonsPanel";
import Profile from "../../molecules/Profile";

function HeaderComponent() {    
    const dispatch = useDispatch()

    const user = useSelector((state) => state.userReducer.user)    
    const quantityUnread = useSelector((state) => state.notificationReducer.quantityUnread)    

    useEffect(() => {
        dispatch(UserActions.tokenAuthenticateRequest())        
    }, [])

    useEffect(() => {
        if(user)
            dispatch(NotificationActions.getUnreadRequest(user.idUser))
    }, [user])

    return (        
        <Header>           
            <ContentHeader>
                <ButtonsPanel />   
                <SectionProfile>
                    <SectionIconNotification onClick={() => Router.push('/notifications')}>
                        <IconNotification />
                        <Circle>                    
                            <LabelUnread >{quantityUnread}</LabelUnread>
                        </Circle>
                    </SectionIconNotification>
                    <Profile />
                </SectionProfile>         
            </ContentHeader>
        </Header>
    )    
}



export default HeaderComponent