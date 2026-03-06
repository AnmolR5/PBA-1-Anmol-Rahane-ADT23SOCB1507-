import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Network, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Settings,
  Activity,
  Server,
  Database,
  Cpu,
  Workflow,
  BookOpen,
  LineChart,
  BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ArchitectureView from './components/ArchitectureView';
import MLOpsView from './components/MLOpsView';
import WorkflowView from './components/WorkflowView';
import BestPracticesView from './components/BestPracticesView';
import LiveDashboardView from './components/LiveDashboardView';

type View = 'dashboard' | 'architecture' | 'mlops' | 'workflow' | 'best-practices';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Live Dashboard', icon: LayoutDashboard },
    { id: 'architecture', label: 'System Architecture', icon: Network },
    { id: 'mlops', label: 'MLOps Pipeline', icon: BrainCircuit },
    { id: 'workflow', label: 'Incident Workflow', icon: Workflow },
    { id: 'best-practices', label: 'Best Practices', icon: BookOpen },
  ];

  return (
    <div className="flex h-screen bg-[#F5F5F0] text-[#141414] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[#141414]/10 flex flex-col bg-white z-10">
        <div className="p-8 border-b border-[#141414]/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 bg-[#141414] text-white rounded-sm">
              <Activity className="w-5 h-5" />
            </div>
            <h1 className="font-serif italic text-xl font-bold tracking-tight">AIOps Architect</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Enterprise v2.0</span>
            <BadgeCheck className="w-3 h-3 text-emerald-600" />
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm transition-all duration-200 group rounded-lg ${
                activeView === item.id 
                  ? 'bg-[#141414] text-white shadow-lg shadow-[#141414]/10' 
                  : 'text-[#141414]/60 hover:text-[#141414] hover:bg-[#141414]/5'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeView === item.id ? 'text-white' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-[#141414]/5">
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-wider">System Config</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#F5F5F0]">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#141414 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="p-12 max-w-7xl mx-auto min-h-full flex flex-col"
          >
            {activeView === 'dashboard' && <LiveDashboardView />}
            {activeView === 'architecture' && <ArchitectureView />}
            {activeView === 'mlops' && <MLOpsView />}
            {activeView === 'workflow' && <WorkflowView />}
            {activeView === 'best-practices' && <BestPracticesView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
