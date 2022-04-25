import React, { useEffect, useRef, useState, CSSProperties } from "react";

import ContainerNotifications from '../../../components/organisms/ContainerNotifications'

import {
    Circle,
    Header, 
    IconNotification,
    LabelUnread,
    SectionIconNotification,
    ContentHeader,
    SectionProfile,    
} from './styles'


import * as UserActions from '../../../store/ducks/user/actions'
import * as NotificationActions from '../../../store/ducks/notification/actions'

import { useDispatch, useSelector } from "react-redux";
import ButtonsPanel from "../../organisms/ButtonsPanel";
import Profile from "../../molecules/Profile";

function HeaderComponent() {    
    const dispatch = useDispatch()

    const [visibilityContainerNotifications, setVisibilityContainerNotifications] = useState(false)
    
    const user = useSelector((state) => state.userReducer.user)    
    const quantityUnread = useSelector((state) => state.notificationReducer.quantityUnread)    

    useEffect(() => {
        dispatch(UserActions.tokenAuthenticateRequest())        
    }, [])

    useEffect(() => {
        if(user)
            dispatch(NotificationActions.getUnreadRequest(user.idUser))
    }, [user])    

    function showContainer() {
        setVisibilityContainerNotifications(!visibilityContainerNotifications)
    }

    return (        
        <Header>           
            <ContentHeader>
                <ButtonsPanel />   
                <SectionProfile>
                    <ContainerNotifications 
                    visibility={visibilityContainerNotifications}
                    setVisibility={setVisibilityContainerNotifications}/>
                    <SectionIconNotification onClick={showContainer}>
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