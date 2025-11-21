'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Leaf, Network, Zap, ArrowRight, Globe, Users, TrendingUp } from 'lucide-react';

export function RegenAISection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('regen-ai');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);


  const features = [
    {
      icon: Network,
      title: "Ecological Credit Verification",
      description: "AI-powered monitoring and verification of regenerative practices for transparent carbon credit allocation"
    },
    {
      icon: Leaf,
      title: "Biodiversity Tracking",
      description: "Real-time ecosystem health monitoring using satellite data, IoT sensors, and machine learning algorithms"
    },
    {
      icon: Zap,
      title: "Regenerative Yield Optimization",
      description: "Predictive analytics to maximize both ecological restoration and agricultural productivity"
    }
  ];

  return (
    <section id="regen-ai" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Animated background elements */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-gaia-green/15 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-br from-gaia-green-light/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <Badge className="mb-6 bg-gaia-green/20 text-gaia-green border-gaia-green/50 neon-border">
                <Network className="w-3 h-3 mr-1" />
                Partnership Initiative
              </Badge>
              
              <h2 className="font-title text-4xl md:text-6xl font-black text-gaia-white mb-6">
                Regen <span className="text-gradient-green">AI</span>
              </h2>
              
              <p className="text-xl text-gaia-white/90 font-body leading-relaxed mb-8">
                In partnership with <span className="text-gaia-green font-semibold">Regen Network</span>, we're pioneering 
                AI-driven ecological monitoring and verification systems that transform how we measure, 
                report, and verify regenerative land management practices.
              </p>

              <div className="space-y-6">
                <div className="glass rounded-2xl p-6 border border-gaia-green/30">
                  <h3 className="font-title font-bold text-xl text-gaia-white mb-4">
                    Revolutionizing Ecological Credits
                  </h3>
                  <p className="text-gaia-white/80 font-body leading-relaxed mb-4">
                    Our partnership combines Regen Network's blockchain-based ecological credit infrastructure 
                    with Gaia AI's advanced environmental monitoring capabilities. This creates the world's first 
                    fully-automated, transparent system for verifying and trading ecological credits.
                  </p>
                  <p className="text-gaia-white/80 font-body leading-relaxed">
                    Through real-time satellite imagery analysis, IoT sensor networks, and machine learning models, 
                    we provide continuous verification of carbon sequestration, biodiversity restoration, 
                    and soil health improvements across regenerative agriculture projects worldwide.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black px-8 py-4 font-title font-bold group"
                  onClick={() => window.open('https://paragraph.com/@gaiaai/regenai', '_blank')}
                >
                  <Network className="w-5 h-5 mr-2" />
                  Explore Partnership
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual + Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Project Image */}
            <div className="relative">
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-gaia-green/40 glass cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => window.open('https://app.regen.network/project/jaguar-stewardship-in-the-pantanal-conservation-network', '_blank')}
              >
                <ImageWithFallback
                  src="https://regen-registry.s3.amazonaws.com/projects/885e7b20-7477-11ef-bf3b-0afffa81c869/1740496806860-EEB_2023_BetinaKellermann.jpg"
                  alt="Jaguar Stewardship in the Pantanal"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gaia-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-gaia-green/30 text-gaia-green border-gaia-green/50 mb-3 neon-border">
                    <Leaf className="w-3 h-3 mr-1" />
                    Biodiversity Stewardship
                  </Badge>
                  <h3 className="text-lg font-title font-bold text-gaia-white mb-2">
                    Jaguar Stewardship in the Pantanal, Brazil
                  </h3>
                  <p className="text-gaia-white/90 text-sm font-body">
                    40,613 hectares of tropical wetland conservation • Verified biodiversity credits
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="glass border-gaia-green/20 hover:border-gaia-green/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h4 className="font-title font-bold text-lg text-gaia-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gaia-white/80 font-body text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}