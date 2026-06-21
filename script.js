/* =============================================
   PORTFOLIO JAVASCRIPT
   Interactions, Animations, & Dynamic Features
   ============================================= */

'use strict';

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
const roles = [
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
