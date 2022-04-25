import Router from 'next/router'

import {
    Container,
    Button
} from './styles'

import {FaHome, FaUserAlt} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'
import {IoMdSettings} from 'react-icons/io'

const ButtonsPanel = () => {

    return (
        <Container>
            <Button onClick={() => Router.push('/')}>
                <FaHome size={30}/>
            </Button>

            <Button onClick={() => Router.push(`/user/list`)}>
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