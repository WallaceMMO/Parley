import Head from 'next/head'

import Image from 'next/head'
import Router from 'next/router'

import {AiOutlineSearch} from 'react-icons/ai'
import {Container, SearchBar, ButtonIconSearch} from './styles'

export default function SearchBarHeader() {
    return (
        <Container>
            <SearchBar />
            <ButtonIconSearch size={30}/>
        </Container>
    )
}