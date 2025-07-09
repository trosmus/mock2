import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material'
import { ExplorationTopicAccordion } from './ExplorationTopicAccordion'
import { getWidgetsByExplorationTopic, WidgetTemplate } from './widgetTemplatesByTopic'

interface AddWidgetDialogProps {
  open: boolean
  onClose: () => void
  onAddWidget: (widget: WidgetTemplate) => void
}

export const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({
  open,
  onClose,
  onAddWidget,
}) => {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['revenue']) // Revenue expanded by default

  const handleTopicToggle = (topic: string) => {
    setExpandedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  const handleAddWidget = (widget: WidgetTemplate) => {
    onAddWidget(widget)
    onClose()
  }

  // Get dynamic widgets (including favorites)
  const widgetsByTopic = getWidgetsByExplorationTopic()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          minHeight: '70vh',
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Add New Widget
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Widgets are organized by your data exploration journey. Choose from insights you've discovered while exploring your data.
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Box>
          {Object.entries(widgetsByTopic).map(([topicKey, topic]) => (
            <ExplorationTopicAccordion
              key={topicKey}
              topicKey={topicKey}
              topic={topic}
              isExpanded={expandedTopics.includes(topicKey)}
              onToggle={handleTopicToggle}
              onAddWidget={handleAddWidget}
            />
          ))}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
} 