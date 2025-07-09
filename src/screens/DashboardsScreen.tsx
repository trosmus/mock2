import React, { useState, useCallback, useMemo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  LocalShipping as LocalShippingIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  Speed as SpeedIcon,
  Place as PlaceIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { addTrailStep } from '../store/appState'
import { Page } from '../components/Page'
import {
  DashboardList,
  DashboardView,
  type Dashboard,
  type DashboardWidgetData
} from '../components/dashboard'

export const DashboardsScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const theme = useTheme()
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedDashboardForMenu, setSelectedDashboardForMenu] = useState<Dashboard | null>(null)

  // Mock data for shipping company dashboards
  const mockDashboards: Dashboard[] = useMemo(() => [
    {
      id: '1',
      name: 'Logistics Overview',
      description: 'Key performance metrics for shipping operations',
      widgets: [
        {
          id: 'w1',
          title: 'Total Deliveries',
          type: 'metric',
          data: { value: '12,847', change: '+8.3%', trend: 'up' },
          color: theme.palette.success.main,
          icon: <LocalShippingIcon />,
        },
        {
          id: 'w2',
          title: 'Average Delivery Time',
          type: 'metric',
          data: { value: '2.4 days', change: '-12%', trend: 'down' },
          color: theme.palette.primary.main,
          icon: <ScheduleIcon />,
        },
        {
          id: 'w3',
          title: 'Total Revenue',
          type: 'metric',
          data: { value: '$2.4M', change: '+15.2%', trend: 'up' },
          color: theme.palette.success.main,
          icon: <AttachMoneyIcon />,
        },
        {
          id: 'w4',
          title: 'Delivery Performance',
          type: 'chart',
          data: {
            chartType: 'line',
            title: 'Daily Deliveries',
            option: {
              title: { text: 'Daily Deliveries', textStyle: { fontSize: 14 } },
              tooltip: { trigger: 'axis' },
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: { fontSize: 10 }
              },
              yAxis: {
                type: 'value',
                axisLabel: { fontSize: 10 }
              },
              series: [{
                data: [850, 920, 1150, 1080, 1200, 1350, 1280],
                type: 'line',
                smooth: true,
                lineStyle: { color: theme.palette.primary.main },
                itemStyle: { color: theme.palette.primary.main }
              }],
              grid: { top: 40, right: 20, bottom: 30, left: 40 }
            }
          },
          color: theme.palette.primary.main,
          icon: <TrendingUpIcon />,
        },
        {
          id: 'w5',
          title: 'Top Routes',
          type: 'table',
          data: {
            headers: ['Route', 'Deliveries', 'Avg Time', 'Status'],
            rows: [
              { route: 'New York → Boston', deliveries: 1250, avgTime: '6.2h', status: 'On Time', statusColor: 'success' },
              { route: 'Los Angeles → San Francisco', deliveries: 980, avgTime: '8.1h', status: 'Delayed', statusColor: 'error' },
              { route: 'Chicago → Detroit', deliveries: 850, avgTime: '4.8h', status: 'On Time', statusColor: 'success' },
              { route: 'Miami → Orlando', deliveries: 720, avgTime: '3.2h', status: 'Early', statusColor: 'info' },
              { route: 'Dallas → Houston', deliveries: 650, avgTime: '5.1h', status: 'On Time', statusColor: 'success' },
              { route: 'Seattle → Portland', deliveries: 580, avgTime: '4.2h', status: 'On Time', statusColor: 'success' },
              { route: 'Phoenix → Las Vegas', deliveries: 520, avgTime: '7.8h', status: 'Delayed', statusColor: 'error' },
            ]
          },
          color: theme.palette.info.main,
          icon: <PlaceIcon />,
        },
        {
          id: 'w6',
          title: 'Fleet Utilization',
          type: 'metric',
          data: { value: '87.5%', change: '+3.2%', trend: 'up' },
          color: theme.palette.warning.main,
          icon: <SpeedIcon />,
        },
        {
          id: 'w7',
          title: 'Delivery Insights',
          type: 'insight',
          data: {
            insight: 'Peak delivery times are between 2-4 PM with 23% higher success rate',
            confidence: 'high',
            impact: 'positive'
          },
          color: theme.palette.info.main,
          icon: <AnalyticsIcon />,
        },
        {
          id: 'w8',
          title: 'Cost Analysis',
          type: 'chart',
          data: {
            chartType: 'bar',
            title: 'Monthly Costs',
            option: {
              title: { text: 'Monthly Costs ($)', textStyle: { fontSize: 14 } },
              tooltip: { trigger: 'axis' },
              xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisLabel: { fontSize: 10 }
              },
              yAxis: {
                type: 'value',
                axisLabel: { fontSize: 10, formatter: '${value}k' }
              },
              series: [{
                data: [180, 165, 195, 175, 210, 190],
                type: 'bar',
                itemStyle: { color: theme.palette.error.main }
              }],
              grid: { top: 40, right: 20, bottom: 30, left: 50 }
            }
          },
          color: theme.palette.error.main,
          icon: <AttachMoneyIcon />,
        },
      ],
      layout: [
        { i: 'w1', x: 0, y: 0, w: 3, h: 2 },
        { i: 'w2', x: 3, y: 0, w: 3, h: 2 },
        { i: 'w3', x: 6, y: 0, w: 3, h: 2 },
        { i: 'w6', x: 9, y: 0, w: 3, h: 2 },
        { i: 'w4', x: 0, y: 2, w: 6, h: 4 },
        { i: 'w8', x: 6, y: 2, w: 6, h: 4 },
        { i: 'w5', x: 0, y: 6, w: 8, h: 5 },
        { i: 'w7', x: 8, y: 6, w: 4, h: 3 },
      ],
      isPublic: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '2',
      name: 'Fleet Management',
      description: 'Vehicle performance and maintenance tracking',
      widgets: [
        {
          id: 'w9',
          title: 'Active Vehicles',
          type: 'metric',
          data: { value: '247', change: '+5%', trend: 'up' },
          color: theme.palette.success.main,
          icon: <LocalShippingIcon />,
        },
        {
          id: 'w10',
          title: 'Maintenance Due',
          type: 'metric',
          data: { value: '18', change: '-23%', trend: 'down' },
          color: theme.palette.warning.main,
          icon: <ScheduleIcon />,
        },
        {
          id: 'w11',
          title: 'Fuel Efficiency',
          type: 'metric',
          data: { value: '6.2 MPG', change: '+2.8%', trend: 'up' },
          color: theme.palette.primary.main,
          icon: <SpeedIcon />,
        },
        {
          id: 'w12',
          title: 'Vehicle Status',
          type: 'table',
          data: {
            headers: ['Vehicle ID', 'Status', 'Location', 'Mileage', 'Next Service'],
            rows: [
              { vehicle: 'TRK-001', status: 'In Transit', location: 'New York, NY', mileage: '145,230', service: '2 days', statusColor: 'info' },
              { vehicle: 'TRK-002', status: 'Loading', location: 'Chicago, IL', mileage: '98,450', service: '1 week', statusColor: 'warning' },
              { vehicle: 'TRK-003', status: 'Maintenance', location: 'Service Center', mileage: '203,890', service: 'Today', statusColor: 'error' },
              { vehicle: 'TRK-004', status: 'In Transit', location: 'Dallas, TX', mileage: '156,720', service: '3 days', statusColor: 'info' },
              { vehicle: 'TRK-005', status: 'Available', location: 'Los Angeles, CA', mileage: '87,340', service: '5 days', statusColor: 'success' },
              { vehicle: 'TRK-006', status: 'In Transit', location: 'Miami, FL', mileage: '112,560', service: '1 week', statusColor: 'info' },
            ]
          },
          color: theme.palette.info.main,
          icon: <AssessmentIcon />,
        },
        {
          id: 'w13',
          title: 'Performance Trends',
          type: 'chart',
          data: {
            chartType: 'line',
            title: 'Fleet Performance',
            option: {
              title: { text: 'Weekly Performance (%)', textStyle: { fontSize: 14 } },
              tooltip: { trigger: 'axis' },
              xAxis: {
                type: 'category',
                data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
                axisLabel: { fontSize: 10 }
              },
              yAxis: {
                type: 'value',
                min: 80,
                max: 100,
                axisLabel: { fontSize: 10, formatter: '{value}%' }
              },
              series: [{
                data: [85, 88, 92, 87, 94, 91, 96],
                type: 'line',
                smooth: true,
                lineStyle: { color: theme.palette.success.main },
                itemStyle: { color: theme.palette.success.main },
                areaStyle: { color: theme.palette.success.main + '1A' }
              }],
              grid: { top: 40, right: 20, bottom: 30, left: 40 }
            }
          },
          color: theme.palette.success.main,
          icon: <TrendingUpIcon />,
        },
        {
          id: 'w14',
          title: 'Maintenance Insights',
          type: 'insight',
          data: {
            insight: 'Scheduled maintenance reduces breakdown incidents by 34%',
            confidence: 'high',
            impact: 'positive'
          },
          color: theme.palette.success.main,
          icon: <AnalyticsIcon />,
        },
      ],
      layout: [
        { i: 'w9', x: 0, y: 0, w: 3, h: 2 },
        { i: 'w10', x: 3, y: 0, w: 3, h: 2 },
        { i: 'w11', x: 6, y: 0, w: 3, h: 2 },
        { i: 'w13', x: 0, y: 2, w: 9, h: 4 },
        { i: 'w12', x: 0, y: 6, w: 8, h: 4 },
        { i: 'w14', x: 8, y: 6, w: 4, h: 3 },
      ],
      isPublic: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
    },
    {
      id: '3',
      name: 'Customer Satisfaction',
      description: 'Customer feedback and service quality metrics',
      widgets: [
        {
          id: 'w15',
          title: 'Customer Rating',
          type: 'metric',
          data: { value: '4.8/5', change: '+0.2', trend: 'up' },
          color: theme.palette.success.main,
          icon: <TrendingUpIcon />,
        },
        {
          id: 'w16',
          title: 'Response Time',
          type: 'metric',
          data: { value: '2.3 hrs', change: '-18%', trend: 'down' },
          color: theme.palette.primary.main,
          icon: <ScheduleIcon />,
        },
        {
          id: 'w17',
          title: 'Resolution Rate',
          type: 'metric',
          data: { value: '94.2%', change: '+5.8%', trend: 'up' },
          color: theme.palette.success.main,
          icon: <AssessmentIcon />,
        },
        {
          id: 'w18',
          title: 'Customer Feedback',
          type: 'insight',
          data: {
            insight: 'Customers appreciate real-time tracking updates - 87% satisfaction rate',
            confidence: 'high',
            impact: 'positive'
          },
          color: theme.palette.info.main,
          icon: <AnalyticsIcon />,
        },
        {
          id: 'w19',
          title: 'Support Trends',
          type: 'chart',
          data: {
            chartType: 'bar',
            title: 'Monthly Support Tickets',
            option: {
              title: { text: 'Support Tickets', textStyle: { fontSize: 14 } },
              tooltip: { trigger: 'axis' },
              xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisLabel: { fontSize: 10 }
              },
              yAxis: {
                type: 'value',
                axisLabel: { fontSize: 10 }
              },
              series: [{
                data: [120, 95, 110, 85, 75, 90],
                type: 'bar',
                itemStyle: { color: theme.palette.warning.main }
              }],
              grid: { top: 40, right: 20, bottom: 30, left: 40 }
            }
          },
          color: theme.palette.warning.main,
          icon: <AnalyticsIcon />,
        },
      ],
      layout: [
        { i: 'w15', x: 0, y: 0, w: 3, h: 2 },
        { i: 'w16', x: 3, y: 0, w: 3, h: 2 },
        { i: 'w17', x: 6, y: 0, w: 3, h: 2 },
        { i: 'w19', x: 0, y: 2, w: 6, h: 4 },
        { i: 'w18', x: 6, y: 2, w: 6, h: 2.5 },
      ],
      isPublic: false,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-22'),
    },
  ], [theme])

  const [dashboards, setDashboards] = useState<Dashboard[]>(mockDashboards)

  React.useEffect(() => {
    addTrailStep({
      title: t('DASHBOARDS.TITLE'),
      type: 'dashboard',
      description: t('DASHBOARDS.SUBTITLE'),
    })
  }, [t])

  const handleDashboardSelect = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard)
    setIsEditMode(false)
  }

  const handleBackToDashboards = () => {
    setSelectedDashboard(null)
    setIsEditMode(false)
  }

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode)
  }

  const handleLayoutChange = useCallback((newLayout: any[]) => {
    if (selectedDashboard && isEditMode) {
      setSelectedDashboard(prev => prev ? { ...prev, layout: newLayout } : null)
    }
  }, [selectedDashboard, isEditMode])

  const handleCreateDashboard = () => {
    // This would typically create a new dashboard
    setIsCreateDialogOpen(false)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, dashboard: Dashboard) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedDashboardForMenu(dashboard)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedDashboardForMenu(null)
  }

  return (
    <>
      {selectedDashboard ? (
        <DashboardView
          dashboard={selectedDashboard}
          isEditMode={isEditMode}
          onBack={handleBackToDashboards}
          onToggleEdit={handleToggleEdit}
          onLayoutChange={handleLayoutChange}
        />
      ) : (
        <Page
          title={t('DASHBOARDS.TITLE')}
          subtitle={t('DASHBOARDS.SUBTITLE')}
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsCreateDialogOpen(true)}
              sx={{ borderRadius: 2 }}
            >
              {t('DASHBOARDS.CREATE_DASHBOARD')}
            </Button>
          }
        >
          <DashboardList
            dashboards={dashboards}
            onDashboardSelect={handleDashboardSelect}
            onCreateDashboard={() => setIsCreateDialogOpen(true)}
            onMenuOpen={handleMenuOpen}
          />
        </Page>
      )}

      {/* Create Dashboard Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('DASHBOARDS.CREATE_DASHBOARD')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('DASHBOARDS.NAME')}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label={t('DASHBOARDS.DESCRIPTION')}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            {t('COMMON.CANCEL')}
          </Button>
          <Button onClick={handleCreateDashboard} variant="contained">
            {t('COMMON.SAVE')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dashboard Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          {t('COMMON.EDIT')}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ShareIcon sx={{ mr: 1 }} />
          Share
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          {t('COMMON.DELETE')}
        </MenuItem>
      </Menu>
    </>
  )
}
