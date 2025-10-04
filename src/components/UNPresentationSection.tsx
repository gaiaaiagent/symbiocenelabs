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
      <div className="absolute inset-0 bg-gradient-to-br from-gaia-black via-gaia-gray-darkest to-gaia-black" />
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
          <Badge className="mb-6 bg-gaia-green/20 text-gaia-green border-gaia-green/50 neon-border">
            <Globe className="w-3 h-3 mr-1" />
            Global Leadership
          </Badge>
          
          <h2 className="font-title text-4xl md:text-6xl font-black text-gaia-white mb-6">
            UN <span className="text-gradient-green">Presentation</span>
          </h2>
          
          <p className="text-xl text-gaia-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Watch our groundbreaking presentation to the United Nations on how AI can accelerate 
            the achievement of Sustainable Development Goals through environmental intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
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
                  
                  {/* Overlay for styling */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500/80 text-white border-red-500">
                        <Play className="w-3 h-3 mr-1" />
                        LIVE
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-gaia-gray-dark to-gaia-gray">
                  <h3 className="font-title font-bold text-xl text-gaia-white mb-3">
                    AI for Planetary Health: A New Paradigm
                  </h3>
                  <p className="text-gaia-white/80 font-body mb-4 leading-relaxed">
                    Our presentation explored how artificial intelligence can serve as Earth's 
                    nervous system, enabling real-time environmental monitoring and predictive 
                    analytics for climate action.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Climate Action', 'SDG Integration', 'AI Innovation', 'Global Partnership'].map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-gaia-green/50 text-gaia-green bg-gaia-green/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 font-title font-bold"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch on YouTube
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-gaia-green/30">
              <h3 className="font-title font-bold text-xl text-gaia-white mb-4">
                Presentation Highlights
              </h3>
              <p className="text-gaia-white/80 font-body text-sm leading-relaxed mb-6">
                Key moments from our address to global leaders on environmental AI innovation.
              </p>
              
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="glass border-gaia-green/20 hover:border-gaia-green/40 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center flex-shrink-0">
                            <highlight.icon className="w-4 h-4 text-black" />
                          </div>
                          <div>
                            <h4 className="font-title font-bold text-sm text-gaia-white mb-1">
                              {highlight.title}
                            </h4>
                            <p className="text-gaia-white/70 font-body text-xs leading-relaxed">
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="glass rounded-2xl p-6 border border-gaia-green/30">
              <h4 className="font-title font-bold text-lg text-gaia-white mb-4">
                Global Reach
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="font-title font-black text-2xl text-gaia-green">
                    193
                  </div>
                  <div className="text-gaia-white/70 text-xs font-body">
                    UN Member States
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-title font-black text-2xl text-gaia-green-light">
                    50K+
                  </div>
                  <div className="text-gaia-white/70 text-xs font-body">
                    Global Views
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}