interface InsightData {
  title: string
  type: 'chart' | 'metric' | 'ai-text'
  data: any
}

interface InsightSet {
  topLeft: InsightData
  topRight: InsightData
  bottomLeft: InsightData
  bottomRight: InsightData
}

// Simple trend data generator
const generateTrendData = (baseValue: number, periods: number = 12) => {
  const data = []
  let current = baseValue
  for (let i = 0; i < periods; i++) {
    const trend = Math.sin(i * 0.5) * 0.05 + 0.03
    const noise = (Math.random() - 0.5) * 0.1
    current = current * (1 + trend + noise)
    data.push(Math.round(current))
  }
  return data
}

// Contextual insight generators
const generateContextualInsights = (
  rootSelection: string | null,
  activeTiles: (string | null)[],
  insightType: 'performance' | 'trends' | 'opportunities' | 'risks'
) => {
  const context = rootSelection || 'general'
  const depth = activeTiles.filter(Boolean).length

  const insightTemplates = {
    performance: [
      `${context} metrics show 23% improvement over baseline when analyzed across ${depth + 1} dimensional factors.`,
      `Performance analysis reveals ${context} operates at 89% efficiency during peak hours.`,
      `${context} demonstrates consistent performance with 94% accuracy rate across all measured parameters.`,
      `Statistical analysis shows ${context} performance follows predictable patterns with measurable improvements.`
    ],
    trends: [
      `Trend analysis suggests ${context} will experience 18% growth in the next quarter based on current trajectory.`,
      `${context} shows strong upward trend with 27% improvement over the previous period.`,
      `Data indicates ${context} volatility decreased by 42% following recent optimization initiatives.`,
      `Current trends show ${context} is performing above industry benchmarks with steady growth patterns.`
    ],
    opportunities: [
      `Analysis identifies ${context} has 34% untapped potential in secondary market segments.`,
      `${context} could achieve 28% efficiency gains through targeted process improvements.`,
      `Market analysis reveals ${context} optimization opportunities worth estimated $2.3M annually.`,
      `Performance data suggests ${context} could reduce operational costs by 19% through strategic improvements.`
    ],
    risks: [
      `Risk assessment identifies ${context} exposure to seasonal fluctuations with 23% impact potential.`,
      `Monitoring systems flagged ${context} performance variations requiring proactive management.`,
      `Analysis indicates ${context} maintains resilience above 85% confidence threshold.`,
      `Predictive analysis suggests ${context} requires attention in 6-8 week timeframe for optimal performance.`
    ]
  }

  return insightTemplates[insightType].slice(0, Math.min(4, depth + 2))
}

// Simplified insight pools with only 4 chart types: line, bar, pie, scatter
const SIMPLIFIED_INSIGHTS_POOL: InsightSet[] = [
  // Simple Insight Set 1: Basic Performance
  {
    topLeft: {
      title: 'Performance Trends',
      type: 'chart',
      data: {
        type: 'bar',
        values: [85, 92, 78, 95, 88, 75, 100],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    },
    topRight: {
      title: 'Key Performance Metrics',
      type: 'metric',
      data: {
        primary: '94.2%',
        label: 'Overall Efficiency',
        breakdown: [
          { label: 'Processing Speed', value: '97%', color: '#22c55e' },
          { label: 'Accuracy Rate', value: '94%', color: '#06b6d4' },
          { label: 'Customer Satisfaction', value: '91%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Performance Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Performance peaked on Sunday with 100% efficiency, indicating optimal resource allocation.',
          'The 25% dip on Saturday suggests opportunity for weekend process optimization.',
          'Current trend shows 12% improvement over last month driven by enhanced protocols.',
          'Recommend maintaining Sunday operational patterns for consistent high performance.'
        ]
      }
    },
    bottomRight: {
      title: 'Efficiency Distribution',
      type: 'chart',
      data: {
        type: 'pie',
        values: [45, 35, 15, 5],
        labels: ['Optimal', 'Good', 'Average', 'Poor'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    }
  },

  // Simple Insight Set 2: Regional Analysis
  {
    topLeft: {
      title: 'Regional Performance',
      type: 'chart',
      data: {
        type: 'pie',
        values: [35, 28, 18, 12, 7],
        labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Other'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444']
      }
    },
    topRight: {
      title: 'Market Metrics',
      type: 'metric',
      data: {
        primary: '$2.4M',
        label: 'Total Market Value',
        breakdown: [
          { label: 'Primary Markets', value: '$1.8M', color: '#22c55e' },
          { label: 'Secondary Markets', value: '$450K', color: '#06b6d4' },
          { label: 'Emerging Markets', value: '$150K', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Market Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'North America leads with 35% market share showing strong growth potential.',
          'Europe maintains steady 28% performance with opportunities for expansion.',
          'Asia Pacific represents 18% with highest growth rate among all regions.',
          'Latin America shows emerging 12% demand patterns aligned with our capabilities.'
        ]
      }
    },
    bottomRight: {
      title: 'Growth Trends',
      type: 'chart',
      data: {
        type: 'line',
        values: generateTrendData(120, 7),
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Simple Insight Set 3: Customer Behavior
  {
    topLeft: {
      title: 'Customer Segments',
      type: 'chart',
      data: {
        type: 'pie',
        values: [40, 30, 20, 10],
        labels: ['Highly Engaged', 'Moderately Engaged', 'Low Engagement', 'Inactive'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Customer Metrics',
      type: 'metric',
      data: {
        primary: '12,847',
        label: 'Active Customers',
        breakdown: [
          { label: 'New Customers', value: '2,156', color: '#22c55e' },
          { label: 'Returning Customers', value: '8,934', color: '#06b6d4' },
          { label: 'VIP Customers', value: '1,757', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Customer Insights',
      type: 'ai-text',
      data: {
        insights: [
          'Highly engaged customers represent 40% of base with 65% higher lifetime value.',
          'New customer acquisition improved 18% through optimized onboarding processes.',
          'VIP customers contribute 38% of total revenue despite being 14% of customer base.',
          'Customer engagement scores show strong correlation with seasonal purchasing patterns.'
        ]
      }
    },
    bottomRight: {
      title: 'Engagement Timeline',
      type: 'chart',
      data: {
        type: 'bar',
        values: [68, 72, 65, 78, 82, 75, 85],
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
      }
    }
  },

  // Simple Insight Set 4: Quality Analysis
  {
    topLeft: {
      title: 'Quality Score Distribution',
      type: 'chart',
      data: {
        type: 'pie',
        values: [65, 25, 8, 2],
        labels: ['Excellent', 'Good', 'Average', 'Poor'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Quality Metrics',
      type: 'metric',
      data: {
        primary: '4.2/5.0',
        label: 'Average Quality Rating',
        breakdown: [
          { label: '5-Star Ratings', value: '45%', color: '#22c55e' },
          { label: '4-Star Ratings', value: '35%', color: '#06b6d4' },
          { label: '3-Star Ratings', value: '15%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Quality Insights',
      type: 'ai-text',
      data: {
        insights: [
          'Quality scores improved 12% after implementing automated quality checkpoints.',
          'Poor ratings (2%) mainly result from delivery timing rather than product quality.',
          'Excellent ratings correlate with products processed during optimal capacity windows.',
          'Focus on consistency training for 8% average-rated processes shows promising results.'
        ]
      }
    },
    bottomRight: {
      title: 'Quality Trends',
      type: 'chart',
      data: {
        type: 'line',
        values: [3.8, 4.0, 3.9, 4.1, 4.3, 4.2, 4.4],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Simple Insight Set 5: Cost Analysis
  {
    topLeft: {
      title: 'Cost Breakdown',
      type: 'chart',
      data: {
        type: 'pie',
        values: [45, 25, 15, 10, 5],
        labels: ['Operations', 'Labor', 'Materials', 'Transport', 'Other'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444']
      }
    },
    topRight: {
      title: 'Cost Metrics',
      type: 'metric',
      data: {
        primary: '$3.24',
        label: 'Cost per Unit',
        breakdown: [
          { label: 'Direct Costs', value: '$2.45', color: '#22c55e' },
          { label: 'Indirect Costs', value: '$0.59', color: '#06b6d4' },
          { label: 'Overhead', value: '$0.20', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Cost Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Operations costs dominate at 45% but show 8% reduction potential through automation.',
          'Labor costs remain stable with opportunities for efficiency through cross-training.',
          'Material costs fluctuate seasonally - strategic sourcing could reduce volatility.',
          'Transport optimization could yield $0.15 per unit savings through route consolidation.'
        ]
      }
    },
    bottomRight: {
      title: 'Cost Trends',
      type: 'chart',
      data: {
        type: 'bar',
        values: [3.45, 3.38, 3.52, 3.24, 3.18, 3.31, 3.15],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Simple Insight Set 6: Workforce Analysis
  {
    topLeft: {
      title: 'Team Performance',
      type: 'chart',
      data: {
        type: 'pie',
        values: [35, 40, 20, 5],
        labels: ['High Performers', 'Solid Contributors', 'Developing', 'Needs Support'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Workforce Metrics',
      type: 'metric',
      data: {
        primary: '87%',
        label: 'Employee Satisfaction',
        breakdown: [
          { label: 'Engagement Score', value: '89%', color: '#22c55e' },
          { label: 'Retention Rate', value: '92%', color: '#06b6d4' },
          { label: 'Skill Development', value: '78%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Workforce Development',
      type: 'ai-text',
      data: {
        insights: [
          'High performers at 35% concentration drive exceptional team productivity levels.',
          'Employee satisfaction at 87% correlates directly with 92% retention rate.',
          'Skill development programs show 78% participation with measurable impact on performance.',
          'Targeted support for 5% struggling employees could improve overall team performance by 8%.'
        ]
      }
    },
    bottomRight: {
      title: 'Productivity Trends',
      type: 'chart',
      data: {
        type: 'line',
        values: [82, 85, 87, 89, 91, 88, 93],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Sophisticated Insight Set 1: Advanced Performance with Scatter
  {
    topLeft: {
      title: 'Performance vs Efficiency',
      type: 'chart',
      data: {
        type: 'scatter',
        datasets: [
          {
            name: 'Current Period',
            data: [
              { x: 85, y: 92, label: 'Process A' },
              { x: 78, y: 87, label: 'Process B' },
              { x: 92, y: 79, label: 'Process C' },
              { x: 65, y: 94, label: 'Process D' },
              { x: 89, y: 68, label: 'Process E' }
            ],
            color: '#22c55e'
          }
        ],
        xAxis: 'Performance Score',
        yAxis: 'Efficiency Rating'
      }
    },
    topRight: {
      title: 'Advanced Performance Metrics',
      type: 'metric',
      data: {
        primary: '94.2%',
        label: 'Composite Performance Score',
        trend: '+12.4%',
        trendDirection: 'up',
        breakdown: [
          { label: 'Processing Speed', value: '97%', change: '+8.2%', color: '#22c55e' },
          { label: 'Accuracy Rate', value: '94%', change: '+3.1%', color: '#06b6d4' },
          { label: 'Resource Efficiency', value: '91%', change: '+15.7%', color: '#f59e0b' },
          { label: 'Customer Satisfaction', value: '88%', change: '+7.3%', color: '#8b5cf6' }
        ]
      }
    },
    bottomLeft: {
      title: 'Advanced Performance Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Performance analysis identifies optimal efficiency windows between 2-4 PM with 34% higher success rates.',
          'Cross-process correlation shows 89% accuracy in predicting peak performance based on resource patterns.',
          'Advanced modeling suggests dynamic load balancing could improve overall performance by 23% within 6 weeks.',
          'Process optimization has yielded 300% ROI through reduced operational overhead and improved efficiency.',
          'Performance benchmarking places current operations in top 10% of industry standards.'
        ]
      }
    },
    bottomRight: {
      title: 'Performance Timeline',
      type: 'chart',
      data: {
        type: 'line',
        values: generateTrendData(85, 12),
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
  },

  // Sophisticated Insight Set 2: Market Intelligence with Scatter
  {
    topLeft: {
      title: 'Market Position Analysis',
      type: 'chart',
      data: {
        type: 'scatter',
        datasets: [
          {
            name: 'Market Segments',
            data: [
              { x: 85, y: 92, label: 'Premium Segment' },
              { x: 78, y: 87, label: 'Standard Segment' },
              { x: 92, y: 79, label: 'Budget Segment' },
              { x: 65, y: 94, label: 'Emerging Segment' },
              { x: 89, y: 68, label: 'Specialty Segment' }
            ],
            color: '#06b6d4'
          }
        ],
        xAxis: 'Market Attractiveness',
        yAxis: 'Competitive Strength'
      }
    },
    topRight: {
      title: 'Market Intelligence',
      type: 'metric',
      data: {
        primary: '$4.2M',
        label: 'Total Addressable Market',
        trend: '+28.4%',
        trendDirection: 'up',
        breakdown: [
          { label: 'Current Penetration', value: '23%', change: '+5.2%', color: '#22c55e' },
          { label: 'Growth Rate', value: '28%', change: '+12.1%', color: '#06b6d4' },
          { label: 'Market Share', value: '67%', change: '+8.9%', color: '#f59e0b' },
          { label: 'Customer Acquisition', value: '84%', change: '+15.3%', color: '#8b5cf6' }
        ]
      }
    },
    bottomLeft: {
      title: 'Strategic Market Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Market modeling indicates 42% expansion opportunity in untapped segments with high conversion probability.',
          'Competitive analysis reveals market gap worth $1.8M in adjacent product categories.',
          'Consumer behavior analytics show 67% preference shift toward our value proposition over 18 months.',
          'Market timing analysis suggests optimal launch window for new initiatives in Q3 with 89% success probability.',
          'Cross-market studies identify 3 high-potential regions with 156% growth rates and minimal competition.'
        ]
      }
    },
    bottomRight: {
      title: 'Market Growth Trends',
      type: 'chart',
      data: {
        type: 'bar',
        values: [120, 135, 158, 142, 178, 195, 210],
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3']
      }
    }
  }
]

// Generate contextual insights based on exploration state
export const generateDynamicInsights = (
  currentRootSelection: string | null,
  activeTilePerLayer: (string | null)[],
  visibleLayers: boolean[]
): InsightSet => {
  // Enhanced contextual insight generation
  const explorationContext = {
    selection: currentRootSelection,
    depth: activeTilePerLayer.filter(Boolean).length,
    layers: visibleLayers.filter(Boolean).length
  }

  // Dynamic insight enhancement based on context
  const baseInsights = SIMPLIFIED_INSIGHTS_POOL[
    Math.abs(JSON.stringify(explorationContext).split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % SIMPLIFIED_INSIGHTS_POOL.length
  ]

  // Enhance AI text insights with contextual information
  const enhancedInsights = {
    ...baseInsights,
    bottomLeft: {
      ...baseInsights.bottomLeft,
      data: {
        ...baseInsights.bottomLeft.data,
        insights: generateContextualInsights(
          currentRootSelection,
          activeTilePerLayer,
          'performance'
        )
      }
    }
  }

  return enhancedInsights
}

// Get contextual subtitle based on current exploration
export const getExplorationSubtitle = (
  currentRootSelection: string | null,
  activeTilePerLayer: (string | null)[],
  visibleLayers: boolean[]
): string => {
  const activeLayerCount = visibleLayers.filter(Boolean).length
  const selectedTileCount = activeTilePerLayer.filter(Boolean).length
  
  if (!currentRootSelection) {
    return 'Choose a metric from the first row to begin exploring detailed insights'
  }
  
  if (activeLayerCount === 0) {
    return `Selected ${currentRootSelection.replace('-', ' ')} - Click + to explore deeper metrics`
  }
  
  if (selectedTileCount === 0) {
    return `Viewing ${currentRootSelection.replace('-', ' ')} details - Select tiles to focus analysis`
  }
  
  const explorationDepth = selectedTileCount + 1
  return `Exploring ${explorationDepth} levels deep - Insights update with each selection`
} 