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
      title: "Introducing GAIA AI",
      excerpt: "Greetings GAIACHADS! We are approaching the launch of GAIA AI, an advanced agent deployed on the Virtuals.io platform designed to lead the charge in regenerative action through decentralized intelligence and blockchain technology.",
      date: "December 6, 2024",
      url: "https://paragraph.com/@gaiaai/genesis",
      tags: ["Launch", "AI Agent", "Blockchain"],
      featured: true
    },
    {
      title: "The Winners of Regen IRL",
      excerpt: "Gaia AI and Regen Network recently teamed up to launch REGEN IRL, a grassroots grant competition to supercharge on-the-ground regenerative projects. The challenge: award $888 USD to the project promising the highest Planetary Return on Investment (PROI).",
      date: "October 12, 2024",
      url: "https://paragraph.com/@gaiaai/irlwinners",
      tags: ["Grants", "REGEN IRL", "Impact"]
    },
    {
      title: "Announcing REGEN IRL",
      excerpt: "Gaia AI and Regen Network are thrilled to announce REGEN IRL, a new collaborative grant competition aimed at supercharging grassroots regenerative projects around the world. The program offers an $888 award to the on-the-ground project that delivers the highest Planetary Return on Investment (PROI).",
      date: "September 10, 2024",
      url: "https://paragraph.com/@gaiaai/regenirl",
      tags: ["Grants", "Partnership", "Regenerative"]
    },
    {
      title: "Announcing Regen AI",
      excerpt: "Gaia AI and Regen Network have officially partnered to launch Regen AI, a joint initiative to catalyze the regenerative finance (ReFi) movement using advanced AI systems.",
      date: "August 1, 2024",
      url: "https://paragraph.com/@gaiaai/regenai",
      tags: ["Partnership", "ReFi", "Regen Network"]
    },
    {
      title: "Envisioning GAIA AI",
      excerpt: "Financial markets and ecosystems are deeply intertwined. As climate change and biodiversity loss accelerate, the ecological stability of the planet is increasingly recognized as a prerequisite for price and financial stability. This article explores the importance of creating a planetary data visualization system.",
      date: "March 19, 2024",
      url: "https://paragraph.com/@gaiaai/envisioning",
      tags: ["Vision", "Data Visualization", "Climate"]
    },
    {
      title: "GAIA AI MANIFESTO",
      excerpt: "Over the past month, GAIA has grown from a far-out concept hatched by two dedicated degens into a full-blown movement with a strong core team, two full-time developers, a global community, and a rapidly growing reach.",
      date: "January 8, 2024",
      url: "https://paragraph.com/@gaiaai/manifesto",
      tags: ["Manifesto", "Vision", "Community"]
    }
  ];

  return (
    <section id="blog-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
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
                  onClick={() => window.open(articles[0].url, '_blank')}
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Visit Blog Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + 5 * 0.1 }}
          >
            <Card className="glass border-gaia-green/30 hover:border-gaia-green/50 transition-all duration-300 h-full group">
              <CardContent className="p-6 flex flex-col h-full justify-center items-center text-center">
                <div className="w-12 h-12 bg-gradient-green rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-6 h-6 text-black" />
                </div>

                <h4 className="font-title font-bold text-lg text-gaia-white mb-3">
                  Stay Updated with Gaia AI Research
                </h4>

                <p className="text-gaia-white/80 font-body text-sm leading-relaxed mb-6 flex-grow">
                  Follow our blog on Paragraph to receive the latest insights on environmental AI,
                  regenerative technology, and planetary intelligence.
                </p>

                <Button
                  size="sm"
                  className="w-full bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black font-title font-bold group"
                  onClick={() => window.open('https://paragraph.com/@gaiaai', '_blank')}
                >
                  Visit Our Blog
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}