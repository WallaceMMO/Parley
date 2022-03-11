import React from 'react'

import {
    Container,
    LabelTab
} from './styles'

interface Props {
    name: string;
    isActive: boolean
}

const ItemTab = ({name, isActive}: Props) => {
    return (        
        <Container isActive={isActive} lengthBorder={name.length}>
            <LabelTab>{name}</LabelTab>
        </Container>
    )
}

export default ItemTab