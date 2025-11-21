'use client';

import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Leaf, Globe, Network, Users, Zap, Brain } from 'lucide-react';

export function AboutSection() {

  const principles = [
    {
      icon: Brain,
      title: "Collective Intelligence",
      description: "Building bottom-up planetary intelligence that scales holonically from individuals to bioregions."
    },
    {
      icon: Leaf,
      title: "Regenerative by Design",
      description: "Every system we build gives more than it takes, supporting life's flourishing."
    },
    {
      icon: Network,
      title: "Data Sovereignty",
      description: "People maintain stewardship of their own data in a decentralized knowledge commons."
    },
    {
      icon: Globe,
      title: "Bioregional Alignment",
      description: "Supporting natural boundaries and land-based coherence over artificial divisions."
    }
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-gaia-green/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-gaia-green-light/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-gaia-green/20 text-gaia-green border-gaia-green/50 neon-border">
            <Users className="w-3 h-3 mr-1" />
            Our Mission
          </Badge>

          <h2 className="font-title text-4xl md:text-6xl font-black text-gaia-white mb-6">
            Stewarding AI for <span className="text-gradient-green">Planetary Regeneration</span>
          </h2>

          <p className="text-xl text-gaia-white/90 font-body max-w-4xl mx-auto leading-relaxed mb-8">
            AI is an amplifier—of extraction by default, of regeneration when we align it with living systems.
            We deliver services, consulting, and open tools for bottom-up collective intelligence—so AI serves planetary regeneration.
          </p>

          <p className="text-lg text-gaia-white/80 font-body max-w-3xl mx-auto leading-relaxed">
            This isn't just about making environmental data visible—it's about addressing the fundamental
            codes of our civilization. How we account for value, how we relate to nature, how we make
            collective sense and decisions together. We're facilitating planetary intelligence that emerges
            from individuals to communities to bioregions, respecting sovereignty and subsidiarity at every scale.
          </p>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="glass border-gaia-green/40 neon-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-title font-bold text-2xl text-gaia-white mb-4">
                    The Critical Moment
                  </h3>
                  <p className="text-gaia-white/80 font-body leading-relaxed mb-4">
                    We've crossed 7 of 9 planetary boundaries. AI is accelerating, demanding massive energy
                    and feeding extractive systems. Without conscious intervention, this power amplifies
                    the same worldviews driving collapse. The question is urgent:
                  </p>
                  <p className="text-gaia-green font-body text-lg italic">
                    "Will we steer AI toward regeneration, or allow it to accelerate our unraveling?"
                  </p>
                </div>

                <div>
                  <h3 className="font-title font-bold text-2xl text-gaia-white mb-4">
                    Our Approach
                  </h3>
                  <p className="text-gaia-white/80 font-body leading-relaxed mb-4">
                    We're building tools for true AI alignment—not alignment with corporations or governments,
                    but with Earth's living intelligence. Personal AI agents that enhance individual knowledge
                    and decision-making. Collective sensemaking that scales holonically through communities
                    and bioregions.
                  </p>
                  <p className="text-gaia-white/80 font-body leading-relaxed">
                    We're facilitating the ontological shift already underway—how we relate to being human,
                    to each other, and to the living world. AI enables both coherence and plurality: translating
                    between diverse worldviews while respecting cultural sovereignty, standardizing where needed
                    (like ecological accounting) while honoring diversity where it creates resilience. We provide
                    the intelligence layer for this emergence, from individuals to bioregions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Core Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass border-gaia-green/20 hover:border-gaia-green/40 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-12 h-12 bg-gradient-green rounded-full flex items-center justify-center mb-4">
                    <principle.icon className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-title font-bold text-lg text-gaia-white mb-3">
                    {principle.title}
                  </h4>
                  <p className="text-gaia-white/80 font-body text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Paradigm Shift */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="glass border-gaia-green/30">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="font-title font-bold text-3xl text-gaia-white mb-4">
                  The Paradigm Shift
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass rounded-2xl p-6 border border-gaia-green/20">
                  <h4 className="font-title font-bold text-xl text-gaia-white mb-4 flex items-center gap-2">
                    <span className="text-red-400">From</span>
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Separation and individualism',
                      'Command and control',
                      'Extraction and exploitation',
                      'Arbitrary boundaries',
                      'Inaccessible environmental data'
                    ].map((item, i) => (
                      <li key={i} className="text-gaia-white/70 font-body flex items-start gap-2">
                        <span className="text-red-400 mt-1">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass rounded-2xl p-6 border border-gaia-green/30">
                  <h4 className="font-title font-bold text-xl text-gaia-white mb-4 flex items-center gap-2">
                    <span className="text-gaia-green">To</span>
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Relation and interconnection',
                      'Stewarding complexity',
                      'Regeneration and reciprocity',
                      'Natural coherence',
                      'Environmental data legibility for all'
                    ].map((item, i) => (
                      <li key={i} className="text-gaia-white/90 font-body flex items-start gap-2">
                        <span className="text-gaia-green mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
