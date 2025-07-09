import React, { useRef, useState } from 'react'
import { Box, Grid, Fade, Button, Typography, alpha } from '@mui/material'
import { Add } from '@mui/icons-material'
import { ExplorationTile } from '../../store/appState'
import { ExplorationTileCard } from './ExplorationTileCard'
import { ExplorationLayer } from './ExplorationLayer'
import { ExplorationConnectionPath } from './ExplorationConnectionPath'
import { CustomQueryTile } from './CustomQueryTile'
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
  
  // State to track expanded tiles in each row/layer
  const [expandedTilePerLayer, setExpandedTilePerLayer] = useState<{ [key: string]: 'custom-query' | null }>({
    root: null,
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i.toString(), null]))
  })
  
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
    currentRootSelection,
    handleRootCustomQuerySelection,
    handleLayerCustomQuerySelection,
    getCustomQuerySelection,
    isCustomQuerySelected
  } = explorationLayers

  // Get the active root tile color for the connection line
  const activeRootTile = rootTiles.find(tile => tile.id === currentRootSelection)
  const connectionColor = currentRootSelection === 'custom-query' 
    ? '#8b5cf6' // Purple color for custom queries
    : activeRootTile?.color || '#06b6d4'

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

  // Handle custom query for root level
  const handleRootCustomQuery = (query: string) => {
    handleRootCustomQuerySelection(query)
  }

  // Handle custom query tile selection for root level
  const handleRootCustomQuerySelect = () => {
    // For grid mode, we'll trigger custom query selection with a default query
    handleRootCustomQuerySelection('Custom exploration query')
  }

  // Handle custom query for layers
  const handleLayerCustomQuery = (query: string, layerIndex: number) => {
    handleLayerCustomQuerySelection(query, layerIndex)
  }

  // Handle custom query tile selection for layers
  const handleLayerCustomQuerySelect = (layerIndex: number) => {
    // For grid mode, we'll trigger custom query selection with a default query
    handleLayerCustomQuerySelection('Custom exploration query', layerIndex)
  }

  // Handle custom query expansion for root level
  const handleRootCustomQueryExpand = (expanded: boolean) => {
    setExpandedTilePerLayer(prev => ({
      ...prev,
      root: expanded ? 'custom-query' : null
    }))
  }

  // Handle custom query expansion for layers
  const handleLayerCustomQueryExpand = (layerIndex: number, expanded: boolean) => {
    setExpandedTilePerLayer(prev => ({
      ...prev,
      [layerIndex.toString()]: expanded ? 'custom-query' : null
    }))
  }

  // Check if regular tiles should be collapsed in a specific layer
  const shouldCollapseTiles = (layerKey: string): boolean => {
    return expandedTilePerLayer[layerKey] === 'custom-query'
  }

  // Get layer titles for the expand button
  const getLayerTitle = (index: number): string => {
    return 'Explore More'
  }

  const nextLayerToExpand = getNextExpandableLayer()

  return (
    <Box ref={containerRef} sx={{ mb: 6, position: 'relative' }}>
      {/* Root Level - Always Visible */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
          {rootTiles.map((tile, index) => (
            <Box key={tile.id} sx={{ 
              flex: shouldCollapseTiles('root') ? '0 0 80px' : '1 1 calc(25% - 44px)', 
              minWidth: shouldCollapseTiles('root') ? 80 : 200,
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transformOrigin: 'center',
              willChange: 'flex, min-width'
            }}>
              <Fade in timeout={300 + index * 100}>
                <Box data-tile-id={tile.id} sx={{height: '100%'}}>
                  <ExplorationTileCard
                    tile={tile}
                    onClick={() => handleRootTileClick(tile.id)}
                    isActive={currentRootSelection === tile.id}
                    isCollapsed={shouldCollapseTiles('root')}
                  />
                </Box>
              </Fade>
            </Box>
          ))}
          
          {/* Custom Query Tile for Root Level */}
          <Box sx={{ 
            flex: shouldCollapseTiles('root') ? '1 1 auto' : '0 0 80px',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transformOrigin: 'center',
            willChange: 'flex'
          }}>
            <CustomQueryTile
              onCustomQuery={handleRootCustomQuery}
              onSelect={handleRootCustomQuerySelect}
              onExpand={handleRootCustomQueryExpand}
              level="root"
              isSelected={isCustomQuerySelected(-1)}
              fadeDelay={rootTiles.length * 100}
            />
          </Box>
        </Box>
      </Box>

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
          onCustomQuery={handleLayerCustomQuery}
          onCustomQuerySelect={handleLayerCustomQuerySelect}
          onCustomQueryExpand={handleLayerCustomQueryExpand}
          isCustomQuerySelected={isCustomQuerySelected}
          shouldCollapseTiles={shouldCollapseTiles(layerIndex.toString())}
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
        expandedTilePerLayer={expandedTilePerLayer}
      />
    </Box>
  )
} 