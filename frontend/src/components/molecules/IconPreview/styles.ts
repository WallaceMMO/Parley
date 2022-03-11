import styled from 'styled-components';
import themes from '../../../themes'

export const Container = styled.div`
  display: flex;
  
  flex-direction: row;
    
  background-color: ${themes.light.white};  
  padding: 10px;
`

export const LabelName = styled.h2`
    font-size: 25px;
`

interface isLeft{
    left: boolean
}

export const PhotoProfile = styled.img<isLeft>`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: ${({left}) => left ? '19px' : '0'};
    margin-left: ${({left}) => !left ? '19px' : '0'};
`
export const LabelGlory = styled.span<isLeft>`
    font-size: 12;
    font-weight: 400;
    margin-left: ${({left}) => left ? '11px' : '0'};
    margin-right: ${({left}) => !left ? '11px' : '0'};
`

export const SectionDescription = styled.div`
    display: flex;

    align-items: baseline;
`