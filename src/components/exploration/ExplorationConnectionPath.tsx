import React, { useRef, useEffect, useState } from 'react'
import { Box } from '@mui/material'

interface ExplorationConnectionPathProps {
  showSubTiles: boolean
  currentRootTileId: string | null
  currentSubTileId: string | null
  connectionColor: string
  containerRef: React.RefObject<HTMLDivElement>
  activeTilePerLayer?: (string | null)[]
  visibleLayers?: boolean[]
}

export const ExplorationConnectionPath: React.FC<ExplorationConnectionPathProps> = ({
  showSubTiles,
  currentRootTileId,
  currentSubTileId,
  connectionColor,
  containerRef,
  activeTilePerLayer = [],
  visibleLayers = []
}) => {
  const [connectionPaths, setConnectionPaths] = useState<string[]>([])
  const [connectionPoints, setConnectionPoints] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    if (!containerRef.current) {
      setConnectionPaths([])
      setConnectionPoints([])
      return
    }

    // Get all active tiles across all layers
    const getActiveConnections = () => {
      const connections: { fromId: string; toId: string }[] = []
      
      // Helper function to convert state ID to display ID for custom queries
      const getDisplayId = (stateId: string, isRoot: boolean = false, layerIndex?: number): string => {
        if (stateId === 'custom-query') {
          if (isRoot) {
            return 'custom-query-root'
          } else if (layerIndex !== undefined) {
            return `custom-query-layer-${layerIndex}`
          }
        }
        return stateId
      }
      
      // If we have the new layer system, use that
      if (activeTilePerLayer.length > 0 && visibleLayers.length > 0) {
        // First, check for connection from root tile to layer 0
        if (currentRootTileId && visibleLayers[0]) {
          const layer0ActiveTile = activeTilePerLayer[0]
          if (layer0ActiveTile) {
            // Connection from root tile to active tile in layer 0
            const fromDisplayId = getDisplayId(currentRootTileId, true)
            const toDisplayId = getDisplayId(layer0ActiveTile, false, 0)
            connections.push({ fromId: fromDisplayId, toId: toDisplayId })
          }
        }
        
        // Then check for connections between layers
        for (let i = 0; i < activeTilePerLayer.length - 1; i++) {
          const currentTile = activeTilePerLayer[i]
          const nextLayerVisible = visibleLayers[i + 1]
          const nextTile = activeTilePerLayer[i + 1]
          
          if (currentTile && nextLayerVisible && nextTile) {
            const fromDisplayId = getDisplayId(currentTile, false, i)
            const toDisplayId = getDisplayId(nextTile, false, i + 1)
            connections.push({ fromId: fromDisplayId, toId: toDisplayId })
          }
        }
      } else {
        // Fallback to the old system
        if (showSubTiles && currentRootTileId && currentSubTileId) {
          const fromDisplayId = getDisplayId(currentRootTileId, true)
          const toDisplayId = getDisplayId(currentSubTileId, false, 0)
          connections.push({ fromId: fromDisplayId, toId: toDisplayId })
        }
      }
      
      return connections
    }

    const connections = getActiveConnections()
    
    if (connections.length === 0) {
      setConnectionPaths([])
      setConnectionPoints([])
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const newPaths: string[] = []
    const newPoints: { x: number; y: number }[] = []

    connections.forEach(({ fromId, toId }) => {
      const fromElement = containerRef.current?.querySelector(`[data-tile-id="${fromId}"]`) as HTMLElement
      const toElement = containerRef.current?.querySelector(`[data-tile-id="${toId}"]`) as HTMLElement

      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect()
        const toRect = toElement.getBoundingClientRect()

        // Calculate relative positions
        const startX = fromRect.left + fromRect.width / 2 - containerRect.left
        const startY = fromRect.bottom - containerRect.top
        const endX = toRect.left + toRect.width / 2 - containerRect.left
        const endY = toRect.top - containerRect.top

        // Check if tiles are in the same column
        const xDifference = Math.abs(startX - endX)
        const sameColumnThreshold = 50
        const isInSameColumn = xDifference <= sameColumnThreshold

        // Store points for dots
        newPoints.push({ x: startX, y: startY })
        newPoints.push({ x: endX, y: endY })

        // Create path
        let path = `M ${startX} ${startY}`
        
        if (isInSameColumn) {
          // Straight vertical line
          path += ` L ${endX} ${endY}`
        } else {
          // Curved path
          const midY = startY + (endY - startY) / 2
          const cornerRadius = 12
          
          // First vertical segment
          path += ` L ${startX} ${midY - cornerRadius}`
          
          // Curved corner and horizontal segment
          if (endX > startX) {
            path += ` Q ${startX} ${midY} ${startX + cornerRadius} ${midY}`
            path += ` L ${endX - cornerRadius} ${midY}`
            path += ` Q ${endX} ${midY} ${endX} ${midY + cornerRadius}`
          } else {
            path += ` Q ${startX} ${midY} ${startX - cornerRadius} ${midY}`
            path += ` L ${endX + cornerRadius} ${midY}`
            path += ` Q ${endX} ${midY} ${endX} ${midY + cornerRadius}`
          }
          
          // Final vertical segment
          path += ` L ${endX} ${endY}`
        }
        
        newPaths.push(path)
      }
    })

    setConnectionPaths(newPaths)
    setConnectionPoints(newPoints)
  }, [showSubTiles, currentRootTileId, currentSubTileId, containerRef, activeTilePerLayer, visibleLayers])

  if (connectionPaths.length === 0) return null

  return (
    <>
      {/* Connection Paths SVG */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Render all connection paths */}
        {connectionPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke={connectionColor}
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
        ))}
        
        {/* Render connection dots */}
        {connectionPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={connectionColor}
            opacity="0.8"
          />
        ))}
      </svg>
    </>
  )
} 