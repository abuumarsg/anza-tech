// Isi SUPABASE_URL dan SUPABASE_ANON_KEY dari menu Project Settings -> API di Supabase.
const SUPABASE_URL = 'https://vykoxxsdhjusziiddkwp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zcw6ugf5Mfn4iR45nILxrQ_noeZpS9e';

const STORAGE_BUCKET = 'portfolio-images';

const PORTFOLIO_CATEGORIES = [
  'Web App',
  'Mobile & PWA',
  'Desktop & POS',
  'IT Infrastructure'
];

// Label kategori yang ramah dan mudah dipahami oleh orang awam maupun pemilik usaha.
const CATEGORY_FRIENDLY_LABELS = {
  'Semua': 'Semua Aplikasi',
  'Web App': 'Sistem Kantor & Pabrik',
  'Mobile & PWA': 'Aplikasi HP (Android & iOS)',
  'Desktop & POS': 'Program Kasir Toko',
  'IT Infrastructure': 'Jaringan & Server'
};

function getFriendlyCategoryLabel(category) {
  if (!category) return 'Solusi Usaha';
  return CATEGORY_FRIENDLY_LABELS[category] || category;
}

const CONSULTANT_PROFILE = {
  brandPlaceholder: 'ANZA Tech',
  name: 'ANZA Tech',
  role: 'Jasa Pembuatan Aplikasi Usaha & Solusi IT',
  whatsappNumber: '6285725951044',
  email: 'abuumarsg@gmail.com',
  location: 'Indonesia (Layanan Online & Kunjungan Lokasi)'
};

function createBlueprintPlaceholder(code, label, category, subtitle) {
  const friendlyCat = getFriendlyCategoryLabel(category);
  const helperText =
    subtitle || 'Tampilan contoh layar aplikasi ANZA Tech (dapat diganti foto asli melalui menu Admin)';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${label}">
    <rect width="1200" height="675" fill="#EFF6FF"/>
    <rect x="44" y="40" width="1112" height="595" rx="20" fill="#FFFFFF" stroke="#BFDBFE" stroke-width="3"/>
    <rect x="44" y="40" width="1112" height="84" rx="20" fill="#1E3A8A"/>
    <circle cx="92" cy="82" r="9" fill="#93C5FD"/>
    <circle cx="122" cy="82" r="9" fill="#60A5FA"/>
    <circle cx="152" cy="82" r="9" fill="#3B82F6"/>
    <text x="190" y="90" fill="#FFFFFF" font-family="sans-serif" font-size="22" font-weight="700">ANZA Tech • ${friendlyCat}</text>
    <text x="1116" y="90" fill="#DBEAFE" font-family="sans-serif" font-size="18" text-anchor="end">Ilustrasi Layar ${code}</text>
    <rect x="88" y="166" width="320" height="38" rx="8" fill="#DBEAFE"/>
    <text x="106" y="191" fill="#1E40AF" font-family="sans-serif" font-size="18" font-weight="700">${friendlyCat}</text>
    <text x="88" y="268" fill="#0F172A" font-family="sans-serif" font-size="38" font-weight="700">${label}</text>
    <text x="88" y="324" fill="#334155" font-family="sans-serif" font-size="23">${helperText}</text>
    <line x1="88" y1="378" x2="1112" y2="378" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="88" y="412" width="316" height="140" rx="14" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <text x="114" y="456" fill="#475569" font-family="sans-serif" font-size="18">Tampilan Mudah Dipahami</text>
    <text x="114" y="502" fill="#0F172A" font-family="sans-serif" font-size="26" font-weight="700">Siap Pakai oleh Staf</text>
    <rect x="436" y="412" width="316" height="140" rx="14" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <text x="462" y="456" fill="#475569" font-family="sans-serif" font-size="18">Laporan Otomatis</text>
    <text x="462" y="502" fill="#047857" font-family="sans-serif" font-size="26" font-weight="700">Tanpa Rekap Manual</text>
    <rect x="784" y="412" width="328" height="140" rx="14" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <text x="810" y="456" fill="#475569" font-family="sans-serif" font-size="18">Pendampingan Penuh</text>
    <text x="810" y="502" fill="#1D4ED8" font-family="sans-serif" font-size="26" font-weight="700">Didampingi Sampai Bisa</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEFAULT_PROJECT_IMAGE = createBlueprintPlaceholder(
  '01',
  'Pratinjau Tampilan Aplikasi ANZA Tech',
  'Web App',
  'Unggah foto tangkapan layar aplikasi asli melalui halaman Admin'
);

function normalizeProjectImages(project) {
  if (!project) return [];

  if (Array.isArray(project.image_urls) && project.image_urls.length > 0) {
    const cleaned = project.image_urls
      .map((u) => (typeof u === 'string' ? u.trim() : ''))
      .filter(Boolean);
    if (cleaned.length > 0) return cleaned;
  }

  if (typeof project.image_url === 'string' && project.image_url.trim() !== '') {
    const raw = project.image_url.trim();
    if (raw.startsWith('[')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed
            .map((u) => (typeof u === 'string' ? u.trim() : ''))
            .filter(Boolean);
        }
      } catch {
        // Lanjutkan sebagai string URL tunggal
      }
    }
    return [raw];
  }

  return [];
}

// Data awal katalog ANZA Tech dengan bahasa yang ramah dan mudah dipahami pemilik usaha.
const FALLBACK_PROJECTS = [
  {
    id: 'real-flutter-mywm-01',
    title: 'Aplikasi Mobile Banking myWM (Bank WM / BPR Weleri Makmur)',
    category: 'Mobile & PWA',
    description:
      'Aplikasi layanan perbankan di HP (Android & iOS) untuk nasabah Bank WM. Memudahkan nasabah mengecek saldo tabungan, deposito, dan kredit, melakukan transfer antar-bank gratis hingga 10x per bulan, mengunduh rekening koran (e-Statement PDF), membayar lewat Nomor Virtual Account, hingga tarik tunai tanpa kartu dengan Scan QR.',
    tech_stack: [
      'Aplikasi Android & iOS (Flutter)',
      'Transfer Antar Bank & QR Code',
      'Cek Saldo Tabungan, Deposito & Kredit',
      'e-Statement PDF & Keamanan PIN/OTP'
    ],
    image_url: 'assets/screenshots/mywm-1-beranda.png',
    image_urls: [
      'assets/screenshots/mywm-1-beranda.png',
      'assets/screenshots/mywm-2-transfer.png',
      'assets/screenshots/mywm-3-riwayat-va.png',
      'assets/screenshots/mywm-4-deposito-kredit.png'
    ],
    demo_url: 'https://klikwm.com',
    repo_url: '',
    is_featured: true,
    created_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'real-pwa-presensismg-02',
    title: 'Aplikasi Presensi SMG (Absensi Online GPS, Verifikasi Wajah & Slip Gaji HRD)',
    category: 'Mobile & PWA',
    description:
      'Aplikasi absensi online dan layanan mandiri karyawan berbasis HP (PWA) untuk PT SMG. Dilengkapi pengunci titik lokasi kantor (Geofencing GPS), kamera selfie deteksi wajah untuk dinas luar, pengajuan cuti & izin online, pantau sisa kontrak kerja (PKWT), cicilan pinjaman, hingga arsip & cetak Slip Gaji PDF resmi.',
    tech_stack: [
      'Aplikasi HP / PWA (Android & iOS)',
      'Geofencing Peta GPS & Deteksi Wajah',
      'Slip Gaji & Upah Lembur PDF',
      'Pengajuan Cuti, Pinjaman & Kontrak PKWT'
    ],
    image_url: 'assets/screenshots/presensismg-1-beranda.png',
    image_urls: [
      'assets/screenshots/presensismg-1-beranda.png',
      'assets/screenshots/presensismg-2-absen-gps-selfie.png',
      'assets/screenshots/presensismg-3-slip-gaji-lembur.png',
      'assets/screenshots/presensismg-4-cuti-kontrak.png'
    ],
    demo_url: '#katalog',
    repo_url: '',
    is_featured: true,
    created_at: '2026-10-25T10:15:00Z'
  },
  {
    id: 'real-web-hotelpms-03',
    title: 'Sistem Reservasi Hotel Multi-Cabang, Resepsionis & Kasir Restoran (POS + QR Kamar)',
    category: 'Web App',
    description:
      'Sistem manajemen operasional jaringan hotel terpadu mulai dari website booking kamar online multi-cabang, pemesanan makanan dari kamar via scan QR meja (Room Service), panel meja resepsionis dengan 6 status siklus kebersihan kamar (Housekeeping), kasir restoran F&B (POS), hingga kontrol serah terima 6 shift kasir dan laporan keuangan eksekutif.',
    tech_stack: [
      'Booking Online Multi-Hotel & Voucher',
      'Room Service via QR Meja Kamar',
      'Panel Resepsionis & 6 Siklus Kamar',
      'Kasir Restoran POS & Rekap 6 Shift'
    ],
    image_url: 'assets/screenshots/hotelpms-1-portal-tamu.png',
    image_urls: [
      'assets/screenshots/hotelpms-1-portal-tamu.png',
      'assets/screenshots/hotelpms-2-resepsionis-kamar.png',
      'assets/screenshots/hotelpms-3-pos-shift.png',
      'assets/screenshots/hotelpms-4-admin-dashboard.png'
    ],
    demo_url: '#katalog',
    repo_url: '',
    is_featured: true,
    created_at: '2026-10-20T11:00:00Z'
  },
  {
    id: 'real-pos-cuanpos-04',
    title: 'Aplikasi Kasir Pintar CuanPOS (Offline-First, Harga Grosir, Bluetooth Struk & Cloud)',
    category: 'Desktop & POS',
    description:
      'Aplikasi kasir multi-perangkat (Android, Tablet & Windows) untuk toko ritel, grosir, dan F&B yang tetap lancar melayani transaksi meskipun internet mati (Offline-First SQLite). Dilengkapi deteksi otomatis Harga Grosir saat memilih pelanggan grosir, fitur Open Bill, cetak struk thermal Bluetooth 58mm/80mm, 4 level member (Bronze s/d Emerald), laporan laba bersih, serta sinkronisasi cloud otomatis.',
    tech_stack: [
      'Kasir Offline-First & Sinkron Cloud',
      'Deteksi Harga Grosir & Open Bill',
      'Cetak Struk Bluetooth 58mm/80mm & WA',
      '4-Tier Member CRM & Laporan Kas Bersih'
    ],
    image_url: 'assets/screenshots/cuanpos-1-kasir-openbill.png',
    image_urls: [
      'assets/screenshots/cuanpos-1-kasir-openbill.png',
      'assets/screenshots/cuanpos-2-pembayaran-struk.png',
      'assets/screenshots/cuanpos-3-stok-pelanggan.png',
      'assets/screenshots/cuanpos-4-laporan-keuangan.png'
    ],
    demo_url: '#katalog',
    repo_url: '',
    is_featured: true,
    created_at: '2026-10-18T09:30:00Z'
  },
  {
    id: 'demo-erp-manufaktur-01',
    title: 'Sistem Pembukuan, Stok Gudang & Produksi Pabrik',
    category: 'Web App',
    description:
      'Membantu pemilik pabrik dan distributor memantau sisa bahan baku di banyak gudang, mencatat jadwal produksi harian, menghitung modal produksi (HPP) secara otomatis, hingga mencetak laporan laba-rugi tanpa perlu rekap ulang di Excel.',
    tech_stack: ['Aplikasi Web Kantor', 'Database Terpusat', 'Laporan Excel/PDF', 'Multi-Gudang'],
    image_url: 'assets/screenshots/erp-pabrik-1-stok-gudang.png',
    image_urls: [
      'assets/screenshots/erp-pabrik-1-stok-gudang.png',
      'assets/screenshots/erp-pabrik-2-mutasi-po.png',
      'assets/screenshots/erp-pabrik-3-hpp-laporan.png'
    ],
    demo_url: '#katalog',
    repo_url: '',
    is_featured: true,
    created_at: '2026-10-15T08:30:00Z'
  },
  {
    id: 'demo-infra-hotel-04',
    title: 'Penataan Wi-Fi Tamu, Jaringan Kasir & Server Hotel',
    category: 'IT Infrastructure',
    description:
      'Memisahkan jalur internet Wi-Fi tamu hotel dengan jaringan komputer resepsionis dan kasir agar sistem pembayaran tidak pernah lemot, sekaligus menyiapkan penyimpanan cadangan (backup) otomatis untuk data tamu.',
    tech_stack: ['Pemisahan Wi-Fi Tamu & Kantor', 'Server Lokal Hotel', 'Backup Data Otomatis', 'Pindah Data Lama'],
    image_url: 'assets/screenshots/infra-jaringan-1-vlan-kasir.png',
    image_urls: [
      'assets/screenshots/infra-jaringan-1-vlan-kasir.png',
      'assets/screenshots/infra-jaringan-2-server-backup.png',
      'assets/screenshots/infra-jaringan-3-wifi-roaming.png'
    ],
    demo_url: '',
    repo_url: '',
    is_featured: false,
    created_at: '2026-07-05T09:45:00Z'
  }
];

function isSupabaseConfigured() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;

  const trimmedUrl = SUPABASE_URL.trim();
  const trimmedKey = SUPABASE_ANON_KEY.trim();

  const placeholderPatterns = [
    'YOUR_SUPABASE_PROJECT_URL',
    'YOUR_SUPABASE_ANON_KEY',
    'YOUR_SUPABASE_URL',
    'https://your-project-id.supabase.co',
    'https://xxxx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  ];

  if (
    placeholderPatterns.includes(trimmedUrl) ||
    placeholderPatterns.includes(trimmedKey) ||
    trimmedUrl.includes('YOUR_SUPABASE') ||
    trimmedKey.includes('YOUR_SUPABASE')
  ) {
    return false;
  }

  try {
    const parsed = new URL(trimmedUrl);
    return (
      (parsed.protocol === 'https:' || parsed.protocol === 'http:') &&
      trimmedKey.length > 20
    );
  } catch {
    return false;
  }
}

let supabaseClient = null;

if (isSupabaseConfigured() && typeof window !== 'undefined' && window.supabase) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL.trim(), SUPABASE_ANON_KEY.trim(), {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  } catch (error) {
    console.error('[Supabase Init Error]:', error);
    supabaseClient = null;
  }
}

function renderSetupBanner(containerId = 'setup-banner-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (isSupabaseConfigured() && supabaseClient) {
    container.innerHTML = '';
    container.classList.add('hidden');
    return;
  }

  // Hanya tampilkan petunjuk teknis Supabase di halaman Admin agar pengunjung awam di halaman utama tidak bingung.
  const isAdminPage =
    typeof window !== 'undefined' &&
    window.location &&
    window.location.pathname.toLowerCase().includes('admin');

  if (!isAdminPage) {
    container.innerHTML = '';
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');
  container.innerHTML = `
    <div id="supabase-setup-banner" class="surface-banner border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div class="text-xs sm:text-sm leading-relaxed">
            <span class="font-semibold px-2.5 py-0.5 rounded-md border mr-2 inline-block banner-tag">
              Mode Pratinjau Lokal
            </span>
            <span>
              Database Supabase belum dihubungkan di <code class="font-mono font-semibold">config.js</code>.
              Anda tetap bisa mencoba tambah, ubah, dan unggah banyak gambar secara lokal di browser ini.
            </span>
          </div>
          <div class="flex items-center self-end lg:self-center flex-shrink-0">
            <button
              type="button"
              onclick="document.getElementById('supabase-setup-banner').remove()"
              class="min-h-[44px] min-w-[44px] px-4 py-2 rounded-[10px] text-xs font-semibold btn-secondary transition"
              aria-label="Sembunyikan pemberitahuan"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

const THEME_STORAGE_KEY = 'anza_tech_clean_theme_v1';

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Abaikan jika akses storage dibatasi browser
  }
  return 'light';
}

function applyTheme(theme) {
  const root = document.documentElement;
  const isDark = theme === 'dark';
  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');

  const labels = document.querySelectorAll('[data-theme-label]');
  labels.forEach((el) => {
    el.textContent = isDark ? 'Tampilan Terang' : 'Tampilan Gelap';
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Abaikan jika akses storage dibatasi browser
  }
  applyTheme(next);
}

window.PortfolioConfig = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  STORAGE_BUCKET,
  PORTFOLIO_CATEGORIES,
  CATEGORY_FRIENDLY_LABELS,
  getFriendlyCategoryLabel,
  CONSULTANT_PROFILE,
  DEFAULT_PROJECT_IMAGE,
  FALLBACK_PROJECTS,
  normalizeProjectImages,
  isSupabaseConfigured,
  supabaseClient,
  renderSetupBanner,
  getSavedTheme,
  applyTheme,
  toggleTheme
};
