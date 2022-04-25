import styled from 'styled-components';

import {IoMdSend} from 'react-icons/io'

export const Container = styled.div`
  margin-top: 20px;
  bottom: 0px;  
  width: 100%;
  align-self: center;
  align-items: center;
`;

export const Input = styled.input`
    width: 100%;
    border: 1px solid #000;
    height: 42px;
    font-size: 20px;
    border-radius: 12px;
`

export const ButtonSend = styled(IoMdSend)`
    position: relative;
    height: 25px;
    width: 25px;
    margin-left: -29px;

    cursor: pointer;
`