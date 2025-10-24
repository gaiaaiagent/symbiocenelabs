'use client';

import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
        <div className="flex items-center justify-center">

          {/* Main Content - Full Width */}
          <div className="space-y-8 max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="mb-8 bg-gaia-green/20 text-gaia-green border-gaia-green/50 hover:bg-gaia-green/30 transition-colors neon-border"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  <span className="font-code font-bold">AI • EARTH • INTELLIGENCE</span>
                </Badge>
              </div>
              
              <h1 className="font-title text-5xl md:text-7xl lg:text-8xl font-black leading-none text-center">
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
              <p className="text-xl md:text-2xl text-gaia-white/90 leading-relaxed font-body text-center max-w-4xl mx-auto">
                Pioneering a new relationship between technology and ecology where AI
                becomes a catalyst for <span className="text-gaia-green font-semibold">planetary regeneration</span> and
                <span className="text-gaia-green font-semibold"> collective intelligence</span>. Join us as we bridge the digital
                and natural worlds to create a thriving symbiosis.
              </p>
            </motion.div>


          </div>

        </div>
      </div>

    </section>
  );
}