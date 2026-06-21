const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'rahasia_super_aman_123';

app.use(cors());
app.use(express.json());

// Serve static files from the root directory (so index.html, css, js work)
app.use(express.static(path.join(__dirname, '/')));

// Middleware for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Akses ditolak. Token tidak ada.' });
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid atau kadaluarsa.' });
        req.user = user;
        next();
    });
}

// =======================
// AUTH ROUTES
// =======================
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ message: 'Username atau password salah.' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Username atau password salah.' });
        
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ token, message: 'Login berhasil!' });
    });
});

// =======================
// PROJECTS ROUTES
// =======================
// Get all projects
app.get('/api/projects', (req, res) => {
    db.all("SELECT * FROM projects", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add new project (protected)
app.post('/api/projects', authenticateToken, (req, res) => {
    const { title, description, tags, year, image_url, demo_link, github_link } = req.body;
    const stmt = db.prepare("INSERT INTO projects (title, description, tags, year, image_url, demo_link, github_link) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run([title, description, tags, year, image_url, demo_link, github_link], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'Project ditambahkan.' });
    });
    stmt.finalize();
});

// Update project (protected)
app.put('/api/projects/:id', authenticateToken, (req, res) => {
    const { title, description, tags, year, image_url, demo_link, github_link } = req.body;
    const stmt = db.prepare("UPDATE projects SET title=?, description=?, tags=?, year=?, image_url=?, demo_link=?, github_link=? WHERE id=?");
    stmt.run([title, description, tags, year, image_url, demo_link, github_link, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Project diupdate.' });
    });
    stmt.finalize();
});

// Delete project (protected)
app.delete('/api/projects/:id', authenticateToken, (req, res) => {
    db.run("DELETE FROM projects WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Project dihapus.' });
    });
});

// =======================
// CERTIFICATES ROUTES
// =======================
// Get all certificates
app.get('/api/certificates', (req, res) => {
    db.all("SELECT * FROM certificates", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add new certificate (protected)
app.post('/api/certificates', authenticateToken, (req, res) => {
    const { title, issuer, date, category, description, verify_link } = req.body;
    const stmt = db.prepare("INSERT INTO certificates (title, issuer, date, category, description, verify_link) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run([title, issuer, date, category, description, verify_link], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'Sertifikat ditambahkan.' });
    });
    stmt.finalize();
});

// Update certificate (protected)
app.put('/api/certificates/:id', authenticateToken, (req, res) => {
    const { title, issuer, date, category, description, verify_link } = req.body;
    const stmt = db.prepare("UPDATE certificates SET title=?, issuer=?, date=?, category=?, description=?, verify_link=? WHERE id=?");
    stmt.run([title, issuer, date, category, description, verify_link, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Sertifikat diupdate.' });
    });
    stmt.finalize();
});

// Delete certificate (protected)
app.delete('/api/certificates/:id', authenticateToken, (req, res) => {
    db.run("DELETE FROM certificates WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Sertifikat dihapus.' });
    });
});

// =======================
// PROFILE ROUTES
// =======================
app.get('/api/profile', (req, res) => {
    db.get("SELECT * FROM profile WHERE id = 1", [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
});

app.put('/api/profile', authenticateToken, (req, res) => {
    const { 
        hero_title, hero_desc, roles, stat_years, stat_projects, 
        about_mission, about_desc, whatsapp, email, github, 
        linkedin, instagram, facebook 
    } = req.body;
    
    const stmt = db.prepare(`
        UPDATE profile SET 
            hero_title=?, hero_desc=?, roles=?, stat_years=?, stat_projects=?, 
            about_mission=?, about_desc=?, whatsapp=?, email=?, github=?, 
            linkedin=?, instagram=?, facebook=? 
        WHERE id=1
    `);
    
    stmt.run([
        hero_title, hero_desc, roles, stat_years, stat_projects, 
        about_mission, about_desc, whatsapp, email, github, 
        linkedin, instagram, facebook
    ], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Profil berhasil diperbarui.' });
    });
    stmt.finalize();
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
