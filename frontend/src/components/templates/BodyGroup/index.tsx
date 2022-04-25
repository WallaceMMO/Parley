import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TabNavigation from '../../organisms/TabNavigation'
import ChatGroup from '../../organisms/ItemsBodyGroup/ChatGroup'
import Members from '../../organisms/ItemsBodyGroup/Members'
import Overview from '../../organisms/ItemsBodyGroup/Overview'
import Recruit from '../../organisms/Recruit'
import DebatesMade from '../../organisms/ItemsBodyGroup/DebatesMade'

import * as DebatesActions from '../../../store/ducks/debate/actions'

import {
    Container,
    BodyItems
} from './styles'
import SideBarOptions from '../../organisms/SideBarOptions'
import NotificationsGroup from '../../organisms/ItemsBodyGroup/NotificationsGroup'


const BodyGroup = () => {   
    const dispatch = useDispatch() 
    const [selectedTab, setSelectedTab] = useState('')
    const [tabs, setTabs] = useState<string[]>([])

    const user = useSelector(state => state.userReducer.user) || null
    const group = useSelector(state => state.groupReducer.groupSelected)            
    const debates = useSelector(state => state.debateReducer.debates) || null    

    useEffect(() => {
        if(group)
            dispatch(DebatesActions.FindByGroupRequest(group.idGroup))
    }, [group])

    useEffect(() => {
        if(user && group) {
            if(user?.patentMembersUser.find(patent => patent.groupPatentMember?.idGroup == group?.idGroup)) {
                setTabs(['Chat', 'Debates do grupo','Integrantes', 'Visão Geral', 'Administração', 'Notificações' ])
            } else {
                setTabs(['Debates do grupo','Integrantes', 'Visão Geral'])
            }
        }
    }, [user, group])   

    return (
        <Container>
            <SideBarOptions 
                selectedIndex={selectedTab}
                setSelectedIndex={setSelectedTab}
                names={tabs}
            />            

            <BodyItems>
                { 
                    selectedTab == 'Chat' && user?.patentMembersUser.find(patent => patent.groupPatentMember?.idGroup == group?.idGroup) && <ChatGroup />
                }

                { 
                    selectedTab == 'Debates do grupo' && <DebatesMade debates={debates}/>
                }

                { 
                    selectedTab == 'Integrantes' && <Members />
                }

                { 
                    selectedTab == "Visão Geral" && <Overview />
                }

                { 
                    selectedTab == 'Administração' && user?.patentMembersUser.find(patent => patent.groupPatentMember?.idGroup == group?.idGroup) && <Recruit />
                }

                { 
                    selectedTab == 'Notificações' && user?.patentMembersUser.find(patent => patent.groupPatentMember?.idGroup == group?.idGroup) && <NotificationsGroup />
                }
            </BodyItems>
        </Container>
    )
}

export default BodyGroup