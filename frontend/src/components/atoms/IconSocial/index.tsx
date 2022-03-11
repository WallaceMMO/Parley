
import { HTMLAttributes } from 'react';

import {
    StyledIcon
} from './styles'

export default function Icon({ color, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <StyledIcon 
    background={color ?? '#333'}
    {...rest}
    >{children}</StyledIcon>;
}