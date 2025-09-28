import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
    zoomIn,
    zoomOut,
    resetZoom,
    resetPan,
    zoomSelector,
    panSelector,
} from '@/client/entities/regions/slice'
import './style.css'

export const ZoomControls: React.FC = () => {
    const dispatch = useAppDispatch()
    const zoom = useAppSelector(zoomSelector)
    const pan = useAppSelector(panSelector)

    const handleZoomIn = () => {
        dispatch(zoomIn())
    }

    const handleZoomOut = () => {
        dispatch(zoomOut())
    }

    const handleResetZoom = () => {
        dispatch(resetZoom())
    }

    const handleResetPosition = () => {
        dispatch(resetPan())
    }

    return (
        <div className="zoom-controls">
            <button
                className="zoom-controls__button zoom-controls__button--plus"
                onClick={handleZoomIn}
                title="Увеличить масштаб"
                disabled={zoom >= 3}
            >
                +
            </button>
            <button
                className="zoom-controls__button zoom-controls__button--minus"
                onClick={handleZoomOut}
                title="Уменьшить масштаб"
                disabled={zoom <= 0.5}
            >
                −
            </button>
            <button
                className="zoom-controls__button zoom-controls__button--reset"
                onClick={handleResetZoom}
                title="Сбросить масштаб"
                disabled={zoom === 1}
            >
                ⌂
            </button>
            <button
                className="zoom-controls__button zoom-controls__button--position"
                onClick={handleResetPosition}
                title="Сбросить позицию"
                disabled={pan.x === 0 && pan.y === 0}
            >
                ⊞
            </button>
            <div className="zoom-controls__indicator">
                {Math.round(zoom * 100)}%
            </div>
        </div>
    )
}
