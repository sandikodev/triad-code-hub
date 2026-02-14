
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
    id: LanguageType.MOJO,
    name: 'Mojo',
    tagline: 'Python syntax, C performance.',
    description: 'The future of AI infrastructure. Combining the usability of Python with the performance of C++ and Rust.',
    color: 'bg-[#FF4500]',
    accent: 'text-[#FF4500]',
    icon: '🔥',
    docs: 'https://docs.modular.com/mojo/',
    isSatellite: true
  },
  {
    id: LanguageType.GLEAM,
    name: 'Gleam',
    tagline: 'A friendly, type-safe BEAM language.',
    description: 'A statically typed language for the Erlang VM, built for performance and maintainability in distributed systems.',
    color: 'bg-[#ffaff3]',
    accent: 'text-[#ffaff3]',
    icon: '✨',
    docs: 'https://gleam.run/',
    isSatellite: true
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
  "General": [
    "Apa itu arsitektur BCI (Brain-Computer Interface)?",
    "Bagaimana menangani latency <10ms untuk AR/VR?",
    "Prinsip Deterministic Computation dalam XR"
  ]
};
