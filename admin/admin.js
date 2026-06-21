const supabaseUrl = 'https://pommiyqbrpuboehojryu.supabase.co';
const supabaseKey = 'sb_publishable_g9SRDW_5cJ2-aVeItpMtKw_huzMtgaV';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('login-error');
const logoutBtn = document.getElementById('logoutBtn');

const navBtns = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.content-section');

// Init
async function init() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        showDashboard();
    } else {
        showLogin();
    }
}

// Navigation
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        navBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const targetId = e.target.getAttribute('data-target');
        views.forEach(view => {
            if (view.id === targetId) {
                view.classList.remove('hidden');
            } else {
                view.classList.add('hidden');
            }
        });
    });
});

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value; // Supabase uses email
    const password = document.getElementById('password').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        errorMsg.textContent = 'Login gagal: Periksa kembali email dan password Anda.';
    } else {
        showDashboard();
    }
});

logoutBtn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    showLogin();
});

function showLogin() {
    loginScreen.classList.remove('hidden');
    dashboardScreen.classList.add('hidden');
}

function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
    loadProjects();
    loadCertificates();
    loadProfile();
}

// ======================
// PROFILE
// ======================
async function loadProfile() {
    const { data: p, error } = await supabaseClient.from('profile').select('*').eq('id', 1).single();
    if (!p) return;
    
    document.getElementById('profHeroTitle').value = p.hero_title || '';
    document.getElementById('profRoles').value = p.roles || '';
    document.getElementById('profHeroDesc').value = p.hero_desc || '';
    document.getElementById('profStatYears').value = p.stat_years || '';
    document.getElementById('profStatProjects').value = p.stat_projects || '';
    document.getElementById('profMission').value = p.about_mission || '';
    document.getElementById('profApproach').value = p.about_desc || '';
    document.getElementById('profWa').value = p.whatsapp || '';
    document.getElementById('profEmail').value = p.email || '';
    document.getElementById('profGithub').value = p.github || '';
    document.getElementById('profLinkedin').value = p.linkedin || '';
    document.getElementById('profInstagram').value = p.instagram || '';
    document.getElementById('profFacebook').value = p.facebook || '';
}

document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        hero_title: document.getElementById('profHeroTitle').value,
        roles: document.getElementById('profRoles').value,
        hero_desc: document.getElementById('profHeroDesc').value,
        stat_years: document.getElementById('profStatYears').value,
        stat_projects: document.getElementById('profStatProjects').value,
        about_mission: document.getElementById('profMission').value,
        about_desc: document.getElementById('profApproach').value,
        whatsapp: document.getElementById('profWa').value,
        email: document.getElementById('profEmail').value,
        github: document.getElementById('profGithub').value,
        linkedin: document.getElementById('profLinkedin').value,
        instagram: document.getElementById('profInstagram').value,
        facebook: document.getElementById('profFacebook').value
    };

    const { error } = await supabaseClient.from('profile').update(body).eq('id', 1);

    if (error) {
        alert('Gagal memperbarui profil: ' + error.message);
    } else {
        alert('Profil berhasil diperbarui!');
    }
});

// ======================
// PROJECTS
// ======================
let projectsData = [];

async function loadProjects() {
    const { data } = await supabaseClient.from('projects').select('*').order('created_at', { ascending: false });
    projectsData = data || [];
    renderProjects();
}

function renderProjects() {
    const tbody = document.querySelector('#projectsTable tbody');
    tbody.innerHTML = '';
    projectsData.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.title}</td>
            <td>${p.year}</td>
            <td>${p.tags}</td>
            <td class="action-cell">
                <button class="btn btn-edit" onclick="editProject(${p.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProject(${p.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showProjectModal(id = null) {
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    document.getElementById('projectModalTitle').textContent = 'Tambah Proyek';
    
    if (id) {
        const p = projectsData.find(x => x.id === id);
        if (p) {
            document.getElementById('projectId').value = p.id;
            document.getElementById('projectTitle').value = p.title;
            document.getElementById('projectYear').value = p.year;
            document.getElementById('projectTags').value = p.tags;
            document.getElementById('projectDesc').value = p.description;
            document.getElementById('projectDemo').value = p.demo_link || '';
            document.getElementById('projectGithub').value = p.github_link || '';
            document.getElementById('projectModalTitle').textContent = 'Edit Proyek';
        }
    }
    document.getElementById('projectModal').classList.add('show');
}

document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('projectId').value;
    const body = {
        title: document.getElementById('projectTitle').value,
        year: document.getElementById('projectYear').value,
        tags: document.getElementById('projectTags').value,
        description: document.getElementById('projectDesc').value,
        image_url: '', // simplify for now
        demo_link: document.getElementById('projectDemo').value,
        github_link: document.getElementById('projectGithub').value
    };

    if (id) {
        await supabaseClient.from('projects').update(body).eq('id', id);
    } else {
        await supabaseClient.from('projects').insert([body]);
    }
    closeModal('projectModal');
    loadProjects();
});

async function deleteProject(id) {
    if (confirm('Yakin ingin menghapus proyek ini?')) {
        await supabaseClient.from('projects').delete().eq('id', id);
        loadProjects();
    }
}

// ======================
// CERTIFICATES
// ======================
let certsData = [];

async function loadCertificates() {
    const { data } = await supabaseClient.from('certificates').select('*').order('created_at', { ascending: false });
    certsData = data || [];
    renderCertificates();
}

function renderCertificates() {
    const tbody = document.querySelector('#certificatesTable tbody');
    tbody.innerHTML = '';
    certsData.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.title}</td>
            <td>${c.issuer}</td>
            <td>${c.category}</td>
            <td>${c.date}</td>
            <td class="action-cell">
                <button class="btn btn-edit" onclick="editCert(${c.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteCert(${c.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showCertModal(id = null) {
    document.getElementById('certForm').reset();
    document.getElementById('certId').value = '';
    document.getElementById('certModalTitle').textContent = 'Tambah Sertifikat';
    
    if (id) {
        const c = certsData.find(x => x.id === id);
        if (c) {
            document.getElementById('certId').value = c.id;
            document.getElementById('certTitle').value = c.title;
            document.getElementById('certIssuer').value = c.issuer;
            document.getElementById('certCategory').value = c.category;
            document.getElementById('certDate').value = c.date;
            document.getElementById('certDesc').value = c.description;
            document.getElementById('certLink').value = c.verify_link || '';
            document.getElementById('certModalTitle').textContent = 'Edit Sertifikat';
        }
    }
    document.getElementById('certModal').classList.add('show');
}

document.getElementById('certForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('certId').value;
    const body = {
        title: document.getElementById('certTitle').value,
        issuer: document.getElementById('certIssuer').value,
        category: document.getElementById('certCategory').value,
        date: document.getElementById('certDate').value,
        description: document.getElementById('certDesc').value,
        verify_link: document.getElementById('certLink').value
    };

    if (id) {
        await supabaseClient.from('certificates').update(body).eq('id', id);
    } else {
        await supabaseClient.from('certificates').insert([body]);
    }
    closeModal('certModal');
    loadCertificates();
});

async function deleteCert(id) {
    if (confirm('Yakin ingin menghapus sertifikat ini?')) {
        await supabaseClient.from('certificates').delete().eq('id', id);
        loadCertificates();
    }
}

// Utils
function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

function editProject(id) { showProjectModal(id); }
function editCert(id) { showCertModal(id); }

// Initialize
init();
