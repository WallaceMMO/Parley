import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
        
    background-color: ${({theme}) => theme.white};
    width: 808px;
    height: 251px;
    margin-top: 3%;
    padding: 10px;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const SectionCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Vslabel = styled.h1`
    color: #FF0000;

`

export const Title = styled.h1`

`

export const BodyDescription = styled.div`
    width: 100%;
    margin-top: 15px;
    display: flex;    
    justify-content: space-between;
`

export const InfoDebate = styled.div`
    display: flex;
    flex-direction: column;
`

export const LabelInfo = styled.span`

`

export const StatusLabel = styled.h4`
   
`
