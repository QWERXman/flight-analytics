import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import regionsReducer from '@/client/entities/regions/slice'
import { regionsSaga } from '@/client/entities/regions/sagas'
import analyticsReducer from '@/client/entities/analytics/slice'
import { analyticsSaga } from '@/client/entities/analytics/sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        regions: regionsReducer,
        analytics: analyticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
            sagaMiddleware
        ),
})

function* rootSaga() {
    yield all([fork(regionsSaga), fork(analyticsSaga)])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


