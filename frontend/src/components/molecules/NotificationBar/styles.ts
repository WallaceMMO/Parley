import styled from 'styled-components';

import {IoIosArrowForward} from 'react-icons/io'


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 750px;
`;

export const SectionBar = styled.div`
  width: 698px;
  height: 30px;

  border: 1px solid black;
`;

export const IconArrow = styled(IoIosArrowForward)`
    width: 40px;
    height: 40px;

    cursor: pointer;
`

export const ContentNotification = styled.p`
    font-size: 25px;

    -webkit-touch-callout: none;  /* iPhone OS, Safari */
    -webkit-user-select: none;    /* Chrome, Safari 3 */
    -khtml-user-select: none;     /* Safari 2 */
    -moz-user-select: none;       /* Firefox */
    -ms-user-select: none;        /* IE10+ */
    user-select: none; 
`
