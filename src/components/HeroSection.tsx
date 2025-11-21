'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Play, Zap, Shield, Brain, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Run animation once on mount
  useEffect(() => {
    setHasAnimated(true);
  }, []);


  // Check if dark mode for initial color
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDarkMode = () => {
      // Check data-theme attribute, dark mode is when it's NOT 'light'
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme !== 'light');
    };
    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);


  return (
    <>
      {/* Animation is disabled, so no spacer needed */}

      {/* Hero section - always relative positioning */}
      <section
        ref={containerRef}
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden matrix-bg z-0"
      >
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
              <h1 className="font-title text-5xl md:text-7xl lg:text-8xl font-black text-center relative" style={{ lineHeight: '1.2' }}>
                <span className="block mb-4 relative inline-block">
                  {/* Bottom layer - GAIA in white (dark mode) or black (light mode), AI: invisible */}
                  <span>
                    <span className="text-gaia-white dark:text-gaia-white">GAIA</span>
                    <span className="invisible"> AI:</span>
                  </span>

                  {/* Top layer - AI that animates from theme color to green and slides */}
                  <motion.span
                    className="absolute pointer-events-none"
                    initial={{
                      left: '1.135ch',
                      color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
                      textShadow: '0 0 0px rgba(0, 255, 0, 0)',
                    }}
                    animate={hasAnimated ? {
                      left: '4.22ch',
                      color: 'rgb(0, 255, 0)',
                      textShadow: '0 0 20px rgba(0, 255, 0, 0.8)',
                    } : {}}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                    style={{
                      top: 0,
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      lineHeight: 'inherit'
                    }}
                  >
                    AI
                  </motion.span>
                </span>
                <span className="text-gradient-green block mb-4">
                  Augmenting
                </span>
                <span className="text-glow-green block mb-4">
                  Earth's Natural
                </span>
                <span className="text-gradient-green block">
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
              <p className="text-xl md:text-2xl text-gaia-white leading-relaxed font-body text-center max-w-4xl mx-auto">
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
    </>
  );
}