import React, { useMemo } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts'

interface DonutChartData {
    region: string
    duration: number
    flights: number
}

interface DonutChartProps {
    title: string
    data: DonutChartData[]
    height?: number
}

const COLORS = [
    '#1976d2',
    '#dc004e',
    '#2e7d32',
    '#ed6c02',
    '#9c27b0',
    '#f57c00',
    '#795548',
    '#607d8b',
    '#e91e63',
    '#3f51b5',
]

export const DonutChartComponent: React.FC<DonutChartProps> = React.memo(
    ({ title, data, height = 300 }) => {
        const chartData = useMemo(() => {
            return data.map((item, index) => ({
                name: item.region,
                value: item.duration,
                flights: item.flights,
                color: COLORS[index % COLORS.length],
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
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number, name, props) => [
                                        `${value} ч`,
                                        'Средняя длительность',
                                    ]}
                                    labelFormatter={(label) =>
                                        `Регион: ${label}`
                                    }
                                />
                                <Legend
                                    formatter={(value, entry) => (
                                        <span style={{ color: entry.color }}>
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        )
    }
)
