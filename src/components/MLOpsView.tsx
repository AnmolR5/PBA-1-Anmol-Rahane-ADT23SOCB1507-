import React from 'react';
import { ML_PIPELINE } from '../constants';
import { motion } from 'motion/react';
import { Brain, Database, Play, CheckCircle, RefreshCw, Activity, ShieldAlert, BrainCircuit, Cpu, Zap } from 'lucide-react';

export default function MLOpsView() {
  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-[#141414]/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="w-4 h-4 opacity-50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">Intelligence Lifecycle</span>
          </div>
          <h2 className="text-5xl font-serif italic">MLOps Pipeline</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">Model Version</p>
          <p className="text-xl font-serif italic">v2.4.0-prod</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ML_PIPELINE.map((stage, idx) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="bg-white border border-[#141414]/5 p-8 rounded-3xl h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F5F0] flex items-center justify-center group-hover:bg-[#141414] group-hover:text-white transition-colors">
                  {idx === 0 && <Database className="w-5 h-5" />}
                  {idx === 1 && <Brain className="w-5 h-5" />}
                  {idx === 2 && <RefreshCw className="w-5 h-5" />}
                  {idx === 3 && <Play className="w-5 h-5" />}
                </div>
                <span className="font-mono text-xs opacity-20">0{idx + 1}</span>
              </div>
              
              <h3 className="text-2xl font-serif italic mb-4 tracking-tight">{stage.name}</h3>
              <p className="text-sm opacity-50 mb-10 leading-relaxed">{stage.description}</p>
              
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.2em] opacity-30 font-mono">Stack Components</p>
                <div className="flex flex-wrap gap-2">
                  {stage.tools.map(tool => (
                    <span key={tool} className="text-[9px] font-mono bg-[#F5F5F0] px-2.5 py-1 rounded-full border border-[#141414]/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
        <div className="lg:col-span-7 bg-[#141414] text-white p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Cpu className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-serif italic mb-10">Model Monitoring & Drift</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest">Vertex AI Monitoring</h4>
                <p className="text-sm opacity-50 leading-relaxed">
                  Automatically detects training-serving skew and feature drift. If the distribution of log patterns changes significantly, a retraining pipeline is triggered.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest">Explainable AI (XAI)</h4>
                <p className="text-sm opacity-50 leading-relaxed">
                  Provides feature attributions for every anomaly detection. Helps SREs understand *why* the model flagged a specific microservice as failing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 border border-[#141414]/5 bg-white p-12 rounded-[32px] shadow-sm">
          <h3 className="text-3xl font-serif italic mb-10">Continuous Retraining</h3>
          <div className="space-y-8">
            <p className="text-sm leading-relaxed opacity-50">
              The pipeline uses Vertex AI Pipelines (Kubeflow) to automate the end-to-end lifecycle.
            </p>
            <div className="space-y-5">
              {[
                'Scheduled daily retraining on latest 24h data',
                'Trigger-based retraining on performance degradation',
                'Automated A/B testing of new model versions',
                'Canary deployments for inference endpoints'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 text-sm group">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span className="opacity-70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
