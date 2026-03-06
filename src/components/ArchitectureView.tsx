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
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 font-bold">System Topology v5.0</span>
          </div>
          <h2 className="text-5xl font-serif italic text-slate-900">Neural Topology</h2>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
            <Share2 className="w-4 h-4 text-slate-400" />
          </button>
          <button className="flex items-center gap-3 px-6 py-3 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all shadow-md">
            <Download className="w-4 h-4" /> Export Blueprint
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Topology Visualization */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-12 relative overflow-hidden aspect-video flex items-center justify-center group shadow-sm">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="relative z-10 text-center">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full scale-150 animate-pulse" />
                <div className="relative p-10 bg-white border border-slate-200 rounded-[32px] shadow-md">
                  <Layers className="w-24 h-24 text-emerald-600 opacity-80" />
                </div>
              </div>
              <h3 className="text-3xl font-serif italic text-slate-900 mb-4">Autonomous Mesh</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto font-mono uppercase tracking-widest leading-relaxed">
                Distributed neural network architecture spanning 24 global regions
              </p>
            </div>

            {/* Floating Nodes */}
            <div className="absolute top-12 left-12 p-4 bg-white/80 border border-slate-200 rounded-2xl backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-3">
                <Cloud className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-mono text-slate-500 font-bold">GCP Core</span>
              </div>
            </div>
            <div className="absolute bottom-12 right-12 p-4 bg-white/80 border border-slate-200 rounded-2xl backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-3">
                <Box className="w-4 h-4 text-purple-600" />
                <span className="text-[10px] font-mono text-slate-500 font-bold">Edge Nodes</span>
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
                    ? 'bg-emerald-50 border-emerald-200 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-emerald-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  selectedId === comp.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'
                }`}>
                  {React.createElement(comp.icon, { className: "w-6 h-6" })}
                </div>
                <h4 className="font-serif italic text-xl text-slate-900 mb-2">{comp.name}</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{comp.tech}</p>
                {selectedId === comp.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute top-6 right-6 w-2 h-2 rounded-full bg-emerald-600"
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
              className="bg-white border border-slate-200 rounded-[40px] p-12 h-full flex flex-col shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900">
                {React.createElement(activeComp.icon, { className: "w-64 h-64" })}
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-4 mb-10">
                  <div className="px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                    Core Module
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    ID: {activeComp.id.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-5xl font-serif italic text-slate-900 mb-8">{activeComp.name}</h3>
                <p className="text-xl leading-relaxed text-slate-500 mb-12">{activeComp.desc}</p>

                <div className="space-y-8">
                  <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-300 border-b border-slate-100 pb-4">Performance Metrics</h5>
                  <div className="grid grid-cols-1 gap-6">
                    {activeComp.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-emerald-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span className="text-sm text-slate-600 font-medium">{metric.split(' ')[1] || 'Capacity'}</span>
                        </div>
                        <span className="font-serif italic text-xl text-slate-900">{metric.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-100 relative z-10">
                <button className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Maximize2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Deep Inspection</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
