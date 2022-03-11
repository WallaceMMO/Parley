import api from '../../../services/api'
import { Notification, NotificationStatus } from '../../../store/ducks/notification/types'

import * as NotificationActions from '../../../store/ducks/notification/actions'


import {
    Container,
    Label,
    SectionLabels,
    SectionButtons,
    Button
} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import SelectControl from '../SelectControl'
import { useEffect, useState } from 'react'

interface PropsDebateNotification {
    notification: Notification
}

const DebateNotification = ({notification}: PropsDebateNotification) => {
    const dispatch = useDispatch()

    const [selectedGroup, setSelectedGroup] = useState(0)

    const user = useSelector(state => state.userReducer.user)
    const groups = useSelector(state => state.groupReducer.groups) || null    

    async function handleAccept() {
        if(notification.debateNotification && user)
            dispatch(NotificationActions.acceptDebateRequest({
                idGroup: groups[selectedGroup].idGroup,
                idNotification: notification.idNotification,
                idUser: user.idUser
            }))
        else
            await api.put(`/notification/accept/group/${notification.idNotification}`)        
    }
    return (
        <Container>
            <SectionLabels>
                <Label>De: {notification.fromUserNotification.nameUser}</Label>
                <Label>Título: {notification.debateNotification ? notification.debateNotification.titleDebate : notification.groupNotification.nameGroup}</Label>
            </SectionLabels>


            <div style={{width: '33%'}}>
                {
                    notification.statusNotification == NotificationStatus.WAITING ? (
                        <SelectControl
                            setUpdateIndex={setSelectedGroup}
                            data={groups?.map(group => group.nameGroup)}
                            labelText='Representando'
                        />
                    ) : (
                        <div />
                    )
                }
                
            </div>
            <SectionButtons>
                {
                    notification.statusNotification == NotificationStatus.WAITING ? <div>
                        <Button onClick={handleAccept}>Aceitar</Button>
                        <Button onClick={handleAccept}>Recusar</Button>
                    </div> : <div>
                        <h2>Aceito</h2>
                    </div>
                }
            </SectionButtons>
        </Container>
    )
}



export {DebateNotification}