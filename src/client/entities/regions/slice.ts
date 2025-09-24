import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Region, RegionsState } from './types'
import { RootState } from '@/lib/store'

const initialState: RegionsState = {
    items: [],
    loading: false,
    error: null,
    selectedCode: null,
    hoveredCode: null,
}

const regionsSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        fetchRegionsRequested(state) {
            state.loading = true
            state.error = null
        },
        fetchRegionsSucceeded(state, action: PayloadAction<Region[]>) {
            state.items = action.payload
            state.loading = false
        },
        fetchRegionsFailed(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
        selectRegion(state, action: PayloadAction<string | null>) {
            state.selectedCode = action.payload
        },
        hoverRegion(state, action: PayloadAction<string | null>) {
            state.hoveredCode = action.payload
        },
    },
})

export const {
    fetchRegionsRequested,
    fetchRegionsSucceeded,
    fetchRegionsFailed,
    selectRegion,
    hoverRegion,
} = regionsSlice.actions

export const regionsSelector = (state: RootState) => state.regions.items
export const selectedRegionCodeSelector = (state: RootState) => state.regions.selectedCode
export const selectedRegionTitleSelector = (state: RootState) => {
    const code = state.regions.selectedCode
    if (!code) return null
    const found = state.regions.items.find((r) => r.code === code)
    return found?.title ?? null
}
export const hoveredRegionCodeSelector = (state: RootState) => state.regions.hoveredCode
export const hoveredRegionTitleSelector = (state: RootState) => {
    const code = state.regions.hoveredCode
    if (!code) return null
    const found = state.regions.items.find((r) => r.code === code)
    return found?.title ?? null
}

export default regionsSlice.reducer


