import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material'
import { Close, BuildCircle as BuildIcon } from '@mui/icons-material'

interface SelectedInsight {
  id: string
  title: string
  type: string
  icon: React.ReactNode
  color: string
  description: string
}

interface DashboardPreviewProps {
  selectedInsights: string[]
  availableInsights: SelectedInsight[]
  onRemoveInsight: (id: string) => void
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  selectedInsights,
  availableInsights,
  onRemoveInsight,
}) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const getInsightById = (id: string) => availableInsights.find(insight => insight.id === id)

  if (selectedInsights.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          color: 'text.secondary',
        }}
      >
        <BuildIcon sx={{ fontSize: 64, mb: 2, opacity: isDark ? 0.4 : 0.3 }} />
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 500,
            mb: 1,
          }}
        >
          Start Building Your Dashboard
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            textAlign: 'center',
            maxWidth: 300,
          }}
        >
          Drag insights from the left panel to create your custom dashboard. Mix and match different metrics to get the perfect overview.
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {selectedInsights.map((insightId) => {
        const insight = getInsightById(insightId)
        if (!insight) return null

        return (
          <Grid item xs={12} sm={6} key={insightId}>
            <Card
              sx={{
                position: 'relative',
                border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.1)}`,
                borderRadius: 1,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: alpha(insight.color, isDark ? 0.4 : 0.3),
                  '& .delete-button': {
                    opacity: 1,
                  },
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: alpha(insight.color, isDark ? 0.15 : 0.1),
                        color: insight.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {insight.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      {insight.title}
                    </Typography>
                  </Box>

                  <IconButton
                    className="delete-button"
                    size="small"
                    onClick={() => onRemoveInsight(insightId)}
                    sx={{
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                        backgroundColor: alpha(theme.palette.error.main, isDark ? 0.08 : 0.04),
                      },
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>

                {/* Mock content based on type */}
                <Box
                  sx={{
                    height: 120,
                    backgroundColor: alpha(insight.color, isDark ? 0.05 : 0.02),
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px dashed ${alpha(insight.color, isDark ? 0.2 : 0.1)}`,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    {insight.type === 'chart' ? '📊 Chart Visualization' : '📈 Metric Display'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
} 