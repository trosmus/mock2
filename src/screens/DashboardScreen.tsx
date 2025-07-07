import React, { useState } from 'react'
import {
  Box,
  Typography,
  Container,
  useTheme,
  alpha,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Paper,
} from '@mui/material'
import {
  BuildCircle as BuildIcon,
  Add,
  DragIndicator,
  Close,
  BarChart,
  TrendingUp,
  Assessment,
  Speed,
  AttachMoney,
  LocalShipping,
  Inventory,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'

// Available insight components
const availableInsights = [
  {
    id: 'revenue',
    title: 'Monthly Revenue',
    type: 'metric',
    icon: <AttachMoney />,
    color: '#22c55e',
    description: 'Track monthly revenue trends',
  },
  {
    id: 'shipments',
    title: 'Active Shipments',
    type: 'metric',
    icon: <LocalShipping />,
    color: '#8b5cf6',
    description: 'Monitor current shipment status',
  },
  {
    id: 'inventory',
    title: 'Inventory Value',
    type: 'metric',
    icon: <Inventory />,
    color: '#f59e0b',
    description: 'View inventory valuation',
  },
  {
    id: 'delivery-time',
    title: 'Delivery Performance',
    type: 'chart',
    icon: <Speed />,
    color: '#06b6d4',
    description: 'Analyze delivery times and efficiency',
  },
  {
    id: 'cost-analysis',
    title: 'Cost Analysis',
    type: 'chart',
    icon: <BarChart />,
    color: '#f59e0b',
    description: 'Breakdown of operational costs',
  },
  {
    id: 'route-optimization',
    title: 'Route Efficiency',
    type: 'chart',
    icon: <TrendingUp />,
    color: '#22c55e',
    description: 'Optimize delivery routes',
  },
]

export const DashboardScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const theme = useTheme()
  const [selectedInsights, setSelectedInsights] = useState<string[]>([])
  
  const isDark = theme.palette.mode === 'dark'

  const handleAddInsight = (insightId: string) => {
    if (!selectedInsights.includes(insightId)) {
      setSelectedInsights([...selectedInsights, insightId])
    }
  }

  const handleRemoveInsight = (insightId: string) => {
    setSelectedInsights(selectedInsights.filter(id => id !== insightId))
  }

  const handleSaveDashboard = () => {
    console.log('Dashboard saved with insights:', selectedInsights)
  }

  const handleResetDashboard = () => {
    setSelectedInsights([])
  }

  const getInsightById = (id: string) => availableInsights.find(insight => insight.id === id)

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
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
              {t('BUILDER.TITLE')}
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
              {t('BUILDER.SUBTITLE')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleResetDashboard}
              disabled={selectedInsights.length === 0}
              sx={{
                borderRadius: 2,
                borderColor: alpha(theme.palette.text.secondary, isDark ? 0.3 : 0.2),
                color: 'text.secondary',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 500,
                '&:hover': {
                  borderColor: alpha(theme.palette.error.main, 0.3),
                  backgroundColor: alpha(theme.palette.error.main, isDark ? 0.08 : 0.04),
                  color: 'error.main',
                },
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveDashboard}
              disabled={selectedInsights.length === 0}
              sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.9),
                },
              }}
            >
              Save Dashboard
            </Button>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Available Insights */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 1,
              p: 3,
              height: 'fit-content',
              border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.1)}`,
              '&:hover': {
                boxShadow: isDark 
                  ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Available Insights
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {availableInsights.map((insight) => (
                <Card
                  key={insight.id}
                  elevation={0}
                  sx={{
                    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.1)}`,
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: alpha(insight.color, isDark ? 0.4 : 0.3),
                      backgroundColor: alpha(insight.color, isDark ? 0.05 : 0.02),
                      transform: 'translateY(-1px)',
                      boxShadow: isDark 
                        ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={() => handleAddInsight(insight.id)}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
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
                          {insight.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {insight.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={insight.type}
                        size="small"
                        sx={{
                          backgroundColor: alpha(insight.color, isDark ? 0.15 : 0.1),
                          color: insight.color,
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Dashboard Preview */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 1,
              p: 3,
              minHeight: 400,
              border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.1)}`,
              '&:hover': {
                boxShadow: isDark 
                  ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'text.primary',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Dashboard Preview
            </Typography>

            {selectedInsights.length === 0 ? (
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
            ) : (
              <Grid container spacing={3}>
                {selectedInsights.map((insightId, index) => {
                  const insight = getInsightById(insightId)
                  if (!insight) return null

                  return (
                    <Grid item xs={12} sm={6} key={insightId}>
                      <Card
                        elevation={0}
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
                              onClick={() => handleRemoveInsight(insightId)}
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
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
} 