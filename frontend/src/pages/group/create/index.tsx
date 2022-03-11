import {NextPage} from 'next'
import styled from 'styled-components';
import CreateGroup from '../../../components/templates/CreateGroup';
import Header from '../../../components/templates/Header';

import {useDispatch} from 'react-redux'


const GroupPage: NextPage = () => {    
    return(
        <Container>
            <Header />
            <CreateGroup />
        </Container>
    )
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default GroupPage