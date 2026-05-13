# 🌟 PetualangPintar v0.2

> Game edukasi interaktif untuk anak usia 5–10 tahun. Belajar sambil bermain!

## ✨ Fitur Baru v0.2

| Fitur | Status | Keterangan |
|-------|--------|-----------|
| 🤖 AI-Generated Questions | ✅ | Pertanyaan dinamis via Anthropic API (Claude Sonnet) |
| 🎭 Sprite Animations | ✅ | 8 karakter dengan animasi walking, bounce, dan idle |
| 🏆 Leaderboard + localStorage | ✅ | Progress & skor tersimpan di browser, top 10 pemain |
| 🎵 Audio Engine | ✅ | Musik latar generatif (Web Audio API) + sfx untuk tiap event |

## 🚀 Deploy ke GitHub Pages

### Langkah 1: Buat Repository
```bash
git init
git add .
git commit -m "feat: PetualangPintar v0.2"
git branch -M main
git remote add origin https://github.com/USERNAME/petualang-pintar.git
git push -u origin main
```

### Langkah 2: Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Klik **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **root**
5. Klik **Save**

🎉 Game akan tersedia di: `https://USERNAME.github.io/petualang-pintar`

---

## 📁 Struktur Project

```
petualang-pintar/
├── index.html          # Entry point & audio engine
├── css/
│   └── style.css       # Full stylesheet (playful-cartoon theme)
├── js/
│   ├── data.js         # Question bank (200+), levels config, characters
│   └── game.js         # Game engine: mechanics, AI, leaderboard, audio
└── README.md
```

## 🎮 Cara Bermain

1. **Setup Karakter** → Pilih nama, karakter (8 pilihan), dan warna favorit
2. **Setup AI** (opsional) → Masukkan Anthropic API Key untuk pertanyaan dinamis
3. **Pilih Level** → 10 level dengan tema berbeda, terkunci secara progresif
4. **Main!** → Gerakkan karakter ke checkpoint, jawab pertanyaan, kumpulkan bintang

## 🔑 Setup API Key (Opsional)

Untuk mengaktifkan pertanyaan yang di-generate AI:
1. Daftar di [console.anthropic.com](https://console.anthropic.com)
2. Buat API Key baru
3. Masukkan saat setup karakter di game
4. Key disimpan di `localStorage` browser, tidak dikirim ke server mana pun

> **Tanpa API Key:** Game tetap bisa dimainkan penuh dengan 200+ pertanyaan built-in

## 📚 Kurikulum & Topik

Dikurasi berdasarkan rekomendasi dokter perkembangan anak dan standar kognitif Piaget:

| Level | Tema | Usia Target | Kesulitan |
|-------|------|------------|-----------|
| 1 | Dunia Hewan | 5-6 thn | 🔥 |
| 2 | Makanan Bergizi | 5-6 thn | 🔥 |
| 3 | Jelajah Nusantara | 5-7 thn | 🔥 |
| 4 | Dunia Dinosaurus | 7-8 thn | 🔥🔥 |
| 5 | Angkasa Raya | 7-8 thn | 🔥🔥 |
| 6 | Geografi Dunia | 7-9 thn | 🔥🔥 |
| 7 | Tubuh Manusia | 7-9 thn | 🔥🔥 |
| 8 | Seni & Budaya | 8-9 thn | 🔥🔥 |
| 9 | Matematika Seru | 9-10 thn | 🔥🔥🔥 |
| 10 | Super Challenge | 9-10 thn | 🔥🔥🔥 |

## 🛠️ Tech Stack

- **Pure HTML/CSS/JS** — zero dependencies, zero build step
- **Web Audio API** — musik latar generatif & sound effects
- **Anthropic API** — `claude-sonnet-4-20250514` untuk pertanyaan dinamis
- **localStorage** — progress, leaderboard, settings

## 🗺️ Roadmap v0.3

- [ ] PWA support (offline play)
- [ ] Parent dashboard (analytics belajar anak)  
- [ ] Multi-bahasa (EN/ID)
- [ ] Sprite sheet animation (CSS keyframes per karakter)
- [ ] Achievement badges system
- [ ] Timer challenge mode

---

*Dibuat dengan ❤️ untuk mendukung tumbuh kembang anak Indonesia*
