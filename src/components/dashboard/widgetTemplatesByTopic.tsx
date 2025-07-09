import React from 'react'
import {
  AttachMoney,
  LocalShipping,
  Inventory,
  Speed,
  BarChart,
  TrendingUp,
  Assessment as AssessmentIcon,
  Analytics as AnalyticsIcon,
  LocationOn,
  Category,
  Warning,
  CheckCircle,
  Route,
  Refresh,
  ReportProblem,
  Favorite,
} from '@mui/icons-material'
import { getFavoriteInsightWidgets } from '../../services/favoriteInsights'

export interface WidgetTemplate {
  id: string
  title: string
  type: 'metric' | 'chart' | 'insight'
  icon: React.ReactNode
  color: string
  description: string
  template: {
    type: 'metric' | 'chart' | 'insight'
    data: any
  }
}

export interface ExplorationTopic {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  widgets: WidgetTemplate[]
}

// Static widget templates
const staticWidgetsByTopic: Record<string, ExplorationTopic> = {
  revenue: {
    title: 'Monthly Revenue',
    description: 'Widgets discovered through revenue analysis',
    icon: <AttachMoney />,
    color: '#22c55e',
    widgets: [
      {
        id: 'revenue-total',
        title: 'Total Revenue',
        type: 'metric',
        icon: <AttachMoney />,
        color: '#22c55e',
        description: 'Track total revenue across all channels',
        template: {
          type: 'metric',
          data: { value: '$847,265', change: '+4.85%', trend: 'up' },
        },
      },
      {
        id: 'revenue-growth',
        title: 'Revenue Growth',
        type: 'metric',
        icon: <TrendingUp />,
        color: '#22c55e',
        description: 'Monitor revenue growth rate',
        template: {
          type: 'metric',
          data: { value: '+15.2%', change: 'Growth Rate', trend: 'up' },
        },
      },
      {
        id: 'revenue-trends',
        title: 'Revenue Trends',
        type: 'chart',
        icon: <TrendingUp />,
        color: '#22c55e',
        description: 'Analyze revenue patterns over time',
        template: {
          type: 'chart',
          data: {
            chartType: 'line',
            title: 'Revenue Trends',
            option: {
              title: { text: '', textStyle: { fontSize: 12 } },
              tooltip: { trigger: 'axis' },
              xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisLabel: { fontSize: 9 }
              },
              yAxis: {
                type: 'value',
                axisLabel: { fontSize: 9, formatter: '${value}K' }
              },
              series: [{
                data: [620, 732, 701, 734, 890, 847],
                type: 'line',
                smooth: true,
                lineStyle: { color: '#22c55e', width: 2 },
                itemStyle: { color: '#22c55e' },
                areaStyle: { color: '#22c55e1A' }
              }],
              grid: { top: 10, right: 10, bottom: 20, left: 40 }
            }
          },
        },
      },
      {
        id: 'revenue-forecast',
        title: 'Revenue Forecast',
        type: 'insight',
        icon: <AssessmentIcon />,
        color: '#22c55e',
        description: 'Revenue predictions and trends',
        template: {
          type: 'insight',
          data: {
            insight: 'Revenue projected to reach $1.2M next month based on current growth trends',
            confidence: 'high',
            impact: 'positive'
          },
        },
      },
    ]
  },
  shipments: {
    title: 'Active Shipments',
    description: 'Widgets discovered through shipment analysis',
    icon: <LocalShipping />,
    color: '#8b5cf6',
    widgets: [
      {
        id: 'shipments-active',
        title: 'Active Shipments',
        type: 'metric',
        icon: <LocalShipping />,
        color: '#8b5cf6',
        description: 'Track current active shipments',
        template: {
          type: 'metric',
          data: { value: '2,847', change: '+2.02%', trend: 'up' },
        },
      },
      {
        id: 'shipments-performance',
        title: 'Delivery Performance',
        type: 'metric',
        icon: <CheckCircle />,
        color: '#8b5cf6',
        description: 'Monitor delivery success rate',
        template: {
          type: 'metric',
          data: { value: '94.2%', change: 'On-time delivery', trend: 'up' },
        },
      },
    ]
  },
  inventory: {
    title: 'Inventory Value',
    description: 'Widgets discovered through inventory analysis',
    icon: <Inventory />,
    color: '#f59e0b',
    widgets: [
      {
        id: 'inventory-value',
        title: 'Inventory Value',
        type: 'metric',
        icon: <Inventory />,
        color: '#f59e0b',
        description: 'Track total inventory value',
        template: {
          type: 'metric',
          data: { value: '$1.29M', change: '+3.74%', trend: 'up' },
        },
      },
    ]
  },
  delivery: {
    title: 'Avg Delivery Time',
    description: 'Widgets discovered through delivery analysis',
    icon: <Speed />,
    color: '#06b6d4',
    widgets: [
      {
        id: 'delivery-time',
        title: 'Avg Delivery Time',
        type: 'metric',
        icon: <Speed />,
        color: '#06b6d4',
        description: 'Track average delivery time',
        template: {
          type: 'metric',
          data: { value: '2.4 days', change: '-1.24%', trend: 'down' },
        },
      },
    ]
  },
}

// Dynamic function to get widget templates including favorites
export const getWidgetsByExplorationTopic = (): Record<string, ExplorationTopic> => {
  const favoriteWidgets = getFavoriteInsightWidgets()
  
  const result = { ...staticWidgetsByTopic }
  
  // Add favorites section if there are any favorite insights
  if (favoriteWidgets.length > 0) {
    result.favorites = {
      title: 'Favorite Insights',
      description: 'Insights saved from exploration',
      icon: <Favorite />,
      color: '#ec4899',
      widgets: favoriteWidgets
    }
  }
  
  return result
}

// Export for backward compatibility
export const widgetsByExplorationTopic = getWidgetsByExplorationTopic() 