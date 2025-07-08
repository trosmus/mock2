import { useState, useCallback, useRef } from 'react'
import { ExplorationTile } from '../../store/appState'
import { CATEGORIES, generateTileData, EXPLORATION_LAYERS } from '../../data/tileGenerator'

interface UseExplorationLayersProps {
  maxLayers?: number
  rootCategory?: keyof typeof CATEGORIES
}

export const useExplorationLayers = ({
  maxLayers = 6,
  rootCategory = 'revenue'
}: UseExplorationLayersProps = {}) => {
  // Initialize state arrays with dynamic size
  const [visibleLayers, setVisibleLayers] = useState<boolean[]>(() => 
    Array(maxLayers).fill(false)
  )
  const [activeTilePerLayer, setActiveTilePerLayer] = useState<(string | null)[]>(() => 
    Array(maxLayers).fill(null)
  )

  // We need to track root selection separately from layer selections
  const [currentRootSelection, setCurrentRootSelection] = useState<string | null>(null)

  // Track custom query selections per layer
  const [customQueryPerLayer, setCustomQueryPerLayer] = useState<(string | null)[]>(() => 
    Array(maxLayers).fill(null)
  )
  const [rootCustomQuery, setRootCustomQuery] = useState<string | null>(null)

  // Cache for generated tiles to ensure stability
  const tileCache = useRef<Map<string, ExplorationTile[]>>(new Map())

  // Generate tiles for a specific layer
  const generateTilesForLayer = useCallback((layerIndex: number): ExplorationTile[] => {
    try {
      // Validate layer index
      if (layerIndex < 0 || layerIndex >= maxLayers) {
        return []
      }
      
      // Get the root tile color for color inheritance
      const getRootTileColor = (): string | undefined => {
        if (!currentRootSelection) return undefined
        
        // Get the root tile color from explorationData
        const rootTiles = [
          { id: 'revenue', color: '#22c55e' },
          { id: 'shipments', color: '#8b5cf6' },
          { id: 'inventory', color: '#f59e0b' },
          { id: 'delivery', color: '#06b6d4' }
        ]
        
        const rootTile = rootTiles.find(tile => tile.id === currentRootSelection)
        return rootTile?.color
      }
      
      const rootColor = getRootTileColor()
      
      // Layer 0 is special - it depends on root selection, not layer selection
      if (layerIndex === 0) {
        if (!currentRootSelection) {
          return [] // No root selection means no tiles for layer 0
        }
        
        // Create cache key for layer 0
        const cacheKey = `layer-0-${currentRootSelection}`
        
        // Check cache first
        if (tileCache.current.has(cacheKey)) {
          return tileCache.current.get(cacheKey)!
        }
        
        // Extract category from root selection
        const extractCategory = (tileId: string): keyof typeof CATEGORIES => {
          // Handle custom query tiles
          if (tileId.startsWith('custom-query-')) {
            return rootCategory // Use default root category for custom queries
          }
          
          const parts = tileId.split('-')
          const potentialCategory = parts[0]
          
          const validCategories: (keyof typeof CATEGORIES)[] = [
            'revenue', 'shipping', 'inventory', 'performance', 'customers', 'operations'
          ]
          
          if (validCategories.includes(potentialCategory as keyof typeof CATEGORIES)) {
            return potentialCategory as keyof typeof CATEGORIES
          }
          
          // Fallback to root category
          return rootCategory
        }
        
        const category = extractCategory(currentRootSelection)
        
        // Generate layer 0 tiles with the root color
        const tiles = generateTileData({
          category,
          level: 2, // Layer 0 should be level 2 (after root level 1)
          count: 4,
          prefix: 'Detailed',
          parentId: currentRootSelection,
          parentColor: rootColor
        })
        
        // Cache the tiles
        tileCache.current.set(cacheKey, tiles)
        return tiles
      }
      
      // For other layers, check if parent layer has an active tile selection
      const parentTileId = activeTilePerLayer[layerIndex - 1]
      if (!parentTileId) {
        return [] // No parent layer selection means no tiles for this layer
      }
      
      // Create cache key for this layer
      const cacheKey = `layer-${layerIndex}-${parentTileId}`
      
      // Check cache first
      if (tileCache.current.has(cacheKey)) {
        return tileCache.current.get(cacheKey)!
      }
      
      // Extract category from parent tile ID with fallbacks
      const extractCategory = (tileId: string): keyof typeof CATEGORIES => {
        // Handle custom query tiles
        if (tileId.startsWith('custom-query-')) {
          return rootCategory // Use default root category for custom queries
        }
        
        const parts = tileId.split('-')
        const potentialCategory = parts[0]
        
        const validCategories: (keyof typeof CATEGORIES)[] = [
          'revenue', 'shipping', 'inventory', 'performance', 'customers', 'operations'
        ]
        
        if (validCategories.includes(potentialCategory as keyof typeof CATEGORIES)) {
          return potentialCategory as keyof typeof CATEGORIES
        }
        
        // Fallback to root category
        return rootCategory
      }
      
      const category = extractCategory(parentTileId)
      
      // Generate prefix based on layer depth
      const prefixes = ['', 'Detailed', 'Advanced', 'Deep', 'Granular', 'Micro', 'Ultra']
      const prefix = prefixes[layerIndex] || `Level ${layerIndex}`
      
      const tiles = generateTileData({
        category,
        level: layerIndex + 1,
        count: 4,
        prefix,
        parentId: parentTileId,
        parentColor: rootColor
      })
      
      // Cache the tiles
      tileCache.current.set(cacheKey, tiles)
      return tiles
      
    } catch (error) {
      console.warn(`Failed to generate tiles for layer ${layerIndex}:`, error)
      return []
    }
  }, [activeTilePerLayer, maxLayers, rootCategory, currentRootSelection])

  // Updated handleRootTileSelection with proper root tracking
  const handleRootTileSelectionFixed = useCallback((tileId: string) => {
    if (!tileId) {
      return
    }

    // Handle deselection
    if (currentRootSelection === tileId) {
      setCurrentRootSelection(null)
      // Clear all layer selections
      setActiveTilePerLayer(Array(maxLayers).fill(null))
      // Hide all layers
      setVisibleLayers(Array(maxLayers).fill(false))
      // Clear tile cache
      tileCache.current.clear()
    } else {
      // Handle selection
      setCurrentRootSelection(tileId)
      // Clear all layer selections (root change affects everything)
      setActiveTilePerLayer(Array(maxLayers).fill(null))
      
      // When root tile is selected, show only layer 0 (Row 2) with tiles
      // Hide all other layers including any placeholder layers
      setVisibleLayers(prev => {
        const newVisibleLayers = Array(maxLayers).fill(false)
        newVisibleLayers[0] = true // Show layer 0 with tiles
        return newVisibleLayers
      })
      
      // Clear tile cache when root changes to ensure fresh tiles
      tileCache.current.clear()
    }
  }, [maxLayers, currentRootSelection])

  // Handle tile selection with proper layer management
  const handleTileSelection = useCallback((tileId: string, layerIndex: number) => {
    if (!tileId || layerIndex < 0 || layerIndex >= maxLayers) {
      return
    }

    setActiveTilePerLayer(prev => {
      const newActiveTiles = [...prev]
      
      // Handle deselection
      if (newActiveTiles[layerIndex] === tileId) {
        newActiveTiles[layerIndex] = null
        // Clear all subsequent layers
        for (let i = layerIndex + 1; i < maxLayers; i++) {
          newActiveTiles[i] = null
        }
      } else {
        // Handle selection
        newActiveTiles[layerIndex] = tileId
        // Clear all subsequent layers
        for (let i = layerIndex + 1; i < maxLayers; i++) {
          newActiveTiles[i] = null
        }
      }
      
      return newActiveTiles
    })

    // Simple visibility rule: hide all layers beyond the immediate next one
    setVisibleLayers(prev => {
      const newVisibleLayers = [...prev]
      
      // Hide all layers beyond layer N+1 (only immediate next layer can remain visible)
      for (let i = layerIndex + 2; i < maxLayers; i++) {
        newVisibleLayers[i] = false
      }
      
      return newVisibleLayers
    })
  }, [maxLayers])

  // Show a specific layer (button expansion)
  const showLayer = useCallback((layerIndex: number) => {
    if (layerIndex < 0 || layerIndex >= maxLayers) {
      return
    }

    setVisibleLayers(prev => {
      const newVisibleLayers = [...prev]
      newVisibleLayers[layerIndex] = true
      return newVisibleLayers
    })
  }, [maxLayers])

  // Hide a specific layer and all subsequent layers
  const hideLayer = useCallback((layerIndex: number) => {
    if (layerIndex < 0 || layerIndex >= maxLayers) {
      return
    }

    setVisibleLayers(prev => {
      const newVisibleLayers = [...prev]
      // Hide this layer and all subsequent layers
      for (let i = layerIndex; i < maxLayers; i++) {
        newVisibleLayers[i] = false
      }
      return newVisibleLayers
    })

    // Also clear active tiles for hidden layers
    setActiveTilePerLayer(prev => {
      const newActiveTiles = [...prev]
      for (let i = layerIndex; i < maxLayers; i++) {
        newActiveTiles[i] = null
      }
      return newActiveTiles
    })
  }, [maxLayers])

  // Enhanced getNextExpandableLayer - allows expanding layers to show placeholders
  const getNextExpandableLayer = useCallback((): number => {
    for (let i = 0; i < maxLayers; i++) {
      const isVisible = visibleLayers[i]
      const hasActiveTile = activeTilePerLayer[i] !== null
      const nextLayerExists = i < maxLayers - 1
      const nextLayerVisible = visibleLayers[i + 1]
      
      // Case 1: This layer is not visible but can be shown
      if (!isVisible) {
        if (i === 0) {
          // Layer 0 can always be shown if it has tiles
          const tiles = generateTilesForLayer(i)
          if (tiles.length > 0) {
            return i
          }
        } else {
          // For other layers, allow expansion even without parent selection
          // This enables showing placeholders when user clicks the + button
          return i
        }
      }
      
      // Case 2: This layer is visible and has active tile, next layer can be shown
      if (isVisible && hasActiveTile && nextLayerExists && !nextLayerVisible) {
        // Next layer can always be expanded (placeholder or tiles)
        return i + 1
      }
      
      // Case 3: This layer is visible but has no active tile, next layer can still be shown for placeholder
      if (isVisible && !hasActiveTile && nextLayerExists && !nextLayerVisible) {
        return i + 1
      }
    }
    
    return -1
  }, [visibleLayers, activeTilePerLayer, maxLayers, generateTilesForLayer])

  // Reset all layers
  const resetLayers = useCallback(() => {
    setVisibleLayers(Array(maxLayers).fill(false))
    setActiveTilePerLayer(Array(maxLayers).fill(null))
    setCurrentRootSelection(null)
    setCustomQueryPerLayer(Array(maxLayers).fill(null))
    setRootCustomQuery(null)
    tileCache.current.clear()
  }, [maxLayers])

  // Handle root custom query selection
  const handleRootCustomQuerySelection = useCallback((query: string) => {
    setRootCustomQuery(query)
    setCurrentRootSelection('custom-query')
    // Clear all layer selections
    setActiveTilePerLayer(Array(maxLayers).fill(null))
    setCustomQueryPerLayer(Array(maxLayers).fill(null))
    // Show layer 0 when root custom query is selected
    setVisibleLayers(prev => {
      const newVisibleLayers = Array(maxLayers).fill(false)
      newVisibleLayers[0] = true
      return newVisibleLayers
    })
    // Clear tile cache
    tileCache.current.clear()
  }, [maxLayers])

  // Handle layer custom query selection
  const handleLayerCustomQuerySelection = useCallback((query: string, layerIndex: number) => {
    if (layerIndex < 0 || layerIndex >= maxLayers) {
      return
    }

    setCustomQueryPerLayer(prev => {
      const newCustomQueries = [...prev]
      newCustomQueries[layerIndex] = query
      // Clear all subsequent layers
      for (let i = layerIndex + 1; i < maxLayers; i++) {
        newCustomQueries[i] = null
      }
      return newCustomQueries
    })

    setActiveTilePerLayer(prev => {
      const newActiveTiles = [...prev]
      newActiveTiles[layerIndex] = 'custom-query'
      // Clear all subsequent layers
      for (let i = layerIndex + 1; i < maxLayers; i++) {
        newActiveTiles[i] = null
      }
      return newActiveTiles
    })

    // Hide layers beyond the immediate next one
    setVisibleLayers(prev => {
      const newVisibleLayers = [...prev]
      for (let i = layerIndex + 2; i < maxLayers; i++) {
        newVisibleLayers[i] = false
      }
      return newVisibleLayers
    })
  }, [maxLayers])

  // Get custom query selection for a specific layer
  const getCustomQuerySelection = useCallback((layerIndex: number): string | null => {
    if (layerIndex === -1) {
      // Root level
      return rootCustomQuery
    }
    if (layerIndex < 0 || layerIndex >= maxLayers) {
      return null
    }
    return customQueryPerLayer[layerIndex]
  }, [rootCustomQuery, customQueryPerLayer, maxLayers])

  // Check if custom query is selected for a specific layer
  const isCustomQuerySelected = useCallback((layerIndex: number): boolean => {
    if (layerIndex === -1) {
      // Root level
      return currentRootSelection === 'custom-query' && rootCustomQuery !== null
    }
    if (layerIndex < 0 || layerIndex >= maxLayers) {
      return false
    }
    return activeTilePerLayer[layerIndex] === 'custom-query' && customQueryPerLayer[layerIndex] !== null
  }, [currentRootSelection, rootCustomQuery, activeTilePerLayer, customQueryPerLayer, maxLayers])

  return {
    visibleLayers,
    activeTilePerLayer,
    generateTilesForLayer,
    handleTileSelection,
    handleRootTileSelection: handleRootTileSelectionFixed,
    showLayer,
    hideLayer,
    getNextExpandableLayer,
    resetLayers,
    currentRootSelection,
    handleRootCustomQuerySelection,
    handleLayerCustomQuerySelection,
    getCustomQuerySelection,
    isCustomQuerySelected
  }
} 