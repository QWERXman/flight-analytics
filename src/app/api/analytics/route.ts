export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const regions = searchParams.get('regions')?.split(',') || []
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // Моковые данные для демонстрации
    const mockData = {
        flightsPerMonth: {
            total: 1247,
            chart: [
                { month: '2024-01', flights: 98 },
                { month: '2024-02', flights: 112 },
                { month: '2024-03', flights: 134 },
                { month: '2024-04', flights: 156 },
                { month: '2024-05', flights: 189 },
                { month: '2024-06', flights: 203 },
                { month: '2024-07', flights: 187 },
                { month: '2024-08', flights: 168 }
            ]
        },
        averageDuration: {
            total: 4.2,
            byRegion: [
                { region: 'Москва', duration: 3.8, flights: 234 },
                { region: 'Санкт-Петербург', duration: 4.1, flights: 189 },
                { region: 'Новосибирск', duration: 4.5, flights: 156 },
                { region: 'Екатеринбург', duration: 4.3, flights: 134 },
                { region: 'Казань', duration: 3.9, flights: 112 },
                { region: 'Нижний Новгород', duration: 4.0, flights: 98 },
                { region: 'Челябинск', duration: 4.4, flights: 87 },
                { region: 'Омск', duration: 4.6, flights: 76 },
                { region: 'Самара', duration: 4.2, flights: 65 },
                { region: 'Ростов-на-Дону', duration: 3.7, flights: 54 }
            ]
        },
        topRegions: [
            { region: 'Москва', flights: 234, percentage: 18.8 },
            { region: 'Санкт-Петербург', flights: 189, percentage: 15.2 },
            { region: 'Новосибирск', flights: 156, percentage: 12.5 },
            { region: 'Екатеринбург', flights: 134, percentage: 10.7 },
            { region: 'Казань', flights: 112, percentage: 9.0 },
            { region: 'Нижний Новгород', flights: 98, percentage: 7.9 },
            { region: 'Челябинск', flights: 87, percentage: 7.0 },
            { region: 'Омск', flights: 76, percentage: 6.1 },
            { region: 'Самара', flights: 65, percentage: 5.2 },
            { region: 'Ростов-на-Дону', flights: 54, percentage: 4.3 }
        ]
    }

    // Здесь можно добавить фильтрацию по регионам и датам
    let filteredData = { ...mockData }

    if (regions.length > 0) {
        filteredData.averageDuration.byRegion = filteredData.averageDuration.byRegion.filter(
            item => regions.includes(item.region)
        )
        filteredData.topRegions = filteredData.topRegions.filter(
            item => regions.includes(item.region)
        )
    }

    return Response.json(filteredData)
}
