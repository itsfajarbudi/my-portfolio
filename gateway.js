/* =============================================
   AI GATEWAY — JavaScript Logic
   ============================================= */

'use strict';

// ==========================================
// CONFIG — 9Router API
// ==========================================
// Ganti URL di bawah ini dengan URL Vercel 9Router Anda.
// Contoh: "https://9router-backend-xxx.vercel.app/v1/chat/completions"
// API Key tidak wajib diisi karena server.js tidak memvalidasi auth.
const ROUTER_API_URL = "https://9-router-test-to-chatbot.vercel.app/v1/chat/completions";
const ROUTER_API_KEY = "portofolio-fajar"; // Tidak divalidasi server, bisa diisi apa saja
const PORTFOLIO_URL  = "index.html";

// System prompt yang detail tentang Fajar
const SYSTEM_PROMPT = `Anda adalah asisten AI resmi untuk portofolio Fajar Budi Raharjo. 
Nama Anda adalah "AI Assistant Fajar". Jawab HANYA dalam Bahasa Indonesia yang baku, ramah, dan profesional.

--- PROFIL LENGKAP FAJAR ---
Nama: Fajar Budi Raharjo
Lokasi: Jakarta, Indonesia
Status: Tersedia untuk proyek baru (Freelance & Full-time)
Kontak: WhatsApp +62 813-8305-092 | Email: itsfajarbudi@gmail.com
GitHub: https://github.com/itsfajarbudi

--- KEAHLIAN UTAMA ---
1. DevOps & Cloud:
   - Docker & Kubernetes (container orchestration)
   - CI/CD Pipelines (GitHub Actions, Jenkins)
   - AWS Cloud Infrastructure
   - Linux & Windows Server Administration

2. Networking & Security:
   - Cisco & MikroTik (routing, switching, konfigurasi jaringan)
   - Firewall & VPN (keamanan jaringan)
   - Network monitoring & troubleshooting
   - Sertifikasi Cisco (CCNA level)

3. Full-Stack Development:
   - Backend: Node.js, Python, PHP
   - Frontend: React, HTML/CSS, JavaScript
   - Database: MySQL, PostgreSQL, MongoDB, Supabase
   - REST API & Websocket

4. IoT & Inovasi:
   - Integrasi perangkat IoT
   - Teknologi drone
   - Sistem otomatisasi

--- PENGALAMAN & PENCAPAIAN ---
- 5+ tahun pengalaman di bidang IT
- 20+ proyek diselesaikan
- Keahlian lintas domain: network, server, web, cloud, IoT
- Pendekatan: end-to-end development & arsitektur yang skalabel

--- KEPRIBADIAN & NILAI ---
- Problem Solver: Selalu mencari solusi terbaik dan paling efisien
- Detail Oriented: Memastikan setiap komponen bekerja dengan sempurna
- Team Player: Kolaboratif dan komunikatif
- Learning AI Engineer: Aktif mengeksplorasi dan mengintegrasikan teknologi AI

--- CARA MENJAWAB ---
- Jawaban harus LENGKAP, TERSTRUKTUR, dan INFORMATIF
- Gunakan paragraf yang jelas dan terorganisir
- Jika relevan, gunakan format daftar (list) untuk kejelasan
- Sertakan konteks dan penjelasan yang cukup agar mudah dipahami
- Jika ditanya cara menghubungi Fajar, berikan informasi kontak yang lengkap
- Jika pertanyaan di luar konteks portofolio Fajar, alihkan kembali dengan sopan
- Akhiri jawaban panjang dengan ajakan/pertanyaan lanjutan yang relevan`;

// ==========================================
// STATE & DOM REFERENCES
// ==========================================
let conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
let isWaitingResponse = false;

const phaseOffer    = document.getElementById('phaseOffer');
const phaseChat     = document.getElementById('phaseChat');
const gwMessages    = document.getElementById('gwMessages');
const gwInput       = document.getElementById('gwInput');
const gwSend        = document.getElementById('gwSend');
const gwSuggestions = document.getElementById('gwSuggestions');
const gwTransition  = document.getElementById('gwTransition');
const btnChooseChat = document.getElementById('btnChooseChat');
const btnGoPorto    = document.getElementById('btnGoPorto');
const btnGoPortoFromChat = document.getElementById('btnGoPortoFromChat');

// ==========================================
// PHASE TRANSITIONS
// ==========================================

/** Tampilkan fase chat setelah klik "Bicara dengan AI" */
function enterChatPhase() {
  phaseOffer.style.opacity = '0';
  phaseOffer.style.transform = 'translateY(-24px) scale(0.97)';
  phaseOffer.style.transition = 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)';

  setTimeout(() => {
    phaseOffer.classList.add('hidden');
    phaseChat.classList.remove('hidden');
    phaseChat.style.opacity = '0';
    phaseChat.style.transform = 'translateY(24px)';
    phaseChat.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        phaseChat.style.opacity = '1';
        phaseChat.style.transform = 'translateY(0)';
      });
    });

    // Kirim pesan sambutan AI setelah masuk chat
    setTimeout(() => {
      appendAIMessage(getWelcomeMessage(), true);
    }, 600);

    setTimeout(() => gwInput.focus(), 800);
  }, 420);
}

/** Navigasi ke portofolio dengan transisi loading */
function goToPortfolio() {
  gwTransition.classList.add('active');
  const fill = gwTransition.querySelector('.gw-transition-fill');

  // Animasi progress bar
  let progress = 0;
  const interval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18 + 6, 90);
    fill.style.width = progress + '%';
  }, 80);

  setTimeout(() => {
    clearInterval(interval);
    fill.style.width = '100%';
    setTimeout(() => {
      window.location.href = PORTFOLIO_URL;
    }, 300);
  }, 900);
}

// ==========================================
// WELCOME MESSAGE
// ==========================================
function getWelcomeMessage() {
  const greetings = [
    "Halo! Selamat datang 👋\n\nSaya adalah **AI Assistant** yang siap menjawab pertanyaan Anda seputar Fajar Budi Raharjo — seorang *DevOps & Full-Stack Engineer* dari Jakarta.\n\nAnda bisa bertanya tentang:\n- Keahlian dan teknologi yang dikuasai Fajar\n- Proyek-proyek yang telah diselesaikan\n- Sertifikat dan pencapaian profesional\n- Cara menghubungi Fajar untuk kolaborasi\n\nApa yang ingin Anda ketahui lebih dulu?",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

// ==========================================
// CHAT RENDERING
// ==========================================

/**
 * Render pesan AI dengan format markdown sederhana
 * @param {string} text - Raw text dari AI
 * @param {boolean} skipHistory - Jika true, tidak masuk ke conversationHistory
 */
function appendAIMessage(text, skipHistory = false) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'gw-msg ai';
  msgDiv.innerHTML = `
    <div class="gw-msg-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/>
        <path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>
      </svg>
    </div>
    <div class="gw-bubble">${formatAIText(text)}</div>
  `;
  gwMessages.appendChild(msgDiv);
  scrollToBottom();

  if (!skipHistory) {
    conversationHistory.push({ role: "assistant", content: text });
  }
}

/** Render pesan user */
function appendUserMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'gw-msg user';
  msgDiv.innerHTML = `
    <div class="gw-bubble">${escapeHtml(text)}</div>
    <div class="gw-msg-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
  `;
  gwMessages.appendChild(msgDiv);
  scrollToBottom();
}

/** Tampilkan indikator mengetik */
function showTypingIndicator() {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'gw-msg ai';
  msgDiv.id = 'gwTypingMsg';
  msgDiv.innerHTML = `
    <div class="gw-msg-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/>
        <path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>
      </svg>
    </div>
    <div class="gw-bubble gw-typing-bubble">
      <div class="gw-typing-dot"></div>
      <div class="gw-typing-dot"></div>
      <div class="gw-typing-dot"></div>
    </div>
  `;
  gwMessages.appendChild(msgDiv);
  scrollToBottom();
  return msgDiv;
}

/** Format teks AI: bold, italic, newlines, list */
function formatAIText(text) {
  // Escape HTML terlebih dahulu
  let html = escapeHtml(text);

  // Format: **bold** → <strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Format: *italic* → <em>
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Format list sederhana: baris mulai dengan "- "
  const lines = html.split('\n');
  let inList = false;
  const processedLines = lines.map((line, i) => {
    if (line.trim().startsWith('- ')) {
      const content = line.trim().slice(2);
      if (!inList) { inList = true; return `<ul><li>${content}</li>`; }
      return `<li>${content}</li>`;
    } else {
      if (inList) { inList = false; return `</ul>${line ? `<p>${line}</p>` : ''}`; }
      return line ? `<p>${line}</p>` : '';
    }
  });
  if (inList) { processedLines.push('</ul>'); }

  return processedLines.join('');
}

/** Escape HTML untuk keamanan */
function escapeHtml(text) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(text));
  return d.innerHTML;
}

/** Scroll ke bawah pesan */
function scrollToBottom() {
  requestAnimationFrame(() => {
    gwMessages.scrollTop = gwMessages.scrollHeight;
  });
}

// ==========================================
// SEND MESSAGE TO AI
// ==========================================
async function handleSend() {
  const text = gwInput.value.trim();
  if (!text || isWaitingResponse) return;

  // Sembunyikan suggestion chips setelah interaksi pertama
  if (gwSuggestions.children.length > 0) {
    gwSuggestions.style.transition = 'opacity 0.3s ease, max-height 0.4s ease';
    gwSuggestions.style.opacity = '0';
    gwSuggestions.style.maxHeight = '0';
    gwSuggestions.style.overflow = 'hidden';
    setTimeout(() => gwSuggestions.innerHTML = '', 400);
  }

  appendUserMessage(text);
  conversationHistory.push({ role: "user", content: text });

  gwInput.value = '';
  gwInput.disabled = true;
  gwSend.disabled = true;
  isWaitingResponse = true;

  const typingMsg = showTypingIndicator();

  try {
    const response = await fetch(ROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
        temperature: 0.72,
        max_tokens: 1024,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Maaf, saya tidak mendapatkan respons yang valid.";

    typingMsg.remove();
    appendAIMessage(aiReply);

  } catch (error) {
    console.error("Gateway AI Error:", error);
    typingMsg.remove();
    appendAIMessage(
      "Maaf, saya sedang mengalami kendala koneksi ke server AI saat ini. 🔌\n\nBeberapa kemungkinan penyebab:\n- Server 9Router belum aktif\n- API Key belum dikonfigurasi\n- Masalah jaringan sementara\n\nSilakan coba lagi sebentar, atau langsung kunjungi portofolio Fajar untuk informasi lengkap.",
      false
    );
    // Hapus pesan user yang error dari history
    conversationHistory.pop();
  } finally {
    gwInput.disabled = false;
    gwSend.disabled = false;
    isWaitingResponse = false;
    gwInput.focus();
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

/** Klik "Bicara dengan AI" */
btnChooseChat.addEventListener('click', enterChatPhase);

/** Klik "Lihat Portofolio" dari halaman offer */
btnGoPorto.addEventListener('click', goToPortfolio);

/** Klik "Lihat Portofolio" dari header chat */
btnGoPortoFromChat.addEventListener('click', goToPortfolio);

/** Klik tombol Send */
gwSend.addEventListener('click', handleSend);

/** Enter di input */
gwInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

/** Quick suggestion chips */
gwSuggestions.addEventListener('click', (e) => {
  const chip = e.target.closest('.gw-chip');
  if (chip) {
    gwInput.value = chip.dataset.msg;
    handleSend();
  }
});

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Animasi masuk
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  });
});

console.log('%c🤖 AI Gateway — Fajar BR.', 'color:#3b82f6; font-size:14px; font-weight:bold;');
console.log('%cPowered by 9Router AI Proxy', 'color:#38bdf8; font-size:11px;');
