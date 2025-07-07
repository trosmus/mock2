import React from 'react'
import { Box, Typography, Card, useTheme, alpha } from '@mui/material'
import ReactECharts from 'echarts-for-react'

interface InsightCardProps {
  title: string
  type: 'chart' | 'metric' | 'ai-text'
  data: any
}

export const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  type, 
  data 
}) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  
  const renderChart = () => {
    if (data.type === 'donut') {
      const pieOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          textStyle: {
            color: isDark ? '#ffffff' : '#000000'
          },
          borderColor: isDark ? '#404040' : '#e0e0e0',
          borderWidth: 1
        },
        legend: {
          show: false
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: data.values.map((value: number, index: number) => ({
              value,
              name: data.labels[index],
              itemStyle: { color: data.colors[index] }
            }))
          }
        ]
      }
      
      return (
        <>
          <Box sx={{ width: 120, height: 120, mb: 2 }}>
            <ReactECharts option={pieOption} style={{ width: '100%', height: '100%' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.labels.map((label: string, index: number) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: data.colors[index] }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    flex: 1,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {label}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {data.values[index]}%
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )
    }
    
    if (data.type === 'bar') {
      const barOption = {
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => `${params[0].name}: ${params[0].value}K`,
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          textStyle: {
            color: isDark ? '#ffffff' : '#000000'
          },
          borderColor: isDark ? '#404040' : '#e0e0e0',
          borderWidth: 1
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.labels,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { 
            color: isDark ? '#9ca3af' : '#6b7280', 
            fontSize: 12,
            fontFamily: 'Inter'
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          type: 'bar',
          data: data.values.map((value: number, index: number) => ({
            value,
            itemStyle: {
              color: index === data.values.length - 1 ? '#22c55e' : (isDark ? '#404040' : '#e5e7eb'),
              borderRadius: [4, 4, 0, 0]
            }
          })),
          barWidth: '60%'
        }]
      }
      
      return (
        <Box sx={{ height: 160 }}>
          <ReactECharts option={barOption} style={{ width: '100%', height: '100%' }} />
        </Box>
      )
    }
    
    return <Box sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="body2" color="text.disabled">Chart visualization</Typography>
    </Box>
  }
  
  const renderMetric = () => {
    return (
      <Box>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            color: 'text.primary'
          }}
        >
          {data.primary}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 3,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {data.label}
        </Typography>
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
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }
  
  const renderAIText = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
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
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          mb: type === 'ai-text' ? 2 : 3,
          color: 'text.primary',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {title}
      </Typography>
      {type === 'chart' ? renderChart() : type === 'metric' ? renderMetric() : renderAIText()}
    </Card>
  )
} 