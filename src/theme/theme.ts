import { createTheme, ThemeOptions } from '@mui/material/styles'

// Augment the palette to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
    accent: Palette['primary']
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
    accent?: PaletteOptions['primary']
  }

  interface TypeText {
    primaryLight?: string
    medium?: string
  }

  interface TypeBackground {
    dark?: string
    subtle?: string
    medium?: string
    light?: string
  }

  interface BreakpointOverrides {
    tablet: true
    xxl: true
  }
}

const shadows: string[] = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0 2px 6px rgba(0,0,0,0.2)',
  '0px 8px 24px -4px rgba(16, 24, 40, 0.08), 0px 4px 8px -2px rgba(16, 24, 40, 0.04)',
  ...Array(21).fill('none'),
]

const darkShadows: string[] = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.4),0px 1px 1px 0px rgba(0,0,0,0.28),0px 1px 3px 0px rgba(0,0,0,0.24)',
  '0 2px 6px rgba(0,0,0,0.4)',
  '0px 8px 24px -4px rgba(0, 0, 0, 0.3), 0px 4px 8px -2px rgba(0, 0, 0, 0.2)',
  ...Array(21).fill('none'),
]

// Define custom breakpoint values
const customBreakpoints = {
  values: {
    xs: 0,
    sm: 640,
    tablet: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
    xxl: 1920,
  },
}

// Define base typography settings
const baseTypography: ThemeOptions['typography'] = {
  fontFamily: '"Inter", "system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  h1: {
    fontSize: '3.5rem',
    fontWeight: 600,
    [`@media (max-width:${customBreakpoints.values.tablet}px)`]: {
      fontSize: '2.8rem',
    },
  },
  h2: {
    fontSize: '2.625rem',
    fontWeight: 600,
    [`@media (max-width:${customBreakpoints.values.tablet}px)`]: {
      fontSize: '2.0rem',
    },
  },
  h3: {
    fontSize: '2.188rem',
    fontWeight: 600,
    [`@media (max-width:${customBreakpoints.values.tablet}px)`]: {
      fontSize: '1.6rem',
    },
  },
  h4: {
    fontSize: '1.969rem',
    fontWeight: 600,
    [`@media (max-width:${customBreakpoints.values.tablet}px)`]: {
      fontSize: '1.5rem',
    },
  },
  h5: {
    fontSize: '1.75rem',
    fontWeight: 600,
    [`@media (max-width:${customBreakpoints.values.tablet}px)`]: {
      fontSize: '1.4rem',
    },
  },
  h6: {
    fontSize: '1.531rem',
    fontWeight: 600,
    [`@media (max-width:${customBreakpoints.values.tablet}px)`]: {
      fontSize: '1.25rem',
    },
  },
  body1: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
}

export const lightTheme = createTheme({
  breakpoints: customBreakpoints,
  palette: {
    mode: 'light',
    primary: {
      main: '#4857EA',
      light: '#6B77FF',
      dark: '#3A47D1',
    },
    neutral: {
      main: '#bdbdbd',
    },
    accent: {
      main: '#0D47A1',
      dark: '#08306B',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      dark: '#242424',
      subtle: '#f5f5f5',
      medium: '#f8fafa',
      light: '#fcfcfd',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      medium: '#475569',
      primaryLight: 'rgba(255, 255, 255, 0.87)',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  shadows: shadows as any,
  typography: baseTypography,
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          borderRadius: 8,
          padding: '16px',
          boxShadow: currentTheme.shadows[1],
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '& code': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '#root': {
          height: '100dvh',
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  breakpoints: customBreakpoints,
  palette: {
    mode: 'dark',
    primary: {
      main: '#6B77FF',
      light: '#8F9BFF',
      dark: '#4857EA',
    },
    neutral: {
      main: '#757575',
    },
    accent: {
      main: '#1E88E5',
      dark: '#155FA0',
    },
    background: {
      default: '#0f0f0f',
      paper: '#1a1a1a',
      dark: '#000000',
      subtle: '#262626',
      medium: '#1f1f1f',
      light: '#2a2a2a',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      medium: 'rgba(255, 255, 255, 0.8)',
      primaryLight: '#ffffff',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  shadows: darkShadows as any,
  typography: baseTypography,
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          borderRadius: 8,
          padding: '16px',
          boxShadow: currentTheme.shadows[1],
          backgroundColor: currentTheme.palette.background.paper,
          border: `1px solid ${currentTheme.palette.divider}`,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          backgroundColor: currentTheme.palette.background.paper,
          border: `1px solid ${currentTheme.palette.divider}`,
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: () => ({
          '& code': {
            backgroundColor: '#333333',
            color: '#e0e0e0',
            padding: '2px 4px',
            borderRadius: '4px',
          },
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          backgroundColor: 'transparent',
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          backgroundColor: currentTheme.palette.background.paper,
          color: currentTheme.palette.text.primary,
          borderBottom: `1px solid ${currentTheme.palette.divider}`,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme: currentTheme }) => ({
          backgroundColor: currentTheme.palette.background.paper,
          borderRight: `1px solid ${currentTheme.palette.divider}`,
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '#root': {
          height: '100dvh',
        },
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
            border: '1px solid #2b2b2b',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
  },
})

export const theme = lightTheme 