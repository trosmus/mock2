import React from 'react'
import { Box, Typography, useTheme, Chip, alpha } from '@mui/material'
import { WidgetWrapper } from './WidgetWrapper'

interface InsightWidgetProps {
  title: string
  insight: string
  confidence: string
  impact: 'positive' | 'negative'
  color: string
  icon: React.ReactNode
}

export const InsightWidget: React.FC<InsightWidgetProps> = ({
  title,
  insight,
  confidence,
  impact,
  color,
  icon
}) => {
  const theme = useTheme()

  return (
    <WidgetWrapper title={title} icon={icon} color={color}>
      <Box sx={{
        p: 1.25,
        backgroundColor: alpha(color || theme.palette.info.main, 0.1),
        borderRadius: 1,
        mt: 0.5,
      }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1, fontSize: '0.85rem' }}>
          {insight}
        </Typography>
        <Chip
          label={confidence}
          size="small"
          sx={{ fontSize: '0.7rem', height: 20 }}
          color={impact === 'positive' ? 'success' : 'warning'}
        />
      </Box>
    </WidgetWrapper>
  )
}
