import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material'
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Public as PublicIcon,
  Lock as LockIcon,
} from '@mui/icons-material'
import { useTypedTranslation } from '../../hooks/useTypedTranslation'

interface Dashboard {
  id: string
  name: string
  description: string
  widgets: any[]
  layout: any[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

interface DashboardListProps {
  dashboards: Dashboard[]
  onDashboardSelect: (dashboard: Dashboard) => void
  onCreateDashboard: () => void
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, dashboard: Dashboard) => void
}

export const DashboardList: React.FC<DashboardListProps> = ({
  dashboards,
  onDashboardSelect,
  onCreateDashboard,
  onMenuOpen,
}) => {
  const { t } = useTypedTranslation()
  const theme = useTheme()

  return (
    <Grid container spacing={3}>
      {dashboards.map((dashboard) => (
        <Grid item xs={12} sm={6} md={4} key={dashboard.id}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 8px 30px rgba(0, 0, 0, 0.4)' 
                  : '0 8px 30px rgba(0, 0, 0, 0.12)',
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
            onClick={() => onDashboardSelect(dashboard)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {dashboard.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {dashboard.description}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMenuOpen(e, dashboard)
                  }}
                  sx={{ ml: 1 }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {dashboard.isPublic ? (
                    <PublicIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  ) : (
                    <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {dashboard.isPublic ? 'Public' : 'Private'}
                  </Typography>
                </Box>
                <Chip
                  label={`${dashboard.widgets.length} widgets`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              </Box>

              <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <Typography variant="caption" color="text.secondary">
                  Updated {dashboard.updatedAt.toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export type { Dashboard } 