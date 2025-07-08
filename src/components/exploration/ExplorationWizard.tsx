import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Box, Typography, Grid, Button, IconButton, Fade, Breadcrumbs, Link, alpha, TextField, Chip, Card, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ArrowBack, ArrowForward, Home, Explore, Create, ExpandMore } from '@mui/icons-material'
import { ExplorationTile } from '../../store/appState'
import { ExplorationTileCard } from './ExplorationTileCard'
import { useExplorationLayers } from './useExplorationLayers'

interface ExplorationWizardProps {
  currentPath: string[]
  rootTiles: ExplorationTile[]
  subLevelTiles: ExplorationTile[]
  subLevelTitle?: string
  currentRootTileId?: string | null
  currentSubTileId?: string | null
  showSubTiles: boolean
  onTileClick: (tileId: string, level: 'root' | 'sub') => void
  explorationLayers: ReturnType<typeof useExplorationLayers>
}

export const ExplorationWizard: React.FC<ExplorationWizardProps> = ({
  currentPath,
  rootTiles,
  subLevelTiles,
  subLevelTitle,
  currentRootTileId,
  currentSubTileId,
  showSubTiles,
  onTileClick,
  explorationLayers
}) => {
  // Extract state from explorationLayers
  const {
    currentRootSelection,
    activeTilePerLayer,
    visibleLayers,
    generateTilesForLayer,
    handleTileSelection,
    handleRootTileSelection,
    showLayer,
    hideLayer,
    resetLayers,
    handleRootCustomQuerySelection,
    handleLayerCustomQuerySelection,
    getCustomQuerySelection,
    isCustomQuerySelected
  } = explorationLayers

  // Remove independent state - derive from shared exploration state
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null) // Track selected tile without navigation
  const previousStepRef = useRef<number>(-1)
  
  // Custom prompt state - only for UI display, actual selection goes to shared state
  const [showCustomPrompt, setShowCustomPrompt] = useState<boolean>(false)
  const [customPrompt, setCustomPrompt] = useState<string>('')
  
  // Derive current step from shared exploration state
  const getCurrentStep = useCallback((): number => {
    // Step 0 = root level (no root selection or selecting root)
    if (!currentRootSelection) return 0
    
    // Step 1+ = layers (based on deepest active layer)
    for (let i = activeTilePerLayer.length - 1; i >= 0; i--) {
      if (activeTilePerLayer[i]) {
        return i + 2 // Step 1 is layer 0, step 2 is layer 1, etc.
      }
    }
    
    // If root is selected but no layers are active, we're at step 1
    return 1
  }, [currentRootSelection, activeTilePerLayer])

  const currentStep = getCurrentStep()

  // Synchronize grid view visibility with wizard step
  useEffect(() => {
    // Only sync if step has actually changed
    if (currentStep !== previousStepRef.current && currentStep > 0) {
      // Ensure all layers up to current step are visible
      const layersToShow = currentStep - 1
      const layersToUpdate: number[] = []
      
      for (let i = 0; i <= layersToShow && i < 6; i++) {
        if (!visibleLayers[i]) {
          layersToUpdate.push(i)
        }
      }
      
      // Update layers that need to be visible
      layersToUpdate.forEach(layerIndex => {
        const tiles = generateTilesForLayer(layerIndex)
        if (tiles.length > 0) {
          showLayer(layerIndex)
        }
      })
      
      previousStepRef.current = currentStep
    }
  }, [currentStep, visibleLayers, generateTilesForLayer, showLayer])

  // Get current level tiles based on derived step
  const getCurrentLevelTiles = useCallback((): ExplorationTile[] => {
    if (currentStep === 0) {
      return rootTiles
    } else {
      const layerIndex = currentStep - 1
      return generateTilesForLayer(layerIndex)
    }
  }, [currentStep, rootTiles, generateTilesForLayer])

  // Get current level title
  const getCurrentLevelTitle = useCallback((): string => {
    if (currentStep === 0) {
      return 'Choose Your Starting Point'
    } else {
      const layerIndex = currentStep - 1
      const layerTitles = [
        'Detailed Metrics',
        'Advanced Analytics',
        'Deep Insights',
        'Granular Data',
        'Micro Analytics',
        'Ultra Detailed'
      ]
      return layerTitles[layerIndex] || `Level ${layerIndex + 1} Analytics`
    }
  }, [currentStep])

  // Get active tile for current level from shared state
  const getCurrentActiveTile = useCallback((): string | null => {
    if (currentStep === 0) {
      // Check if custom query is selected at root level
      if (isCustomQuerySelected(-1)) {
        return 'custom-query'
      }
      return selectedTileId || currentRootSelection
    } else {
      const layerIndex = currentStep - 1
      // Check if custom query is selected at this layer
      if (isCustomQuerySelected(layerIndex)) {
        return 'custom-query'
      }
      return selectedTileId || activeTilePerLayer[layerIndex]
    }
  }, [currentStep, selectedTileId, currentRootSelection, activeTilePerLayer, isCustomQuerySelected])

  // Get current custom query text if selected
  const getCurrentCustomQuery = useCallback((): string | null => {
    if (currentStep === 0) {
      return getCustomQuerySelection(-1)
    } else {
      const layerIndex = currentStep - 1
      return getCustomQuerySelection(layerIndex)
    }
  }, [currentStep, getCustomQuerySelection])

  // Create breadcrumb path
  const path = [{ label: 'Home', onClick: () => goToStep(0) }]
  
  if (currentStep > 1) {
    path.push({ 
      label: 'Overview', 
      onClick: () => goToStep(1) 
    })
  }
  
  if (currentStep > 2) {
    path.push({ 
      label: 'Details', 
      onClick: () => goToStep(2) 
    })
  }

  // Navigate to specific step by manipulating shared state
  const goToStep = useCallback((step: number) => {
    setSelectedTileId(null) // Reset selection when changing steps
    
    if (step === 0) {
      // Go to root level - reset everything
      resetLayers()
    } else if (step === 1) {
      // Go to first layer - keep root selection, clear layers
      for (let i = 0; i < activeTilePerLayer.length; i++) {
        if (activeTilePerLayer[i]) {
          handleTileSelection(activeTilePerLayer[i]!, i)
          break
        }
      }
    } else {
      // Go to specific layer - this is complex, for now just clear selection
      setSelectedTileId(null)
    }
  }, [resetLayers, activeTilePerLayer, handleTileSelection])

  // Handle tile selection (without automatic navigation)
  const handleTileClick = useCallback((tileId: string) => {
    setSelectedTileId(tileId)
    // Call original handler for backward compatibility
    onTileClick(tileId, currentStep === 0 ? 'root' : 'sub')
  }, [currentStep, onTileClick])

  // Handle explore button click (actual navigation using shared state)
  const handleExploreClick = useCallback(() => {
    // Prioritize custom prompt if it has content
    if (showCustomPrompt && customPrompt.trim()) {
      // Handle custom prompt exploration using shared state
      if (currentStep === 0) {
        handleRootCustomQuerySelection(customPrompt.trim())
      } else {
        const layerIndex = currentStep - 1
        handleLayerCustomQuerySelection(customPrompt.trim(), layerIndex)
      }
      
      // Clear UI state after exploration
      setCustomPrompt('')
      setShowCustomPrompt(false)
      setSelectedTileId(null)
    } else if (selectedTileId === 'custom-query') {
      // Handle custom query selection (with custom prompt if available)
      const queryText = customPrompt.trim() || 'Custom exploration query'
      if (currentStep === 0) {
        handleRootCustomQuerySelection(queryText)
      } else {
        const layerIndex = currentStep - 1
        handleLayerCustomQuerySelection(queryText, layerIndex)
      }
      
      // Clear selection and prompt after exploration
      setSelectedTileId(null)
      setCustomPrompt('')
      setShowCustomPrompt(false)
    } else if (selectedTileId) {
      // Handle predefined tile exploration
      if (currentStep === 0) {
        // Root level selection
        handleRootTileSelection(selectedTileId)
      } else {
        // Layer selection
        const layerIndex = currentStep - 1
        handleTileSelection(selectedTileId, layerIndex)
      }
      
      // Clear selection after navigation
      setSelectedTileId(null)
    }
  }, [showCustomPrompt, customPrompt, selectedTileId, currentStep, handleRootTileSelection, handleTileSelection, handleRootCustomQuerySelection, handleLayerCustomQuerySelection])

  // Get contextual prompt placeholder
  const getPromptPlaceholder = useCallback((): string => {
    if (currentStep === 0) {
      return 'What aspect of your business would you like to explore? (e.g., "customer satisfaction trends", "seasonal revenue patterns")'
    } else {
      const currentTitle = getCurrentLevelTitle()
      return `What specific aspect of ${currentTitle.toLowerCase()} would you like to explore?`
    }
  }, [currentStep, getCurrentLevelTitle])

  // Get current values
  const currentTiles = getCurrentLevelTiles()
  const currentTitle = getCurrentLevelTitle()
  const currentActiveTile = getCurrentActiveTile()
  const currentCustomQuery = getCurrentCustomQuery()
  const isCustomQueryActiveInSharedState = currentActiveTile === 'custom-query'
  const breadcrumbPath = path

  // Check if we can go forward
  const canGoForward = useCallback((): boolean => {
    // Allow forward if either custom prompt has content OR a tile is selected OR custom query is selected locally OR custom query is selected in shared state
    return (showCustomPrompt && customPrompt.trim().length > 0) || selectedTileId !== null || isCustomQueryActiveInSharedState
  }, [showCustomPrompt, customPrompt, selectedTileId, isCustomQueryActiveInSharedState])

  // Go to previous step using shared state
  const goBack = useCallback(() => {
    setSelectedTileId(null)
    setCustomPrompt('')
    setShowCustomPrompt(false)
    
    if (currentStep === 0) {
      // Already at root, nothing to do
      return
    } else if (currentStep === 1) {
      // Go back to root selection - clear root selection (including custom queries)
      resetLayers()
    } else {
      // Go back one layer - hide the current layer (this will also clear custom queries)
      const currentLayerIndex = currentStep - 1
      if (currentLayerIndex >= 0) {
        hideLayer(currentLayerIndex)
      }
    }
  }, [currentStep, resetLayers, hideLayer])

  // Reset to beginning
  const resetWizard = useCallback(() => {
    setSelectedTileId(null)
    setCustomPrompt('')
    setShowCustomPrompt(false)
    resetLayers()
  }, [resetLayers])

  // Handle custom query toggle
  const handleCustomQueryToggle = useCallback((event: React.SyntheticEvent, isExpanded: boolean) => {
    setShowCustomPrompt(isExpanded)
    if (isExpanded) {
      // Populate with existing custom query text if available
      const existingQuery = getCurrentCustomQuery()
      if (existingQuery) {
        setCustomPrompt(existingQuery)
      }
    } else {
      // Only clear custom prompt when hiding the input
      setCustomPrompt('')
      // Clear custom query selection when accordion is collapsed
      if (selectedTileId === 'custom-query') {
        setSelectedTileId(null)
      }
    }
  }, [selectedTileId, getCurrentCustomQuery])

  return (
    <Box sx={{ minHeight: '600px' }}>
      {/* Always show predefined tiles */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {currentTiles.map((tile, index) => (
          <Grid item xs={12} sm={6} key={tile.id} sx={{ minHeight: 200 }}>
            <Fade in timeout={300 + index * 100}>
              <div style={{ height: '100%' }}>
                <ExplorationTileCard
                  tile={tile}
                  onClick={() => handleTileClick(tile.id)}
                  isActive={selectedTileId === tile.id || (selectedTileId === null && (
                    (currentStep === 0 && currentRootSelection === tile.id) ||
                    (currentStep > 0 && activeTilePerLayer[currentStep - 1] === tile.id)
                  ))}
                  wizardMode={true}
                />
              </div>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Custom Query Tile with Accordion */}
      <Card
        elevation={0}
        sx={(theme) => ({
          mb: 4,
          p: 2,
          boxShadow: 'none',
          borderRadius: 1,
          background: (showCustomPrompt || selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState)
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.primary.main, 0.04)})`
            : theme.palette.background.paper,
          cursor: 'pointer',
          outline: (selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState)
            ? `3px solid ${theme.palette.primary.main}`
            : showCustomPrompt
            ? `2px solid ${alpha(theme.palette.primary.main, 0.4)}`
            : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            outline: (selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState)
              ? `3px solid ${theme.palette.primary.main}`
              : `2px solid ${alpha(theme.palette.primary.main, 0.6)}`,
            outlineOffset: '-2px',
            background: (showCustomPrompt || selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState)
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.06)})`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)}, ${alpha(theme.palette.primary.main, 0.02)})`,
          },
        })}
      >
        <Accordion
          expanded={showCustomPrompt || isCustomQueryActiveInSharedState}
          onChange={handleCustomQueryToggle}
          elevation={0}
          sx={{
            boxShadow: 'none',
            backgroundColor: 'transparent',
            '&:before': {
              display: 'none',
            },
            '& .MuiAccordionSummary-root': {
              p: 0,
              minHeight: 'auto',
              '& .MuiAccordionSummary-content': {
                margin: 0,
              },
              '& .MuiAccordionSummary-expandIconWrapper': {
                color: 'primary.main',
              },
            },
            '& .MuiAccordionDetails-root': {
              p: 0,
              pt: 2,
              backgroundColor: 'transparent',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              '& .MuiAccordionSummary-content': {
                margin: 0,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Box
                sx={(theme) => ({
                  p: 1.25,
                  borderRadius: 1,
                  background: (showCustomPrompt || selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState) ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.15),
                  color: (showCustomPrompt || selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState) ? theme.palette.primary.contrastText : theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                })}
              >
                <Create />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  color={(showCustomPrompt || selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState) ? 'primary.main' : 'text.secondary'}
                  sx={{
                    fontWeight: (showCustomPrompt || selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState) ? 600 : 500,
                    mb: 0.5,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
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
                  Explore using your own custom prompt or question
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          
          <AccordionDetails>
            <Box sx={{ width: '100%'}}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={getPromptPlaceholder()}
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    fontSize: '1rem',
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
              
              {/* Select Button */}
              <Button
                variant="outlined"
                onClick={() => setSelectedTileId('custom-query')}
                disabled={selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState}
                sx={{
                  width: '100%',
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  py: 1,
                }}
              >
                {(selectedTileId === 'custom-query' || isCustomQueryActiveInSharedState) ? 'Selected' : 'Select Custom Query'}
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>

      {/* Navigation Controls */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        {/* Back Button */}
        <Button
          variant="outlined"
          onClick={goBack}
          disabled={currentStep === 0}
          startIcon={<ArrowBack />}
          sx={{
            minWidth: 120,
            height: 44,
            fontWeight: 600,
          }}
        >
          Back
        </Button>

        {/* Explore Button */}
        <Button
          variant="contained"
          onClick={handleExploreClick}
          disabled={!canGoForward()}
          endIcon={<Explore />}
          sx={{
            minWidth: 180,
            height: 44,
            fontWeight: 600,
            background: canGoForward() 
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : undefined,
            '&:hover': {
              background: canGoForward() 
                ? 'linear-gradient(135deg, #16a34a, #15803d)'
                : undefined,
            },
            '&:disabled': {
              background: alpha('#000', 0.12),
              color: alpha('#000', 0.26),
            }
          }}
        >
          {selectedTileId === 'custom-query' ? 'Explore Custom Query' : 
           (showCustomPrompt && customPrompt.trim()) ? 'Explore Custom Query' : 'Explore This Topic'}
        </Button>
      </Box>
    </Box>
  )
}