import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as DebatesActions from '../../../../store/ducks/debate/actions'
import { Debate } from '../../../../store/ducks/debate/types'
import PreviewDebate from '../../PreviewDebate'

import {
    Container
} from './styles'

interface PropsDebateMade {
    debates: Debate[] | undefined
}
const DebatesMade = ({debates}: PropsDebateMade) => {    
    
    return (
        <Container>
            {
                debates?.map(debate => <PreviewDebate debate={debate}/>)
            }
        </Container>
    )    
}

export default DebatesMade