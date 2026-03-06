import React from 'react';
import { 
  BrainCircuit, 
  Database, 
  Zap, 
  RefreshCw, 
  ShieldCheck, 
  Activity, 
  LineChart,
  GitBranch,
  Cpu,
  Microscope,
  Binary,
  Layers,
  Brain,
  Play,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const STAGES = [
  {
    title: 'Neural Training',
    icon: Binary,
    desc: 'Distributed training on Vertex AI using TPU v5p clusters. Optimized for sub-millisecond inference.',
    tech: ['TensorFlow', 'TPU v5p', 'Vertex AI'],
  },
  {
    title: 'Model Registry',
    icon: Layers,
    desc: 'Version-controlled model storage with automated lineage tracking and performance metadata.',
    tech: ['Vertex Registry', 'MLflow', 'GCS'],
  },
  {
    title: 'Autonomous Deployment',
    icon: Zap,
    desc: 'Canary deployments with automated rollback based on real-time drift detection and accuracy metrics.',
    tech: ['Vertex Endpoints', 'Istio', 'GKE'],
  },
  {
    title: 'Self-Evolving Loop',
    icon: RefreshCw,
    desc: 'Continuous fine-tuning based on production feedback and automated hyperparameter optimization.',
    tech: ['Vertex Pipelines', 'Kubeflow', 'BigQuery'],
  }
];

export default function MLOpsView() {
  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">Intelligence Lifecycle v3.0</span>
          </div>
          <h2 className="text-5xl font-serif italic text-white">Evolutionary Core</h2>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-1">Active Model</p>
          <p className="text-xl font-serif italic text-white">v3.1.0-quantum</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STAGES.map((stage, idx) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#121216] border border-white/5 rounded-[40px] p-10 relative overflow-hidden group hover:border-white/20 transition-all shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              {React.createElement(stage.icon, { className: "w-32 h-32" })}
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-emerald-500 group-hover:text-[#0A0A0B] transition-all">
                {React.createElement(stage.icon, { className: "w-6 h-6" })}
              </div>
              
              <h3 className="text-2xl font-serif italic text-white mb-4">{stage.title}</h3>
              <p className="text-sm leading-relaxed opacity-50 mb-8">{stage.desc}</p>
              
              <div className="flex flex-wrap gap-2">
                {stage.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-widest opacity-60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-[#1A1A1E] to-[#0A0A0C] border border-white/10 rounded-[40px] p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Activity className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
                <Microscope className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-white">Neural Drift Monitoring</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">Real-time accuracy tracking</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed opacity-60 mb-10">
              Continuous validation against production data streams. Automatically triggers retraining if model confidence drops below 92% or if feature drift exceeds 0.05.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-1">Drift Score</p>
                <p className="text-3xl font-serif italic text-emerald-400">0.012</p>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-1">Confidence</p>
                <p className="text-3xl font-serif italic text-white">98.4%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1E] to-[#0A0A0C] border border-white/10 rounded-[40px] p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <RefreshCw className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                <GitBranch className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-white">Self-Evolving Loops</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">Automated hyperparameter tuning</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed opacity-60 mb-10">
              Vertex AI Pipelines orchestrate the entire lifecycle. New data from BigQuery is automatically sampled and used to fine-tune model weights in a secure, isolated sandbox.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-1">Retrain Frequency</p>
                <p className="text-3xl font-serif italic text-blue-400">Daily</p>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-1">Last Update</p>
                <p className="text-3xl font-serif italic text-white">2h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
