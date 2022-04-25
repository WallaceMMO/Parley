
import {useDispatch, useSelector} from 'react-redux'
import InputChat from '../../molecules/InputChat'

import { Message, SideDebate } from '../../../store/ducks/debate/types'

import * as DebateActions from '../../../store/ducks/debate/actions'

import {
    Container,
    ContainerItem,
    SectionProfile,
    LabelName,
    LabelSide,
    PhotoProfile,
    SectionText
} from './styles'
import { useEffect } from 'react'
import IconPhotoProfile from '../../atoms/IconPhotoProfile'

interface PropsItem {
    message: Message
}

const ItemDebate = ({message}: PropsItem) => {
    return (
        <ContainerItem>
            <SectionProfile>
                <IconPhotoProfile size={40} src={message.sideDebateMessage.userSideDebate.photoProfileUser} />
                <LabelName>{message.sideDebateMessage.userSideDebate.nameUser}</LabelName>
                <LabelSide>{message.sideDebateMessage.side == 'ProDebate' ? 'Pró' : 'Contra'}</LabelSide>
            </SectionProfile>

            <SectionText>
                {
                    message.textMessage
                }
            </SectionText>
        </ContainerItem>
    )
}

const BodyDebate = () => {
    const dispatch = useDispatch()

    const debate = useSelector(state => state.debateReducer.debateSelected) || null
    const user = useSelector(state => state.userReducer.user) || null

    const sideDebate = debate?.sidesDebate[0].userSideDebate.idUser == user?.idUser ? debate?.sidesDebate[0] : debate?.sidesDebate[1]
    const messages = debate?.messagesDebate    
    
    function addMessage(message: string) {
        dispatch(DebateActions.addMessageRequest({message, debateId: debate?.idDebate ?? 0, sideDebateId: sideDebate?.idSideDebate ?? 0}))
    }
   
    return (
        <Container >
            {
                messages?.map((message, index) => {
                    if (index % 2 == 0)
                        return <>
                            <h2>{Math.floor(index / 2) + 1}</h2>
                            <ItemDebate message={message}/>
                        </>

                    return <ItemDebate message={message}/>
                })                
            }          

            <InputChat handleSendMessage={addMessage}/>
        </Container>
    )
}

export default BodyDebate