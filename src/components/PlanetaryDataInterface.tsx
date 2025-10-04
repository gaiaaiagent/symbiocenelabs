'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface DataPoint {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  status: 'critical' | 'warning' | 'optimal' | 'regenerating';
}

const mockData: DataPoint[] = [
  { label: 'Neural Networks', value: 847, unit: 'active', change: 12.3, status: 'optimal' },
  { label: 'Carbon Sequestration', value: 2.1, unit: 'Gt/yr', change: 8.7, status: 'regenerating' },
  { label: 'Biodiversity Index', value: 73.2, unit: '%', change: -1.8, status: 'warning' },
  { label: 'Ocean pH Recovery', value: 8.14, unit: '', change: 0.3, status: 'regenerating' },
  { label: 'Forest Regeneration', value: 34.7, unit: '%', change: 4.2, status: 'optimal' },
  { label: 'AI Predictions', value: 99.7, unit: '%', change: 0.2, status: 'optimal' },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'optimal': return { color: 'bg-gaia-green', glow: 'shadow-gaia-green/50', text: 'text-gaia-green' };
    case 'regenerating': return { color: 'bg-blue-400', glow: 'shadow-blue-400/50', text: 'text-blue-400' };
    case 'warning': return { color: 'bg-yellow-500', glow: 'shadow-yellow-500/50', text: 'text-yellow-500' };
    case 'critical': return { color: 'bg-red-500', glow: 'shadow-red-500/50', text: 'text-red-500' };
    default: return { color: 'bg-gray-500', glow: 'shadow-gray-500/50', text: 'text-gray-500' };
  }
};

const DataMetric = ({ data, index }: { data: DataPoint; index: number }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const statusConfig = getStatusConfig(data.status);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof data.value === 'number') {
        setAnimatedValue(data.value);
      }
    }, index * 200);
    
    return () => clearTimeout(timer);
  }, [data.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
      className="relative group"
    >
      <Card className="p-4 glass border-gaia-green/30 hover:border-gaia-green/60 transition-all duration-300 relative overflow-hidden group-hover:scale-105">
        {/* Animated background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gaia-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gaia-white/70 font-body font-medium uppercase tracking-wider">
              {data.label}
            </span>
            <motion.div 
              className={`w-2 h-2 rounded-full ${statusConfig.color} shadow-lg ${statusConfig.glow}`}
              animate={{ 
                boxShadow: [
                  `0 0 4px ${statusConfig.color.replace('bg-', 'rgba(').replace(/bg-(\w+)-(\d+)/, (_, color, shade) => {
                    const colors: any = {
                      'gaia': '0, 255, 136',
                      'blue': '59, 130, 246',
                      'yellow': '234, 179, 8',
                      'red': '239, 68, 68',
                      'gray': '107, 114, 128'
                    };
                    return `${colors[color] || '107, 114, 128'}, 0.5)`;
                  })}`,
                  `0 0 8px ${statusConfig.color.replace('bg-', 'rgba(').replace(/bg-(\w+)-(\d+)/, (_, color, shade) => {
                    const colors: any = {
                      'gaia': '0, 255, 136',
                      'blue': '59, 130, 246',
                      'yellow': '234, 179, 8',
                      'red': '239, 68, 68',
                      'gray': '107, 114, 128'
                    };
                    return `${colors[color] || '107, 114, 128'}, 0.8)`;
                  })}`
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
          
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-code font-black text-gaia-white">
              {typeof data.value === 'number' ? animatedValue.toFixed(1) : data.value}
            </span>
            {data.unit && <span className="text-sm text-gaia-white/60 font-body">{data.unit}</span>}
          </div>
          
          {data.change && (
            <div className="flex items-center gap-2">
              <motion.span 
                className={`text-xs font-code font-bold ${
                  data.change > 0 
                    ? data.status === 'optimal' || data.status === 'regenerating' ? 'text-gaia-green' : 'text-red-400'
                    : data.status === 'optimal' || data.status === 'regenerating' ? 'text-red-400' : 'text-gaia-green'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {data.change > 0 ? '↗' : '↘'} {Math.abs(data.change)}%
              </motion.span>
              <span className="text-xs text-gaia-white/50 font-body">24h</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export function PlanetaryDataInterface() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-title text-xl font-black text-gaia-white">NEURAL METRICS</h3>
          <Badge variant="outline" className="bg-gaia-green/20 text-gaia-green border-gaia-green/50 neon-border">
            <motion.div
              className="w-2 h-2 bg-gaia-green rounded-full mr-2"
              animate={{ 
                boxShadow: ['0 0 4px rgba(0, 255, 136, 0.5)', '0 0 8px rgba(0, 255, 136, 0.8)']
              }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            />
            <span className="font-code font-bold">LIVE STREAM</span>
          </Badge>
        </div>
        <p className="text-sm text-gaia-white/60 font-body">
          {currentTime.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })} • QUANTUM SYNC
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {mockData.map((data, index) => (
          <DataMetric key={data.label} data={data} index={index} />
        ))}
      </div>

      {/* Planetary Health Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative"
      >
        <Card className="p-6 glass-green border-gaia-green/50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gaia-green/10 via-gaia-green/5 to-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-title text-lg font-black text-gaia-white">PLANETARY HEALTH INDEX</span>
              <span className="font-code text-3xl font-black text-glow-green">73.2%</span>
            </div>
            
            <div className="relative">
              <Progress value={73.2} className="h-3 bg-gaia-gray-dark border border-gaia-green/30" />
              <motion.div
                className="absolute inset-0 h-3 bg-gradient-to-r from-gaia-green to-gaia-green-light rounded-full opacity-20"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gaia-white/60 font-body">
                <span className="font-code font-bold">1,247</span> environmental nodes worldwide
              </p>
              <motion.span 
                className="text-xs font-code font-bold text-gaia-green"
                animate={{ 
                  textShadow: ['0 0 4px rgba(0, 255, 136, 0.5)', '0 0 8px rgba(0, 255, 136, 0.8)']
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                ↗ REGENERATING
              </motion.span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Floating cyber elements */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-gaia-green/20 to-gaia-green-light/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-10 -left-6 w-16 h-16 bg-gradient-to-br from-gaia-green-light/15 to-gaia-green/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}