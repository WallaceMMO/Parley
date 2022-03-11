import {NextPage} from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import ListGroups from '../../../components/organisms/ListGroups'
import TableListGroups from '../../../components/organisms/TableListGroups'
import Header from '../../../components/templates/Header'

import * as ActionsGroup from '../../../store/ducks/group/actions'

const List: NextPage = () => {   
    const dispatch = useDispatch()

    const groups = useSelector(state => state.groupReducer.groups) || null

    useEffect(() => {
        dispatch(ActionsGroup.loadRequest())
    }, [])
    
    return (
        <Container>
            <Header />
            <div style={{
                width: '80%',
                alignItems: 'center',
                marginTop: 25
            }}>
                <TableListGroups groups={groups}/>
            </div>
        </Container>
    )
}

export const Container = styled.div`
    align-items: center;
    display: flex;
    width: 100%;
    flex-direction: column;
`

export default List