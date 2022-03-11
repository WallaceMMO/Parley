
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import  {
    Container,
    Input,
    ButtonSend
} from './styles'

interface InputChatProps {
    handleSendMessage: (message: string) => void
}
const InputChat = ({handleSendMessage}: InputChatProps) => {
    const [text, setText] = useState('')

    const refInput = useRef<HTMLInputElement>(null)

    return (
        <Container>
            <Input 
            type={"text"} 
            placeholder='Digite algo'
            value={text}
            ref={refInput}
            onChange={(e) => setText(e.target.value)}
            />
            <ButtonSend onClick={() => {
                handleSendMessage(text)
                setText('')
                refInput.current?.focus()
            }}/>
        </Container>
    )
}

export default InputChat