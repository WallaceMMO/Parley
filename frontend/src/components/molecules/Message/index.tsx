import React from 'react'

import {
    Container,
    SectionProfile,
    LabelSenderName,
    Row,
    Column,
    SectionDescription,
    BodyText,
    Text,
    LabelDescriptionProfile
} from './styles'

import IconPhotoProfile from '../../atoms/IconPhotoProfile'

type Props = {
    senderName: string
    text: string
}

class Message extends React.Component<Props> {
    render(): React.ReactNode {
        return(
            <Container>
                <SectionProfile>
                    <IconPhotoProfile />
                    <SectionDescription>
                        <LabelSenderName>{this.props.senderName}</LabelSenderName>
                        <LabelDescriptionProfile>dsanfjufndjfnidsf</LabelDescriptionProfile>
                    </SectionDescription>
                </SectionProfile>

                <BodyText>
                    <Text>dsadasddsadasddsadasddsadasddsadasd
                        dsadasddsadasddsadasddsadasddsadasddsadasd
                        dsadasddsadasddsadasddsadasddsadasd
                        dsadasddsadasddsadasddsadasddsadasddsadasd
                        dsadasddsadasddsadasddsadasddsadasddsadasddsadasd
                        dsadasddsadasddsadasddsadasddsadasd
                    </Text>
                </BodyText>
            </Container>
        )
    }
}

export default Message