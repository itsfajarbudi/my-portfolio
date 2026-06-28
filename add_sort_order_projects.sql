-- ==============================================================
-- MIGRASI DATABASE: MENAMBAHKAN URUTAN PROYEK (DRAG & DROP)
-- ==============================================================

-- 1. Tambahkan kolom sort_order pada tabel projects jika belum ada
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order integer;

-- 2. Isi nilai awal sort_order berdasarkan id agar data lama tidak bernilai NULL
-- dan terurut dengan benar di awal
UPDATE projects SET sort_order = id WHERE sort_order IS NULL;
