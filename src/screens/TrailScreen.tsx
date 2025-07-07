import React from 'react'
import {
  Box,
  Typography,
  Container,
  useTheme,
  alpha,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  IconButton,
} from '@mui/material'
import {
  Timeline as TrailIcon,
  AccessTime,
  NavigateNext,
  Clear,
  Explore,
  Dashboard,
  Upload,
  LocationOn,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { useNavigate } from 'react-router-dom'

// Mock trail data
const mockTrailSteps = [
  {
    id: 'upload',
    title: 'Data Upload',
    type: 'upload',
    timestamp: new Date(Date.now() - 3600000),
    description: 'Uploaded logistics_data.csv (2.3MB)',
    path: '/upload',
  },
  {
    id: 'explorer',
    title: 'Analytics Explorer',
    type: 'explorer',
    timestamp: new Date(Date.now() - 3000000),
    description: 'Viewed main dashboard insights',
    path: '/explorer',
  },
  {
    id: 'explore-costs',
    title: 'Shipping Costs Analysis',
    type: 'explore',
    timestamp: new Date(Date.now() - 1800000),
    description: 'Deep dive into cost optimization',
    path: '/explore/costs',
  },
  {
    id: 'current',
    title: 'Exploration Trail',
    type: 'trail',
    timestamp: new Date(),
    description: 'Currently viewing trail history',
    path: '/trail',
    isCurrent: true,
  },
]

export const TrailScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const theme = useTheme()
  const navigate = useNavigate()

  const getStepIcon = (type: string, isCurrent?: boolean) => {
    if (isCurrent) return <LocationOn />
    switch (type) {
      case 'upload': return <Upload />
      case 'explorer': return <Dashboard />
      case 'explore': return <Explore />
      case 'trail': return <TrailIcon />
      default: return <NavigateNext />
    }
  }

  const getStepColor = (type: string, isCurrent?: boolean) => {
    if (isCurrent) return '#22c55e'
    return '#4857EA'
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  const handleStepClick = (step: any) => {
    if (!step.isCurrent && step.path) {
      navigate(step.path)
    }
  }

  const handleClearTrail = () => {
    // Mock clear functionality
    console.log('Trail cleared')
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                color: 'text.primary',
                mb: 0.5,
                letterSpacing: '-0.02em',
              }}
            >
              {t('TRAIL.TITLE')}
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
              {t('TRAIL.SUBTITLE')}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={handleClearTrail}
            sx={{
              borderRadius: 2,
              borderColor: alpha(theme.palette.text.secondary, 0.2),
              color: 'text.secondary',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 500,
              '&:hover': {
                borderColor: alpha(theme.palette.error.main, 0.3),
                backgroundColor: alpha(theme.palette.error.main, 0.04),
                color: 'error.main',
              },
            }}
          >
            {t('TRAIL.CLEAR_TRAIL')}
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 500,
          }}
        >
          {mockTrailSteps.length} steps in your exploration journey
        </Typography>
      </Box>

      {/* Trail Steps */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockTrailSteps.map((step, index) => (
          <Card
            key={step.id}
            elevation={0}
            sx={{
              borderRadius: 1,
              backgroundColor: step.isCurrent
                ? alpha('#22c55e', 0.04)
                : theme.palette.background.paper,
              cursor: step.isCurrent ? 'default' : 'pointer',
              transition: 'all 0.2s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': step.isCurrent ? {} : {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => handleStepClick(step)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: alpha(getStepColor(step.type, step.isCurrent), 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {React.cloneElement(getStepIcon(step.type, step.isCurrent), {
                    sx: {
                      fontSize: 24,
                      color: getStepColor(step.type, step.isCurrent)
                    }
                  })}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'text.primary',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                    </Typography>
                    {step.isCurrent && (
                      <Chip
                        label="Current"
                        size="small"
                        sx={{
                          backgroundColor: alpha('#22c55e', 0.1),
                          color: '#22c55e',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          height: 24,
                        }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime sx={{ fontSize: 16, color: 'text.disabled' }} />
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      {formatTimeAgo(step.timestamp)}
                    </Typography>
                  </Box>
                </Box>

                {/* Arrow for non-current items */}
                {!step.isCurrent && (
                  <IconButton
                    size="small"
                    sx={{
                      color: alpha('#4857EA', 0.6),
                      '&:hover': {
                        backgroundColor: alpha('#4857EA', 0.08),
                        color: '#4857EA',
                      },
                    }}
                  >
                    <NavigateNext />
                  </IconButton>
                )}
              </Box>
            </CardContent>

            {/* Timeline connector */}
            {index < mockTrailSteps.length - 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 33, // Center of icon
                  bottom: -12,
                  width: 2,
                  height: 12,
                  backgroundColor: alpha(theme.palette.divider, 0.5),
                  zIndex: 1,
                }}
              />
            )}
          </Card>
        ))}
      </Box>

      {/* Empty State */}
      {mockTrailSteps.length === 0 && (
        <Card
          elevation={0}
          sx={{
            borderRadius: 1,
            backgroundColor: theme.palette.background.paper,
            textAlign: 'center',
            py: 8,
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <TrailIcon
            sx={{
              fontSize: 64,
              color: 'text.disabled',
              mb: 3,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            No exploration steps yet
          </Typography>
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{
              mb: 4,
              maxWidth: 400,
              mx: 'auto',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Start exploring your data to build your trail
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/explorer')}
            sx={{
              borderRadius: 2,
              px: 4,
              backgroundColor: '#4857EA',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: alpha('#4857EA', 0.9),
              },
            }}
          >
            Go to Explorer
          </Button>
        </Card>
      )}
    </Container>
  )
}
