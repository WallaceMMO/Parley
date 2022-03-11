
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../atoms/Button'

import * as NotificationGroupActions from '../../../../store/ducks/notificationGroup/actions'

import {
    Container,
    TableMembers,
    CellTable,
    HeaderTable,
    RowTable
} from './styles'
import CheckBox from '../../../atoms/CheckBox'

const Members = () => {
    const dispatch = useDispatch()
    
    const group = useSelector(state => state.groupReducer.group) || null
    const user = useSelector(state => state.userReducer.user) || null
        
    function handleSendSolicitation() {
        dispatch(NotificationGroupActions.createNotificationRequest({
            idGroup: group?.idGroup ?? 0,
            idUser: user.idUser
        }))
    }

    return (
        <Container>
            {
                !user?.patentMembersUser.find(patent => patent.groupPatentMember?.idGroup == group?.idGroup) && <Button 
                    content='Solicitar' 
                    onClick={handleSendSolicitation} 
                />  
            }            
            <hr />
            <TableMembers>
                <thead>
                <RowTable>
                    <HeaderTable>Nome</HeaderTable>
                    <HeaderTable>Cargo</HeaderTable>
                    <HeaderTable>Debates Feitos</HeaderTable>
                    <HeaderTable>Atividade</HeaderTable>
                </RowTable>     
                </thead>
                <tbody>
                    {
                        group?.patentMembersGroup.map(patentMember => {
                            return (
                                <RowTable>
                                    <CellTable>
                                        {patentMember.userPatentMember.nameUser}
                                    </CellTable>
                                    <CellTable>
                                        {patentMember.namePatentMember}
                                    </CellTable>
                                    <CellTable>
                                        {patentMember.honorPatentMember}
                                    </CellTable>
                                    <CellTable>
                                        Ativo
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
 
export default Members