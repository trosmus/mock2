import { signal } from '@preact/signals-react'

// Common UI state
export const isDrawerExpanded = signal<boolean>(true)

export const setIsDrawerExpanded = (expanded: boolean) => {
  isDrawerExpanded.value = expanded
}

// File upload state
export interface UploadedFile {
  name: string
  size: number
  type: string
}

// Progressive Exploration System
export interface ExplorationTile {
  id: string
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: string
  color: string
  children?: ExplorationTile[]
  description?: string
  secondaryValue?: string
  status?: 'good' | 'warning' | 'critical'
  lastUpdated?: string
  target?: string
  // Enhanced content for wizard mode
  enhancedContent?: {
    type: 'text' | 'table' | 'chart'
    data: any
  }
}

export interface ExplorationLevel {
  tiles: ExplorationTile[]
  insights: {
    left: {
      title: string
      type: 'chart' | 'metric'
      data: any
    }
    right: {
      title: string
      type: 'chart' | 'metric'
      data: any
    }
  }
}

export const currentExplorationPath = signal<string[]>([])
export const explorationHistory = signal<ExplorationLevel[]>([])

// Helper functions for exploration navigation
export const navigateToExploration = (tileId: string) => {
  const newPath = [...currentExplorationPath.value, tileId]
  currentExplorationPath.value = newPath
  
  addTrailStep({
    title: `Exploring ${tileId}`,
    type: 'explore',
    description: `Deep dive into ${tileId} analytics`,
  })
}

export const navigateBackInExploration = (level: number = -1) => {
  if (level === -1) {
    // Go back one level
    const newPath = currentExplorationPath.value.slice(0, -1)
    currentExplorationPath.value = newPath
  } else {
    // Go to specific level
    const newPath = currentExplorationPath.value.slice(0, level + 1)
    currentExplorationPath.value = newPath
  }
}

export const resetExploration = () => {
  currentExplorationPath.value = []
}

// Global state signals
export const uploadedFiles = signal<UploadedFile[]>([])

// Dashboard builder state
export interface DashboardCard {
  id: string
  title: string
  value: string
  description: string
  icon: string
  type: 'metric' | 'chart' | 'table'
  color: string
}

export const customDashboardCards = signal<DashboardCard[]>([])

// AI Agent state
export interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const chatMessages = signal<ChatMessage[]>([])
export const isAITyping = signal<boolean>(false)

// Trail state
export interface TrailStep {
  id: string
  title: string
  type: 'upload' | 'dashboard' | 'explore' | 'explorer' | 'builder' | 'trail' | 'agent'
  timestamp: Date
  path?: string
  description?: string
  isCurrentLocation?: boolean
}

export const explorationTrail = signal<TrailStep[]>([])

// Add trail step helper
export const addTrailStep = (step: Omit<TrailStep, 'timestamp' | 'id'>) => {
  const newStep: TrailStep = {
    ...step,
    id: Date.now().toString(),
    timestamp: new Date(),
  }
  
  // Mark all previous steps as not current
  explorationTrail.value = explorationTrail.value.map(s => ({
    ...s,
    isCurrentLocation: false
  }))
  
  // Add new step as current
  explorationTrail.value = [...explorationTrail.value, { ...newStep, isCurrentLocation: true }]
} 