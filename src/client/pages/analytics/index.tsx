import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material'
import { RootState } from '@/lib/store'
import { fetchAnalytics } from '@/client/entities/analytics/slice'
import { AnalyticsFilters } from '@/client/features/analytics-filters'
import { KPICard } from '@/client/shared/ui/kpi-card'
import { LineChartComponent } from '@/client/shared/ui/line-chart'
import { DonutChartComponent } from '@/client/shared/ui/donut-chart'
import { BarChartComponent } from '@/client/shared/ui/bar-chart'

export default function Analytics() {
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector(
        (state: RootState) => state.analytics
    )
    const { filters } = useSelector((state: RootState) => state.analytics)

    const fetchAnalyticsData = useCallback(() => {
        dispatch(fetchAnalytics())
    }, [])

    useEffect(() => {
        fetchAnalyticsData()
    }, [filters])

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="400px"
                >
                    <CircularProgress />
                </Box>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    Ошибка загрузки данных: {error}
                </Alert>
            </Container>
        )
    }

    if (!data) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Alert severity="info">Нет данных для отображения</Alert>
            </Container>
        )
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Аналитика полетов
            </Typography>

            <AnalyticsFilters />

            {/* KPI Cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3,
                    mb: 3,
                }}
            >
                <Box>
                    <KPICard
                        title="Общее количество полетов"
                        value={data.flightsPerMonth.total.toLocaleString()}
                        subtitle="за период"
                        color="primary"
                    />
                </Box>
                <Box>
                    <KPICard
                        title="Средняя длительность полета"
                        value={`${data.averageDuration.total} ч`}
                        subtitle="по всем регионам"
                        color="secondary"
                    />
                </Box>
                <Box>
                    <KPICard
                        title="Пиковая нагрузка"
                        value={`${data.peakLoad.flights} полетов`}
                        subtitle={`в час ${data.peakLoad.hour}`}
                        color="warning"
                    />
                </Box>
            </Box>

            {/* Charts */}
            {/* Row 1 */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                    gap: 3,
                    mb: 3,
                }}
            >
                <Box>
                    <LineChartComponent
                        title="Количество полетов по месяцам"
                        data={data.flightsPerMonth.chart}
                        xKey="month"
                        yKey="flights"
                        yLabel="Полеты"
                    />
                </Box>

                {/* Donut Chart - Average Duration by Region */}
                <Box>
                    <DonutChartComponent
                        title="Средняя длительность по регионам"
                        data={data.averageDuration.byRegion}
                    />
                </Box>
            </Box>

            {/* Bar Chart - Top Regions */}
            <Box sx={{ mb: 3 }}>
                <BarChartComponent
                    title="Топ-10 регионов по количеству полетов"
                    data={data.topRegions}
                    height={500}
                />
            </Box>

            {/* Row 2 */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                    gap: 3,
                    mb: 3,
                }}
            >
                <Box>
                    <LineChartComponent
                        title="Средняя длительность по месяцам"
                        data={data.averageDurationMonthly}
                        xKey="month"
                        yKey="duration"
                        yLabel="Длительность (ч)"
                    />
                </Box>

                {/* Line Chart - Monthly Growth */}
                <Box>
                    <LineChartComponent
                        title="Рост/падение числа полетов по месяцам"
                        data={data.monthlyGrowth}
                        xKey="month"
                        yKey="growth"
                        yLabel="Рост (%)"
                    />
                </Box>
            </Box>

            {/* Line Chart - Daily Activity by Hour */}
            <Box>
                <LineChartComponent
                    title="Дневная активность по часам"
                    data={data.dailyActivity}
                    xKey="hour"
                    yKey="flights"
                    yLabel="Полеты"
                />
            </Box>
        </Container>
    )
}
