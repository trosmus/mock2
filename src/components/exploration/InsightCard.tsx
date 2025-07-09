import React, { useState } from 'react'
import { Box, Typography, Card, useTheme, alpha, Chip, IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert as MoreVertIcon, Dashboard as DashboardIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import ReactECharts from 'echarts-for-react'

interface InsightCardProps {
  title: string
  type: 'chart' | 'metric' | 'ai-text'
  data: any
  onAddToDashboard?: (insight: InsightData) => void
  onAddToFavorites?: (insight: InsightData) => void
}

interface InsightData {
  title: string
  type: 'chart' | 'metric' | 'ai-text'
  data: any
}

export const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  type, 
  data,
  onAddToDashboard,
  onAddToFavorites
}) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleAddToDashboard = () => {
    if (onAddToDashboard) {
      onAddToDashboard({ title, type, data })
    }
    handleMenuClose()
  }

  const handleAddToFavorites = () => {
    if (onAddToFavorites) {
      onAddToFavorites({ title, type, data })
    }
    handleMenuClose()
  }
  
  const renderChart = () => {
    // Simple line chart
    if (data.type === 'line' && data.values) {
      const lineOption = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          textStyle: { color: isDark ? '#ffffff' : '#000000' },
          borderColor: isDark ? '#404040' : '#e0e0e0',
          borderWidth: 1
        },
        grid: { top: 10, right: 20, bottom: 20, left: 40 },
        xAxis: {
          type: 'category',
          data: data.labels,
          axisLabel: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 },
          splitLine: { lineStyle: { color: isDark ? '#404040' : '#e5e7eb' } }
        },
        series: [{
          type: 'line',
          data: data.values,
          lineStyle: { color: '#22c55e', width: 2 },
          itemStyle: { color: '#22c55e' },
          areaStyle: { color: alpha('#22c55e', 0.1) },
          smooth: true
        }]
      }
      return <ReactECharts option={lineOption} style={{ width: '100%', height: '180px' }} />
    }

    // Simple bar chart
    if (data.type === 'bar' && data.values) {
      const barOption = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          textStyle: { color: isDark ? '#ffffff' : '#000000' },
          borderColor: isDark ? '#404040' : '#e0e0e0',
          borderWidth: 1
        },
        grid: { top: 10, right: 20, bottom: 20, left: 40 },
        xAxis: {
          type: 'category',
          data: data.labels,
          axisLabel: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 },
          splitLine: { lineStyle: { color: isDark ? '#404040' : '#e5e7eb' } }
        },
        series: [{
          type: 'bar',
          data: data.values,
          itemStyle: { 
            color: (params: any) => data.colors?.[params.dataIndex] || '#22c55e' 
          }
        }]
      }
      return <ReactECharts option={barOption} style={{ width: '100%', height: '180px' }} />
    }

    // Simple pie chart
    if (data.type === 'pie' && data.values) {
      const pieOption = {
        tooltip: {
          trigger: 'item',
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          textStyle: { color: isDark ? '#ffffff' : '#000000' },
          borderColor: isDark ? '#404040' : '#e0e0e0',
          borderWidth: 1
        },
        legend: {
          bottom: 0,
          textStyle: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 }
        },
        series: [{
          type: 'pie',
          radius: '60%',
          center: ['50%', '45%'],
          data: data.values.map((value: number, index: number) => ({
            value,
            name: data.labels[index],
            itemStyle: { color: data.colors?.[index] || '#22c55e' }
          })),
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
          }
        }]
      }
      return <ReactECharts option={pieOption} style={{ width: '100%', height: '180px' }} />
    }

    // Simple scatter plot
    if (data.type === 'scatter' && data.datasets) {
      const scatterOption = {
        tooltip: {
          trigger: 'item',
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          textStyle: { color: isDark ? '#ffffff' : '#000000' },
          borderColor: isDark ? '#404040' : '#e0e0e0',
          borderWidth: 1
        },
        legend: {
          data: data.datasets.map((d: any) => d.name),
          bottom: 0,
          textStyle: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 }
        },
        grid: { top: 10, right: 20, bottom: 40, left: 40 },
        xAxis: {
          type: 'value',
          name: data.xAxis,
          axisLabel: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 },
          splitLine: { lineStyle: { color: isDark ? '#404040' : '#e5e7eb' } }
        },
        yAxis: {
          type: 'value',
          name: data.yAxis,
          axisLabel: { color: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 },
          splitLine: { lineStyle: { color: isDark ? '#404040' : '#e5e7eb' } }
        },
        series: data.datasets.map((dataset: any) => ({
          name: dataset.name,
          type: 'scatter',
          data: dataset.data.map((point: any) => [point.x, point.y]),
          itemStyle: { color: dataset.color || '#22c55e' }
        }))
      }
      return <ReactECharts option={scatterOption} style={{ width: '100%', height: '180px' }} />
    }

    // Default chart for unsupported types
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '180px',
        bgcolor: alpha(theme.palette.grey[500], 0.1),
        borderRadius: 1
      }}>
        <Typography variant="body2" color="text.secondary">
          Chart type not supported
        </Typography>
      </Box>
    )
  }
  
  const renderMetric = () => {
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'text.primary'
            }}
          >
            {data.primary}
          </Typography>
          {data.trend && (
            <Chip
              label={data.trend}
              size="small"
              color={data.trendDirection === 'up' ? 'success' : 'error'}
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          )}
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {data.label}
        </Typography>
        
        {data.benchmark && (
          <Box sx={{ mb: 2 }}>
            <Chip
              label={data.benchmark}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {data.breakdown.map((item: any, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  flex: 1,
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                {item.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {item.value}
                </Typography>
                {item.change && (
                  <Typography 
                    variant="caption" 
                    color={item.change.startsWith('+') ? 'success.main' : 'error.main'}
                    sx={{ fontSize: '0.7rem' }}
                  >
                    {item.change}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }
  
  const renderAIText = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
        {data.confidence && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Chip
              label={`${Math.round(data.confidence * 100)}% confidence`}
              size="small"
              color="info"
              sx={{ fontSize: '0.7rem' }}
            />
            {data.lastUpdated && (
              <Typography variant="caption" color="text.secondary">
                Updated {data.lastUpdated}
              </Typography>
            )}
          </Box>
        )}
        
        {data.insights.map((insight: string, index: number) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box 
              sx={{ 
                width: 6, 
                height: 6, 
                borderRadius: '50%', 
                backgroundColor: 'primary.main',
                mt: 1,
                flexShrink: 0
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ 
                lineHeight: 1.6,
                color: 'text.primary',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '0.85rem'
              }}
            >
              {insight}
            </Typography>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        background: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.15 : 0.1)}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: type === 'ai-text' ? 2 : 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.primary',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {title}
        </Typography>
        <IconButton onClick={handleMenuOpen} sx={{ color: 'text.secondary' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAddToDashboard}>
          <DashboardIcon sx={{ mr: 1 }} /> Add to Dashboard
        </MenuItem>
        <MenuItem onClick={handleAddToFavorites}>
          <FavoriteIcon sx={{ mr: 1 }} /> Add to Favorites
        </MenuItem>
      </Menu>

      {type === 'chart' ? renderChart() : type === 'metric' ? renderMetric() : renderAIText()}
    </Card>
  )
} 