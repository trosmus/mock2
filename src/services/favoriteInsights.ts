import React from 'react'
import { WidgetTemplate } from '../components/dashboard/widgetTemplatesByTopic'
import { Assessment, Analytics, BarChart, TrendingUp } from '@mui/icons-material'

export interface FavoriteInsight {
  id: string
  title: string
  type: 'chart' | 'metric' | 'ai-text'
  data: any
  createdAt: string
  source: 'exploration' | 'dashboard'
}

const STORAGE_KEY = 'favorite-insights'

// Convert insight data to dashboard widget format
export const convertInsightToWidget = (insight: FavoriteInsight): WidgetTemplate => {
  let widgetData: any
  let icon: React.ReactNode
  let color: string
  
  switch (insight.type) {
    case 'metric':
      widgetData = {
        type: 'metric',
        data: {
          value: insight.data.primary,
          change: insight.data.trend || '+0%',
          trend: insight.data.trendDirection || 'up'
        }
      }
      icon = React.createElement(TrendingUp)
      color = '#22c55e'
      break
      
    case 'chart':
      widgetData = {
        type: 'chart',
        data: {
          chartType: insight.data.type === 'pie' ? 'pie' : insight.data.type,
          title: insight.title,
          option: convertChartToEChartsOption(insight.data)
        }
      }
      icon = React.createElement(BarChart)
      color = '#06b6d4'
      break
      
    case 'ai-text':
      widgetData = {
        type: 'insight',
        data: {
          insight: insight.data.insights[0] || 'AI-generated insight',
          confidence: insight.data.confidence ? 'high' : 'medium',
          impact: 'positive'
        }
      }
      icon = React.createElement(Assessment)
      color = '#8b5cf6'
      break
      
    default:
      widgetData = {
        type: 'metric',
        data: { value: 'N/A', change: '+0%', trend: 'up' }
      }
      icon = React.createElement(Analytics)
      color = '#f59e0b'
  }
  
  return {
    id: insight.id,
    title: insight.title,
    type: insight.type === 'ai-text' ? 'insight' : insight.type,
    icon,
    color,
    description: `Insight from exploration: ${insight.title}`,
    template: widgetData
  }
}

// Convert chart data to ECharts option format
const convertChartToEChartsOption = (chartData: any): any => {
  if (chartData.type === 'pie') {
    return {
      title: { text: '', textStyle: { fontSize: 12 } },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '60%',
        data: chartData.values.map((value: number, index: number) => ({
          value,
          name: chartData.labels[index],
          itemStyle: { color: chartData.colors?.[index] || '#22c55e' }
        }))
      }]
    }
  }
  
  if (chartData.type === 'bar') {
    return {
      title: { text: '', textStyle: { fontSize: 12 } },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: chartData.labels,
        axisLabel: { fontSize: 9 }
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 9 }
      },
      series: [{
        data: chartData.values,
        type: 'bar',
        itemStyle: { color: (params: any) => chartData.colors?.[params.dataIndex] || '#22c55e' }
      }],
      grid: { top: 10, right: 10, bottom: 20, left: 40 }
    }
  }
  
  if (chartData.type === 'line') {
    return {
      title: { text: '', textStyle: { fontSize: 12 } },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: chartData.labels || [],
        axisLabel: { fontSize: 9 }
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 9 }
      },
      series: [{
        data: chartData.values || [],
        type: 'line',
        smooth: true,
        lineStyle: { color: '#22c55e', width: 2 },
        itemStyle: { color: '#22c55e' },
        areaStyle: { color: '#22c55e1A' }
      }],
      grid: { top: 10, right: 10, bottom: 20, left: 40 }
    }
  }
  
  if (chartData.type === 'scatter') {
    return {
      title: { text: '', textStyle: { fontSize: 12 } },
      tooltip: { trigger: 'item' },
      xAxis: {
        type: 'value',
        name: chartData.xAxis || 'X',
        axisLabel: { fontSize: 9 }
      },
      yAxis: {
        type: 'value',
        name: chartData.yAxis || 'Y',
        axisLabel: { fontSize: 9 }
      },
      series: chartData.datasets?.map((dataset: any) => ({
        name: dataset.name,
        type: 'scatter',
        data: dataset.data.map((point: any) => [point.x, point.y]),
        itemStyle: { color: dataset.color || '#22c55e' }
      })) || [],
      grid: { top: 10, right: 10, bottom: 20, left: 40 }
    }
  }
  
  // Default fallback
  return {
    title: { text: 'Unsupported Chart', textStyle: { fontSize: 12 } },
    tooltip: { trigger: 'item' },
    series: [{ type: 'pie', data: [] }]
  }
}

// Storage functions
export const saveFavoriteInsight = (insight: Omit<FavoriteInsight, 'id' | 'createdAt'>): FavoriteInsight => {
  const newInsight: FavoriteInsight = {
    ...insight,
    id: `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString()
  }
  
  const favorites = getFavoriteInsights()
  favorites.push(newInsight)
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  return newInsight
}

export const getFavoriteInsights = (): FavoriteInsight[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading favorite insights:', error)
    return []
  }
}

export const removeFavoriteInsight = (id: string): void => {
  const favorites = getFavoriteInsights()
  const filtered = favorites.filter(insight => insight.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export const getFavoriteInsightWidgets = (): WidgetTemplate[] => {
  const favorites = getFavoriteInsights()
  return favorites.map(convertInsightToWidget)
}

// Dashboard integration
export const addInsightToDashboard = (insight: FavoriteInsight): void => {
  // TODO: Implement dashboard integration
  // This would involve:
  // 1. Getting the current dashboard
  // 2. Converting insight to widget format
  // 3. Adding to dashboard layout
  // 4. Persisting dashboard state
  console.log('Adding insight to dashboard:', insight)
} 