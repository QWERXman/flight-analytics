import React, { useMemo } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

interface BarChartData {
    region: string
    flights: number
    percentage: number
}

interface BarChartProps {
    title: string
    data: BarChartData[]
    height?: number
}

export const BarChartComponent: React.FC<BarChartProps> = React.memo(
    ({ title, data, height = 400 }) => {
        const chartData = useMemo(() => {
            return data.map((item) => ({
                ...item,
                region:
                    item.region.length > 15
                        ? item.region.substring(0, 15) + '...'
                        : item.region,
            }))
        }, [data])

        return (
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Box sx={{ width: '100%', height }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                layout="horizontal"
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tick={{ fontSize: 12 }} />
                                <YAxis
                                    type="category"
                                    dataKey="region"
                                    tick={{ fontSize: 12 }}
                                    width={120}
                                />
                                <Tooltip
                                    formatter={(value: number, name) => [
                                        `${value} полетов`,
                                        'Количество',
                                    ]}
                                    labelFormatter={(label) =>
                                        `Регион: ${label}`
                                    }
                                />
                                <Bar
                                    dataKey="flights"
                                    fill="#1976d2"
                                    radius={[0, 4, 4, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        )
    }
)
