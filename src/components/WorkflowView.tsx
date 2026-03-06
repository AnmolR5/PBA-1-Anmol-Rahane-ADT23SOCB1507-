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
  Clock
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
      <header className="border-b border-[#141414] pb-8">
        <h2 className="text-5xl font-serif italic mb-4">Incident Workflow</h2>
        <p className="text-lg opacity-70 max-w-2xl">
          Real-world simulation of the AIOps system detecting, diagnosing, and resolving a critical infrastructure failure.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Timeline */}
        <div className="lg:col-span-4 space-y-4">
          {STEPS.map((step, idx) => (
            <div 
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className={`p-6 border transition-all cursor-pointer relative ${
                currentStep === idx 
                  ? 'border-[#141414] bg-white shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]' 
                  : 'border-[#141414]/10 hover:border-[#141414]/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${currentStep === idx ? step.bg : 'bg-gray-100'} ${currentStep === idx ? step.color : 'text-gray-400'}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${currentStep === idx ? 'opacity-100' : 'opacity-40'}`}>{step.title}</h4>
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">Step 0{idx + 1}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="absolute -bottom-4 left-10 w-[1px] h-4 bg-[#141414]/10" />
              )}
            </div>
          ))}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="border border-[#141414] bg-white h-full flex flex-col"
            >
              <div className="p-12 flex-1">
                <div className="flex items-center justify-between mb-12">
                  <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${STEPS[currentStep].bg} ${STEPS[currentStep].color}`}>
                    Active Phase
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono opacity-50">
                    <Clock className="w-3 h-3" />
                    T + {currentStep * 60}s
                  </div>
                </div>

                <h3 className="text-4xl font-serif italic mb-6">{STEPS[currentStep].title}</h3>
                <p className="text-xl leading-relaxed mb-8">{STEPS[currentStep].description}</p>
                
                <div className="bg-[#141414] p-8 text-[#E4E3E0] font-mono text-sm space-y-4">
                  <div className="flex items-center gap-2 opacity-50 border-b border-white/10 pb-2 mb-4">
                    <Terminal className="w-4 h-4" />
                    <span>System Logs</span>
                  </div>
                  <p className="text-emerald-400">{'>'} {STEPS[currentStep].details}</p>
                  <p className="opacity-50">{'>'} Analyzing telemetry stream from us-central1-a...</p>
                  <p className="opacity-50">{'>'} Correlation engine matched pattern with 'ConfigChange_v1'</p>
                </div>
              </div>

              <div className="p-8 border-t border-[#141414] bg-[#E4E3E0] flex justify-between items-center">
                <button 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-2 font-bold text-sm uppercase tracking-widest disabled:opacity-20"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-[#141414]' : 'bg-[#141414]/20'}`} />
                  ))}
                </div>
                <button 
                  disabled={currentStep === STEPS.length - 1}
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex items-center gap-2 px-6 py-2 bg-[#141414] text-[#E4E3E0] font-bold text-sm uppercase tracking-widest hover:bg-[#141414]/90 disabled:opacity-20"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
