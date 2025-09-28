# RegionDetailsSidebar

Виджет сайдбара с детальной информацией о выбранном регионе.

## Функциональность

- Отображает детальную информацию о выбранном регионе
- Показывает название региона, код и количество рейсов
- Включает секцию для дополнительной информации
- Поддерживает закрытие через кнопку или клик вне области
- Использует Material-UI компоненты для современного дизайна

## Использование

```tsx
import { RegionDetailsSidebar } from '@/client/widgets'

;<RegionDetailsSidebar
    open={!!selectedRegion}
    onClose={handleCloseSidebar}
    region={selectedRegion}
/>
```

## Props

- `open: boolean` - состояние открытия сайдбара
- `onClose: () => void` - функция закрытия сайдбара
- `region: Region | null` - данные выбранного региона
