
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ItemTab from '../../templates/BodyGroup/components/ItemTab'
import {
    Container
} from './styles'

interface Props {
    selectedIndex: string        
    setSelectedIndex: Dispatch<SetStateAction<string>>
    names: string[]
}

const TabNavigation = ({selectedIndex, setSelectedIndex, names}: Props) => {        
    return (
        <Container>
        {
            names.map((name, index) => {
                
                return (
                    <div 
                        onClick={() => setSelectedIndex(name)}
                        style={{cursor: 'pointer'}}>
                        <ItemTab 
                            name={name} 
                            isActive={selectedIndex == name}                    
                        />
                    </div>
                )
            })            
        }
        </Container>
    )
}

export default TabNavigation