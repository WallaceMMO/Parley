import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import  {
    Container
} from './styles'

import ItemNotificationGroup from '../../../molecules/ItemNotificationGroup'
import { NotificationGroup } from '../../../../store/ducks/notificationGroup/types'
import api from '../../../../services/api'


const NotificationsGroup = () => {
    const [notificationsGroup, setNotificationsGroup] = useState<NotificationGroup[]>([])

    const group = useSelector(state => state.groupReducer.group)

    async function readNotificationsGroup(idGroup: number) {
        const response = await api.get(`notificationgroup/findbygroup/?idgroup=${idGroup}`)

        setNotificationsGroup(response.data.notificationsGroup)
    }

    useEffect(() => {
        if(group) {
            readNotificationsGroup(group.idGroup)
        }
    }, [group])
    
    return (
        <Container>
        {
            notificationsGroup.map(notificationGroup => <ItemNotificationGroup notificationGroup={notificationGroup}/>)
        }  
        </Container>
    )
}

export default NotificationsGroup