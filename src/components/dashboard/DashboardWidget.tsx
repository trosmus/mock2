import React from 'react'
import { MetricWidget } from './MetricWidget'
import { ChartWidget } from './ChartWidget'
import { TableWidget } from './TableWidget'
import { InsightWidget } from './InsightWidget'

interface DashboardWidgetData {
  id: string
  title: string
  type: 'metric' | 'chart' | 'table' | 'insight'
  data: any
  description?: string
  color?: string
  icon?: React.ReactNode
}

interface DashboardWidgetProps {
  widget: DashboardWidgetData
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({ widget }) => {
  const { type, title, data, color, icon } = widget

  switch (type) {
    case 'metric':
      return (
        <MetricWidget
          title={title}
          value={data.value}
          change={data.change}
          trend={data.trend}
          color={color || '#000'}
          icon={icon}
        />
      )
    
    case 'chart':
      return (
        <ChartWidget
          title={title}
          chartOption={data.option}
          color={color || '#000'}
          icon={icon}
        />
      )
    
    case 'table':
      return (
        <TableWidget
          title={title}
          headers={data.headers}
          rows={data.rows}
          color={color || '#000'}
          icon={icon}
        />
      )
    
    case 'insight':
      return (
        <InsightWidget
          title={title}
          insight={data.insight}
          confidence={data.confidence}
          impact={data.impact}
          color={color || '#000'}
          icon={icon}
        />
      )
    
    default:
      return null
  }
}

export type { DashboardWidgetData } 