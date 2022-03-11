
import {useSelector} from 'react-redux'

import ProfileDebate from '../../molecules/ProfileDebate'

import {distanceBetweenDates} from '../../../helpers/ManipulationDates'

import  {
    Container,
    Header,
    SectionCenter,
    Vslabel,
    Title,
    BodyDescription,
    InfoDebate,
    LabelInfo,
    StatusLabel
} from './styles'
import { useEffect, useState } from 'react'

const HeaderDebate = () => {
    const [waitingFor, setWaitingFor] = useState('')
    const debate = useSelector(state => state.debateReducer.debateSelected) ?? null                   

    useEffect(() => {
        if(debate) {
            if(debate.messagesDebate.length / 2 == debate.roundsDebate)
                setWaitingFor('Debate encerrado')
            else if(!debate.sidesDebate[1])
                setWaitingFor('Esperando algum convite ser aceito')
            else
                setWaitingFor('Esperando por ' + 
                    (debate.messagesDebate[debate.messagesDebate.length - 1].sideDebateMessage.userSideDebate.idUser != debate.sidesDebate[0].userSideDebate.idUser 
                    ? debate.sidesDebate[0].userSideDebate.nameUser 
                    : debate.sidesDebate[1].userSideDebate.nameUser)
                )
        }
    }, [debate])

    return (
        <Container>
            {
                debate &&
                <>
                <Header>
                    <ProfileDebate sideDebate={debate.sidesDebate[0]} left={true}/>

                    <SectionCenter>
                        <Vslabel>VS</Vslabel>
                        <Title>{debate.titleDebate}</Title>
                    </SectionCenter>

                    <ProfileDebate sideDebate={debate.sidesDebate[1]} left={false}/>
                </Header>

                <BodyDescription>
                    <InfoDebate>
                        <LabelInfo>Início: {debate.created_at.toLocaleDateString()}</LabelInfo>
                        <LabelInfo>Atualizado: {distanceBetweenDates(new Date(), debate.updated_at)}</LabelInfo>                        
                    </InfoDebate>

                    <SectionCenter>
                        <StatusLabel>{waitingFor}</StatusLabel>
                    </SectionCenter>
                    <InfoDebate>
                        <LabelInfo>{debate.quantityViews} Visualizações</LabelInfo>
                        <LabelInfo>Status: {debate.statusDebate}</LabelInfo>
                        <LabelInfo>3 Comentários</LabelInfo>
                    </InfoDebate>
                </BodyDescription>
                </>
            }

        </Container>
    )
}

export default HeaderDebate