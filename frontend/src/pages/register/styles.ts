import styled from 'styled-components'

export const Container = styled.div`
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;

    h2, h5, h4 {
      color: black
    }
`

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;  
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  letter-spacing: 0.2rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 3rem 0;
  
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  width: 100%;
`;

export const ButtonContainer = styled.div`  
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RedirectOther = styled.h5`
  cursor: pointer;
  color: black;
  
`;

export const IconsContainer = styled.div`

  display: flex;
  justify-content: space-evenly;
  margin: 1rem 0 3rem 0;
  width: 80%;
`;

export const ForgotPassword = styled.h4`
  cursor: pointer;
`;

export const ErrorMessage = styled.span`
  color: #ee2332;
  font-size: 15px;
`

export const MessageBox = styled.div`
    margin-top: 55px;
    margin-left: 5px;
    height: 5%;
    width: 80%;
    align-items: left;
`