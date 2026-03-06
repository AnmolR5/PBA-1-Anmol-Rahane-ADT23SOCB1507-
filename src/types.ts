export interface ArchitectureComponent {
  id: string;
  name: string;
  category: 'Ingestion' | 'Processing' | 'Storage' | 'Analytics' | 'ML' | 'Automation';
  description: string;
  gcpService: string;
  details: string[];
}

export interface DataFlow {
  from: string;
  to: string;
  label: string;
  type: 'streaming' | 'batch' | 'event';
}

export interface MLStage {
  id: string;
  name: string;
  description: string;
  tools: string[];
}
