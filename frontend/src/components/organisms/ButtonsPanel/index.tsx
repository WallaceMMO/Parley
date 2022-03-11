import Router from 'next/router'

import {
    Container,
    Button
} from './styles'

import {FaHome, FaUserAlt} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'
import {IoMdSettings} from 'react-icons/io'
import { useSelector } from 'react-redux'

const ButtonsPanel = () => {
    const user = useSelector(state => state.userReducer.user)
    return (
        <Container>
            <Button onClick={() => Router.push('/')}>
                <FaHome size={30}/>
            </Button>

            <Button onClick={() => Router.push(`/user/${user.idUser}`)}>
                <FaUserAlt size={30}/>
            </Button>

            <Button onClick={() => Router.push(`/group/list`)}>
                <HiUserGroup size={30}/>
            </Button>

            <Button onClick={() => Router.push('/settings')}>
                <IoMdSettings size={30}/>
            </Button>
        </Container>
    )
}

export default ButtonsPanel