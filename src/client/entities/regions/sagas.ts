import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchRegionsApi } from './api'
import {
    fetchRegionsFailed,
    fetchRegionsRequested,
    fetchRegionsSucceeded,
} from './slice'
import type { Region } from './types'

function* handleFetchRegions() {
    try {
        const regions: Region[] = yield call(fetchRegionsApi)
        yield put(fetchRegionsSucceeded(regions))
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        yield put(fetchRegionsFailed(message))
    }
}

export function* regionsSaga() {
    yield takeLatest(fetchRegionsRequested.type, handleFetchRegions)
}


