'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, Tab, Box } from '@mui/material'

const tabs = [
    { label: 'Регионы', path: '/' },
    { label: 'Аналитика', path: '/analytics' },
]

export default function NavigationTabs() {
    const pathname = usePathname()
    const router = useRouter()

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        router.push(tabs[newValue].path)
    }

    const currentTabIndex = tabs.findIndex((tab) => tab.path === pathname)

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
                value={currentTabIndex >= 0 ? currentTabIndex : 0}
                onChange={handleTabChange}
                aria-label="navigation tabs"
            >
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
        </Box>
    )
}
