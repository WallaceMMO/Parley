import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const ContainerItem = styled.div`
    display: flex;
    justify-content: space-between;

    margin-top: 8px;
`

export const ButtonInvite = styled.button`
    background-color: ${({theme}) => theme.malibu};
    width: 80px;

    border-radius: 10px;

    cursor: pointer;
`

export const ButtonSolicit = styled.button`
  border-radius: 10px;

  cursor: pointer;
`

export const TableMembers = styled.table`
    border-collapse: collapse;
    width: 100%;
`

export const RowTable = styled.tr`
    width: auto;
    display: flex;
    justify-content: center;

    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`

export const HeaderTable = styled.th`
    width: 25%;
    font-size: 18px;
    text-align: left;
    padding: 8px;
    background-color: #5656ff;
    color: white;
`

export const CellTable = styled.td`
    text-align: left;
    width: 25%;
    font-size: 15px;
    display: flex;
    
    border-bottom: 1px solid gray;
    padding: 8px;
`
