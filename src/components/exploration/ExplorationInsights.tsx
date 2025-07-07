import React from 'react'
import { Box, Typography, Grid, Fade } from '@mui/material'
import { InsightCard } from './InsightCard'

interface InsightData {
  title: string
  type: 'chart' | 'metric' | 'ai-text'
  data: any
}

interface ExplorationInsightsProps {
  topLeft: InsightData
  topRight: InsightData
  bottomLeft: InsightData
  bottomRight: InsightData
}

export const ExplorationInsights: React.FC<ExplorationInsightsProps> = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight
}) => {
  return (
    <Box>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 600,
          color: 'text.primary',
          mb: 3,
          mt: 3
        }}
      >
        📊 Contextual Insights
      </Typography>
      
      <Grid container spacing={3}>
        {/* Top Row */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={400}>
            <div>
              <InsightCard
                title={topLeft.title}
                type={topLeft.type}
                data={topLeft.data}
              />
            </div>
          </Fade>
        </Grid>
        <Grid item xs={12} md={6}>
          <Fade in timeout={500}>
            <div>
              <InsightCard
                title={topRight.title}
                type={topRight.type}
                data={topRight.data}
              />
            </div>
          </Fade>
        </Grid>
        
        {/* Bottom Row */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={600}>
            <div>
              <InsightCard
                title={bottomLeft.title}
                type={bottomLeft.type}
                data={bottomLeft.data}
              />
            </div>
          </Fade>
        </Grid>
        <Grid item xs={12} md={6}>
          <Fade in timeout={700}>
            <div>
              <InsightCard
                title={bottomRight.title}
                type={bottomRight.type}
                data={bottomRight.data}
              />
            </div>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  )
} 