export type Region = {
    path: string
    name: string
    count: number
    code: string
}

export type RegionsState = {
    items: Region[]
    loading: boolean
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


