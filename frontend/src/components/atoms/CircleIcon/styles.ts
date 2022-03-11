import styled from 'styled-components';

interface IProps {
    color?: string;
}

export const SectionIcon = styled.div<IProps>`
    display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50px;  
  border: 4px solid ${props => props.color ?? '#333'};
  align-items: center;
  justify-content: center;
`;
