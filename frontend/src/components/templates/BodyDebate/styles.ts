import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
        
    width: 808px;
    
    margin-top: 3%;
    padding: 10px;    
`;

export const ContainerItem = styled.div`
    margin-top: 9px;
    width: 100%;
    display: flex;
    padding: 8px;

    background-color: ${({theme}) => theme.white};
    justify-content: space-between;
    
`

export const SectionProfile = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    float: left;
`

export const LabelName = styled.div`

`

export const LabelSide = styled.div`

`

export const PhotoProfile = styled.div`
    background: yellow;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    margin-bottom: 8px;
`

export const SectionText = styled.p`
    width: 100%;
`