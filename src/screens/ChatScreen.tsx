import React, { useState } from 'react'
import { 
  Box, 
  Typography, 
  Container,
  useTheme,
  alpha,
  Paper,
  TextField,
  IconButton,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from '@mui/material'
import { 
  SmartToy as AgentIcon,
  Send,
  AutoAwesome,
  Person,
  Psychology,
} from '@mui/icons-material'
import { useTypedTranslation } from '../hooks/useTypedTranslation'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "What are my top performing routes?",
  "Which orders experienced the most delays?", 
  "How can I optimize my delivery costs?",
  "What patterns do you see in my logistics data?",
  "Show me inventory performance metrics",
  "Analyze my shipping efficiency trends",
]

export const ChatScreen: React.FC = () => {
  const { t } = useTypedTranslation()
  const theme = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isThinking, setIsThinking] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsThinking(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Based on your logistics data, I can see several interesting patterns. Your question about "${userMessage.content}" touches on important operational metrics. Let me analyze the key factors:\n\n• Average delivery performance is trending upward\n• Cost optimization opportunities exist in route planning\n• Inventory turnover rates show seasonal variations\n• Customer satisfaction metrics correlate with delivery speed\n\nWould you like me to dive deeper into any specific area?`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsThinking(false)
    }, 2000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${alpha('#4857EA', 0.1)}, ${alpha('#4857EA', 0.05)})`,
              border: `1px solid ${alpha('#4857EA', 0.2)}`,
            }}
          >
            <AgentIcon 
              sx={{ 
                fontSize: 32, 
                color: '#4857EA',
              }} 
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                color: 'text.primary',
                mb: 0.5,
                letterSpacing: '-0.02em',
              }}
            >
              {t('CHAT.TITLE')}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                fontSize: '1.1rem',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: 1.5,
              }}
            >
              {t('CHAT.SUBTITLE')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, height: 'calc(100vh - 200px)' }}>
        {/* Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Messages */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {messages.length === 0 ? (
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${alpha('#4857EA', 0.1)}, ${alpha('#4857EA', 0.05)})`,
                    border: `1px solid ${alpha('#4857EA', 0.2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Psychology sx={{ fontSize: 40, color: '#4857EA' }} />
                </Box>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  Start a conversation
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.disabled" 
                  sx={{ 
                    maxWidth: 400,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  Ask me anything about your logistics data. I can help you analyze patterns, optimize operations, and provide insights.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        maxWidth: '70%',
                        bgcolor: message.type === 'user' ? 'primary.main' : 'background.subtle',
                        color: message.type === 'user' ? 'primary.contrastText' : 'text.primary',
                        borderRadius: 2,
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                          {message.type === 'assistant' ? (
                            <AgentIcon sx={{ fontSize: 18, color: 'primary.main', mt: 0.2 }} />
                          ) : (
                            <Person sx={{ fontSize: 18, color: 'primary.contrastText', mt: 0.2 }} />
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {message.type === 'assistant' ? 'AI Assistant' : 'You'}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            lineHeight: 1.5,
                          }}
                        >
                          {message.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.7,
                            mt: 1,
                            display: 'block',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
                
                {isThinking && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    <Card
                      elevation={0}
                      sx={{
                        bgcolor: 'background.subtle',
                        borderRadius: 2,
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AgentIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            AI is thinking...
                          </Typography>
                          <AutoAwesome 
                            sx={{ 
                              fontSize: 16, 
                              color: 'primary.main',
                              animation: 'pulse 1.5s ease-in-out infinite',
                            }} 
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                )}
              </Box>
            )}

            {/* Input Area */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your logistics data..."
                variant="outlined"
                disabled={isThinking}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isThinking}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:disabled': {
                    bgcolor: 'action.disabled',
                    color: 'action.disabled',
                  },
                }}
              >
                <Send />
              </IconButton>
            </Box>
          </Paper>
        </Box>

        {/* Suggestions Panel */}
        <Box sx={{ width: 300 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 1,
              p: 3,
              height: 'fit-content',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Suggested Questions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleSuggestedQuestion(question)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    borderRadius: 1,
                    borderColor: alpha(theme.palette.divider, 0.3),
                    color: 'text.secondary',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 400,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      color: 'primary.main',
                    },
                  }}
                >
                  {question}
                </Button>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label="Analyze Data"
                  size="small"
                  onClick={() => handleSuggestedQuestion("Analyze my current data patterns")}
                  sx={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                />
                <Chip
                  label="Optimize Routes"
                  size="small"
                  onClick={() => handleSuggestedQuestion("How can I optimize my delivery routes?")}
                  sx={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                />
                <Chip
                  label="Cost Analysis"
                  size="small"
                  onClick={() => handleSuggestedQuestion("Show me a detailed cost breakdown")}
                  sx={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  )
} 