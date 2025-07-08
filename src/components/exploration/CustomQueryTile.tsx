import React, { useState, useCallback } from 'react'
import { Box, Typography, Card, TextField, alpha, Fade, IconButton, Button } from '@mui/material'
import { Create, Close } from '@mui/icons-material'

interface CustomQueryTileProps {
  onCustomQuery: (query: string) => void
  level: 'root' | number // 'root' for root level, number for layer index
  isActive?: boolean
  isSelected?: boolean // New prop for selection state
  onSelect?: () => void // New prop for selection handler
  onExpand?: (expanded: boolean) => void // New prop for expansion state
  fadeDelay?: number
}

export const CustomQueryTile: React.FC<CustomQueryTileProps> = ({
  onCustomQuery,
  level,
  isActive = false,
  isSelected = false,
  onSelect,
  onExpand,
  fadeDelay = 0
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false) // Controls tile width expansion
  const [customPrompt, setCustomPrompt] = useState<string>('')

  // Get contextual prompt placeholder
  const getPromptPlaceholder = useCallback((): string => {
    if (level === 'root') {
      return 'What aspect of your business would you like to explore? (e.g., "customer satisfaction trends", "seasonal revenue patterns")'
    } else {
      return `What specific insights would you like to explore at this level?`
    }
  }, [level])

  // Handle tile expansion/collapse (no selection)
  const handleTileToggle = useCallback(() => {
    if (!isExpanded) {
      // Expanding tile - no selection, just expand
      setIsExpanded(true)
      onExpand?.(true)
    } else {
      // Collapsing tile
      setIsExpanded(false)
      setCustomPrompt('')
      onExpand?.(false)
    }
  }, [isExpanded, onExpand])

  // Handle selection via button
  const handleSelect = useCallback(() => {
    // If there's a custom prompt, submit it first
    if (customPrompt.trim()) {
      onCustomQuery(customPrompt.trim())
      setCustomPrompt('')
    }
    // Then select the tile
    onSelect?.()
  }, [onSelect, customPrompt, onCustomQuery])

  // Handle custom query submission (now handled by select button)
  const handleCustomQuerySubmit = useCallback(() => {
    // This function is no longer needed but keeping for Ctrl+Enter
    if (customPrompt.trim()) {
      onCustomQuery(customPrompt.trim())
      onSelect?.() // Auto-select the tile when submitting
      setCustomPrompt('')
    }
  }, [customPrompt, onCustomQuery, onSelect])

  // Handle Enter key in textarea
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      handleCustomQuerySubmit()
    }
  }, [handleCustomQuerySubmit])

  return (
    <Fade in timeout={300 + fadeDelay}>
      <div data-tile-id={isSelected ? (level === 'root' ? 'custom-query-root' : `custom-query-layer-${level}`) : undefined}>
        <Card
          elevation={0}
          onClick={!isExpanded ? handleTileToggle : undefined}
          sx={(theme) => ({
            height: '100%',
            minHeight: 180,
            width: isExpanded ? '100%' : 80,
            p: 0,
            boxShadow: 'none',
            borderRadius: 1,
            background: isSelected
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.primary.main, 0.04)})`
              : theme.palette.background.paper,
            cursor: !isExpanded ? 'pointer' : 'default',
            outline: isSelected
              ? `2px solid ${alpha(theme.palette.primary.main, 0.4)}`
              : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            position: 'relative',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              outline: `2px solid ${alpha(theme.palette.primary.main, 0.6)}`,
              outlineOffset: '-2px',
              background: isSelected
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.06)})`
                : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)}, ${alpha(theme.palette.primary.main, 0.02)})`,
            },
          })}
        >
        {!isExpanded ? (
          // Narrow state - just show icon with same height as regular tiles
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              p: 2,
            }}
          >
            <Box
              sx={(theme) => ({
                p: 1.5,
                borderRadius: 1,
                background: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              })}
            >
              <Create />
            </Box>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{
                fontSize: '0.7rem',
                textAlign: 'center',
                lineHeight: 1.2,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              Custom
            </Typography>
          </Box>
        ) : (
          // Expanded state - show full accordion with proper height
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Close button */}
            <IconButton
              onClick={handleTileToggle}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
                color: 'text.disabled',
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.04),
                }
              }}
            >
              <Close fontSize="small" />
            </IconButton>

            {/* Header section */}
            <Box sx={{ p: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box
                  sx={(theme) => ({
                    p: 1.25,
                    borderRadius: 1,
                    background: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  })}
                >
                  <Create />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 500,
                      fontSize: '1rem',
                      mb: 0,
                    }}
                  >
                    Custom Query
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{
                      fontSize: '0.75rem',
                      lineHeight: 1.2,
                    }}
                  >
                    Explore using your own prompt
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Input section */}
            <Box sx={{ flex: 1, p: 2, pt: 0, display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getPromptPlaceholder()}
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              {/* Buttons */}
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Button
                  variant="outlined"
                  onClick={handleSelect}
                  disabled={isSelected}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    py: 0.75,
                  }}
                >
                  {isSelected ? 'Selected' : 'Select'}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Card>
      </div>
    </Fade>
  )
}
