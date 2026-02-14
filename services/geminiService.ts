
import { GoogleGenAI, Type } from "@google/genai";
import { LanguageType, RoadmapStep } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Static fallbacks for core languages to prevent breakages during quota exhaustion
const STATIC_ROADMAPS: Record<string, RoadmapStep[]> = {
  [LanguageType.ZIG]: [
    {
      title: "Foundational Memory Control",
      description: "Understanding manual memory management without hidden allocations.",
      concepts: [
        { name: "Manual Allocation", definition: "Explicitly requesting and freeing memory using allocators for total control." },
        { name: "Defer Statement", definition: "Ensuring resource cleanup happens at the end of the current scope." },
        { name: "Error Sets", definition: "Strict, typed error handling that forces developers to handle failures." }
      ],
      relatedConcepts: [
        { name: "Comptime", definition: "Running code at compile-time for zero-overhead generics and logic." }
      ]
    },
    {
      title: "The Comptime Paradigm",
      description: "Using Zig's most powerful feature to eliminate runtime overhead.",
      concepts: [
        { name: "Type Functions", definition: "Functions that return types, enabling powerful generic programming." },
        { name: "Inline Loops", definition: "Unrolling loops at compile-time for maximum execution speed." }
      ],
      relatedConcepts: [
        { name: "Reflection", definition: "Inspecting types at compile-time to generate optimized code." }
      ]
    }
  ],
  [LanguageType.RUST]: [
    {
      title: "The Ownership Model",
      description: "The core safety guarantee of Rust without a garbage collector.",
      concepts: [
        { name: "Borrow Checker", definition: "Compile-time validation of memory access rules to prevent data races." },
        { name: "Lifetimes", definition: "Annotation that helps the compiler verify how long references are valid." }
      ],
      relatedConcepts: [
        { name: "RAII", definition: "Resource Acquisition Is Initialization: automatic resource management pattern." }
      ]
    },
    {
      title: "Zero-Cost Abstractions",
      description: "High-level features that compile down to efficient machine code.",
      concepts: [
        { name: "Traits", definition: "Defining shared behavior across different types like interfaces." },
        { name: "Pattern Matching", definition: "Powerful control flow for destructuring data safely." }
      ],
      relatedConcepts: [
        { name: "Generics", definition: "Writing code that works for multiple types with no runtime cost." }
      ]
    }
  ],
  [LanguageType.ELIXIR]: [
    {
      title: "The Actor Model & BEAM",
      description: "Scalability through lightweight, isolated processes.",
      concepts: [
        { name: "Processes", definition: "Extremely lightweight execution units managed by the Erlang VM." },
        { name: "Message Passing", definition: "Communication between processes via asynchronous mailboxes." }
      ],
      relatedConcepts: [
        { name: "Functional Purity", definition: "Immutability and side-effect-free logic for predictable systems." }
      ]
    },
    {
      title: "Fault Tolerance (OTP)",
      description: "Building systems that can heal themselves from errors.",
      concepts: [
        { name: "Supervision Trees", definition: "Hierarchical process management that restarts failing workers." },
        { name: "GenServer", definition: "Standard behavior for implementing client-server relationship in processes." }
      ],
      relatedConcepts: [
        { name: "Hot Reloading", definition: "Updating production code without stopping the running system." }
      ]
    }
  ]
};

// Persistent cache to minimize API calls
const getCachedRoadmap = (language: string): RoadmapStep[] | null => {
  try {
    const cached = localStorage.getItem(`roadmap_${language}`);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.error("Cache retrieval failed", e);
  }
  return null;
};

const setCachedRoadmap = (language: string, data: RoadmapStep[]) => {
  try {
    localStorage.setItem(`roadmap_${language}`, JSON.stringify(data));
  } catch (e) {
    console.error("Cache storage failed", e);
  }
};

export const getGeminiResponse = async (prompt: string, context: LanguageType | 'General') => {
  const ai = getAI();
  const model = 'gemini-3-pro-preview';

  const systemInstruction = `Anda adalah "Architectural Mentor" tingkat dunia yang mengkhususkan diri pada Zig, Elixir, dan Rust. 
    Konteks saat ini: ${context}. 
    
    FILOSOFI ANDA:
    1. Anda percaya bahwa teknologi baru seperti Zig/Rust/Elixir tidak untuk mengganti bahasa lama secara brutal, melainkan untuk merevolusi arsitektur secara bertahap.
    2. Anda sangat paham tentang Edge Web Technologies, Spatial Computing (AR/VR), dan Brain-Computer Interface (BCI).
    3. Anda menekankan pada presisi runtime, efisiensi compiler, dan keamanan memori sebagai fondasi masa depan.
    4. Berikan jawaban yang "wise", edukatif namun tetap teknis mendalam.
    
    Tujuan Anda adalah membantu pengguna memahami "Mengapa" (arsitektur) di balik "Bagaimana" (sintaks).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Mohon maaf, blueprint arsitektur tidak dapat dihasilkan saat ini.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const getRoadmap = async (language: LanguageType): Promise<RoadmapStep[]> => {
  // 1. Check persistent cache
  const cached = getCachedRoadmap(language);
  if (cached) return cached;

  const ai = getAI();
  const model = 'gemini-3-flash-preview';

  const prompt = `Hasilkan peta jalan (roadmap) pembelajaran terstruktur 5 langkah untuk bahasa ${language}. 
    Pastikan setiap langkah mencakup:
    - Judul
    - Deskripsi filosofis tentang arsitektur sistem
    - 3-4 Konsep kunci utama (Sertakan nama dan definisi singkat maksimal 15 kata)
    - 3-4 "Related Concepts" atau paradigma tambahan (Sertakan nama dan definisi singkat maksimal 15 kata).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              concepts: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    definition: { type: Type.STRING }
                  },
                  required: ["name", "definition"]
                } 
              },
              relatedConcepts: {
                type: Type.ARRAY,
                items: { 
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    definition: { type: Type.STRING }
                  },
                  required: ["name", "definition"]
                }
              }
            },
            required: ["title", "description", "concepts", "relatedConcepts"]
          }
        }
      }
    });

    const roadmapData = JSON.parse(response.text || "[]");
    
    // 2. Update persistent cache if successful
    if (roadmapData && roadmapData.length > 0) {
      setCachedRoadmap(language, roadmapData);
      return roadmapData;
    }
    
    // Fallback to static if empty JSON
    return STATIC_ROADMAPS[language] || [];
  } catch (error: any) {
    console.warn("Roadmap Generation failed, attempting fallback...", error);
    
    // 3. Fallback logic: check for static data if API fails (e.g. 429 quota exhausted)
    if (STATIC_ROADMAPS[language]) {
      console.info(`Using static fallback roadmap for ${language}`);
      return STATIC_ROADMAPS[language];
    }

    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      throw new Error("QUOTA_EXCEEDED");
    }
    return [];
  }
};

export const getConceptCodeExample = async (language: LanguageType, concept: string) => {
  const ai = getAI();
  const model = 'gemini-3-flash-preview';

  const prompt = `Berikan contoh kode yang idiomatik dan penjelasan arsitektural singkat (2-3 kalimat) untuk konsep: "${concept}" dalam bahasa ${language}. 
    Gunakan Markdown yang bersih dengan syntax highlighting.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.4,
      },
    });
    return response.text || "Dokumentasi teknis tidak ditemukan.";
  } catch (error: any) {
    console.error("Concept Code Fetch Error:", error);
    if (error?.message?.includes('429')) {
      return "Sistem sedang sibuk (Quota Exceeded). Silakan coba lagi nanti.";
    }
    return "Gagal memuat blueprint kode.";
  }
};