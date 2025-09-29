export type RegionResponse = {
    totalFlight: number
    regions: Region[]
}

export type Region = {
    path: string
    name: string
    count: number
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
}


