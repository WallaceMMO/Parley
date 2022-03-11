import styled from 'styled-components';

export const Container = styled.div`
    width: 761px;
    height: 645px;

    background-color: ${({theme}) => theme.white};    
    
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 40px;    
    border: 1px solid black;
    padding: 15px;
`;


export const Title = styled.h1`

`