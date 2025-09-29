import { fetchRegionsRequested } from "@/client/entities/regions/slice"
import { useAppDispatch } from "@/lib/hooks"
import { useEffect } from "react"

export const useRegions = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRegionsRequested())
    }, [])
}