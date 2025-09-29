import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Region, RegionResponse, RegionsState } from './types'
import { RootState } from '@/lib/store'

const initialState: RegionsState = {
    items: [],
    totalFlight: 0,
    loading: false,
    error: null,
    selectedCode: null,
    hoveredCode: null,
    zoom: 1,
    pan: {
        x: 0,
        y: 0,
    },
    isDragging: false,
    dateFrom: null,
    dateTo: null,
}

const regionsSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        fetchRegionsRequested(state) {
            state.loading = true
            state.error = null
        },
        fetchRegionsSucceeded(state, action: PayloadAction<RegionResponse>) {
            state.items = action.payload.regions
            state.totalFlight = action.payload.total_flights
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
        zoomIn(state) {
            state.zoom = Math.min(state.zoom * 1.2, 3)
        },
        zoomOut(state) {
            state.zoom = Math.max(state.zoom / 1.2, 0.5)
        },
        resetZoom(state) {
            state.zoom = 1
        },
        startDragging(state) {
            state.isDragging = true
        },
        stopDragging(state) {
            state.isDragging = false
        },
        updatePan(state, action: PayloadAction<{ x: number; y: number }>) {
            state.pan = action.payload
        },
        resetPan(state) {
            state.pan = { x: 0, y: 0 }
        },
        setDateFrom(state, action: PayloadAction<string | null>) {
            state.dateFrom = action.payload
        },
        setDateTo(state, action: PayloadAction<string | null>) {
            state.dateTo = action.payload
        },
        resetDateFilters(state) {
            state.dateFrom = null
            state.dateTo = null
        },
    },
})

export const {
    fetchRegionsRequested,
    fetchRegionsSucceeded,
    fetchRegionsFailed,
    selectRegion,
    hoverRegion,
    zoomIn,
    zoomOut,
    resetZoom,
    startDragging,
    stopDragging,
    updatePan,
    resetPan,
    setDateFrom,
    setDateTo,
    resetDateFilters,
} = regionsSlice.actions

export const regionsSelector = (state: RootState) => state.regions.items
export const regionsLoadingSelector = (state: RootState) => state.regions.loading
export const totalFlightSelector = (state: RootState) => state.regions.totalFlight
export const selectedRegionCodeSelector = (state: RootState) => state.regions.selectedCode
export const selectedRegionTitleSelector = (state: RootState) => {
    const code = state.regions.selectedCode
    if (!code) return null
    const found = state.regions.items.find((r) => r.code === code)
    return found?.name ?? null
}
export const hoveredRegionCodeSelector = (state: RootState) => state.regions.hoveredCode
export const hoveredRegionTitleSelector = (state: RootState) => {
    const code = state.regions.hoveredCode
    if (!code) return null
    const found = state.regions.items.find((r) => r.code === code)
    return found?.name ?? null
}
export const selectedRegionSelector = (state: RootState) => {
    const code = state.regions.selectedCode
    if (!code) return null
    const found = state.regions.items.find((r) => r.code === code)
    return found ?? null
}
export const zoomSelector = (state: RootState) => state.regions.zoom
export const panSelector = (state: RootState) => state.regions.pan
export const isDraggingSelector = (state: RootState) => state.regions.isDragging
export const dateFromSelector = (state: RootState) => state.regions.dateFrom
export const dateToSelector = (state: RootState) => state.regions.dateTo

export default regionsSlice.reducer


