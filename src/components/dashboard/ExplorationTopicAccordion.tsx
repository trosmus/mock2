import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  alpha,
} from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { WidgetPreviewCard } from './WidgetPreviewCard'
import { ExplorationTopic, WidgetTemplate } from './widgetTemplatesByTopic'

interface ExplorationTopicAccordionProps {
  topicKey: string
  topic: ExplorationTopic
  isExpanded: boolean
  onToggle: (topicKey: string) => void
  onAddWidget: (widget: WidgetTemplate) => void
}

export const ExplorationTopicAccordion: React.FC<ExplorationTopicAccordionProps> = ({
  topicKey,
  topic,
  isExpanded,
  onToggle,
  onAddWidget,
}) => {
  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => onToggle(topicKey)}
      sx={{
        mb: 2,
        border: `1px solid ${alpha(topic.color, 0.2)}`,
        borderRadius: 1,
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          boxShadow: `0 4px 20px ${alpha(topic.color, 0.1)}`,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: alpha(topic.color, 0.05),
          borderRadius: 1,
          '&.Mui-expanded': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ color: topic.color, display: 'flex', alignItems: 'center' }}>
            {topic.icon}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: topic.color }}>
              {topic.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {topic.description}
            </Typography>
          </Box>
          <Chip
            label={`${topic.widgets.length} widgets`}
            size="small"
            sx={{
              backgroundColor: alpha(topic.color, 0.1),
              color: topic.color,
              fontWeight: 600,
            }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {topic.widgets.map((widget: WidgetTemplate) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={widget.id}>
              <WidgetPreviewCard
                widget={widget}
                onAddWidget={onAddWidget}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
} 