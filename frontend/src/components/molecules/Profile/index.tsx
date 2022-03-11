import IconPhotoProfile from '../../atoms/IconPhotoProfile'

import Link from 'next/link'

import {
    Container,
    LabelName
} from './styles'
import { useSelector } from 'react-redux'

const Profile = () => {

    const user = useSelector(state => state.userReducer.user)    

    return (
        <Container>
            <Link href={`user/${user?.idUser}`}>
                <div>
                    <IconPhotoProfile 
                        size={40}                    
                    />
                    <LabelName>{user?.nameUser}</LabelName>
                </div>
            </Link>
        </Container>
    )
}


export default Profile