/* =============================================
   PORTFOLIO JAVASCRIPT
   Interactions, Animations, & Dynamic Features
   ============================================= */

'use strict';

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

  const phOffer    = gw('phaseOffer');
  const phChat     = gw('phaseChat');
  const msgs       = gw('gwMessages');
  const inp        = gw('gwInput');
  const sendBtn    = gw('gwSend');
  const chips      = gw('gwSuggestions');

  function dismiss() {
    overlay.classList.add('gw-dismissed');
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
  'Python Programmer',
  'Data Analyst',
  'Problem Solver',
];
let rIdx = 0, cIdx = 0, deleting = false;
const roleEl = document.getElementById('roleText');

function typeEffect() {
  const currentRole = roles[rIdx];

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
        const [projRes, certRes, profRes] = await Promise.all([
            supabaseClient.from('projects').select('*').order('created_at', { ascending: false }),
            supabaseClient.from('certificates').select('*').order('created_at', { ascending: false }),
            supabaseClient.from('profile').select('*').eq('id', 1).single()
        ]);
        
        const projects = projRes.data || [];
        const certs = certRes.data || [];
        const profile = profRes.data || null;

        // Render Profile
        if (profile) {
            if (document.getElementById('dyn-hero-title')) document.getElementById('dyn-hero-title').innerHTML = profile.hero_title;
            if (document.getElementById('dyn-hero-desc')) document.getElementById('dyn-hero-desc').innerHTML = profile.hero_desc;
            if (document.getElementById('dyn-stat-years')) document.getElementById('dyn-stat-years').innerText = profile.stat_years;
            if (document.getElementById('dyn-stat-projects')) document.getElementById('dyn-stat-projects').innerText = profile.stat_projects;
            if (document.getElementById('dyn-mission')) document.getElementById('dyn-mission').innerHTML = profile.about_mission;
            if (document.getElementById('dyn-approach')) document.getElementById('dyn-approach').innerHTML = profile.about_desc;
            
            // Update Roles (global variable)
            if (profile.roles) {
                roles = profile.roles.split(',').map(r => r.trim());
            }

            // Update Social Links
            const updateLink = (id, url) => {
                const el = document.getElementById(id);
                if (el) {
                    el.href = url !== '#' ? url : 'javascript:void(0)';
                    if (url === '#') { el.style.display = 'none'; } else { el.style.display = ''; }
                }
            };
            
            updateLink('profileGithub', profile.github);
            updateLink('githubLink', profile.github);
            updateLink('profileLinkedin', profile.linkedin);
            updateLink('linkedinLink', profile.linkedin);
            updateLink('igLink', profile.instagram);
            updateLink('fbLink', profile.facebook);
            
            const waUrl = profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : '#';
            updateLink('navWaBtn', waUrl);
            updateLink('heroWaBtn', waUrl);
            updateLink('contactWaBtn', waUrl);
            updateLink('footerWaLink', waUrl);
            updateLink('floatingWaBtn', waUrl);
            
            const mailUrl = profile.email ? `mailto:${profile.email}` : '#';
            updateLink('profileEmail', mailUrl);
            
            const emailBtn = document.getElementById('emailBtn');
            if (emailBtn) emailBtn.href = mailUrl;
        }

        // Render Projects
        const projectsGrid = document.getElementById('projectsGrid');
        if (projectsGrid) {
            projectsGrid.innerHTML = projects.map(p => {
                const tagsHtml = p.tags.split(',').map(tag => `<span class="ptag">${tag.trim()}</span>`).join('');
                return `
                    <div class="project-card reveal">
                      <div class="project-img-wrap">
                        <div class="project-img-placeholder">
                          ${p.image_url ? `<img src="${p.image_url}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;">` : `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>`}
                        </div>
                        <div class="project-overlay">
                          ${p.demo_link && p.demo_link !== '#' ? `<a href="${p.demo_link}" target="_blank" class="project-link-btn">Live Demo</a>` : ''}
                          ${p.github_link && p.github_link !== '#' ? `<a href="${p.github_link}" target="_blank" class="project-link-btn outline">Source Code</a>` : ''}
                        </div>
                      </div>
                      <div class="project-info">
                        <div class="project-tags">${tagsHtml}</div>
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        <div class="project-footer">
                          <span class="project-year">${p.year}</span>
                          <div class="project-links">
                            ${p.demo_link && p.demo_link !== '#' ? `<a href="${p.demo_link}" target="_blank">↗ Demo</a>` : ''}
                            ${p.github_link && p.github_link !== '#' ? `<a href="${p.github_link}" target="_blank">↗ GitHub</a>` : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                `;
            }).join('');
        }

        // Render Certificates
        const certsGrid = document.getElementById('certsGrid');
        if (certsGrid) {
            certsGrid.innerHTML = certs.map(c => {
                const iconColor = c.category === 'programming' ? 'cert-icon-blue' : c.category === 'design' ? 'cert-icon-purple' : 'cert-icon-teal';
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
                            <h4 class="cert-title">${c.title}</h4>
                            <div class="cert-meta">
                              <span class="cert-date">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                ${c.date}
                              </span>
                              <span class="cert-badge ${c.category}">${c.category.charAt(0).toUpperCase() + c.category.slice(1)}</span>
                            </div>
                          </div>
                          <div class="cert-hover-hint">Klik untuk detail</div>
                        </div>
                        <div class="cert-card-back">
                          <h4>${c.title}</h4>
                          <p>${c.description}</p>
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
  // Ganti URL di bawah ini dengan URL Vercel 9Router Anda.
  // Contoh: "https://9router-backend-xxx.vercel.app/v1/chat/completions"
  // API Key tidak wajib — server.js tidak memvalidasi auth.
  const NINOROUTER_API_URL = "https://9-router-test-to-chatbot.vercel.app/v1/chat/completions";
  const NINOROUTER_API_KEY = "portofolio-fajar"; // Tidak divalidasi server, bisa diisi apa saja

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
          model: "gpt-3.5-turbo", // Atau model spesifik di 9Router Anda
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
