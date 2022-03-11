
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import {
    StyledInput
} from './styles'

export default function Input({ placeholder, type, onChange }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return <StyledInput onChange={onChange} type={type} placeholder={placeholder} />;
}