import { call, put, takeEvery, select } from 'redux-saga/effects'
import { analyticsApi } from './api'
import { setLoading, setData, setError, fetchAnalytics } from './slice'
import { AnalyticsFilters } from './types'

function* fetchAnalyticsSaga() {
    try {
        yield put(setLoading(true))
        
        const filters: AnalyticsFilters = yield select((state: any) => state.analytics.filters)
        const data = yield call(analyticsApi.getAnalytics, filters)
        
        yield put(setData(data))
    } catch (error) {
        yield put(setError(error instanceof Error ? error.message : 'Unknown error'))
    }
}

export function* analyticsSaga() {
    yield takeEvery(fetchAnalytics.type, fetchAnalyticsSaga)
}
