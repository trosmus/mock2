import React from 'react'
import {
  Box,
  Typography,
  Card,
  useTheme,
  alpha,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  LocalShipping,
  Inventory,
  AttachMoney,
  Speed,
  CheckCircle,
  LocationOn,
  Category,
  Assessment,
  Route,
  Refresh,
  Warning,
  ReportProblem,
  Timeline,
  Analytics,
  BarChart,
  PieChart,
  ShowChart,
  AccountBalance,
  Circle,
  ExpandMore,
} from '@mui/icons-material'
import {ExplorationTile} from '../../store/appState'

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  AttachMoney: <AttachMoney/>,
  LocalShipping: <LocalShipping/>,
  Inventory: <Inventory/>,
  Speed: <Speed/>,
  TrendingUp: <TrendingUp/>,
  LocationOn: <LocationOn/>,
  Category: <Category/>,
  Assessment: <Assessment/>,
  CheckCircle: <CheckCircle/>,
  Route: <Route/>,
  Refresh: <Refresh/>,
  Warning: <Warning/>,
  ReportProblem: <ReportProblem/>,
  Timeline: <Timeline/>,
  Analytics: <Analytics/>,
  BarChart: <BarChart/>,
  PieChart: <PieChart/>,
  ShowChart: <ShowChart/>,
  TrendingDown: <TrendingDown/>,
  AccountBalance: <AccountBalance/>,
}

interface ExplorationTileCardProps {
  tile: ExplorationTile
  onClick: () => void
  isSubLevel?: boolean
  isActive?: boolean
  wizardMode?: boolean
  isCollapsed?: boolean
}

export const ExplorationTileCard: React.FC<ExplorationTileCardProps> = ({
  tile,
  onClick,
  isSubLevel = false,
  isActive = false,
  wizardMode = false,
  isCollapsed = false
}) => {
  const theme = useTheme()

  // Adjust alpha values for dark theme
  const isDark = theme.palette.mode === 'dark'
  const activeBackgroundAlpha = isDark ? 0.15 : 0.08
  const activeBorderAlpha = isDark ? 0.4 : 1
  const hoverBackgroundAlpha = isDark ? 0.2 : 0.12
  const subLevelBorderAlpha = isDark ? 0.3 : 0.2
  const dividerAlpha = isDark ? 0.15 : 0.1

  // Render enhanced content for wizard mode
  const renderEnhancedContent = () => {
    if (!wizardMode || !tile.enhancedContent) return null

    const {type, data} = tile.enhancedContent

    switch (type) {
      case 'text':
        return (
          <Box sx={{mt: 2, p: 2, backgroundColor: alpha(tile.color, 0.05), borderRadius: 1}}>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: '0.85rem', lineHeight: 1.5}}>
              {data.text}
            </Typography>
            {data.bullets && (
              <Box sx={{mt: 1.5}}>
                {data.bullets.map((bullet: string, index: number) => (
                  <Box key={index} sx={{display: 'flex', alignItems: 'flex-start', mb: 0.5}}>
                    <Box sx={{
                      width: 4,
                      height: 4,
                      backgroundColor: tile.color,
                      borderRadius: '50%',
                      mt: 0.75,
                      mr: 1,
                      flexShrink: 0
                    }}/>
                    <Typography variant="caption" color="text.secondary" sx={{fontSize: '0.8rem'}}>
                      {bullet}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )

      case 'table':
        return (
          <Box sx={{mt: 2}}>
            <TableContainer component={Paper} elevation={0} sx={{
              backgroundColor: alpha(tile.color, 0.05),
              borderRadius: 1,
              border: `1px solid ${alpha(tile.color, 0.1)}`
            }}>
              <Table size="small">
                <TableBody>
                  {data.rows.map((row: { label: string; value: string; color?: string }, index: number) => (
                    <TableRow key={index} sx={{'&:last-child td': {border: 0}}}>
                      <TableCell sx={{py: 1, fontSize: '0.75rem', fontWeight: 500}}>
                        {row.label}
                      </TableCell>
                      <TableCell align="right" sx={{
                        py: 1,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: row.color || 'text.primary'
                      }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )

      case 'chart':
        return (
          <Box sx={{mt: 2, p: 2, backgroundColor: alpha(tile.color, 0.05), borderRadius: 1}}>
            <Typography variant="caption" color="text.secondary" sx={{fontSize: '0.75rem', mb: 1, display: 'block'}}>
              {data.title}
            </Typography>
            {data.chartType === 'bar' && (
              <Box sx={{display: 'flex', alignItems: 'end', gap: 1, height: 60}}>
                {data.values.map((value: number, index: number) => (
                  <Box key={index} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
                    <Box sx={{
                      width: '100%',
                      backgroundColor: alpha(tile.color, 0.7),
                      borderRadius: '2px 2px 0 0',
                      height: `${(value / Math.max(...data.values)) * 45}px`,
                      minHeight: '8px',
                      mb: 0.5
                    }}/>
                    <Typography variant="caption" sx={{fontSize: '0.65rem', color: 'text.disabled'}}>
                      {data.labels[index]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {data.chartType === 'line' && (
              <Box sx={{position: 'relative', height: 60, overflow: 'hidden'}}>
                <svg width="100%" height="60" viewBox="0 0 200 60">
                  <defs>
                    <linearGradient id={`gradient-${tile.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={tile.color} stopOpacity={0.3}/>
                      <stop offset="100%" stopColor={tile.color} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0 ${60 - (data.values[0] / Math.max(...data.values)) * 45} ${data.values.map((value: number, index: number) =>
                      `L ${(index / (data.values.length - 1)) * 200} ${60 - (value / Math.max(...data.values)) * 45}`
                    ).join(' ')}`}
                    fill="none"
                    stroke={tile.color}
                    strokeWidth="2"
                  />
                  <path
                    d={`M 0 ${60 - (data.values[0] / Math.max(...data.values)) * 45} ${data.values.map((value: number, index: number) =>
                      `L ${(index / (data.values.length - 1)) * 200} ${60 - (value / Math.max(...data.values)) * 45}`
                    ).join(' ')} L 200 60 L 0 60 Z`}
                    fill={`url(#gradient-${tile.id})`}
                  />
                </svg>
              </Box>
            )}
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        p: isCollapsed ? 2 : 2,
        boxShadow: 'none',
        borderRadius: 1,
        width: isCollapsed ? 80 : 'auto',
        minWidth: isCollapsed ? 80 : 'auto',
        background: isActive
          ? `linear-gradient(135deg, ${alpha(tile.color, activeBackgroundAlpha)}, ${alpha(tile.color, activeBackgroundAlpha * 0.5)})`
          : theme.palette.background.paper,
        height: '100%',
        cursor: 'pointer',
        outline: isActive
          ? `2px solid ${alpha(tile.color, activeBorderAlpha)}`
          : `1px solid ${alpha(theme.palette.divider, dividerAlpha)}`,
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          outline: `2px solid ${alpha(tile.color, activeBorderAlpha * 0.6)}`,
          outlineOffset: '-2px',
          background: isActive
            ? `linear-gradient(135deg, ${alpha(tile.color, hoverBackgroundAlpha)}, ${alpha(tile.color, hoverBackgroundAlpha * 0.5)})`
            : `linear-gradient(135deg, ${alpha(tile.color, activeBackgroundAlpha * 0.5)}, ${alpha(tile.color, activeBackgroundAlpha * 0.25)})`,
        },
      }}
    >
      {isCollapsed ? (
        // Collapsed state - show only icon like custom query tile
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              background: isActive ? tile.color : `${tile.color}15`,
              color: isActive ? '#fff' : tile.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              transition: 'all 0.3s ease',
            }}
          >
            {iconMap[tile.icon]}
          </Box>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{
              fontSize: '0.7rem',
              textAlign: 'center',
              lineHeight: 1.2,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxHeight: '100px',
            }}
          >
            {tile.title.substring(0, 10)}
          </Typography>
        </Box>
      ) : (
        // Normal expanded state - show full content
        <>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 1,
                background: isActive ? tile.color : `${tile.color}15`,
                color: isActive ? '#fff' : tile.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              {iconMap[tile.icon]}
            </Box>
            <Box sx={{flex: 1}}>
              <Typography
                variant="body2"
                color={isActive ? 'primary.main' : 'text.secondary'}
                sx={{
                  fontWeight: isActive ? 600 : 500,
                  mb: 0,
                  fontSize: isSubLevel ? '0.8rem' : '1rem',
                  transition: 'all 0.3s ease',
                }}
              >
                {tile.title}
              </Typography>
              {tile.description && (
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: 1.2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {tile.description}
                </Typography>
              )}
            </Box>
          </Box>

          <Typography
            variant={isSubLevel ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              mb: 0.5,
              fontSize: isSubLevel ? '1.5rem' : '2rem',
              color: isActive ? 'primary.main' : 'text.primary',
              transition: 'all 0.3s ease',
            }}
          >
            {tile.value}
          </Typography>

          {tile.secondaryValue && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.8rem',
                mb: 1,
                fontWeight: 500,
              }}
            >
              {tile.secondaryValue}
            </Typography>
          )}

          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              {tile.isPositive ? (
                <TrendingUp sx={{fontSize: 16, color: '#22c55e'}}/>
              ) : (
                <TrendingDown sx={{fontSize: 16, color: '#ef4444'}}/>
              )}
              <Typography
                variant="body2"
                sx={{
                  color: tile.isPositive ? '#22c55e' : '#ef4444',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                {tile.change}
              </Typography>
            </Box>

            {tile.status && (
              <Chip
                icon={<Circle sx={{fontSize: 12}}/>}
                label={tile.status}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  backgroundColor:
                    tile.status === 'good' ? alpha('#22c55e', 0.1) :
                      tile.status === 'warning' ? alpha('#f59e0b', 0.1) :
                        alpha('#ef4444', 0.1),
                  color:
                    tile.status === 'good' ? '#22c55e' :
                      tile.status === 'warning' ? '#f59e0b' :
                        '#ef4444',
                  '& .MuiChip-icon': {
                    color: 'inherit',
                  },
                }}
              />
            )}
          </Box>

          {/* Enhanced content for wizard mode */}
          {wizardMode && tile.enhancedContent && (
            <Accordion
              defaultExpanded={false}
              onClick={(e) => e.stopPropagation()}
              elevation={0}
              sx={{
                mt: 2,
                borderRadius: 1,
                boxShadow: 'none',
                backgroundColor: alpha(tile.color, 0.05),
                '&:hover': {
                  backgroundColor: alpha(tile.color, 0.08),
                },
                '&:before': {
                  display: 'none',
                },
                '& .MuiAccordionSummary-root': {
                  minHeight: 'auto',
                  borderRadius: 0.5,
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    color: tile.color,
                  },
                },
                '& .MuiAccordionDetails-root': {
                  p: 0,
                  backgroundColor: 'transparent',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore/>}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                  },
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: '0.8rem', fontWeight: 500}}>
                  View Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderEnhancedContent()}
              </AccordionDetails>
            </Accordion>
          )}
          {!wizardMode && renderEnhancedContent()}
        </>
      )}
    </Card>
  )
}
