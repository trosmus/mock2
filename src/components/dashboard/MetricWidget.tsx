import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material'
import { WidgetWrapper } from './WidgetWrapper'

interface MetricWidgetProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  color: string
  icon: React.ReactNode
}

export const MetricWidget: React.FC<MetricWidgetProps> = ({
  title,
  value,
  change,
  trend,
  color,
  icon
}) => {
  const theme = useTheme()

  return (
    <WidgetWrapper title={title} icon={icon} color={color}>
      <Box>
        <Typography variant="h3" sx={{ color, fontWeight: 700, mb: 1, fontSize: '2rem' }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 16, color: theme.palette.error.main }} />
          )}
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
            {change} from last period
          </Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  )
} 