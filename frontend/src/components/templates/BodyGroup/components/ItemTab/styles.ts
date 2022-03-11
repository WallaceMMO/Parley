import styled from 'styled-components';

interface PropsContainer {
    isActive: boolean;
    lengthBorder: number
}

export const Container = styled.div<PropsContainer>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: ${({isActive}) => isActive ? '2px' : 0 } solid ${({theme}) => theme.darkBlue};
    width: ${({lengthBorder}) => 21*(lengthBorder/2)}px;
    padding-bottom: 9px;
        
`;

export const LabelTab = styled.span`
    font-size: 20px;
    font-weight: 500;
    
`;
