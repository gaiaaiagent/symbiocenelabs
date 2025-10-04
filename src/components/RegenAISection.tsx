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

  const stats = [
    { icon: Globe, value: "50+", label: "Projects Funded", color: "text-gaia-green" },
    { icon: Users, value: "500K+", label: "Hectares Regenerated", color: "text-gaia-green-light" },
    { icon: TrendingUp, value: "85%", label: "Carbon Sequestration Increase", color: "text-gaia-green" },
  ];

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
      <div className="absolute inset-0 bg-gradient-to-br from-gaia-gray-darkest via-gaia-black to-gaia-gray-dark" />
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
                Regen<span className="text-gradient-green">AI</span>
                <br />
                <span className="text-gaia-green-light">Network</span>
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

                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="text-center p-4 glass rounded-xl border border-gaia-green/20"
                    >
                      <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <div className={`font-title font-black text-xl ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-gaia-white/70 text-sm font-body">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black px-8 py-4 font-title font-bold group"
                >
                  <Network className="w-5 h-5 mr-2" />
                  Explore Partnership
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 px-8 py-4 font-title font-bold glass"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  View Projects
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
                className="relative overflow-hidden rounded-3xl border border-gaia-green/40 glass"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1589923188900-85dae523342b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWdlbmVyYXRpdmUlMjBhZ3JpY3VsdHVyZSUyMHN1c3RhaW5hYmxlJTIwZmFybWluZ3xlbnwxfHx8fDE3NTU4MTM0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Regenerative Agriculture Project"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gaia-black/80 via-transparent to-transparent" />
                
                {/* Data overlay points */}
                <div className="absolute inset-0">
                  <div className="absolute top-6 left-6 w-3 h-3 bg-gaia-green rounded-full animate-pulse" />
                  <div className="absolute top-12 right-8 w-2 h-2 bg-gaia-green-light rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-20 left-12 w-2.5 h-2.5 bg-gaia-green rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-12 right-6 w-2 h-2 bg-gaia-green-light rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-gaia-green/30 text-gaia-green border-gaia-green/50 mb-3 neon-border">
                    <Leaf className="w-3 h-3 mr-1" />
                    Active Monitoring
                  </Badge>
                  <h3 className="text-lg font-title font-bold text-gaia-white mb-2">
                    Regenerative Ranch Project, Montana
                  </h3>
                  <p className="text-gaia-white/90 text-sm font-body">
                    AI-verified carbon sequestration: +12.5 tons CO2/hectare annually
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