import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputControl from '../../components/molecules/InputControl'

import {    
    ButtonContainer,
    Container,
    ErrorMessage,
    ForgotPassword,
    IconsContainer,
    InputContainer,
    RedirectOther,
    MainContainer,
    MessageBox,
    WelcomeText
} from './styles'

import * as UserActions from '../../store/ducks/user/actions'

import Input from "../../components/atoms/InputForm";
import Button from "../../components/atoms/ButtonForm";
import Router from "next/router";

const Register = () => {       
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()       

    const error = useSelector(state => state.userReducer.error)

    function handleRegister() {   
        if(confirmPassword != password) {
            return dispatch((UserActions.loginFailure("passwords don't match")))
        }
        dispatch(UserActions.registerRequest({
            emailUser: email,
            passwordUser: password,
            nameUser: name
        }))        
    }

    return (
        <Container>
            <MainContainer>
                <WelcomeText>Criar Conta</WelcomeText>
            <InputContainer>
                <Input 
                    type="text" 
                    placeholder="Nome" 
                    value={name}
                    onChange={(e) => {
                        dispatch((UserActions.loginFailure(null)))
                        setName(e.target.value)
                    }}
                />
                <Input 
                    type="text" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => {
                        dispatch((UserActions.loginFailure(null)))
                        setEmail(e.target.value)
                    }}
                />

                <Input 
                    type="password" 
                    placeholder="Senha" 
                    value={password}
                    onChange={(e) => {
                        dispatch((UserActions.loginFailure(null)))
                        setPassword(e.target.value)
                    }}
                />

                <Input 
                    type="password" 
                    placeholder="Confirma a senha" 
                    value={password}
                    onChange={(e) => {
                        dispatch((UserActions.loginFailure(null)))
                        setConfirmPassword(e.target.value)
                    }}
                />

            </InputContainer>
            <MessageBox>
                {
                    <ErrorMessage>{error}</ErrorMessage>                 
                }
            </MessageBox>

            <ButtonContainer>
                <Button 
                    content="Criar conta do Parley" 
                    onClick={handleRegister}
                />
            </ButtonContainer>
            
            {/* <ForgotPassword>Esqueceu a senha ?</ForgotPassword>             */}
            <RedirectOther onClick={() => Router.push('/login')}>Tem uma conta? Acesse</RedirectOther>

            
        </MainContainer>
      </Container>
    )     
  
}

export default Register
