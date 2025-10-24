'use client';

import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  Globe, 
  Mail, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin,
  ArrowRight,
  Leaf
} from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Platform', href: '#platform' },
    { label: 'API', href: '#api' },
    { label: 'Documentation', href: '#docs' },
    { label: 'Pricing', href: '#pricing' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Careers', href: '#careers' },
    { label: 'Press', href: '#press' },
  ],
  resources: [
    { label: 'Blog', href: '#blog' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'Whitepapers', href: '#papers' },
    { label: 'Community', href: '#community' },
  ],
  support: [
    { label: 'Help Center', href: '#help' },
    { label: 'Contact', href: '#contact' },
    { label: 'Status', href: '#status' },
    { label: 'Security', href: '#security' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/gaiaaiagent', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/GaiaAIxyz', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/gaiaaiagent', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-dark text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gaia-green/10 to-gaia-green-light/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          className="py-16 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-title text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Environmental Insights
            </h3>
            <p className="text-white/70 font-body mb-8">
              Get the latest environmental data, research findings, and platform updates 
              delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gaia-green"
                />
              </div>
              <Button className="bg-gradient-green hover:opacity-90 text-white px-6 group">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-green rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-title text-xl font-semibold">
                    Gaia<span className="text-gaia-green">AI</span>
                  </span>
                </div>
                
                <p className="text-white/70 font-body mb-6 max-w-sm">
                  Advancing planetary health through artificial intelligence. 
                  Building a sustainable future with data-driven insights.
                </p>
                
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 hover:bg-gaia-green/20 rounded-lg flex items-center justify-center transition-colors group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-white/70 group-hover:text-gaia-green transition-colors" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-title font-semibold text-white mb-4 capitalize">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-gaia-green transition-colors font-body"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Section */}
        <motion.div
          className="py-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-6 text-sm text-white/60">
            <span>© 2024 GaiaAI. All rights reserved.</span>
            <a href="#privacy" className="hover:text-gaia-green transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gaia-green transition-colors">
              Terms of Service
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Leaf className="w-4 h-4 text-gaia-green" />
            <span>Carbon neutral platform</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}