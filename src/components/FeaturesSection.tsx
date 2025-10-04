'use client';

import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Satellite, 
  TreePine, 
  Waves, 
  Thermometer, 
  Wind,
  TrendingUp,
  Shield,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms process vast amounts of environmental data to identify patterns and predict changes.',
    badge: 'Core Technology',
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    icon: Satellite,
    title: 'Satellite Monitoring',
    description: 'Real-time satellite imagery and sensor data provide comprehensive global environmental monitoring capabilities.',
    badge: 'Remote Sensing',
    color: 'from-gaia-green/20 to-emerald-500/20'
  },
  {
    icon: TreePine,
    title: 'Forest Conservation',
    description: 'Track deforestation, reforestation efforts, and biodiversity changes with precision forest monitoring systems.',
    badge: 'Conservation',
    color: 'from-green-500/20 to-gaia-green-light/20'
  },
  {
    icon: Waves,
    title: 'Ocean Health',
    description: 'Monitor ocean temperature, acidity levels, and marine ecosystem health through comprehensive water analysis.',
    badge: 'Marine Science',
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    icon: Thermometer,
    title: 'Climate Tracking',
    description: 'Precise temperature monitoring and climate pattern analysis to understand global warming trends.',
    badge: 'Climate Science',
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    icon: Wind,
    title: 'Air Quality',
    description: 'Real-time air pollution monitoring and atmospheric composition analysis for public health insights.',
    badge: 'Public Health',
    color: 'from-purple-500/20 to-pink-500/20'
  }
];

const stats = [
  { value: '847+', label: 'Data Sources', icon: Globe },
  { value: '99.9%', label: 'Uptime', icon: Shield },
  { value: '24/7', label: 'Monitoring', icon: TrendingUp },
];

export function FeaturesSection() {
  return (
    <section id="technology" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gaia-green/5 to-gaia-green-light/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge 
            variant="outline" 
            className="mb-6 bg-gaia-green/10 text-gaia-green border-gaia-green/30"
          >
            Advanced Technology
          </Badge>
          
          <h2 className="font-title text-3xl md:text-5xl font-bold mb-6">
            Planetary Intelligence
            <span className="text-gradient-green block mt-2">
              at Your Fingertips
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-body">
            Our comprehensive AI platform combines cutting-edge technology with environmental science 
            to deliver actionable insights for planetary stewardship.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="p-6 text-center bg-gradient-to-br from-card to-card/50 border-border/50">
              <stat.icon className="w-8 h-8 text-gaia-green mx-auto mb-4" />
              <div className="font-title text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full group hover:border-gaia-green/50 transition-all duration-300 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-green rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-background/50 text-muted-foreground border-border/50"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="font-title text-lg font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}