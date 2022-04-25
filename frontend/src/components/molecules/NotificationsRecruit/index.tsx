import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationGroup } from '../../../store/ducks/notificationGroup/types'
import * as NotificationsGroupActions from '../../../store/ducks/notificationGroup/actions'

import  {
    Container,
    ContainerItem,
    ButtonRequest
} from './styles'

interface PropsItemNotification {
    notificationGroup: NotificationGroup
}

const ItemNotification = ({notificationGroup}: PropsItemNotification) => {
    
    return (
        <ContainerItem>
            <h2>{notificationGroup.userNotificationGroup.nameUser}</h2>                    

            <ButtonRequest />
        </ContainerItem>
    )
}
const NotificationsRecruit = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notificationGroupReducer.notificationsInGroup) || null
    const group = useSelector(state => state.groupReducer.group)

    useEffect(() => {        
        if (group)
            dispatch(NotificationsGroupActions.FindByGroupNotificationsGroupRequest({
                groupId: group.idGroup
            }))
    }, [group])

    return (
        <Container>
            {
                notifications?.map(notification => <ItemNotification notificationGroup={notification}/>)    
            }
        </Container>
    )
}

export default NotificationsRecruit