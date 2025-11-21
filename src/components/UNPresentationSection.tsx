'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, ExternalLink, Globe, Users, Award } from 'lucide-react';

export function UNPresentationSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('un-presentation');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Globe,
      title: "Global Impact",
      description: "Addressing climate challenges through AI innovation"
    },
    {
      icon: Users,
      title: "International Collaboration",
      description: "Building partnerships with world leaders and organizations"
    },
    {
      icon: Award,
      title: "UN Recognition",
      description: "Showcasing technology for sustainable development goals"
    }
  ];

  return (
    <section id="un-presentation" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 matrix-bg opacity-15" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gaia-green/8 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-gaia-green-light/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-title text-4xl md:text-6xl font-black text-gaia-white mb-6">
            Global Challenges Action <span className="text-gradient-green">Empowerment</span>
          </h2>

          <p className="text-xl text-gaia-white font-body max-w-3xl mx-auto leading-relaxed">
            Gaia AI is collaborating with GloCha (Global Challenges Action Empowerment Consortium),
            a network of organizations working on Digital Public Infrastructure (DPI) for Global Challenges
            within the United Nations. Watch our presentation on how AI can accelerate
            the achievement of Sustainable Development Goals through environmental intelligence.
          </p>
        </motion.div>

        {/* Main Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
            {/* First Video */}
            <div className="relative group">
              <div className="glass rounded-3xl overflow-hidden border border-gaia-green/30 neon-border">
                <div className="relative bg-gaia-gray-dark aspect-video">
                  {/* YouTube Video Embed */}
                  <iframe
                    src="https://www.youtube.com/embed/l39u1BIqnN4"
                    title="Gaia AI UN Presentation"
                    className="w-full h-full rounded-3xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-6 bg-gradient-to-r from-gaia-gray-dark to-gaia-gray">
                  <h3 className="font-title font-bold text-xl text-gaia-white mb-3">
                    AI for Planetary Health: A New Paradigm
                  </h3>
                  <p className="text-gaia-white/80 font-body leading-relaxed">
                    Our presentation explored how artificial intelligence can serve as Earth's
                    nervous system, enabling real-time environmental monitoring and predictive
                    analytics for climate action. Watch our{' '}
                    <a
                      href="https://www.youtube.com/watch?v=etqUCny5tCk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gaia-green hover:text-gaia-green-light underline decoration-gaia-green/50 hover:decoration-gaia-green-light transition-colors"
                    >
                      presentation at the UN GloCha Emerging Technologies Summit
                    </a>{' '}
                    to learn more about our vision for technology-enabled planetary stewardship.
                  </p>
                </div>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}