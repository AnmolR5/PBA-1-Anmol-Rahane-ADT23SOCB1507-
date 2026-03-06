import React from 'react';
import { ShieldCheck, Coins, Zap, Scale, BookOpen, AlertCircle, CheckCircle, Shield, Lock, Cpu, Globe, Database } from 'lucide-react';
import { motion } from 'motion/react';

export default function BestPracticesView() {
  const sections = [
    {
      title: 'Neural Architecture',
      icon: Cpu,
      items: [
        { name: 'Decouple Ingestion', desc: 'Use Pub/Sub to buffer telemetry. Never let a spike in logs crash your processing pipeline.' },
        { name: 'Schema Enforcement', desc: 'Use Dataflow to normalize logs early. ML models perform better on consistent, structured data.' },
        { name: 'Multi-Region Resilience', desc: 'Deploy critical components across multiple regions to ensure availability during regional outages.' }
      ]
    },
    {
      title: 'Quantum Security',
      icon: Shield,
      items: [
        { name: 'Least Privilege IAM', desc: 'Use dedicated Service Accounts for each component (e.g., Dataflow worker vs. Vertex AI endpoint).' },
        { name: 'VPC Service Controls', desc: 'Create a security perimeter around BigQuery and Vertex AI to prevent data exfiltration.' },
        { name: 'Encryption at Rest', desc: 'Use Customer-Managed Encryption Keys (CMEK) for sensitive log data in Cloud Storage.' }
      ]
    },
    {
      title: 'Resource Efficiency',
      icon: Coins,
      items: [
        { name: 'BigQuery Partitioning', desc: 'Always partition log tables by ingestion time to reduce query costs during RCA.' },
        { name: 'Dataflow Flex Templates', desc: 'Use Flex templates and auto-scaling to only pay for the compute you need during peak hours.' },
        { name: 'Storage Lifecycle', desc: 'Move historical logs from BigQuery to Coldline/Archive Cloud Storage after 30-90 days.' }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 font-bold">Operational Standards v5.0</span>
          </div>
          <h2 className="text-5xl font-serif italic text-slate-900">Quantum Protocols</h2>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">Compliance Score</p>
          <p className="text-xl font-serif italic text-emerald-600">A+ / Certified</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {sections.map((section, sIdx) => (
          <div key={section.title} className="space-y-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center shadow-sm">
                <section.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-serif italic text-slate-900 tracking-tight">{section.title}</h3>
            </div>
            
            <div className="space-y-6">
              {section.items.map((item, iIdx) => (
                <motion.div 
                   key={item.name}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: (sIdx * 3 + iIdx) * 0.05 }}
                   className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm hover:border-emerald-200 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity text-slate-900">
                    {React.createElement(section.icon, { className: "w-24 h-24" })}
                  </div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-serif italic text-lg text-slate-900 tracking-tight">{item.name}</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-16 bg-slate-50 border border-slate-200 text-slate-900 rounded-[48px] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 opacity-[0.03]">
          <AlertCircle className="w-80 h-80" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start gap-12">
            <div className="p-6 bg-white rounded-[32px] border border-slate-200 shadow-sm backdrop-blur-xl">
              <AlertCircle className="w-12 h-12 text-amber-600" />
            </div>
            <div className="space-y-10 flex-1">
              <div>
                <h3 className="text-4xl font-serif italic mb-4">Alternative Design Choices</h3>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">Trade-off Analysis</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <h4 className="font-serif italic text-2xl text-amber-600">Prometheus/Grafana Stack</h4>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    Better for pure metric-based monitoring and open-source compliance. However, it lacks the native ML integration and petabyte-scale log analytics of BigQuery/Vertex AI.
                  </p>
                </div>
                <div className="space-y-6">
                  <h4 className="font-serif italic text-2xl text-amber-600">Elasticsearch (ELK)</h4>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    Superior for full-text search and real-time log exploration. But managing large clusters at scale can be operationally expensive compared to serverless BigQuery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
