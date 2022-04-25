
import { NotificationStatus } from '../../../store/ducks/notification/types'
import { NotificationGroup, NotificationGroupType } from '../../../store/ducks/notificationGroup/types'
import * as NotificationsGroupActions from '../../../store/ducks/notificationGroup/actions'

import {
    Container,
    Button,
    SectionButtons,
    Title,
    Label,
    SectionLabels
} from './styles'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
    notificationGroup: NotificationGroup
}
const ItemNotificationGroup = ({notificationGroup}: Props) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.userReducer.user)

    let text = ''
    let title = ''

    switch(notificationGroup.typeNotificationGroup) {
        case NotificationGroupType.INVITEFORUSER:
            title = "Convite para " + notificationGroup.fromGroupNotificationGroup.nameGroup
            text = "Enviado por " + notificationGroup.fromUserNotificationGroup.nameUser

            break;
        case NotificationGroupType.SOLICITATIONFORGROUP:
            title = "Solicitação para: " + notificationGroup.forGroupNotificationGroup.nameGroup;
            break;
    }

    async function handleAccept(idNotificationGroup: number) {        
        if(notificationGroup.fromGroupNotificationGroup)
            dispatch(NotificationsGroupActions.AcceptNotificationGroupRequest({
                idNotificationGroup,
                idGroup: notificationGroup.fromGroupNotificationGroup.idGroup,
                typeNotificationGroup: NotificationGroupType.INVITEFORGROUP
            }))        
    }

    async function handleReject(idNotificationGroup: number) {        
        if(notificationGroup.fromGroupNotificationGroup)
            dispatch(NotificationsGroupActions.RejectNotificationGroupRequest(idNotificationGroup))
    }

    function GenerateButtons() {
        switch(notificationGroup.statusNotificationGroup) {
            case NotificationStatus.WAITING:
                return (
                    <div>
                        <Button 
                            onClick={() => handleAccept(notificationGroup.idNotificationGroup)}
                            backColor={'#1BCC18'}
                        >Aceitar</Button>

                        <Button 
                            onClick={() => handleReject(notificationGroup.idNotificationGroup)}
                            backColor={'#e60505'}
                        >Recusar</Button>
                    </div>
                )
            case NotificationStatus.ACCPEPTED:
                return (
                    <div>
                        <span>Aceito</span>
                    </div>
                )
            case NotificationStatus.REJECTED:
                return (
                    <div>
                        <Label>Rejeitado</Label>
                    </div>
                )
            default:
                <div />
        }            
    }

    return (
        <Container backColor={notificationGroup.statusNotificationGroup}>
            <SectionLabels>
                <Title>{title}</Title>
                <Label>{text}</Label>   
            </SectionLabels>
            {/* <LabelStatus status={notificationGroup.statusNotificationGroup}/> */}

            <SectionButtons>
                {
                    GenerateButtons()
                }
            </SectionButtons>
            
        </Container>
    )
}

export default ItemNotificationGroup