
import { Blueprint, LanguageType } from '../types';

export const BLUEPRINTS_DATA: Blueprint[] = [
  {
    id: 'neural-decoder',
    title: 'BCI Neural Signal Decoder',
    category: 'Neural Compute',
    languages: [LanguageType.MOJO, LanguageType.RUST],
    description: 'Pipeline pemrosesan sinyal saraf realtime yang menggunakan Mojo untuk inferensi ML cepat dan Rust untuk abstraksi hardware yang aman.',
    stats: [
      { label: 'Jitter', value: '< 0.5ms' },
      { label: 'Inference', value: 'SIMD Opt' },
      { label: 'Safety', value: 'Formal' }
    ],
    difficulty: 'Lead'
  },
  {
    id: 'spatial-renderer-universal',
    title: 'Universal Spatial Render Pipe',
    category: 'Spatial Graphics',
    languages: [LanguageType.WGSL, LanguageType.RUST],
    description: 'Engine rendering spasial berbasis WebGPU yang mengonvergensi pipeline browser dan native untuk pengalaman XR universal.',
    stats: [
      { label: 'API', value: 'WebGPU' },
      { label: 'Platform', value: 'Cross-XR' },
      { label: 'Memory', value: 'Unified' }
    ],
    difficulty: 'Architect'
  },
  {
    id: 'distributed-ledger',
    title: 'High-Frequency Distributed Ledger',
    category: 'High Throughput',
    languages: [LanguageType.RUST, LanguageType.ELIXIR],
    description: 'Arsitektur ledger terdistribusi yang memisahkan storage engine (Rust) dengan koordinasi konsensus (Elixir/OTP) untuk menangani 1jt+ TPS.',
    stats: [
      { label: 'Latency', value: '< 2ms' },
      { label: 'Safety', value: 'Memory-Safe' },
      { label: 'Scale', value: '10M+ nodes' }
    ],
    difficulty: 'Lead'
  },
  {
    id: 'fault-tolerant-gateway',
    title: 'Global Edge Messaging Gateway',
    category: 'Fault Tolerance',
    languages: [LanguageType.GLEAM, LanguageType.RUST],
    description: 'Gateway pesan menggunakan Gleam untuk type-safety di atas BEAM VM dan Rust untuk TLS termination performa tinggi.',
    stats: [
      { label: 'Uptime', value: '99.9999%' },
      { label: 'Concurrency', value: 'Type-Safe' },
      { label: 'Healing', value: 'OTP-Based' }
    ],
    difficulty: 'Senior'
  }
];
