import React, { useMemo } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

interface LineChartData {
    month: string
    flights: number
}

interface LineChartProps {
    title: string
    data: LineChartData[]
    height?: number
}

export const LineChartComponent: React.FC<LineChartProps> = React.memo(
    ({ title, data, height = 300 }) => {
        const formattedData = useMemo(() => {
            return data.map((item) => ({
                ...item,
                month: item.month.split('-')[1], // Показываем только месяц
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
                            <LineChart data={formattedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value: number) => [
                                        value,
                                        'Полеты',
                                    ]}
                                    labelFormatter={(label) =>
                                        `Месяц: ${label}`
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="flights"
                                    stroke="#1976d2"
                                    strokeWidth={2}
                                    dot={{
                                        fill: '#1976d2',
                                        strokeWidth: 2,
                                        r: 4,
                                    }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        )
    }
)
