import styled from 'styled-components';

import {IoMdSend} from 'react-icons/io'

export const Container = styled.div`
  bottom: 20px;

  align-self: center;
  align-items: center;
`;

export const Input = styled.input`
    width: 736px;
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