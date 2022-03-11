import React from 'react'
import {AiFillFunnelPlot} from 'react-icons/ai';

import {SectionIcon} from './styles'

class Message extends React.Component {
    render(): React.ReactNode {
        return(
            <SectionIcon>
                <AiFillFunnelPlot size={30}/>
            </SectionIcon>
        )  
    }
}

export default Message