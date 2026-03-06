import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Network, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Settings,
  Activity,
  Workflow,
  BookOpen,
  LineChart,
  BadgeCheck,
  Terminal,
  Cpu,
  Globe,
  Radio
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'architecture', label: 'Neural Topology', icon: Network },
    { id: 'mlops', label: 'Evolutionary Core', icon: BrainCircuit },
    { id: 'workflow', label: 'Autonomous Healing', icon: Workflow },
    { id: 'best-practices', label: 'Quantum Protocols', icon: BookOpen },
  ];

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans overflow-hidden selection:bg-emerald-100">
      {/* Refined Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Sidebar - Clean Minimal Style */}
      <aside className="w-72 border-r border-slate-200 flex flex-col bg-slate-50/50 backdrop-blur-xl z-20">
        <div className="p-8 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 blur-md rounded-full" />
              <div className="relative p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                <Radio className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <h1 className="font-serif italic text-xl font-bold tracking-tight text-slate-900">Autonomous Core</h1>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-mono font-bold">Quantum v5.0</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-6">
            <div className="p-2 bg-white border border-slate-200 rounded-md shadow-sm">
              <p className="text-[8px] uppercase tracking-widest text-slate-400 font-mono mb-1">System Time</p>
              <p className="text-[10px] font-mono text-slate-900">{currentTime.toLocaleTimeString([], { hour12: false })}</p>
            </div>
            <div className="p-2 bg-white border border-slate-200 rounded-md shadow-sm">
              <p className="text-[8px] uppercase tracking-widest text-slate-400 font-mono mb-1">Status</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                <p className="text-[10px] font-mono text-emerald-600 uppercase font-bold">Active</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm transition-all duration-300 group relative rounded-lg overflow-hidden ${
                activeView === item.id 
                  ? 'text-slate-900' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              {activeView === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-emerald-500/5 border-l-2 border-emerald-500"
                />
              )}
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 relative z-10 ${activeView === item.id ? 'text-emerald-600' : ''}`} />
              <span className="font-medium relative z-10 tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-slate-200 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-slate-400">
              <span>Neural Load</span>
              <span className="text-slate-900 font-bold">42%</span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[42%]" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group">
            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Core Protocols</span>
          </div>
        </div>
      </aside>

      {/* Main Content - Clean & Airy */}
      <main className="flex-1 overflow-y-auto relative bg-white">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-12 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
              <Cpu className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">AIOps Autonomous Core <span className="text-emerald-600 ml-2 font-mono text-sm align-top">v5.0</span></h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-medium">Neural Intelligence Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest font-bold">System Stable</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-right">
              <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Global Latency</p>
              <p className="text-xs font-mono text-slate-900 font-bold">12ms <span className="text-emerald-600 text-[10px]">▼ 2%</span></p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-12 max-w-7xl mx-auto min-h-[calc(100vh-88px)] flex flex-col relative z-10"
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
