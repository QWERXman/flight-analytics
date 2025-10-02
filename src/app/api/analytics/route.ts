export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const regions = searchParams.get('regions')?.split(',') || []
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const params = new URLSearchParams()
    if (regions.length > 0) params.set('regions', regions.join(','))
    if (dateFrom) params.set('dateFrom', dateFrom)
    if (dateTo) params.set('dateTo', dateTo)

    const base = process.env.API_PATH

    const endpoints = {
        monthlyFlights: `${base}/api/metrics/monthly-flights?${params.toString()}`,
        avgDurationMonthly: `${base}/api/metrics/avg-duration-monthly?${params.toString()}`,
        avgDurationRegions: `${base}/api/metrics/avg-duration-regions?${params.toString()}`,
        topRegions: `${base}/api/metrics/top-regions?${params.toString()}`,
        peakLoad: `${base}/api/metrics/peak-load?${params.toString()}`,
        monthlyGrowth: `${base}/api/metrics/monthly-growth?${params.toString()}`,
        dailyActivity: `${base}/api/metrics/daily-activity?${params.toString()}`,
    }


    console.log(endpoints)

    try {
        const [monthlyFlightsRes, avgDurMonthlyRes, avgDurRegionsRes, topRegionsRes, peakLoadRes, monthlyGrowthRes, dailyActivityRes] = await Promise.all([
            fetch(endpoints.monthlyFlights, { cache: 'no-store' }),
            fetch(endpoints.avgDurationMonthly, { cache: 'no-store' }),
            fetch(endpoints.avgDurationRegions, { cache: 'no-store' }),
            fetch(endpoints.topRegions, { cache: 'no-store' }),
            fetch(endpoints.peakLoad, { cache: 'no-store' }),
            fetch(endpoints.monthlyGrowth, { cache: 'no-store' }),
            fetch(endpoints.dailyActivity, { cache: 'no-store' }),
        ])

        // if (!monthlyFlightsRes.ok) throw new Error('get_monthly_flights failed')
        // if (!avgDurMonthlyRes.ok) throw new Error('get_avg_duration_monthly failed')
        // if (!avgDurRegionsRes.ok) throw new Error('get_avg_duration_regions failed')
        // if (!topRegionsRes.ok) throw new Error('get_top_regions failed')
        // if (!peakLoadRes.ok) throw new Error('get_peak_load failed')
        // if (!monthlyGrowthRes.ok) throw new Error('get_monthly_growth failed')
        // if (!dailyActivityRes.ok) throw new Error('get_daily_activity failed')

        const [monthlyFlights, avgDurMonthly, avgDurRegions, topRegions, peakLoad, monthlyGrowth, dailyActivity] = await Promise.all([
            monthlyFlightsRes.json(),
            avgDurMonthlyRes.json(),
            avgDurRegionsRes.json(),
            topRegionsRes.json(),
            peakLoadRes.json(),
            monthlyGrowthRes.json(),
            dailyActivityRes.json(),
        ])

        // Expecting shapes:
        // monthlyFlights: Array<{ month: string; flights: number }>
        // avgDurMonthly: Array<{ month: string; duration: number }>
        // avgDurRegions: Array<{ region: string; duration: number; flights: number }>
        // topRegions: Array<{ region: string; flights: number; percentage?: number }>
        // peakLoad: { hour: string; flights: number }
        // monthlyGrowth: Array<{ month: string; growth: number }>
        // dailyActivity: Array<{ hour: string; flights: number }>

        const totalFlights = Array.isArray(monthlyFlights)
            ? monthlyFlights.reduce((acc: number, it: any) => acc + (Number(it.flights) || 0), 0)
            : 0

        const weightedAvgDuration = Array.isArray(avgDurRegions) && avgDurRegions.length > 0
            ? (avgDurRegions.reduce((acc: number, it: any) => acc + (Number(it.duration) || 0) * (Number(it.flights) || 0), 0) /
               avgDurRegions.reduce((acc: number, it: any) => acc + (Number(it.flights) || 0), 0))
            : (Array.isArray(avgDurMonthly) && avgDurMonthly.length > 0
                ? avgDurMonthly.reduce((acc: number, it: any) => acc + (Number(it.duration) || 0), 0) / avgDurMonthly.length
                : 0)

        const responseBody = {
            monthlyFlights, avgDurMonthly, avgDurRegions, topRegions, peakLoad, monthlyGrowth, dailyActivity
        }

        return Response.json(responseBody)
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ message: error instanceof Error ? error.message : 'Failed to load analytics' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
