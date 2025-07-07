import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  LinearProgress,
  Container,
  Fade,
  useTheme,
  alpha,
} from '@mui/material'
import { Analytics } from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { addTrailStep } from '../store/appState'

export const LoadingScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    t('LOADING.STEPS.UPLOADING'),
    t('LOADING.STEPS.PARSING'),
    t('LOADING.STEPS.VALIDATING'),
    t('LOADING.STEPS.ANALYZING'),
    t('LOADING.STEPS.GENERATING'),
    t('LOADING.STEPS.FINALIZING'),
  ]

  useEffect(() => {
    let progressTimer: NodeJS.Timeout
    let stepTimer: NodeJS.Timeout

    const updateProgress = () => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          addTrailStep({
            title: t('DASHBOARD.TITLE'),
            type: 'explorer',
            description: t('LOADING.TITLE'),
          })
          setTimeout(() => navigate('/explorer'), 500)
          return 100
        }
        return prev + 1.67 // 100 / 60 steps = ~1.67 per step (6 seconds total)
      })
    }

    const updateStep = () => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }

    progressTimer = setInterval(updateProgress, 100) // Update every 100ms
    stepTimer = setInterval(updateStep, 1000) // Change step every second

    return () => {
      clearInterval(progressTimer)
      clearInterval(stepTimer)
    }
  }, [navigate, steps, t])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.subtle} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Fade in timeout={1000}>
            <Box>
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  mb: 4,
                }}
              >
                <Analytics 
                  sx={{ 
                    fontSize: 100, 
                    color: '#4857EA',
                    filter: 'drop-shadow(0 8px 16px rgba(72, 87, 234, 0.3))',
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                        filter: 'drop-shadow(0 8px 16px rgba(72, 87, 234, 0.3))',
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                        filter: 'drop-shadow(0 12px 24px rgba(72, 87, 234, 0.4))',
                      },
                      '100%': {
                        transform: 'scale(1)',
                        filter: 'drop-shadow(0 8px 16px rgba(72, 87, 234, 0.3))',
                      },
                    },
                  }} 
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: `2px solid rgba(72, 87, 234, 0.2)`,
                    animation: 'spin 3s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                      '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: '50%',
                      width: 4,
                      height: 4,
                      backgroundColor: '#4857EA',
                      borderRadius: '50%',
                      transform: 'translateX(-50%)',
                    },
                  }}
                />
              </Box>
              
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  background: `linear-gradient(45deg, #4857EA, ${alpha('#4857EA', 0.7)})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  letterSpacing: '-0.02em',
                }}
              >
                {t('LOADING.TITLE')}
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  mb: 6,
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {t('LOADING.SUBTITLE')}
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ mt: 6, mb: 4 }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  height: 12, 
                  borderRadius: 6,
                  backgroundColor: alpha(theme.palette.divider, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 6,
                    background: `linear-gradient(90deg, #4857EA, ${alpha('#4857EA', 0.8)})`,
                    transition: 'transform 0.2s ease-in-out',
                  }
                }} 
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: `${progress}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 20,
                  height: 20,
                  backgroundColor: '#4857EA',
                  borderRadius: '50%',
                  boxShadow: `0 0 20px rgba(72, 87, 234, 0.6)`,
                  transition: 'left 0.2s ease-in-out',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 8,
                    height: 8,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '50%',
                  },
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#4857EA',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 700,
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {Math.round(progress)}%
              </Typography>
              <Typography 
                variant="body2" 
                color="text.disabled"
                sx={{ 
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                {t('LOADING.ESTIMATED_TIME', { time: `${Math.max(0, 6 - Math.floor(progress / 16))}s` })}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Fade in key={currentStep} timeout={500}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h6" 
                  color="text.primary"
                  sx={{ 
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  {steps[currentStep]}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t('LOADING.PROGRESS', { percent: Math.round(progress) })}
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Box>
      </Container>
    </Box>
  )
} 