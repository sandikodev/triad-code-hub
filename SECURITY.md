# Kebijakan Keamanan (Security Policy)

## Keamanan API Key

Aplikasi ini berinteraksi dengan **Google Gemini API**. Kami sangat menekankan poin-poin berikut:

1. **JANGAN PERNAH** melakukan commit file `.env` atau mengekspos `process.env.API_KEY` ke dalam repositori publik.
2. Gunakan **GitHub Secrets** untuk pengelolaan API Key saat melakukan deployment (misalnya ke GitHub Pages atau Vercel).
3. Jika Anda menemukan API Key yang bocor di dalam history git, segera cabut (*revoke*) key tersebut di [Google AI Studio](https://aistudio.google.com/).

## Melaporkan Kerentanan

Jika Anda menemukan celah keamanan dalam aplikasi ini, mohon jangan melaporkannya melalui Issue publik. Kirimkan laporan Anda melalui email ke: **keamanan@triadhub.io** (atau gunakan fitur *Private Vulnerability Reporting* di GitHub jika tersedia).

Kami akan berusaha merespons dalam waktu 48 jam dan bekerja sama dengan Anda untuk memperbaiki masalah tersebut sebelum dipublikasikan secara umum.

## Versi yang Didukung

| Versi | Didukung |
| --- | --- |
| > 1.0.0 | ✅ Yes |
| < 1.0.0 | ❌ No |

---

Terima kasih telah membantu menjaga keamanan ekosistem Triad Hub.
