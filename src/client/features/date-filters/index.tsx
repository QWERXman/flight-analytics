import { useCallback, useMemo } from 'react'
import { TextField, Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
    dateFromSelector,
    dateToSelector,
    setDateFrom,
    setDateTo,
    resetDateFilters,
    fetchRegionsRequested,
} from '@/client/entities/regions/slice'

export const DateFilters = () => {
    const dispatch = useAppDispatch()
    const dateFrom = useAppSelector(dateFromSelector)
    const dateTo = useAppSelector(dateToSelector)

    const handleDateFromChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const dateString = event.target.value || null
            dispatch(setDateFrom(dateString))
        },
        [dispatch]
    )

    const handleDateToChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const dateString = event.target.value || null
            dispatch(setDateTo(dateString))
        },
        [dispatch]
    )

    const handleReset = useCallback(() => {
        dispatch(resetDateFilters())
    }, [dispatch])

    const handleApply = useCallback(() => {
        dispatch(fetchRegionsRequested())
    }, [dispatch])

    const hasFilters = useMemo(() => {
        return dateFrom || dateTo
    }, [dateFrom, dateTo])

    return (
        <Box
            sx={{
                p: 2,
                backgroundColor: 'white',
                borderRadius: 1,
                boxShadow: 1,
                minWidth: 280,
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Дата с"
                    type="date"
                    value={dateFrom || ''}
                    onChange={handleDateFromChange}
                    size="small"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Дата по"
                    type="date"
                    value={dateTo || ''}
                    onChange={handleDateToChange}
                    size="small"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button
                        variant="contained"
                        onClick={handleApply}
                        size="small"
                        fullWidth
                    >
                        Применить
                    </Button>

                    {hasFilters && (
                        <Button
                            variant="outlined"
                            onClick={handleReset}
                            size="small"
                            fullWidth
                        >
                            Сбросить
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
