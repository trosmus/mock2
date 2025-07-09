import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  alpha,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material'
import {isDrawerExpanded, setIsDrawerExpanded} from '../store/appState'
import {useTheme as useCustomTheme} from '../providers/ThemeProvider'
import {useTypedTranslation} from '../hooks/useTypedTranslation'
import MaterialUISwitch from './MaterialUISwitch'

const DRAWER_WIDTH = 240
const NAVBAR_HEIGHT = 32

interface MenuItem {
  id: string
  path: string
  icon: React.ReactNode
  titleKey: string
  section: 'main' | 'tools'
}

const menuItems: MenuItem[] = [
  {
    id: 'explorer',
    path: '/explorer',
    icon: <DashboardIcon/>,
    titleKey: 'MENU.EXPLORER',
    section: 'main',
  },
  {
    id: 'dashboards',
    path: '/dashboards',
    icon: <AssessmentIcon/>,
    titleKey: 'MENU.DASHBOARDS',
    section: 'main',
  },
  {
    id: 'data-sources',
    path: '/data-sources',
    icon: <CloudUploadIcon/>,
    titleKey: 'MENU.DATA_SOURCES',
    section: 'tools',
  },
  // {
  //   id: 'agent',
  //   path: '/agent',
  //   icon: <AgentIcon/>,
  //   titleKey: 'MENU.AGENT',
  //   section: 'tools',
  // },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const {mode, toggleTheme} = useCustomTheme()
  const {t} = useTypedTranslation()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const expanded = isDrawerExpanded.value

  const handleNavigation = (path: string) => {
    navigate(path)
    if (isMobile) {
      setIsDrawerExpanded(false)
    }
  }

  const renderMenuItem = (item: MenuItem) => {
    const isSelected = location.pathname === item.path

    return (
      <ListItem key={item.id} disablePadding sx={{ p: 0, mb: 0.25 }}>
        <ListItemButton
          onClick={() => handleNavigation(item.path)}
          selected={isSelected}
          sx={{
            minHeight: 40,
            mx: 1,
            px: 2,
            py: 1,
            borderRadius: 3,
            backgroundColor: isSelected
              ? alpha(theme.palette.text.primary, 0.15)
              : 'transparent',
            color: theme.palette.text.primary,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: alpha(theme.palette.text.primary, 0.08),
            },
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.text.primary, 0.15),
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 1.5,
              justifyContent: 'center',
              color: 'inherit',
              '& .MuiSvgIcon-root': {
                fontSize: 18,
              },
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={(t as any)(item.titleKey)}
            primaryTypographyProps={{
              fontSize: '0.85rem',
              fontWeight: 400,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          />
        </ListItemButton>
      </ListItem>
    )
  }

  const renderSectionHeader = (title: string) => (
    <Box sx={{ px: 2, py: 1, mb: 0.5, mt: 3 }}>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 500,
          fontSize: '0.875rem',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {title}
      </Typography>
    </Box>
  )

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        pt: `${NAVBAR_HEIGHT + 20}px`,
      }}
    >
      {/* Menu Title */}
      <Box sx={{ px: 2, py: 1, mb: 0.5 }}>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: '0.875rem',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Menu
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{flex: 1, overflow: 'auto'}}>
        {/* Main Section */}
        <List dense sx={{ p: 0 }}>
          {menuItems
            .filter(item => item.section === 'main')
            .map(renderMenuItem)}
        </List>

        {/* Tools Section */}
        {renderSectionHeader((t as any)('MENU.SECTIONS.TOOLS'))}
        <List dense sx={{ p: 0 }}>
          {menuItems
            .filter(item => item.section === 'tools')
            .map(renderMenuItem)}
        </List>
      </Box>

      {/* Footer with theme toggle */}
      <Divider sx={{ mx: 2 }} />
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{fontSize: '0.875rem'}}
        >
          {(t as any)('COMMON.THEME')}
        </Typography>
        <MaterialUISwitch checked={mode === 'dark'} onChange={toggleTheme}/>
      </Box>
    </Box>
  )

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={expanded}
      sx={{
        width: expanded ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          p: 0,
          pt: 4,
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          boxShadow: 'none',
          borderRight: `1px solid ${theme.palette.divider}`,
          borderRadius: 0,
          zIndex: theme.zIndex.appBar, // Below navbar
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}
