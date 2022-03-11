import 'react-redux'

import {AppState} from '../store/ducks/rootReducer'

declare module 'react-redux' {
    export interface DefaultRootState extends AppState {

    }
}