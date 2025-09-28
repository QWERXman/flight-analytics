import { useCallback } from 'react'
import './style.css'
import { useRegions } from './hooks/useRegions'
import {
    regionsSelector,
    selectedRegionTitleSelector,
    hoveredRegionTitleSelector,
    selectedRegionSelector,
} from '@/client/entities/regions/slice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectRegion, hoverRegion } from '@/client/entities/regions/slice'
import { RegionDetailsSidebar } from '@/client/widgets'

export default () => {
    useRegions()

    const regions = useAppSelector(regionsSelector)
    const selectedTitle = useAppSelector(selectedRegionTitleSelector)
    const hoveredTitle = useAppSelector(hoveredRegionTitleSelector)
    const selectedRegion = useAppSelector(selectedRegionSelector)
    const dispatch = useAppDispatch()

    const handleClick = useCallback(
        (e: React.MouseEvent<SVGSVGElement>) => {
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

    return (
        <>
            {(selectedTitle || hoveredTitle) && (
                <div className="rf-map__title">
                    {hoveredTitle ?? selectedTitle}
                </div>
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.2"
                baseProfile="tiny"
                x="0px"
                y="0px"
                viewBox="0 0 1000 600"
                className="rf-map"
                onClick={handleClick}
            >
                {regions?.map((item) => (
                    <path
                        key={item.code}
                        d={item.path}
                        data-title={item.title}
                        data-code={item.code}
                        className={
                            selectedRegion?.code === item.code ? 'selected' : ''
                        }
                        onMouseEnter={() => dispatch(hoverRegion(item.code))}
                        onMouseLeave={() => dispatch(hoverRegion(null))}
                    />
                ))}
            </svg>
            <RegionDetailsSidebar
                open={!!selectedRegion}
                onClose={handleCloseSidebar}
                region={selectedRegion}
            />
        </>
    )
}
