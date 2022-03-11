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
    const [topic, setTopic] = useState('Salário mínimo')
    const [rounds, setRounds] = useState<number>(3)
    const [time, setTime] = useState('25')
    const [argument, setArgument] = useState('dsdnsiijds')
    
    const [selectedGroup, setSelectedGroup] = useState(0)
    const [selectedUsers, setSelectedUsers] = useState(0)

    const dispatch = useDispatch()    

    const user = useSelector((state) => state.userReducer.user)
    const groups = useSelector((state) => state.groupReducer.groups) || null

    const [users, setUsers] = useState<User[] | null>(null)        

    useEffect(() => {
        if(user) {
            (async function() {
                const response = await api.get('/user/read')
                    
                setUsers(response.data.users.filter((u: User) => u.idUser != user.idUser))
              })()  

              dispatch(GroupActions.FindByUserRequest(user.idUser))
        }
    }, [user])
    

    function handleCreateDebate() {
        if(!users) return
                        
        dispatch(DebateActions.createRequest({
            titleDebate: topic,
            firstArgument: argument,
            time,
            rounds,            
            side,
            conDebate: {
                userSideDebate: side == 0 ? users[selectedUsers].idUser : user.idUser,
                groupSideDebate: side == 0 ? 0 : groups[selectedGroup].idGroup
            },
            proDebate: {
                userSideDebate: side == 1 ? users[selectedUsers].idUser : user.idUser,
                groupSideDebate: side == 1 ? 0 : groups[selectedGroup].idGroup
            }
        }))
        
    }

    return (
        <Container>
            <Title>Start a new debate</Title>
            <Subtitle>Want to debate an issue? Complete this form and we'll notify you when your opponent accepts your challenge.</Subtitle>

            <SelectControl
                setUpdateIndex={setSelectedUsers}
                data={users?.map(user => user.nameUser)}
                labelText='Opponent'
            />

            <SelectControl
                setUpdateIndex={setSelectedGroup}
                data={groups?.map(group => group.nameGroup)}
                labelText='Representando'
            />

            <InputControl>
                <Label>Topic</Label>
                <InputText 
                    onChange={(e) => setTopic(e.target.value)}
                    value={topic}
                />
            </InputControl>

            <SelectControl 
                labelText='Rounds'
                setUpdateIndex={setRounds}
                data={['3', '4', '5']}
            />            

            <SelectControl 
                labelText='Side'
                setUpdateIndex={setSide}
                data={['Pro/For', 'Con/Against']}
            />          

            <InputControl>
                <Label>Time to argue</Label>
                <InputText 
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                />
            </InputControl>

            <InputControl>
                <Label>Argument</Label>
                <InputTextArea 
                    onChange={(e) => setArgument(e.target.value)}
                    value={argument}
                />
            </InputControl>

            <Button
                onClick={handleCreateDebate}
                content='Start debate'
            />
        </Container>
    )
}

export default SectionCreateDebate