
import { useEffect, useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import * as GroupActions from '../../../store/ducks/group/actions'
import * as UserActions from '../../../store/ducks/user/actions'

import Button from '../../atoms/Button'

import InputControl from '../../molecules/InputControl'

import {    
    Container,
    Title
} from './styles'

const CreateGroup = () => {
    const [nameGroup, setNameGroup] = useState('')
    const [descriptionGroup, setDescriptionGroup] = useState('')

    const dispatch = useDispatch()

    const user = useSelector(state => state.userReducer.user)    

    function handleCreateGroup() {
        if(user)
            dispatch(GroupActions.createRequest({
                descriptionGroup,
                nameGroup,
                idUser: user.idUser
            }))
    }
    
    return (
        <Container>
            <Title>Create your group</Title>

            <InputControl 
                labelText="Group's name"
                updateState={setNameGroup}
                valueState={nameGroup}
            />

            <InputControl 
                labelText="Group's description"
                updateState={setDescriptionGroup}
                valueState={descriptionGroup}
            />

            <Button 
                onClick={handleCreateGroup}
                content='Create Group'
            />
        </Container>
    )
}

export default CreateGroup