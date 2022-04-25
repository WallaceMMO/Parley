import styled from 'styled-components';
import {IoMdNotifications} from 'react-icons/io'

export const Header = styled.div`
    height: 80px;
    width: 100%;
    background-color: gray;
    
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    align-items: center;    

    background-color: ${({theme}) => theme.white};

`;

export const IconNotification = styled(IoMdNotifications)`
    width: 40px;
    height: 40px;
`

export const SectionIconNotification = styled.div`
   cursor: pointer;   
`

export const LabelUnread = styled.span`
   font-size: 15px;
   color: white;
`

export const Circle = styled.div`
    position: relative;
    margin-top: -25px;
    margin-left: 5px;
    background-color: red;
    border-radius: 50px;
    width: 18px;
    height: 18px;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ContentHeader = styled.div`
    width: 78%;    

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const SectionProfile = styled.div`
    display: flex;
    flex-direction: row;    
`

