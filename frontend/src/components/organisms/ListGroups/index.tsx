import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'

import { Group } from '../../../store/ducks/group/types'


import {
    Container,
    ContainerItem,
    ButtonRequest
} from './styles'

interface PropsItemGroup {
    group: Group
}

const ItemGroup = ({group}: PropsItemGroup) => {
    function handleConsult() {
        Router.push(`/group/${group.idGroup}`)
    }

    return (
        <ContainerItem>
            <h2>{group.nameGroup}</h2>  

            <ButtonRequest onClick={handleConsult}>          
                Consultar
            </ButtonRequest>
        </ContainerItem>
    )
}

interface PropsListGroups {
    groups: Group[]
}
const ListGroups = ({groups}: PropsListGroups) => {    
    
    return (
        <Container>            
            {
                groups?.map(group => <ItemGroup key={group.idGroup} group={group}/>)
            }
        </Container>
    )
}

export default ListGroups