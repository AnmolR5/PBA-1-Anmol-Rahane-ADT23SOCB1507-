import { ArchitectureComponent, DataFlow, MLStage } from './types';

export const COMPONENTS: ArchitectureComponent[] = [
  {
    id: 'ops-suite',
    name: 'Cloud Operations Suite',
    category: 'Ingestion',
    gcpService: 'Cloud Logging & Monitoring',
    description: 'Unified ingestion point for all telemetry data.',
    details: [
      'Aggregates logs from GKE, Compute Engine, and multi-cloud agents',
      'Collects system and application metrics',
      'Distributed tracing with Cloud Trace'
    ]
  },
  {
    id: 'pubsub',
    name: 'Real-time Messaging',
    category: 'Ingestion',
    gcpService: 'Cloud Pub/Sub',
    description: 'Decouples ingestion from processing with high-throughput streaming.',
    details: [
      'Handles millions of events per second',
      'Global endpoint for multi-region data collection',
      'Guaranteed at-least-once delivery'
    ]
  },
  {
    id: 'dataflow',
    name: 'Stream Processing',
    category: 'Processing',
    gcpService: 'Cloud Dataflow',
    description: 'Real-time ETL and feature extraction from telemetry streams.',
    details: [
      'Windowing for time-series analysis',
      'Feature engineering for ML models (e.g., error rates, latency spikes)',
      'Schema validation and data enrichment'
    ]
  },
  {
    id: 'bigquery',
    name: 'Analytics Warehouse',
    category: 'Storage',
    gcpService: 'BigQuery',
    description: 'Large-scale log analytics and historical data storage.',
    details: [
      'Petabyte-scale SQL queries for root cause analysis',
      'BigQuery ML for baseline statistical modeling',
      'Partitioned and clustered tables for cost-efficient storage'
    ]
  },
  {
    id: 'vertex-ai',
    name: 'AI/ML Platform',
    category: 'ML',
    gcpService: 'Vertex AI',
    description: 'Core engine for anomaly detection and predictive maintenance.',
    details: [
      'Vertex AI Pipelines for automated retraining',
      'Online Prediction for real-time anomaly scoring',
      'Model Monitoring to detect feature drift'
    ]
  },
  {
    id: 'gke',
    name: 'Automation Engine',
    category: 'Automation',
    gcpService: 'Google Kubernetes Engine',
    description: 'Hosts the RCA engine and self-healing microservices.',
    details: [
      'Scalable microservices for incident orchestration',
      'Integration with external APIs (Slack, PagerDuty, Jira)',
      'Auto-scaling based on incident volume'
    ]
  }
];

export const FLOWS: DataFlow[] = [
  { from: 'ops-suite', to: 'pubsub', label: 'Log Export', type: 'streaming' },
  { from: 'pubsub', to: 'dataflow', label: 'Stream Ingest', type: 'streaming' },
  { from: 'dataflow', to: 'bigquery', label: 'Historical Sink', type: 'batch' },
  { from: 'dataflow', to: 'vertex-ai', label: 'Feature Stream', type: 'streaming' },
  { from: 'vertex-ai', to: 'gke', label: 'Anomaly Events', type: 'event' },
  { from: 'gke', to: 'bigquery', label: 'RCA Queries', type: 'event' }
];

export const ML_PIPELINE: MLStage[] = [
  {
    id: 'data-prep',
    name: 'Data Preparation',
    description: 'Cleaning and normalizing logs/metrics from BigQuery.',
    tools: ['Dataflow', 'BigQuery']
  },
  {
    id: 'training',
    name: 'Model Training',
    description: 'Training LSTM or Transformer models for time-series prediction.',
    tools: ['Vertex AI Training', 'TensorFlow']
  },
  {
    id: 'eval',
    name: 'Evaluation',
    description: 'Validating model performance against historical outages.',
    tools: ['Vertex AI Experiments']
  },
  {
    id: 'deploy',
    name: 'Deployment',
    description: 'Deploying models to scalable endpoints for real-time scoring.',
    tools: ['Vertex AI Endpoints']
  }
];
