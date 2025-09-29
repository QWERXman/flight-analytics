import React from 'react'
import {
    Drawer,
    Typography,
    Box,
    IconButton,
    Divider,
    Chip,
    Paper,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { Region } from '@/client/entities/regions/types'

interface RegionDetailsSidebarProps {
    open: boolean
    onClose: () => void
    region: Region | null
}

export const RegionDetailsSidebar: React.FC<RegionDetailsSidebarProps> = ({
    open,
    onClose,
    region,
}) => {
    if (!region) return null

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                    padding: 2,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 'bold' }}
                >
                    Детали региона
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {region.name}
                    </Typography>
                    <Chip
                        label={`Код: ${region.code}`}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}
                    />
                </Paper>

                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Статистика
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h4" color="primary">
                            {region.flight_count}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            рейсов
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Дополнительная информация
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Здесь может быть размещена дополнительная информация о
                        регионе, такая как описание, географические данные,
                        историческая справка и другие релевантные детали.
                    </Typography>
                </Paper>
            </Box>
        </Drawer>
    )
}
