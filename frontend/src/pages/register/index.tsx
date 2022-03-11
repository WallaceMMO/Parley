import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputControl from '../../components/molecules/InputControl'

import {    
    Container,
    MainWrapper,            
    Button
} from './styles'

import * as UserActions from '../../store/ducks/user/actions'

const Register = () => {       
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()       

    function handleRegister() {            
        dispatch(UserActions.registerRequest({
            emailUser: email,
            passwordUser: password,
            nameUser: name
        }))        
    }

    return (
        <Container>
            <MainWrapper>
            <InputControl 
                labelText="Name"
                updateState={setName}
                valueState={name}
            />

            <InputControl 
                labelText="Email"
                updateState={setEmail}
                valueState={email}
            />

            <InputControl 
                labelText="Password"
                updateState={setPassword}
                valueState={password}
            />

            <InputControl 
                labelText="Confirm Password"
                updateState={setConfirmPassword}
                valueState={confirmPassword}
            />

                <Button
                    onClick={handleRegister}
                >Create your Parley account</Button>
            </MainWrapper>
        </Container>
    )     
  
}

export default Register
