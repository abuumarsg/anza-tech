-- Jalankan script idempotent ini di SQL Editor Supabase untuk menyiapkan tabel, RLS, bucket, dan data awal.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    tech_stack text[] NOT NULL DEFAULT '{}'::text[],
    image_url text,
    image_urls text[] NOT NULL DEFAULT '{}'::text[],
    demo_url text,
    repo_url text,
    is_featured boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.projects
    ADD COLUMN IF NOT EXISTS image_urls text[] NOT NULL DEFAULT '{}'::text[];

CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_featured_created ON public.projects (is_featured DESC, created_at DESC);

GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public dapat melihat seluruh proyek" ON public.projects;
DROP POLICY IF EXISTS "Admin authenticated dapat menambah proyek" ON public.projects;
DROP POLICY IF EXISTS "Admin authenticated dapat mengubah proyek" ON public.projects;
DROP POLICY IF EXISTS "Admin authenticated dapat menghapus proyek" ON public.projects;

CREATE POLICY "Public dapat melihat seluruh proyek"
    ON public.projects
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin authenticated dapat menambah proyek"
    ON public.projects
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin authenticated dapat mengubah proyek"
    ON public.projects
    FOR UPDATE
    TO authenticated
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin authenticated dapat menghapus proyek"
    ON public.projects
    FOR DELETE
    TO authenticated
    USING (auth.role() = 'authenticated');

-- Bucket publik untuk menyimpan tangkapan layar proyek (maksimal 5MB per file).
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'portfolio-images',
    'portfolio-images',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public dapat melihat gambar portofolio" ON storage.objects;
DROP POLICY IF EXISTS "Admin authenticated dapat mengunggah gambar portofolio" ON storage.objects;
DROP POLICY IF EXISTS "Admin authenticated dapat memperbarui gambar portofolio" ON storage.objects;
DROP POLICY IF EXISTS "Admin authenticated dapat menghapus gambar portofolio" ON storage.objects;

CREATE POLICY "Public dapat melihat gambar portofolio"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin authenticated dapat mengunggah gambar portofolio"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'portfolio-images'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Admin authenticated dapat memperbarui gambar portofolio"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'portfolio-images'
        AND auth.role() = 'authenticated'
    )
    WITH CHECK (
        bucket_id = 'portfolio-images'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Admin authenticated dapat menghapus gambar portofolio"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'portfolio-images'
        AND auth.role() = 'authenticated'
    );

-- Data awal (seed) contoh aplikasi ANZA Tech dengan bahasa yang ramah bagi pemilik usaha.
INSERT INTO public.projects (
    title,
    category,
    description,
    tech_stack,
    image_url,
    image_urls,
    demo_url,
    repo_url,
    is_featured,
    created_at
)
SELECT
    'Aplikasi Mobile Banking myWM (Bank WM / BPR Weleri Makmur)',
    'Mobile & PWA',
    'Aplikasi layanan perbankan di HP (Android & iOS) untuk nasabah Bank WM. Memudahkan nasabah mengecek saldo tabungan, deposito, dan kredit, melakukan transfer antar-bank gratis hingga 10x per bulan, mengunduh rekening koran (e-Statement PDF), membayar lewat Nomor Virtual Account, hingga tarik tunai tanpa kartu dengan Scan QR.',
    ARRAY['Aplikasi Android & iOS (Flutter)', 'Transfer Antar Bank & QR Code', 'Cek Saldo Tabungan, Deposito & Kredit', 'e-Statement PDF & Keamanan PIN/OTP'],
    'assets/screenshots/mywm-1-beranda.png',
    ARRAY[
      'assets/screenshots/mywm-1-beranda.png',
      'assets/screenshots/mywm-2-transfer.png',
      'assets/screenshots/mywm-3-riwayat-va.png',
      'assets/screenshots/mywm-4-deposito-kredit.png'
    ],
    'https://klikwm.com',
    NULL,
    true,
    now() - interval '2 days'
WHERE NOT EXISTS (
    SELECT 1 FROM public.projects WHERE title = 'Aplikasi Mobile Banking myWM (Bank WM / BPR Weleri Makmur)'
);

INSERT INTO public.projects (
    title,
    category,
    description,
    tech_stack,
    image_url,
    image_urls,
    demo_url,
    repo_url,
    is_featured,
    created_at
)
SELECT
    'Sistem Pembukuan, Stok Gudang & Produksi Pabrik',
    'Web App',
    'Membantu pemilik pabrik dan distributor memantau sisa bahan baku di banyak gudang, mencatat jadwal produksi harian, menghitung modal produksi (HPP) secara otomatis, hingga mencetak laporan laba-rugi tanpa perlu rekap ulang di Excel.',
    ARRAY['Aplikasi Web Kantor', 'Database Terpusat', 'Laporan Excel/PDF', 'Multi-Gudang'],
    'assets/screenshots/erp-pabrik-1-stok-gudang.png',
    ARRAY[
      'assets/screenshots/erp-pabrik-1-stok-gudang.png',
      'assets/screenshots/erp-pabrik-2-mutasi-po.png',
      'assets/screenshots/erp-pabrik-3-hpp-laporan.png'
    ],
    NULL,
    NULL,
    true,
    now() - interval '20 days'
WHERE NOT EXISTS (
    SELECT 1 FROM public.projects WHERE title = 'Sistem Pembukuan, Stok Gudang & Produksi Pabrik'
);

INSERT INTO public.projects (
    title,
    category,
    description,
    tech_stack,
    image_url,
    image_urls,
    demo_url,
    repo_url,
    is_featured,
    created_at
)
SELECT
    'Aplikasi Presensi SMG (Absensi Online GPS, Verifikasi Wajah & Slip Gaji HRD)',
    'Mobile & PWA',
    'Aplikasi absensi online dan layanan mandiri karyawan berbasis HP (PWA) untuk PT SMG. Dilengkapi pengunci titik lokasi kantor (Geofencing GPS), kamera selfie deteksi wajah untuk dinas luar, pengajuan cuti & izin online, pantau sisa kontrak kerja (PKWT), cicilan pinjaman, hingga arsip & cetak Slip Gaji PDF resmi.',
    ARRAY['Aplikasi HP / PWA (Android & iOS)', 'Geofencing Peta GPS & Deteksi Wajah', 'Slip Gaji & Upah Lembur PDF', 'Pengajuan Cuti, Pinjaman & Kontrak PKWT'],
    'assets/screenshots/presensismg-1-beranda.png',
    ARRAY[
      'assets/screenshots/presensismg-1-beranda.png',
      'assets/screenshots/presensismg-2-absen-gps-selfie.png',
      'assets/screenshots/presensismg-3-slip-gaji-lembur.png',
      'assets/screenshots/presensismg-4-cuti-kontrak.png'
    ],
    NULL,
    NULL,
    true,
    now() - interval '15 days'
WHERE NOT EXISTS (
    SELECT 1 FROM public.projects WHERE title = 'Aplikasi Presensi SMG (Absensi Online GPS, Verifikasi Wajah & Slip Gaji HRD)'
);

INSERT INTO public.projects (
    title,
    category,
    description,
    tech_stack,
    image_url,
    image_urls,
    demo_url,
    repo_url,
    is_featured,
    created_at
)
SELECT
    'Sistem Reservasi Hotel Multi-Cabang, Resepsionis & Kasir Restoran (POS + QR Kamar)',
    'Web App',
    'Sistem manajemen operasional jaringan hotel terpadu mulai dari website booking kamar online multi-cabang, pemesanan makanan dari kamar via scan QR meja (Room Service), panel meja resepsionis dengan 6 status siklus kebersihan kamar (Housekeeping), kasir restoran F&B (POS), hingga kontrol serah terima 6 shift kasir dan laporan keuangan eksekutif.',
    ARRAY['Booking Online Multi-Hotel & Voucher', 'Room Service via QR Meja Kamar', 'Panel Resepsionis & 6 Siklus Kamar', 'Kasir Restoran POS & Rekap 6 Shift'],
    'assets/screenshots/hotelpms-1-portal-tamu.png',
    ARRAY[
      'assets/screenshots/hotelpms-1-portal-tamu.png',
      'assets/screenshots/hotelpms-2-resepsionis-kamar.png',
      'assets/screenshots/hotelpms-3-pos-shift.png',
      'assets/screenshots/hotelpms-4-admin-dashboard.png'
    ],
    NULL,
    NULL,
    true,
    now() - interval '12 days'
WHERE NOT EXISTS (
    SELECT 1 FROM public.projects WHERE title = 'Sistem Reservasi Hotel Multi-Cabang, Resepsionis & Kasir Restoran (POS + QR Kamar)'
);

INSERT INTO public.projects (
    title,
    category,
    description,
    tech_stack,
    image_url,
    image_urls,
    demo_url,
    repo_url,
    is_featured,
    created_at
)
SELECT
    'Aplikasi Kasir Pintar CuanPOS (Offline-First, Harga Grosir, Bluetooth Struk & Cloud)',
    'Desktop & POS',
    'Aplikasi kasir multi-perangkat (Android, Tablet & Windows) untuk toko ritel, grosir, dan F&B yang tetap lancar melayani transaksi meskipun internet mati (Offline-First SQLite). Dilengkapi deteksi otomatis Harga Grosir saat memilih pelanggan grosir, fitur Open Bill, cetak struk thermal Bluetooth 58mm/80mm, 4 level member (Bronze s/d Emerald), laporan laba bersih, serta sinkronisasi cloud otomatis.',
    ARRAY['Kasir Offline-First & Sinkron Cloud', 'Deteksi Harga Grosir & Open Bill', 'Cetak Struk Bluetooth 58mm/80mm & WA', '4-Tier Member CRM & Laporan Kas Bersih'],
    'assets/screenshots/cuanpos-1-kasir-openbill.png',
    ARRAY[
      'assets/screenshots/cuanpos-1-kasir-openbill.png',
      'assets/screenshots/cuanpos-2-pembayaran-struk.png',
      'assets/screenshots/cuanpos-3-stok-pelanggan.png',
      'assets/screenshots/cuanpos-4-laporan-keuangan.png'
    ],
    NULL,
    NULL,
    true,
    now() - interval '10 days'
WHERE NOT EXISTS (
    SELECT 1 FROM public.projects WHERE title = 'Aplikasi Kasir Pintar CuanPOS (Offline-First, Harga Grosir, Bluetooth Struk & Cloud)'
);

INSERT INTO public.projects (
    title,
    category,
    description,
    tech_stack,
    image_url,
    image_urls,
    demo_url,
    repo_url,
    is_featured,
    created_at
)
SELECT
    'Penataan Wi-Fi Tamu, Jaringan Kasir & Server Hotel',
    'IT Infrastructure',
    'Memisahkan jalur internet Wi-Fi tamu hotel dengan jaringan komputer resepsionis dan kasir agar sistem pembayaran tidak pernah lemot, sekaligus menyiapkan penyimpanan cadangan (backup) otomatis untuk data tamu.',
    ARRAY['Pemisahan Wi-Fi Tamu & Kantor', 'Server Lokal Hotel', 'Backup Data Otomatis', 'Pindah Data Lama'],
    'assets/screenshots/infra-jaringan-1-vlan-kasir.png',
    ARRAY[
      'assets/screenshots/infra-jaringan-1-vlan-kasir.png',
      'assets/screenshots/infra-jaringan-2-server-backup.png',
      'assets/screenshots/infra-jaringan-3-wifi-roaming.png'
    ],
    NULL,
    NULL,
    false,
    now() - interval '5 days'
WHERE NOT EXISTS (
    SELECT 1 FROM public.projects WHERE title = 'Penataan Wi-Fi Tamu, Jaringan Kasir & Server Hotel'
);
