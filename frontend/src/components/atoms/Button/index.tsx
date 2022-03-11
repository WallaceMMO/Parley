import { HTMLAttributes } from "react";

import {
    StyledButton
} from './styles'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    content: string
}

export default function Button({ content, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{content}</StyledButton>;
}

