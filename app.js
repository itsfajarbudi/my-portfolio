/* =============================================
   PORTFOLIO JAVASCRIPT
   Interactions, Animations, & Dynamic Features
   ============================================= */

'use strict';

// ==========================================
// i18n — BILINGUAL TRANSLATION ENGINE
// Default: English | Toggle: Indonesian
// ==========================================
(function () {
  const TRANSLATIONS = {
    en: {
      // Page title & meta
      page_title: 'Portfolio | Fajar Budi Raharjo',

      // Gateway overlay
      gw_badge: 'AI Online — Powered by naralink',
      gw_title_pre: 'Hello, I am',
      gw_title_ai: 'AI Assistant',
      gw_subtitle: "Hello! I am Fajar Budi Raharjo's smart assistant. How can I help you regarding his projects, skills, or experience?",
      gw_btn_chat_aria: 'Chat with AI',
      gw_btn_porto_aria: 'Go to Portfolio',
      gw_choice_chat_title: 'Chat with AI',
      gw_choice_chat_desc: 'Ask anything about Fajar — experience, skills, projects, and more.',
      gw_choice_porto_title: 'View Portfolio',
      gw_choice_porto_desc: "Explore Fajar's projects, certificates, and achievements directly.",
      gw_footer_hint: 'After chatting with the AI, you can still explore the portfolio anytime.',
      gw_close_title: 'Close and View Portfolio',
      gw_view_porto: 'View Portfolio',
      gw_chip_skills: 'Main Skills',
      gw_chip_projects: 'Recent Projects',
      gw_chip_certs: 'Certificates',
      gw_chip_collab: 'Collaboration',
      gw_input_placeholder: 'Ask something about Fajar…',
      gw_send_aria: 'Send message',
      gw_input_hint: 'Press Enter to send • AI responses may take a few seconds',

      // Navbar
      nav_home: 'Home',
      nav_about: 'About',
      nav_skills: 'Skills',
      nav_projects: 'Projects',
      nav_certs: 'Certificates',
      nav_now: 'Now',
      nav_contact: 'Contact',
      nav_contact_btn: 'Contact Me',

      // Hero
      hero_available: 'Available for New Projects',
      hero_greeting: 'Hello, I am',
      hero_desc: 'I am an engineer who builds modern applications while also architecting the network infrastructure behind them. My expertise covers large-scale application development, certified infrastructure management, and IoT solution implementation.',
      hero_btn_projects: 'View Projects',
      hero_btn_wa: 'WhatsApp Chat',

      // Profile
      profile_available: 'Available',
      profile_role: 'DevOps And Full-Stack Engineer',
      profile_download_cv: 'Download CV',

      // Stats
      stat_years: 'Years of Experience',
      stat_projects: 'Completed Projects',

      // About
      about_vision_title: 'Vision & Mission',
      about_mission: 'My mission is to bridge the worlds of programming, network infrastructure, and future technology to build a digital ecosystem that is adaptive, secure, and large-scale.',
      about_approach: 'Through a clean <em>end-to-end development</em> approach, automated server architecture, and innovative integrations such as IoT and drone technology, I am committed to delivering digital solutions that are not only functional, but also robust and ready for high traffic.',
      tag_problem_solver: 'Problem Solver',
      tag_detail_oriented: 'Detail Oriented',
      tag_team_player: 'Team Player',
      tag_ai_learning: 'Learning AI Engineer',

      // Skills
      skills_core_title: 'Core Competencies',
      skill_routing: 'Routing & Switching',
      skill_server_admin: 'Server Administration',
      skill_network_sec: 'Network Security',
      skill_cloud_infra: 'Cloud Infrastructure',
      skill_container: 'Container & Orchestration',
      skill_cicd: 'Pipelines & Automation',

      // Projects
      projects_tag: 'Portfolio',
      projects_title: 'Featured Projects',
      projects_desc: 'Some of the best projects I have worked on with full dedication.',

      // Certificates
      certs_tag: 'Achievements',
      certs_title: 'Certificates & Awards',
      certs_desc: 'Proof of my commitment to continuously learn and improve professional competencies.',
      filter_all: 'All',
      filter_programming: 'Programming',
      filter_design: 'Design',
      filter_data: 'Data',

      // Now Page
      now_live_badge: 'Live & Updated',
      now_live_aria: 'Live and updated',
      now_title_pre: "What I'm Doing",
      now_title_accent: 'Now',
      now_subtitle: 'A transparent, real-time snapshot of where my focus and energy are going — updated June 2026.',
      badge_in_progress: 'In Progress',
      badge_shipped: 'Shipped',
      badge_exploring: 'Exploring',
      now_card1_title: 'Current Project',
      now_card1_desc: 'Building a multi-tenant SaaS infrastructure platform with automated provisioning, real-time monitoring dashboards, and zero-downtime deployment pipelines.',
      now_impact_label: 'Impact',
      now_card1_impact: 'Serves 50+ enterprise clients. Reduces deployment time by 70%.',
      now_card2_title: 'Learning & R&D',
      now_card2_desc: 'Diving deep into AI/ML Ops patterns, LLM integration architectures, and platform engineering best practices for high-scale systems.',
      now_topic1: 'LLMOps & AI Infrastructure',
      now_topic2: 'Platform Engineering Patterns',
      now_topic3: 'eBPF for Network Observability',
      now_topic4: 'Rust for Systems Programming',
      now_card3_title: 'Reading & Certifications',
      now_card3_desc: 'Structured learning track focused on cloud architecture and engineering leadership for senior-level growth.',
      reading_type_cert: 'Certification',
      reading_type_book: 'Book',
      reading_type_course: 'Course',
      now_milestones_title: 'Recent Milestones',
      now_milestones_sub: 'Key achievements, shipped projects, and professional milestones.',
      tl_date_jun: 'June 2026',
      tl_date_may: 'May 2026',
      tl_date_apr: 'Apr 2026',
      tl_date_mar: 'Mar 2026',
      tl_date_feb: 'Feb 2026',
      tl_item1: 'Migrated core monolith to event-driven microservices architecture on Kubernetes',
      tl_item2: 'Led a cross-functional team of 5 engineers through Alpha release of naralink platform',
      tl_item3: 'Implemented AI-powered anomaly detection reducing incident response time by 60%',
      tl_item4: 'Enrolled in AWS Solutions Architect Professional certification path',
      tl_item5: 'Designed and deployed zero-trust network architecture for enterprise client infrastructure',

      // Contact
      contact_tag: 'Contact',
      contact_title: "Let's Bring Your<br />Ideas to Life!",
      contact_desc: "Have an exciting project or idea? I'm ready to help you realize it. Don't hesitate to reach out via WhatsApp.",
      contact_wa_btn: 'Chat on WhatsApp',
      contact_email_btn: 'Send Email',
      contact_location: 'Jakarta, Indonesia',
      contact_tagline: 'Reliable IT & Infrastructure Solutions',

      // Footer
      footer_brand_desc: 'Designing robust & secure system architectures.\n            Committed to high performance and scalability.',
      footer_status: 'All systems operational',
      footer_explore: 'Explore',
      footer_specialization: 'Specialization',
      footer_spec1: 'Cloud & Infrastructure',
      footer_spec2: 'CI/CD Automation',
      footer_spec3: 'Full-Stack Web',
      footer_spec4: 'System Security',
      footer_connect: 'Connect',
      footer_connect_desc: "Let's discuss building reliable digital solutions.",
      footer_credit: 'Built with high enthusiasm.',

      // Chatbot widget
      chatbot_greeting: "Hello! I am Fajar's AI assistant. How can I help you with this portfolio?",
      chatbot_input_placeholder: 'Type your message...',

      // Roles typing effect
      roles: ['Web Developer', 'UI/UX Enthusiast', 'Python Programmer', 'Data Analyst', 'Problem Solver'],

      // WA URLs
      wa_nav: 'https://wa.me/628138305092?text=Hello%20Fajar!%20I%20am%20interested%20in%20collaborating.',
      wa_hero: 'https://wa.me/628138305092',
      wa_contact: 'https://wa.me/628138305092?text=Hello%20Fajar!%20I%20would%20like%20to%20discuss%20my%20project.',

      // GW chips msg
      chip_skills: "Tell me about Fajar's main skills",
      chip_projects: 'What projects has Fajar worked on?',
      chip_certs: 'What certificates and achievements does Fajar have?',
      chip_collab: 'How to contact Fajar for collaboration?',
    },

    id: {
      page_title: 'Portofolio | Fajar Budi Raharjo',

      gw_badge: 'AI Online — Powered by naralink',
      gw_title_pre: 'Halo, Saya',
      gw_title_ai: 'AI Assistant',
      gw_subtitle: 'Halo! Saya adalah asisten cerdas Fajar Budi Raharjo. Ada yang bisa saya bantu terkait proyek, keahlian, atau pengalamannya?',
      gw_btn_chat_aria: 'Bicara dengan AI',
      gw_btn_porto_aria: 'Langsung ke Portofolio',
      gw_choice_chat_title: 'Bicara dengan AI',
      gw_choice_chat_desc: 'Tanya apa saja seputar Fajar — pengalaman, keahlian, proyek, dan lainnya.',
      gw_choice_porto_title: 'Lihat Portofolio',
      gw_choice_porto_desc: 'Jelajahi proyek, sertifikat, dan pencapaian Fajar secara langsung dan lengkap.',
      gw_footer_hint: 'Setelah bicara dengan AI, Anda tetap bisa menjelajahi portofolio kapan saja.',
      gw_close_title: 'Tutup dan Lihat Portofolio',
      gw_view_porto: 'Lihat Portofolio',
      gw_chip_skills: 'Keahlian utama',
      gw_chip_projects: 'Proyek terbaru',
      gw_chip_certs: 'Sertifikat',
      gw_chip_collab: 'Kolaborasi',
      gw_input_placeholder: 'Tanyakan sesuatu tentang Fajar…',
      gw_send_aria: 'Kirim pesan',
      gw_input_hint: 'Tekan Enter untuk mengirim • Jawaban AI bisa memakan waktu beberapa detik',

      nav_home: 'Beranda',
      nav_about: 'Tentang',
      nav_skills: 'Keahlian',
      nav_projects: 'Proyek',
      nav_certs: 'Sertifikat',
      nav_now: 'Now',
      nav_contact: 'Kontak',
      nav_contact_btn: 'Hubungi Saya',

      hero_available: 'Tersedia untuk Proyek Baru',
      hero_greeting: 'Halo, Saya',
      hero_desc: 'Saya adalah seorang engineer yang membangun aplikasi modern sekaligus merancang arsitektur jaringan di belakangnya. Keahlian saya mencakup pengembangan aplikasi berskala besar, manajemen infrastruktur bersertifikasi dan implementasi solusi IoT.',
      hero_btn_projects: 'Lihat Proyek',
      hero_btn_wa: 'Chat WhatsApp',

      profile_available: 'Tersedia',
      profile_role: 'DevOps Dan Full-Stack Engineer',
      profile_download_cv: 'Unduh CV',

      stat_years: 'Tahun Pengalaman',
      stat_projects: 'Proyek Selesai',

      about_vision_title: 'Visi & Misi',
      about_mission: 'Misi saya adalah menjembatani dunia pemrograman, infrastruktur jaringan, dan teknologi masa depan untuk membangun ekosistem digital yang adaptif, aman, dan berskala besar.',
      about_approach: 'Melalui pendekatan <em>end-to-end development</em> yang bersih, arsitektur server yang terotomatisasi, serta integrasi inovatif seperti IoT dan teknologi drone, saya berkomitmen menghadirkan solusi digital yang tidak hanya fungsional, tetapi juga tangguh dan siap menghadapi trafik tinggi.',
      tag_problem_solver: 'Problem Solver',
      tag_detail_oriented: 'Detail Oriented',
      tag_team_player: 'Team Player',
      tag_ai_learning: 'Learning AI Engineer',

      skills_core_title: 'Core Competencies',
      skill_routing: 'Routing & Switching',
      skill_server_admin: 'Administrasi Server',
      skill_network_sec: 'Keamanan Jaringan',
      skill_cloud_infra: 'Infrastruktur Cloud',
      skill_container: 'Container & Orkestrasi',
      skill_cicd: 'Pipeline & Otomatisasi',

      projects_tag: 'Portofolio',
      projects_title: 'Proyek Unggulan',
      projects_desc: 'Beberapa proyek terbaik yang telah saya kerjakan dengan penuh dedikasi.',

      certs_tag: 'Pencapaian',
      certs_title: 'Sertifikat & Penghargaan',
      certs_desc: 'Bukti komitmen saya dalam terus belajar dan meningkatkan kompetensi profesional.',
      filter_all: 'Semua',
      filter_programming: 'Programming',
      filter_design: 'Desain',
      filter_data: 'Data',

      now_live_badge: 'Live & Diperbarui',
      now_live_aria: 'Live dan diperbarui',
      now_title_pre: 'Yang Sedang Saya Kerjakan',
      now_title_accent: 'Sekarang',
      now_subtitle: 'Gambaran transparan dan real-time tentang fokus dan energi saya saat ini — diperbarui Juni 2026.',
      badge_in_progress: 'Sedang Berjalan',
      badge_shipped: 'Selesai',
      badge_exploring: 'Eksplorasi',
      now_card1_title: 'Proyek Saat Ini',
      now_card1_desc: 'Membangun platform infrastruktur SaaS multi-tenant dengan provisi otomatis, dashboard monitoring real-time, dan pipeline deployment tanpa downtime.',
      now_impact_label: 'Dampak',
      now_card1_impact: 'Melayani 50+ klien enterprise. Mengurangi waktu deployment sebesar 70%.',
      now_card2_title: 'Pembelajaran & R&D',
      now_card2_desc: 'Mendalami pola AI/ML Ops, arsitektur integrasi LLM, dan praktik terbaik platform engineering untuk sistem berskala besar.',
      now_topic1: 'LLMOps & Infrastruktur AI',
      now_topic2: 'Pola Platform Engineering',
      now_topic3: 'eBPF untuk Observabilitas Jaringan',
      now_topic4: 'Rust untuk Pemrograman Sistem',
      now_card3_title: 'Membaca & Sertifikasi',
      now_card3_desc: 'Jalur pembelajaran terstruktur yang berfokus pada arsitektur cloud dan kepemimpinan rekayasa untuk pertumbuhan level senior.',
      reading_type_cert: 'Sertifikasi',
      reading_type_book: 'Buku',
      reading_type_course: 'Kursus',
      now_milestones_title: 'Pencapaian Terkini',
      now_milestones_sub: 'Pencapaian utama, proyek yang diselesaikan, dan tonggak profesional.',
      tl_date_jun: 'Juni 2026',
      tl_date_may: 'Mei 2026',
      tl_date_apr: 'Apr 2026',
      tl_date_mar: 'Mar 2026',
      tl_date_feb: 'Feb 2026',
      tl_item1: 'Migrasi monolith inti ke arsitektur microservices berbasis event di Kubernetes',
      tl_item2: 'Memimpin tim lintas fungsi 5 engineer melalui rilis Alpha platform naralink',
      tl_item3: 'Mengimplementasikan deteksi anomali berbasis AI yang mengurangi waktu respons insiden sebesar 60%',
      tl_item4: 'Mendaftar jalur sertifikasi AWS Solutions Architect Professional',
      tl_item5: 'Merancang dan menerapkan arsitektur jaringan zero-trust untuk infrastruktur klien enterprise',

      contact_tag: 'Kontak',
      contact_title: 'Mari Wujudkan<br />Ide Anda Bersama!',
      contact_desc: 'Punya proyek atau ide menarik? Saya siap membantu Anda mewujudkannya. Jangan ragu untuk menghubungi saya melalui WhatsApp.',
      contact_wa_btn: 'Chat di WhatsApp',
      contact_email_btn: 'Kirim Email',
      contact_location: 'Jakarta, Indonesia',
      contact_tagline: 'Solusi IT & Infrastruktur Handal',

      footer_brand_desc: 'Merancang arsitektur sistem yang tangguh & aman.\n            Berkomitmen pada performa dan skalabilitas tinggi.',
      footer_status: 'Semua sistem berjalan normal',
      footer_explore: 'Eksplorasi',
      footer_specialization: 'Spesialisasi',
      footer_spec1: 'Cloud & Infrastruktur',
      footer_spec2: 'CI/CD Automation',
      footer_spec3: 'Full-Stack Web',
      footer_spec4: 'Keamanan Sistem',
      footer_connect: 'Terhubung',
      footer_connect_desc: 'Mari berdiskusi untuk membangun solusi digital yang handal.',
      footer_credit: 'Dibuat dengan antusiasme tinggi.',

      chatbot_greeting: 'Halo! Saya adalah asisten AI Fajar. Ada yang bisa saya bantu terkait portofolio ini?',
      chatbot_input_placeholder: 'Ketik pesan Anda...',

      roles: ['Web Developer', 'UI/UX Enthusiast', 'Programmer Python', 'Analis Data', 'Problem Solver'],

      wa_nav: 'https://wa.me/628138305092?text=Halo%20Fajar!%20Saya%20tertarik%20untuk%20berkolaborasi.',
      wa_hero: 'https://wa.me/628138305092',
      wa_contact: 'https://wa.me/628138305092?text=Halo%20Fajar!%20Saya%20ingin%20berdiskusi%20tentang%20proyek%20saya.',

      chip_skills: 'Ceritakan tentang keahlian utama Fajar',
      chip_projects: 'Proyek apa saja yang pernah dikerjakan Fajar?',
      chip_certs: 'Sertifikat dan pencapaian apa yang dimiliki Fajar?',
      chip_collab: 'Bagaimana cara menghubungi Fajar untuk kolaborasi?',
    },
  };

  // Bahasa Indonesia adalah satu-satunya bahasa — hapus preferensi lama jika ada 'en'
  if (localStorage.getItem('portfolio_lang') === 'en') {
    localStorage.removeItem('portfolio_lang');
  }
  let currentLang = localStorage.getItem('portfolio_lang') || 'id';

  function applyTranslations(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;

    // 1. Update html lang attribute & page title
    document.documentElement.lang = lang;
    document.title = t.page_title;

    // 2. Translate all [data-i18n] elements (innerHTML for HTML support)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // 3. Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // 4. Translate aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    // 5. Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (t[key] !== undefined) el.title = t[key];
    });

    // 6. Update WA link hrefs
    const waLinks = {
      navWaBtn: t.wa_nav,
      heroWaBtn: t.wa_hero,
      contactWaBtn: t.wa_contact,
    };
    Object.entries(waLinks).forEach(([id, url]) => {
      const el = document.getElementById(id);
      if (el && url) el.href = url;
    });

    // 7. Update gateway chip data-msg values
    document.querySelectorAll('.gw-chip').forEach(chip => {
      const msgKey = lang === 'en' ? 'data-msg-en' : 'data-msg-id';
      const msg = chip.getAttribute(msgKey);
      if (msg) chip.setAttribute('data-msg', msg);
    });

    // 8. Update lang toggle button label (shows opposite = what it will switch TO)
    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = lang === 'en' ? 'ID' : 'EN';

    // 9. Update roles for the typing effect.
    //    IMPORTANT: We CANNOT use `typeof roles` here because `roles` is declared
    //    with `let` later in this script. In strict mode, accessing a `let`/`const`
    //    variable before its declaration (Temporal Dead Zone) throws a ReferenceError
    //    even with the `typeof` guard — which would crash the entire script and prevent
    //    all subsequent event listeners (including gateway buttons) from being attached.
    //    Solution: use a stable window callback set by the typing-effect initializer.
    if (typeof window.__i18nRolesUpdate === 'function' && t.roles) {
      window.__i18nRolesUpdate(t.roles);
    }

    // 10. Persist preference
    try { localStorage.setItem('portfolio_lang', lang); } catch (_) {}
    currentLang = lang;

    // 11. Re-render dynamic sections if available
    if (typeof window.renderDynamicSections === 'function') window.renderDynamicSections();
    if (typeof window.renderNowSection === 'function') window.renderNowSection();
  }

  // ── Safe initial application (DOM must be ready at this point because
  //    this script tag is at the bottom of <body>). Wrap in try-catch so
  //    that any unexpected DOM error never crashes the rest of the script.
  try {
    applyTranslations(currentLang);
  } catch (err) {
    console.warn('[i18n] Initial translation pass failed:', err);
  }

  // Expose a public API so other modules can trigger re-translation
  window.i18n = {
    apply: (lang) => { try { applyTranslations(lang); } catch (e) { console.warn('[i18n]', e); } },
    current: () => currentLang,
    toggle: () => {
      const next = currentLang === 'en' ? 'id' : 'en';
      try { applyTranslations(next); } catch (e) { console.warn('[i18n]', e); }
    },
  };

  // Expose a re-apply hook for post-Supabase dynamic content
  window.__i18nApply = () => { try { applyTranslations(currentLang); } catch (e) {} };

  // Bind language toggle button — use DOMContentLoaded as a safety net
  // (button exists in static HTML so it should already be in the DOM,
  //  but DOMContentLoaded guarantees it even if script order changes).
  function bindLangToggle() {
    const btn = document.getElementById('langToggle');
    if (!btn || btn.__i18nBound) return; // idempotent
    btn.__i18nBound = true;
    btn.addEventListener('click', () => {
      window.i18n.toggle();
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => { btn.style.transform = ''; }, 180);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bindLangToggle();
      // Second pass — catches any content rendered by DOMContentLoaded handlers
      try { applyTranslations(currentLang); } catch (e) {}
    });
  } else {
    // DOM already ready (script is at bottom of body)
    bindLangToggle();
  }
})();



// ==========================================
// 0. AI GATEWAY OVERLAY
// ==========================================
(function() {
  const GW_API_URL = "https://9-router-test-to-chatbot.vercel.app/v1/chat/completions";
  const GW_API_KEY = "portofolio-fajar";
  const SYSTEM_PROMPT = `Anda adalah asisten AI resmi untuk portofolio Fajar Budi Raharjo. Jawab HANYA dalam Bahasa Indonesia yang baku, ramah, dan profesional.

PROFIL FAJAR: Nama: Fajar Budi Raharjo | Lokasi: Jakarta | Status: Tersedia untuk proyek baru | WA: +62 813-8305-092 | Email: itsfajarbudi@gmail.com | GitHub: github.com/itsfajarbudi

KEAHLIAN: (1) DevOps & Cloud: Docker, Kubernetes, CI/CD, AWS, Linux/Windows Server. (2) Networking: Cisco, MikroTik, Firewall, VPN. (3) Full-Stack: Node.js, Python, React, HTML/CSS, MySQL, Supabase. (4) IoT & Drone & Otomatisasi.

PENGALAMAN: 5+ tahun, 20+ proyek selesai. Pendekatan end-to-end development.

CARA MENJAWAB: Jawaban harus LENGKAP, TERSTRUKTUR, gunakan list jika relevan, akhiri dengan pertanyaan lanjutan.`;

  let history = [{ role: "system", content: SYSTEM_PROMPT }];
  let waiting = false;

  function gw(id) { return document.getElementById(id); }

  const overlay    = gw('gwOverlay');
  if (!overlay) return;

  // Prevent background scrolling while overlay is open
  document.body.classList.add('gw-noscroll');

  const phOffer    = gw('phaseOffer');
  const phChat     = gw('phaseChat');
  const msgs       = gw('gwMessages');
  const inp        = gw('gwInput');
  const sendBtn    = gw('gwSend');
  const chips      = gw('gwSuggestions');

  function dismiss() {
    overlay.classList.add('gw-dismissed');
    document.body.classList.remove('gw-noscroll');
    setTimeout(() => { overlay.style.display = 'none'; }, 700);
  }

  function goChat() {
    phOffer.style.cssText = 'opacity:0;transform:translateY(-20px) scale(0.97);transition:all 0.4s ease;';
    setTimeout(() => {
      phOffer.style.display = 'none';
      phChat.classList.remove('hidden'); // Fix: remove the hidden class
      phChat.style.display = 'flex';
      phChat.style.cssText = 'display:flex;opacity:0;transform:translateY(20px);transition:all 0.45s cubic-bezier(0.16,1,0.3,1);';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        phChat.style.opacity = '1';
        phChat.style.transform = 'translateY(0)';
      }));
      setTimeout(() => addAI("Halo! Selamat datang 👋\n\nSaya adalah **AI Assistant** yang siap menjawab pertanyaan Anda seputar Fajar Budi Raharjo — seorang *DevOps & Full-Stack Engineer* dari Jakarta.\n\nAnda bisa bertanya tentang:\n- Keahlian dan teknologi yang dikuasai Fajar\n- Proyek-proyek yang telah diselesaikan\n- Sertifikat dan pencapaian profesional\n- Cara menghubungi Fajar untuk kolaborasi\n\nApa yang ingin Anda ketahui lebih dulu?", true), 600);
      setTimeout(() => inp && inp.focus(), 800);
    }, 360);
  }

  function esc(t) { const d=document.createElement('div'); d.appendChild(document.createTextNode(t)); return d.innerHTML; }

  function fmt(t) {
    let h = esc(t);
    h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
    let inList = false;
    const lines = h.split('\n').map(l => {
      if (l.trim().startsWith('- ')) { const c=l.trim().slice(2); if(!inList){inList=true;return`<ul><li>${c}</li>`;} return`<li>${c}</li>`; }
      if (inList) { inList=false; return`</ul>${l?`<p>${l}</p>`:''}`; }
      return l ? `<p>${l}</p>` : '';
    });
    if (inList) lines.push('</ul>');
    return lines.join('');
  }

  function addAI(text, skip) {
    const d=document.createElement('div'); d.className='gw-msg ai';
    d.innerHTML=`<div class="gw-msg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/></svg></div><div class="gw-bubble">${fmt(text)}</div>`;
    msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight;
    if (!skip) history.push({role:"assistant",content:text});
  }

  function addUser(text) {
    const d=document.createElement('div'); d.className='gw-msg user';
    d.innerHTML=`<div class="gw-bubble">${esc(text)}</div><div class="gw-msg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
    msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight;
  }

  function showTyping() {
    const d=document.createElement('div'); d.className='gw-msg ai'; d.id='gwTypingMsg';
    d.innerHTML=`<div class="gw-msg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/></svg></div><div class="gw-bubble gw-typing-bubble"><div class="gw-typing-dot"></div><div class="gw-typing-dot"></div><div class="gw-typing-dot"></div></div>`;
    msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight; return d;
  }

  async function send() {
    const text = inp ? inp.value.trim() : '';
    if (!text || waiting) return;
    if (chips && chips.children.length > 0) { chips.style.cssText='opacity:0;max-height:0;overflow:hidden;transition:all 0.3s ease;'; setTimeout(()=>{chips.innerHTML=''},350); }
    addUser(text);
    history.push({role:"user",content:text});
    inp.value=''; inp.disabled=true; sendBtn.disabled=true; waiting=true;
    const t=showTyping();
    try {
      const r = await fetch(GW_API_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${GW_API_KEY}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:history,temperature:0.72,max_tokens:1024})});
      if(!r.ok) throw new Error(`HTTP ${r.status}`);
      const data=await r.json();
      const reply=data.choices?.[0]?.message?.content||"Maaf, tidak ada respons.";
      t.remove(); addAI(reply);
    } catch(e) {
      console.error("GW Error:",e); t.remove();
      addAI("Maaf, saya sedang mengalami kendala koneksi ke server AI. 🔌\n\nSilakan coba lagi, atau klik *Lihat Portofolio* untuk langsung menjelajahi portofolio Fajar.");
      history.pop();
    } finally { inp.disabled=false; sendBtn.disabled=false; waiting=false; inp.focus(); }
  }

  gw('btnChooseChat').addEventListener('click', goChat);
  gw('btnGoPorto').addEventListener('click', dismiss);
  gw('btnGoPortoFromChat').addEventListener('click', dismiss);
  sendBtn.addEventListener('click', send);
  inp.addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} });
  chips.addEventListener('click', e => { const c=e.target.closest('.gw-chip'); if(c){inp.value=c.dataset.msg;send();} });

})();


// ==========================================
// 1. NAVBAR — scroll behavior & mobile menu
// ==========================================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.pageYOffset;
  sections.forEach(section => {
    const offset = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= offset && scrollY < offset + height);
    }
  });
}

// ==========================================
// 2. TYPING EFFECT — hero role text
// ==========================================
let roles = [
  'Web Developer',
  'UI/UX Enthusiast',
  'Programmer Python',
  'Analis Data',
  'Problem Solver',
];
let rIdx = 0, cIdx = 0, deleting = false;
const roleEl = document.getElementById('roleText');

// Register the i18n roles-update callback now that `roles` is declared.
// The i18n module uses this window function to safely mutate the array
// without risking a Temporal Dead Zone ReferenceError.
window.__i18nRolesUpdate = function (newRoles) {
  if (!Array.isArray(newRoles) || !newRoles.length) return;
  roles.length = 0;
  newRoles.forEach(r => roles.push(r));
  // Reset the typing cursor so the new language starts fresh
  rIdx = 0;
  cIdx = 0;
  deleting = false;
};

// Apply the stored language's roles immediately (i18n already ran but
// __i18nRolesUpdate wasn't registered yet at that point)
if (window.i18n) {
  const stored = localStorage.getItem('portfolio_lang') || 'en';
  window.i18n.apply(stored);
}

function typeEffect() {
  if (!roleEl) return;
  const currentRole = roles[rIdx] || '';

  if (!deleting) {
    roleEl.textContent = currentRole.slice(0, ++cIdx);
    if (cIdx === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    roleEl.textContent = currentRole.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 60 : 100);
}
typeEffect();


// ==========================================
// 3. SCROLL REVEAL — fade-up on scroll
// ==========================================
function addRevealClasses() {
  const targets = [
    '.about-card',
    '.skill-category',
    '.tech-pill',
    '.project-card',
    '.cert-card',
    '.section-title',
    '.section-desc',
    '.section-tag:not(.hero .section-tag)',
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i % 4 === 1) el.classList.add('reveal-delay-1');
      if (i % 4 === 2) el.classList.add('reveal-delay-2');
      if (i % 4 === 3) el.classList.add('reveal-delay-3');
    });
  });
}
addRevealClasses();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==========================================
// 4. SKILL BAR ANIMATION — animate on enter
// ==========================================
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.classList.add('animated');
        });
        skillObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ==========================================
// 5. CERTIFICATE FILTER
// ==========================================
const filterBtns = document.querySelectorAll('.cert-filter');
let certCards  = document.querySelectorAll('.cert-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    certCards.forEach(card => {
      const cat = card.dataset.cat;
      const show = filter === 'all' || cat === filter;
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      if (show) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

// ==========================================
// 6. CERTIFICATE FLIP ON CLICK
// ==========================================
certCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
  // Allow flipping back by clicking outside
  document.addEventListener('click', (e) => {
    if (!card.contains(e.target)) {
      card.classList.remove('flipped');
    }
  });
});

// ==========================================
// 7. SMOOTH SCROLL for anchor links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==========================================
// 8. COUNTER ANIMATION — hero stats
// ==========================================
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const suffix = el.textContent.replace(/[0-9]/g, '').trim();
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num').forEach(num => {
          const raw    = num.textContent;
          const digits = parseInt(raw.replace(/\D/g, ''), 10);
          const suffix = raw.replace(/[0-9]/g, '');
          animateCounter({ textContent: raw, ...num }, digits, 1200);
          // Direct animation on the element
          let count = 0;
          const interval = setInterval(() => {
            count = Math.min(count + Math.ceil(digits / 40), digits);
            num.textContent = count + suffix;
            if (count >= digits) clearInterval(interval);
          }, 30);
        });
        statsObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ==========================================
// 9. FLOATING WA BUTTON — show after scroll
// ==========================================
const floatingWa = document.getElementById('floatingWaBtn');
window.addEventListener('scroll', () => {
  if (!floatingWa) return;
  floatingWa.style.transform = window.scrollY > 300
    ? 'scale(1)'
    : 'scale(0.8)';
  floatingWa.style.opacity = window.scrollY > 300 ? '1' : '0.7';
});

// ==========================================
// 10. BENTO CARD MOUSE TRACKING GLOW
// ==========================================
const bentoCards = document.querySelectorAll('.bento-card');
bentoCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});


// ==========================================
// 11. ACTIVE SECTION highlight
// ==========================================
updateActiveNav();

// ==========================================
// 12. PAGE LOAD animation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%c🚀 Portfolio by Fajar Budi Raharjo', 
  'color:#3b82f6; font-size:14px; font-weight:bold; padding:4px 8px;');
console.log('%cBuilt with ❤️ using HTML, CSS & Vanilla JS', 
  'color:#64748b; font-size:12px;');

// ==========================================
// 13. DYNAMIC DATA FETCHING (SUPABASE)
// ==========================================
const supabaseUrl = 'https://pommiyqbrpuboehojryu.supabase.co';
const supabaseKey = 'sb_publishable_g9SRDW_5cJ2-aVeItpMtKw_huzMtgaV';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
async function fetchPortfolioData() {
    try {
        const safeFetch = (promise) => promise.then(res => res).catch(err => ({ error: err, data: null }));

        const [projRes, certRes, profRes, nowRes] = await Promise.all([
            safeFetch(supabaseClient.from('projects').select('*').order('created_at', { ascending: false })),
            safeFetch(supabaseClient.from('certificates').select('*').order('created_at', { ascending: false })),
            safeFetch(supabaseClient.from('profile').select('*').eq('id', 1).single()),
            safeFetch(supabaseClient.from('now_focus').select('*').order('sort_order', { ascending: true }))
        ]);
        
        const projects = projRes.data || [];
        const certs = certRes.data || [];
        const profile = profRes.data || null;
        window.globalNowData = nowRes.data || [];

        window.globalProfile = profile;
        window.globalProjects = projects;
        window.globalCerts = certs;

        window.renderDynamicSections = function() {
            const lang = window.i18n ? window.i18n.current() : 'en';
            
            // Render Profile
            if (window.globalProfile) {
                const p = window.globalProfile;
                if (document.getElementById('dyn-hero-title')) document.getElementById('dyn-hero-title').innerHTML = lang === 'en' ? (p.hero_title_en || p.hero_title_id || '') : (p.hero_title_id || p.hero_title_en || '');
                if (document.getElementById('dyn-hero-desc')) document.getElementById('dyn-hero-desc').innerHTML = lang === 'en' ? (p.hero_desc_en || p.hero_desc_id || '') : (p.hero_desc_id || p.hero_desc_en || '');
                if (document.getElementById('dyn-mission')) document.getElementById('dyn-mission').innerHTML = lang === 'en' ? (p.about_mission_en || p.about_mission_id || '') : (p.about_mission_id || p.about_mission_en || '');
                if (document.getElementById('dyn-approach')) document.getElementById('dyn-approach').innerHTML = lang === 'en' ? (p.about_desc_en || p.about_desc_id || '') : (p.about_desc_id || p.about_desc_en || '');
                
                if (p.avatar_url) {
                    const img = document.getElementById('dyn-profile-img');
                    if (img) img.src = p.avatar_url;
                }

                if (document.getElementById('dyn-stat-years')) document.getElementById('dyn-stat-years').innerText = p.stat_years || '';
                if (document.getElementById('dyn-stat-projects')) document.getElementById('dyn-stat-projects').innerText = p.stat_projects || '';
                
                // Update Roles (global variable)
                const roleStr = lang === 'en' ? (p.roles_en || p.roles_id || '') : (p.roles_id || p.roles_en || '');
                if (roleStr) {
                    roles = roleStr.split(',').map(r => r.trim());
                    if (window.__i18nRolesUpdate) window.__i18nRolesUpdate(roles);
                }

                // Update Social Links
                const updateLink = (id, url) => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.href = url !== '#' ? url : 'javascript:void(0)';
                        if (url === '#') { el.style.display = 'none'; } else { el.style.display = ''; }
                    }
                };
                
                updateLink('profileGithub', p.github);
                updateLink('githubLink', p.github);
                updateLink('profileLinkedin', p.linkedin);
                updateLink('linkedinLink', p.linkedin);
                updateLink('igLink', p.instagram);
                updateLink('fbLink', p.facebook);
                
                const waUrl = p.whatsapp ? `https://wa.me/${p.whatsapp}` : '#';
                updateLink('navWaBtn', waUrl);
                updateLink('heroWaBtn', waUrl);
                updateLink('contactWaBtn', waUrl);
                updateLink('footerWaLink', waUrl);
                updateLink('floatingWaBtn', waUrl);
                
                const mailUrl = p.email ? `mailto:${p.email}` : '#';
                updateLink('profileEmail', mailUrl);
                
                const emailBtn = document.getElementById('emailBtn');
                if (emailBtn) emailBtn.href = mailUrl;
            }

            // Render Projects
            const projectsGrid = document.getElementById('projectsGrid');
            if (projectsGrid && window.globalProjects) {
                projectsGrid.innerHTML = window.globalProjects.map(p => {
                    const title = lang === 'en' ? (p.title_en || p.title_id || '') : (p.title_id || p.title_en || '');
                    const desc = lang === 'en' ? (p.description_en || p.description_id || '') : (p.description_id || p.description_en || '');
                    const tagsHtml = (p.tags||'').split(',').map(tag => `<span class="ptag">${tag.trim()}</span>`).join('');
                    return `
                        <div class="project-card reveal">
                          <div class="project-img-wrap">
                            <div class="project-img-placeholder">
                              ${p.image_url ? `<img src="${p.image_url}" alt="${title}" style="width:100%;height:100%;object-fit:cover;">` : `<div style="width:100%;height:100%;background:url('hero_bg.png') center/cover;opacity:0.8;"></div>`}
                            </div>
                          </div>
                          <div class="project-info">
                            <div class="project-tags">${tagsHtml}</div>
                            <h3>${title}</h3>
                            <p>${desc}</p>
                            <div class="project-footer">
                              <span class="project-year">${p.year}</span>
                              <div class="project-links">
                                ${p.demo_link && p.demo_link !== '#' ? `<a href="${p.demo_link}" target="_blank" class="primary-link">Live Demo ↗</a>` : ''}
                                ${p.github_link && p.github_link !== '#' ? `<a href="${p.github_link}" target="_blank" class="secondary-link">Source Code ↗</a>` : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                    `;
                }).join('');
            }

            // Render Certificates
            const certsGrid = document.getElementById('certsGrid');
            if (certsGrid && window.globalCerts) {
                certsGrid.innerHTML = window.globalCerts.map(c => {
                    const title = lang === 'en' ? (c.title_en || c.title_id || '') : (c.title_id || c.title_en || '');
                    const desc = lang === 'en' ? (c.description_en || c.description_id || '') : (c.description_id || c.description_en || '');
                    const iconColor = c.category === 'programming' ? 'cert-icon-blue' : c.category === 'design' ? 'cert-icon-purple' : 'cert-icon-teal';
                    const categoryLabel = c.category ? c.category.charAt(0).toUpperCase() + c.category.slice(1) : '';
                    
                    return `
                        <div class="cert-card reveal" data-cat="${c.category}">
                          <div class="cert-card-inner">
                            <div class="cert-card-front">
                              <div class="cert-ribbon">Verified</div>
                              <div class="cert-icon-wrap">
                                <div class="cert-icon ${iconColor}">
                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                                  </svg>
                                </div>
                              </div>
                              <div class="cert-body">
                                <span class="cert-issuer">${c.issuer}</span>
                                <h4 class="cert-title">${title}</h4>
                                <div class="cert-meta">
                                  <span class="cert-date">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                    </svg>
                                    ${c.date}
                                  </span>
                                  <span class="cert-badge ${c.category}">${categoryLabel}</span>
                                </div>
                              </div>
                              <div class="cert-hover-hint">Klik untuk detail</div>
                            </div>
                            <div class="cert-card-back">
                              <h4>${title}</h4>
                              <p>${desc}</p>
                              ${c.image_url ? `<img src="${c.image_url}" alt="${title}" style="width:100%; border-radius:4px; margin-top:8px; margin-bottom:8px;">` : ''}
                              <div class="cert-back-meta">
                                <span>Penerbit: ${c.issuer}</span>
                                <span>Tanggal: ${c.date}</span>
                              </div>
                              ${c.verify_link && c.verify_link !== '#' ? `<a href="${c.verify_link}" target="_blank" class="cert-verify-btn">Verifikasi Sertifikat ↗</a>` : ''}
                            </div>
                          </div>
                        </div>
                    `;
                }).join('');
            }
            
            // Re-observe newly created reveal elements
            if (typeof revealObserver !== 'undefined') {
                const newReveals = document.querySelectorAll('#projectsGrid .reveal, #certsGrid .reveal');
                newReveals.forEach(el => revealObserver.observe(el));
            }
        };

        window.renderDynamicSections();

        // Render Now Focus Section
        window.renderNowSection = function() {
            const lang = window.i18n ? window.i18n.current() : 'en';
            const nowGrid = document.getElementById('nowFocusGrid');
            const nowTimeline = document.getElementById('nowTimelineList');
            let data = window.globalNowData || [];

            // FALLBACK DUMMY DATA (If database is empty or table doesn't exist yet)
            if (data.length === 0) {
                data = [
                    { type: 'project', badge_en: 'In Progress', badge_id: 'Sedang Berjalan', title_en: 'Current Project', title_id: 'Proyek Saat Ini', desc_en: 'Building a multi-tenant SaaS infrastructure platform with automated provisioning, real-time monitoring dashboards, and zero-downtime deployment pipelines.', desc_id: 'Membangun platform infrastruktur SaaS multi-tenant dengan provisi otomatis, dashboard monitoring real-time, dan pipeline deployment tanpa downtime.', meta_label_en: 'Impact', meta_label_id: 'Dampak', meta_value_en: 'Serves 50+ enterprise clients. Reduces deployment time by 70%.', meta_value_id: 'Melayani 50+ klien enterprise. Mengurangi waktu deployment sebesar 70%.', items_en: ['Node.js', 'Kubernetes', 'Terraform', 'Prometheus', 'React'], items_id: ['Node.js', 'Kubernetes', 'Terraform', 'Prometheus', 'React'], sort_order: 1 },
                    { type: 'learning', badge_en: 'Exploring', badge_id: 'Eksplorasi', title_en: 'Learning & R&D', title_id: 'Pembelajaran & R&D', desc_en: 'Diving deep into AI/ML Ops patterns, LLM integration architectures, and platform engineering best practices for high-scale systems.', desc_id: 'Mendalami pola AI/ML Ops, arsitektur integrasi LLM, dan praktik terbaik platform engineering untuk sistem berskala besar.', meta_label_en: null, meta_label_id: null, meta_value_en: null, meta_value_id: null, items_en: ['LLMOps & AI Infrastructure', 'Platform Engineering Patterns', 'eBPF for Network Observability', 'Rust for Systems Programming'], items_id: ['LLMOps & Infrastruktur AI', 'Pola Platform Engineering', 'eBPF untuk Observabilitas Jaringan', 'Rust untuk Pemrograman Sistem'], sort_order: 2 },
                    { type: 'reading', badge_en: 'In Progress', badge_id: 'Sedang Berjalan', title_en: 'Reading & Certifications', title_id: 'Membaca & Sertifikasi', desc_en: 'Structured learning track focused on cloud architecture and engineering leadership for senior-level growth.', desc_id: 'Jalur pembelajaran terstruktur yang berfokus pada arsitektur cloud dan kepemimpinan rekayasa untuk pertumbuhan level senior.', meta_label_en: null, meta_label_id: null, meta_value_en: null, meta_value_id: null, items_en: ['📘 | AWS Solutions Architect Pro | Certification', '📗 | Designing Data-Intensive Applications | Book', '🎓 | Engineering Management Fundamentals | Course'], items_id: ['📘 | AWS Solutions Architect Pro | Sertifikasi', '📗 | Designing Data-Intensive Applications | Buku', '🎓 | Engineering Management Fundamentals | Kursus'], sort_order: 3 },
                    { type: 'milestone', badge_en: 'Shipped', badge_id: 'Selesai', desc_en: 'Migrated core monolith to event-driven microservices architecture on Kubernetes', desc_id: 'Migrasi monolith inti ke arsitektur microservices berbasis event di Kubernetes', meta_label_en: 'June 2026', meta_label_id: 'Juni 2026', items_en: ['Kubernetes', 'gRPC', 'Kafka'], items_id: ['Kubernetes', 'gRPC', 'Kafka'], sort_order: 4 },
                    { type: 'milestone', badge_en: 'Shipped', badge_id: 'Selesai', desc_en: 'Led a cross-functional team of 5 engineers through Alpha release of naralink platform', desc_id: 'Memimpin tim lintas fungsi 5 engineer melalui rilis Alpha platform naralink', meta_label_en: 'May 2026', meta_label_id: 'Mei 2026', items_en: ['Leadership', 'Agile'], items_id: ['Leadership', 'Agile'], sort_order: 5 },
                    { type: 'milestone', badge_en: 'Shipped', badge_id: 'Selesai', desc_en: 'Implemented AI-powered anomaly detection reducing incident response time by 60%', desc_id: 'Mengimplementasikan deteksi anomali berbasis AI yang mengurangi waktu respons insiden sebesar 60%', meta_label_en: 'Apr 2026', meta_label_id: 'Apr 2026', items_en: ['AI/ML', 'Python', 'Prometheus'], items_id: ['AI/ML', 'Python', 'Prometheus'], sort_order: 6 },
                    { type: 'milestone', badge_en: 'In Progress', badge_id: 'Sedang Berjalan', desc_en: 'Enrolled in AWS Solutions Architect Professional certification path', desc_id: 'Mendaftar jalur sertifikasi AWS Solutions Architect Professional', meta_label_en: 'Mar 2026', meta_label_id: 'Mar 2026', items_en: ['AWS', 'Cloud Architecture'], items_id: ['AWS', 'Arsitektur Cloud'], sort_order: 7 },
                    { type: 'milestone', badge_en: 'Shipped', badge_id: 'Selesai', desc_en: 'Designed and deployed zero-trust network architecture for enterprise client infrastructure', desc_id: 'Merancang dan menerapkan arsitektur jaringan zero-trust untuk infrastruktur klien enterprise', meta_label_en: 'Feb 2026', meta_label_id: 'Feb 2026', items_en: ['Security', 'Zero Trust', 'VPN'], items_id: ['Keamanan', 'Zero Trust', 'VPN'], sort_order: 8 }
                ];
            }

            if (nowGrid) {
                const cards = data.filter(d => d.type !== 'milestone');
                nowGrid.innerHTML = cards.map(c => {
                    const title = lang === 'en' ? c.title_en : c.title_id;
                    const badge = lang === 'en' ? c.badge_en : c.badge_id;
                    const desc = lang === 'en' ? c.desc_en : c.desc_id;
                    const metaLabel = lang === 'en' ? c.meta_label_en : c.meta_label_id;
                    const metaValue = lang === 'en' ? c.meta_value_en : c.meta_value_id;
                    const items = lang === 'en' ? (c.items_en || []) : (c.items_id || []);
                    
                    let cardClass, iconSvg, iconWrapClass;
                    if (c.type === 'project') {
                        cardClass = 'now-card-project'; iconWrapClass = 'now-icon-blue';
                        iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
                    } else if (c.type === 'learning') {
                        cardClass = 'now-card-learning'; iconWrapClass = 'now-icon-indigo';
                        iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
                    } else {
                        cardClass = 'now-card-reading'; iconWrapClass = 'now-icon-emerald';
                        iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>';
                    }

                    let innerContent = '';
                    if (c.image_url) {
                        innerContent += `<img src="${c.image_url}" alt="Attachment" style="width:100%; border-radius:6px; margin-bottom:1rem; border: 1px solid var(--border-color);">`;
                    }
                    if (c.type === 'project') {
                        innerContent += `
                          ${metaLabel ? `<div class="now-card-meta"><span class="now-meta-label">${metaLabel}</span><p class="now-meta-value">${metaValue}</p></div>` : ''}
                          <div class="now-stack-badges">
                            ${items.map(i => `<span class="now-stack-badge">${i}</span>`).join('')}
                          </div>
                        `;
                    } else if (c.type === 'learning') {
                        const colors = ['#818cf8', '#34d399', '#60a5fa', '#f472b6'];
                        innerContent += `
                          <div class="now-learning-topics">
                            ${items.map((item, idx) => `
                              <div class="now-topic-item">
                                <span class="now-topic-dot" style="background: ${colors[idx % colors.length]};"></span>
                                <span>${item}</span>
                              </div>
                            `).join('')}
                          </div>
                        `;
                    } else if (c.type === 'reading') {
                        innerContent += `
                          <div class="now-reading-list">
                            ${items.map(item => {
                                const parts = item.split('|');
                                const emoji = parts.length > 0 ? parts[0].trim() : '📘';
                                const text = parts.length > 1 ? parts[1].trim() : item;
                                const sub = parts.length > 2 ? parts[2].trim() : '';
                                const subClass = sub.toLowerCase().includes('cert') ? 'cert' : (sub.toLowerCase().includes('course') ? 'course' : 'book');
                                return `
                                <div class="now-reading-item">
                                  <div class="now-reading-icon">${emoji}</div>
                                  <div class="now-reading-info">
                                    <span class="now-reading-title-text">${text}</span>
                                    ${sub ? `<span class="now-reading-type ${subClass}">${sub}</span>` : ''}
                                  </div>
                                </div>`;
                            }).join('')}
                          </div>
                        `;
                    }

                    return `
                        <article class="now-card ${cardClass}">
                          <div class="now-card-top">
                            <div class="now-card-icon-wrap ${iconWrapClass}">${iconSvg}</div>
                            ${badge ? `<span class="now-status-badge ${badge.toLowerCase().includes('progress') || badge.toLowerCase().includes('berjalan') ? 'now-badge-progress' : 'now-badge-exploring'}">${badge}</span>` : ''}
                          </div>
                          <h3 class="now-card-title">${title}</h3>
                          <p class="now-card-desc">${desc}</p>
                          ${innerContent}
                        </article>
                    `;
                }).join('');
            }

            if (nowTimeline) {
                const milestones = data.filter(d => d.type === 'milestone');
                const dotColors = ['green', 'blue', 'indigo', 'yellow', 'gray'];
                nowTimeline.innerHTML = milestones.map((m, idx) => {
                    const badge = lang === 'en' ? m.badge_en : m.badge_id;
                    const desc = lang === 'en' ? m.desc_en : m.desc_id;
                    const date = lang === 'en' ? m.meta_label_en : m.meta_label_id;
                    const items = lang === 'en' ? (m.items_en || []) : (m.items_id || []);
                    const color = dotColors[idx % dotColors.length];

                    return `
                      <div class="now-timeline-item" role="listitem">
                        <div class="now-tl-date">${date || ''}</div>
                        <div class="now-tl-connector">
                          <div class="now-tl-dot now-tl-dot-${color}"></div>
                          <div class="now-tl-line"></div>
                        </div>
                        <div class="now-tl-content">
                          <div class="now-tl-top">
                            <p class="now-tl-text">${desc}</p>
                            ${badge ? `<span class="now-status-badge ${badge.toLowerCase().includes('progress') || badge.toLowerCase().includes('berjalan') ? 'now-badge-progress' : 'now-badge-shipped'}">${badge}</span>` : ''}
                          </div>
                          ${items.length > 0 ? `
                          <div class="now-tl-tags">
                            ${items.map(i => `<span class="now-tl-tag">${i}</span>`).join('')}
                          </div>` : ''}
                        </div>
                      </div>
                    `;
                }).join('');
            }
            
            // Re-observe newly created reveal elements
            if (typeof revealObserver !== 'undefined') {
                const newReveals = document.querySelectorAll('#nowFocusGrid .reveal, #nowTimelineList .reveal');
                newReveals.forEach(el => revealObserver.observe(el));
            }
        };

        // Initial Render
        window.renderNowSection();

        // Re-bind certificate flip events
        const newCertCards = document.querySelectorAll('.cert-card');
        newCertCards.forEach(card => {
          card.addEventListener('click', () => { card.classList.toggle('flipped'); });
          document.addEventListener('click', (e) => {
            if (!card.contains(e.target)) card.classList.remove('flipped');
          });
        });

        // Re-bind scroll reveal for newly added elements
        document.querySelectorAll('.project-card.reveal, .cert-card.reveal').forEach((el, i) => {
          if (i % 4 === 1) el.classList.add('reveal-delay-1');
          if (i % 4 === 2) el.classList.add('reveal-delay-2');
          if (i % 4 === 3) el.classList.add('reveal-delay-3');
          revealObserver.observe(el);
        });

        // Update global certCards variable for filtering
        certCards = document.querySelectorAll('.cert-card');

        // Re-apply i18n translations to any newly rendered elements
        if (typeof window.__i18nApply === 'function') window.__i18nApply();

        // Monkey-patch the i18n toggle so Now section re-renders on language switch
        if (window.i18n && !window.i18n._nowPatched) {
            const originalToggle = window.i18n.toggle;
            window.i18n.toggle = function() {
                originalToggle.apply(this, arguments);
                if (typeof window.renderNowSection === 'function') window.renderNowSection();
            };
            window.i18n._nowPatched = true;
        }

    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

fetchPortfolioData();

// ==========================================
// 14. CHATBOT LOGIC
// ==========================================
const chatbotLauncher = document.getElementById('chatbotLauncher');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

if (chatbotLauncher && chatbotWindow) {
  // KONFIGURASI 9ROUTER API
  const NINOROUTER_API_URL = "https://9-router-test-to-chatbot.vercel.app/v1/chat/completions"; 
  const NINOROUTER_API_KEY = "portofolio-fajar";

  let conversationHistory = [
    { role: "system", content: "Anda adalah asisten AI untuk Fajar Budi Raharjo. Jawablah pertanyaan seputar portofolionya dengan ramah, profesional, dan menggunakan bahasa Indonesia." }
  ];

  chatbotLauncher.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    setTimeout(() => chatbotInput.focus(), 300);
  });

  chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
  });

  const appendMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  const showTypingIndicator = () => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ai typing-indicator-msg`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-typing';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    msgDiv.appendChild(bubble);
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return msgDiv;
  };

  const handleSend = async () => {
    const text = chatbotInput.value.trim();
    if (!text) return;
    
    appendMessage(text, 'user');
    conversationHistory.push({ role: "user", content: text });

    chatbotInput.value = '';
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;

    const typingMsg = showTypingIndicator();

    try {
      const response = await fetch(NINOROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${NINOROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model: "auto", // 9Router will auto route to Gemini
          messages: conversationHistory,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.choices[0].message.content;
      
      typingMsg.remove();
      appendMessage(aiReply, 'ai');
      conversationHistory.push({ role: "assistant", content: aiReply });

    } catch (error) {
      console.error("Chatbot API Error:", error);
      typingMsg.remove();
      appendMessage('Maaf, saya sedang tidak bisa terhubung ke server 9Router saat ini. Silakan periksa konfigurasi API Anda.', 'ai');
      // Hapus pesan user terakhir dari history agar tidak menumpuk error
      conversationHistory.pop(); 
    } finally {
      chatbotInput.disabled = false;
      chatbotSend.disabled = false;
      chatbotInput.focus();
    }
  };

  chatbotSend.addEventListener('click', handleSend);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
