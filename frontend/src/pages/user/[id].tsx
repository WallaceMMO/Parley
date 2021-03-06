import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage } from 'next'

import * as UserActions from '../../store/ducks/user/actions'
import * as DebateActions from '../../store/ducks/debate/actions'
import * as GroupActions from '../../store/ducks/group/actions'

import {Group} from '../../store/ducks/group/types'

import Header from "../../components/templates/Header";

import OverviewUser from "../../components/organisms/ItemsBodyGroup/OverviewUser";

import TabNavigation from "../../components/organisms/TabNavigation";
import DebatesMade from "../../components/organisms/ItemsBodyGroup/DebatesMade";
import ListGroups from "../../components/organisms/ListGroups";
import TableListGroups from "../../components/organisms/TableListGroups";
import MainProfile from "../../components/templates/MainProfile";

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

    const user = useSelector(state => state.userReducer.userSelected)

    const groups = user?.patentMembersUser?.map(patent => patent.groupPatentMember as Group) ?? []

    const tabs = ['Visão Geral', 'Debates', 'Grupos']

    useEffect(() => {
        dispatch(UserActions.readOneRequest(parseInt(id)))
    }, [])

    useEffect(() => {
        if(selectedIndex == 'Debates')
            dispatch(DebateActions.FindByUserRequest(parseInt(id)))    
    }, [selectedIndex])

    return (
        <Container>            
            <Header />
            
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '78%',
                marginTop: 26
            }}>
            <MainProfile />
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
            </div>
        </Container>
    )
    
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerItem = styled.div`
  width: 100%;
  height: 645px;

  background-color: ${({theme}) => theme.white};
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`

export default UserDetail