
import React from 'react';
import { LanguageType, LanguageInfo } from './types';

export const LANGUAGES: LanguageInfo[] = [
  {
    id: LanguageType.ZIG,
    name: 'Zig',
    tagline: 'Simple, fast, and safe.',
    description: 'A general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software.',
    color: 'bg-[#F7A41D]',
    accent: 'text-[#F7A41D]',
    icon: '⚡',
    docs: 'https://ziglang.org/learn/'
  },
  {
    id: LanguageType.ELIXIR,
    name: 'Elixir',
    tagline: 'Productive, concurrent, and scalable.',
    description: 'A dynamic, functional language for building scalable and maintainable applications using the Erlang VM (BEAM).',
    color: 'bg-[#4e2a8e]',
    accent: 'text-[#a45dfc]',
    icon: '💧',
    docs: 'https://elixir-lang.org/learning.html'
  },
  {
    id: LanguageType.RUST,
    name: 'Rust',
    tagline: 'Performance, reliability, and productivity.',
    description: 'A language empowering everyone to build reliable and efficient software with guaranteed memory safety.',
    color: 'bg-[#DEA584]',
    accent: 'text-[#DEA584]',
    icon: '🦀',
    docs: 'https://www.rust-lang.org/learn'
  },
  {
    id: LanguageType.NIM,
    name: 'Nim',
    tagline: 'Efficient, expressive, elegant.',
    description: 'A statically typed compiled systems programming language that combines the speed of C with the expressiveness of Python.',
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
    "Contoh penggunaan defer yang tepat",
    "Cara integrasi C dengan Zig",
    "Arsitektur Data-Oriented Design di Zig"
  ],
  [LanguageType.RUST]: [
    "Bagaimana Borrow Checker menjamin safety?",
    "Jelaskan konsep Lifetimes",
    "Kapan harus menggunakan Arc dan Mutex?",
    "Apa itu Zero-cost abstractions?",
    "Perbedaan antara Trait dan Interface",
    "Optimasi memori dengan Smart Pointers"
  ],
  [LanguageType.ELIXIR]: [
    "Bagaimana Actor Model bekerja di BEAM?",
    "Jelaskan Supervision Trees",
    "Apa keuntungan Pattern Matching?",
    "Cara kerja Hot Code Swapping",
    "Implementasi GenServer untuk state management",
    "Skalabilitas terdistribusi dengan Elixir"
  ],
  "General": [
    "Apa itu arsitektur Microservices?",
    "Cara mengoptimalkan performa API",
    "Prinsip SOLID dalam pengembangan sistem",
    "Strategi caching yang efektif",
    "Membangun sistem yang fault-tolerant",
    "Keuntungan sistem terdistribusi"
  ]
};
