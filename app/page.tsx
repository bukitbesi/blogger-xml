import Image from "next/image";

const stories = [
  {
    category: "Panduan",
    title: "Senarai 187 Model Motosikal Boleh Dibeli Guna SPayLater Shopee",
    excerpt:
      "Rujukan ringkas untuk membandingkan model, harga dan pilihan sebelum membuat pembelian.",
    tone: "amber",
  },
  {
    category: "Bukit Besi",
    title: "Taman Rekreasi Tasik Puteri Bukit Besi, Dungun",
    excerpt:
      "Panduan lokasi, tarikan dan perkara penting sebelum merancang kunjungan.",
    tone: "teal",
  },
  {
    category: "Internet",
    title: "TM Speed Test: Uji Kelajuan UniFi dan WiFi Anda",
    excerpt:
      "Semak kelajuan sebenar serta kenal pasti punca sambungan internet perlahan.",
    tone: "forest",
  },
  {
    category: "Kerajaan",
    title: "Cara Semak Status Permohonan dan Bantuan Dalam Talian",
    excerpt:
      "Langkah terus kepada maklumat rasmi, syarat kelayakan dan saluran semakan.",
    tone: "indigo",
  },
];

const updates = [
  "Semakan bantuan dan perkhidmatan Malaysia",
  "Direktori lokasi yang dikemas kini",
  "Kalkulator dan alat percuma",
];

const popularPosts = [
  "Waktu Operasi Pejabat Pos Berhampiran Anda",
  "Cara Semak Tracking PosLaju dan J&T",
  "Senarai Tempat Menarik di Dungun",
  "Kalkulator Gaji Bersih Malaysia",
];

const labels = [
  "Panduan",
  "Pendidikan",
  "Islamik",
  "Kesihatan",
  "Direktori",
  "Teknologi",
  "Travel",
  "Tutorial",
];

const latestSidebarPosts = [
  "Cara Semak Bantuan Kerajaan Secara Rasmi",
  "Panduan Percutian Ringkas ke Terengganu",
  "Senarai Direktori Perkhidmatan Malaysia",
  "Alat Digital Percuma untuk Urusan Harian",
];

const homeBlocks = [
  {
    eyebrow: "Pilihan pembaca",
    title: "Islamik",
    items: [
      "Panduan doa harian dan zikir ringkas",
      "Waktu solat dan rujukan ibadah",
      "Persediaan amalan untuk seisi keluarga",
    ],
  },
  {
    eyebrow: "Maklumat setempat",
    title: "Direktori",
    items: [
      "Lokasi pejabat dan waktu operasi",
      "Nombor telefon serta saluran rasmi",
      "Panduan perjalanan sebelum berkunjung",
    ],
  },
  {
    eyebrow: "Semakan rasmi",
    title: "Bantuan Kerajaan",
    items: [
      "Syarat kelayakan dan dokumen diperlukan",
      "Tarikh permohonan serta semakan status",
      "Pautan portal rasmi untuk tindakan lanjut",
    ],
  },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m21 21-4.35-4.35m2.35-5.15A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand${footer ? " footer-brand" : ""}`}
      href="#"
      aria-label="The Bukit Besi, halaman utama"
    >
      <Image
        className="brand-logo"
        src="/the-bukit-besi-logo.svg"
        width="52"
        height="52"
        alt=""
        priority={!footer}
      />
      <span>
        <strong>The Bukit Besi</strong>
        <small>
          {footer
            ? "Portal tempatan dengan capaian seluruh Malaysia."
            : "Informasi yang berguna, jelas dan semasa"}
        </small>
      </span>
    </a>
  );
}

function WidgetTitle({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2 className="widget-title" id={id}>
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Langkau ke kandungan
      </a>
      <header className="site-header">
        <div className="utility-bar">
          <div className="shell utility-inner">
            <span>Portal informasi Malaysia</span>
            <time dateTime="2026-07-23">Khamis, 23 Julai 2026</time>
          </div>
        </div>
        <div className="shell masthead">
          <Brand />
          <div className="ad-reserve" aria-label="Ruang iklan">
            <span>IKLAN</span>
            <b>Ruang 728 × 90 yang stabil</b>
          </div>
        </div>
        <nav className="main-nav" aria-label="Navigasi utama">
          <div className="shell nav-inner">
            <button className="icon-button menu-button" aria-label="Buka menu">
              <MenuIcon />
            </button>
            <div className="nav-links">
              <a className="active" href="#">
                Utama
              </a>
              <a href="#terkini">Terkini</a>
              <a href="#bukit-besi">Bukit Besi</a>
              <a href="#panduan">Panduan</a>
              <a href="#direktori">Direktori</a>
              <a href="#alat">Alat</a>
            </div>
            <button className="icon-button" aria-label="Cari artikel">
              <SearchIcon />
            </button>
          </div>
        </nav>
      </header>

      <main className="shell page-shell" id="content">
        <section className="hero-grid" aria-labelledby="featured-title">
          <article className="hero-card hero-primary">
            <div className="hero-art" aria-hidden="true">
              <span className="mine-line mine-line-one" />
              <span className="mine-line mine-line-two" />
              <span className="sun-disc" />
            </div>
            <div className="hero-content">
              <span className="eyebrow">Pilihan editor</span>
              <h1 id="featured-title">
                Bukit Besi: sejarah, komuniti dan panduan Malaysia dalam satu
                portal
              </h1>
              <p>
                Kandungan tempatan yang disemak, direktori berguna dan alat
                digital ringan untuk urusan harian.
              </p>
              <a className="primary-action" href="#terkini">
                Terokai kandungan <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>

          <aside className="briefing" aria-labelledby="briefing-title">
            <div className="section-heading compact">
              <span />
              <h2 id="briefing-title">Ringkasan hari ini</h2>
            </div>
            <ol>
              {updates.map((update, index) => (
                <li key={update}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <a href="#terkini">{update}</a>
                </li>
              ))}
            </ol>
            <a className="text-link" href="#terkini">
              Lihat semua kemas kini <span aria-hidden="true">→</span>
            </a>
          </aside>
        </section>

        <div className="content-layout">
          <div className="content-main">
            <section
              className="content-section"
              id="terkini"
              aria-labelledby="latest-title"
            >
              <div className="section-heading">
                <span />
                <div>
                  <p>Kandungan baharu</p>
                  <h2 id="latest-title">Terkini untuk anda</h2>
                </div>
                <a href="#">Lihat semua</a>
              </div>
              <div className="story-grid">
                {stories.map((story) => (
                  <article className="story-card" key={story.title}>
                    <a
                      className={`story-image ${story.tone}`}
                      href="#"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <span>{story.category}</span>
                    </a>
                    <div className="story-body">
                      <span className="story-category">{story.category}</span>
                      <h3>
                        <a href="#">{story.title}</a>
                      </h3>
                      <p>{story.excerpt}</p>
                      <div className="story-meta">
                        <span>5 min bacaan</span>
                        <time dateTime="2026-07-23">23 Julai 2026</time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="home-blocks" aria-label="Kandungan mengikut kategori">
              {homeBlocks.map((block) => (
                <section className="home-block" key={block.title}>
                  <div className="section-heading compact">
                    <span />
                    <div>
                      <p>{block.eyebrow}</p>
                      <h2>{block.title}</h2>
                    </div>
                    <a href="#">Lihat semua</a>
                  </div>
                  <div className="home-block-list">
                    {block.items.map((item, index) => (
                      <article key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <h3><a href="#">{item}</a></h3>
                        <a className="home-block-arrow" href="#" aria-label={`Baca ${item}`}>→</a>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="sidebar" aria-label="Sidebar utama">
            <section className="sidebar-widget follow-widget">
              <WidgetTitle>Follow Us</WidgetTitle>
              <div className="follow-grid">
                <a href="#" aria-label="Facebook The Bukit Besi"><b>f</b><span>Facebook</span></a>
                <a href="#" aria-label="YouTube The Bukit Besi"><b>▶</b><span>YouTube</span></a>
                <a href="#" aria-label="Instagram The Bukit Besi"><b>◎</b><span>Instagram</span></a>
                <a href="#" aria-label="X The Bukit Besi"><b>𝕏</b><span>Twitter</span></a>
              </div>
            </section>

            <section className="sidebar-widget">
              <WidgetTitle>Latest Posts</WidgetTitle>
              <ol className="latest-list">
                {latestSidebarPosts.map((post, index) => (
                  <li key={post}>
                    <span className={`latest-thumb tone-${index + 1}`} aria-hidden="true" />
                    <div>
                      <a href="#">{post}</a>
                      <time dateTime="2026-07-23">23 Julai 2026</time>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="sidebar-widget">
              <WidgetTitle>Popular Posts</WidgetTitle>
              <ol className="popular-list">
                {popularPosts.map((post, index) => (
                  <li key={post}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <a href="#">{post}</a>
                  </li>
                ))}
              </ol>
            </section>

            <div className="sidebar-ad" aria-label="Ruang iklan 300 kali 250">
              <span>IKLAN</span>
              <b>300 × 250</b>
            </div>

            <section className="sidebar-widget subscribe-widget">
              <span className="subscribe-kicker">Stay Informed</span>
              <WidgetTitle>Terima artikel baharu</WidgetTitle>
              <p>Ringkasan berguna terus ke e-mel, tanpa spam.</p>
              <form action="#" aria-label="Langgan kemas kini">
                <label className="sr-only" htmlFor="subscribe-email">Alamat e-mel</label>
                <input id="subscribe-email" type="email" placeholder="nama@email.com" />
                <button type="submit">Langgan</button>
              </form>
            </section>
          </aside>
        </div>

        <section className="trust-strip" aria-label="Prinsip penerbitan">
          <strong>Dibina untuk pembaca, bukan algoritma.</strong>
          <span>Struktur pantas</span>
          <span>Maklumat mudah disemak</span>
          <span>Pengiklanan yang bertanggungjawab</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-sections">
          <section className="footer-info" aria-label="Tentang The Bukit Besi">
            <Brand footer />
            <p>
              Panduan tempatan, direktori, alat dan informasi Malaysia yang
              disusun untuk membantu pembaca membuat keputusan dengan cepat.
            </p>
            <div className="social-links" aria-label="Media sosial">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="YouTube">▶</a>
              <a href="#" aria-label="Telegram">t</a>
            </div>
          </section>

          <section className="footer-widget">
            <h2>Categories</h2>
            <div className="footer-labels">
              {labels.map((label) => <a href="#" key={label}>{label}</a>)}
            </div>
          </section>

          <section className="footer-widget footer-subscribe">
            <h2>Stay Informed</h2>
            <p>Berita, panduan dan direktori pilihan untuk pembaca Malaysia.</p>
            <form action="#" aria-label="Langgan newsletter footer">
              <label className="sr-only" htmlFor="footer-email">Alamat e-mel</label>
              <input id="footer-email" type="email" placeholder="nama@email.com" />
              <button type="submit">Langgan</button>
            </form>
          </section>
        </div>

        <div className="footer-bar">
          <div className="shell footer-bar-inner">
            <p>© 2026 The Bukit Besi. Hak cipta terpelihara.</p>
            <nav aria-label="Pautan kaki halaman">
              <a href="#">Polisi</a>
              <a href="#">Terma</a>
              <a href="#content">Kembali ke atas ↑</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
