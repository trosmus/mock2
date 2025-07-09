import React from 'react'
import { Card, CardContent, Box, Typography, Chip, useTheme, alpha } from '@mui/material'

interface InsightCardProps {
  id: string
  title: string
  type: string
  icon: React.ReactNode
  color: string
  description: string
  onClick: (id: string) => void
}

export const InsightCard: React.FC<InsightCardProps> = ({
  id,
  title,
  type,
  icon,
  color,
  description,
  onClick,
}) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Card
      sx={{
        border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.1)}`,
        borderRadius: 1,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: alpha(color, isDark ? 0.4 : 0.3),
          backgroundColor: alpha(color, isDark ? 0.05 : 0.02),
          transform: 'translateY(-1px)',
          boxShadow: isDark 
            ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      }}
      onClick={() => onClick(id)}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              backgroundColor: alpha(color, isDark ? 0.15 : 0.1),
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 0.5,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              {description}
            </Typography>
          </Box>
          <Chip
            label={type}
            size="small"
            sx={{
              backgroundColor: alpha(color, isDark ? 0.15 : 0.1),
              color: color,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  )
} 