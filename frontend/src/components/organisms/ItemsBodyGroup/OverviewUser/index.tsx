
import { useSelector } from 'react-redux'
import  {
    Container
} from './styles'

const OverviewUser = () => {
    const userSelected = useSelector(state => state.userReducer.userSelected)
    
    return (
        <Container>
            <h5>{userSelected?.descriptionUser}</h5>

            <h5>{userSelected?.mostViewedDebate?.titleDebate}</h5>
            <h5>Debates já feito {userSelected?.madeDebates}</h5>
        </Container>
    )
}

export default OverviewUser