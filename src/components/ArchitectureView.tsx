import React, { useState } from 'react';
import { COMPONENTS } from '../constants';
import { ArrowRight, Layers, Database, Cpu, Zap, Shield, Activity, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';

export default function ArchitectureView() {
  const [selectedComponent, setSelectedComponent] = useState(COMPONENTS[0]);

  return (
    <div className="space-y-12">
      <header className="border-b border-[#141414] pb-8">
        <h2 className="text-5xl font-serif italic mb-4">System Architecture</h2>
        <p className="text-lg opacity-70 max-w-2xl">
          A multi-cloud, high-throughput AIOps pipeline designed for real-time anomaly detection and automated root cause analysis.
        </p>
      </header>

      {/* High-Level Architecture Explanation */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-b border-[#141414]/10">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-6 opacity-50">Design Philosophy</h3>
          <p className="text-sm leading-relaxed opacity-80">
            This architecture leverages a <strong>Serverless First</strong> approach on Google Cloud. 
            By decoupling ingestion (Pub/Sub) from processing (Dataflow) and storage (BigQuery), 
            the system can scale to handle millions of events per second without manual intervention. 
            The core intelligence resides in <strong>Vertex AI</strong>, which provides both 
            real-time anomaly scoring and batch historical analysis.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-6 opacity-50">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-[#141414]/10">
              <p className="text-2xl font-serif italic">1M+</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Events / Sec</p>
            </div>
            <div className="p-4 border border-[#141414]/10">
              <p className="text-2xl font-serif italic">{'<'} 5s</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Detection Latency</p>
            </div>
            <div className="p-4 border border-[#141414]/10">
              <p className="text-2xl font-serif italic">99.99%</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Pipeline Uptime</p>
            </div>
            <div className="p-4 border border-[#141414]/10">
              <p className="text-2xl font-serif italic">Zero</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Manual Triage</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Architecture Diagram */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141414] p-8 rounded-sm text-[#E4E3E0] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Layers className="w-32 h-32" />
            </div>
            
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-8 opacity-50">Component Stack</h3>
            
            <div className="space-y-8 relative z-10">
              {COMPONENTS.map((comp, idx) => (
                <motion.div 
                  key={comp.id}
                  whileHover={{ x: 10 }}
                  onClick={() => setSelectedComponent(comp)}
                  className={`flex items-center gap-6 p-4 border border-[#E4E3E0]/10 cursor-pointer transition-colors ${
                    selectedComponent.id === comp.id ? 'bg-[#E4E3E0]/10 border-[#E4E3E0]/30' : 'hover:bg-[#E4E3E0]/5'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-[#E4E3E0]/20 font-mono text-sm">
                    0{idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-widest opacity-50">{comp.category}</span>
                    </div>
                    <h4 className="text-lg font-medium">{comp.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono opacity-50">{comp.gcpService}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 border border-[#141414]/10 bg-white/50">
              <h4 className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">Scalability Design</h4>
              <p className="text-sm leading-relaxed">
                Horizontal auto-scaling across all layers. Dataflow handles backpressure, while Pub/Sub buffers spikes during major outages.
              </p>
            </div>
            <div className="p-6 border border-[#141414]/10 bg-white/50">
              <h4 className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">Fault Tolerance</h4>
              <p className="text-sm leading-relaxed">
                Multi-region deployment for Pub/Sub and BigQuery. Dataflow snapshots ensure zero data loss during pipeline updates.
              </p>
            </div>
          </div>
        </div>

        {/* Component Detail Sidebar */}
        <div className="space-y-8">
          <div className="sticky top-12">
            <div className="border border-[#141414] p-8 bg-[#E4E3E0]">
              <div className="mb-8">
                <span className="inline-block px-2 py-1 bg-[#141414] text-[#E4E3E0] text-[10px] font-mono uppercase tracking-widest mb-4">
                  Component Focus
                </span>
                <h3 className="text-3xl font-serif italic mb-2">{selectedComponent.name}</h3>
                <p className="text-sm opacity-70 font-mono">{selectedComponent.gcpService}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-[#141414]/10 pb-2">Description</h4>
                  <p className="text-sm leading-relaxed">{selectedComponent.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-[#141414]/10 pb-2">Key Capabilities</h4>
                  <ul className="space-y-3">
                    {selectedComponent.details.map((detail, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#141414] text-[#E4E3E0] flex items-center justify-between group cursor-pointer">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Next Step in Flow</p>
                <p className="font-medium">View Data Processing</p>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
