import styled from 'styled-components';

export const Container = styled.div`
    padding: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TableMembers = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 5px;
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

export const TitleGroup = styled.h3`
    margin-top: 2rem;
`