
import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

import {useDispatch, useSelector} from 'react-redux'
import * as GroupActions from '../../../../store/ducks/group/actions'
import * as AuthActions from '../../../../store/ducks/user/actions'

import ItemChat from '../../../molecules/ItemChat'
import InputChat from '../../../molecules/InputChat'

import {
    Container,
    SectionChat
} from './styles'


const BodyGroup = () => {
    const [socket, setSocket] = useState<Socket>()

    const refSectionChat = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()          

    const user = useSelector(state => state.userReducer.user)
    
    const group = useSelector(state => state.groupReducer.group)            
    
    useEffect(() => {        
        const socketIo = io('localhost:3333')

        socketIo.emit('new user', user.idUser)                

        socketIo.on('fetch messages', (idGroup: number) => {            
            dispatch(GroupActions.refreshMessagesRequest({idGroup}))}
            )
        
        setSocket(socketIo)        

        function cleanup() {
            socketIo.disconnect()
        }        

        return cleanup
    
    }, [user])

    useEffect(() => {
        if(!socket) return

        socket.emit('join group', user.idUser, group?.idGroup)
    }, [group])   

    const handleSendMessage = (message: string) => {
        if(socket && group)        
            dispatch(GroupActions.outputMessageRequest({
                idGroup: group.idGroup,
                idUser: user.idUser,
                message,
                socket
            }))            

        if(refSectionChat.current)
            refSectionChat.current.scrollTop = refSectionChat.current?.scrollHeight
    }
    
    return (
        <Container>            

            <SectionChat
                ref={refSectionChat}
            >                
                {
                    group?.itemChatsGroup.map(item => {
                        return <ItemChat key={item.idGroup} messageText={item.messageItemChat} name={item.userItemChat.nameUser} nameGroup='Desenvolvimentistas'/>                        
                    })
                }
            </SectionChat>

            <InputChat handleSendMessage={handleSendMessage}/>
        </Container>
    )
}

export default BodyGroup