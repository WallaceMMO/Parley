
import { HTMLAttributes } from 'react'
import {
    StyledCheckBox
} from './styles'

interface CheckProps extends HTMLAttributes<HTMLInputElement>{
    content: string
    checked: boolean
}

export default function CheckBox ({content, checked, ...rest}: CheckProps) {
    return (
        <StyledCheckBox 
          type='checkbox'                    
          checked={checked}
        >
        {content}
        </StyledCheckBox>
    )
}