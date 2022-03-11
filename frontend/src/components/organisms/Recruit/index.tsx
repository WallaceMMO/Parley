import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { InputText } from "../SectionCreateDebate/styles"

import { User } from "../../../store/ducks/user/types"

import * as NotificationGroupActions from '../../../store/ducks/notificationGroup/actions'
import * as NotificationActions from '../../../store/ducks/notification/actions'
import * as GroupActions from '../../../store/ducks/group/actions'
import * as UserActions from '../../../store/ducks/user/actions'

import {NotificationType} from '../../../store/ducks/notification/types'

import  {
    Container,

    ContainerItem,
    ButtonInvite,
    ButtonSolicit,
    CellTable,
    HeaderTable,
    RowTable,
    TableMembers
} from './styles'

import api from '../../../services/api'
import NotificationsRecruit from '../../molecules/NotificationsRecruit'
import Button from '../../atoms/Button'
import TabNavigation from '../TabNavigation'
import TableListGroups from '../TableListGroups'

interface PropsItemUser {
    user: User
    handleSendNotification: (userId: number) => void
}

const ItemUser = ({user, handleSendNotification}: PropsItemUser) => {
    return (
        <ContainerItem>
            <h4>{user.nameUser}</h4>

            <ButtonInvite onClick={() => handleSendNotification(user.idUser)}>Convidar</ButtonInvite>
        </ContainerItem>
    )
}

const Recruit = () => {
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = useState('Usuários')

    const group = useSelector(state => state.groupReducer.group)
    const user = useSelector(state => state.userReducer.user)

    const groups = useSelector(state => state.groupReducer.groups)

    const userList = useSelector(state => state.userReducer.userList)
        .filter(user => {
            const patentMemberUser = user.patentMembersUser.find(patentMember => patentMember.groupPatentMember?.idGroup == group?.idGroup ?? 0)
            return user.patentMembersUser.length && patentMemberUser ? patentMemberUser.groupPatentMember?.idGroup != group?.idGroup ?? 0 : true
        }) || null        

    useEffect(() => {
        dispatch(UserActions.readListRequest())        
    }, [group])
        
    useEffect(() => {
        if(selectedTab == 'Grupos')
            dispatch(GroupActions.loadRequest())
        else if(selectedTab == 'Usuários')
            dispatch(UserActions.readListRequest())
    }, [selectedTab])

    function handleSendNotification(userId: number) {
        if(group)
            dispatch(NotificationActions.createNotificationRequest({
                idGroup: group.idGroup,
                idUser: userId,
                typeNotification: NotificationType.USERSOLICITATION
            }))
    }

     function handleSendNotificationGroup(forGroupId: number) {
        if(group && user)
            dispatch(NotificationGroupActions.createNotificationRequest({
                idUser: user.idUser,
                idForGroup: forGroupId,
                typeNotificationGroup: NotificationType.GROUPSOLICITATION,
                idFromGroup: group.idGroup
            }))
    }

    return (
        <Container>
            <InputText />

            <TabNavigation 
                names={['Usuários', 'Grupos']}
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
                            userList.map(user => {
                                
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
                                                content='Convidar'
                                                onClick={() => handleSendNotification(user.idUser)}
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
                                            content='Convidar'
                                            onClick={() => handleSendNotificationGroup(group.idGroup)}
                                        />
                                    </CellTable>
                                </RowTable>
                            )
                        })
                    }     
                    </tbody>
            </TableMembers>

            }
                                
            <NotificationsRecruit />
        </Container>
    )
}

export default Recruit