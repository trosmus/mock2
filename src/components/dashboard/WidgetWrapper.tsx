import React from 'react'
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material'

interface WidgetWrapperProps {
  title: string
  icon: React.ReactNode
  color: string
  children: React.ReactNode
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  title,
  icon,
  color,
  children
}) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ flex: 1, px: 1.5, py: 1, pb: 1 }}>
        {/* Widget Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ mr: 1, color, display: 'flex', alignItems: 'center' }}>
            {icon}
          </Box>
          <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        {/* Widget Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  )
}
