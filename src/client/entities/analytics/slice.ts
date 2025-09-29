import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnalyticsState, AnalyticsData, AnalyticsFilters } from './types'

const initialState: AnalyticsState = {
    data: null,
    loading: false,
    error: null,
    filters: {
        regions: [],
        dateFrom: null,
        dateTo: null
    }
}

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setData: (state, action: PayloadAction<AnalyticsData>) => {
            state.data = action.payload
            state.loading = false
            state.error = null
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
        setFilters: (state, action: PayloadAction<Partial<AnalyticsFilters>>) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        resetFilters: (state) => {
            state.filters = {
                regions: [],
                dateFrom: null,
                dateTo: null
            }
        },
        fetchAnalytics: (state) => {
            state.loading = true
            state.error = null
        }
    }
})

export const { setLoading, setData, setError, setFilters, resetFilters, fetchAnalytics } = analyticsSlice.actions
export default analyticsSlice.reducer
