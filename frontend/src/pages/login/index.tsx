import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import {    
    Container,
    MainContainer,
    WelcomeText,
    InputContainer,
    ButtonContainer,    
    LoginWith,
    HorizontalRule,
    IconsContainer,
    ForgotPassword
} from './styles'

import Button from "../../components/atoms/ButtonForm";
import Icon from "../../components/atoms/IconSocial";
import Input from "../../components/atoms/InputForm";

import * as UserActions from '../../store/ducks/user/actions'

const Login = () => {   
    const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()   
    const user = useSelector(state => state.userReducer.user)        

    function handleLogin() {   
         
        dispatch(UserActions.loginRequest({
            emailUser: email,
            passwordUser: password
        }))        

    }

    return (
        <Container>
            <MainContainer>
                <WelcomeText>Welcome</WelcomeText>
            <InputContainer>
                <Input 
                    type="text" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            </InputContainer>
            <ButtonContainer>
                <Button 
                    content="Sign Up" 
                    onClick={handleLogin}
                />
            </ButtonContainer>
            <LoginWith>OR LOGIN WITH</LoginWith>
            <HorizontalRule />
            <IconsContainer>
                <Icon color={FacebookBackground}>
                    <FaFacebookF />
                </Icon>
                <Icon color={InstagramBackground}>
                    <FaInstagram />
                </Icon>
                <Icon color={TwitterBackground}>
                    <FaTwitter />
                </Icon>
            </IconsContainer>
            <ForgotPassword>Forgot Password ?</ForgotPassword>

            
        </MainContainer>
      </Container>
    )     
  
}

export default Login
