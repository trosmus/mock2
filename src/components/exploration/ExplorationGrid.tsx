import React, { useRef } from 'react'
import { Box, Grid, Fade, Button, Typography, alpha } from '@mui/material'
import { Add } from '@mui/icons-material'
import { ExplorationTile } from '../../store/appState'
import { ExplorationTileCard } from './ExplorationTileCard'
import { ExplorationLayer } from './ExplorationLayer'
import { ExplorationConnectionPath } from './ExplorationConnectionPath'
import { useExplorationLayers } from './useExplorationLayers'

interface ExplorationGridProps {
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

export const ExplorationGrid: React.FC<ExplorationGridProps> = ({
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
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use the passed exploration layers state
  const {
    visibleLayers,
    activeTilePerLayer,
    generateTilesForLayer,
    handleTileSelection,
    handleRootTileSelection,
    showLayer,
    hideLayer,
    getNextExpandableLayer,
    currentRootSelection
  } = explorationLayers

  // Get the active root tile color for the connection line
  const activeRootTile = rootTiles.find(tile => tile.id === currentRootSelection)
  const connectionColor = activeRootTile?.color || '#06b6d4'

  // Handle root tile clicks with proper layer management
  const handleRootTileClick = (tileId: string) => {
    // Call the original handler for backward compatibility
    onTileClick(tileId, 'root')
    
    // Use the specialized root tile selection handler
    handleRootTileSelection(tileId)
  }

  // Handle layer tile clicks
  const handleLayerTileClick = (tileId: string, layerIndex: number) => {
    handleTileSelection(tileId, layerIndex)
  }

  // Handle layer close
  const handleLayerClose = (layerIndex: number) => {
    hideLayer(layerIndex)
  }

  // Handle expand button click
  const handleExpandClick = () => {
    const nextLayer = getNextExpandableLayer()
    if (nextLayer !== -1) {
      showLayer(nextLayer)
    }
  }

  // Get layer titles for the expand button
  const getLayerTitle = (index: number): string => {
    return 'Explore More'
  }

  const nextLayerToExpand = getNextExpandableLayer()

  return (
    <Box ref={containerRef} sx={{ mb: 6, position: 'relative' }}>
      {/* Root Level - Always Visible */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {rootTiles.map((tile, index) => (
          <Grid item xs={12} sm={6} lg={3} key={tile.id}>
            <Fade in timeout={300 + index * 100}>
              <div data-tile-id={tile.id}>
                <ExplorationTileCard
                  tile={tile}
                  onClick={() => handleRootTileClick(tile.id)}
                  isActive={currentRootSelection === tile.id}
                />
              </div>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Dynamic Exploration Layers */}
      {Array.from({ length: 6 }, (_, layerIndex) => (
        <ExplorationLayer
          key={layerIndex}
          layerIndex={layerIndex}
          isVisible={visibleLayers[layerIndex]}
          tiles={generateTilesForLayer(layerIndex)}
          activeTileId={activeTilePerLayer[layerIndex]}
          onTileClick={handleLayerTileClick}
          onLayerClose={handleLayerClose}
        />
      ))}

      {/* Next Layer Expansion Button */}
      {nextLayerToExpand !== -1 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            onClick={handleExpandClick}
            sx={(theme) => ({
              background: theme.palette.background.paper,
              color: 'text.primary',
              height: 40,
              borderRadius: 1,
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.15 : 0.1)}`,
              '&:hover': {
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            })}
          >
            <Add />
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {getLayerTitle(nextLayerToExpand)}
            </Typography>
          </Button>
        </Box>
      )}

      {/* Enhanced Connection Path */}
      <ExplorationConnectionPath
        showSubTiles={visibleLayers.some(Boolean)}
        currentRootTileId={currentRootSelection}
        currentSubTileId={activeTilePerLayer.find(Boolean) || null}
        connectionColor={connectionColor}
        containerRef={containerRef}
        activeTilePerLayer={activeTilePerLayer}
        visibleLayers={visibleLayers}
      />
    </Box>
  )
} 