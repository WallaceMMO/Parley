
import { Dispatch, SetStateAction } from 'react'
import {
    InputControl,
    Label,
    TextInput
} from './styles'

interface Props {
    labelText: string
    updateState: Dispatch<SetStateAction<string>>
    valueState: string
}

const InputControlComponent = ({labelText, valueState, updateState}: Props) => {
    return (
        <InputControl>
            <Label>{labelText}:</Label>
            <TextInput 
                onChange={(e) => updateState(e.target.value)}
                value={valueState}
            />
        </InputControl>
    )
}

export default InputControlComponent