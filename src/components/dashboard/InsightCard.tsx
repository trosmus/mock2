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

  const renderChart = (chart: any) => {
    const { type, values, labels, colors, datasets, xAxis, yAxis } = chart

    switch (type) {
      case 'line':
        return (
          <Box sx={{ width: '100%', height: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 100">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              {values && (
                <>
                  <path
                    d={`M 20 ${80 - ((values[0] - Math.min(...values)) / (Math.max(...values) - Math.min(...values))) * 60} ${values.map((value: number, index: number) => `L ${20 + (index * 160) / (values.length - 1)} ${80 - ((value - Math.min(...values)) / (Math.max(...values) - Math.min(...values))) * 60}`).join(' ')}`}
                    stroke="#22c55e"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d={`M 20 ${80 - ((values[0] - Math.min(...values)) / (Math.max(...values) - Math.min(...values))) * 60} ${values.map((value: number, index: number) => `L ${20 + (index * 160) / (values.length - 1)} ${80 - ((value - Math.min(...values)) / (Math.max(...values) - Math.min(...values))) * 60}`).join(' ')} L 180 80 L 20 80 Z`}
                    fill="url(#lineGradient)"
                  />
                  {values.map((value: number, index: number) => (
                    <circle
                      key={index}
                      cx={20 + (index * 160) / (values.length - 1)}
                      cy={80 - ((value - Math.min(...values)) / (Math.max(...values) - Math.min(...values))) * 60}
                      r="3"
                      fill="#22c55e"
                    />
                  ))}
                </>
              )}
            </svg>
          </Box>
        )

      case 'bar':
        return (
          <Box sx={{ width: '100%', height: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 100">
              {values && values.map((value: number, index: number) => (
                <rect
                  key={index}
                  x={20 + (index * 160) / values.length}
                  y={80 - ((value - Math.min(...values)) / (Math.max(...values) - Math.min(...values))) * 60}
                  width={Math.max(1, 160 / values.length - 4)}
                  height={((value - Math.min(...values)) / (Math.max(...values) - Math.min(...values))) * 60}
                  fill={colors?.[index] || '#22c55e'}
                  opacity={0.8}
                />
              ))}
            </svg>
          </Box>
        )

      case 'pie':
        return (
          <Box sx={{ width: '100%', height: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 100">
              {values && (() => {
                const total = values.reduce((sum: number, value: number) => sum + value, 0)
                let currentAngle = 0
                return values.map((value: number, index: number) => {
                  const angle = (value / total) * 2 * Math.PI
                  const startAngle = currentAngle
                  const endAngle = currentAngle + angle
                  currentAngle = endAngle
                  
                  const x1 = 100 + 35 * Math.cos(startAngle)
                  const y1 = 50 + 35 * Math.sin(startAngle)
                  const x2 = 100 + 35 * Math.cos(endAngle)
                  const y2 = 50 + 35 * Math.sin(endAngle)
                  
                  const largeArcFlag = angle > Math.PI ? 1 : 0
                  
                  return (
                    <path
                      key={index}
                      d={`M 100 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={colors?.[index] || '#22c55e'}
                    />
                  )
                })
              })()}
            </svg>
          </Box>
        )

      case 'scatter':
        return (
          <Box sx={{ width: '100%', height: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 100">
              {datasets && datasets.map((dataset: any, datasetIndex: number) => (
                <g key={datasetIndex}>
                  {dataset.data.map((point: any, index: number) => (
                    <circle
                      key={index}
                      cx={20 + (point.x / 100) * 160}
                      cy={80 - (point.y / 100) * 60}
                      r="4"
                      fill={dataset.color || '#22c55e'}
                      opacity={0.7}
                    />
                  ))}
                </g>
              ))}
            </svg>
          </Box>
        )

      default:
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="caption" color="text.secondary">
              Chart type not supported
            </Typography>
          </Box>
        )
    }
  }

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