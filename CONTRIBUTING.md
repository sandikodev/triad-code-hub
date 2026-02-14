# 🤝 Panduan Kontribusi Triad Code Hub

Terima kasih telah tertarik untuk membangun masa depan arsitektur sistem bersama kami! **Triad Code Hub** adalah proyek berbasis komunitas. Kami sangat menghargai setiap kontribusi, mulai dari perbaikan typo hingga porting framework besar-besaran.

## 🏗️ Cara Berkontribusi

### 1. Persiapan Lingkungan
Kami merekomendasikan penggunaan **Bun** atau **pnpm** untuk manajemen paket yang lebih cepat dan deterministik.

```bash
# Clone repository
git clone https://github.com/username/triad-code-hub.git
cd triad-code-hub

# Instalasi dependensi
bun install 
# atau
pnpm install
```

### 2. Alur Kerja (Workflow)
1. **Cari Issue:** Lihat daftar [Issues](https://github.com/username/triad-code-hub/issues). Jika ingin menambahkan fitur baru, silakan buka issue baru terlebih dahulu untuk diskusi.
2. **Buat Branch:** Gunakan penamaan yang deskriptif:
   - `feat/nama-fitur`
   - `fix/nama-bug`
   - `port/sveltekit-implementation`
3. **Commit:** Gunakan [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
   - `feat: add nim roadmap module`
   - `fix: resolve hydration error on setup page`

### 3. Panduan Porting (SvelteKit / Astro / Next.js)
Kami sangat mendorong komunitas untuk mem-porting basis kode React ini ke framework lain. Jika Anda melakukannya:
- Pastikan logika `geminiService.ts` tetap terjaga.
- Pertahankan estetika "Ultra-Dark Premium".
- Gunakan struktur folder yang idiomatik bagi framework tujuan.
- Berikan dokumentasi spesifik untuk framework tersebut di folder hasil porting.

## 🎨 Standar Kode
- **TypeScript:** Gunakan tipe data yang ketat. Hindari `any`.
- **Tailwind CSS:** Gunakan *utility classes* secara efisien. Manfaatkan *group-hover* dan *animate* untuk interaktivitas premium.
- **AI Ethics:** Jangan memodifikasi *System Instruction* yang dapat mengurangi kualitas jawaban mentor AI.

## 🧪 Pengujian
Pastikan aplikasi berjalan lancar di lokal sebelum mengirimkan Pull Request:
```bash
bun dev
```

---

Dibuat dengan ⚡ untuk kemajuan sistem masa depan. Bersama-sama, kita bangun blueprint yang lebih baik!
