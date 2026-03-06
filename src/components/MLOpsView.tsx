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
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 font-bold">Intelligence Lifecycle v5.0</span>
          </div>
          <h2 className="text-5xl font-serif italic text-slate-900">Evolutionary Core</h2>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">Active Model</p>
          <p className="text-xl font-serif italic text-slate-900">v3.1.0-quantum</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STAGES.map((stage, idx) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-slate-200 rounded-[40px] p-10 relative overflow-hidden group hover:border-emerald-200 transition-all shadow-sm"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity text-slate-900">
              {React.createElement(stage.icon, { className: "w-32 h-32" })}
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {React.createElement(stage.icon, { className: "w-6 h-6" })}
              </div>
              
              <h3 className="text-2xl font-serif italic text-slate-900 mb-4">{stage.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 mb-8">{stage.desc}</p>
              
              <div className="flex flex-wrap gap-2">
                {stage.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900">
            <Activity className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <Microscope className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-slate-900">Neural Drift Monitoring</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Real-time accuracy tracking</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-slate-500 mb-10">
              Continuous validation against production data streams. Automatically triggers retraining if model confidence drops below 92% or if feature drift exceeds 0.05.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">Drift Score</p>
                <p className="text-3xl font-serif italic text-emerald-600">0.012</p>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">Confidence</p>
                <p className="text-3xl font-serif italic text-slate-900">98.4%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900">
            <RefreshCw className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <GitBranch className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-slate-900">Self-Evolving Loops</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Automated hyperparameter tuning</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-slate-500 mb-10">
              Vertex AI Pipelines orchestrate the entire lifecycle. New data from BigQuery is automatically sampled and used to fine-tune model weights in a secure, isolated sandbox.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">Retrain Frequency</p>
                <p className="text-3xl font-serif italic text-blue-600">Daily</p>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">Last Update</p>
                <p className="text-3xl font-serif italic text-slate-900">2h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
