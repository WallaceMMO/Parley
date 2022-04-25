import { Dispatch, SetStateAction } from 'react'
import  {
    Container,
    ContainerItem,
    Label
} from './styles'

interface PropsItem {
    name: string
    selected: boolean
    setSelectedIndex: Dispatch<SetStateAction<string>>
}
const ItemSideBar = ({name, selected, setSelectedIndex}: PropsItem) => {
    return (
        <ContainerItem onClick={() => setSelectedIndex(name)}>
            <Label>{name}</Label>
        </ContainerItem>
    )
}

interface PropsSideBarOptions {
    names: string[]
    selectedIndex: string
    setSelectedIndex: Dispatch<SetStateAction<string>>
}
const SideBarOptions = ({names, selectedIndex, setSelectedIndex}: PropsSideBarOptions) => {
    return (
        <Container>
            {
                names.map(name => 
                    <ItemSideBar 
                        name={name} 
                        selected={name == selectedIndex} 
                        setSelectedIndex={setSelectedIndex}
                    />
                )
            }
        </Container>
    )
}

export default SideBarOptions