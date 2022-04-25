import styled from 'styled-components';
import { NotificationStatus } from '../../../store/ducks/notification/types';

interface Props {
    status: NotificationStatus
}
export const Label = styled.h4<Props>`
  color: ${(props) => 
    props.status == NotificationStatus.WAITING ?
    'gray' : 
    props.status == NotificationStatus.ACCPEPTED ?
    'green' : 'red'
  };
`;
