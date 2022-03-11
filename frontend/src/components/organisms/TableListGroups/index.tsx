
import Router from 'next/router'
import Button from '../../../components/atoms/Button'

import { Group } from '../../../store/ducks/group/types'
import {
    Container,
    CellTable,
    HeaderTable,
    RowTable,
    TableMembers
} from './styles'

interface PropsTableList {
    groups: Group[]
}
const TableListGroups = ({groups}: PropsTableList) => {

    
    return (
        <Container>
            <TableMembers>
                <thead>
                <RowTable>
                    <HeaderTable>Nome</HeaderTable>
                    <HeaderTable>Participantes</HeaderTable>
                    <HeaderTable>Debates Feitos</HeaderTable>
                    <HeaderTable>Consultar</HeaderTable>
                </RowTable>     
                </thead>
                <tbody>
                    {
                        groups.map(group => {
                            
                            return (
                                <RowTable>
                                    <CellTable>
                                        <h4>{group.nameGroup}</h4>
                                    </CellTable>
                                    <CellTable>
                                        {group.participantsGroup}
                                    </CellTable>
                                    <CellTable>
                                        {group.debatesMade}
                                    </CellTable>
                                    <CellTable>
                                        <Button 
                                            content='Consultar'
                                            onClick={() => Router.push(`/group/${group.idGroup}`)}
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

export default TableListGroups