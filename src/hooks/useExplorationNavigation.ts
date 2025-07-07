import { useState, useEffect } from 'react'
import { 
  currentExplorationPath, 
  addTrailStep, 
  resetExploration 
} from '../store/appState'
import { getExplorationLevel } from '../data/explorationData'

export const useExplorationNavigation = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [showSubTiles, setShowSubTiles] = useState<boolean>(false)

  useEffect(() => {
    // Reset exploration on mount
    resetExploration()
    
    // Initialize current path from signal
    setCurrentPath([...currentExplorationPath.value])
  }, [])

  const currentLevel = getExplorationLevel(currentPath.length > 0 ? [currentPath[0]] : [])
  const rootLevel = getExplorationLevel([])

  const handleTileClick = (tileId: string, level: 'root' | 'sub' = 'root') => {
    if (level === 'root') {
      // Root level tile clicked
      if (currentPath.length > 0 && currentPath[0] === tileId) {
        // Clicking the same root tile - deselect it (go back to root)
        const newPath: string[] = []
        setCurrentPath(newPath)
        setShowSubTiles(false)
        currentExplorationPath.value = newPath
        
        addTrailStep({
          title: 'Explorer',
          type: 'explore',
          description: 'Returned to root level',
        })
      } else {
        // Clicking a different root tile - select it (show insights by default)
        const newPath = [tileId]
        setCurrentPath(newPath)
        setShowSubTiles(false) // Reset to show insights, not sub-tiles
        currentExplorationPath.value = newPath
        
        addTrailStep({
          title: `Exploring ${tileId}`,
          type: 'explore',
          description: `Viewing insights for ${tileId}`,
        })
      }
    } else {
      // Sub-level tile clicked - only change selection, don't change data
      if (currentPath.length === 2 && currentPath[1] === tileId) {
        // Clicking the same sub-level tile - deselect it (stay at level 1, show same tiles)
        const newPath = [currentPath[0]]
        setCurrentPath(newPath)
        currentExplorationPath.value = newPath
        
        addTrailStep({
          title: `Deselected ${tileId}`,
          type: 'explore',
          description: 'Cleared sub-level selection',
        })
      } else {
        // Clicking a different sub-level tile - select it (stay at level 1, show same tiles)
        const newPath = [currentPath[0], tileId]
        setCurrentPath(newPath)
        currentExplorationPath.value = newPath
        
        addTrailStep({
          title: `Selected ${tileId}`,
          type: 'explore',
          description: `Focused on ${tileId} details`,
        })
      }
    }
  }

  const handleDrillDeeper = (tileId: string) => {
    // Toggle sub-tiles view for the selected tile
    if (currentPath[0] === tileId) {
      setShowSubTiles(!showSubTiles)
      
      addTrailStep({
        title: showSubTiles ? `Collapsed ${tileId} details` : `Expanded ${tileId} details`,
        type: 'explore',
        description: showSubTiles ? 'Showing insights view' : 'Showing detailed metrics',
      })
    }
  }

  const isAtRoot = currentPath.length === 0
  const currentRootTileId = currentPath.length > 0 ? currentPath[0] : null
  const currentSubTileId = currentPath.length > 1 ? currentPath[1] : null

  return {
    currentPath,
    currentLevel,
    rootLevel,
    isAtRoot,
    currentRootTileId,
    currentSubTileId,
    showSubTiles,
    handleTileClick,
    handleDrillDeeper
  }
} 