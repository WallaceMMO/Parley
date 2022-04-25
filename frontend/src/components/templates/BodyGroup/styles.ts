import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 26px;
  display: flex;
`;

export const SectionChat = styled.div`
    max-height: 380px;
    overflow: auto;
`

export const BodyItems = styled.div`
  width: 761px;
  height: 645px;

  background-color: ${({theme}) => theme.white};  
  display: flex;
  flex-direction: column;
`
