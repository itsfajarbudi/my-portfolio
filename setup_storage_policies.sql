-- 1. Buat bucket jika belum ada dan set sebagai public
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('foto_profile', 'foto_profile', true),
  ('proyek_unggulan', 'proyek_unggulan', true),
  ('sertifikat_dan_penghargaan', 'sertifikat_dan_penghargaan', true),
  ('now_page', 'now_page', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Mengizinkan Akses Public (SELECT) untuk melihat gambar
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id IN ('foto_profile', 'proyek_unggulan', 'sertifikat_dan_penghargaan', 'now_page') );

-- 3. Mengizinkan Akses Public (INSERT) untuk mengupload gambar
CREATE POLICY "Public Insert" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id IN ('foto_profile', 'proyek_unggulan', 'sertifikat_dan_penghargaan', 'now_page') );

-- 4. Mengizinkan Akses Public (UPDATE) untuk memperbarui gambar
CREATE POLICY "Public Update" 
ON storage.objects FOR UPDATE 
USING ( bucket_id IN ('foto_profile', 'proyek_unggulan', 'sertifikat_dan_penghargaan', 'now_page') );

-- 5. Mengizinkan Akses Public (DELETE) untuk menghapus gambar
CREATE POLICY "Public Delete" 
ON storage.objects FOR DELETE 
USING ( bucket_id IN ('foto_profile', 'proyek_unggulan', 'sertifikat_dan_penghargaan', 'now_page') );
