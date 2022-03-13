import {Container, IconPhoto} from './styles'

interface Props {
    size?: number
    src?: string
}
export default function IconPhotoProfile({size = 50, src}: Props) {
    return (
        <Container>
             <IconPhoto 
                src={!src ? 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' : src}
                size={size}
            />
            
        </Container>
    )
}