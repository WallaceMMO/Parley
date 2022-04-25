import {NextPage} from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import ListGroups from '../../../components/organisms/ListGroups'
import TableListGroups from '../../../components/organisms/TableListGroups'
import Header from '../../../components/templates/Header'
import api from '../../../services/api'

import * as ActionsGroup from '../../../store/ducks/group/actions'
import { Group } from '../../../store/ducks/group/types'

const List: NextPage = () => {   
    const dispatch = useDispatch()
    const [groups, setGroups] = useState<Group[]>([])

    
    useEffect(() => {
        (async function() {
            const response = await api.get("group/read")

            setGroups(response.data.groups)
        })()
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