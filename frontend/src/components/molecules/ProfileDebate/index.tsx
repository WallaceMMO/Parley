import { SideDebate, SideEnum } from '../../../store/ducks/debate/types'
import { User } from '../../../store/ducks/user/types'
import IconPhotoProfile from '../../atoms/IconPhotoProfile'
import {
    Container,
    SectionProfile,
    Column,
    PhotoProfile,
    LabelDescription,
    LabelName,
    LabelSideDebate    
} from './styles'

interface Props {
    left?: boolean
    sideDebate: SideDebate
}

const Left = ({sideDebate}: Props) => {
    
    return (
        <Container>
            <SectionProfile>
                <IconPhotoProfile
                    src={sideDebate.userSideDebate.photoProfileUser}
                    size={40}
                 />                
            </SectionProfile>

                <LabelName>{sideDebate.userSideDebate.nameUser}</LabelName>
                <LabelSideDebate>{sideDebate?.side == SideEnum.PRODEBATE ? 'Pró' : 'Contra'}</LabelSideDebate>        
                <LabelDescription>{sideDebate ? sideDebate.groupSideDebate?.nameGroup ?? '': "À Espera"}</LabelDescription>        
        </Container>
    )
}

const Right = ({sideDebate}: Props) => {
    
    return (
        <Container>
            <SectionProfile>                
                <IconPhotoProfile size={40} src={sideDebate?.userSideDebate.photoProfileUser}/>
            </SectionProfile>

                <LabelName>{sideDebate ? sideDebate.userSideDebate.nameUser : 'À espera'}</LabelName>
                <LabelSideDebate>{sideDebate?.side == SideEnum.PRODEBATE ? 'Pró' : 'Contra'}</LabelSideDebate>        
                <LabelDescription>{sideDebate ? sideDebate.groupSideDebate?.nameGroup ?? '': "À Espera"}</LabelDescription>        
        </Container>
    )
}

const ProfileDebate = ({sideDebate, left}: Props) => {
    return (
        <>
            {
                left ? <Left sideDebate={sideDebate}/> : <Right sideDebate={sideDebate}/>
            }
        </>
    )
}

export default ProfileDebate