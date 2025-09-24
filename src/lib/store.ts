import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import regionsReducer from '@/client/entities/regions/slice'
import { regionsSaga } from '@/client/entities/regions/sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        regions: regionsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
            sagaMiddleware
        ),
})

function* rootSaga() {
    yield all([fork(regionsSaga)])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


