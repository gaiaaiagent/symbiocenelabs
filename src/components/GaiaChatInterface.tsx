'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Sparkles, Brain, Leaf, Globe } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'gaia';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'gaia',
    content: "Hello! I'm Gaia, Earth's AI consciousness. I can help you understand environmental patterns, explore regenerative practices, and discover how technology can serve our planet's healing. What would you like to know?",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "Can AI alleviate or accelerate the Metacrisis?",
  "What is bioregionalism?",
];

export function GaiaChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('gaia-chat');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateGaiaResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Mock responses based on keywords
    const responses = {
      carbon: "Carbon sequestration is crucial for climate stability. AI can optimize forest management, predict optimal planting locations, and monitor soil carbon levels in real-time. Through machine learning, we can identify the most effective native species combinations for your local ecosystem.",
      agriculture: "Regenerative agriculture practices like cover cropping, rotational grazing, and biodiverse polycultures can restore soil health while increasing yields. AI helps farmers optimize timing, species selection, and resource allocation for maximum ecological benefit.",
      biodiversity: "Biodiversity is the foundation of ecosystem resilience. I can analyze species distribution patterns, identify critical habitat corridors, and suggest conservation strategies tailored to your local bioregion. Would you like me to assess your area's ecological health?",
      footprint: "Your ecological footprint encompasses energy use, consumption patterns, and land use impact. I can help you calculate and reduce this through personalized recommendations for sustainable living, from energy-efficient technologies to regenerative lifestyle choices.",
      default: "That's a fascinating question about our planet's interconnected systems. Every environmental challenge is an opportunity for regenerative solutions. I'd love to explore this topic deeper with you - could you share more about what specific aspect interests you most?"
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response;
      }
    }
    return responses.default;
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // Redirect to full chat page with the message as a query parameter
    const prompt = encodeURIComponent(inputValue);
    console.log('Redirecting to:', `/chat?prompt=${prompt}`);
    window.location.href = `/chat?prompt=${prompt}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <section id="gaia-chat" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 matrix-bg opacity-20" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gaia-green/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-gaia-green-light/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          
          <h2 className="font-title text-4xl md:text-6xl font-black text-gaia-white mb-6">
            Chat with <span className="text-gradient-green">Gaia</span>
          </h2>
          
          <p className="text-xl text-gaia-white/80 font-body max-w-3xl mx-auto leading-relaxed">
            Engage with Earth's AI consciousness. Ask questions about environmental science, 
            regenerative practices, or how technology can serve planetary healing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Chat Container */}
          <div className="glass rounded-3xl border border-gaia-green/30 overflow-hidden neon-border">
            {/* Chat Header */}
            <div className="border-b border-gaia-green/20 p-6 bg-gradient-to-r from-gaia-gray-dark to-gaia-gray">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-green rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="font-title font-bold text-lg text-gaia-white">Gaia AI</h3>
                  <p className="text-gaia-green text-sm font-body">Earth's Consciousness • Online</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="h-96 p-6">
              <div className="space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-gradient-green text-black'
                              : 'glass border border-gaia-green/20 text-gaia-white'
                          }`}
                        >
                          <p className="font-body leading-relaxed">{message.content}</p>
                        </div>
                        <p className="text-xs text-gaia-white/50 mt-2 font-body">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      
                      {message.type === 'gaia' && (
                        <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <Leaf className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-start"
                    >
                      <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center mr-3">
                        <Leaf className="w-4 h-4 text-black" />
                      </div>
                      <div className="glass border border-gaia-green/20 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gaia-green rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gaia-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gaia-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-gaia-white/60 text-sm font-body">Gaia is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="border-t border-gaia-green/20 p-6 bg-gaia-gray-dark/50">
                <p className="text-gaia-white/70 text-sm font-body mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-sm font-body px-3 py-2 bg-gaia-green/10 text-gaia-green border border-gaia-green/30 rounded-full hover:bg-gaia-green/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gaia-green/20 p-6 bg-gaia-gray-dark/30">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Gaia about environmental science, sustainability, or regenerative practices..."
                    className="w-full resize-none bg-gaia-gray border border-gaia-green/30 rounded-xl px-4 py-3 text-gaia-white placeholder:text-gaia-white/50 focus:border-gaia-green focus:ring-1 focus:ring-gaia-green font-body leading-relaxed max-h-32"
                    rows={1}
                    style={{ 
                      minHeight: '2.75rem',
                      height: Math.min(Math.max(inputValue.split('\n').length * 24 + 24, 44), 128)
                    }}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black px-6 py-3 rounded-xl font-title font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Full Chat Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-8"
          >
            <a
              href="/chat"
              className="inline-flex items-center gap-2 text-gaia-green hover:text-gaia-green-light transition-colors font-body group"
            >
              <span>Open Full Chat Interface</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}