import React from 'react'
import {
  Box,
  Button,
  useTheme,
} from '@mui/material'
import {
  Edit as EditIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { DashboardWidget, type DashboardWidgetData } from './DashboardWidget'
import { useTypedTranslation } from '../../hooks/useTypedTranslation'
import { Dashboard } from './DashboardList'
import { Page } from '../Page'
import 'react-grid-layout/css/styles.css'
import 'react-grid-layout/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardViewProps {
  dashboard: Dashboard
  isEditMode: boolean
  onBack: () => void
  onToggleEdit: () => void
  onLayoutChange: (layout: any[]) => void
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  dashboard,
  isEditMode,
  onBack,
  onToggleEdit,
  onLayoutChange,
}) => {
  const { t } = useTypedTranslation()
  const theme = useTheme()

  return (
    <Page
      title={dashboard.name}
      subtitle={dashboard.description}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            size="small"
          >
            Back
          </Button>
          <Button
            variant={isEditMode ? 'contained' : 'outlined'}
            startIcon={<EditIcon />}
            onClick={onToggleEdit}
            size="small"
          >
            {isEditMode ? 'Save' : 'Edit'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            size="small"
          >
            Share
          </Button>
        </Box>
      }
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: dashboard.layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        margin={[16, 16]}
      >
        {dashboard.widgets.map((widget: DashboardWidgetData) => (
          <div key={widget.id}>
            <DashboardWidget widget={widget} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </Page>
  )
} 