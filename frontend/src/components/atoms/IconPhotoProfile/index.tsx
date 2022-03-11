import {Container, IconPhoto} from './styles'

interface Props {
    size?: number
}
export default function IconPhotoProfile({size = 50}: Props) {
    return (
        <Container>
             <IconPhoto 
                src={'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png'}
                size={size}
            />
            
        </Container>
    )
}