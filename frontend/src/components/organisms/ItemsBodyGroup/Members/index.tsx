import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../atoms/Button'

import * as NotificationGroupActions from '../../../../store/ducks/notificationGroup/actions'

import {
    Container,
    TableMembers,
    CellTable,
    HeaderTable,
    RowTable,
    TitleGroup
} from './styles'

import { NotificationGroupType } from '../../../../store/ducks/notificationGroup/types'

import api from '../../../../services/api'
import { Group } from '../../../../store/ducks/group/types'

const Members = () => {
    const [belongGroup , setBelongGroup] = useState(true)
    
    const [groupsPatent, setGroupsPatent] = useState<Group[]>([])

    const dispatch = useDispatch()
    
    const group = useSelector(state => state.groupReducer.groupSelected) || null
    const user = useSelector(state => state.userReducer.user) || null
    const notificationsGroup = useSelector(state => state.notificationGroupReducer.notificationsInGroup) || null               
    
    async function getgroups() {
        const response = await api.get(`/group/getgroupspatent/${group?.idGroup}`)

        console.log(response.data.groups)
        setGroupsPatent(response.data.groups)
    }
    useEffect(() => {
        if(user && group) {            
            if(user?.patentMembersUser.find(patent => patent.groupPatentMember?.idGroup == group?.idGroup)) {
                setBelongGroup(true)                          
            }
            else {                
                dispatch(NotificationGroupActions.LoadNotificationsGroupByGroupRequest({
                    groupId: group.idGroup,
                    userId: user.idUser
                }))

                setBelongGroup(false)
            }
        }

        getgroups()   
    }, [user, group])

    function handleSendSolicitation() {
        if(group && user)
            dispatch(NotificationGroupActions.createNotificationRequest({
                idForGroup: group.idGroup,
                idFromUser: user.idUser,
                typeNotificationGroup: NotificationGroupType.SOLICITATIONFORGROUP
            }))
    }

    function haveSolicitation() {
        if(notificationsGroup.find(notgro => notgro.forGroupNotificationGroup?.idGroup == group?.idGroup &&
                                   notgro.typeNotificationGroup == NotificationGroupType.SOLICITATIONFORGROUP))
            return true

        return false
    }

    return (
        <Container>            
            {
                !belongGroup && (!haveSolicitation() ? <Button 
                    content='Solicitar' 
                    onClick={handleSendSolicitation} /> : 
                    <Button 
                        content='Solicitado' 
                        onClick={() => {}} 
                    />) 
            }            
            <hr />
            {
                groupsPatent.map((groupPatent, index) => (
                    <>
                        {index != 0 && <TitleGroup>{groupPatent.nameGroup}</TitleGroup>}
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
                                    groupPatent?.patentMembersGroup.map(patentMember => {
                                        return (
                                            <RowTable>
                                                <CellTable>
                                                    {patentMember.userPatentMember ? patentMember.userPatentMember.nameUser : patentMember.memberGroupPatentMember.nameGroup}
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
                    </>
                    )
                )
            }
        </Container>
    )
}
 
export default Members