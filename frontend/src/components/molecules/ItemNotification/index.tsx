import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Notification, NotificationStatus } from '../../../store/ducks/notification/types'

import {BsCheckLg} from 'react-icons/bs'
import {VscBellDot} from 'react-icons/vsc'
import {TiCancel} from 'react-icons/ti'

import * as NotificationActions from '../../../store/ducks/notification/actions'

import SelectControl from '../SelectControl'

import {
    Container,
    Label,
    Title,
    SectionLabels,
    SectionButtons,
    Button,
    SectionActions,
    IconView
} from './styles'

interface PropsDebateNotification {
    notification: Notification
}

const DebateNotification = ({notification}: PropsDebateNotification) => {
    const dispatch = useDispatch()

    const [selectedGroup, setSelectedGroup] = useState(0)

    
    const user = useSelector(state => state.userReducer.user)

    const groups = user?.patentMembersUser.map(patent => patent.groupPatentMember?.nameGroup)

    function handleAccept() {
        if(notification.debateNotification && user)
            dispatch(NotificationActions.acceptDebateRequest({
                idGroup: selectedGroup != 0 ? user.patentMembersUser[selectedGroup-1].groupPatentMember?.idGroup ?? 0 : 0,
                idNotification: notification.idNotification,
                idUser: user.idUser
            }))        
    }

    function GenerateButtons() {
        switch(notification.statusNotification) {
            case NotificationStatus.WAITING:
                return (
                    <div>
                        <Button 
                            onClick={() => handleAccept()}
                            backColor={'#1BCC18'}
                        >Aceitar</Button>

                        <Button 
                            onClick={() => {}}
                            backColor={'#e60505'}
                        >Recusar</Button>
                    </div>
                )
            case NotificationStatus.ACCPEPTED:
                const groupUser = notification.debateNotification.sidesDebate[0].userSideDebate.idUser == user?.idUser ?
                notification.debateNotification.sidesDebate[0].groupSideDebate : notification.debateNotification.sidesDebate[1].groupSideDebate

                return (
                    <div>
                        <Label>Representando o grupo: {groupUser.nameGroup}</Label>
                    </div>
                )
            case NotificationStatus.REJECTED:
                return (
                    <div>
                        
                    </div>
                )
            default:
                <div />
        }            
    }


    function generateIcons() {
        switch(notification.statusNotification) {
            case NotificationStatus.WAITING:
                return <VscBellDot size={20} color='#fff'/>
            case NotificationStatus.ACCPEPTED:
                return <BsCheckLg size={20} color={'#fff'}/>
            default:
                return <TiCancel size={20} color='#fff'/>
        }
    }
    return (
        <Container backColor={notification.statusNotification}>
            <IconView>
            {
                generateIcons()
            }
            </IconView>
            <SectionLabels>
                <Title>Debate {notification.debateNotification.titleDebate}</Title>
                <Label>Por: {notification.fromUserNotification.nameUser}</Label>
            </SectionLabels>


            <SectionActions >
                {
                    notification.statusNotification == NotificationStatus.WAITING ? (
                        <SelectControl
                            setUpdateIndex={setSelectedGroup}
                            data={typeof groups?.at(0) == 'string' ? ['Sem grupo', ...groups] : ['Sem grupo']}
                            labelText='Representando'
                        />
                    ) : (
                        <div />
                    )
                }
                
            
                <SectionButtons>
                    {
                        GenerateButtons()
                    }
                </SectionButtons>   
            </SectionActions>
        </Container>
    )
}

export {DebateNotification}