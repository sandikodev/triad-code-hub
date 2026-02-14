
import { Blueprint, LanguageType } from '../types';

export const BLUEPRINTS_DATA: Blueprint[] = [
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
    id: 'spatial-engine',
    title: 'Spatial Compute Engine Core',
    category: 'Low Latency',
    languages: [LanguageType.ZIG],
    description: 'Mesin komputasi spasial untuk AR/VR yang dibangun dengan Zig Comptime untuk optimasi SIMD dan manajemen memori deterministik.',
    stats: [
      { label: 'Overhead', value: 'Zero-cost' },
      { label: 'Binary', value: '< 500KB' },
      { label: 'Precision', value: 'Bit-exact' }
    ],
    difficulty: 'Architect'
  },
  {
    id: 'fault-tolerant-gateway',
    title: 'Global Edge Messaging Gateway',
    category: 'Fault Tolerance',
    languages: [LanguageType.ELIXIR, LanguageType.RUST],
    description: 'Gateway pesan global menggunakan Rust untuk TLS termination cepat dan Elixir untuk manajemen sesi jutaan user yang terisolasi.',
    stats: [
      { label: 'Uptime', value: '99.9999%' },
      { label: 'Concurrency', value: '2M / node' },
      { label: 'Healing', value: 'Auto-Supervised' }
    ],
    difficulty: 'Senior'
  },
  {
    id: 'p2p-file-orchestrator',
    title: 'Decentralized P2P Orchestrator',
    category: 'Real-time',
    languages: [LanguageType.RUST, LanguageType.ZIG],
    description: 'Orkestrator file P2P yang memanfaatkan Rust untuk keamanan jaringan dan Zig untuk kernel-level disk I/O yang efisien.',
    stats: [
      { label: 'Protocols', value: 'QUIC / TCP' },
      { label: 'I/O Speed', value: 'Disk-bound' },
      { label: 'Reliability', value: 'Deterministic' }
    ],
    difficulty: 'Architect'
  }
];
