'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Globe,
  Github,
  Twitter,
  Linkedin,
  X
} from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/gaiaaiagent', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/GaiaAIxyz', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/gaiaaiagent', label: 'LinkedIn' },
];

export function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          message,
          type: 'contact'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setIsContactOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gradient-dark text-gaia-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gaia-green/10 to-gaia-green-light/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-green rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-black" />
                </div>
                <span className="font-title text-xl font-semibold text-gaia-white">
                  Gaia<span className="text-gaia-green">AI</span>
                </span>
              </div>

              <p className="text-gaia-white/70 font-body mb-6">
                Advancing planetary health through artificial intelligence.
                Building a sustainable future with data-driven insights.
              </p>

              <button
                onClick={() => setIsContactOpen(true)}
                className="text-gaia-green hover:text-gaia-green-light transition-colors font-body underline mb-6"
              >
                Contact Us
              </button>

              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gaia-white/10 hover:bg-gaia-green/20 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gaia-white/70 group-hover:text-gaia-green transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <Separator className="bg-gaia-white/10" />

        {/* Bottom Section */}
        <motion.div
          className="py-8 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-sm text-gaia-white/60">
            <span>© 2024 GaiaAI. All rights reserved.</span>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl border border-gaia-green/30 p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-title text-2xl font-bold text-gaia-white">
                  Contact Us
                </h3>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="text-gaia-white/70 hover:text-gaia-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gaia-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gaia-green rounded-full" />
                  </div>
                  <p className="text-gaia-green font-body text-lg">
                    Message sent successfully!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-gaia-white/80 font-body text-sm mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gaia-white/10 border border-gaia-white/20 rounded-lg text-gaia-white placeholder-gaia-white/50 focus:outline-none focus:ring-2 focus:ring-gaia-green"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gaia-white/80 font-body text-sm mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gaia-white/10 border border-gaia-white/20 rounded-lg text-gaia-white placeholder-gaia-white/50 focus:outline-none focus:ring-2 focus:ring-gaia-green resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-red-400 font-body text-sm">
                      Failed to send message. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black font-title font-bold"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}