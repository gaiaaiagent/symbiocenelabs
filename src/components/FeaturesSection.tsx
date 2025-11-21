'use client';

import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Brain,
  Network,
  Lightbulb,
  Users,
  FlaskConical,
  Handshake
} from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI Agent Development',
    description: 'Custom AI agent solutions designed to enhance organizational intelligence, automate workflows, and support regenerative decision-making.',
    badge: 'Core Service',
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    icon: Network,
    title: 'Infrastructure & Software',
    description: 'Build resilient, scalable infrastructure and software systems that align with regenerative principles and support planetary stewardship.',
    badge: 'Development',
    color: 'from-gaia-green/20 to-emerald-500/20'
  },
  {
    icon: Lightbulb,
    title: 'Design & Implementation',
    description: 'End-to-end design and implementation of custom solutions tailored to your organization\'s unique challenges and regenerative goals.',
    badge: 'Custom Solutions',
    color: 'from-green-500/20 to-gaia-green-light/20'
  },
  {
    icon: Users,
    title: 'Consulting & Advisory',
    description: 'Strategic consulting to help organizations adopt AI, transition to regenerative models, and enhance collective sensemaking capabilities.',
    badge: 'Advisory',
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    icon: FlaskConical,
    title: 'Research Collaboration',
    description: 'Partner with us on cutting-edge research exploring AI alignment, regenerative systems, and bioregional intelligence frameworks.',
    badge: 'Research',
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    icon: Handshake,
    title: 'Partnerships & Investment',
    description: 'Open to strategic partnerships, contract work, and aligned investment opportunities that advance our shared regenerative mission.',
    badge: 'Collaboration',
    color: 'from-purple-500/20 to-pink-500/20'
  }
];

export function FeaturesSection() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
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
            Work With Us
          </Badge>

          <h2 className="font-title text-3xl md:text-5xl font-bold mb-6">
            Building the Future
            <span className="text-gradient-green block mt-2 pb-2">
              Together
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-body">
            We partner with aligned organizations to build AI infrastructure, regenerative systems, and
            collective intelligence capabilities that serve life.
          </p>
        </motion.div>


        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((feature, index) => (
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