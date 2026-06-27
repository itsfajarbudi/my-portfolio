-- MENGAKTIFKAN RLS PADA SEMUA TABEL
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE now_focus ENABLE ROW LEVEL SECURITY;

-- 1. KEBIJAKAN UNTUK TABEL PROFILE
-- Publik bisa membaca (SELECT)
CREATE POLICY "Public profiles are viewable by everyone" ON profile FOR SELECT USING (true);
-- Hanya Authenticated (Admin Login) yang bisa merubah data
CREATE POLICY "Admin can insert profile" ON profile FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update profile" ON profile FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete profile" ON profile FOR DELETE TO authenticated USING (true);

-- 2. KEBIJAKAN UNTUK TABEL PROJECTS
CREATE POLICY "Public projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- 3. KEBIJAKAN UNTUK TABEL CERTIFICATES
CREATE POLICY "Public certificates are viewable by everyone" ON certificates FOR SELECT USING (true);
CREATE POLICY "Admin can insert certificates" ON certificates FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update certificates" ON certificates FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete certificates" ON certificates FOR DELETE TO authenticated USING (true);

-- 4. KEBIJAKAN UNTUK TABEL NOW_FOCUS
CREATE POLICY "Public now_focus is viewable by everyone" ON now_focus FOR SELECT USING (true);
CREATE POLICY "Admin can insert now_focus" ON now_focus FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update now_focus" ON now_focus FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete now_focus" ON now_focus FOR DELETE TO authenticated USING (true);

-- 5. MEMPERKETAT KEBIJAKAN STORAGE BUCKET (Hanya Admin yang bisa upload)
-- Hapus policy lama yang insecure (jika ada dari script setup sebelumnya)
DROP POLICY IF EXISTS "Public Insert" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- Buat policy baru yang lebih ketat untuk Storage
CREATE POLICY "Admin Insert Storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('foto_profile', 'proyek_unggulan', 'sertifikat_dan_penghargaan', 'now_page'));
CREATE POLICY "Admin Update Storage" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('foto_profile', 'proyek_unggulan', 'sertifikat_dan_penghargaan', 'now_page'));
CREATE POLICY "Admin Delete Storage" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('foto_profile', 'proyek_unggulan', 'sertifikat_dan_penghargaan', 'now_page'));
