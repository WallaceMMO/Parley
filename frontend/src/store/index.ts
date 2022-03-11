import {createStore, applyMiddleware, Store} from 'redux'
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga'
import {createWrapper} from 'next-redux-wrapper'
import {composeWithDevTools} from 'redux-devtools-extension'

import {UserState} from './ducks/user/types'


import rootReducer from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'

const bindMiddleware = (middleware: SagaMiddleware[]) => {
    if(process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware))
    }

    return applyMiddleware(...middleware)
}

export const makeStore = (context: any) => {
    const sagaMiddleware = createSagaMiddleware()
    const store: any = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

export const wrapper = createWrapper(makeStore, {debug: true})