
export enum LanguageType {
  ZIG = 'Zig',
  ELIXIR = 'Elixir',
  RUST = 'Rust',
  NIM = 'Nim',
  MOJO = 'Mojo',
  CARBON = 'Carbon',
  GLEAM = 'Gleam',
  WGSL = 'WGSL'
}

export interface Concept {
  name: string;
  definition: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  concepts: Concept[];
  relatedConcepts?: Concept[];
}

export interface LanguageInfo {
  id: LanguageType;
  name: string;
  tagline: string;
  description: string;
  color: string;
  accent: string;
  icon: string;
  docs: string;
  isComingSoon?: boolean;
  isSatellite?: boolean; // Menandai bahasa pendukung arsitektur
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isError?: boolean;
  isLoading?: boolean;
}

export type BlueprintCategory = 'High Throughput' | 'Fault Tolerance' | 'Low Latency' | 'Real-time' | 'Neural Compute' | 'Spatial Graphics';

export interface Blueprint {
  id: string;
  title: string;
  category: BlueprintCategory;
  languages: LanguageType[];
  description: string;
  stats: { label: string; value: string }[];
  difficulty: 'Architect' | 'Senior' | 'Lead';
}
