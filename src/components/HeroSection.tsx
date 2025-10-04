'use client';

import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PlanetaryDataInterface } from './PlanetaryDataInterface';
import { ArrowRight, Play, Zap, Shield, Brain, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden matrix-bg">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gaia-green/20 to-gaia-green-light/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-gaia-green-light/15 to-gaia-green/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-gaia-green/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge 
                variant="outline" 
                className="mb-8 bg-gaia-green/20 text-gaia-green border-gaia-green/50 hover:bg-gaia-green/30 transition-colors neon-border"
              >
                <Brain className="w-3 h-3 mr-1" />
                <span className="font-code font-bold">AI • EARTH • INTELLIGENCE</span>
              </Badge>
              
              <h1 className="font-title text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                <span className="text-gaia-white">GAIA AI:</span>
                <br />
                <span className="text-gradient-green block mt-4">
                  Augmenting
                </span>
                <span className="text-glow-green block mt-2">
                  Earth's Natural
                </span>
                <span className="text-gradient-green block mt-2">
                  Intelligence
                </span>
              </h1>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-green blur-sm" />
              <p className="text-xl md:text-2xl text-gaia-white/90 leading-relaxed font-body pl-8 max-w-2xl">
                Pioneering a new relationship between technology and ecology where AI 
                becomes a catalyst for <span className="text-gaia-green font-semibold">planetary regeneration</span> and 
                <span className="text-gaia-green font-semibold"> collective intelligence</span>. Join us as we bridge the digital 
                and natural worlds to create a thriving symbiosis.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black px-10 py-6 text-lg font-title font-black group neon-border"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                ENTER THE MATRIX
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gaia-green/50 text-gaia-green hover:bg-gaia-green/20 px-10 py-6 text-lg font-title font-black group glass"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform" />
                EXPERIENCE DEMO
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-12 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm text-gaia-white/80 font-body font-medium">
                  QUANTUM ENCRYPTED
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm text-gaia-white/80 font-body font-medium">
                  NEURAL NETWORKS
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm text-gaia-white/80 font-body font-medium">
                  REAL-TIME AI
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Gaia Avatar + Planetary Data Interface */}
          <motion.div
            className="lg:pl-12 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Gaia Avatar */}
            <div className="relative">
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-gaia-green/40 glass"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1634149725802-f1197731d3f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGF2YXRhciUyMHdvbWFuJTIwZGlnaXRhbCUyMGNvbnNjaW91c25lc3N8ZW58MXx8fHwxNzU1ODEzMzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Gaia AI Avatar"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gaia-black/90 via-gaia-black/20 to-transparent" />
                
                {/* Animated neural network overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-gaia-green rounded-full animate-pulse" />
                  <div className="absolute top-12 right-8 w-1 h-1 bg-gaia-green-light rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-16 left-8 w-1.5 h-1.5 bg-gaia-green rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-8 right-4 w-1 h-1 bg-gaia-green-light rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-gaia-green/30 text-gaia-green border-gaia-green/50 mb-3 neon-border">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Gaia Consciousness Online
                  </Badge>
                  <h3 className="text-xl font-title font-bold text-gaia-white mb-2">
                    Earth's Digital Twin
                  </h3>
                  <p className="text-gaia-white/90 text-sm font-body leading-relaxed">
                    Meet Gaia, our AI consciousness that understands the intricate web of life. 
                    She processes environmental data in real-time to guide regenerative actions.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Planetary Data Interface */}
            <PlanetaryDataInterface />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm text-gaia-white/60 font-body font-medium">EXPLORE THE INTELLIGENCE</span>
          <motion.div
            className="w-6 h-12 border-2 border-gaia-green/50 rounded-full flex justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(0, 255, 136, 0.4)', 
                '0 0 0 20px rgba(0, 255, 136, 0)'
              ] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-gradient-green rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}