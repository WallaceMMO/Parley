import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Container,
    Title,
    Subtitle,
    Label,
    InputControl,
    InputText,
    InputTextArea,    
} from './styles'

import SelectControl from '../../../components/molecules/SelectControl'
import Button from '../../../components/atoms/Button'

import * as DebateActions from '../../../store/ducks/debate/actions'
import * as GroupActions from '../../../store/ducks/group/actions'

import api from '../../../services/api'
import { User } from '../../../store/ducks/user/types'

const SectionCreateDebate = () => {    
    const [side, setSide] = useState(0)
    const [topic, setTopic] = useState('')
    const [rounds, setRounds] = useState<number>(3)
    const [argument, setArgument] = useState('')
    
    const [selectedGroup, setSelectedGroup] = useState(0)
    const [selectedUsers, setSelectedUsers] = useState(0)

    const dispatch = useDispatch()    

    const user = useSelector((state) => state.userReducer.user)    

    const [users, setUsers] = useState<User[] | null>(null)        

    const groups = user?.patentMembersUser.map(patent => patent.groupPatentMember?.nameGroup)

    useEffect(() => {
        if(user) {
            (async function() {
                const response = await api.get('/user/read')
                    
                setUsers(response.data.users.filter((u: User) => u.idUser != user.idUser))
              })()                
        }
    }, [user])
    

    function handleCreateDebate() {
        if(!users) return
                        
        if(user)
        dispatch(DebateActions.createRequest({
            titleDebate: topic,
            firstArgument: argument,            
            rounds,            
            side,
            conDebate: {
                userSideDebate: side == 0 ? users[selectedUsers].idUser : user.idUser,
                groupSideDebate: side == 0 ? 0 : (selectedGroup != 0 ? user.patentMembersUser[selectedGroup-1].groupPatentMember?.idGroup ?? 0 : 0)
            },
            proDebate: {
                userSideDebate: side == 1 ? users[selectedUsers].idUser : user.idUser,
                groupSideDebate: side == 1 ? 0 : (selectedGroup != 0 ? user.patentMembersUser[selectedGroup-1].groupPatentMember?.idGroup ?? 0 : 0)
            }
        }))
        
    }

    return (
        <Container>
            <Title>Começar um novo debate</Title>
            <Subtitle>Quer começar um novo debate? Complete o formulário abaixo.</Subtitle>

            <SelectControl
                setUpdateIndex={setSelectedUsers}
                data={users?.map(user => user.nameUser)}
                labelText='Oponente'
            />

            <SelectControl
                setUpdateIndex={setSelectedGroup}                
                data={typeof groups?.at(0) == 'string' ? ['Sem grupo', ...groups] : ['Sem grupo']}
                labelText='Representando'
            />

            <InputControl>
                <Label>Tópico</Label>
                <InputText 
                    onChange={(e) => setTopic(e.target.value)}
                    value={topic}
                    placeholder="Tópico o debate"
                />
            </InputControl>

            <SelectControl 
                labelText='Rounds'
                setUpdateIndex={setRounds}
                data={['3', '4', '5']}
            />            

            <SelectControl 
                labelText='Lado'
                setUpdateIndex={setSide}
                data={['Pró', 'Contra']}
            />                     

            <InputControl>
                <Label>Argumento Inicial:</Label>
                <InputTextArea 
                    onChange={(e) => setArgument(e.target.value)}
                    value={argument}
                    placeholder="Argumento Inicial"
                />
            </InputControl>

            <InputControl>
                <Button
                    onClick={handleCreateDebate}
                    content='Começar debate'
                />
            </InputControl>
        </Container>
    )
}

export default SectionCreateDebate