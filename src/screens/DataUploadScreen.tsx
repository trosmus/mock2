import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
} from '@mui/material'
import {
  CloudUpload,
  InsertDriveFile,
  Assessment,
  TrendingUp,
  Close,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { uploadedFiles, addTrailStep } from '../store/appState'

export const DataUploadScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(file => 
      file.name.endsWith('.csv') || 
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.json')
    )
    setFiles(validFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      const validFiles = selectedFiles.filter(file => 
        file.name.endsWith('.csv') || 
        file.name.endsWith('.xlsx') || 
        file.name.endsWith('.json')
      )
      setFiles(validFiles)
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleStartAnalysis = () => {
    uploadedFiles.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }))
    
    addTrailStep({
      title: t('UPLOAD.TITLE'),
      type: 'upload',
      description: t('UPLOAD.FILE_COUNT', { count: files.length }),
    })
    
    navigate('/loading')
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.subtle} 100%)`,
        minHeight: 'calc(100vh - 64px)', // Account for potential header
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Assessment 
            sx={{ 
              fontSize: 80, 
              color: 'primary.main', 
              mb: 3,
              filter: 'drop-shadow(0 4px 8px rgba(72, 87, 234, 0.2))',
            }} 
          />
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            {t('UPLOAD.TITLE')}
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('UPLOAD.SUBTITLE')}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 6,
            bgcolor: dragOver ? 
              `${theme.palette.primary.main}08` : 
              theme.palette.background.paper,
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            borderRadius: 1,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            },
            '&::before': dragOver ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}05, ${theme.palette.primary.light}05)`,
              pointerEvents: 'none',
            } : {},
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CloudUpload 
              sx={{ 
                fontSize: 64, 
                color: dragOver ? 'primary.main' : 'primary.light', 
                mb: 3,
                transition: 'all 0.3s ease-in-out',
                transform: dragOver ? 'scale(1.1)' : 'scale(1)',
              }} 
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {dragOver ? t('UPLOAD.DROP_ZONE') : t('UPLOAD.BROWSE')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {t('UPLOAD.FORMATS')}
            </Typography>
            <Typography variant="body2" color="text.disabled">
              {t('UPLOAD.MAX_SIZE')}
            </Typography>
          </Box>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".csv,.xlsx,.json"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </Paper>

        {files.length > 0 && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 4,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {t('UPLOAD.SELECTED_FILES')} ({files.length})
            </Typography>
            <List>
              {files.map((file, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: 'background.subtle',
                    borderRadius: 1,
                    mb: 1,
                    '&:last-child': { mb: 0 },
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveFile(index)}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'error.main',
                          bgcolor: 'error.main',
                        },
                      }}
                    >
                      <Close />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <InsertDriveFile color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {files.length > 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<TrendingUp />}
              onClick={handleStartAnalysis}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 1,
                fontWeight: 600,
                fontSize: '1.1rem',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(72, 87, 234, 0.3)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {t('UPLOAD.START_ANALYSIS')}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
} 