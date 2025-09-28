export type Region = {
    path: string
    title: string
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
}


