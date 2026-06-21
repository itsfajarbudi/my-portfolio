const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`);

        // Projects table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            tags TEXT,
            year TEXT,
            image_url TEXT,
            demo_link TEXT,
            github_link TEXT
        )`);

        // Certificates table
        db.run(`CREATE TABLE IF NOT EXISTS certificates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            issuer TEXT,
            date TEXT,
            category TEXT,
            description TEXT,
            verify_link TEXT
        )`);

        // Profile table
        db.run(`CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            hero_title TEXT,
            hero_desc TEXT,
            roles TEXT,
            stat_years TEXT,
            stat_projects TEXT,
            about_mission TEXT,
            about_desc TEXT,
            whatsapp TEXT,
            email TEXT,
            github TEXT,
            linkedin TEXT,
            instagram TEXT,
            facebook TEXT
        )`);

        // Seed Admin User
        db.get("SELECT * FROM users WHERE username = 'admin'", async (err, row) => {
            if (!row) {
                const hashedPassword = await bcrypt.hash('admin123', 10);
                db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', hashedPassword]);
                console.log('Admin user seeded (admin / admin123)');
            }
        });

        // Seed initial projects
        db.get("SELECT COUNT(*) AS count FROM projects", (err, row) => {
            if (row && row.count === 0) {
                const initialProjects = [
                    ['Sistem Manajemen Data', 'Aplikasi web full-stack untuk manajemen data dengan dashboard interaktif, autentikasi pengguna, dan laporan real-time.', 'React,Node.js,MongoDB', '2024', '', '#', '#'],
                    ['Analisis Data & ML', 'Model machine learning untuk prediksi dan analisis data dengan akurasi tinggi menggunakan Python dan scikit-learn.', 'Python,ML', '2024', '', '#', '#'],
                    ['Landing Page Modern', 'Landing page responsif dan modern dengan animasi CSS, optimasi SEO, dan performa tinggi.', 'HTML,CSS,JS', '2023', '', '#', '#']
                ];
                const stmt = db.prepare("INSERT INTO projects (title, description, tags, year, image_url, demo_link, github_link) VALUES (?, ?, ?, ?, ?, ?, ?)");
                initialProjects.forEach(p => stmt.run(p));
                stmt.finalize();
                console.log('Initial projects seeded.');
            }
        });

        // Seed initial certificates
        db.get("SELECT COUNT(*) AS count FROM certificates", (err, row) => {
            if (row && row.count === 0) {
                const initialCerts = [
                    ['Belajar Dasar Pemrograman Web', 'Dicoding Indonesia', 'Jan 2024', 'programming', 'Sertifikat ini membuktikan penguasaan HTML, CSS, dan JavaScript dasar dalam membangun halaman web yang responsif dan interaktif.', '#'],
                    ['Data Analytics Fundamentals', 'Coursera / Google', 'Mar 2024', 'data', 'Penguasaan teknik analisis data menggunakan Python, pandas, visualisasi data, dan interpretasi hasil analitik untuk pengambilan keputusan.', '#'],
                    ['UI/UX Design Masterclass', 'Udemy', 'Jun 2023', 'design', 'Kursus komprehensif tentang prinsip desain UI/UX, prototyping dengan Figma, user research, dan pembuatan design system yang scalable.', '#'],
                    ['JavaScript Algorithms & Data Structures', 'freeCodeCamp', 'Sep 2023', 'programming', 'Penguasaan mendalam algoritma, struktur data, OOP, functional programming, dan pemecahan masalah kompleks dengan JavaScript.', '#'],
                    ['Python for Data Science & AI', 'IBM / Coursera', 'Nov 2023', 'data', 'Menguasai Python untuk analisis data ilmiah, NumPy, pandas, Matplotlib, dan penerapan teknik kecerdasan buatan dasar.', '#'],
                    ['Digital Marketing Fundamentals', 'Google Garage', 'Feb 2023', 'design', 'Pemahaman menyeluruh tentang pemasaran digital, SEO, SEM, media sosial, analitik web, dan strategi konten efektif.', '#']
                ];
                const stmt = db.prepare("INSERT INTO certificates (title, issuer, date, category, description, verify_link) VALUES (?, ?, ?, ?, ?, ?)");
                initialCerts.forEach(c => stmt.run(c));
                stmt.finalize();
                console.log('Initial certificates seeded.');
            }
        });

        // Seed initial profile
        db.get("SELECT COUNT(*) AS count FROM profile", (err, row) => {
            if (row && row.count === 0) {
                const initialProfile = {
                    id: 1,
                    hero_title: 'Seorang DevOps<br />Dan Full-Stack Engineer',
                    hero_desc: 'Saya adalah seorang engineer yang membangun aplikasi modern sekaligus merancang arsitektur jaringan di belakangnya. Keahlian saya mencakup pengembangan aplikasi berskala besar, manajemen infrastruktur bersertifikasi dan implementasi solusi IoT.',
                    roles: 'Web Developer,UI/UX Enthusiast,Python Programmer,Data Analyst,Problem Solver',
                    stat_years: '5+',
                    stat_projects: '20+',
                    about_mission: 'Misi saya adalah menjembatani dunia pemrograman, infrastruktur jaringan, dan teknologi masa depan untuk membangun ekosistem digital yang adaptif, aman, dan berskala besar.',
                    about_desc: 'Melalui pendekatan <em>end-to-end development</em> yang bersih, arsitektur server yang terotomatisasi, serta integrasi inovatif seperti IoT dan teknologi drone, saya berkomitmen menghadirkan solusi digital yang tidak hanya fungsional, tetapi juga tangguh dan siap menghadapi trafik tinggi.',
                    whatsapp: '628138305092',
                    email: 'itsfajarbudi@gmail.com',
                    github: 'https://github.com/itsfajarbudi',
                    linkedin: '#',
                    instagram: '#',
                    facebook: '#'
                };
                const cols = Object.keys(initialProfile).join(', ');
                const placeholders = Object.keys(initialProfile).map(() => '?').join(', ');
                const values = Object.values(initialProfile);
                
                db.run(`INSERT INTO profile (${cols}) VALUES (${placeholders})`, values, (err) => {
                    if (err) console.error("Error seeding profile:", err.message);
                    else console.log('Initial profile seeded.');
                });
            }
        });
    });
}

module.exports = db;
