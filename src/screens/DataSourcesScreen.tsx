import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Divider,
  useTheme,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Tooltip,
} from '@mui/material'
import {
  FilterList as FilterListIcon,
  Storage as StorageIcon,
  TableChart as TableChartIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Science as ScienceIcon,
  Sync as SyncIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Pause as PauseIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'
import { Page } from '../components/Page'
import {
  CloudUpload as CloudUploadIcon,
  Book as BookIcon,
  Support as SupportIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Settings as SettingsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Computer as DatabaseIcon,
  Cloud as CloudQueueIcon,
  Description as FileIcon,
  Schema as DataWarehouseIcon,
} from '@mui/icons-material'
import { addTrailStep } from '../store/appState'

interface DataSource {
  id: string
  name: string
  description: string
  category: 'SQL Databases' | 'Files'
  icon: React.ReactNode
  popular: boolean
  status: 'Available' | 'Coming Soon' | 'Beta'
}

interface ConnectedSource {
  id: string
  name: string
  category: 'SQL Databases' | 'Files'
  icon: React.ReactNode
  status: 'Indexed' | 'Error' | 'Syncing' | 'Paused'
  lastIndexed: string
  permissions: 'Organization Public' | 'Private' | 'Team'
  totalDocs: number
  syncFrequency: 'real_time' | 'hourly' | 'daily' | 'weekly'
  endpoint?: string
  authMethod?: string
}

interface CategoryMetrics {
  totalConnectors: number
  activeConnectors: number
  publicConnectors: number
  totalDocsIndexed: number
}

interface CustomDataSource {
  name: string
  description: string
  type: string
  category: 'SQL Databases' | 'Files'
  authMethod: 'api_key' | 'oauth' | 'basic_auth' | 'bearer_token' | 'none'
  endpoint: string
  customFields: string
  syncFrequency: 'real_time' | 'hourly' | 'daily' | 'weekly'
}

// Mock connected sources data
const connectedSources: ConnectedSource[] = [
  {
    id: 'postgresql-1',
    name: 'PostgreSQL - Production',
    category: 'SQL Databases',
    icon: <DatabaseIcon />,
    status: 'Indexed',
    lastIndexed: '15 minutes ago',
    permissions: 'Organization Public',
    totalDocs: 125847,
    syncFrequency: 'real_time',
    endpoint: 'postgresql://prod-db:5432/analytics',
    authMethod: 'basic_auth',
  },
  {
    id: 'mysql-1',
    name: 'MySQL - E-commerce',
    category: 'SQL Databases',
    icon: <DatabaseIcon />,
    status: 'Error',
    lastIndexed: '3 hours ago',
    permissions: 'Organization Public',
    totalDocs: 89234,
    syncFrequency: 'hourly',
    endpoint: 'mysql://ecommerce-db:3306/sales',
    authMethod: 'basic_auth',
  },
  {
    id: 'mssql-1',
    name: 'MSSQL - Data Warehouse',
    category: 'SQL Databases',
    icon: <DatabaseIcon />,
    status: 'Indexed',
    lastIndexed: '30 minutes ago',
    permissions: 'Team',
    totalDocs: 67890,
    syncFrequency: 'hourly',
    endpoint: 'mssql://warehouse-db:1433/analytics',
    authMethod: 'basic_auth',
  },
  {
    id: 'files-1',
    name: 'File System - Documents',
    category: 'Files',
    icon: <FileIcon />,
    status: 'Syncing',
    lastIndexed: '20 minutes ago',
    permissions: 'Organization Public',
    totalDocs: 15782,
    syncFrequency: 'hourly',
    endpoint: 'file:///data/documents/',
    authMethod: 'none',
  },
]

const dataSources: DataSource[] = [
  {
    id: 'file',
    name: 'File',
    description: 'Connect to file systems and import documents, CSV, PDF, and other file types',
    category: 'Files',
    icon: <FileIcon />,
    popular: true,
    status: 'Available',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    description: 'Import data from MySQL databases',
    category: 'SQL Databases',
    icon: <DatabaseIcon />,
    popular: true,
    status: 'Available',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Connect to PostgreSQL databases for structured data analysis',
    category: 'SQL Databases',
    icon: <DatabaseIcon />,
    popular: true,
    status: 'Available',
  },
  {
    id: 'mssql',
    name: 'MSSQL',
    description: 'Connect to Microsoft SQL Server databases',
    category: 'SQL Databases',
    icon: <DatabaseIcon />,
    popular: true,
    status: 'Available',
  },
]

const wizardSteps = [
  'Basic Information',
  'Authentication',
  'API Configuration',
  'Sync Settings',
]

export const DataSourcesScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const theme = useTheme()
  const [currentView, setCurrentView] = useState<'connectors' | 'add-new'>('connectors')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false)
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionTestResult, setConnectionTestResult] = useState<'success' | 'error' | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'SQL Databases': true,
    Files: true,
  })
  const [customDataSource, setCustomDataSource] = useState<CustomDataSource>({
    name: '',
    description: '',
    type: '',
    category: 'SQL Databases',
    authMethod: 'api_key',
    endpoint: '',
    customFields: '',
    syncFrequency: 'daily',
  })
  const [connectionForm, setConnectionForm] = useState({
    name: '',
    host: '',
    port: '',
    database: '',
    username: '',
    password: '',
    filePath: '',
    apiKey: '',
    authMethod: 'basic_auth',
    syncFrequency: 'daily',
  })

  React.useEffect(() => {
    addTrailStep({
      title: 'Data Sources',
      type: 'explorer',
      path: '/data-sources',
      description: 'Managing data source connections and integrations',
    })
  }, [])

  const handleViewChange = (view: 'connectors' | 'add-new') => {
    setCurrentView(view)
  }

  const handleBackToConnectors = () => {
    setCurrentView('connectors')
  }

  const getConnectedSourcesByCategory = (category: string) => {
    return connectedSources.filter(source => source.category === category)
  }

  const getCategoryMetrics = (category: string): CategoryMetrics => {
    const sources = getConnectedSourcesByCategory(category)
    const activeConnectors = sources.filter(s => s.status === 'Indexed' || s.status === 'Syncing').length
    const publicConnectors = sources.filter(s => s.permissions === 'Organization Public').length
    const totalDocsIndexed = sources.reduce((sum, s) => sum + s.totalDocs, 0)
    
    return {
      totalConnectors: sources.length,
      activeConnectors,
      publicConnectors,
      totalDocsIndexed,
    }
  }

  const handleCategoryToggle = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setCustomDataSource({
      name: '',
      description: '',
      type: '',
      category: 'SQL Databases',
      authMethod: 'api_key',
      endpoint: '',
      customFields: '',
      syncFrequency: 'daily',
    })
    setConnectionTestResult(null)
  }

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setConnectionTestResult(Math.random() > 0.3 ? 'success' : 'error')
    setIsTestingConnection(false)
  }

  const handleCreateCustomSource = () => {
    console.log('Creating custom data source:', customDataSource)
    setIsDialogOpen(false)
    handleReset()
  }

  const handleConnectDataSource = (dataSource: DataSource) => {
    setSelectedDataSource(dataSource)
    setConnectionForm({
      name: `${dataSource.name} Connection`,
      host: '',
      port: getDefaultPort(dataSource.id),
      database: '',
      username: '',
      password: '',
      filePath: '',
      apiKey: '',
      authMethod: getDefaultAuthMethod(dataSource.id),
      syncFrequency: 'daily',
    })
    setIsConnectionDialogOpen(true)
  }

  const getDefaultPort = (dataSourceId: string) => {
    switch (dataSourceId) {
      case 'postgresql': return '5432'
      case 'mysql': return '3306'
      case 'mssql': return '1433'
      default: return ''
    }
  }

  const getDefaultAuthMethod = (dataSourceId: string) => {
    switch (dataSourceId) {
      case 'file': return 'none'
      case 'mysql':
      case 'postgresql':
      case 'mssql': return 'basic_auth'
      default: return 'basic_auth'
    }
  }

  const handleConnectionSubmit = () => {
    console.log('Creating connection:', {
      dataSource: selectedDataSource,
      connectionDetails: connectionForm,
    })
    setIsConnectionDialogOpen(false)
    setSelectedDataSource(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Indexed':
        return <CheckCircleIcon color="success" />
      case 'Error':
        return <ErrorIcon color="error" />
      case 'Syncing':
        return <SyncIcon color="primary" />
      case 'Paused':
        return <PauseIcon color="warning" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'success'
      case 'Beta':
        return 'warning'
      case 'Coming Soon':
        return 'default'
      default:
        return 'default'
    }
  }

  const renderConnectedSourcesView = () => {
    const categoriesWithSources = ['SQL Databases', 'Files']
    
    return (
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 0,
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.15 : 0.1)}`,
            overflow: 'hidden',
            '&:hover': {
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    '& .MuiTableCell-head': {
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: theme.palette.text.primary,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell>Last Indexed</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell align="right">Total Docs</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesWithSources.map((category) => {
                  const metrics = getCategoryMetrics(category)
                  const sources = getConnectedSourcesByCategory(category)
                  const isExpanded = expandedCategories[category]
                  
                  if (sources.length === 0) return null

                  return (
                    <React.Fragment key={category}>
                      {/* Category Header Row */}
                      <TableRow 
                        sx={{ 
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '& .MuiTableCell-root': {
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                            py: 2,
                          },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={() => handleCategoryToggle(category)}
                              sx={{ 
                                mr: 2,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                },
                              }}
                            >
                              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 600,
                                fontSize: '1rem',
                                color: theme.palette.text.primary,
                                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {category}
                            </Typography>
                            <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                              <Chip
                                label={`${metrics.totalConnectors} total`}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  fontSize: '0.7rem',
                                  height: 22,
                                }}
                              />
                              <Chip
                                label={`${metrics.activeConnectors} active`}
                                size="small"
                                color="success"
                                variant="outlined"
                                sx={{ 
                                  fontSize: '0.7rem',
                                  height: 22,
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {sources.length} connectors
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {metrics.activeConnectors} of {metrics.totalConnectors}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {metrics.publicConnectors} public
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {metrics.totalDocsIndexed.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                      
                      {/* Individual Source Rows */}
                      {sources.map((source) => (
                        <TableRow 
                          key={source.id} 
                          sx={{ 
                            display: isExpanded ? 'table-row' : 'none',
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.02),
                            },
                            '& .MuiTableCell-root': {
                              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                              py: 2,
                            },
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 4 }}>
                              <Box 
                                sx={{ 
                                  mr: 2, 
                                  color: theme.palette.primary.main,
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {source.icon}
                              </Box>
                              <Box>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: 500,
                                    color: theme.palette.text.primary,
                                    mb: 0.5,
                                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                                  }}
                                >
                                  {source.name}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ 
                                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                                  }}
                                >
                                  {source.endpoint}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ 
                                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {source.lastIndexed}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getStatusIcon(source.status)}
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  ml: 1,
                                  fontWeight: 500,
                                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                                }}
                              >
                                {source.status}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={source.permissions}
                              size="small"
                              variant="outlined"
                              color={source.permissions === 'Organization Public' ? 'success' : 'default'}
                              sx={{ 
                                fontSize: '0.7rem',
                                height: 22,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography 
                              variant="body2"
                              sx={{ 
                                fontWeight: 500,
                                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {source.totalDocs.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                              <Tooltip title="Settings">
                                <IconButton 
                                  size="small"
                                  sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                      color: theme.palette.primary.main,
                                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                >
                                  <SettingsIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Refresh">
                                <IconButton 
                                  size="small"
                                  sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                      color: theme.palette.primary.main,
                                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                >
                                  <RefreshIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton 
                                  size="small"
                                  sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                      color: theme.palette.primary.main,
                                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton 
                                  size="small"
                                  sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                      color: theme.palette.error.main,
                                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    )
  }

  const renderConnectionForm = () => {
    if (!selectedDataSource) return null

    const isFileSource = selectedDataSource.category === 'Files'

    return (
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Connection Name"
          variant="standard"
          value={connectionForm.name}
          onChange={(e) => setConnectionForm(prev => ({ ...prev, name: e.target.value }))}
          sx={{ mb: 3 }}
        />

        {isFileSource ? (
          <TextField
            fullWidth
            label="File Path or URL"
            variant="standard"
            placeholder="e.g., /data/files/sales.csv or https://example.com/data.csv"
            value={connectionForm.filePath}
            onChange={(e) => setConnectionForm(prev => ({ ...prev, filePath: e.target.value }))}
            sx={{ mb: 3 }}
          />
        ) : (
          <>
            <TextField
              fullWidth
              label="Host"
              variant="standard"
              placeholder="e.g., localhost or your-server.com"
              value={connectionForm.host}
              onChange={(e) => setConnectionForm(prev => ({ ...prev, host: e.target.value }))}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Port"
              variant="standard"
              value={connectionForm.port}
              onChange={(e) => setConnectionForm(prev => ({ ...prev, port: e.target.value }))}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Database Name"
              variant="standard"
              value={connectionForm.database}
              onChange={(e) => setConnectionForm(prev => ({ ...prev, database: e.target.value }))}
              sx={{ mb: 3 }}
            />
          </>
        )}

        {connectionForm.authMethod === 'basic_auth' && (
          <>
            <TextField
              fullWidth
              label="Username"
              variant="standard"
              value={connectionForm.username}
              onChange={(e) => setConnectionForm(prev => ({ ...prev, username: e.target.value }))}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="standard"
              type="password"
              value={connectionForm.password}
              onChange={(e) => setConnectionForm(prev => ({ ...prev, password: e.target.value }))}
              sx={{ mb: 3 }}
            />
          </>
        )}

        {connectionForm.authMethod === 'oauth' && (
          <Alert severity="info" sx={{ mb: 3 }}>
            You will be redirected to {selectedDataSource.name} to authorize the connection after clicking "Connect".
          </Alert>
        )}

        {connectionForm.authMethod === 'api_key' && (
          <TextField
            fullWidth
            label="API Key"
            variant="standard"
            type="password"
            value={connectionForm.apiKey}
            onChange={(e) => setConnectionForm(prev => ({ ...prev, apiKey: e.target.value }))}
            sx={{ mb: 3 }}
          />
        )}

        {connectionForm.authMethod === 'none' && (
          <Alert severity="info" sx={{ mb: 3 }}>
            No authentication is required for this data source type.
          </Alert>
        )}

        <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
          <InputLabel>Sync Frequency</InputLabel>
          <Select
            value={connectionForm.syncFrequency}
            onChange={(e) => setConnectionForm(prev => ({ ...prev, syncFrequency: e.target.value }))}
          >
            <MenuItem value="real_time">Real-time</MenuItem>
            <MenuItem value="hourly">Hourly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={isTestingConnection ? <CircularProgress size={16} /> : <ScienceIcon />}
            onClick={handleTestConnection}
            disabled={isTestingConnection || (!connectionForm.host && !connectionForm.filePath)}
          >
            {isTestingConnection ? 'Testing...' : 'Test Connection'}
          </Button>
          
          {connectionTestResult === 'success' && (
            <Alert severity="success" sx={{ flexGrow: 1 }}>
              Connection successful!
            </Alert>
          )}
          
          {connectionTestResult === 'error' && (
            <Alert severity="error" sx={{ flexGrow: 1 }}>
              Connection failed. Please check your configuration.
            </Alert>
          )}
        </Box>
      </Box>
    )
  }

  const renderAvailableSourcesView = () => (
    <Box>
      <Grid container spacing={3}>
        {dataSources.map((source) => (
          <Grid item xs={12} sm={6} md={4} key={source.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2, color: theme.palette.primary.main }}>
                    {source.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {source.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip
                        label={source.status}
                        size="small"
                        color={getStatusColor(source.status) as any}
                        variant="outlined"
                      />
                      {source.popular && (
                        <Chip
                          label="Popular"
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {source.description}
                </Typography>
                <Chip
                  label={source.category}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={source.status === 'Coming Soon'}
                    startIcon={source.status === 'Available' ? <CheckCircleIcon /> : <CancelIcon />}
                    onClick={() => source.status === 'Available' && handleConnectDataSource(source)}
                  >
                    {source.status === 'Available' ? 'Connect' : source.status}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )

  const renderBasicInformation = () => (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        value={customDataSource.name}
        onChange={(e) => setCustomDataSource(prev => ({ ...prev, name: e.target.value }))}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Description"
        variant="standard"
        multiline
        rows={3}
        value={customDataSource.description}
        onChange={(e) => setCustomDataSource(prev => ({ ...prev, description: e.target.value }))}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Data Source Type"
        variant="standard"
        placeholder="e.g., REST API, Database, File System"
        value={customDataSource.type}
        onChange={(e) => setCustomDataSource(prev => ({ ...prev, type: e.target.value }))}
        sx={{ mb: 3 }}
      />
      <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={customDataSource.category}
          onChange={(e) => setCustomDataSource(prev => ({ ...prev, category: e.target.value as any }))}
        >
          <MenuItem value="SQL Databases">SQL Databases</MenuItem>
          <MenuItem value="Files">Files</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )

  const renderAuthentication = () => (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
        <InputLabel>Authentication Method</InputLabel>
        <Select
          value={customDataSource.authMethod}
          onChange={(e) => setCustomDataSource(prev => ({ ...prev, authMethod: e.target.value as any }))}
        >
          <MenuItem value="api_key">API Key</MenuItem>
          <MenuItem value="oauth">OAuth 2.0</MenuItem>
          <MenuItem value="basic_auth">Basic Authentication</MenuItem>
          <MenuItem value="bearer_token">Bearer Token</MenuItem>
          <MenuItem value="none">No Authentication</MenuItem>
        </Select>
      </FormControl>
      
      {customDataSource.authMethod === 'api_key' && (
        <TextField
          fullWidth
          label="API Key"
          variant="standard"
          type="password"
          placeholder="Enter your API key"
          sx={{ mb: 3 }}
        />
      )}
      
      {customDataSource.authMethod === 'oauth' && (
        <Box>
          <TextField
            fullWidth
            label="Client ID"
            variant="standard"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Client Secret"
            variant="standard"
            type="password"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Redirect URI"
            variant="standard"
            sx={{ mb: 3 }}
          />
        </Box>
      )}
      
      {customDataSource.authMethod === 'basic_auth' && (
        <Box>
          <TextField
            fullWidth
            label="Username"
            variant="standard"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="standard"
            type="password"
            sx={{ mb: 3 }}
          />
        </Box>
      )}
      
      {customDataSource.authMethod === 'bearer_token' && (
        <TextField
          fullWidth
          label="Bearer Token"
          variant="standard"
          type="password"
          placeholder="Enter bearer token"
          sx={{ mb: 3 }}
        />
      )}
      
      {customDataSource.authMethod === 'none' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No authentication is required for this data source type.
        </Alert>
      )}
    </Box>
  )

  const renderApiConfiguration = () => (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="API Endpoint"
        variant="standard"
        placeholder="https://api.example.com"
        value={customDataSource.endpoint}
        onChange={(e) => setCustomDataSource(prev => ({ ...prev, endpoint: e.target.value }))}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Custom Headers/Parameters"
        variant="standard"
        multiline
        rows={4}
        placeholder="JSON format: { &quot;header&quot;: &quot;value&quot; }"
        value={customDataSource.customFields}
        onChange={(e) => setCustomDataSource(prev => ({ ...prev, customFields: e.target.value }))}
        sx={{ mb: 3 }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={isTestingConnection ? <CircularProgress size={16} /> : <ScienceIcon />}
          onClick={handleTestConnection}
          disabled={isTestingConnection || !customDataSource.endpoint}
        >
          {isTestingConnection ? 'Testing...' : 'Test Connection'}
        </Button>
        
        {connectionTestResult === 'success' && (
          <Alert severity="success" sx={{ flexGrow: 1 }}>
            Connection successful!
          </Alert>
        )}
        
        {connectionTestResult === 'error' && (
          <Alert severity="error" sx={{ flexGrow: 1 }}>
            Connection failed. Please check your configuration.
          </Alert>
        )}
      </Box>
    </Box>
  )

  const renderSyncSettings = () => (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
        <InputLabel>Sync Frequency</InputLabel>
        <Select
          value={customDataSource.syncFrequency}
          onChange={(e) => setCustomDataSource(prev => ({ ...prev, syncFrequency: e.target.value as any }))}
        >
          <MenuItem value="real_time">Real-time</MenuItem>
          <MenuItem value="hourly">Hourly</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
        </Select>
      </FormControl>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Data Processing Options
        </Typography>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Enable automatic data cleaning"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Extract metadata from documents"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Enable full-text search indexing"
        />
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Summary
      </Typography>
      <Box sx={{ bgcolor: theme.palette.background.default, p: 2, borderRadius: 1 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Name:</strong> {customDataSource.name || 'Not specified'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Type:</strong> {customDataSource.type || 'Not specified'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Category:</strong> {customDataSource.category}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Authentication:</strong> {customDataSource.authMethod.replace('_', ' ').toUpperCase()}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Endpoint:</strong> {customDataSource.endpoint || 'Not specified'}
        </Typography>
        <Typography variant="body2">
          <strong>Sync Frequency:</strong> {customDataSource.syncFrequency.replace('_', ' ').charAt(0).toUpperCase() + customDataSource.syncFrequency.replace('_', ' ').slice(1)}
        </Typography>
      </Box>
    </Box>
  )

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderBasicInformation()
      case 1:
        return renderAuthentication()
      case 2:
        return renderApiConfiguration()
      case 3:
        return renderSyncSettings()
      default:
        return null
    }
  }

  const getPageTitle = () => {
    if (currentView === 'add-new') {
      return 'Add New Connector'
    }
    return (t as any)('DATA_SOURCES.TITLE')
  }

  const getPageSubtitle = () => {
    if (currentView === 'add-new') {
      return 'Choose a data source to connect to your system'
    }
    return (t as any)('DATA_SOURCES.SUBTITLE')
  }

  const getPageActions = () => {
    if (currentView === 'add-new') {
      return (
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToConnectors}
          sx={{ borderRadius: 2 }}
        >
          Back to Connectors
        </Button>
      )
    }
    
    return (
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleViewChange('add-new')}
        sx={{ borderRadius: 2 }}
      >
        Add New Connector
      </Button>
    )
  }

  return (
    <Page
      title={getPageTitle()}
      subtitle={getPageSubtitle()}
      actions={getPageActions()}
      headerMarginBottom={4}
    >
      {currentView === 'connectors' && renderConnectedSourcesView()}
      {currentView === 'add-new' && renderAvailableSourcesView()}

      {/* Custom Source Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {(t as any)('DATA_SOURCES.ADD_CUSTOM')}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {wizardSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>
            {(t as any)('COMMON.CANCEL')}
          </Button>
          <Button onClick={handleReset}>
            Reset
          </Button>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === wizardSteps.length - 1 ? handleCreateCustomSource : handleNext}
            disabled={
              (activeStep === 0 && !customDataSource.name) ||
              (activeStep === 2 && !customDataSource.endpoint)
            }
          >
            {activeStep === wizardSteps.length - 1 ? 'Create Source' : 'Next'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Connection Form Dialog */}
      <Dialog
        open={isConnectionDialogOpen}
        onClose={() => setIsConnectionDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Connect to {selectedDataSource?.name}
        </DialogTitle>
        <DialogContent>
          {renderConnectionForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConnectionDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConnectionSubmit}
            disabled={
              !connectionForm.name || 
              (!connectionForm.host && !connectionForm.filePath) ||
              (connectionForm.authMethod === 'basic_auth' && (!connectionForm.username || !connectionForm.password)) ||
              (connectionForm.authMethod === 'api_key' && !connectionForm.apiKey)
            }
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
} 