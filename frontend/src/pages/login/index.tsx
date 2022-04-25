import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {    
    Container,
    MainContainer,
    WelcomeText,
    InputContainer,
    ButtonContainer,    
    MessageBox,
    RedirectOther,
    ErrorMessage
} from './styles'

import Button from "../../components/atoms/ButtonForm";
import Input from "../../components/atoms/InputForm";

import * as UserActions from '../../store/ducks/user/actions'
import Router from "next/router";

const Login = () => {       

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()   
    
    const error = useSelector(state => state.userReducer.error)
    
    function handleLogin() {            
        dispatch(UserActions.loginRequest({
            emailUser: email,
            passwordUser: password
        }))        

    }

    return (
        <Container>
            <MainContainer>
                <WelcomeText>Acessar Conta</WelcomeText>
            <InputContainer>
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
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => {
                        dispatch((UserActions.loginFailure(null)))
                        setPassword(e.target.value)
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
                    content="Acessar" 
                    onClick={handleLogin}
                />
            </ButtonContainer>
            
            {/* <ForgotPassword>Esqueceu a senha ?</ForgotPassword>             */}
            <RedirectOther onClick={() => Router.push('/register')}>Não tem conta? Registre-se</RedirectOther>
            
        </MainContainer>
      </Container>
    )     
  
}

export default Login
