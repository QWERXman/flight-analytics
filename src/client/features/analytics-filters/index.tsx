import React, { useCallback, useEffect } from 'react'
import {
    Card,
    CardContent,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Chip,
    TextField,
    Button,
    Grid,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import {
    setFilters,
    resetFilters,
    fetchAnalytics,
} from '@/client/entities/analytics/slice'
import { Region } from '@/client/entities/regions/types'

export const AnalyticsFilters: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const { filters } = useSelector((state: RootState) => state.analytics)
    const { items: regions } = useSelector((state: RootState) => state.regions)

    const handleRegionsChange = useCallback((event: any) => {
        const value = event.target.value
        dispatch(
            setFilters({
                regions: typeof value === 'string' ? value.split(',') : value,
            })
        )
    }, [])

    const handleDateFromChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFilters({ dateFrom: event.target.value }))
        },
        []
    )

    const handleDateToChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFilters({ dateTo: event.target.value }))
        },
        []
    )

    const handleResetFilters = useCallback(() => {
        dispatch(resetFilters())
    }, [])

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Фильтры
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth sx={{ minWidth: 200 }}>
                            <InputLabel>Регионы</InputLabel>
                            <Select
                                multiple
                                value={filters.regions}
                                onChange={handleRegionsChange}
                                input={<OutlinedInput label="Регионы" />}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value) => {
                                            const region = regions.find(
                                                (r) => r.code === value
                                            )
                                            return (
                                                <Chip
                                                    key={value}
                                                    label={
                                                        region?.title || value
                                                    }
                                                    size="small"
                                                />
                                            )
                                        })}
                                    </Box>
                                )}
                            >
                                {regions.map((region) => (
                                    <MenuItem
                                        key={region.code}
                                        value={region.code}
                                    >
                                        {region.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="Дата с"
                            type="date"
                            value={filters.dateFrom || ''}
                            onChange={handleDateFromChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="Дата по"
                            type="date"
                            value={filters.dateTo || ''}
                            onChange={handleDateToChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                            variant="outlined"
                            onClick={handleResetFilters}
                            fullWidth
                        >
                            Сбросить
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
})
