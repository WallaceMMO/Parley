import Head from 'next/head'

import Image from 'next/head'
import Router from 'next/router'

import React from 'react'

import {ChannelType} from '../../organisms/ChannelList'

import {ChannelItem} from './styles'

type Props = {
    channel: ChannelType
    onClick(id: number): void
}

class Channel extends React.Component<Props> {
    click = () => {
        this.props.onClick(this.props.channel.id)
    }
    
    render(): React.ReactNode {
        return (
            <ChannelItem onClick={this.click}>
                <div>{this.props.channel.name}</div>

                <span>{this.props.channel.participants}</span>
            </ChannelItem>
        )
    }
}

export default Channel