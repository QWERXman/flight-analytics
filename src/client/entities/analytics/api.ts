import { AnalyticsData, AnalyticsFilters } from './types'

export const analyticsApi = {
    async getAnalytics(filters: AnalyticsFilters): Promise<AnalyticsData> {
        const params = new URLSearchParams()
        
        if (filters.regions.length > 0) {
            params.append('regions', filters.regions.join(','))
        }
        if (filters.dateFrom) {
            params.append('dateFrom', filters.dateFrom)
        }
        if (filters.dateTo) {
            params.append('dateTo', filters.dateTo)
        }

        const response = await fetch(`/api/analytics?${params.toString()}`)
        
        if (!response.ok) {
            throw new Error('Failed to fetch analytics data')
        }

        return response.json()
    }
}
