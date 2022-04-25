import styled from 'styled-components';
import { NotificationStatus } from '../../../store/ducks/notification/types';

interface ContainerProps {
    backColor: string
}
export const Container = styled.div<ContainerProps>`
    display: flex;
    align-center: center;    

    width: 100%;
    background-color: ${props => {
        switch(props.backColor) {
            case NotificationStatus.ACCPEPTED:                
                return '#55bb55'
            case NotificationStatus.REJECTED:
                return '#bb5555'
            default:
                return '#555555'
        }

    }};
    border-radius: 15px;
    border: 1px solid white;    
    padding: 15px;
    margin-top: 15px;
`;

export const Title = styled.h3`
    color: #fff;
`

export const Label = styled.span`
    color: #fff;
`

export const SectionLabels = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const SectionButtons = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

interface Props {
    backColor: string
  }
export const Button = styled.button<Props>`
    width: 67px;
    height: 20px;

    background-color: ${props => props.backColor};
    color: white;

    cursor: pointer;
    border-radius: 12px;
`

export const SectionActions = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const IconView = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 10px;
`