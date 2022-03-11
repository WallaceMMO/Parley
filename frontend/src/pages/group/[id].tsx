import {NextPage, GetStaticProps, GetStaticPaths} from 'next'
import styled from 'styled-components';
import BodyGroup from '../../components/templates/BodyGroup';
import Header from '../../components/templates/Header';

import {useDispatch} from 'react-redux'
import * as GroupActions from '../../store/ducks/group/actions'
import { useEffect } from 'react';

export const getStaticProps: GetStaticProps = (context) => {
    const id = context.params?.id as string    
    
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

const GroupPage: NextPage<Props> = ({id}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GroupActions.loadOneRequest(id))
    }, []) 
    
    return(
        <Container>
            <Header />
            <BodyGroup />
        </Container>
    )
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default GroupPage