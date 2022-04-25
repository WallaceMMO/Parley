import styled from 'styled-components';
import themes from '../../../themes'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
    
  background-color: #fff;  
  height: 251px;
  margin-top: 3%;
  padding: 10px;
  border-radius: 15px;

  cursor: pointer;
`

export const Title = styled.span`
  font-size: 30px;
  font-weight: 550;
  display: -webkit-box;
  -webkit-line-clamp: 1; /** número de linhas que você quer exibir */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const BodyChat = styled.div`
  width: 100%;
  height: 100px;  

  display: -webkit-box;
  -webkit-line-clamp: 6; /** número de linhas que você quer exibir */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

`


export const Row = styled.div`
    display: flex;
    flex-direction: row;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`

export const SectionHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: row;
  align-items: center;
  justify-content: space-between;
`

export const LabelName = styled.h2`

`

export const LabelTags = styled.h3`

`

export const SectionDescription = styled.div`
  flex-direction: column;
  margin-left: 8px;
`

export const ArgumentsText = styled.p`
  width: 100%;
`

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const LabelPeriod = styled.span`
  margin-left: 15px;
`
export const LabelUpdate = styled.span`
  margin-left: 15px;
`

export const LabelVS = styled.h2`
  font-size: 35px;
  color: ${({theme}) => theme.maroon};
  
`

export const SectionFooter = styled.div`
  display: flex;
  align-items: center;
`

export const LabelViews = styled.span`
  margin-left: 15px;
`