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
    <div className="flex h-screen bg-[#0A0A0B] text-[#E0E0E0] font-sans overflow-hidden selection:bg-emerald-500/30">
      {/* Immersive Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#E0E0E0 1px, transparent 1px), linear-gradient(90deg, #E0E0E0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Sidebar - Hardware Style */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-[#0F0F11]/80 backdrop-blur-xl z-20">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full animate-pulse" />
              <div className="relative p-2 bg-[#1A1A1E] border border-white/10 rounded-lg">
                <Radio className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="font-serif italic text-xl font-bold tracking-tight text-white">Autonomous Core</h1>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-mono">Quantum v3.0</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-6">
            <div className="p-2 bg-white/5 border border-white/5 rounded-md">
              <p className="text-[8px] uppercase tracking-widest opacity-40 font-mono mb-1">System Time</p>
              <p className="text-[10px] font-mono text-white">{currentTime.toLocaleTimeString([], { hour12: false })}</p>
            </div>
            <div className="p-2 bg-white/5 border border-white/5 rounded-md">
              <p className="text-[8px] uppercase tracking-widest opacity-40 font-mono mb-1">Status</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-[10px] font-mono text-emerald-400 uppercase">Active</p>
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
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {activeView === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500"
                />
              )}
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 relative z-10 ${activeView === item.id ? 'text-emerald-400' : ''}`} />
              <span className="font-medium relative z-10 tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest opacity-40">
              <span>Neural Load</span>
              <span>42%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[42%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Core Protocols</span>
          </div>
        </div>
      </aside>

      {/* Main Content - Atmospheric */}
      <main className="flex-1 overflow-y-auto relative bg-[#0A0A0B]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="p-12 max-w-7xl mx-auto min-h-full flex flex-col relative z-10"
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
