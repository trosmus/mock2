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

// Pool of 15 different insight sets that can be randomly selected
const INSIGHTS_POOL: InsightSet[] = [
  // Insight Set 1: Performance Analytics
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
      title: 'AI Performance Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Performance peaked on Thursday with 95% efficiency, indicating optimal resource allocation during mid-week operations.',
          'The 25% dip on Saturday suggests opportunity for weekend process optimization.',
          'Current trend shows 12% improvement over last month, driven by enhanced processing speed protocols.',
          'Recommend maintaining Thursday operational patterns for consistent high performance.'
        ]
      }
    },
    bottomRight: {
      title: 'Efficiency Distribution',
      type: 'chart',
      data: {
        type: 'donut',
        values: [45, 35, 15, 5],
        labels: ['Optimal', 'Good', 'Average', 'Poor'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    }
  },

  // Insight Set 2: Regional Analytics
  {
    topLeft: {
      title: 'Regional Distribution',
      type: 'chart',
      data: {
        type: 'donut',
        values: [35, 28, 18, 12, 7],
        labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Other'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444']
      }
    },
    topRight: {
      title: 'Market Penetration',
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
      title: 'Regional Growth Opportunities',
      type: 'ai-text',
      data: {
        insights: [
          'North America shows strong 35% market share with potential for 15% growth in Q4.',
          'Asia Pacific presents the highest growth opportunity with 28% untapped market potential.',
          'Europe maintains steady performance but could benefit from localized product offerings.',
          'Latin America shows emerging demand patterns that align with our core competencies.'
        ]
      }
    },
    bottomRight: {
      title: 'Market Trends',
      type: 'chart',
      data: {
        type: 'bar',
        values: [120, 135, 118, 142, 158, 145, 165],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 3: Customer Behavior
  {
    topLeft: {
      title: 'Customer Engagement',
      type: 'chart',
      data: {
        type: 'donut',
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
      title: 'Customer Behavior Insights',
      type: 'ai-text',
      data: {
        insights: [
          'Highly engaged customers show 65% higher lifetime value and 40% better retention rates.',
          'New customer acquisition cost decreased by 18% through optimized onboarding processes.',
          'VIP customers represent 14% of base but contribute 38% of total revenue.',
          'Customer engagement scores correlate strongly with seasonal purchasing patterns.'
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

  // Insight Set 4: Quality Analysis
  {
    topLeft: {
      title: 'Quality Distribution',
      type: 'chart',
      data: {
        type: 'donut',
        values: [65, 25, 8, 2],
        labels: ['Excellent', 'Good', 'Average', 'Poor'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Quality Score',
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
      title: 'Quality Improvement Recommendations',
      type: 'ai-text',
      data: {
        insights: [
          'Quality scores improved 12% after implementing automated quality checkpoints.',
          'Poor ratings (2%) mainly stem from delivery issues rather than product quality.',
          'Excellent ratings correlate with products processed during optimal capacity windows.',
          'Recommendation: Focus on consistency training for 8% average-rated processes.'
        ]
      }
    },
    bottomRight: {
      title: 'Quality Trends',
      type: 'chart',
      data: {
        type: 'bar',
        values: [3.8, 4.0, 3.9, 4.1, 4.3, 4.2, 4.4],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 5: Cost Efficiency
  {
    topLeft: {
      title: 'Cost Breakdown',
      type: 'chart',
      data: {
        type: 'bar',
        values: [45, 25, 15, 10, 5],
        labels: ['Operations', 'Labor', 'Materials', 'Transport', 'Other']
      }
    },
    topRight: {
      title: 'Cost Efficiency',
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
      title: 'Cost Optimization Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Operations costs dominate at 45% but show 8% reduction potential through automation.',
          'Labor costs stable but could benefit from cross-training initiatives.',
          'Material costs fluctuate seasonally - hedging strategies could reduce volatility by 12%.',
          'Transport optimization could yield $0.15 per unit savings with route consolidation.'
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

  // Insight Set 6: Risk Assessment
  {
    topLeft: {
      title: 'Risk Assessment',
      type: 'chart',
      data: {
        type: 'donut',
        values: [60, 25, 10, 5],
        labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
        colors: ['#22c55e', '#f59e0b', '#ff6b35', '#ef4444']
      }
    },
    topRight: {
      title: 'Risk Factors',
      type: 'metric',
      data: {
        primary: '2.3/10',
        label: 'Risk Score',
        breakdown: [
          { label: 'Operational Risk', value: '1.8', color: '#22c55e' },
          { label: 'Financial Risk', value: '2.1', color: '#f59e0b' },
          { label: 'Market Risk', value: '3.2', color: '#ff6b35' },
        ]
      }
    },
    bottomLeft: {
      title: 'Risk Mitigation Strategy',
      type: 'ai-text',
      data: {
        insights: [
          'Overall risk profile is low with 60% of operations in low-risk category.',
          'Market risk elevated due to seasonal demand fluctuations - diversification recommended.',
          'Financial risk well-managed with strong cash flow and reserve ratios.',
          'Operational risk decreased 15% through improved process standardization.'
        ]
      }
    },
    bottomRight: {
      title: 'Risk Timeline',
      type: 'chart',
      data: {
        type: 'bar',
        values: [2.8, 2.5, 2.7, 2.3, 2.1, 2.4, 2.0],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 7: Innovation Pipeline
  {
    topLeft: {
      title: 'Innovation Pipeline',
      type: 'chart',
      data: {
        type: 'bar',
        values: [25, 35, 20, 15, 5],
        labels: ['Concept', 'Development', 'Testing', 'Launch', 'Scale']
      }
    },
    topRight: {
      title: 'Innovation Metrics',
      type: 'metric',
      data: {
        primary: '23',
        label: 'Active Projects',
        breakdown: [
          { label: 'High Priority', value: '8', color: '#22c55e' },
          { label: 'Medium Priority', value: '12', color: '#06b6d4' },
          { label: 'Low Priority', value: '3', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Innovation Intelligence',
      type: 'ai-text',
      data: {
        insights: [
          'Development stage shows highest concentration with 35% of projects progressing well.',
          'Success rate from concept to launch improved to 68% with new validation frameworks.',
          'High-priority projects have 85% faster time-to-market than medium priority.',
          'Innovation pipeline generates 22% of new revenue streams annually.'
        ]
      }
    },
    bottomRight: {
      title: 'Project Success Rate',
      type: 'chart',
      data: {
        type: 'bar',
        values: [45, 52, 48, 65, 68, 61, 72],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 8: Time-based Analysis
  {
    topLeft: {
      title: 'Hourly Activity Pattern',
      type: 'chart',
      data: {
        type: 'bar',
        values: [15, 25, 45, 65, 85, 95, 88, 75, 60, 40, 30, 20],
        labels: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM']
      }
    },
    topRight: {
      title: 'Peak Performance Hours',
      type: 'metric',
      data: {
        primary: '11:00 AM',
        label: 'Peak Activity Time',
        breakdown: [
          { label: 'Morning Peak', value: '9-11 AM', color: '#22c55e' },
          { label: 'Afternoon Peak', value: '1-3 PM', color: '#06b6d4' },
          { label: 'Evening Activity', value: '4-6 PM', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Temporal Efficiency Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Peak efficiency occurs at 11 AM with 95% capacity utilization.',
          'Morning ramp-up takes 3 hours to reach optimal performance levels.',
          'Afternoon performance maintains 75% of peak with gradual decline.',
          'Opportunity to extend peak hours through staggered scheduling could increase daily output by 12%.'
        ]
      }
    },
    bottomRight: {
      title: 'Weekly Pattern',
      type: 'chart',
      data: {
        type: 'bar',
        values: [78, 85, 92, 88, 82, 65, 45],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    }
  },

  // Insight Set 9: Supply Chain Intelligence
  {
    topLeft: {
      title: 'Supply Chain Health',
      type: 'chart',
      data: {
        type: 'donut',
        values: [55, 30, 12, 3],
        labels: ['Optimal', 'Good', 'Needs Attention', 'Critical'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Supply Metrics',
      type: 'metric',
      data: {
        primary: '96.8%',
        label: 'Supply Reliability',
        breakdown: [
          { label: 'On-time Delivery', value: '97.2%', color: '#22c55e' },
          { label: 'Quality Compliance', value: '98.5%', color: '#06b6d4' },
          { label: 'Inventory Accuracy', value: '94.7%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Supply Chain Optimization',
      type: 'ai-text',
      data: {
        insights: [
          'Supply chain reliability at 96.8% exceeds industry benchmark by 4.2%.',
          'Critical suppliers (3%) require immediate attention to prevent disruptions.',
          'Inventory accuracy improvements could reduce carrying costs by $180K annually.',
          'Diversification across 15 suppliers reduces single-point-of-failure risk.'
        ]
      }
    },
    bottomRight: {
      title: 'Supplier Performance',
      type: 'chart',
      data: {
        type: 'bar',
        values: [94, 96, 93, 97, 98, 95, 99],
        labels: ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E', 'Supplier F', 'Supplier G']
      }
    }
  },

  // Insight Set 10: Digital Transformation
  {
    topLeft: {
      title: 'Digital Adoption',
      type: 'chart',
      data: {
        type: 'donut',
        values: [42, 35, 18, 5],
        labels: ['Fully Digital', 'Partially Digital', 'Traditional', 'Legacy'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Digital Metrics',
      type: 'metric',
      data: {
        primary: '77%',
        label: 'Digital Maturity',
        breakdown: [
          { label: 'Process Automation', value: '82%', color: '#22c55e' },
          { label: 'Data Integration', value: '75%', color: '#06b6d4' },
          { label: 'AI Implementation', value: '65%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Digital Strategy Insights',
      type: 'ai-text',
      data: {
        insights: [
          'Digital maturity at 77% positions organization in top quartile of industry.',
          'Process automation yields 25% efficiency gains and 18% cost reduction.',
          'Legacy systems (5%) create bottlenecks - modernization could unlock 12% productivity.',
          'AI implementation shows 65% adoption with strong ROI in predictive analytics.'
        ]
      }
    },
    bottomRight: {
      title: 'Adoption Timeline',
      type: 'chart',
      data: {
        type: 'bar',
        values: [45, 52, 58, 65, 71, 75, 77],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 11: Sustainability Metrics
  {
    topLeft: {
      title: 'Sustainability Score',
      type: 'chart',
      data: {
        type: 'donut',
        values: [48, 32, 15, 5],
        labels: ['Excellent', 'Good', 'Improving', 'Needs Work'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Environmental Impact',
      type: 'metric',
      data: {
        primary: '68%',
        label: 'Carbon Reduction',
        breakdown: [
          { label: 'Energy Efficiency', value: '72%', color: '#22c55e' },
          { label: 'Waste Reduction', value: '65%', color: '#06b6d4' },
          { label: 'Sustainable Materials', value: '58%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Sustainability Strategy',
      type: 'ai-text',
      data: {
        insights: [
          'Carbon footprint reduced 68% through renewable energy adoption and efficiency programs.',
          'Waste reduction initiatives save $340K annually while improving environmental impact.',
          'Sustainable materials usage at 58% with target of 75% by year-end.',
          'Energy efficiency improvements contribute 72% to overall sustainability score.'
        ]
      }
    },
    bottomRight: {
      title: 'Green Initiatives ROI',
      type: 'chart',
      data: {
        type: 'bar',
        values: [120, 145, 168, 195, 225, 248, 275],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 12: Competitive Analysis
  {
    topLeft: {
      title: 'Market Position',
      type: 'chart',
      data: {
        type: 'donut',
        values: [28, 22, 18, 15, 17],
        labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444']
      }
    },
    topRight: {
      title: 'Competitive Metrics',
      type: 'metric',
      data: {
        primary: '28%',
        label: 'Market Share',
        breakdown: [
          { label: 'Price Competitiveness', value: '92%', color: '#22c55e' },
          { label: 'Quality Rating', value: '95%', color: '#06b6d4' },
          { label: 'Brand Recognition', value: '78%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Competitive Intelligence',
      type: 'ai-text',
      data: {
        insights: [
          'Market leadership at 28% share with strong competitive moat in quality and service.',
          'Price competitiveness at 92% while maintaining premium positioning.',
          'Brand recognition opportunity exists - 78% vs industry leaders at 85%.',
          'Quality rating advantage of 95% vs competitors average of 87% drives customer loyalty.'
        ]
      }
    },
    bottomRight: {
      title: 'Share Trajectory',
      type: 'chart',
      data: {
        type: 'bar',
        values: [24, 25, 26, 27, 27, 28, 29],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 13: Workforce Analytics
  {
    topLeft: {
      title: 'Team Performance',
      type: 'chart',
      data: {
        type: 'donut',
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
      title: 'Workforce Development Strategy',
      type: 'ai-text',
      data: {
        insights: [
          'High performer concentration at 35% drives exceptional team productivity.',
          'Employee satisfaction at 87% correlates with 92% retention rate.',
          'Skill development programs show 78% participation with measurable impact.',
          'Targeted support for 5% struggling employees could improve overall performance by 8%.'
        ]
      }
    },
    bottomRight: {
      title: 'Productivity Trends',
      type: 'chart',
      data: {
        type: 'bar',
        values: [82, 85, 87, 89, 91, 88, 93],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 14: Financial Health
  {
    topLeft: {
      title: 'Revenue Composition',
      type: 'chart',
      data: {
        type: 'donut',
        values: [45, 30, 15, 10],
        labels: ['Core Products', 'Services', 'Subscriptions', 'Other'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#8b5cf6']
      }
    },
    topRight: {
      title: 'Financial Health',
      type: 'metric',
      data: {
        primary: '24%',
        label: 'Profit Margin',
        breakdown: [
          { label: 'Gross Margin', value: '67%', color: '#22c55e' },
          { label: 'Operating Margin', value: '31%', color: '#06b6d4' },
          { label: 'Net Margin', value: '24%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Financial Performance Analysis',
      type: 'ai-text',
      data: {
        insights: [
          'Profit margin at 24% exceeds industry average of 18% through operational efficiency.',
          'Core products dominate revenue at 45% but services show highest growth potential.',
          'Subscription revenue at 15% provides stable recurring income foundation.',
          'Gross margin strength at 67% indicates pricing power and cost management success.'
        ]
      }
    },
    bottomRight: {
      title: 'Revenue Growth',
      type: 'chart',
      data: {
        type: 'bar',
        values: [2.1, 2.3, 2.4, 2.7, 2.9, 2.8, 3.1],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  },

  // Insight Set 15: Technology Infrastructure
  {
    topLeft: {
      title: 'System Performance',
      type: 'chart',
      data: {
        type: 'donut',
        values: [60, 25, 12, 3],
        labels: ['Excellent', 'Good', 'Needs Improvement', 'Critical'],
        colors: ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444']
      }
    },
    topRight: {
      title: 'Tech Metrics',
      type: 'metric',
      data: {
        primary: '99.7%',
        label: 'System Uptime',
        breakdown: [
          { label: 'Response Time', value: '0.8s', color: '#22c55e' },
          { label: 'Error Rate', value: '0.3%', color: '#06b6d4' },
          { label: 'Security Score', value: '95%', color: '#f59e0b' },
        ]
      }
    },
    bottomLeft: {
      title: 'Technology Infrastructure Assessment',
      type: 'ai-text',
      data: {
        insights: [
          'System uptime at 99.7% exceeds SLA requirements and industry standards.',
          'Response time of 0.8s provides excellent user experience across all platforms.',
          'Security posture strong at 95% with continuous monitoring and threat detection.',
          'Critical systems (3%) require immediate attention to prevent potential outages.'
        ]
      }
    },
    bottomRight: {
      title: 'Performance Timeline',
      type: 'chart',
      data: {
        type: 'bar',
        values: [99.2, 99.4, 99.6, 99.5, 99.8, 99.7, 99.9],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  }
]

// Generate insights based on exploration path
export const generateDynamicInsights = (
  currentRootSelection: string | null,
  activeTilePerLayer: (string | null)[],
  visibleLayers: boolean[]
): InsightSet => {
  // Create a seed based on the current exploration state
  const explorationState = [
    currentRootSelection || 'none',
    ...activeTilePerLayer.map(id => id || 'none'),
    ...visibleLayers.map(visible => visible ? '1' : '0')
  ].join('-')
  
  // Simple hash function to get consistent "random" selection
  let hash = 0
  for (let i = 0; i < explorationState.length; i++) {
    const char = explorationState.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Use the hash to select an insight set
  const insightIndex = Math.abs(hash) % INSIGHTS_POOL.length
  return INSIGHTS_POOL[insightIndex]
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