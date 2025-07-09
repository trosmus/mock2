import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Box, Typography, Grid, ToggleButton, ToggleButtonGroup, alpha, Snackbar, Alert } from '@mui/material'
import { ViewCarousel, ViewModule } from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { addTrailStep } from '../store/appState'
import { useExplorationNavigation } from '../hooks/useExplorationNavigation'
import { generateDynamicInsights, getExplorationSubtitle } from '../data/dynamicInsights'
import { useExplorationLayers } from '../components/exploration/useExplorationLayers'
import { saveFavoriteInsight, addInsightToDashboard } from '../services/favoriteInsights'
import { Page } from '../components/Page'
import {
  ExplorationGrid,
  ExplorationWizard,
  ExplorationInsights
} from '../components/exploration'

interface InsightData {
  title: string
  type: 'chart' | 'metric' | 'ai-text'
  data: any
}

type ViewMode = 'grid' | 'wizard'

export const ExplorerScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const [viewMode, setViewMode] = useState<ViewMode>('wizard')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const {
    currentPath,
    currentLevel,
    rootLevel,
    isAtRoot,
    currentRootTileId,
    currentSubTileId,
    showSubTiles,
    handleTileClick
  } = useExplorationNavigation()

  // Manage layer-based exploration state at the top level
  const explorationLayers = useExplorationLayers({ maxLayers: 6 })

  // Stable insights with debouncing
  const [stableInsights, setStableInsights] = useState(() =>
    generateDynamicInsights(null, [], [])
  )
  const [insightsUpdateTimeoutId, setInsightsUpdateTimeoutId] = useState<NodeJS.Timeout | null>(null)

  // Create a debounced insights update function
  const updateInsightsDebounced = useCallback((
    currentRootSelection: string | null,
    activeTilePerLayer: (string | null)[],
    visibleLayers: boolean[]
  ) => {
    // Clear any existing timeout
    if (insightsUpdateTimeoutId) {
      clearTimeout(insightsUpdateTimeoutId)
    }

    // Set a new timeout to update insights after user stops interacting
    const timeoutId = setTimeout(() => {
      const newInsights = generateDynamicInsights(
        currentRootSelection,
        activeTilePerLayer,
        visibleLayers
      )
      setStableInsights(newInsights)
      setInsightsUpdateTimeoutId(null)
    }, 800) // 800ms delay for stable insights

    setInsightsUpdateTimeoutId(timeoutId)
  }, [insightsUpdateTimeoutId])

  // Watch for changes in exploration state and update insights with debouncing
  useEffect(() => {
    updateInsightsDebounced(
      explorationLayers.currentRootSelection,
      explorationLayers.activeTilePerLayer,
      explorationLayers.visibleLayers
    )

    // Cleanup timeout on unmount
    return () => {
      if (insightsUpdateTimeoutId) {
        clearTimeout(insightsUpdateTimeoutId)
      }
    }
  }, [
    explorationLayers.currentRootSelection,
    explorationLayers.activeTilePerLayer,
    explorationLayers.visibleLayers,
    updateInsightsDebounced
  ])

  useEffect(() => {
    addTrailStep({
      title: t('EXPLORER.TITLE'),
      type: 'explorer',
      description: t('EXPLORER.SUBTITLE'),
    })
  }, [t])

  // Generate dynamic subtitle based on current exploration state
  const subtitle = useMemo(() => getExplorationSubtitle(
    explorationLayers.currentRootSelection,
    explorationLayers.activeTilePerLayer,
    explorationLayers.visibleLayers
  ), [
    explorationLayers.currentRootSelection,
    explorationLayers.activeTilePerLayer,
    explorationLayers.visibleLayers
  ])

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: ViewMode | null,
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode)
    }
  }

  const handleAddToDashboard = useCallback((insight: InsightData) => {
    try {
      // First save to favorites
      const favoriteInsight = saveFavoriteInsight({
        title: insight.title,
        type: insight.type,
        data: insight.data,
        source: 'exploration'
      })
      
      // Then add to dashboard
      addInsightToDashboard(favoriteInsight)
      
      setSnackbarMessage(`"${insight.title}" added to dashboard successfully!`)
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Error adding insight to dashboard:', error)
      setSnackbarMessage(`Error adding "${insight.title}" to dashboard`)
      setSnackbarOpen(true)
    }
  }, [])

  const handleAddToFavorites = useCallback((insight: InsightData) => {
    try {
      saveFavoriteInsight({
        title: insight.title,
        type: insight.type,
        data: insight.data,
        source: 'exploration'
      })
      
      setSnackbarMessage(`"${insight.title}" added to favorites successfully!`)
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Error adding insight to favorites:', error)
      setSnackbarMessage(`Error adding "${insight.title}" to favorites`)
      setSnackbarOpen(true)
    }
  }, [])

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <Page
        title={t('EXPLORER.TITLE')}
        subtitle={subtitle}
        actions={
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: 2,
                px: 2,
                py: 1.5,
                minWidth: 48,
                color: 'text.secondary',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
            }}
          >
            <ToggleButton value="wizard" aria-label="wizard view">
              <ViewCarousel />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModule />
            </ToggleButton>
          </ToggleButtonGroup>
        }
      >
        {/* Conditional Rendering */}
        {viewMode === 'grid' ? (
          <ExplorationGrid
            currentPath={currentPath}
            rootTiles={rootLevel.tiles}
            subLevelTiles={currentLevel.tiles}
            subLevelTitle={explorationLayers.currentRootSelection ? rootLevel.tiles.find(t => t.id === explorationLayers.currentRootSelection)?.title : undefined}
            currentRootTileId={currentRootTileId}
            currentSubTileId={currentSubTileId}
            showSubTiles={showSubTiles}
            onTileClick={handleTileClick}
            explorationLayers={explorationLayers}
          />
        ) : (
          <ExplorationWizard
            currentPath={currentPath}
            rootTiles={rootLevel.tiles}
            subLevelTiles={currentLevel.tiles}
            subLevelTitle={explorationLayers.currentRootSelection ? rootLevel.tiles.find(t => t.id === explorationLayers.currentRootSelection)?.title : undefined}
            currentRootTileId={currentRootTileId}
            currentSubTileId={currentSubTileId}
            showSubTiles={showSubTiles}
            onTileClick={handleTileClick}
            explorationLayers={explorationLayers}
          />
        )}

        {/* Show stable insights whenever any exploration is happening */}
        {(explorationLayers.currentRootSelection || explorationLayers.visibleLayers.some(Boolean)) && (
          <ExplorationInsights
            topLeft={stableInsights.topLeft}
            topRight={stableInsights.topRight}
            bottomLeft={stableInsights.bottomLeft}
            bottomRight={stableInsights.bottomRight}
            onAddToDashboard={handleAddToDashboard}
            onAddToFavorites={handleAddToFavorites}
          />
        )}
      </Page>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
