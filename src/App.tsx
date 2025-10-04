'use client';

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { GaiaChatInterface } from './components/GaiaChatInterface';
import { RegenAISection } from './components/RegenAISection';
import { UNPresentationSection } from './components/UNPresentationSection';
import { BlogSection } from './components/BlogSection';
import { NFTGallerySection } from './components/NFTGallerySection';
import { FeaturesSection } from './components/FeaturesSection';
import { MissionSection } from './components/MissionSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <GaiaChatInterface />
        <RegenAISection />
        <UNPresentationSection />
        <BlogSection />
        <NFTGallerySection />
        <FeaturesSection />
        <MissionSection />
      </main>
      <Footer />
    </div>
  );
}