import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 37px 14px 0 42px;

  justify-content: space-between;
  border: 0.5px solid ${({theme}) => theme.silver};
  margin-bottom: 23px;
`;
