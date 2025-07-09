import React, { useState } from 'react'
import {
  Box,
  Typography,
  useTheme,
  alpha,
  Grid,
  Button,
  Paper,
} from '@mui/material'
import {
  BuildCircle as BuildIcon,
  AttachMoney,
  LocalShipping,
  Inventory,
  Speed,
  BarChart,
  TrendingUp,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { Page } from '../components/Page'
import { InsightCard, DashboardPreview } from '../components/dashboard'

// Available insight components
const availableInsights = [
  {
    id: 'revenue',
    title: 'Monthly Revenue',
    type: 'metric',
    icon: <AttachMoney />,
    color: '#22c55e',
    description: 'Track monthly revenue trends',
  },
  {
    id: 'shipments',
    title: 'Active Shipments',
    type: 'metric',
    icon: <LocalShipping />,
    color: '#8b5cf6',
    description: 'Monitor current shipment status',
  },
  {
    id: 'inventory',
    title: 'Inventory Value',
    type: 'metric',
    icon: <Inventory />,
    color: '#f59e0b',
    description: 'View inventory valuation',
  },
  {
    id: 'delivery-time',
    title: 'Delivery Performance',
    type: 'chart',
    icon: <Speed />,
    color: '#06b6d4',
    description: 'Analyze delivery times and efficiency',
  },
  {
    id: 'cost-analysis',
    title: 'Cost Analysis',
    type: 'chart',
    icon: <BarChart />,
    color: '#f59e0b',
    description: 'Breakdown of operational costs',
  },
  {
    id: 'route-optimization',
    title: 'Route Efficiency',
    type: 'chart',
    icon: <TrendingUp />,
    color: '#22c55e',
    description: 'Optimize delivery routes',
  },
]

export const DashboardScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const theme = useTheme()
  const [selectedInsights, setSelectedInsights] = useState<string[]>([])
  
  const isDark = theme.palette.mode === 'dark'

  const handleAddInsight = (insightId: string) => {
    if (!selectedInsights.includes(insightId)) {
      setSelectedInsights([...selectedInsights, insightId])
    }
  }

  const handleRemoveInsight = (insightId: string) => {
    setSelectedInsights(selectedInsights.filter(id => id !== insightId))
  }

  const handleSaveDashboard = () => {
    console.log('Dashboard saved with insights:', selectedInsights)
  }

  const handleResetDashboard = () => {
    setSelectedInsights([])
  }

  return (
    <Page
      title={t('BUILDER.TITLE')}
      subtitle={t('BUILDER.SUBTITLE')}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleResetDashboard}
            disabled={selectedInsights.length === 0}
            sx={{
              borderRadius: 2,
              borderColor: alpha(theme.palette.text.secondary, isDark ? 0.3 : 0.2),
              color: 'text.secondary',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 500,
              '&:hover': {
                borderColor: alpha(theme.palette.error.main, 0.3),
                backgroundColor: alpha(theme.palette.error.main, isDark ? 0.08 : 0.04),
                color: 'error.main',
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveDashboard}
            disabled={selectedInsights.length === 0}
            sx={{
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.9),
              },
            }}
          >
            Save Dashboard
          </Button>
        </>
      }
    >
      <Grid container spacing={4}>
        {/* Available Insights */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 1,
              p: 3,
              height: 'fit-content',
              border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.1)}`,
              '&:hover': {
                boxShadow: isDark 
                  ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Available Insights
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {availableInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  id={insight.id}
                  title={insight.title}
                  type={insight.type}
                  icon={insight.icon}
                  color={insight.color}
                  description={insight.description}
                  onClick={handleAddInsight}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Dashboard Preview */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 1,
              p: 3,
              minHeight: 400,
              border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.1)}`,
              '&:hover': {
                boxShadow: isDark 
                  ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'text.primary',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Dashboard Preview
            </Typography>

            <DashboardPreview
              selectedInsights={selectedInsights}
              availableInsights={availableInsights}
              onRemoveInsight={handleRemoveInsight}
            />
          </Paper>
        </Grid>
      </Grid>
    </Page>
  )
} 