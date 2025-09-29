import { useCallback, useRef, useEffect, useMemo } from 'react'
import './style.css'
import { useRegions } from './hooks/useRegions'
import {
    regionsSelector,
    selectedRegionTitleSelector,
    hoveredRegionTitleSelector,
    selectedRegionSelector,
    zoomSelector,
    panSelector,
    isDraggingSelector,
    totalFlightSelector,
    regionsLoadingSelector,
} from '@/client/entities/regions/slice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
    selectRegion,
    hoverRegion,
    startDragging,
    stopDragging,
    updatePan,
} from '@/client/entities/regions/slice'
import { RegionDetailsSidebar, ZoomControls } from '@/client/widgets'
import { DateFilters } from '@/client/features/date-filters'
import { regionsPaths } from './const'
import { Box, CircularProgress } from '@mui/material'

export default () => {
    useRegions()

    const regions = useAppSelector(regionsSelector)
    const totalFlight = useAppSelector(totalFlightSelector)
    const loading = useAppSelector(regionsLoadingSelector)

    const selectedTitle = useAppSelector(selectedRegionTitleSelector)
    const hoveredTitle = useAppSelector(hoveredRegionTitleSelector)
    const selectedRegion = useAppSelector(selectedRegionSelector)
    const zoom = useAppSelector(zoomSelector)
    const pan = useAppSelector(panSelector)
    const isDragging = useAppSelector(isDraggingSelector)
    const dispatch = useAppDispatch()

    // Функция для вычисления цвета на основе количества рейсов
    const getRegionColor = useCallback(
        (flightCount: number, maxFlightCount: number) => {
            if (maxFlightCount === 0) return '#337AB7' // Базовый цвет если нет данных

            // Нормализуем значение от 0 до 1
            const intensity = flightCount / maxFlightCount

            // Базовый цвет (синий) и целевой цвет (красный)
            const baseColor = { r: 51, g: 122, b: 183 } // #337AB7
            const targetColor = { r: 255, g: 0, b: 0 } // красный

            // Интерполируем между базовым и целевым цветом
            const r = Math.round(
                baseColor.r + (targetColor.r - baseColor.r) * intensity
            )
            const g = Math.round(
                baseColor.g + (targetColor.g - baseColor.g) * intensity
            )
            const b = Math.round(
                baseColor.b + (targetColor.b - baseColor.b) * intensity
            )

            return `rgb(${r}, ${g}, ${b})`
        },
        []
    )

    // Вычисляем максимальное количество рейсов для нормализации
    const maxFlightCount = useMemo(() => {
        if (!regions || regions.length === 0) return 0
        return Math.max(...regions.map((region) => region.flight_count))
    }, [regions])

    const dragStartRef = useRef<{ x: number; y: number } | null>(null)
    const lastPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const hasDraggedRef = useRef<boolean>(false)

    const handleClick = useCallback(
        (e: React.MouseEvent<SVGSVGElement>) => {
            // Не обрабатываем клик, если было перетаскивание
            if (hasDraggedRef.current) {
                return
            }

            const target = e.target as SVGElement
            const code = (target as any)?.dataset?.code as string | undefined
            if (code) {
                dispatch(selectRegion(code))
            }
        },
        [dispatch]
    )

    const handleCloseSidebar = useCallback(() => {
        dispatch(selectRegion(null))
    }, [dispatch])

    const handleMouseDown = useCallback(
        (e: React.MouseEvent<SVGSVGElement>) => {
            e.preventDefault()
            dragStartRef.current = { x: e.clientX, y: e.clientY }
            lastPanRef.current = { ...pan }
            hasDraggedRef.current = false
            dispatch(startDragging())
        },
        [dispatch, pan]
    )

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            dispatch(stopDragging())
        }
        dragStartRef.current = null
        hasDraggedRef.current = false
    }, [dispatch, isDragging])

    const handleMouseLeave = useCallback(() => {
        if (isDragging) {
            dispatch(stopDragging())
        }
        dragStartRef.current = null
        hasDraggedRef.current = false
    }, [dispatch, isDragging])

    // Глобальные обработчики для плавного перетаскивания
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!isDragging || !dragStartRef.current) {
                return
            }

            e.preventDefault()
            const deltaX = e.clientX - dragStartRef.current.x
            const deltaY = e.clientY - dragStartRef.current.y

            // Устанавливаем флаг перетаскивания, если мышь сдвинулась больше чем на 5 пикселей
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            if (distance > 5) {
                hasDraggedRef.current = true
            }

            const newPan = {
                x: lastPanRef.current.x + deltaX,
                y: lastPanRef.current.y + deltaY,
            }

            dispatch(updatePan(newPan))
        }

        const handleGlobalMouseUp = () => {
            if (isDragging) {
                dispatch(stopDragging())
            }
            dragStartRef.current = null
            hasDraggedRef.current = false
        }

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove)
            document.addEventListener('mouseup', handleGlobalMouseUp)
            document.body.style.userSelect = 'none'
            document.body.style.cursor = 'grabbing'
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove)
            document.removeEventListener('mouseup', handleGlobalMouseUp)
            document.body.style.userSelect = ''
            document.body.style.cursor = ''
        }
    }, [isDragging, dispatch])

    return (
        <div className="rf-map-root">
            <div className="rf-map__filters">
                <Box
                    display="flex"
                    alignItems="center"
                    fontSize={24}
                    padding={'18px'}
                    width="100%"
                    overflow="hidden"
                    flexShrink={0}
                >
                    {loading ? (
                        <Box pl="4px">
                            <CircularProgress size={24} />
                        </Box>
                    ) : (
                        <>
                            <Box>Всего: </Box>
                            <Box color="#1976d2">
                                &nbsp;{totalFlight || 0}&nbsp;
                            </Box>
                            <Box>полетов</Box>
                        </>
                    )}
                </Box>
                <DateFilters />
            </div>
            <div className="rf-map-container">
                {(selectedTitle || hoveredTitle) && (
                    <div className="rf-map__title">
                        {hoveredTitle ?? selectedTitle}
                    </div>
                )}

                <div className="rf-map-wrapper">
                    <ZoomControls />
                    <div className="rf-map">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.2"
                            baseProfile="tiny"
                            x="0px"
                            y="0px"
                            viewBox="0 0 1000 600"
                            className={`rf-map__svg ${isDragging ? 'rf-map__svg--dragging' : ''}`}
                            onClick={handleClick}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                                transformOrigin: 'center center',
                            }}
                        >
                            {regions?.map((item) => {
                                const regionColor = getRegionColor(
                                    item.flight_count,
                                    maxFlightCount
                                )
                                const pathData =
                                    regionsPaths[
                                        item.code as keyof typeof regionsPaths
                                    ]

                                if (!pathData) return null

                                return (
                                    <path
                                        key={item.code}
                                        d={pathData.path}
                                        data-title={item.name}
                                        data-code={item.code}
                                        className={
                                            selectedRegion?.code === item.code
                                                ? 'selected'
                                                : ''
                                        }
                                        style={{
                                            fill:
                                                selectedRegion?.code ===
                                                item.code
                                                    ? '#ff6b35'
                                                    : regionColor,
                                        }}
                                        onMouseEnter={() =>
                                            dispatch(hoverRegion(item.code))
                                        }
                                        onMouseLeave={() =>
                                            dispatch(hoverRegion(null))
                                        }
                                    />
                                )
                            })}
                        </svg>
                    </div>
                </div>
                <RegionDetailsSidebar
                    open={!!selectedRegion}
                    onClose={handleCloseSidebar}
                    region={selectedRegion}
                />
            </div>
        </div>
    )
}
