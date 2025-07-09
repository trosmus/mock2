import React, { useState } from 'react'
import {
  Box,
  Button,
  useTheme,
  alpha,
} from '@mui/material'
import {
  Edit as EditIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { DashboardWidget, type DashboardWidgetData } from './DashboardWidget'
import { AddWidgetDialog } from './AddWidgetDialog'
import { WidgetTemplate } from './widgetTemplatesByTopic'
import { useTypedTranslation } from '../../hooks/useTypedTranslation'
import { Dashboard } from './DashboardList'
import { Page } from '../Page'
import 'react-grid-layout/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardViewProps {
  dashboard: Dashboard
  isEditMode: boolean
  onBack: () => void
  onToggleEdit: () => void
  onLayoutChange: (layout: any[]) => void
  onDashboardUpdate?: (updatedDashboard: Dashboard) => void
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  dashboard,
  isEditMode,
  onBack,
  onToggleEdit,
  onLayoutChange,
  onDashboardUpdate,
}) => {
  const { t } = useTypedTranslation()
  const theme = useTheme()
  const [isAddWidgetDialogOpen, setIsAddWidgetDialogOpen] = useState(false)

  const handleAddWidget = (widgetTemplate: WidgetTemplate) => {
    const newWidgetId = `w${Date.now()}`
    const newWidget: DashboardWidgetData = {
      id: newWidgetId,
      title: widgetTemplate.title,
      type: widgetTemplate.template.type as any,
      data: widgetTemplate.template.data,
      color: widgetTemplate.color,
      icon: widgetTemplate.icon,
    }

    // Find a good position for the new widget
    const existingPositions = dashboard.layout.map(item => ({ x: item.x, y: item.y, w: item.w, h: item.h }))
    const newLayout = {
      i: newWidgetId,
      x: 0,
      y: Math.max(...existingPositions.map(p => p.y + p.h), 0),
      w: widgetTemplate.type === 'metric' ? 3 : 6,
      h: widgetTemplate.type === 'metric' ? 2 : 4,
    }

    const updatedDashboard = {
      ...dashboard,
      widgets: [...dashboard.widgets, newWidget],
      layout: [...dashboard.layout, newLayout],
    }

    if (onDashboardUpdate) {
      onDashboardUpdate(updatedDashboard)
    }
  }

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
          {isEditMode && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setIsAddWidgetDialogOpen(true)}
              size="small"
              sx={{
                borderColor: alpha(theme.palette.success.main, 0.5),
                color: theme.palette.success.main,
                '&:hover': {
                  borderColor: theme.palette.success.main,
                  backgroundColor: alpha(theme.palette.success.main, 0.04),
                },
              }}
            >
              Add Widget
            </Button>
          )}
          <Button
            variant={isEditMode ? 'contained' : 'outlined'}
            startIcon={<EditIcon />}
            onClick={onToggleEdit}
            size="small"
          >
            {isEditMode ? 'Save' : 'Edit'}
          </Button>
          {/*<Button*/}
          {/*  variant="outlined"*/}
          {/*  startIcon={<ShareIcon />}*/}
          {/*  size="small"*/}
          {/*>*/}
          {/*  Share*/}
          {/*</Button>*/}
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

      <AddWidgetDialog
        open={isAddWidgetDialogOpen}
        onClose={() => setIsAddWidgetDialogOpen(false)}
        onAddWidget={handleAddWidget}
      />
    </Page>
  )
}
