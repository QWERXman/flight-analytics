export type FlightsPerMonthData = {
    total: number
    chart: Array<{
        month: string
        flights: number
    }>
}

export type AverageDurationData = {
    total: number
    byRegion: Array<{
        region: string
        duration: number
        flights: number
    }>
}

export type TopRegionData = {
    region: string
    flights: number
    percentage: number
}

export type AnalyticsData = {
    flightsPerMonth: FlightsPerMonthData
    averageDuration: AverageDurationData
    topRegions: TopRegionData[]
}

export type AnalyticsFilters = {
    regions: string[]
    dateFrom: string | null
    dateTo: string | null
}

export type AnalyticsState = {
    data: AnalyticsData | null
    loading: boolean
    error: string | null
    filters: AnalyticsFilters
}
