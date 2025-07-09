import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Box,
  useTheme,
} from '@mui/material'
import { Sidebar } from './Sidebar'
import { NavBar } from './NavBar'
import { isDrawerExpanded } from '../store/appState'

const NAVBAR_HEIGHT = 32

export const Layout: React.FC = () => {
  const theme = useTheme()
  const expanded = isDrawerExpanded.value

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* NavBar Component */}
      <NavBar />

      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          pt: '65px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          // height: '100vh',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 1,
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.background.default,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: 4,
              '&:hover': {
                backgroundColor: theme.palette.text.disabled,
              },
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
