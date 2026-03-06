import React from 'react';
import { ShieldCheck, Coins, Zap, Scale, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function BestPracticesView() {
  const sections = [
    {
      title: 'Architecture Best Practices',
      icon: BookOpen,
      items: [
        { name: 'Decouple Ingestion', desc: 'Use Pub/Sub to buffer telemetry. Never let a spike in logs crash your processing pipeline.' },
        { name: 'Schema Enforcement', desc: 'Use Dataflow to normalize logs early. ML models perform better on consistent, structured data.' },
        { name: 'Multi-Region Resilience', desc: 'Deploy critical components across multiple regions to ensure availability during regional outages.' }
      ]
    },
    {
      title: 'Security Considerations',
      icon: ShieldCheck,
      items: [
        { name: 'Least Privilege IAM', desc: 'Use dedicated Service Accounts for each component (e.g., Dataflow worker vs. Vertex AI endpoint).' },
        { name: 'VPC Service Controls', desc: 'Create a security perimeter around BigQuery and Vertex AI to prevent data exfiltration.' },
        { name: 'Encryption at Rest', desc: 'Use Customer-Managed Encryption Keys (CMEK) for sensitive log data in Cloud Storage.' }
      ]
    },
    {
      title: 'Cost Optimization',
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
      <header className="flex justify-between items-end border-b border-[#141414]/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 opacity-50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">Operational Standards</span>
          </div>
          <h2 className="text-5xl font-serif italic">Strategies & Best Practices</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">Compliance Score</p>
          <p className="text-xl font-serif italic text-emerald-600">A+ / Certified</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sections.map((section, sIdx) => (
          <div key={section.title} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#141414] text-white flex items-center justify-center shadow-lg shadow-[#141414]/10">
                <section.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif italic tracking-tight">{section.title}</h3>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item, iIdx) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (sIdx * 3 + iIdx) * 0.05 }}
                  className="p-8 bg-white border border-[#141414]/5 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                  </div>
                  <p className="text-sm opacity-50 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-12 bg-[#141414] text-white rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <AlertCircle className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start gap-10">
            <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
              <AlertCircle className="w-10 h-10 text-amber-400" />
            </div>
            <div className="space-y-8">
              <h3 className="text-4xl font-serif italic">Alternative Design Choices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-amber-400">Prometheus/Grafana Stack</h4>
                  <p className="text-sm opacity-50 leading-relaxed">
                    Better for pure metric-based monitoring and open-source compliance. However, it lacks the native ML integration and petabyte-scale log analytics of BigQuery/Vertex AI.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-amber-400">Elasticsearch (ELK)</h4>
                  <p className="text-sm opacity-50 leading-relaxed">
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
