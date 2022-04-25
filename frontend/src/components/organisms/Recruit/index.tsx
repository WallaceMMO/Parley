import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { InputText } from "../SectionCreateDebate/styles"


import * as NotificationGroupActions from '../../../store/ducks/notificationGroup/actions'
import * as GroupsActions from '../../../store/ducks/group/actions'

import {NotificationStatus} from '../../../store/ducks/notification/types'
import {NotificationGroupType} from '../../../store/ducks/notificationGroup/types'

import  {
    Container,

    CellTable,
    HeaderTable,
    RowTable,
    TableMembers
} from './styles'

import Button from '../../atoms/Button'
import TabNavigation from '../TabNavigation'

const Recruit = () => {
    const dispatch = useDispatch()    

    const [selectedTab, setSelectedTab] = useState('Usuários')

    const group = useSelector(state => state.groupReducer.groupSelected)

    const user = useSelector(state => state.userReducer.user)    
    const usersRecruit = useSelector(state => state.groupReducer.usersRecruit)
    const usersSolicitation = useSelector(state => state.groupReducer.usersSolicitation)
    const groupsInvites = useSelector(state => state.groupReducer.groupsInvites)
    const groupsRecruit = useSelector(state => state.groupReducer.groupsRecruit)
    
    useEffect(() => {
        if(selectedTab == 'Grupos' && group)
            dispatch(GroupsActions.loadGroupsRecruitRequest(group.idGroup))
        else if(selectedTab == 'Usuários' && group)
            dispatch(GroupsActions.loadUsersRecruitRequest({
                idGroup: group.idGroup,
                typeNotificationGroup: NotificationGroupType.INVITEFORUSER,
                statusNotificationGroup: NotificationStatus.WAITING
            }))
        else if(selectedTab == 'Solicitações' && group) {            
            dispatch(GroupsActions.loadUsersSolicitationRequest({
                idGroup: group.idGroup,
                statusNotificationGroup: NotificationStatus.WAITING
            }))
        } else if(selectedTab == 'Convites' && group) {
            dispatch(GroupsActions.loadGroupsInviteRequest({
                idGroup: group.idGroup,
                statusNotificationGroup: NotificationStatus.WAITING
            }))
        }

    }, [selectedTab, group])

    async function handleSendNotification(userId: number) {
        if(group && user) {          
            dispatch(NotificationGroupActions.createNotificationRequest({
                idFromUser: user.idUser,
                typeNotificationGroup: NotificationGroupType.INVITEFORUSER,
                idForUser: userId,
                idFromGroup: group.idGroup
            }))                  
        }
    }

    async function handleSendNotificationGroup(forGroupId: number) {
        if(group && user) {
            dispatch(NotificationGroupActions.createNotificationRequest({
                idForGroup: forGroupId,
                idFromUser: user.idUser,
                typeNotificationGroup: NotificationGroupType.INVITEFORGROUP,
                idFromGroup: group.idGroup                
            }))                                    
        }                  
    }    

    async function handleAcceptNotificationGroup(idNotificationGroup: number, typeNotificationGroup: NotificationGroupType) {
        if(group) {
            dispatch(NotificationGroupActions.AcceptNotificationGroupRequest({
                idNotificationGroup,
                typeNotificationGroup,
                idGroup: group.idGroup
            }))
        }
    }  

    return (
        <Container>
            <InputText />

            <TabNavigation 
                names={['Usuários', 'Grupos', 'Solicitações', 'Convites']}
                selectedIndex={selectedTab}
                setSelectedIndex={setSelectedTab}
            />

            {
                selectedTab == 'Usuários' && <TableMembers>
                    <thead>
                    <RowTable>
                        <HeaderTable>Nome</HeaderTable>
                        <HeaderTable>Honra</HeaderTable>
                        <HeaderTable>Debates Feitos</HeaderTable>
                        <HeaderTable>Convidar</HeaderTable>
                    </RowTable>     
                    </thead>
                    <tbody>
                        {
                            usersRecruit?.map(user => {
                                
                                return (
                                    <RowTable key={user.idUser}>
                                        <CellTable>
                                            <h4>{user.nameUser}</h4>
                                        </CellTable>
                                        <CellTable>
                                            {0}
                                        </CellTable>
                                        <CellTable>
                                            {0}
                                        </CellTable>
                                        <CellTable>                                            
                                            {
                                                !user.forNotificationsGroupUser?.length ? (
                                                    <Button 
                                                        content='Convidar'
                                                        onClick={() => handleSendNotification(user.idUser)}
                                                    />
                                                ) : (
                                                    <Button 
                                                        content='Esperando'
                                                        onClick={() => {}}
                                                    />
                                                )
                                            }
                                            
                                        </CellTable>
                                    </RowTable>
                                )
                            })
                        }     
                    </tbody>
                </TableMembers>            
            }

            {
                selectedTab == 'Grupos' &&  <TableMembers>
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
                        groupsRecruit?.map(group => {
                            
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
                                        {
                                            !group.forGlobalNotificationsGroup?.length ? (
                                                <Button 
                                                    content='Convidar'
                                                    onClick={() => handleSendNotificationGroup(group.idGroup)}
                                                />
                                            ) : (
                                                <Button 
                                                    content='Esperando'
                                                    onClick={() => {}}
                                                />
                                            )
                                        }
                                       
                                    </CellTable>
                                </RowTable>
                            )
                        })
                    }     
                    </tbody>
            </TableMembers>

            }            

            {
                selectedTab == 'Solicitações' && <TableMembers>
                    <thead>
                    <RowTable>
                        <HeaderTable>Nome</HeaderTable>
                        <HeaderTable>Honra</HeaderTable>
                        <HeaderTable>Debates Feitos</HeaderTable>
                        <HeaderTable>Situação</HeaderTable>
                    </RowTable>     
                    </thead>
                    <tbody>
                        {
                            usersSolicitation?.map(user => {
                                
                                return (
                                    <RowTable key={user.idUser}>
                                        <CellTable>
                                            <h4>{user.nameUser}</h4>
                                        </CellTable>
                                        <CellTable>
                                            {0}
                                        </CellTable>
                                        <CellTable>
                                            {0}
                                        </CellTable>
                                        <CellTable>
                                            <Button 
                                                content='Aceitar'
                                                onClick={() => handleAcceptNotificationGroup(user.fromNotificationsGroupUser[0].idNotificationGroup, NotificationGroupType.SOLICITATIONFORGROUP)}
                                            />
                                        </CellTable>
                                    </RowTable>
                                )
                            })
                        }     
                    </tbody>
                </TableMembers>            
            }

            {
                selectedTab == 'Convites' && <TableMembers>
                    <thead>
                    <RowTable>
                        <HeaderTable>Nome</HeaderTable>
                        <HeaderTable>Honra</HeaderTable>
                        <HeaderTable>Debates Feitos</HeaderTable>
                        <HeaderTable>Situação</HeaderTable>
                    </RowTable>     
                    </thead>
                    <tbody>
                        {
                            groupsInvites?.map(group => {
                                
                                return (
                                    <RowTable key={group.idGroup}>
                                        <CellTable>
                                            <h4>{group.nameGroup}</h4>
                                        </CellTable>
                                        <CellTable>
                                            {0}
                                        </CellTable>
                                        <CellTable>
                                            {0}
                                        </CellTable>
                                        <CellTable>
                                            <Button 
                                                content='Aceitar'
                                                onClick={() => handleAcceptNotificationGroup(group.fromGlobalNotificationsGroup[0].idNotificationGroup, NotificationGroupType.INVITEFORGROUP)}
                                            />
                                        </CellTable>
                                    </RowTable>
                                )
                            })
                        }     
                    </tbody>
                </TableMembers>            
            }
                                
        </Container>
    )
}

export default Recruit