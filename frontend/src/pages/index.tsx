import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import * as DebateActions from '../store/ducks/debate/actions'

import Header from '../components/templates/Header'
import PreviewDebate from '../components/organisms/PreviewDebate'

import React, { useEffect } from "react";


import { Debate } from '../store/ducks/debate/types'

import SectionCreateDebate from '../components/organisms/SectionCreateDebate'

const Index = () => {    
    const dispatch = useDispatch()
    const debates: Debate[] = useSelector((state) => state.debateReducer.debates)
    

    useEffect(() => {      
      dispatch(DebateActions.readRequest())      
    }, [dispatch])
    
    
    return (
      
      <Container height={700}>        
        <Header />      
        {/* <Sidebar /> */}
        <SectionCreateDebate /> 
        <ContainerDebates>
        {
          debates?.map((debate) => {
            return (
              <PreviewDebate key={debate.idDebate} debate={debate}/>
            )
          })
        }      
        </ContainerDebates>               

      </Container>
    )      
}


interface PropsContainer {
    height: number
}

export const Container = styled.div<PropsContainer>`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: ${({height}) => height}px;
    overflow-y: auto;
`

export const ContainerDebates = styled.div`
  width: 78%;
`


export default Index
