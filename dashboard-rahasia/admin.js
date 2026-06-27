const supabaseUrl = window.supabaseUrl;
const supabaseKey = window.supabaseKey;
const supabaseClient = window.supabaseClient;

// --- AUTO TRANSLATION HELPER ---
async function autoTranslate(text) {
    if (!text || text.trim() === '') return '';
    try {
        const res = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=' + encodeURIComponent(text));
        const data = await res.json();
        return data[0].map(x => x[0]).join('');
    } catch (e) {
        console.error('Translation error:', e);
        return text; // fallback to original text if translation fails
    }
}
// --------------------------------

// ======================
// UPLOAD HELPER
// ======================
async function uploadFileToSupabase(fileInputId, bucketName) {
    const fileInput = document.getElementById(fileInputId);
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        return null; // No file selected
    }
    
    const file = fileInput.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabaseClient.storage.from(bucketName).upload(filePath, file);
    if (error) {
        console.error('Upload error:', error);
        throw error;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabaseClient.storage.from(bucketName).getPublicUrl(filePath);
    return publicUrlData.publicUrl;
}

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
    loadNowItems();
    loadProfile();
}

// ======================
// PROFILE
// ======================
async function loadProfile() {
    const { data: p, error } = await supabaseClient.from('profile').select('*').eq('id', 1).single();
    if (!p) return;
    
    document.getElementById('profHeroTitleId').value = p.hero_title_id || '';
    document.getElementById('profHeroTitleEn').value = p.hero_title_en || '';
    document.getElementById('profRolesId').value = p.roles_id || '';
    document.getElementById('profRolesEn').value = p.roles_en || '';
    document.getElementById('profHeroDescId').value = p.hero_desc_id || '';
    document.getElementById('profHeroDescEn').value = p.hero_desc_en || '';
    document.getElementById('profStatYears').value = p.stat_years || '';
    document.getElementById('profStatProjects').value = p.stat_projects || '';
    document.getElementById('profMissionId').value = p.about_mission_id || '';
    document.getElementById('profMissionEn').value = p.about_mission_en || '';
    document.getElementById('profApproachId').value = p.about_desc_id || '';
    document.getElementById('profApproachEn').value = p.about_desc_en || '';
    document.getElementById('profWa').value = p.whatsapp || '';
    document.getElementById('profEmail').value = p.email || '';
    document.getElementById('profGithub').value = p.github || '';
    document.getElementById('profLinkedin').value = p.linkedin || '';
    document.getElementById('profInstagram').value = p.instagram || '';
    document.getElementById('profFacebook').value = p.facebook || '';
    
    // Show avatar preview if exists
    if (p.avatar_url) {
        const preview = document.getElementById('profAvatarPreview');
        preview.src = p.avatar_url;
        preview.style.display = 'block';
    }
}

document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;

    try {
        let avatarUrl = null;
        const fileInput = document.getElementById('profAvatar');
        if (fileInput.files && fileInput.files.length > 0) {
            submitBtn.textContent = 'Mengupload Foto...';
            try {
                avatarUrl = await uploadFileToSupabase('profAvatar', 'foto_profile');
            } catch (err) {
                console.error(err);
                alert('Gagal mengupload foto profil: ' + err.message);
            }
        }

        submitBtn.textContent = 'Menerjemahkan & Menyimpan...';
        
        document.getElementById('profHeroTitleEn').value = await autoTranslate(document.getElementById('profHeroTitleId').value);
        document.getElementById('profRolesEn').value = await autoTranslate(document.getElementById('profRolesId').value);
        document.getElementById('profHeroDescEn').value = await autoTranslate(document.getElementById('profHeroDescId').value);
        document.getElementById('profMissionEn').value = await autoTranslate(document.getElementById('profMissionId').value);
        document.getElementById('profApproachEn').value = await autoTranslate(document.getElementById('profApproachId').value);

        const body = {
            hero_title_id: document.getElementById('profHeroTitleId').value,
            hero_title_en: document.getElementById('profHeroTitleEn').value,
            roles_id: document.getElementById('profRolesId').value,
            roles_en: document.getElementById('profRolesEn').value,
            hero_desc_id: document.getElementById('profHeroDescId').value,
            hero_desc_en: document.getElementById('profHeroDescEn').value,
            stat_years: document.getElementById('profStatYears').value,
            stat_projects: document.getElementById('profStatProjects').value,
            about_mission_id: document.getElementById('profMissionId').value,
            about_mission_en: document.getElementById('profMissionEn').value,
            about_desc_id: document.getElementById('profApproachId').value,
            about_desc_en: document.getElementById('profApproachEn').value,
            whatsapp: document.getElementById('profWa').value,
            email: document.getElementById('profEmail').value,
            github: document.getElementById('profGithub').value,
            linkedin: document.getElementById('profLinkedin').value,
            instagram: document.getElementById('profInstagram').value,
            facebook: document.getElementById('profFacebook').value
        };

        if (avatarUrl) {
            body.avatar_url = avatarUrl;
        }

        const { error } = await supabaseClient.from('profile').update(body).eq('id', 1);

        if (error) {
            alert('Gagal memperbarui profil: ' + error.message);
        } else {
            alert('Profil berhasil diperbarui!');
            if (avatarUrl) {
                const preview = document.getElementById('profAvatarPreview');
                preview.src = avatarUrl;
                preview.style.display = 'block';
            }
        }
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
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
            <td>${p.title_id || p.title_en || '-'}</td>
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
    
    const preview = document.getElementById('projectImagePreview');
    if (preview) {
        preview.src = '';
        preview.style.display = 'none';
    }
    const fileInput = document.getElementById('projectImageFile');
    if (fileInput) {
        delete fileInput.dataset.existingUrl;
    }
    
    if (id) {
        const p = projectsData.find(x => x.id == id);
        if (p) {
            document.getElementById('projectId').value = p.id;
            document.getElementById('projectTitleId').value = p.title_id || '';
            document.getElementById('projectTitleEn').value = p.title_en || '';
            document.getElementById('projectYear').value = p.year;
            document.getElementById('projectTags').value = p.tags;
            document.getElementById('projectDescId').value = p.description_id || '';
            document.getElementById('projectDescEn').value = p.description_en || '';
            document.getElementById('projectDemo').value = p.demo_link || '';
            document.getElementById('projectGithub').value = p.github_link || '';
            
            const preview = document.getElementById('projectImagePreview');
            if (p.image_url) {
                preview.src = p.image_url;
                preview.style.display = 'block';
                // Store old url in a dataset attribute so we don't lose it if no new file is uploaded
                document.getElementById('projectImageFile').dataset.existingUrl = p.image_url;
            } else {
                preview.style.display = 'none';
                delete document.getElementById('projectImageFile').dataset.existingUrl;
            }
            
            document.getElementById('projectModalTitle').textContent = 'Edit Proyek';
        }
    }
    document.getElementById('projectModal').classList.add('show');
}

document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;

    try {
        const id = document.getElementById('projectId').value;
        let imageUrl = document.getElementById('projectImageFile').dataset.existingUrl || null;
        
        const fileInput = document.getElementById('projectImageFile');
        if (fileInput.files && fileInput.files.length > 0) {
            submitBtn.textContent = 'Mengupload Gambar...';
            try {
                const uploadedUrl = await uploadFileToSupabase('projectImageFile', 'proyek_unggulan');
                if (uploadedUrl) imageUrl = uploadedUrl;
            } catch (err) {
                console.error(err);
                alert('Gagal mengupload gambar: ' + err.message);
                return;
            }
        }
        
        submitBtn.textContent = 'Menerjemahkan...';
        document.getElementById('projectTitleEn').value = await autoTranslate(document.getElementById('projectTitleId').value);
        document.getElementById('projectDescEn').value = await autoTranslate(document.getElementById('projectDescId').value);

        const body = {
            title_id: document.getElementById('projectTitleId').value,
            title_en: document.getElementById('projectTitleEn').value,
            year: document.getElementById('projectYear').value,
            tags: document.getElementById('projectTags').value,
            description_id: document.getElementById('projectDescId').value,
            description_en: document.getElementById('projectDescEn').value,
            image_url: imageUrl,
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
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
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
            <td>${c.title_id || c.title_en || '-'}</td>
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
    
    const preview = document.getElementById('certImagePreview');
    if (preview) {
        preview.src = '';
        preview.style.display = 'none';
    }
    const fileInput = document.getElementById('certImageFile');
    if (fileInput) {
        delete fileInput.dataset.existingUrl;
    }
    
    if (id) {
        const c = certsData.find(x => x.id == id);
        if (c) {
            document.getElementById('certId').value = c.id;
            document.getElementById('certTitleId').value = c.title_id || '';
            document.getElementById('certTitleEn').value = c.title_en || '';
            document.getElementById('certIssuer').value = c.issuer;
            document.getElementById('certCategory').value = c.category;
            document.getElementById('certDate').value = c.date;
            document.getElementById('certDescId').value = c.description_id || '';
            document.getElementById('certDescEn').value = c.description_en || '';
            document.getElementById('certVerifyLink').value = c.verify_link || '';
            
            const preview = document.getElementById('certImagePreview');
            if (c.image_url) {
                preview.src = c.image_url;
                preview.style.display = 'block';
                document.getElementById('certImageFile').dataset.existingUrl = c.image_url;
            } else {
                preview.style.display = 'none';
                delete document.getElementById('certImageFile').dataset.existingUrl;
            }
            
            document.getElementById('certModalTitle').textContent = 'Edit Sertifikat';
        }
    }
    document.getElementById('certModal').classList.add('show');
}

document.getElementById('certForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;

    try {
        const id = document.getElementById('certId').value;
        let imageUrl = document.getElementById('certImageFile').dataset.existingUrl || null;
        
        const fileInput = document.getElementById('certImageFile');
        if (fileInput.files && fileInput.files.length > 0) {
            submitBtn.textContent = 'Mengupload Sertifikat...';
            try {
                const uploadedUrl = await uploadFileToSupabase('certImageFile', 'sertifikat_dan_penghargaan');
                if (uploadedUrl) imageUrl = uploadedUrl;
            } catch (err) {
                console.error(err);
                alert('Gagal mengupload sertifikat: ' + err.message);
                return;
            }
        }
        
        submitBtn.textContent = 'Menerjemahkan...';
        document.getElementById('certTitleEn').value = await autoTranslate(document.getElementById('certTitleId').value);
        document.getElementById('certDescEn').value = await autoTranslate(document.getElementById('certDescId').value);

        const body = {
            title_id: document.getElementById('certTitleId').value,
            title_en: document.getElementById('certTitleEn').value,
            issuer: document.getElementById('certIssuer').value,
            category: document.getElementById('certCategory').value,
            date: document.getElementById('certDate').value,
            description_id: document.getElementById('certDescId').value,
            description_en: document.getElementById('certDescEn').value,
            verify_link: document.getElementById('certVerifyLink').value,
            image_url: imageUrl
        };

        if (id) {
            await supabaseClient.from('certificates').update(body).eq('id', id);
        } else {
            await supabaseClient.from('certificates').insert([body]);
        }
        closeModal('certModal');
        loadCertificates();
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

async function deleteCert(id) {
    if (confirm('Yakin ingin menghapus sertifikat ini?')) {
        await supabaseClient.from('certificates').delete().eq('id', id);
        loadCertificates();
    }
}

// ======================
// NOW PAGE ITEMS
// ======================
let nowData = [];

async function loadNowItems() {
    const { data } = await supabaseClient.from('now_focus').select('*').order('sort_order', { ascending: true });
    nowData = data || [];
    renderNowItems();
}

function renderNowItems() {
    const tbody = document.querySelector('#nowTable tbody');
    tbody.innerHTML = '';
    nowData.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span style="text-transform: capitalize; background: #e0e7ff; color: #3730a3; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">${item.type}</span></td>
            <td>${item.title_en}</td>
            <td>${item.badge_en || '-'}</td>
            <td>${item.sort_order}</td>
            <td class="action-cell">
                <button class="btn btn-edit" onclick="editNow(${item.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteNow(${item.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showNowModal(id = null) {
    document.getElementById('nowForm').reset();
    document.getElementById('nowId').value = '';
    document.getElementById('nowModalTitle').textContent = 'Tambah Item Now';
    
    const preview = document.getElementById('nowImagePreview');
    if (preview) {
        preview.src = '';
        preview.style.display = 'none';
    }
    const fileInput = document.getElementById('nowImageFile');
    if (fileInput) {
        delete fileInput.dataset.existingUrl;
    }
    
    if (id) {
        const item = nowData.find(x => x.id == id);
        if (item) {
            document.getElementById('nowId').value = item.id;
            document.getElementById('nowType').value = item.type;
            
            document.getElementById('nowBadgeEn').value = item.badge_en || '';
            document.getElementById('nowTitleEn').value = item.title_en || '';
            document.getElementById('nowDescEn').value = item.desc_en || '';
            document.getElementById('nowMetaLabelEn').value = item.meta_label_en || '';
            document.getElementById('nowMetaValueEn').value = item.meta_value_en || '';
            document.getElementById('nowItemsEn').value = (item.items_en || []).join(', ');
            
            document.getElementById('nowBadgeId').value = item.badge_id || '';
            document.getElementById('nowTitleId').value = item.title_id || '';
            document.getElementById('nowDescId').value = item.desc_id || '';
            document.getElementById('nowMetaLabelId').value = item.meta_label_id || '';
            document.getElementById('nowMetaValueId').value = item.meta_value_id || '';
            document.getElementById('nowItemsId').value = (item.items_id || []).join(', ');
            
            const preview = document.getElementById('nowImagePreview');
            if (item.image_url) {
                preview.src = item.image_url;
                preview.style.display = 'block';
                document.getElementById('nowImageFile').dataset.existingUrl = item.image_url;
            } else {
                preview.style.display = 'none';
                delete document.getElementById('nowImageFile').dataset.existingUrl;
            }
            
            document.getElementById('nowSortOrder').value = item.sort_order || 0;
            
            document.getElementById('nowModalTitle').textContent = 'Edit Item Now';
        }
    }
    document.getElementById('nowModal').classList.add('show');
}

document.getElementById('nowForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Menyimpan...';
    submitBtn.disabled = true;

    try {
        const id = document.getElementById('nowId').value;
        let imageUrl = document.getElementById('nowImageFile').dataset.existingUrl || null;

        const fileInput = document.getElementById('nowImageFile');
        if (fileInput.files && fileInput.files.length > 0) {
            submitBtn.textContent = 'Mengupload Gambar...';
            try {
                const uploadedUrl = await uploadFileToSupabase('nowImageFile', 'now_focus');
                if (uploadedUrl) imageUrl = uploadedUrl;
            } catch (err) {
                console.error(err);
                alert('Gagal mengupload gambar now focus: ' + err.message);
                return;
            }
        }

        const isEdit = document.getElementById('nowId').value !== '';
        
        submitBtn.textContent = 'Menerjemahkan...';
        document.getElementById('nowTitleEn').value = await autoTranslate(document.getElementById('nowTitleId').value);
        document.getElementById('nowDescEn').value = await autoTranslate(document.getElementById('nowDescId').value);
        document.getElementById('nowBadgeEn').value = await autoTranslate(document.getElementById('nowBadgeId').value);
        document.getElementById('nowMetaLabelEn').value = await autoTranslate(document.getElementById('nowMetaLabelId').value);
        document.getElementById('nowMetaValueEn').value = await autoTranslate(document.getElementById('nowMetaValueId').value);
        document.getElementById('nowItemsEn').value = document.getElementById('nowItemsId').value;

        // Helper to parse comma separated string to JSON array
        const parseItems = (str) => str ? str.split(',').map(s => s.trim()).filter(s => s) : [];

        const body = {
            type: document.getElementById('nowType').value,
            badge_en: document.getElementById('nowBadgeEn').value,
            title_en: document.getElementById('nowTitleEn').value,
            desc_en: document.getElementById('nowDescEn').value,
            meta_label_en: document.getElementById('nowMetaLabelEn').value,
            meta_value_en: document.getElementById('nowMetaValueEn').value,
            items_en: parseItems(document.getElementById('nowItemsEn').value),
            
            badge_id: document.getElementById('nowBadgeId').value,
            title_id: document.getElementById('nowTitleId').value,
            desc_id: document.getElementById('nowDescId').value,
            meta_label_id: document.getElementById('nowMetaLabelId').value,
            meta_value_id: document.getElementById('nowMetaValueId').value,
            items_id: parseItems(document.getElementById('nowItemsId').value),
            
            sort_order: parseInt(document.getElementById('nowSortOrder').value) || 0,
            image_url: imageUrl
        };

        if (id) {
            await supabaseClient.from('now_focus').update(body).eq('id', id);
        } else {
            await supabaseClient.from('now_focus').insert([body]);
        }
        closeModal('nowModal');
        loadNowItems();
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

async function deleteNow(id) {
    if (confirm('Yakin ingin menghapus item Now ini?')) {
        await supabaseClient.from('now_focus').delete().eq('id', id);
        loadNowItems();
    }
}

// Utils
function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

function editProject(id) { showProjectModal(id); }
function editCert(id) { showCertModal(id); }
function editNow(id) { showNowModal(id); }

// Initialize
init();
