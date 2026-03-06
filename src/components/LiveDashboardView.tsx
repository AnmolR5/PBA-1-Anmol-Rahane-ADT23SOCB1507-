import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  Globe, 
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';

const generateData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: `${i}:00`,
      latency: Math.floor(Math.random() * 50) + 100,
      errors: Math.floor(Math.random() * 5),
      requests: Math.floor(Math.random() * 1000) + 5000
    });
  }
  return data;
};

export default function LiveDashboardView() {
  const [data, setData] = useState(generateData());
  const [uptime, setUptime] = useState(99.998);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          latency: Math.floor(Math.random() * 50) + 100,
          errors: Math.floor(Math.random() * 5),
          requests: Math.floor(Math.random() * 1000) + 5000
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Avg Latency', value: '112ms', change: '-4%', trend: 'down', icon: Zap },
    { label: 'Request Rate', value: '8.4k/s', change: '+12%', trend: 'up', icon: Globe },
    { label: 'Error Rate', value: '0.02%', change: '-0.01%', trend: 'down', icon: AlertCircle },
    { label: 'CPU Usage', value: '42%', change: '+2%', trend: 'up', icon: Cpu },
  ];

  return (
    <div className="space-y-8 flex-1 flex flex-col">
      <header className="flex justify-between items-end border-b border-[#141414]/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">Live System Status</span>
          </div>
          <h2 className="text-5xl font-serif italic">Global Operations</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">System Uptime</p>
          <p className="text-2xl font-serif italic text-emerald-600">{uptime}%</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl border border-[#141414]/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#F5F5F0] rounded-lg">
                <stat.icon className="w-5 h-5 opacity-70" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-blue-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 font-mono">{stat.label}</p>
            <p className="text-3xl font-serif italic">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-[#141414]/5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif italic text-xl">Latency & Throughput</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#141414]" />
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Latency (ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Requests</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#141414" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#141414" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#141414" strokeOpacity={0.05} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace', opacity: 0.4 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace', opacity: 0.4 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#141414" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLatency)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#141414] text-white p-8 rounded-2xl shadow-xl flex flex-col h-full">
            <h3 className="font-serif italic text-xl mb-6">AI Insights</h3>
            <div className="space-y-6 flex-1">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Normal Operations</span>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">
                  System behavior matches historical baseline for Thursday evening peak. No anomalies detected in the last 6 hours.
                </p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">Predictive Alert</span>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">
                  Vertex AI predicts a potential memory leak in 'AuthService' within the next 45 minutes based on gradual heap growth.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Optimization</span>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">
                  BigQuery query patterns suggest adding a cluster key on 'user_id' could reduce RCA latency by 15%.
                </p>
              </div>
            </div>
            
            <button className="w-full py-3 bg-white text-[#141414] font-bold text-xs uppercase tracking-widest rounded-lg mt-8 hover:bg-opacity-90 transition-colors">
              Run Full Diagnostic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
