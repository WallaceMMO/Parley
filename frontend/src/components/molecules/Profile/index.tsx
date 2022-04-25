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
                <div style={{
                    display: 'flex',  
                    flexDirection:'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}>
                    <IconPhotoProfile 
                        size={40}
                        src={user?.photoProfileUser}
                    />
                    <LabelName>{user?.nameUser}</LabelName>
                </div>
            </Link>
        </Container>
    )
}


export default Profile