'use client';

import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { GaiaChatInterface } from './components/GaiaChatInterface';
import { RegenAISection } from './components/RegenAISection';
import { UNPresentationSection } from './components/UNPresentationSection';
import { BlogSection } from './components/BlogSection';
import { NFTGallerySection } from './components/NFTGallerySection';
import { FeaturesSection } from './components/FeaturesSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    // Inject light mode styles dynamically to ensure they're applied
    const styleId = 'light-mode-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        [data-theme="light"] {
          --gaia-green: #0f8 !important;
          --gaia-green-light: #4ade80 !important;
          --gaia-green-dark: #16a34a !important;
          --gaia-green-neon: #0f8 !important;
          --gaia-black: #f0fdfc !important;
          --gaia-gray-darkest: #e0f7f5 !important;
          --gaia-gray-dark: #fff !important;
          --gaia-gray: #f0fdfc !important;
          --gaia-gray-medium: #e0f7f5 !important;
          --gaia-gray-light: #d0f0ed !important;
          --gaia-white: #0f172a !important;
          --background: #f0fdfc !important;
          --foreground: #0f172a !important;
          --card: #fff !important;
          --card-foreground: #0f172a !important;
          --popover: #fff !important;
          --popover-foreground: #0f172a !important;
          --primary: #0f8 !important;
          --primary-foreground: #000 !important;
          --secondary: #e0f7f5 !important;
          --secondary-foreground: #0f172a !important;
          --muted: #e0f7f5 !important;
          --muted-foreground: #475569 !important;
          --accent: #4ade80 !important;
          --accent-foreground: #000 !important;
          --destructive: #ef4444 !important;
          --destructive-foreground: #fff !important;
          --border: rgba(0, 255, 136, 0.2) !important;
          --input: #f0fdfc !important;
          --input-background: #fff !important;
          --switch-background: #e0f7f5 !important;
          --ring: #0f8 !important;
          --chart-1: #0f8 !important;
          --chart-2: #4ade80 !important;
          --chart-3: #16a34a !important;
          --chart-4: #10b981 !important;
          --chart-5: #059669 !important;
        }

        [data-theme="light"] .glass {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 136, 0.2) !important;
        }

        [data-theme="light"] .bg-gradient-dark {
          background: linear-gradient(to bottom, #f0fdfc, #e0f7f5) !important;
        }

        [data-theme="light"] ::selection {
          background: rgba(0, 255, 136, 0.3) !important;
          color: #0f172a !important;
        }

        [data-theme="light"] .text-gradient-green {
          background: linear-gradient(135deg, #16a34a 0%, #0f8 100%) !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          -webkit-background-clip: text !important;
        }

        [data-theme="light"] .text-glow-green {
          color: #16a34a !important;
          text-shadow: 0 0 20px rgba(0, 255, 136, 0.3) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <GaiaChatInterface />
        <RegenAISection />
        <UNPresentationSection />
        <BlogSection />
        <NFTGallerySection />
        <FeaturesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}