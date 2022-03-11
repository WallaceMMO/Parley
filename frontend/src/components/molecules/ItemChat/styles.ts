import styled from 'styled-components';

export const Container = styled.div`
    width: 763px;
    display: flex;
    flex-direction: column;

    background-color: ${({theme}) => theme.alabaster};
    padding: 9px 23px;
    margin-top: 11px;
`;

export const SectionDescription = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 12px;

    justify-content: space-between;
`

export const LabelName = styled.span`
    font-size: 13px;
`

export const LabelNameGroup = styled.span`
    font-size: 12px;
`

export const SectionTop = styled.div`
    display: flex;
`

export const MessageText = styled.p`
    margin-top: 16px;

    font-size: 14px;
`