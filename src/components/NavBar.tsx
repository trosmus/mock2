import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material'
import {
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { isDrawerExpanded, setIsDrawerExpanded } from '../store/appState'
import Logo from './Logo'

export const NavBar: React.FC = () => {
  const theme = useTheme()
  const { t } = useTypedTranslation()

  const handleToggleDrawer = () => {
    setIsDrawerExpanded(!isDrawerExpanded.value)
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
        borderRadius: '0 !important',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar + 1, // Ensure navbar is on top
      }}
    >
      <Toolbar sx={{ px: '0 !important', minHeight: '32px !important' }}>
        {/* Left side - Logo and Menu Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleToggleDrawer}
            size="small"
            sx={{
              background: 'transparent'
            }}
          >
            <MenuIcon fontSize="small"/>
          </IconButton>
          <Logo />
        </Box>

        {/* Center - can add breadcrumbs or page title */}
        <Box sx={{ flex: 1 }}>
          {/* Empty for now, can add breadcrumbs or current page info */}
        </Box>

        {/* Right side - can add user menu, search, notifications */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Placeholder for future additions like search, notifications, user profile */}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
