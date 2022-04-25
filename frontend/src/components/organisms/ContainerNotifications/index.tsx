import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NotificationGroup } from '../../../store/ducks/notificationGroup/types'

import api from '../../../services/api'

import  {
    Container,
    Separator
} from './styles'

import ItemNotificationGroup from '../../molecules/ItemNotificationGroup'
import { DebateNotification } from '../../molecules/ItemNotification'
import { Notification } from '../../../store/ducks/notification/types'

interface Props {
    visibility: boolean
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

type NotificationObject = {
    dataNotification: Notification | undefined
    dataNotificationGroup: NotificationGroup | undefined
}

const ContainerNotifications = ({visibility, setVisibility}: Props) => {

    const containerRef  = useRef<HTMLDivElement>(null)
    
    const user = useSelector(state => state.userReducer.user)
    const loading = useSelector(state => state.notificationGroupReducer.loading)

    const [everyNotifications, setEveryNotification] = useState<NotificationObject[] | null>(null)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setVisibility(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [containerRef])

    
    
    async function handleGetNotifications(idUser: number) {
        var response = await api.get(`/notification/findbyuser/${idUser}`)

        const notifications = response.data.notifications
        
        response = await api.get(`/notificationgroup/findbyuser/${idUser}/?side=true`)
        const notificationsGroup = response.data.notificationsGroup

        const aux: NotificationObject[] = []

        for(var i = 0, j = 0;i < notifications.length || j < notificationsGroup.length;) {            
            if(i < notifications.length && new Date(notifications.updated_at) > new Date(notificationsGroup.updated_at) || j >= notificationsGroup.length) {                
                aux.push({
                    dataNotification: notifications[i++]
                } as NotificationObject)
            } else {
                aux.push({
                    dataNotificationGroup: notificationsGroup[j++]
                } as NotificationObject)
            }
        }

        setEveryNotification(aux)
    }

    useEffect(() => {
        if(user && visibility) {
            handleGetNotifications(user.idUser)
        }
    }, [visibility])

    return (
        <Container 
        ref={containerRef}
        style={{
            display: visibility ? 'flex' : 'none'
        }}>
            <span>Notificações</span>            

            <Separator />

            {         
                
                everyNotifications?.map(notification => {
                    if(notification.dataNotification)
                        return <DebateNotification notification={notification.dataNotification}/>
                    else if(notification.dataNotificationGroup)
                        return <ItemNotificationGroup notificationGroup={notification.dataNotificationGroup}/>
                })
            }

        </Container>
    )
}

export default ContainerNotifications