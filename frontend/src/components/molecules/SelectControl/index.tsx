
import { Dispatch, SetStateAction } from 'react'

import  {
    InputControl,
    Label
} from './styles'

interface Props {
    labelText: string
    setUpdateIndex: Dispatch<SetStateAction<number>>
    data?: string[]
}

const SelectControl = ({data, labelText, setUpdateIndex}: Props) => {
    return (
        <InputControl>
            <Label>{labelText}</Label>
            <select onChange={(e) => setUpdateIndex(e.target.selectedIndex)}>
                {
                    data?.map(item => {
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