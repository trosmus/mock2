import { ExplorationTile } from '../store/appState'

// Available icons for tiles
const ICONS = [
  'AttachMoney', 'LocalShipping', 'Inventory', 'Speed', 'TrendingUp',
  'LocationOn', 'Category', 'Assessment', 'CheckCircle', 'Route',
  'Refresh', 'Warning', 'ReportProblem', 'Timeline', 'Analytics',
  'BarChart', 'PieChart', 'ShowChart', 'TrendingDown', 'AccountBalance'
]

// Available colors for tiles
const COLORS = [
  '#22c55e', '#8b5cf6', '#f59e0b', '#06b6d4', '#ef4444',
  '#3b82f6', '#f97316', '#84cc16', '#ec4899', '#6366f1',
  '#10b981', '#f59e0b', '#14b8a6', '#8b5cf6', '#f43f5e'
]

// Categories and their related terms
export const CATEGORIES = {
  revenue: {
    terms: ['Revenue', 'Sales', 'Income', 'Profit', 'Earnings', 'Growth', 'ROI', 'Margin', 'Turnover', 'Yield', 'Returns', 'Gains'],
    baseColor: '#22c55e'
  },
  shipping: {
    terms: ['Shipping', 'Delivery', 'Transport', 'Logistics', 'Routes', 'Carriers', 'Tracking', 'Freight', 'Distribution', 'Transit', 'Dispatch', 'Fulfillment'],
    baseColor: '#8b5cf6'
  },
  inventory: {
    terms: ['Inventory', 'Stock', 'Warehouse', 'Storage', 'Products', 'SKU', 'Turnover', 'Supplies', 'Assets', 'Holdings', 'Reserves', 'Materials'],
    baseColor: '#f59e0b'
  },
  performance: {
    terms: ['Performance', 'Metrics', 'KPI', 'Analytics', 'Efficiency', 'Quality', 'Speed', 'Productivity', 'Output', 'Throughput', 'Excellence', 'Optimization'],
    baseColor: '#06b6d4'
  },
  customers: {
    terms: ['Customers', 'Users', 'Retention', 'Satisfaction', 'Acquisition', 'Support', 'Engagement', 'Loyalty', 'Experience', 'Feedback', 'Relations', 'Service'],
    baseColor: '#ef4444'
  },
  operations: {
    terms: ['Operations', 'Process', 'Workflow', 'Automation', 'Tasks', 'Resources', 'Procedures', 'Systems', 'Management', 'Coordination', 'Execution', 'Control'],
    baseColor: '#3b82f6'
  }
}

interface TileGeneratorOptions {
  category?: keyof typeof CATEGORIES
  level?: number
  count?: number
  prefix?: string
  parentId?: string
  parentColor?: string
}

// Seeded random function for consistent tile generation
const seededRandom = (seed: string): number => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Convert to 0-1 range
  return Math.abs(hash) / 2147483648
}

// Generate multiple seeded random numbers
const generateSeededRandoms = (seed: string, count: number): number[] => {
  const randoms: number[] = []
  for (let i = 0; i < count; i++) {
    randoms.push(seededRandom(`${seed}-${i}`))
  }
  return randoms
}

export const generateTileData = (options: TileGeneratorOptions = {}): ExplorationTile[] => {
  const {
    category = 'revenue',
    level = 1,
    count = 4,
    prefix = '',
    parentId = '',
    parentColor
  } = options

  const categoryData = CATEGORIES[category]
  const tiles: ExplorationTile[] = []

  // Enhanced seed with multiple factors for better diversity
  const seed = parentId 
    ? `${parentId}-${category}-${level}-${prefix}` 
    : `root-${category}-${level}`
  
  // Generate more random numbers per tile for enhanced variety  
  const randoms = generateSeededRandoms(seed, count * 5) // 5 randoms per tile instead of 3

  // Create diverse base values per tile position to avoid clustering
  const levelBaseValues: Record<number, number[]> = {
    1: [1200000, 950000, 1100000, 850000], // Root level variety
    2: [120000, 95000, 110000, 85000],     // Layer 0 variety  
    3: [12000, 9500, 11000, 8500],         // Layer 1 variety
    4: [1200, 950, 1100, 850],             // Layer 2 variety
    5: [120, 95, 110, 85],                 // Layer 3 variety
    6: [12, 9.5, 11, 8.5]                  // Layer 4 variety
  }

  for (let i = 0; i < count; i++) {
    // Use seeded random for term selection instead of modulo cycling
    const termSeed = seededRandom(`${seed}-term-${i}`)
    const termIndex = Math.floor(termSeed * categoryData.terms.length)
    const term = categoryData.terms[termIndex]
    
    // Get diverse base values per tile position
    const baseValues = levelBaseValues[level] || [1000, 800, 900, 700]
    const baseValue = baseValues[i] || baseValues[0]
    
    // Add multiple variance factors for unique values
    const tileVariance = seededRandom(`${seed}-variance-${i}`)
    const positionMultiplier = 0.7 + (tileVariance * 0.6) // 0.7 to 1.3 range
    const randomMultiplier = randoms[i * 5] // Use first random of the 5 per tile
    const uniquenessBoost = seededRandom(`${seed}-unique-${i}-${term}`) * 0.4 // 0 to 0.4 range
    
    const value = Math.floor(
      randomMultiplier * baseValue * positionMultiplier * (1 + uniquenessBoost)
    ) + baseValue * 0.05

    // Format value based on type and magnitude
    let formattedValue: string
    if (category === 'revenue' && value > 1000) {
      formattedValue = `$${(value / 1000).toFixed(1)}K`
    } else if (category === 'revenue') {
      formattedValue = `$${value.toLocaleString()}`
    } else if (term.includes('Time') || term.includes('Speed')) {
      formattedValue = `${(value / 1000).toFixed(1)} days`
    } else if (term.includes('Rate') || term.includes('Efficiency')) {
      formattedValue = `${Math.min(99.9, (value / 1000)).toFixed(1)}%`
    } else {
      formattedValue = Math.floor(value / 100).toLocaleString()
    }

    // Generate change percentage using enhanced seeded random
    const changeRandom = randoms[i * 5 + 1]
    const changeVariance = randoms[i * 5 + 2] * 0.5 // Additional variance factor
    const changeValue = (changeRandom - 0.5) * 20 * (1 + changeVariance) // Enhanced range
    const isPositive = changeValue > 0
    const change = `${isPositive ? '+' : ''}${changeValue.toFixed(2)}%`

    // Select icon and color using enhanced seeded random
    const iconRandom = randoms[i * 5 + 3]
    const icon = ICONS[Math.floor(iconRandom * ICONS.length)]
    
    // Use parent color if provided, otherwise diverse color selection
    const colorRandom = randoms[i * 5 + 4]
    const color = parentColor || (i === 0 ? categoryData.baseColor : COLORS[Math.floor(colorRandom * COLORS.length)])

    // Generate rich content with more variety
    const descriptions = [
      'Key performance indicator tracking business success',
      'Critical metric for operational efficiency',
      'Strategic measurement for growth analysis', 
      'Essential data point for decision making',
      'Important benchmark for performance review',
      'Advanced analytics for strategic insights',
      'Real-time monitoring of business health',
      'Comprehensive view of operational metrics'
    ]
    
    const statusOptions: ('good' | 'warning' | 'critical')[] = ['good', 'good', 'good', 'warning', 'critical']
    const statusRandom = seededRandom(`${seed}-status-${i}`)
    const status = statusOptions[Math.floor(statusRandom * statusOptions.length)]
    
    // Generate diverse secondary values
    let secondaryValue: string
    const targetMultiplier = 1.05 + (tileVariance * 0.1) // 1.05 to 1.15 range
    if (category === 'revenue') {
      secondaryValue = `Target: $${Math.floor(value * targetMultiplier / 1000)}K`
    } else if (term.includes('Time') || term.includes('Speed')) {
      secondaryValue = `Target: ${(value / 1000 * 0.9).toFixed(1)} days`
    } else if (term.includes('Rate') || term.includes('Efficiency')) {
      secondaryValue = `Target: ${Math.min(100, (value / 1000 * targetMultiplier)).toFixed(1)}%`
    } else {
      secondaryValue = `vs Target: ${isPositive ? '+' : ''}${Math.floor(changeValue)}%`
    }
    
    // Generate last updated time with more variety
    const timeRandom = seededRandom(`${seed}-time-${i}`)
    const hoursAgo = Math.floor(timeRandom * 48) // 0-48 hours
    const lastUpdated = hoursAgo === 0 ? 'Just now' : 
                       hoursAgo < 24 ? `${hoursAgo}h ago` : 
                       `${Math.floor(hoursAgo / 24)}d ago`

    // Generate unique ID with enhanced entropy
    const id = parentId ? `${parentId}-${term.toLowerCase()}-${i}` : `${category}-${term.toLowerCase()}-${i}`

    tiles.push({
      id,
      title: prefix ? `${prefix} ${term}` : term,
      value: formattedValue,
      change,
      isPositive,
      icon,
      color,
      description: descriptions[Math.floor(tileVariance * descriptions.length)],
      secondaryValue,
      status,
      lastUpdated,
      target: secondaryValue,
      // Add enhanced content for some tiles with more variety
      enhancedContent: i === 0 ? {
        type: 'text',
        data: {
          text: `This ${term.toLowerCase()} metric represents a critical performance indicator for your business operations. The current trend shows ${isPositive ? 'positive' : 'negative'} momentum with ${Math.abs(changeValue).toFixed(1)}% variance.`,
          bullets: [
            `Current performance: ${isPositive ? 'Above' : 'Below'} expectations by ${Math.abs(changeValue).toFixed(1)}%`,
            `Trend analysis: ${isPositive ? 'Improvement' : 'Decline'} trending ${Math.abs(changeValue) > 5 ? 'strongly' : 'moderately'}`,
            `Impact level: ${status === 'good' ? 'High' : status === 'warning' ? 'Medium' : 'Low'} priority for immediate action`,
            `Forecast: ${isPositive ? 'Continued growth expected' : 'Intervention recommended'}`
          ]
        }
      } : i === 1 ? {
        type: 'table',
        data: {
          rows: [
            { label: 'Current', value: formattedValue, color: color },
            { label: 'Target', value: secondaryValue.split(': ')[1] || 'N/A', color: '#06b6d4' },
            { label: 'Change', value: change, color: isPositive ? '#22c55e' : '#ef4444' },
            { label: 'Status', value: status.charAt(0).toUpperCase() + status.slice(1), color: status === 'good' ? '#22c55e' : status === 'warning' ? '#f59e0b' : '#ef4444' },
            { label: 'Updated', value: lastUpdated, color: '#6b7280' }
          ]
        }
      } : i === 2 ? {
        type: 'chart',
        data: {
          title: 'Performance Trend',
          chartType: tileVariance > 0.5 ? 'bar' : 'line',
          values: [0.8, 0.9, 1.0, 1.1, 1.0, 0.95, 1.0].map(v => v * Math.abs(changeValue) + (tileVariance * 5)),
          labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7']
        }
      } : undefined
    })
  }

  return tiles
}

export const generateExplorationLayers = (rootCategory: keyof typeof CATEGORIES, maxLevels: number = 4) => {
  const layers: ExplorationTile[][] = []
  
  // Generate root layer
  const rootTiles = generateTileData({ category: rootCategory, level: 1, count: 4 })
  layers.push(rootTiles)
  
  // Get the root tile color for inheritance
  const rootTileColor = rootTiles[0]?.color || CATEGORIES[rootCategory].baseColor
  
  // Generate subsequent layers for each root tile
  for (let level = 2; level <= maxLevels; level++) {
    const layerTiles: ExplorationTile[] = []
    
    // For each tile in the previous layer, we could generate sub-tiles
    // For simplicity, we'll generate tiles for the first tile of the previous layer
    const parentTile = layers[level - 2][0] // First tile from previous layer
    
    const subTiles = generateTileData({
      category: rootCategory,
      level,
      count: 4,
      prefix: level === 2 ? 'Detailed' : level === 3 ? 'Advanced' : 'Deep',
      parentId: parentTile.id,
      parentColor: rootTileColor
    })
    
    layerTiles.push(...subTiles)
    layers.push(layerTiles)
  }
  
  return layers
}

// Pre-generated exploration data for different categories
export const EXPLORATION_LAYERS = {
  revenue: generateExplorationLayers('revenue'),
  shipping: generateExplorationLayers('shipping'),
  inventory: generateExplorationLayers('inventory'),
  performance: generateExplorationLayers('performance'),
  customers: generateExplorationLayers('customers'),
  operations: generateExplorationLayers('operations')
} 