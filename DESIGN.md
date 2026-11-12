# DESIGN.md: Arah Desain & Identitas Visual (Modern Clean Product Showcase)

## 1. Design Read & Tiga Dial

> Reading this as: modern clean software product & IT solutions showcase for manufacturing, HR, retail POS, and hospitality clients, in a high-clarity light slate product catalog style, dial ENERGY 2 / RHYTHM 3 / MOTION 1.

- **Dial**: `ENERGY 2 / RHYTHM 3 / MOTION 1`
- **ENERGY 2 (Balanced)**: Menggabungkan permukaan putih bersih (`#FFFFFF`) di atas kanvas *Cool Alabaster* (`#F8FAFC`) dengan aksen biru produk (`#1D4ED8`), tipografi humanis `Source Sans 3` yang ramah dibaca orang awam, dan indeks teknis `IBM Plex Mono` seperlunya.
- **RHYTHM 3 (Varied / Asymmetric)**:
  1. *Compact Hero + Inline Filter & Search (7:5 Split)*: Pernyataan nilai utama di sisi kiri bersebelahan langsung dengan tombol filter kategori dan kolom pencarian instan di sisi kanan.
  2. *Flagship Project Spotlight (7:5 Split) + 3-Column Catalog Grid*: Proyek utama ditampilkan sebagai kartu sorotan lebar penuh dengan panel pratinjau modul gelap (`#0F172A`) di sisi kiri dan rincian studi kasus di sisi kanan, diikuti oleh grid 3 kolom untuk proyek lainnya.
  3. *Cakupan Layanan & Konsultasi Langsung*: Ringkasan cakupan teknis dan saluran konsultasi WhatsApp/Email di bagian bawah halaman.
- **MOTION 1 (Calm / Functional Only)**: Transisi warna dan batas halus saat `:hover` dan `:focus-visible`, tanpa animasi berulang tanpa henti, serta mendukung `@media (prefers-reduced-motion: reduce)`.

## 2. Alasan Setiap Keputusan Visual (R-31)

- **Mengapa palet warna ini (Cool Alabaster `#F8FAFC`, Pure White `#FFFFFF`, Deep Slate `#0F172A`, Royal Blue `#1D4ED8`)**: Menampilkan katalog aplikasi bisnis dengan kejernihan tinggi seperti dokumentasi produk SaaS modern, sekaligus tetap menyediakan mode pendamping *Dark Slate* (`#090D16`) melalui tombol pengalih tema (R-21, R-34).
- **Mengapa hierarki border-radius diperhalus (`16px` kartu utama, `10px` tombol & input, `6px` badge teknologi)**: Sesuai permintaan pengguna agar tombol tidak terlalu kotak dan terasa lebih tumpul/nyaman diklik, sekaligus menjaga hierarki radius konsentris (`outer >= inner`, R-11).
- **Mengapa kombinasi 1 Kartu Spotlight + Grid 3 Kolom**: Memungkinkan pengunjung langsung melihat kedalaman sistem unggulan (ERP Manufaktur) pada pandangan pertama sekaligus memindai aplikasi lainnya (PWA Absensi, POS Offline-First, Infrastruktur Hotel) secara ringkas.

## 3. Verifikasi Kontras Warna (WCAG AA: R-25)

Seluruh pasangan warna telah diverifikasi menggunakan `contrast-check.py`:

### Mode Utama: Modern Clean Showcase (Light)
- Teks utama `#0F172A` di atas latar `#F8FAFC`: **17.06:1** dan di atas `#FFFFFF`: **17.85:1** (PASS AA Normal & Large)
- Teks sekunder `#475569` di atas latar `#F8FAFC`: **7.24:1** dan di atas `#FFFFFF`: **7.58:1** (PASS AA Normal & Large)
- Aksen utama Royal Blue `#1D4ED8` di atas `#F8FAFC`: **6.41:1** dan di atas `#FFFFFF`: **6.70:1** (PASS AA Normal & Large)
- Teks tombol `#FFFFFF` di atas tombol `#1D4ED8`: **6.70:1** (PASS AA Normal & Large)
- Status hijau `#047857` di atas `#ECFDF5`: **5.21:1** (PASS AA Normal & Large)
- Label Featured `#B45309` di atas `#FFFFFF`: **5.02:1** (PASS AA Normal & Large)
- Batas kontrol interaktif `#64748B` di atas `#F8FAFC` (**4.55:1**) dan `#FFFFFF` (**4.76:1**): **PASS** Non-Text Contrast (>= 3.0:1)

### Panel Pratinjau Modul & Mode Pendamping (Dark `#090D16` / `#0F172A`)
- Teks utama `#F8FAFC` di atas `#0F172A`: **17.06:1** dan di atas `#090D16`: **18.57:1** (PASS AA Normal & Large)
- Teks sekunder `#94A3B8` di atas `#0F172A`: **6.96:1** dan di atas `#111827`: **6.92:1** (PASS AA Normal & Large)
- Aksen biru terang `#60A5FA` di atas `#090D16`: **7.64:1** dan di atas `#111827`: **6.98:1** (PASS AA Normal & Large)
- Batas kontrol interaktif `#64748B` di atas `#090D16` (**4.08:1**) dan `#111827` (**3.73:1**): **PASS** Non-Text Contrast (>= 3.0:1)
