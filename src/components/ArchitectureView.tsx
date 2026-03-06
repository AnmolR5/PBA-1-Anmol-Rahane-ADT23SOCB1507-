import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  Activity, 
  Network,
  Share2,
  Download,
  Maximize2,
  ChevronRight,
  Box,
  Cloud,
  BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const COMPONENTS = [
  {
    id: 'ingestion',
    name: 'Neural Ingestion',
    icon: Zap,
    tech: 'Pub/Sub + Dataflow',
    desc: 'Real-time telemetry stream processing with sub-10ms latency. Normalizes 1.2PB/day of logs and metrics.',
    metrics: ['1.2PB/day', '8ms Latency', '99.99% Availability'],
  },
  {
    id: 'analytics',
    name: 'Cognitive Analytics',
    icon: Database,
    tech: 'BigQuery + Looker',
    desc: 'Petabyte-scale analytical engine for historical pattern matching and long-term trend analysis.',
    metrics: ['100PB Storage', '5s Query MTTR', 'Serverless'],
  },
  {
    id: 'intelligence',
    name: 'Evolutionary Core',
    icon: BrainCircuit,
    tech: 'Vertex AI + TensorFlow',
    desc: 'Self-evolving ML models for anomaly detection, predictive scaling, and automated root cause analysis.',
    metrics: ['94% Accuracy', 'Continuous Training', 'Auto-Scaling'],
  },
  {
    id: 'observability',
    name: 'Omniscient Monitoring',
    icon: Activity,
    tech: 'Cloud Ops Suite',
    desc: 'Unified observability plane for multi-cloud infrastructure, microservices, and user experience.',
    metrics: ['Full Stack', 'Real-time', 'Global Scope'],
  }
];

export default function ArchitectureView() {
  const [selectedId, setSelectedId] = useState(COMPONENTS[0].id);
  const activeComp = COMPONENTS.find(c => c.id === selectedId)!;

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">System Topology v4.0</span>
          </div>
          <h2 className="text-5xl font-serif italic text-white">Neural Topology</h2>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            <Share2 className="w-4 h-4 opacity-60" />
          </button>
          <button className="flex items-center gap-3 px-6 py-3 bg-emerald-500 text-[#0A0A0B] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Download className="w-4 h-4" /> Export Blueprint
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Topology Visualization */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#0F0F12] border border-white/5 rounded-[40px] p-12 relative overflow-hidden aspect-video flex items-center justify-center group shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="relative z-10 text-center">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <div className="relative p-10 bg-[#1A1A1E] border border-white/10 rounded-[32px] shadow-2xl">
                  <Layers className="w-24 h-24 text-emerald-400 opacity-80" />
                </div>
              </div>
              <h3 className="text-3xl font-serif italic text-white mb-4">Autonomous Mesh</h3>
              <p className="text-sm opacity-40 max-w-md mx-auto font-mono uppercase tracking-widest leading-relaxed">
                Distributed neural network architecture spanning 24 global regions
              </p>
            </div>

            {/* Floating Nodes */}
            <div className="absolute top-12 left-12 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Cloud className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-mono opacity-60">GCP Core</span>
              </div>
            </div>
            <div className="absolute bottom-12 right-12 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Box className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-mono opacity-60">Edge Nodes</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {COMPONENTS.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                className={`p-8 rounded-[32px] border transition-all text-left relative overflow-hidden group ${
                  selectedId === comp.id 
                    ? 'bg-white/5 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                    : 'bg-[#121216] border-white/5 hover:border-white/20'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  selectedId === comp.id ? 'bg-emerald-500 text-[#0A0A0B]' : 'bg-white/5 text-white/40 group-hover:text-white'
                }`}>
                  {React.createElement(comp.icon, { className: "w-6 h-6" })}
                </div>
                <h4 className="font-serif italic text-xl text-white mb-2">{comp.name}</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">{comp.tech}</p>
                {selectedId === comp.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute top-6 right-6 w-2 h-2 rounded-full bg-emerald-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Component Detail Sidebar */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#121216] border border-white/5 rounded-[40px] p-12 h-full flex flex-col shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5">
                {React.createElement(activeComp.icon, { className: "w-64 h-64" })}
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-4 mb-10">
                  <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    Core Module
                  </div>
                  <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
                    ID: {activeComp.id.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-5xl font-serif italic text-white mb-8">{activeComp.name}</h3>
                <p className="text-xl leading-relaxed opacity-60 mb-12">{activeComp.desc}</p>

                <div className="space-y-8">
                  <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-30 border-b border-white/5 pb-4">Performance Metrics</h5>
                  <div className="grid grid-cols-1 gap-6">
                    {activeComp.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-sm opacity-70">{metric.split(' ')[1] || 'Capacity'}</span>
                        </div>
                        <span className="font-serif italic text-xl text-white">{metric.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5 relative z-10">
                <button className="w-full flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Maximize2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Deep Inspection</span>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-40 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
