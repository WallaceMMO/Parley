import React, {useState} from 'react'
import Message from '../../molecules/Message'
import {ChannelType} from '../ChannelList'

import { NextPage } from 'next'

import {
    NoContentMessage,
    MessagesPanel,
    MessagesList,
    TextInput,
    Button,
    MessagesInput
} from './styles'

type Props = {
    channel: ChannelType
    onSendMessage(channel_id: number, text: string): void
}


const MessagesPanelComponent: NextPage<Props> = ({onSendMessage, channel}) => {
    const [input_value, setInput_value] = useState('')    

    const send = () => {
        if(input_value != '') {
            onSendMessage(channel.id, input_value)
            setInput_value('')
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput_value(e.target.value)
    }

    let list: any = <NoContentMessage>There is no messages to show</NoContentMessage>

    if(channel?.messages) {
        list = channel.messages.map(message => <Message key={message.id} senderName={message.senderName} text={message.text}/>)
    }
    
    return (
        <MessagesPanel>
            <MessagesList>{list}</MessagesList>

            <MessagesInput></MessagesInput>

            <TextInput type={"text"} onChange={handleInput} value={input_value}/>
            <Button onClick={send}>Send</Button>
        </MessagesPanel>
    )
}

export default MessagesPanelComponent