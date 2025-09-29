import { RegionResponse } from './types'

export async function fetchRegionsApi(): Promise<RegionResponse> {
    const response = await fetch('/api/regions', {
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


