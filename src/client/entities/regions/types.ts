export type RegionResponse = {
    total_flights: number
    regions: Region[]
}

export type Region = {
    path: string
    name: string
    flight_count: number
    code: string
}

export type RegionsState = {
    items: Region[]
    loading: boolean
    totalFlight: number
    error: string | null
    selectedCode: string | null
    hoveredCode: string | null
    zoom: number
    pan: {
        x: number
        y: number
    }
    isDragging: boolean
    dateFrom: string | null
    dateTo: string | null
}


