import { NextPage } from 'next'
import Head from 'next/head'

import Image from 'next/head'
import Router from 'next/router'

import React from 'react'

import Channel from '../../molecules/Channel'

import {ChannelList} from './styles'

export interface MessageType {
    id: number
    senderName: string
    text: string
    channel_id: number
} 

export interface ChannelType {
    id: number,
    name: string,
    participants: number
    messages: MessageType[]
}

type Props = {
    channels: ChannelType[]
    onSelectChannel(id: number): void
}

const ChannelListComponent: NextPage<Props> = ({onSelectChannel, channels}) => {
    const handleClick = (id: number) => {
        onSelectChannel(id)
    }

    
    let list: string | JSX.Element[] = "There is no channels to show"


    if(channels) {
        list = channels.map(
            channel =>  <Channel key={channel.id} channel={channel} onClick={handleClick}/>
            
        )
    }

    return (
        <ChannelList>
            {list}
        </ChannelList>
    )
    
}

export default ChannelListComponent