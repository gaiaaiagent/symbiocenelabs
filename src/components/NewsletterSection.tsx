'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
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
          type: 'newsletter'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubmitStatus('success');
      setEmail('');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-gaia-green/5 to-gaia-green-light/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-title text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Stay Updated
            </h2>
            <p className="text-xl text-muted-foreground font-body mb-12 leading-relaxed">
              Get the latest updates on our projects, research, and opportunities to collaborate.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gaia-green"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-green-glow hover:scale-105 transition-all duration-300 text-black px-6 font-title font-bold group"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            {submitStatus === 'success' && (
              <p className="text-gaia-green font-body text-sm mt-4">
                Thanks for subscribing! Check your email for confirmation.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="text-red-400 font-body text-sm mt-4">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}