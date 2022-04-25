import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import * as DebateActions from '../store/ducks/debate/actions'

import Header from '../components/templates/Header'
import PreviewDebate from '../components/organisms/PreviewDebate'

import React, { useEffect, useRef, useState } from "react";


import { Debate } from '../store/ducks/debate/types'

import SectionCreateDebate from '../components/organisms/SectionCreateDebate'

const Index = () => {    
    const dispatch = useDispatch()
    const debates: Debate[] = useSelector((state) => state.debateReducer.debates)
    const loading = useSelector((state) => state.debateReducer.loading)
    
    const [skip, setSkip] = useState(1)

    const containerRef = useRef<HTMLDivElement>(null)    

    useEffect(() => {      
      dispatch(DebateActions.readRequest(1))      
    }, [dispatch])                  

    function handleVerify() {
      if(containerRef?.current && containerRef.current.scrollTop + containerRef.current.clientHeight == containerRef.current.scrollHeight && !loading) {        
        
        dispatch(DebateActions.readRequest(skip + 1))

        setSkip(skip + 1)
      }
    }

    return (
      
      <Container 
        height={700}
        ref={containerRef}
        onScroll={handleVerify}               
      >        
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

      {
        loading && <h2>Carregando</h2>
      }
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
