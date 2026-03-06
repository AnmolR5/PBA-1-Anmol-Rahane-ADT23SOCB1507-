import React from 'react';
import { ML_PIPELINE } from '../constants';
import { motion } from 'motion/react';
import { Brain, Database, Play, CheckCircle, RefreshCw, Activity, ShieldAlert } from 'lucide-react';

export default function MLOpsView() {
  return (
    <div className="space-y-12">
      <header className="border-b border-[#141414] pb-8">
        <h2 className="text-5xl font-serif italic mb-4">MLOps Pipeline</h2>
        <p className="text-lg opacity-70 max-w-2xl">
          Continuous integration and deployment for predictive failure models and anomaly detection engines.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ML_PIPELINE.map((stage, idx) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="border border-[#141414] p-8 h-full bg-white hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors duration-300">
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-4xl opacity-20 group-hover:opacity-40">0{idx + 1}</span>
                <div className="p-2 border border-current opacity-50">
                  {idx === 0 && <Database className="w-5 h-5" />}
                  {idx === 1 && <Brain className="w-5 h-5" />}
                  {idx === 2 && <RefreshCw className="w-5 h-5" />}
                  {idx === 3 && <Play className="w-5 h-5" />}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 tracking-tight">{stage.name}</h3>
              <p className="text-sm opacity-70 mb-8 leading-relaxed">{stage.description}</p>
              
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest opacity-50">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {stage.tools.map(tool => (
                    <span key={tool} className="text-[10px] font-mono border border-current px-2 py-1">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {idx < ML_PIPELINE.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 z-10 translate-y-[-50%]">
                <div className="w-8 h-[1px] bg-[#141414]" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        <div className="bg-[#141414] text-[#E4E3E0] p-12 rounded-sm">
          <h3 className="text-2xl font-serif italic mb-8">Model Monitoring & Drift</h3>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="p-3 bg-[#E4E3E0]/10 h-fit">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-2">Vertex AI Model Monitoring</h4>
                <p className="text-sm opacity-70 leading-relaxed">
                  Automatically detects training-serving skew and feature drift. If the distribution of log patterns changes significantly, a retraining pipeline is triggered.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="p-3 bg-[#E4E3E0]/10 h-fit">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-2">Explainable AI (XAI)</h4>
                <p className="text-sm opacity-70 leading-relaxed">
                  Provides feature attributions for every anomaly detection. Helps SREs understand *why* the model flagged a specific microservice as failing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#141414] p-12">
          <h3 className="text-2xl font-serif italic mb-8">Continuous Retraining</h3>
          <div className="space-y-6">
            <p className="text-sm leading-relaxed opacity-70">
              The pipeline uses Vertex AI Pipelines (Kubeflow) to automate the end-to-end lifecycle.
            </p>
            <div className="space-y-4">
              {[
                'Scheduled daily retraining on latest 24h data',
                'Trigger-based retraining on performance degradation',
                'Automated A/B testing of new model versions',
                'Canary deployments for inference endpoints'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
