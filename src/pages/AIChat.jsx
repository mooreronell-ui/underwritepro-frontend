import React, { useState, useEffect, useRef } from 'react';
import { aiAPI } from '../lib/api';
import { theme } from '../theme';

const QUICK_QUESTIONS = [
  "What documents do I need for a commercial loan?",
  "How is loan-to-value ratio calculated?",
  "What credit score is needed for approval?",
  "Explain debt service coverage ratio",
  "What's the difference between owner-occupied and investment property loans?",
  "How do you calculate Global DSCR?",
];

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI Underwriting Advisor. I have 20+ years of commercial lending expertise built into my knowledge base. Ask me anything about commercial loan underwriting, financial analysis, risk assessment, or lending guidelines.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (question = input) => {
    if (!question.trim() || loading) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiAPI.ask(question);
      
      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response.data.answer,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: 'calc(100vh - 100px)',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: theme.colors.primary[900], marginBottom: '8px' }}>
          🤖 AI Loan Advisor
        </h1>
        <p style={{ fontSize: '14px', color: theme.colors.neutral[600] }}>
          Get instant answers to your commercial underwriting questions
        </p>
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.colors.neutral[700], marginBottom: '12px' }}>
            Quick Questions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSend(question)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'white',
                  border: `1px solid ${theme.colors.neutral[300]}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: theme.colors.neutral[700],
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = theme.colors.primary[400];
                  e.target.style.backgroundColor = theme.colors.primary[50];
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = theme.colors.neutral[300];
                  e.target.style.backgroundColor = 'white';
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: theme.shadows.md,
        padding: '24px',
        overflowY: 'auto',
        marginBottom: '16px',
      }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: theme.colors.primary[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}>
              🤖
            </div>
            <div style={{
              backgroundColor: theme.colors.neutral[100],
              borderRadius: '12px',
              padding: '12px 16px',
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div className="typing-dot" style={dotStyle}></div>
                <div className="typing-dot" style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
                <div className="typing-dot" style={{ ...dotStyle, animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: theme.shadows.md,
        padding: '16px',
        display: 'flex',
        gap: '12px',
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about commercial loan underwriting..."
          rows={2}
          style={{
            flex: 1,
            padding: '12px',
            border: `1px solid ${theme.colors.neutral[300]}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'none',
            outline: 'none',
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          style={{
            padding: '12px 24px',
            backgroundColor: !input.trim() || loading ? theme.colors.neutral[300] : theme.colors.primary[600],
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Send
        </button>
      </div>

      <style>{`
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
        .typing-dot {
          animation: typing 1.4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '16px',
    }}>
      {!isUser && (
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: theme.colors.primary[100],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          flexShrink: 0,
        }}>
          🤖
        </div>
      )}
      
      <div style={{
        maxWidth: '70%',
        backgroundColor: isUser ? theme.colors.primary[600] : theme.colors.neutral[100],
        color: isUser ? 'white' : theme.colors.neutral[900],
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '14px',
        lineHeight: '1.6',
        whiteSpace: 'pre-wrap',
      }}>
        {message.content}
        <div style={{
          fontSize: '11px',
          marginTop: '6px',
          opacity: 0.7,
        }}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: theme.colors.primary[600],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '12px',
          color: 'white',
          fontSize: '18px',
          flexShrink: 0,
        }}>
          👤
        </div>
      )}
    </div>
  );
};

const dotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: theme.colors.primary[600],
};

export default AIChat;
