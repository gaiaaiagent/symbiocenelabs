'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Menu, X, Zap } from 'lucide-react';
import gaiaLogo from 'figma:asset/23037793ba458b8a1b0791484732402053478d7b.png';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Chat', href: '#gaia-chat' },
  { label: 'RegenAI', href: '#regen-ai' },
  { label: 'Research', href: '#blog-section' },
  { label: 'Gallery', href: '#nft-gallery' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass border-b border-gaia-green/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative">
              <img 
                src={gaiaLogo} 
                alt="Gaia AI" 
                className="w-8 h-8 rounded-lg"
              />
              <motion.div
                className="absolute inset-0 bg-gaia-green/20 rounded-lg blur-md"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <span className="font-title text-xl font-black text-gaia-white">
              GAIA<span className="text-glow-green">AI</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-gaia-white/80 hover:text-gaia-green transition-colors duration-200 font-body font-medium relative group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-green group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 font-title font-bold"
            >
              Access Portal
            </Button>
            <Button className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black font-title font-bold">
              <Zap className="w-4 h-4 mr-2" />
              Start Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gaia-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-gaia-green/20"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gaia-white/80 hover:text-gaia-green transition-colors duration-200 font-body font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 font-title font-bold"
                >
                  Access Portal
                </Button>
                <Button className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black font-title font-bold">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}