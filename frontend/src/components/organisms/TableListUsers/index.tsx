
import Router from 'next/router'
import Button from '../../atoms/Button'

import { User } from '../../../store/ducks/user/types'

import {
    Container,
    CellTable,
    HeaderTable,
    RowTable,
    TableMembers
} from './styles'

interface PropsTableList {
    users: User[]
}
const TableListUsers = ({users}: PropsTableList) => {
    
    return (
        <Container>
            <TableMembers>
                <thead >
                <RowTable>
                    <HeaderTable>Nome</HeaderTable>
                    <HeaderTable>Debates Feitos</HeaderTable>
                    <HeaderTable>Consultar</HeaderTable>
                </RowTable>     
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            
                            return (
                                <RowTable>
                                    <CellTable>
                                        <h4>{user.nameUser}</h4>
                                    </CellTable>                                    
                                    <CellTable>
                                        {user.madeDebates}
                                    </CellTable>
                                    <CellTable>
                                        <Button 
                                            content='Consultar'
                                            onClick={() => Router.push(`/user/${user.idUser}`)}
                                        />
                                    </CellTable>
                                </RowTable>
                            )
                        })
                    }     
                    </tbody>
            </TableMembers>
        </Container>
    )
}

export default TableListUsers