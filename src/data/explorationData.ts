import { ExplorationTile, ExplorationLevel } from '../store/appState'

// Main exploration levels data
export const explorationTree: Record<string, ExplorationLevel> = {
  // Root level - main categories
  root: {
    tiles: [
      {
        id: 'revenue',
        title: 'Monthly Revenue',
        value: '$847,265.00',
        change: '+4.85%',
        isPositive: true,
        icon: 'AttachMoney',
        color: '#22c55e',
        description: 'Total revenue generated this month across all channels',
        secondaryValue: 'Target: $900K',
        status: 'good' as const,
        lastUpdated: '2h ago',
        enhancedContent: {
          type: 'text',
          data: {
            text: 'Revenue performance has been consistently strong this quarter, driven by increased customer acquisition and higher average order values. Our growth strategy is working effectively.',
            bullets: [
              'Online sales increased by 12% month-over-month',
              'New customer acquisition up 18%',
              'Average order value improved by 8%',
              'Customer retention rate at 94%'
            ]
          }
        }
      },
      {
        id: 'shipments',
        title: 'Active Shipments',
        value: '2,847',
        change: '+2.02%',
        isPositive: true,
        icon: 'LocalShipping',
        color: '#8b5cf6',
        description: 'Currently active shipments in transit worldwide',
        secondaryValue: 'Target: 3,000',
        status: 'warning' as const,
        lastUpdated: '1h ago',
        enhancedContent: {
          type: 'table',
          data: {
            rows: [
              { label: 'In Transit', value: '2,247', color: '#22c55e' },
              { label: 'Processing', value: '387', color: '#f59e0b' },
              { label: 'Delayed', value: '213', color: '#ef4444' },
              { label: 'Next Day', value: '1,890', color: '#06b6d4' },
              { label: 'International', value: '357', color: '#8b5cf6' }
            ]
          }
        }
      },
      {
        id: 'inventory',
        title: 'Inventory Value',
        value: '$1,285,420',
        change: '+3.74%',
        isPositive: true,
        icon: 'Inventory',
        color: '#f59e0b',
        description: 'Total value of current inventory across all locations',
        secondaryValue: 'Target: $1.2M',
        status: 'good' as const,
        lastUpdated: '30m ago',
        enhancedContent: {
          type: 'chart',
          data: {
            title: 'Inventory Trends (Last 7 Days)',
            chartType: 'line',
            values: [1200, 1150, 1180, 1220, 1250, 1280, 1285],
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        }
      },
      {
        id: 'delivery',
        title: 'Avg Delivery Time',
        value: '2.4 days',
        change: '-1.24%',
        isPositive: true,
        icon: 'Speed',
        color: '#06b6d4',
        description: 'Average time from order to customer delivery',
        secondaryValue: 'Target: 2.0 days',
        status: 'warning' as const,
        lastUpdated: '45m ago',
        enhancedContent: {
          type: 'chart',
          data: {
            title: 'Delivery Performance by Region',
            chartType: 'bar',
            values: [2.1, 2.8, 1.9, 2.6, 2.3, 2.0, 2.4],
            labels: ['NA', 'EU', 'AS', 'SA', 'AF', 'OC', 'AVG']
          }
        }
      },
    ],
    insights: {
      left: {
        title: 'Activity Breakdown',
        type: 'chart',
        data: {
          type: 'donut',
          values: [35, 25, 20, 20],
          labels: ['Shipments', 'Warehousing', 'Last Mile', 'Returns'],
          colors: ['#22c55e', '#8b5cf6', '#f59e0b', '#ef4444']
        }
      },
      right: {
        title: 'Monthly Operations',
        type: 'chart',
        data: {
          type: 'bar',
          values: [85, 92, 78, 95, 88, 75, 100],
          labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      }
    }
  },

  // Revenue sub-exploration
  revenue: {
    tiles: [
      {
        id: 'revenue-trends',
        title: 'Revenue Trends',
        value: '+15.2%',
        change: 'Growth Rate',
        isPositive: true,
        icon: 'TrendingUp',
        color: '#22c55e',
      },
      {
        id: 'revenue-regions',
        title: 'Regional Revenue',
        value: '12 Regions',
        change: 'Top: North America',
        isPositive: true,
        icon: 'LocationOn',
        color: '#22c55e',
      },
      {
        id: 'revenue-products',
        title: 'Product Revenue',
        value: '247 Products',
        change: 'Electronics leading',
        isPositive: true,
        icon: 'Category',
        color: '#22c55e',
      },
      {
        id: 'revenue-forecast',
        title: 'Revenue Forecast',
        value: '$1.2M',
        change: 'Next month projection',
        isPositive: true,
        icon: 'Assessment',
        color: '#22c55e',
      },
    ],
    insights: {
      left: {
        title: 'Revenue Growth Pattern',
        type: 'chart',
        data: {
          type: 'line',
          values: [620, 732, 701, 734, 1090, 1130, 1210, 1180, 1340, 1450, 1320, 1520],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      },
      right: {
        title: 'Revenue Composition',
        type: 'metric',
        data: {
          primary: '$298.45',
          label: 'Average Order Value',
          breakdown: [
            { label: 'Product Sales', value: '75%', color: '#22c55e' },
            { label: 'Shipping Fees', value: '15%', color: '#8b5cf6' },
            { label: 'Other', value: '10%', color: '#f59e0b' },
          ]
        }
      }
    }
  },

  // Revenue Trends deeper insights
  'revenue-trends': {
    tiles: [],
    insights: {
      left: {
        title: 'Revenue Trend Analysis',
        type: 'chart',
        data: {
          type: 'line',
          values: [15.2, 12.8, 18.5, 16.3, 14.7, 19.1, 15.9],
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
        }
      },
      right: {
        title: 'Growth Drivers',
        type: 'metric',
        data: {
          primary: '+15.2%',
          label: 'Weekly Growth Rate',
          breakdown: [
            { label: 'New Customers', value: '+8.3%', color: '#22c55e' },
            { label: 'Repeat Orders', value: '+4.2%', color: '#06b6d4' },
            { label: 'Order Value', value: '+2.7%', color: '#f59e0b' },
          ]
        }
      }
    }
  },

  // Revenue Regions deeper insights
  'revenue-regions': {
    tiles: [],
    insights: {
      left: {
        title: 'Regional Performance',
        type: 'chart',
        data: {
          type: 'donut',
          values: [35, 28, 18, 12, 7],
          labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Other'],
          colors: ['#22c55e', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444']
        }
      },
      right: {
        title: 'Top Regions',
        type: 'metric',
        data: {
          primary: '$296,543',
          label: 'North America Revenue',
          breakdown: [
            { label: 'United States', value: '$245,890', color: '#22c55e' },
            { label: 'Canada', value: '$50,653', color: '#06b6d4' },
          ]
        }
      }
    }
  },

  // Shipments sub-exploration
  shipments: {
    tiles: [
      {
        id: 'shipment-status',
        title: 'Shipment Status',
        value: '94.2%',
        change: 'On-time delivery',
        isPositive: true,
        icon: 'CheckCircle',
        color: '#8b5cf6',
      },
      {
        id: 'shipment-routes',
        title: 'Active Routes',
        value: '156',
        change: '12 new this month',
        isPositive: true,
        icon: 'Route',
        color: '#8b5cf6',
      },
      {
        id: 'shipment-carriers',
        title: 'Carrier Performance',
        value: '8 Partners',
        change: 'FedEx leading 99.1%',
        isPositive: true,
        icon: 'LocalShipping',
        color: '#8b5cf6',
      },
      {
        id: 'shipment-costs',
        title: 'Shipping Costs',
        value: '$127,450',
        change: '-3.2% vs last month',
        isPositive: true,
        icon: 'AttachMoney',
        color: '#8b5cf6',
      },
    ],
    insights: {
      left: {
        title: 'Delivery Performance',
        type: 'chart',
        data: {
          type: 'gauge',
          value: 94.2,
          max: 100,
          label: 'On-time Delivery Rate'
        }
      },
      right: {
        title: 'Shipment Volume Trends',
        type: 'chart',
        data: {
          type: 'area',
          values: [1200, 1450, 1380, 1620, 1780, 1650, 1890],
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
        }
      }
    }
  },

  // Shipment Status deeper insights
  'shipment-status': {
    tiles: [],
    insights: {
      left: {
        title: 'Status Breakdown',
        type: 'chart',
        data: {
          type: 'donut',
          values: [94.2, 3.8, 2.0],
          labels: ['On Time', 'Delayed', 'Failed'],
          colors: ['#22c55e', '#f59e0b', '#ef4444']
        }
      },
      right: {
        title: 'Delivery Metrics',
        type: 'metric',
        data: {
          primary: '94.2%',
          label: 'Success Rate',
          breakdown: [
            { label: 'Same Day', value: '23%', color: '#22c55e' },
            { label: 'Next Day', value: '45%', color: '#06b6d4' },
            { label: '2-3 Days', value: '26.2%', color: '#f59e0b' },
          ]
        }
      }
    }
  },

  // Shipment Routes deeper insights
  'shipment-routes': {
    tiles: [],
    insights: {
      left: {
        title: 'Route Efficiency',
        type: 'chart',
        data: {
          type: 'bar',
          values: [98, 95, 92, 89, 85],
          labels: ['Route A', 'Route B', 'Route C', 'Route D', 'Route E']
        }
      },
      right: {
        title: 'Route Statistics',
        type: 'metric',
        data: {
          primary: '156',
          label: 'Active Routes',
          breakdown: [
            { label: 'High Efficiency', value: '89', color: '#22c55e' },
            { label: 'Medium Efficiency', value: '45', color: '#f59e0b' },
            { label: 'Low Efficiency', value: '22', color: '#ef4444' },
          ]
        }
      }
    }
  },

  // Inventory sub-exploration
  inventory: {
    tiles: [
      {
        id: 'inventory-levels',
        title: 'Stock Levels',
        value: '89.3%',
        change: 'Optimal range',
        isPositive: true,
        icon: 'Inventory',
        color: '#f59e0b',
      },
      {
        id: 'inventory-turnover',
        title: 'Inventory Turnover',
        value: '6.8x',
        change: 'Annual rate',
        isPositive: true,
        icon: 'Refresh',
        color: '#f59e0b',
      },
      {
        id: 'inventory-categories',
        title: 'Product Categories',
        value: '24',
        change: 'Electronics 42%',
        isPositive: true,
        icon: 'Category',
        color: '#f59e0b',
      },
      {
        id: 'inventory-alerts',
        title: 'Stock Alerts',
        value: '7',
        change: 'Low stock items',
        isPositive: false,
        icon: 'Warning',
        color: '#f59e0b',
      },
    ],
    insights: {
      left: {
        title: 'Inventory Distribution',
        type: 'chart',
        data: {
          type: 'treemap',
          categories: [
            { name: 'Electronics', value: 42, color: '#22c55e' },
            { name: 'Clothing', value: 28, color: '#8b5cf6' },
            { name: 'Home & Garden', value: 18, color: '#f59e0b' },
            { name: 'Sports', value: 12, color: '#06b6d4' },
          ]
        }
      },
      right: {
        title: 'Stock Movement',
        type: 'metric',
        data: {
          primary: '2,847',
          label: 'Items in Stock',
          breakdown: [
            { label: 'High Stock', value: '1,890', color: '#22c55e' },
            { label: 'Medium Stock', value: '745', color: '#f59e0b' },
            { label: 'Low Stock', value: '212', color: '#ef4444' },
          ]
        }
      }
    }
  },

  // Inventory Levels deeper insights
  'inventory-levels': {
    tiles: [],
    insights: {
      left: {
        title: 'Stock Level Distribution',
        type: 'chart',
        data: {
          type: 'bar',
          values: [1890, 745, 212],
          labels: ['High Stock', 'Medium Stock', 'Low Stock']
        }
      },
      right: {
        title: 'Stock Analysis',
        type: 'metric',
        data: {
          primary: '89.3%',
          label: 'Optimal Stock Level',
          breakdown: [
            { label: 'Electronics', value: '92%', color: '#22c55e' },
            { label: 'Clothing', value: '88%', color: '#06b6d4' },
            { label: 'Home & Garden', value: '85%', color: '#f59e0b' },
          ]
        }
      }
    }
  },

  // Delivery sub-exploration
  delivery: {
    tiles: [
      {
        id: 'delivery-performance',
        title: 'Delivery Performance',
        value: '96.8%',
        change: 'Success rate',
        isPositive: true,
        icon: 'CheckCircle',
        color: '#06b6d4',
      },
      {
        id: 'delivery-speed',
        title: 'Delivery Speed',
        value: '2.1 days',
        change: 'Average time',
        isPositive: true,
        icon: 'Speed',
        color: '#06b6d4',
      },
      {
        id: 'delivery-zones',
        title: 'Delivery Zones',
        value: '47',
        change: 'Coverage areas',
        isPositive: true,
        icon: 'LocationOn',
        color: '#06b6d4',
      },
      {
        id: 'delivery-issues',
        title: 'Delivery Issues',
        value: '23',
        change: 'This month',
        isPositive: false,
        icon: 'ReportProblem',
        color: '#06b6d4',
      },
    ],
    insights: {
      left: {
        title: 'Delivery Time Distribution',
        type: 'chart',
        data: {
          type: 'histogram',
          values: [15, 35, 28, 18, 4],
          labels: ['1 day', '2 days', '3 days', '4 days', '5+ days']
        }
      },
      right: {
        title: 'Route Efficiency',
        type: 'metric',
        data: {
          primary: '87.3%',
          label: 'Route Optimization',
          breakdown: [
            { label: 'Optimal Routes', value: '89%', color: '#22c55e' },
            { label: 'Good Routes', value: '8%', color: '#f59e0b' },
            { label: 'Poor Routes', value: '3%', color: '#ef4444' },
          ]
        }
      }
    }
  },

  // Delivery Performance deeper insights
  'delivery-performance': {
    tiles: [],
    insights: {
      left: {
        title: 'Performance Trends',
        type: 'chart',
        data: {
          type: 'line',
          values: [94.5, 95.2, 96.1, 96.8, 97.2, 96.9, 96.8],
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
        }
      },
      right: {
        title: 'Performance Breakdown',
        type: 'metric',
        data: {
          primary: '96.8%',
          label: 'Success Rate',
          breakdown: [
            { label: 'Express Delivery', value: '98.5%', color: '#22c55e' },
            { label: 'Standard Delivery', value: '96.2%', color: '#06b6d4' },
            { label: 'Economy Delivery', value: '94.1%', color: '#f59e0b' },
          ]
        }
      }
    }
  },
}

// Helper function to get exploration level data
export const getExplorationLevel = (path: string[]): ExplorationLevel => {
  if (path.length === 0) {
    return explorationTree.root
  }
  
  const levelKey = path[path.length - 1]
  const result = explorationTree[levelKey] || explorationTree.root
  
  return result
}

// Helper function to get insights for current exploration state
export const getContextualInsights = (currentPath: string[], showSubTiles: boolean, currentSubTileId?: string | null) => {
  // If showing sub-tiles and a specific sub-tile is selected, show insights for that sub-tile
  if (showSubTiles && currentSubTileId) {
    const subTileInsights = explorationTree[currentSubTileId]
    if (subTileInsights) {
      return subTileInsights.insights
    }
  }
  
  // Otherwise, show insights for the current level
  const currentLevel = getExplorationLevel(currentPath.length > 0 ? [currentPath[0]] : [])
  return currentLevel.insights
} 