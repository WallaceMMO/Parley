import {NextPage} from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import ListGroups from '../../components/organisms/ListGroups'
import TableListGroups from '../../components/organisms/TableListGroups'
import TableListUsers from '../../components/organisms/TableListUsers'
import Header from '../../components/templates/Header'
import api from '../../services/api'

import { User } from '../../store/ducks/user/types'

const List: NextPage = () => {   
    const dispatch = useDispatch()
    const [users, setUsers] = useState<User[]>([])

    
    useEffect(() => {
        (async function() {
            const response = await api.get("user/read")

            setUsers(response.data.users)
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
                <TableListUsers users={users}/>
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