import React from 'react'
import {HiLockOpen} from 'react-icons/hi'
import {BsFillEyeFill, BsCalendarWeekFill} from 'react-icons/bs'
import Router from 'next/router'

import {distanceBetweenDates} from '../../../helpers/ManipulationDates'

import {
    Container,    
    Title,
    BodyChat,
    SectionHeader,
    SectionFooter,
    LabelViews,
    ArgumentsText,
    Footer,
    LabelPeriod,
    LabelUpdate,
    LabelVS
} from './styles'

import { NextPage } from 'next'

import {Debate} from '../../../store/ducks/debate/types'
import IconPreview from '../../molecules/IconPreview'

interface Props {
    debate: Debate
}

const PreviewDebate: NextPage<Props> = ({debate}) => {        
    function handleForward() {
        Router.push(`/debate/${debate.idDebate}`)
    }
    return (
        <Container onClick={handleForward}>
            <SectionHeader>
                <IconPreview user={debate.sidesDebate[0].userSideDebate} left={true}/>
                <LabelVS>VS</LabelVS>
                <IconPreview user={debate.sidesDebate[1] ? debate.sidesDebate[1].userSideDebate : null} left={false}/>
            </SectionHeader>

            <Title>{debate.titleDebate}</Title>

            <BodyChat>
                <ArgumentsText>
                    {debate.messagesDebate[0].textMessage}
                </ArgumentsText>
            </BodyChat>

            <Footer>
                <SectionFooter>
                    <HiLockOpen size={25}/>
                    <LabelPeriod>{debate.statusDebate}</LabelPeriod>
                </SectionFooter>
                <SectionFooter>
                    <BsFillEyeFill size={25}/>
                    <LabelViews>{debate.quantityViews} visualizações</LabelViews>
                </SectionFooter>
                <SectionFooter>
                    <BsCalendarWeekFill size={25} />
                    <LabelUpdate>Atualizado há {distanceBetweenDates(new Date(), debate.updated_at)}</LabelUpdate>
                </SectionFooter>
            </Footer>
        </Container>
    )
    
}

export default PreviewDebate