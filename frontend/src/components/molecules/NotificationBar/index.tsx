import { NextPage } from 'next'
import React from 'react'

import {
    Container,
    SectionBar,
    ContentNotification,
    IconArrow
} from './styles'

type Props = {
    
}

const NotificationBar: NextPage<Props> = () => {
    
    return(
        <Container>
            <IconArrow />
            <SectionBar>
                <ContentNotification unselectable='on'>ifsdusoafiusdf</ContentNotification>
            </SectionBar>
        </Container>
    )
    
}

export default NotificationBar