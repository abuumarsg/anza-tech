# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Pengguna Utama (Klien Bisnis & Operasional B2B)**: Pemilik bisnis, direktur operasional, dan manajemen perusahaan di sektor manufaktur, HRD, retail/F&B, dan perhotelan yang sedang mencari konsultan rekayasa perangkat lunak atau infrastruktur IT untuk membangun sistem baru, mengintegrasikan alur kerja, atau melakukan audit server/jaringan.
- **Pengguna Internal (Administrator Portofolio)**: Konsultan/developer pemilik portofolio yang mengelola katalog studi kasus, memperbarui tautan demo/repositori, dan mengunggah tangkapan layar aplikasi melalui dashboard `/admin` (`admin.html`).

## Product Purpose

- Menyajikan katalog aplikasi bisnis dan studi kasus implementasi IT secara terstruktur agar calon klien korporat maupun operasional dapat langsung menilai kesesuaian solusi dengan masalah lapangan mereka.
- Mengonversi kunjungan evaluasi menjadi diskusi konsultasi nyata melalui saluran komunikasi langsung (WhatsApp dan Email) serta peninjauan detail studi kasus dan live demo.
- Menyediakan konsol manajemen mandiri (`admin.html`) yang terhubung ke Supabase (Database, Auth, Storage) maupun mode pratinjau lokal agar katalog proyek selalu mutakhir tanpa proses build ulang.

## Positioning

- Portofolio merangkap katalog solusi rekayasa sistem operasional lapangan yang menggabungkan pengembangan perangkat lunak kustom (Web ERP Manufaktur, Mobile/PWA HRD, Desktop/POS Offline-First) dengan keahlian infrastruktur server dan jaringan on-premise (Windows Server, VLAN MikroTik, replikasi database) dalam satu praktik konsultasi terpadu.

## Operating Context

- **Alur Evaluasi Klien**: Pengunjung membuka halaman publik (`index.html`), memfilter proyek berdasarkan bidang implementasi (`Semua`, `Web App`, `Mobile & PWA`, `Desktop & POS`, `IT Infrastructure`) atau mencari teknologi/modul spesifik, membaca ringkasan serta modal detail studi kasus, lalu menghubungi konsultan via WhatsApp atau Email.
- **Alur Administrasi Katalog**: Administrator masuk melalui Supabase Auth di `admin.html` (atau menggunakan Mode Pratinjau Lokal saat kredensial belum diisi), memantau statistik ringkas, mengunggah gambar ke bucket `portfolio-images`, serta menambah, mengubah, atau menghapus data proyek pada tabel `projects`.

## Capabilities and Constraints

- **Arsitektur Zero-Build**: Dibangun menggunakan Vanilla HTML5 (`index.html`, `admin.html`), Tailwind CSS via CDN, Lucide Icons, dan Supabase JS SDK v2 (`@supabase/supabase-js`) dengan konfigurasi terpusat di `config.js`.
- **Backend & Penyimpanan**: Menggunakan Supabase PostgreSQL (tabel `projects` dengan Row Level Security), Supabase Authentication (Email & Password), dan Supabase Storage (bucket publik `portfolio-images`), dilengkapi skema idempotent di `supabase_setup.sql`.
- **Ketahanan Pratinjau Lokal (Graceful Fallback)**: Jika `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di `config.js` masih berupa placeholder, aplikasi otomatis menampilkan banner instruksi setup dan menjalankan katalog serta simulasi CRUD menggunakan data lokal (`localStorage` + `FALLBACK_PROJECTS`) tanpa halaman kosong atau error runtime.
- **Target Deployment**: Siap di-deploy secara instan ke Vercel dengan dukungan clean URLs (`/admin` mengarah ke `admin.html`) melalui `vercel.json`.

## Brand Commitments

- **Identitas Kerja**: Menggunakan nama kerja `ANZA Tech` (`Jasa Pembuatan Aplikasi Usaha & Solusi IT`) sebagai identitas utama katalog portofolio, dengan detail nomor WhatsApp dan alamat email di `config.js` yang dapat disesuaikan kapan saja oleh pemilik portofolio.
- **Nada Komunikasi**: Ramah, jelas, dan mudah dipahami oleh orang awam maupun pemilik usaha (manufaktur, HRD, toko/restoran, perhotelan), tanpa istilah teknis yang membingungkan dan bebas dari klaim metrik tanpa sumber.

## Evidence on Hand

- **Fondasi 4 Studi Kasus Terkonfirmasi** (tersedia di `config.js` dan seed `supabase_setup.sql`):
  1. *Sistem Manajemen Manufaktur & ERP Terpadu* (`Web App`: CodeIgniter 4, MySQL, Bootstrap 5, REST API)
  2. *PWA Absensi Online Geotagging & Otomasi Payroll* (`Mobile & PWA`: PHP, PWA, MySQL, JavaScript, Geolocation API)
  3. *Aplikasi Kasir (POS) Offline-First Multi-Outlet* (`Desktop & POS`: Flutter, SQLite, MySQL, Dart, ESC/POS Thermal)
  4. *Setup Infrastruktur Server & Migrasi POS Perhotelan* (`IT Infrastructure`: Windows Server, MikroTik, VLAN, MySQL Replication, POS Migration)
- **Batasan Bukti (Anti-Fabrication)**: Belum ada logo klien eksternal, testimoni kutipan pelanggan, atau klaim persentase peningkatan performa yang terverifikasi; pekerjaan selanjutnya dilarang mengarang kutipan testimoni, angka klaim fiktif, atau logo perusahaan pihak ketiga.

## Product Principles

1. **Kejelasan Masalah & Solusi Operasional**: Setiap proyek harus langsung menjelaskan masalah operasional nyata yang diselesaikan (produksi pabrik, kasir saat internet putus, validasi presensi cabang, segmentasi jaringan hotel) beserta tumpukan teknologinya.
2. **Akses Instan ke Konsultasi**: Jalur komunikasi menuju diskusi teknis (WhatsApp dan Email) harus selalu mudah dijangkau dari header, modal studi kasus, maupun bagian bawah halaman.
3. **Kejujuran Bukti & Data**: Gunakan hanya spesifikasi modul nyata dan pertahankan penanda eksplisit (`[LOGO]`, `[REAL DATA]`, `[PLACEHOLDER VISUAL]`) untuk aset yang belum diganti oleh pemilik portofolio.
4. **Kemandirian Operasional Tanpa Build**: Seluruh perubahan halaman publik dan admin harus tetap berjalan langsung di browser maupun Vercel tanpa ketergantungan bundler, serta menjaga sinkronisasi penuh antara Supabase dan fallback lokal.

## Accessibility & Inclusion

- Memenuhi standar kontras teks dan batas kontrol WCAG AA baik pada mode terang maupun mode gelap.
- Seluruh kontrol interaktif dapat dioperasikan dengan keyboard (`:focus-visible`, penutupan modal dengan `Escape`, pintasan pencarian `/`), memiliki ukuran area sentuh minimum `44px` di perangkat mobile, dan menghormati preferensi `prefers-reduced-motion: reduce`.

