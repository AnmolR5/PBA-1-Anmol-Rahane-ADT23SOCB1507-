import React, { useState } from 'react';
import { COMPONENTS } from '../constants';
import { ArrowRight, Layers, Database, Cpu, Zap, Shield, Activity, BrainCircuit, Network, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ArchitectureView() {
  const [selectedComponent, setSelectedComponent] = useState(COMPONENTS[0]);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-[#141414]/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Network className="w-4 h-4 opacity-50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">Infrastructure Design</span>
          </div>
          <h2 className="text-5xl font-serif italic">System Architecture</h2>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#141414]/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#141414]/5 transition-colors">
            <Share2 className="w-3 h-3" /> Export PDF
          </button>
        </div>
      </header>

      {/* High-Level Architecture Explanation */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-b border-[#141414]/5">
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-[0.3em] opacity-30">Design Philosophy</h3>
          <p className="text-lg leading-relaxed font-serif italic opacity-80">
            "We don't just monitor infrastructure; we predict its evolution. This architecture treats every log line as a signal in a global intelligence network."
          </p>
          <p className="text-sm leading-relaxed opacity-60">
            By leveraging Google Cloud's distributed backbone, we've built a system that is inherently resilient. Data flows from edge to core with sub-second latency, processed by serverless engines that scale with your business demands.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Ingestion Cap', value: '1.2PB/day' },
            { label: 'Inference Latency', value: '42ms' },
            { label: 'RCA Accuracy', value: '94.2%' },
            { label: 'Auto-Resolution', value: '82%' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 bg-white border border-[#141414]/5 rounded-xl shadow-sm">
              <p className="text-3xl font-serif italic mb-1">{stat.value}</p>
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Architecture Diagram */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#141414] p-12 rounded-3xl text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers className="w-64 h-64" />
            </div>
            
            <div className="relative z-10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] mb-12 opacity-40">The Intelligence Stack</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {COMPONENTS.map((comp, idx) => (
                  <motion.div 
                    key={comp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedComponent(comp)}
                    className={`group flex items-center gap-8 p-6 rounded-2xl border transition-all cursor-pointer ${
                      selectedComponent.id === comp.id 
                        ? 'bg-white/10 border-white/20 shadow-lg' 
                        : 'border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-14 h-14 flex items-center justify-center rounded-xl border transition-colors ${
                      selectedComponent.id === comp.id ? 'bg-white text-[#141414]' : 'bg-white/5 border-white/10'
                    }`}>
                      <span className="font-mono text-lg font-bold">0{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-mono">{comp.category}</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-mono">{comp.gcpService}</span>
                      </div>
                      <h4 className="text-xl font-medium tracking-tight">{comp.name}</h4>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-transform ${selectedComponent.id === comp.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-40'}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-[#141414]/5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#F5F5F0] rounded-lg">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest">Scalability</h4>
              </div>
              <p className="text-sm leading-relaxed opacity-60">
                Our Dataflow implementation utilizes custom Flex Templates with dynamic worker pools. This allows the system to scale from 10 to 10,000 workers in under 3 minutes to handle massive telemetry bursts.
              </p>
            </div>
            <div className="p-8 bg-white border border-[#141414]/5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#F5F5F0] rounded-lg">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest">Resilience</h4>
              </div>
              <p className="text-sm leading-relaxed opacity-60">
                BigQuery's multi-region storage ensures that even in a total regional failure, your historical telemetry remains accessible. Pub/Sub's global endpoints provide a single ingestion target for worldwide services.
              </p>
            </div>
          </div>
        </div>

        {/* Component Detail Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-12 space-y-8">
            <motion.div 
              key={selectedComponent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-[#141414]/5 p-10 rounded-3xl shadow-xl"
            >
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414]/5 text-[#141414] text-[9px] font-mono uppercase tracking-widest rounded-full mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                  Component Detail
                </div>
                <h3 className="text-4xl font-serif italic mb-3">{selectedComponent.name}</h3>
                <p className="text-sm opacity-40 font-mono tracking-tight">{selectedComponent.gcpService}</p>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-30 border-b border-[#141414]/5 pb-2">Overview</h4>
                  <p className="text-sm leading-relaxed opacity-70">{selectedComponent.description}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-30 border-b border-[#141414]/5 pb-2">Key Capabilities</h4>
                  <ul className="space-y-4">
                    {selectedComponent.details.map((detail, i) => (
                      <li key={i} className="flex gap-4 text-sm group">
                        <div className="w-5 h-5 rounded-full border border-[#141414]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#141414] group-hover:text-white transition-colors">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                        <span className="opacity-70 leading-snug">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <div className="p-8 bg-[#141414] text-white rounded-3xl flex items-center justify-between group cursor-pointer shadow-2xl">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1 font-mono">Next View</p>
                <p className="font-serif italic text-xl">MLOps Pipeline</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#141414] transition-all">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
