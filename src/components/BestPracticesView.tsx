import React from 'react';
import { ShieldCheck, Coins, Zap, Scale, BookOpen, AlertCircle } from 'lucide-react';

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
      <header className="border-b border-[#141414] pb-8">
        <h2 className="text-5xl font-serif italic mb-4">Strategies & Best Practices</h2>
        <p className="text-lg opacity-70 max-w-2xl">
          Guidelines for building secure, cost-effective, and highly available AIOps systems on Google Cloud.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#141414] text-[#E4E3E0]">
                <section.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">{section.title}</h3>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.name} className="p-6 border border-[#141414]/10 bg-white/50 hover:border-[#141414]/30 transition-colors">
                  <h4 className="font-bold text-sm mb-2">{item.name}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-12 bg-[#141414] text-[#E4E3E0] rounded-sm">
        <div className="flex items-start gap-8">
          <div className="p-4 border border-white/20">
            <AlertCircle className="w-8 h-8 text-amber-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-serif italic">Alternative Design Choices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="font-bold mb-2 text-amber-400">Prometheus/Grafana Stack</h4>
                <p className="text-sm opacity-70 leading-relaxed">
                  Better for pure metric-based monitoring and open-source compliance. However, it lacks the native ML integration and petabyte-scale log analytics of BigQuery/Vertex AI.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-amber-400">Elasticsearch (ELK)</h4>
                <p className="text-sm opacity-70 leading-relaxed">
                  Superior for full-text search and real-time log exploration. But managing large clusters at scale can be operationally expensive compared to serverless BigQuery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
