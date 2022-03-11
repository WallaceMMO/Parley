import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {
    Container,
    Label
} from './styles'

const Overview = () => {    
    const group = useSelector(state => state.groupReducer.group)    

    return (
        <Container>
            <Label>Nome: {group?.nameGroup}</Label>
            <Label>Descrição: {group?.descriptionGroup}</Label>
        </Container>
    )
}

export default Overview