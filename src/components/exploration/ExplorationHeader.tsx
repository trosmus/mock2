import React from 'react'
import { Box, Typography } from '@mui/material'

interface ExplorationHeaderProps {
  title: string
  subtitle: string
}

export const ExplorationHeader: React.FC<ExplorationHeaderProps> = ({
  title,
  subtitle
}) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 700,
          color: 'text.primary',
          mb: 1,
          letterSpacing: '-0.02em',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          fontSize: '1.1rem',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  )
} 