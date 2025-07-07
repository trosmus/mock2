import React from 'react'
import { Box, Typography, Grid, Fade, Collapse, Card, alpha, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { ExplorationTile } from '../../store/appState'
import { ExplorationTileCard } from './ExplorationTileCard'

interface ExplorationLayerProps {
  layerIndex: number
  isVisible: boolean
  tiles: ExplorationTile[]
  activeTileId: string | null
  onTileClick: (tileId: string, layerIndex: number) => void
  onLayerClose: (layerIndex: number) => void
}

export const ExplorationLayer: React.FC<ExplorationLayerProps> = ({ 
  layerIndex,
  isVisible,
  tiles,
  activeTileId,
  onTileClick,
  onLayerClose
}) => {
  // Dynamic layer titles based on the layer index
  const getLayerTitle = (index: number): string => {
    const titles = [
      'Detailed Metrics',
      'Advanced Analytics', 
      'Deep Insights',
      'Granular Data',
      'Micro Analytics',
      'Ultra Detailed'
    ]
    return titles[index] || `Level ${index + 1} Analytics`
  }
  
  // Get appropriate placeholder messages
  const getPlaceholderMessage = (index: number) => {
    if (index === 0) {
      return {
        title: 'Select a metric above to see detailed insights',
        subtitle: 'Choose any metric tile from the first row to explore detailed analytics'
      }
    }
    
    const layerNumber = index + 1
    const previousLayerNumber = index
    return {
      title: `Select a tile from row ${previousLayerNumber + 1} to continue`,
      subtitle: `Choose a tile from the previous row to see ${getLayerTitle(index).toLowerCase()} here`
    }
  }
  
  const shouldShowTiles = isVisible && tiles.length > 0
  const placeholderMessage = getPlaceholderMessage(layerIndex)

  return (
    <Collapse in={isVisible} timeout={{ enter: 400, exit: 0 }}>
      <Box sx={{ mb: 4 }}>
        {shouldShowTiles ? (
          // Show actual tiles
          <Grid container spacing={3}>
            {tiles.map((tile, index) => (
              <Grid item xs={12} sm={6} lg={3} key={tile.id}>
                <Fade in timeout={300 + index * 100}>
                  <Box data-tile-id={tile.id} sx={{ position: 'relative' }}>
                    <ExplorationTileCard
                      tile={tile}
                      onClick={() => onTileClick(tile.id, layerIndex)}
                      isSubLevel={layerIndex > 0}
                      isActive={activeTileId === tile.id}
                    />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Show placeholder
          <Card
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 1,
              height: 140,
              border: '2px dashed',
              borderColor: 'divider',
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                onLayerClose(layerIndex)
              }}
              sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8,
                color: 'text.disabled',
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.04),
                }
              }}
            >
              <Close fontSize="small" />
            </IconButton>
            
            {/* Centered text content */}
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.secondary',
                  mb: 1 
                }}
              >
                {placeholderMessage.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.disabled"
                sx={{ 
                  lineHeight: 1.4 
                }}
              >
                {placeholderMessage.subtitle}
              </Typography>
            </Box>
          </Card>
        )}
      </Box>
    </Collapse>
  )
} 