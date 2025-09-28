'use client'

import { usePathname } from 'next/navigation'
import NavigationTabs from '@/client/widgets/tabs'
import RegionsMap from '@/client/pages/regions-map'
import Analytics from '@/client/pages/analytics'

export default function AnalyticsPage() {
    const pathname = usePathname()

    const renderContent = () => {
        switch (pathname) {
            case '/analytics':
                return <Analytics />
            case '/':
            default:
                return <RegionsMap />
        }
    }

    return (
        <>
            <NavigationTabs />
            {renderContent()}
        </>
    )
}
