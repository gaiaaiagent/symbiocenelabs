'use client';

import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Target, 
  Users, 
  Lightbulb, 
  ArrowRight,
  Heart,
  Leaf,
  Globe2
} from 'lucide-react';

const missionPoints = [
  {
    icon: Target,
    title: 'Precision Monitoring',
    description: 'Deploy AI-driven sensors and analytics to track environmental changes with unprecedented accuracy and scale.'
  },
  {
    icon: Users,
    title: 'Global Collaboration',
    description: 'Unite researchers, policymakers, and communities through shared data and collaborative environmental stewardship.'
  },
  {
    icon: Lightbulb,
    title: 'Actionable Insights',
    description: 'Transform complex environmental data into clear, actionable intelligence that drives meaningful conservation efforts.'
  }
];

const impactStats = [
  { value: '1.2M', label: 'km² Monitored', description: 'Forest and ocean areas under continuous surveillance' },
  { value: '150+', label: 'Countries', description: 'Global network of environmental monitoring stations' },
  { value: '98%', label: 'Accuracy', description: 'AI prediction accuracy for environmental changes' },
  { value: '500K+', label: 'Species Tracked', description: 'Biodiversity monitoring across ecosystems' }
];

export function MissionSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-gaia-green/5" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-gaia-green-light/10 to-gaia-green/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Mission Statement */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge 
            variant="outline" 
            className="mb-6 bg-gaia-green/10 text-gaia-green border-gaia-green/30"
          >
            <Heart className="w-3 h-3 mr-1" />
            Our Mission
          </Badge>
          
          <h2 className="font-title text-3xl md:text-5xl font-bold mb-8">
            Symbiosis Between 
            <span className="text-gradient-green block mt-2">
              Technology & Nature
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed font-body mb-8">
            We believe in the power of artificial intelligence to create a more sustainable future. 
            Our platform transforms environmental data into actionable insights, fostering a symbiotic 
            relationship between human innovation and planetary health.
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-gaia-green" />
              <span>Carbon Neutral Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-gaia-green" />
              <span>Open Source Commitment</span>
            </div>
          </div>
        </motion.div>

        {/* Mission Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {missionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full group hover:border-gaia-green/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gaia-green/5 to-gaia-green-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <point.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-title text-xl font-semibold mb-4 text-foreground">
                    {point.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Impact Statistics */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-12 bg-gradient-to-r from-gaia-green/10 to-gaia-green-light/10 border-gaia-green/30">
            <div className="text-center mb-12">
              <h3 className="font-title text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Global Environmental Impact
              </h3>
              <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                Our AI-powered platform is making a measurable difference in environmental monitoring 
                and conservation efforts worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="font-title text-2xl md:text-3xl font-bold text-gaia-green mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground font-body">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-gradient-green hover:opacity-90 text-white px-8 py-4 group"
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}