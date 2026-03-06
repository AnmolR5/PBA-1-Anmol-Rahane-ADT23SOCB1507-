import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Search, 
  Settings, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  Zap,
  Terminal,
  Clock,
  Workflow
} from 'lucide-react';

const STEPS = [
  {
    id: 'detection',
    title: 'Anomaly Detection',
    icon: AlertTriangle,
    description: 'Vertex AI detects a 300% spike in 5xx errors on the "Checkout" service.',
    details: 'Model: AnomalyDetector-v2. Confidence: 94%. Impact: Critical.',
    color: 'text-red-600',
    bg: 'bg-red-50'
  },
  {
    id: 'rca',
    title: 'Root Cause Analysis',
    icon: Search,
    description: 'RCA Engine queries BigQuery logs and identifies a recent config change.',
    details: 'Found: Deployment #842 changed DB connection timeout from 30s to 300ms.',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 'notification',
    title: 'Incident Orchestration',
    icon: MessageSquare,
    description: 'System creates a PagerDuty incident and Slack channel automatically.',
    details: 'Context provided: Log snippets, RCA findings, and affected user count.',
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    id: 'remediation',
    title: 'Automated Remediation',
    icon: Settings,
    description: 'Self-healing workflow triggers a rollback of Deployment #842.',
    details: 'Action: GKE Rollout Undo. Verification: Monitoring error rates for 5 mins.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    id: 'resolution',
    title: 'Post-Mortem & Learning',
    icon: CheckCircle2,
    description: 'Incident closed. Data added to training set for future prevention.',
    details: 'Resolution time: 4.2 minutes. Manual intervention: None.',
    color: 'text-slate-600',
    bg: 'bg-slate-50'
  }
];

export default function WorkflowView() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-[#141414]/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Workflow className="w-4 h-4 opacity-50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">Automated Resolution</span>
          </div>
          <h2 className="text-5xl font-serif italic">Incident Workflow</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">MTTR Target</p>
          <p className="text-xl font-serif italic text-emerald-600">{'<'} 5.0m</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Timeline */}
        <div className="lg:col-span-4 space-y-3">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setCurrentStep(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative group ${
                currentStep === idx 
                  ? 'border-[#141414] bg-white shadow-xl' 
                  : 'border-[#141414]/5 bg-white/50 hover:bg-white hover:border-[#141414]/20'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  currentStep === idx ? step.bg + ' ' + step.color : 'bg-[#F5F5F0] text-[#141414]/30 group-hover:text-[#141414]'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm tracking-tight ${currentStep === idx ? 'opacity-100' : 'opacity-40'}`}>{step.title}</h4>
                  <p className="text-[9px] font-mono uppercase tracking-widest opacity-30">Phase 0{idx + 1}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="absolute -bottom-3 left-11 w-[1px] h-3 bg-[#141414]/10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="bg-white border border-[#141414]/5 rounded-[32px] shadow-2xl h-full flex flex-col overflow-hidden"
            >
              <div className="p-12 flex-1">
                <div className="flex items-center justify-between mb-12">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${STEPS[currentStep].bg} ${STEPS[currentStep].color}`}>
                    Active Simulation
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono opacity-40">
                    <Clock className="w-3.5 h-3.5" />
                    T + {currentStep * 60}s
                  </div>
                </div>

                <h3 className="text-5xl font-serif italic mb-8">{STEPS[currentStep].title}</h3>
                <p className="text-2xl leading-relaxed mb-10 opacity-80">{STEPS[currentStep].description}</p>
                
                <div className="bg-[#141414] p-10 rounded-2xl text-white font-mono text-sm space-y-5 shadow-inner">
                  <div className="flex items-center gap-3 opacity-30 border-b border-white/10 pb-4 mb-2">
                    <Terminal className="w-4 h-4" />
                    <span className="uppercase tracking-[0.2em] text-[10px]">Kernel Telemetry Stream</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-emerald-400 flex gap-3">
                      <span className="opacity-30">01:42:04</span>
                      <span>{'>'} {STEPS[currentStep].details}</span>
                    </p>
                    <p className="opacity-40 flex gap-3">
                      <span className="opacity-30">01:42:05</span>
                      <span>{'>'} Analyzing telemetry stream from us-central1-a...</span>
                    </p>
                    <p className="opacity-40 flex gap-3">
                      <span className="opacity-30">01:42:07</span>
                      <span>{'>'} Correlation engine matched pattern with 'ConfigChange_v1'</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-10 border-t border-[#141414]/5 bg-[#F5F5F0]/50 flex justify-between items-center">
                <button 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-8 py-3 font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 hover:bg-[#141414]/5 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-3">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentStep ? 'bg-[#141414] w-4' : 'bg-[#141414]/10'}`} />
                  ))}
                </div>
                <button 
                  disabled={currentStep === STEPS.length - 1}
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex items-center gap-3 px-8 py-3 bg-[#141414] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#141414]/90 disabled:opacity-20 rounded-lg shadow-lg shadow-[#141414]/10"
                >
                  Next Phase <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
