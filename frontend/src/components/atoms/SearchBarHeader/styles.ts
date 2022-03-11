import styled from 'styled-components'
import {AiOutlineSearch} from 'react-icons/ai'

export const Container = styled.div`
    border: 1px solid #DDD;  
    height: 40px    
`

export const SearchBar = styled.input`  
    border: none;
    width: 500px;
    height: 50px;
    font-size: 22px;
    
`

export const ButtonIconSearch = styled(AiOutlineSearch)`
    &:hover{
        cursor: pointer;
    }
`
