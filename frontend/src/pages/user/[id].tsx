import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage } from 'next'

import * as UserActions from '../../store/ducks/user/actions'
import * as DebateActions from '../../store/ducks/debate/actions'
import * as GroupActions from '../../store/ducks/group/actions'

import Header from "../../components/templates/Header";

import OverviewUser from "../../components/organisms/ItemsBodyGroup/OverviewUser";

import TabNavigation from "../../components/organisms/TabNavigation";
import DebatesMade from "../../components/organisms/ItemsBodyGroup/DebatesMade";
import ListGroups from "../../components/organisms/ListGroups";
import TableListGroups from "../../components/organisms/TableListGroups";

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id

    return {
        props: {id}
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
       paths: [{
           params: {
               id: '1'
           }
       }]        ,
       fallback: 'blocking'
    }
}

interface Props {
    id: string
}

const UserDetail: NextPage<Props> = ({id}) => {
    const dispatch = useDispatch()   
    const [selectedIndex, setSelectedIndex] = useState('')

    const debates = useSelector(state => state.debateReducer.debates)

    const groups = useSelector(state => state.groupReducer.groups)

    const tabs = ['Visão Geral', 'Debates', 'Grupos']

    useEffect(() => {
        dispatch(UserActions.readOneRequest(parseInt(id)))
    }, [])

    useEffect(() => {
        if(selectedIndex == 'Debates')
            dispatch(DebateActions.FindByUserRequest(parseInt(id)))
        else if(selectedIndex == 'Grupos')
            dispatch(GroupActions.FindByUserRequest(parseInt(id)))
    }, [selectedIndex])    

    console.log(groups)
    return (
        <Container>            
            <Header />
            
            <ContainerItem>
                <TabNavigation 
                    selectedIndex={selectedIndex}
                    names={tabs}
                    setSelectedIndex={setSelectedIndex}
                />
                
                {
                    selectedIndex == 'Visão Geral' && <OverviewUser />
                }

                {
                    selectedIndex == 'Debates' && <DebatesMade debates={debates}/>
                }

                {
                    selectedIndex == 'Grupos' && <TableListGroups groups={groups}/>
                }
            </ContainerItem>
        </Container>
    )
    
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerItem = styled.div`
  width: 78%;
  height: 645px;

  background-color: ${({theme}) => theme.white};
  margin-top: 26px;
  display: flex;
  flex-direction: column;
`

export default UserDetail