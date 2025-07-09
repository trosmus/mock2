import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { MetricWidget } from './MetricWidget'
import { ChartWidget } from './ChartWidget'
import { InsightWidget } from './InsightWidget'
import { WidgetTemplate } from './widgetTemplatesByTopic'

interface WidgetPreviewCardProps {
  widget: WidgetTemplate
  onAddWidget: (widget: WidgetTemplate) => void
}

export const WidgetPreviewCard: React.FC<WidgetPreviewCardProps> = ({
  widget,
  onAddWidget,
}) => {
  const theme = useTheme()

  const renderWidgetPreview = () => {
    switch (widget.type) {
      case 'metric':
        return (
          <MetricWidget
            title={widget.title}
            value={widget.template.data.value}
            change={widget.template.data.change}
            trend={widget.template.data.trend as 'up' | 'down'}
            color={widget.color}
            icon={widget.icon}
          />
        )
      case 'chart':
        return (
          <ChartWidget
            title={widget.title}
            chartOption={widget.template.data.option}
            color={widget.color}
            icon={widget.icon}
          />
        )
      case 'insight':
        return (
          <InsightWidget
            title={widget.title}
            insight={widget.template.data.insight}
            confidence={widget.template.data.confidence}
            impact={widget.template.data.impact as 'positive' | 'negative'}
            color={widget.color}
            icon={widget.icon}
          />
        )
      default:
        return null
    }
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.2s ease-in-out',
        height: widget.type === 'metric' ? 230 : 350,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 12px 40px rgba(0, 0, 0, 0.4)'
            : '0 12px 40px rgba(0, 0, 0, 0.15)',
          borderColor: alpha(widget.color, 0.3),
        },
      }}
      onClick={() => onAddWidget(widget)}
    >
      <CardContent sx={{ p: 0, height: '100%', '&:last-child': { pb: 0 } }}>
        {/* Widget Preview */}
        <Box sx={{
          height: widget.type === 'metric' ? '140px' : '240px',
          position: 'relative',
          '& .MuiCard-root': {
            height: '100%',
            border: 'none',
            boxShadow: 'none',
          }
        }}>
          {renderWidgetPreview()}
        </Box>

        {/* Widget Info */}
        <Box sx={{
          p: 1.5,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.background.default, 0.5),
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary" sx={{
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}>
              {widget.type}
            </Typography>
            <Button
              size="small"
              variant="contained"
              sx={{
                fontSize: '0.7rem',
                minWidth: 50,
                height: 20,
                backgroundColor: widget.color,
                '&:hover': {
                  backgroundColor: alpha(widget.color, 0.8),
                },
              }}
            >
              Add
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{
            fontSize: '0.75rem',
            mt: 0.5,
            lineHeight: 1.2,
          }}>
            {widget.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
