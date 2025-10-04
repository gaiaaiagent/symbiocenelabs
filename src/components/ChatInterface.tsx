'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'Hello! I\'m Gaia, your AI companion for planetary intelligence. I can help you understand environmental data, analyze patterns, and explore solutions for Earth\'s challenges. What would you like to discover today?',
    timestamp: new Date(),
  }
];

const suggestedQueries = [
  'Show me global temperature trends',
  'What\'s the current state of deforestation?',
  'Analyze ocean acidification patterns',
  'Carbon emissions by region',
  'Renewable energy growth rates',
  'Biodiversity hotspots worldwide'
];

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on current satellite data, I can see some interesting patterns in your query. Let me analyze the environmental indicators...',
        'The data shows significant changes in this area. Here\'s what the AI models are detecting...',
        'That\'s a great question about planetary health. The latest environmental metrics indicate...',
        'I\'m processing real-time data from our global sensor network. The analysis reveals...',
        'According to our AI-powered environmental models, this trend is particularly noteworthy...'
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-green-glow hover:scale-110 transition-all duration-300 shadow-2xl group"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-gaia-green-neon rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </Button>
        
        <motion.div
          className="absolute bottom-20 right-0 bg-gaia-gray-dark rounded-lg p-3 shadow-xl border border-gaia-green/30"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gaia-white font-body whitespace-nowrap">
            Chat with <span className="text-gaia-green font-semibold">Gaia AI</span>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Card className={`glass-green shadow-2xl border-gaia-green/30 ${
        isMinimized 
          ? 'w-80 h-16' 
          : 'w-96 h-[600px]'
      } transition-all duration-300`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gaia-green/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-gaia-green-neon rounded-full border-2 border-gaia-gray-dark"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <div>
              <h3 className="font-title text-lg font-bold text-gaia-white">Gaia Agent</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-gaia-green/20 text-gaia-green border-gaia-green/30 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Online
                </Badge>
                {isTyping && (
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    <Brain className="w-3 h-3 mr-1" />
                    Thinking...
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gaia-white/70 hover:text-gaia-green"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gaia-white/70 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              className="flex flex-col h-[calc(100%-5rem)]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'calc(100% - 5rem)' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-gradient-green text-white' 
                          : 'bg-gaia-gray-medium text-gaia-white'
                      } rounded-2xl px-4 py-2 relative`}>
                        <div className="flex items-start gap-2">
                          {message.type === 'assistant' && (
                            <Bot className="w-4 h-4 text-gaia-green mt-1 flex-shrink-0" />
                          )}
                          {message.type === 'user' && (
                            <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                          )}
                          <p className="text-sm font-body leading-relaxed">{message.content}</p>
                        </div>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gaia-gray-medium text-gaia-white rounded-2xl px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-gaia-green" />
                          <div className="flex gap-1">
                            <motion.div
                              className="w-2 h-2 bg-gaia-green rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gaia-green rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gaia-green rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Suggested Queries */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-gaia-white/60 mb-2 font-body">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQueries.slice(0, 3).map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuery(query)}
                        className="text-xs bg-gaia-gray-medium/50 text-gaia-white/80 border-gaia-green/20 hover:bg-gaia-green/20 hover:text-gaia-green"
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gaia-green/20">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Gaia about environmental data..."
                      className="w-full bg-gaia-gray-medium border border-gaia-green/20 rounded-xl px-4 py-3 text-gaia-white placeholder-gaia-white/50 focus:outline-none focus:ring-2 focus:ring-gaia-green/50 font-body"
                      disabled={isTyping}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-green hover:opacity-90 p-3 rounded-xl"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}