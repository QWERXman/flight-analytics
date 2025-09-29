import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Typography,
    Grid,
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
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                    <KPICard
                        title="Общее количество полетов"
                        value={data.flightsPerMonth.total.toLocaleString()}
                        subtitle="за период"
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <KPICard
                        title="Средняя длительность полета"
                        value={`${data.averageDuration.total} ч`}
                        subtitle="по всем регионам"
                        color="secondary"
                    />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                {/* Line Chart - Flights per Month */}
                <Grid item xs={12} lg={6}>
                    <LineChartComponent
                        title="Количество полетов по месяцам"
                        data={data.flightsPerMonth.chart}
                    />
                </Grid>

                {/* Donut Chart - Average Duration by Region */}
                <Grid item xs={12} lg={6}>
                    <DonutChartComponent
                        title="Средняя длительность по регионам"
                        data={data.averageDuration.byRegion}
                    />
                </Grid>

                {/* Bar Chart - Top Regions */}
                <Grid item xs={12}>
                    <BarChartComponent
                        title="Топ-10 регионов по количеству полетов"
                        data={data.topRegions}
                        height={500}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}
