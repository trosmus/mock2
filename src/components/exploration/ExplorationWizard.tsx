import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Box, Typography, Grid, Button, IconButton, Fade, Breadcrumbs, Link, alpha } from '@mui/material'
import { ArrowBack, ArrowForward, Home, Explore } from '@mui/icons-material'
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
  // Remove independent state - derive from shared exploration state
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null) // Track selected tile without navigation
  const previousStepRef = useRef<number>(-1)
  
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
    resetLayers
  } = explorationLayers

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
      return selectedTileId || currentRootSelection
    } else {
      const layerIndex = currentStep - 1
      return selectedTileId || activeTilePerLayer[layerIndex]
    }
  }, [currentStep, selectedTileId, currentRootSelection, activeTilePerLayer])

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
    if (!selectedTileId) return
    
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
  }, [selectedTileId, currentStep, handleRootTileSelection, handleTileSelection])

  // Check if we can go forward
  const canGoForward = useCallback((): boolean => {
    if (!selectedTileId) return false
    
    // Always allow forward navigation if a tile is selected
    // The actual tile generation and availability will be checked when exploring
    return true
  }, [selectedTileId])

  // Go to previous step using shared state
  const goBack = useCallback(() => {
    setSelectedTileId(null)
    
    if (currentStep === 0) {
      // Already at root, nothing to do
      return
    } else if (currentStep === 1) {
      // Go back to root selection - clear root selection
      resetLayers()
    } else {
      // Go back one layer - hide the current layer
      const currentLayerIndex = currentStep - 1
      if (currentLayerIndex >= 0) {
        hideLayer(currentLayerIndex)
      }
    }
  }, [currentStep, resetLayers, hideLayer])

  // Reset to beginning
  const resetWizard = useCallback(() => {
    setSelectedTileId(null)
    resetLayers()
  }, [resetLayers])

  const currentTiles = getCurrentLevelTiles()
  const currentTitle = getCurrentLevelTitle()
  const currentActiveTile = getCurrentActiveTile()
  const breadcrumbPath = path

  return (
    <Box sx={{ minHeight: '600px' }}>
      {/* Current Level Tiles */}
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

        {/* Explore This Topic Button */}
        <Button
          variant="contained"
          onClick={handleExploreClick}
          disabled={!selectedTileId || !canGoForward()}
          endIcon={<Explore />}
          sx={{
            minWidth: 180,
            height: 44,
            fontWeight: 600,
            background: selectedTileId && canGoForward() 
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : undefined,
            '&:hover': {
              background: selectedTileId && canGoForward() 
                ? 'linear-gradient(135deg, #16a34a, #15803d)'
                : undefined,
            },
            '&:disabled': {
              background: alpha('#000', 0.12),
              color: alpha('#000', 0.26),
            }
          }}
        >
          Explore This Topic
        </Button>
      </Box>
    </Box>
  )
} 