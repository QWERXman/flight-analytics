import { RegionResponse } from './types'

export interface FetchRegionsParams {
    dateFrom?: string | null
    dateTo?: string | null
}

export async function fetchRegionsApi(params?: FetchRegionsParams): Promise<RegionResponse> {
    const searchParams = new URLSearchParams()
    
    if (params?.dateFrom) {
        searchParams.append('dateFrom', params.dateFrom)
    }
    
    if (params?.dateTo) {
        searchParams.append('dateTo', params.dateTo)
    }
    
    const url = `/api/regions${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Failed to fetch regions')
    }

    const data = (await response.json()) as RegionResponse
    return data
}


