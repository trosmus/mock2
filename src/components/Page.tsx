import React from 'react'
import { Container, Box } from '@mui/material'
import { PageHeader } from './PageHeader'

interface PageProps {
  title: string
  subtitle: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  headerMarginBottom?: number
}

export const Page: React.FC<PageProps> = ({
  title,
  subtitle,
  icon,
  actions,
  children,
  maxWidth = 'xl',
  headerMarginBottom = 6
}) => {
  return (
    <Container 
      maxWidth={maxWidth} 
      sx={{ 
        py: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PageHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        actions={actions}
        marginBottom={headerMarginBottom}
      />
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </Container>
  )
} 