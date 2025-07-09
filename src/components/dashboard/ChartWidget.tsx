import React from 'react'
import { Box } from '@mui/material'
import ReactECharts from 'echarts-for-react'
import { WidgetWrapper } from './WidgetWrapper'

interface ChartWidgetProps {
  title: string
  chartOption: any
  color: string
  icon: React.ReactNode
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  chartOption,
  color,
  icon
}) => {
  return (
    <WidgetWrapper title={title} icon={icon} color={color}>
      <Box sx={{ height: '100%', minHeight: 200, mt: 0.5 }}>
        <ReactECharts
          option={chartOption}
          style={{ height: '100%', width: '100%', minHeight: 200 }}
          opts={{ renderer: 'svg' }}
        />
      </Box>
    </WidgetWrapper>
  )
}
