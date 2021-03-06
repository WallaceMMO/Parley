
import { Dispatch, SetStateAction } from 'react'

import  {
    InputControl,
    Label
} from './styles'

interface Props {
    labelText: string
    setUpdateIndex: Dispatch<SetStateAction<number>>
    data?: any
}

const SelectControl = ({data, labelText, setUpdateIndex}: Props) => {    
    return (
        <InputControl>
            <Label>{labelText}</Label>
            <select onChange={(e) => setUpdateIndex(e.target.selectedIndex)}>
                {
                    data?.map((item: string) => {
                        return (
                            <option>{item}</option>
                        )
                    })
                }
            </select>
        </InputControl>
    )
}

export default SelectControl