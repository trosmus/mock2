import React from 'react'
import { Box, Typography, alpha, useTheme } from '@mui/material'

interface PageHeaderProps {
  title: string
  subtitle: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  marginBottom?: number
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  actions,
  marginBottom = 6
}) => {
  const theme = useTheme()

  return (
    <Box sx={{ mb: marginBottom }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: icon ? 2 : 0, flex: 1 }}>
          {icon && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {React.cloneElement(icon as React.ReactElement, {
                sx: { 
                  fontSize: 32, 
                  color: theme.palette.primary.main,
                  ...((icon as React.ReactElement).props?.sx || {})
                }
              })}
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
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
        </Box>
        
        {actions && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  )
} 