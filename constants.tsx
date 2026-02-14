
import React from 'react';
import { LanguageType, LanguageInfo } from './types';

export const LANGUAGES: LanguageInfo[] = [
  {
    id: LanguageType.ZIG,
    name: 'Zig',
    tagline: 'Standard: The Precision Foundation.',
    description: 'Manual memory control and zero hidden logic. The baseline for all modern systems engineers.',
    color: 'bg-[#F7A41D]',
    accent: 'text-[#F7A41D]',
    icon: '⚡',
    docs: 'https://ziglang.org/learn/',
    isPremium: false
  },
  {
    id: LanguageType.ELIXIR,
    name: 'Elixir',
    tagline: 'Standard: The Scalability Foundation.',
    description: 'Build fault-tolerant systems using the BEAM. Master of massive concurrency and distributed nodes.',
    color: 'bg-[#4e2a8e]',
    accent: 'text-[#a45dfc]',
    icon: '💧',
    docs: 'https://elixir-lang.org/learning.html',
    isPremium: false
  },
  {
    id: LanguageType.RUST,
    name: 'Rust',
    tagline: 'Standard: The Safety Foundation.',
    description: 'Memory safety without a garbage collector. The industrial standard for reliable systems code.',
    color: 'bg-[#DEA584]',
    accent: 'text-[#DEA584]',
    icon: '🦀',
    docs: 'https://www.rust-lang.org/learn',
    isPremium: false
  },
  {
    id: LanguageType.MOJO,
    name: 'Mojo',
    tagline: 'Pro: AI Infrastructure Edge.',
    description: 'Exclusive: Python syntax with C performance. Unlock the power to build the next generation of neural engines.',
    color: 'bg-[#FF4500]',
    accent: 'text-[#FF4500]',
    icon: '🔥',
    docs: 'https://docs.modular.com/mojo/',
    isSatellite: true,
    isPremium: true
  },
  {
    id: LanguageType.CARBON,
    name: 'Carbon',
    tagline: 'Pro: Enterprise Modernization.',
    description: 'Exclusive: The successor to C++. Critical for migrating massive legacy systems to safe, modern architectures.',
    color: 'bg-[#2c3e50]',
    accent: 'text-slate-400',
    icon: '🧪',
    docs: 'https://github.com/carbon-language/carbon-lang',
    isSatellite: true,
    isPremium: true
  },
  {
    id: LanguageType.GLEAM,
    name: 'Gleam',
    tagline: 'Pro: Distributed Type-Safety.',
    description: 'Exclusive: Statically typed BEAM. For architects who demand total safety in large distributed clusters.',
    color: 'bg-[#ffaff3]',
    accent: 'text-[#ffaff3]',
    icon: '✨',
    docs: 'https://gleam.run/',
    isSatellite: true,
    isPremium: true
  },
  {
    id: LanguageType.NIM,
    name: 'Nim',
    tagline: 'Efficient, expressive, elegant.',
    description: 'A statically typed compiled systems programming language that combines speed with expression.',
    color: 'bg-[#FFE953]',
    accent: 'text-[#FFE953]',
    icon: '👑',
    docs: 'https://nim-lang.org/learn.html',
    isComingSoon: true
  }
];

export const SUGGESTIONS: Record<string, string[]> = {
  [LanguageType.ZIG]: [
    "Jelaskan tentang memory management di Zig",
    "Bagaimana cara kerja comptime?",
    "Apa perbedaan error sets dengan exception?",
    "Arsitektur Data-Oriented Design di Zig"
  ],
  [LanguageType.RUST]: [
    "Bagaimana Borrow Checker menjamin safety?",
    "Jelaskan konsep Lifetimes",
    "Optimasi memori dengan Smart Pointers"
  ],
  [LanguageType.ELIXIR]: [
    "Bagaimana Actor Model bekerja di BEAM?",
    "Jelaskan Supervision Trees",
    "Implementasi GenServer untuk state management"
  ],
  [LanguageType.MOJO]: [
    "Bagaimana Mojo mengoptimalkan kernel GPU?",
    "Perbedaan model memori Mojo vs Rust",
    "Integrasi Python ecosystem di Mojo"
  ],
  [LanguageType.CARBON]: [
    "Bagaimana strategi interoperabilitas Carbon dengan C++?",
    "Jelaskan tentang Generics di Carbon",
    "Mengapa Carbon disebut sebagai 'successor' bukan 'alternative'?"
  ],
  "General": [
    "Apa itu arsitektur BCI (Brain-Computer Interface)?",
    "Bagaimana menangani latency <10ms untuk AR/VR?",
    "Prinsip Deterministic Computation dalam XR"
  ]
};
