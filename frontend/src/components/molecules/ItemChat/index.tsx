
import IconPhotoProfile from '../../atoms/IconPhotoProfile'

import {
    Container,
    SectionDescription,
    LabelName,
    LabelNameGroup,
    SectionTop,
    MessageText
} from './styles'

interface PropsItemChat {
    photo?: Buffer
    name: string
    nameGroup?: string
    messageText: string
}

const ItemChat = ({name, nameGroup, messageText}: PropsItemChat) => {
    return (
        <Container>
            <SectionTop>
                <IconPhotoProfile size={40}/>
                <SectionDescription>
                    <LabelName>{name}</LabelName>
                    <LabelNameGroup>{nameGroup}</LabelNameGroup>
                </SectionDescription>
            </SectionTop>   

            <MessageText>
                {messageText}
            </MessageText>         
        </Container>
    )
}

export default ItemChat