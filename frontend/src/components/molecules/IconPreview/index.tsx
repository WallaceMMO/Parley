import React from 'react'
import {AiOutlineEye} from 'react-icons/ai'

import {
    Container,        
    LabelName,
    PhotoProfile,
    LabelGlory,
    SectionDescription
    
} from './styles'

import { NextPage } from 'next'

import {User} from '../../../store/ducks/user/types'

interface Props {
    user: User | null
    left: boolean
}

const IconPreview: NextPage<Props> = ({user, left}) => {
    
    return (
        left ? (
            <Container>
                <PhotoProfile 
                src={new Buffer(user?.photoProfileUser ?? '').toString("ascii") == '' ? 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' : new Buffer(user?.photoProfileUser ?? '').toString("ascii")}
                left={true}/>
                <SectionDescription>
                    <LabelName>{user?.nameUser ?? 'Á espera'}</LabelName>                    
                </SectionDescription>
            </Container>
        ) : (
            <Container>
                <SectionDescription>                    
                    <LabelName>{user?.nameUser ?? 'Á espera'}</LabelName>
                </SectionDescription>
                <PhotoProfile 
                left={false} 
                src={new Buffer(user?.photoProfileUser ?? '').toString("ascii") == '' ? 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' : new Buffer(user?.photoProfileUser ?? '').toString("ascii")}/>
            </Container>
        )
    )
    
}

export default IconPreview