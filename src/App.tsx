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
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ArchitectureView from './components/ArchitectureView';
import MLOpsView from './components/MLOpsView';
import WorkflowView from './components/WorkflowView';
import BestPracticesView from './components/BestPracticesView';

type View = 'architecture' | 'mlops' | 'workflow' | 'best-practices';

export default function App() {
  const [activeView, setActiveView] = useState<View>('architecture');

  const navItems = [
    { id: 'architecture', label: 'System Architecture', icon: Network },
    { id: 'mlops', label: 'MLOps Pipeline', icon: BrainCircuit },
    { id: 'workflow', label: 'Incident Workflow', icon: Workflow },
    { id: 'best-practices', label: 'Best Practices', icon: BookOpen },
  ];

  return (
    <div className="flex h-screen bg-[#E4E3E0] text-[#141414] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[#141414] flex flex-col bg-[#E4E3E0] z-10">
        <div className="p-8 border-bottom border-[#141414]">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6" />
            <h1 className="font-serif italic text-xl font-bold tracking-tight">AIOps Architect</h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Production-Grade Design</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm transition-all duration-200 group ${
                activeView === item.id 
                  ? 'bg-[#141414] text-[#E4E3E0]' 
                  : 'hover:bg-[#141414]/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-[#E4E3E0]' : 'text-[#141414]'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-[#141414]">
          <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <Settings className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">System Config</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#E4E3E0]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#141414 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-12 max-w-7xl mx-auto"
          >
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
