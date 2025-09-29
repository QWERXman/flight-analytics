import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'

interface KPICardProps {
    title: string
    value: number | string
    subtitle?: string
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

export const KPICard: React.FC<KPICardProps> = React.memo(
    ({ title, value, subtitle, color = 'primary' }) => {
        const getColorValue = () => {
            switch (color) {
                case 'primary':
                    return '#1976d2'
                case 'secondary':
                    return '#dc004e'
                case 'success':
                    return '#2e7d32'
                case 'warning':
                    return '#ed6c02'
                case 'error':
                    return '#d32f2f'
                default:
                    return '#1976d2'
            }
        }

        return (
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                        {title}
                    </Typography>
                    <Box
                        sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}
                    >
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                color: getColorValue(),
                                fontWeight: 'bold',
                            }}
                        >
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="textSecondary">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        )
    }
)
