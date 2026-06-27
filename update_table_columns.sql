-- Tambahkan kolom avatar_url pada tabel profile
ALTER TABLE profile ADD COLUMN IF NOT EXISTS avatar_url text;

-- Tambahkan kolom image_url pada tabel certificates
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS image_url text;

-- Tambahkan kolom image_url pada tabel now_focus
ALTER TABLE now_focus ADD COLUMN IF NOT EXISTS image_url text;
