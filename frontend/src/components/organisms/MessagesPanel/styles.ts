import styled from 'styled-components'
import themes from '../../../themes'

export const NoContentMessage = styled.div`
    color: ${({theme}) => theme.silver};
    font-style: italic;
    font-size: 20px;
    text-align: center;
    margin: 20px;
`
export const MessagesPanel = styled.div`
    width: calc(80% - 12px);
    border: 1px solid rgb(224, 224, 224);
    margin: 10px;
    margin-left: 0;
    height: calc(100% - 22px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const MessagesList = styled.div`
    align-self: stretch;
    height: 100%;
`

export const TextInput = styled.input`
    margin: auto;
    height: 20px;
    width: 100%;
    margin-left: 15px;
    border: 1px solid rgb(224, 224, 224);

    &:focus {
        border-radius: 15px;
        border: 2px solid ${({theme}) => theme.malibu};
        outline: none;
    }
`

export const Button = styled.button`
    width: 60px;
    margin: auto 10px;
    background-color: ${({theme}) => theme.denim};
    color: ${({theme}) => theme.white};
    border: 1px solid;
    border-radius: 10px;
    padding: 5px 13px;

    &:hover {
        cursor: pointer;
        background-color: ${({theme}) => theme.malibu};
    }
`
export const MessagesInput = styled.div`
    width: 100%;
    height: 40px;
    border-top: 1px solid rgb(224, 224, 224);
    background-color: ${({theme}) => theme.gallery};
    display: flex;
`