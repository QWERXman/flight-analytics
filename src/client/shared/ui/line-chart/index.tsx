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
    [key: string]: string | number
}

interface LineChartProps {
    title: string
    data: LineChartData[]
    height?: number
    xKey?: string
    yKey?: string
    yLabel?: string
}

export const LineChartComponent: React.FC<LineChartProps> = React.memo(
    ({
        title,
        data,
        height = 300,
        xKey = 'month',
        yKey = 'flights',
        yLabel = 'Значение',
    }) => {
        const formattedData = useMemo(() => {
            return data.map((item) => {
                const clone: any = { ...item }
                if (
                    typeof clone[xKey] === 'string' &&
                    /\d{4}-\d{2}/.test(String(clone[xKey]))
                ) {
                    clone[xKey] = String(clone[xKey]).split('-')[1]
                }
                return clone
            })
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
                                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value: number) => [
                                        value,
                                        yLabel,
                                    ]}
                                    labelFormatter={(label) =>
                                        `Категория: ${label}`
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey={yKey}
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
