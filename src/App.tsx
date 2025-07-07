import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './providers/ThemeProvider'
import { Layout } from './components/Layout'
import {
  DataUploadScreen,
  LoadingScreen,
  ExplorerScreen,
  DashboardScreen,
  TrailScreen,
  ChatScreen,
} from './screens'
import './i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      refetchOnWindowFocus: false,
    },
  },
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Standalone routes (no layout) */}
            <Route path="/loading" element={<LoadingScreen />} />
            
            {/* Layout routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/explorer" replace />} />
              <Route path="explorer" element={<ExplorerScreen />} />
              <Route path="explorer/*" element={<ExplorerScreen />} />
              <Route path="upload" element={<DataUploadScreen />} />
              <Route path="dashboard" element={<DashboardScreen />} />
              <Route path="trail" element={<TrailScreen />} />
              <Route path="chat" element={<ChatScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App 