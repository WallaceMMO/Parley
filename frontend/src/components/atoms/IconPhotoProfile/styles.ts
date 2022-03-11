import styled from 'styled-components'

export const Container = styled.div`
    
`

interface PropsImage {
    size: number    
}

export const IconPhoto = styled.img<PropsImage>`  
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    border-radius: 50px;

    cursor: ${(props) => props.onClick ? "pointer" : "auto" };
`
