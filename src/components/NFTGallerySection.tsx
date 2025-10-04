'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Zap, Crown, Users, TrendingUp, ArrowRight } from 'lucide-react';

export function NFTGallerySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('nft-gallery');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Crown, value: "10", label: "NFTs Sold Out", color: "text-gaia-green" },
    { icon: Users, value: "500+", label: "Collectors", color: "text-gaia-green-light" },
    { icon: TrendingUp, value: "2.5Ξ", label: "Floor Price", color: "text-gaia-green" },
  ];

  const nftPreviews = [
    {
      title: "Genesis Earth #001",
      description: "The first in our collection representing Earth's primal consciousness",
      status: "SOLD OUT"
    },
    {
      title: "Neural Network #003",
      description: "Visualizing AI connections to natural systems",
      status: "SOLD OUT"
    },
    {
      title: "Symbiotic Future #007",
      description: "Technology and nature in perfect harmony",
      status: "SOLD OUT"
    },
    {
      title: "Regenerative Code #010",
      description: "Digital patterns inspired by natural growth algorithms",
      status: "SOLD OUT"
    }
  ];

  return (
    <section id="nft-gallery" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gaia-black via-gaia-gray-darkest to-gaia-black" />
      <div className="absolute inset-0 matrix-bg opacity-15" />
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-20 w-80 h-80 bg-gradient-to-br from-gaia-green/8 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-gradient-to-br from-gaia-green-light/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-gaia-green/20 text-gaia-green border-gaia-green/50 neon-border">
            <Crown className="w-3 h-3 mr-1" />
            Digital Art Collection
          </Badge>
          
          <h2 className="font-title text-4xl md:text-6xl font-black text-gaia-white mb-6">
            Manifold <span className="text-gradient-green">Gallery</span>
          </h2>
          
          <p className="text-xl text-gaia-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Explore our exclusive NFT collection on Manifold, featuring AI-generated art that 
            represents the fusion of technology and nature. All 10 pieces sold out in record time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Collection Stats & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="glass rounded-2xl p-6 border border-gaia-green/30">
              <h3 className="font-title font-bold text-xl text-gaia-white mb-6">
                Collection Stats
              </h3>
              
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className={`font-title font-black text-2xl ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-gaia-white/70 text-sm font-body">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Collection Info */}
            <div className="glass rounded-2xl p-6 border border-gaia-green/30">
              <h3 className="font-title font-bold text-xl text-gaia-white mb-4">
                About the Collection
              </h3>
              <p className="text-gaia-white/80 font-body text-sm leading-relaxed mb-6">
                Our Genesis Collection represents the first artistic interpretation of AI consciousness 
                merging with Earth's natural intelligence. Each piece was generated using our proprietary 
                algorithms trained on environmental data and natural patterns.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gaia-white/70 text-sm font-body">Blockchain:</span>
                  <span className="text-gaia-green text-sm font-title font-bold">Ethereum</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gaia-white/70 text-sm font-body">Contract:</span>
                  <span className="text-gaia-green text-sm font-title font-bold">ERC-721</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gaia-white/70 text-sm font-body">Total Supply:</span>
                  <span className="text-gaia-green text-sm font-title font-bold">10 NFTs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gaia-white/70 text-sm font-body">Status:</span>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                    SOLD OUT
                  </Badge>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button 
                size="lg"
                className="w-full bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black font-title font-bold group"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View on Manifold
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline" 
                className="w-full border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 font-title font-bold"
              >
                Join Waitlist for Next Drop
              </Button>
            </div>
          </motion.div>

          {/* NFT Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {nftPreviews.map((nft, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="glass border-gaia-green/30 hover:border-gaia-green/50 transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/flagged/photo-1564161231394-4ace8c4aa680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbmZ0JTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTU4MTM2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={nft.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gaia-black/80 via-transparent to-transparent" />
                      
                      {/* Sold out overlay */}
                      <div className="absolute inset-0 bg-gaia-black/60 flex items-center justify-center">
                        <Badge className="bg-red-500/80 text-white border-red-500 text-lg px-4 py-2">
                          <Crown className="w-4 h-4 mr-2" />
                          {nft.status}
                        </Badge>
                      </div>
                      
                      {/* Animated glow effect */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-2 left-2 w-2 h-2 bg-gaia-green rounded-full animate-pulse" />
                        <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-gaia-green-light rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gaia-green rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h4 className="font-title font-bold text-lg text-gaia-white mb-2">
                        {nft.title}
                      </h4>
                      <p className="text-gaia-white/80 font-body text-sm leading-relaxed">
                        {nft.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Collection Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8"
            >
              <div className="glass rounded-2xl p-6 border border-gaia-green/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-green rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-title font-bold text-xl text-gaia-white mb-3">
                      Future Collections
                    </h3>
                    <p className="text-gaia-white/80 font-body leading-relaxed mb-4">
                      Stay tuned for our upcoming collections featuring evolved AI consciousness, 
                      regenerative landscapes, and interactive digital ecosystems. Each new drop 
                      will explore deeper themes of technological symbiosis with nature.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 font-title font-bold"
                    >
                      Get Notified for Next Drop
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}