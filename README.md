# Portofolio Software Developer & Konsultan IT (Supabase + Vercel)

Aplikasi web portofolio modern berarsitektur **Zero-Build** (Vanilla HTML5, Tailwind CSS via CDN, Lucide Icons, dan Supabase JS SDK v2) yang siap di-deploy ke **Vercel** dengan backend **Supabase** (PostgreSQL Database, Authentication, dan Storage).

---

## Struktur File

```text
.
├── index.html          # Halaman publik katalog portofolio (Filter, Search, Modal Studi Kasus, Toggle Tema)
├── admin.html          # Dashboard Admin terproteksi Supabase Auth + CRUD & Upload Gambar
├── config.js           # Konfigurasi SUPABASE_URL, SUPABASE_ANON_KEY, dan helper deteksi setup
├── supabase_setup.sql  # Script SQL idempotent (Tabel, RLS Policy, Storage Bucket, & Seed Data)
├── DESIGN.md           # Arah desain, tipografi, palet warna WCAG AA, dan dial antislop
├── vercel.json         # Konfigurasi Clean URLs Vercel (/admin -> admin.html)
├── README.md           # Dokumentasi setup & deployment
└── anti-slop/          # Laporan audit & tindak lanjut kualitas antislop
```

---

## 1. Menjalankan Script SQL di Supabase

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com/dashboard).
2. Buka menu **SQL Editor** di sidebar kiri, lalu klik **New Query**.
3. Salin seluruh isi file `supabase_setup.sql` dan tempelkan ke editor.
4. Klik **Run** (atau tekan `Ctrl + Enter`).
   - Script ini bersifat **idempotent** (aman dijalankan berulang kali) dan otomatis membuat:
     - Tabel `public.projects` beserta index.
     - Row Level Security (RLS) Policy: publik (`anon`) hanya bisa `SELECT`, sedangkan admin (`authenticated`) bisa `INSERT`, `UPDATE`, dan `DELETE`.
     - Storage Bucket publik bernama `portfolio-images` beserta RLS Policy upload gambar.
     - 4 data proyek awal (ERP Manufaktur CI4, PWA Absensi & Payroll, POS Offline-First Flutter, dan Infrastruktur & Migrasi POS Perhotelan).

---

## 2. Membuat User Admin Pertama di Supabase Auth

Karena halaman `admin.html` diproteksi menggunakan **Supabase Auth (Email & Password)**, buat akun administrator terlebih dahulu:

1. Pada Dashboard Supabase, buka menu **Authentication** -> **Users**.
2. Klik tombol **Add user** -> **Create new user**.
3. Masukkan **Email** dan **Password** admin Anda.
4. Centang opsi **Auto Confirm User** agar akun langsung aktif tanpa perlu verifikasi email.
5. Klik **Create user**.

---

## 3. Mengisi Kredensial di `config.js`

1. Di Dashboard Supabase, buka menu **Project Settings** (ikon gerigi) -> **API**.
2. Salin nilai **Project URL** dan **Project API Keys (`anon` `public`)**.
3. Buka file `config.js` dan ganti nilai placeholder berikut:

```javascript
const SUPABASE_URL = 'https://xxxx-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

> **Catatan:** Anda juga dapat mengubah nomor WhatsApp dan alamat email konsultasi pada objek `CONSULTANT_PROFILE` di dalam file `config.js`. Selama kredensial masih berupa placeholder, aplikasi tetap berjalan menggunakan **Mode Pratinjau** beserta banner panduan setup di bagian atas halaman.

---

## 4. Menjalankan Secara Lokal

Karena aplikasi ini zero-build, Anda dapat menjalankannya dengan web server statis apa pun:

```bash
# Menggunakan npx serve
npx serve .

# Atau menggunakan Python
python -m http.server 5500
```

Buka di browser:
- Halaman Publik: `http://localhost:5500`
- Dashboard Admin: `http://localhost:5500/admin.html`

---

## 5. Deploy ke Vercel

### Opsi A: Menggunakan Vercel CLI (Instan)

```bash
# Install Vercel CLI jika belum ada
npm i -g vercel

# Jalankan deploy dari direktori proyek
vercel

# Untuk deploy langsung ke Production
vercel --prod
```

### Opsi B: Menggunakan Integrasi GitHub / GitLab

1. Push seluruh file ke repository GitHub/GitLab Anda.
2. Buka [Vercel Dashboard](https://vercel.com/new) dan klik **Import Project**.
3. Pilih repository ini, biarkan **Framework Preset** pada `Other` (tidak perlu Build Command), lalu klik **Deploy**.
4. Berkat konfigurasi `vercel.json`, URL `/admin` akan otomatis mengarah ke `admin.html`.

