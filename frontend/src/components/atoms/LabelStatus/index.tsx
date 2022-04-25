import { NotificationStatus } from '../../../store/ducks/notification/types'
import {
    Label
} from './styles'

interface Props {
    status: NotificationStatus
}
const LabelStatus = ({status}: Props) => {

    let text = ''

    switch(status) {
        case NotificationStatus.WAITING: 
        text = "Esperando"
        break;
        case NotificationStatus.ACCPEPTED: 
        text = "Aceito"
        break;
        case NotificationStatus.REJECTED: 
        text = "Rejeitado"
        break;
    }
    return (
        <Label
            status={status}
        >{text}</Label>        
    )
}

export default LabelStatus