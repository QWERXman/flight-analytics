import { call, put, takeLatest, select } from 'redux-saga/effects'
import { fetchRegionsApi, FetchRegionsParams } from './api'
import {
    fetchRegionsFailed,
    fetchRegionsRequested,
    fetchRegionsSucceeded,
} from './slice'
import type { Region, RegionResponse } from './types'
import { RootState } from '@/lib/store'

function* handleFetchRegions() {
    try {
        const state: RootState = yield select()
        const params: FetchRegionsParams = {
            dateFrom: state.regions.dateFrom,
            dateTo: state.regions.dateTo,
        }
        
        const regions: RegionResponse = yield call(fetchRegionsApi, params)
        yield put(fetchRegionsSucceeded(regions))
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        yield put(fetchRegionsFailed(message))
    }
}

export function* regionsSaga() {
    yield takeLatest(fetchRegionsRequested.type, handleFetchRegions)
}


