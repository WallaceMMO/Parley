import styled from 'styled-components';

export const Container = styled.div`
  width: 761px;
  height: 645px;

  background-color: ${({theme}) => theme.white};
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  
`;

export const SectionChat = styled.div`
    max-height: 380px;
    overflow: auto;
`