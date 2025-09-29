'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, Tab, Box, Button } from '@mui/material'
import { useCallback, useRef } from 'react'

const tabs = [
    { label: 'Регионы', path: '/' },
    { label: 'Аналитика', path: '/analytics' },
]

export default function NavigationTabs() {
    const pathname = usePathname()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleDownloadLogs = useCallback(async () => {
        try {
            const response = await fetch('/api/logs', { method: 'GET' })
            if (!response.ok) throw new Error('Failed to download logs')
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'logs.csv'
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        } catch (e) {
            console.error(e)
        }
    }, [])

    const handleUploadDataset = useCallback(async (file: File) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/dataset', {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) throw new Error('Upload failed')
        } catch (e) {
            console.error(e)
        }
    }, [])

    const onSelectFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                handleUploadDataset(file)
                e.currentTarget.value = ''
            }
        },
        [handleUploadDataset]
    )

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        router.push(tabs[newValue].path)
    }

    const currentTabIndex = tabs.findIndex((tab) => tab.path === pathname)

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Tabs
                value={currentTabIndex >= 0 ? currentTabIndex : 0}
                onChange={handleTabChange}
                aria-label="navigation tabs"
            >
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" onClick={handleDownloadLogs}>
                    Выгрузить логи
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.json,.xlsx,.xls"
                    style={{ display: 'none' }}
                    onChange={onSelectFile}
                />
                <Button
                    variant="contained"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Загрузка датасета
                </Button>
            </Box>
        </Box>
    )
}
