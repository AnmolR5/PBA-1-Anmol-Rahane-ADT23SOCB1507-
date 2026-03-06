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
  Workflow,
  ShieldAlert,
  Activity,
  Cpu,
  RefreshCw,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const STEPS = [
  {
    id: 'detection',
    title: 'Neural Anomaly',
    icon: AlertTriangle,
    description: 'Autonomous Core detects a 300% spike in 5xx errors on the "Checkout" service.',
    details: 'Model: NeuralDetector-v3. Confidence: 98.4%. Impact: Critical.',
    color: 'text-red-400',
    bg: 'bg-red-500/10'
  },
  {
    id: 'rca',
    title: 'Cognitive RCA',
    icon: Search,
    description: 'RCA Engine queries BigQuery logs and identifies a recent config change.',
    details: 'Found: Deployment #842 changed DB connection timeout from 30s to 300ms.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    id: 'notification',
    title: 'Incident Mesh',
    icon: MessageSquare,
    description: 'System creates a PagerDuty incident and Slack channel automatically.',
    details: 'Context provided: Log snippets, RCA findings, and affected user count.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    id: 'remediation',
    title: 'Autonomous Healing',
    icon: RefreshCw,
    description: 'Self-healing workflow triggers a rollback of Deployment #842.',
    details: 'Action: GKE Rollout Undo. Verification: Monitoring error rates for 5 mins.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 'resolution',
    title: 'Core Evolution',
    icon: CheckCircle2,
    description: 'Incident closed. Data added to training set for future prevention.',
    details: 'Resolution time: 4.2 minutes. Manual intervention: None.',
    color: 'text-slate-400',
    bg: 'bg-white/5'
  }
];

export default function WorkflowView() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Workflow className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 font-bold">Autonomous Protocols v5.0</span>
          </div>
          <h2 className="text-5xl font-serif italic text-slate-900">Autonomous Healing</h2>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">MTTR Target</p>
          <p className="text-xl font-serif italic text-emerald-600">{'<'} 5.0m</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Timeline */}
        <div className="lg:col-span-4 space-y-4">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setCurrentStep(idx)}
              className={`p-8 rounded-[32px] border transition-all cursor-pointer relative group overflow-hidden ${
                currentStep === idx 
                  ? 'border-emerald-200 bg-emerald-50 shadow-sm' 
                  : 'border-slate-200 bg-white hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  currentStep === idx ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'
                }`}>
                  {React.createElement(step.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h4 className={`font-serif italic text-xl text-slate-900 transition-opacity ${currentStep === idx ? 'opacity-100' : 'opacity-40'}`}>{step.title}</h4>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">Phase 0{idx + 1}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="absolute -bottom-4 left-15 w-[1px] h-4 bg-slate-200" />
              )}
              {currentStep === idx && (
                <motion.div 
                  layoutId="activeStepIndicator"
                  className="absolute top-8 right-8 w-2 h-2 rounded-full bg-emerald-600"
                />
              )}
            </motion.div>
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
              className="bg-white border border-slate-200 rounded-[40px] shadow-sm h-full flex flex-col overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900 pointer-events-none">
                {React.createElement(STEPS[currentStep].icon, { className: "w-64 h-64" })}
              </div>

              <div className="p-16 flex-1 relative z-10">
                <div className="flex items-center justify-between mb-16">
                  <div className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${STEPS[currentStep].bg.replace('500/10', '50')} ${STEPS[currentStep].color.replace('400', '600')} border-current/20`}>
                    Active Protocol
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    <Clock className="w-4 h-4" />
                    T + {currentStep * 60}s
                  </div>
                </div>

                <h3 className="text-6xl font-serif italic text-slate-900 mb-10">{STEPS[currentStep].title}</h3>
                <p className="text-2xl leading-relaxed mb-12 text-slate-500 max-w-2xl">{STEPS[currentStep].description}</p>
                
                <div className="bg-slate-900 border border-slate-800 p-12 rounded-[32px] font-mono text-sm space-y-6 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.02]" 
                       style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  
                  <div className="flex items-center gap-3 text-slate-500 border-b border-slate-800 pb-6 mb-2 relative z-10">
                    <Terminal className="w-4 h-4" />
                    <span className="uppercase tracking-[0.3em] text-[10px]">Neural Telemetry Stream</span>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <p className="text-emerald-400 flex gap-4">
                      <span className="text-slate-600">01:42:04</span>
                      <span>{'>'} {STEPS[currentStep].details}</span>
                    </p>
                    <p className="text-slate-500 flex gap-4">
                      <span className="text-slate-700">01:42:05</span>
                      <span>{'>'} Analyzing telemetry stream from us-central1-a...</span>
                    </p>
                    <p className="text-slate-500 flex gap-4">
                      <span className="text-slate-700">01:42:07</span>
                      <span>{'>'} Correlation engine matched pattern with 'ConfigChange_v1'</span>
                    </p>
                    <p className="text-slate-500 flex gap-4">
                      <span className="text-slate-700">01:42:09</span>
                      <span>{'>'} Initiating autonomous healing sequence...</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-12 border-t border-slate-100 bg-slate-50 flex justify-between items-center relative z-10">
                <button 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center gap-3 px-8 py-4 font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex gap-4">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentStep ? 'bg-emerald-600 w-8' : 'bg-slate-200'}`} />
                  ))}
                </div>
                <button 
                  disabled={currentStep === STEPS.length - 1}
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex items-center gap-3 px-10 py-4 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-20 rounded-2xl shadow-md transition-all"
                >
                  Next Phase <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
