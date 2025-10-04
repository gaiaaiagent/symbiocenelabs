'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ExternalLink, BookOpen, Calendar, ArrowRight } from 'lucide-react';

export function BlogSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('blog-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const articles = [
    {
      title: "RegenAI: Bridging Technology and Regenerative Agriculture",
      excerpt: "Exploring how artificial intelligence can accelerate the transition to regenerative farming practices and ecosystem restoration.",
      date: "December 2024",
      tags: ["Regenerative Agriculture", "AI", "Climate Tech"],
      featured: true
    },
    {
      title: "The Symbiocene: AI as Earth's Nervous System",
      excerpt: "Envisioning a future where technology and nature exist in perfect symbiosis, creating a thriving planetary consciousness.",
      date: "November 2024",
      tags: ["Symbiocene", "Philosophy", "Environmental AI"]
    },
    {
      title: "Ecological Credit Systems: Blockchain Meets Environmental Science",
      excerpt: "How distributed ledger technology is revolutionizing the verification and trading of ecological restoration credits.",
      date: "October 2024",
      tags: ["Blockchain", "Carbon Credits", "Verification"]
    },
    {
      title: "Machine Learning for Biodiversity Conservation",
      excerpt: "Advanced algorithms that can predict ecosystem changes and guide conservation efforts with unprecedented accuracy.",
      date: "September 2024",
      tags: ["Biodiversity", "Conservation", "ML"]
    },
    {
      title: "Digital Twins of Earth: Modeling Planetary Systems",
      excerpt: "Creating comprehensive digital representations of Earth's systems to better understand and protect our planet.",
      date: "August 2024",
      tags: ["Digital Twins", "Earth Systems", "Modeling"]
    },
    {
      title: "The Future of Environmental Monitoring",
      excerpt: "IoT sensors, satellite imagery, and AI combine to create real-time planetary health diagnostics.",
      date: "July 2024",
      tags: ["IoT", "Monitoring", "Satellites"]
    }
  ];

  return (
    <section id="blog-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gaia-gray-darkest via-gaia-black to-gaia-gray-dark" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-gaia-green/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-gaia-green-light/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-gaia-green/20 text-gaia-green border-gaia-green/50 neon-border">
            <BookOpen className="w-3 h-3 mr-1" />
            Research & Insights
          </Badge>
          
          <h2 className="font-title text-4xl md:text-6xl font-black text-gaia-white mb-6">
            Gaia AI <span className="text-gradient-green">Blog</span>
          </h2>
          
          <p className="text-xl text-gaia-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Explore our latest research, insights, and thought leadership on environmental AI, 
            regenerative technology, and the future of planetary intelligence.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="glass border-gaia-green/40 hover:border-gaia-green/60 transition-all duration-300 neon-border">
            <CardContent className="p-8">
              <div className="flex items-start gap-2 mb-4">
                <Badge className="bg-gaia-green/30 text-gaia-green border-gaia-green/50">
                  Featured
                </Badge>
                <Badge variant="outline" className="border-gaia-green/50 text-gaia-green-light bg-gaia-green/10">
                  Latest
                </Badge>
              </div>
              
              <h3 className="font-title font-black text-3xl text-gaia-white mb-4">
                {articles[0].title}
              </h3>
              
              <p className="text-lg text-gaia-white/80 font-body leading-relaxed mb-6">
                {articles[0].excerpt}
              </p>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gaia-white/60">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body text-sm">{articles[0].date}</span>
                  </div>
                  <div className="flex gap-2">
                    {articles[0].tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-gaia-green/50 text-gaia-green bg-gaia-green/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black font-title font-bold group"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.slice(1).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass border-gaia-green/20 hover:border-gaia-green/40 transition-all duration-300 h-full group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-gaia-white/60 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body text-sm">{article.date}</span>
                  </div>
                  
                  <h4 className="font-title font-bold text-lg text-gaia-white mb-3 group-hover:text-gaia-green transition-colors">
                    {article.title}
                  </h4>
                  
                  <p className="text-gaia-white/80 font-body text-sm leading-relaxed mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="text-xs border-gaia-green/50 text-gaia-green bg-gaia-green/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 font-title font-bold group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 border border-gaia-green/30 max-w-2xl mx-auto">
            <h3 className="font-title font-bold text-2xl text-gaia-white mb-4">
              Stay Updated with Gaia AI Research
            </h3>
            <p className="text-gaia-white/80 font-body mb-6 leading-relaxed">
              Follow our blog on Paragraph to receive the latest insights on environmental AI, 
              regenerative technology, and planetary intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black font-title font-bold group"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Visit Our Blog
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline" 
                className="border-gaia-green/50 text-gaia-green hover:bg-gaia-green/10 font-title font-bold"
              >
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}