import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Globe, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Terminal,
  Shield,
  Search,
  Maximize2,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const generateData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      time: `${i}:00`,
      latency: Math.floor(Math.random() * 30) + 80,
      errors: Math.floor(Math.random() * 2),
      requests: Math.floor(Math.random() * 2000) + 8000,
      cpu: Math.floor(Math.random() * 20) + 30
    });
  }
  return data;
};

const LOG_MESSAGES = [
  "Neural link established with us-east-1",
  "Anomaly score: 0.042 (NOMINAL)",
  "Predictive cache hit: 98.4%",
  "Self-healing protocol 'SH-84' standby",
  "Traffic re-routed: 14% via edge-node-7",
  "Database cluster 'DB-PROD' health: 100%",
  "Security scan complete: 0 vulnerabilities",
  "Model 'Evolution-v4' weights synchronized",
  "Latency spike detected: us-west-2 (RESOLVED)",
  "Autonomous scaling: +4 nodes in cluster-A"
];

export default function LiveDashboardView() {
  const [data, setData] = useState(generateData());
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          latency: Math.floor(Math.random() * 30) + 80,
          errors: Math.floor(Math.random() * 2),
          requests: Math.floor(Math.random() * 2000) + 8000,
          cpu: Math.floor(Math.random() * 20) + 30
        });
        return newData;
      });

      if (Math.random() > 0.7) {
        setLogs(prev => [...prev.slice(-15), LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const stats = [
    { label: 'System Latency', value: '84ms', change: '-12%', trend: 'down', icon: Zap, color: 'text-emerald-400' },
    { label: 'Neural Throughput', value: '12.4k/s', change: '+18%', trend: 'up', icon: Globe, color: 'text-blue-400' },
    { label: 'Anomaly Index', value: '0.012', change: '-0.004', trend: 'down', icon: Activity, color: 'text-purple-400' },
    { label: 'Core Integrity', value: '99.9%', change: 'STABLE', trend: 'up', icon: Shield, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8 flex-1 flex flex-col">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">Neural Stream Active</span>
          </div>
          <h2 className="text-5xl font-serif italic text-white">Command Center</h2>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-1">Global Health</p>
            <p className="text-2xl font-serif italic text-emerald-400">OPTIMAL</p>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div>
            <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-1">Active SREs</p>
            <p className="text-2xl font-serif italic text-white">14</p>
          </div>
        </div>
      </header>

      {/* Stats Grid - Hardware Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#121216] p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rotate-45 translate-x-12 translate-y-[-12px] group-hover:bg-white/10 transition-colors" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-mono ${stat.trend === 'up' ? 'text-emerald-400' : 'text-blue-400'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-[9px] uppercase tracking-widest opacity-40 mb-1 font-mono relative z-10">{stat.label}</p>
            <p className="text-3xl font-serif italic text-white relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Primary Chart */}
        <div className="lg:col-span-8 bg-[#121216] p-8 rounded-2xl border border-white/5 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-emerald-500/50 opacity-20" />
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-serif italic text-2xl text-white">Neural Telemetry</h3>
              <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest mt-1">Real-time inference stream</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-mono uppercase tracking-widest opacity-50">Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[9px] font-mono uppercase tracking-widest opacity-50">Throughput</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" strokeOpacity={0.05} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#ffffff', opacity: 0.3 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#ffffff', opacity: 0.3 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '11px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLatency)" 
                  animationDuration={1000}
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRequests)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Terminal & Insights */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          {/* Real-time Terminal */}
          <div className="bg-[#0A0A0C] border border-white/5 rounded-2xl flex-1 flex flex-col overflow-hidden font-mono shadow-2xl">
            <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-widest opacity-60">Neural Log Stream</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto text-[11px] space-y-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <span className="opacity-20">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span className="text-emerald-400/80">{'>'}</span>
                    <span className="opacity-70">{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={logEndRef} />
            </div>
          </div>

          {/* AI Status Card */}
          <div className="bg-gradient-to-br from-[#1A1A1E] to-[#121216] p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu className="w-24 h-24" />
            </div>
            <h3 className="font-serif italic text-xl text-white mb-6 relative z-10">Core Intelligence</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs opacity-70">Anomaly Detection</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">NOMINAL</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs opacity-70">Predictive Scaling</span>
                </div>
                <span className="text-[10px] font-mono text-blue-400">READY</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-xs opacity-70">Root Cause Engine</span>
                </div>
                <span className="text-[10px] font-mono text-purple-400">IDLE</span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-emerald-500 text-[#0A0A0B] font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Initiate Deep Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
