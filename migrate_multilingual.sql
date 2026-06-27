-- ==============================================================
-- MIGRASI DATABASE: BILINGUAL (BAHASA INDONESIA & INGGRIS)
-- ==============================================================

-- 1. TABEL PROFILE
ALTER TABLE profile RENAME COLUMN hero_title TO hero_title_id;
ALTER TABLE profile RENAME COLUMN roles TO roles_id;
ALTER TABLE profile RENAME COLUMN hero_desc TO hero_desc_id;
ALTER TABLE profile RENAME COLUMN about_mission TO about_mission_id;
ALTER TABLE profile RENAME COLUMN about_desc TO about_desc_id;

ALTER TABLE profile ADD COLUMN hero_title_en text;
ALTER TABLE profile ADD COLUMN roles_en text;
ALTER TABLE profile ADD COLUMN hero_desc_en text;
ALTER TABLE profile ADD COLUMN about_mission_en text;
ALTER TABLE profile ADD COLUMN about_desc_en text;

-- 2. TABEL PROJECTS
ALTER TABLE projects RENAME COLUMN title TO title_id;
ALTER TABLE projects RENAME COLUMN description TO description_id;

ALTER TABLE projects ADD COLUMN title_en text;
ALTER TABLE projects ADD COLUMN description_en text;

-- 3. TABEL CERTIFICATES
ALTER TABLE certificates RENAME COLUMN title TO title_id;
ALTER TABLE certificates RENAME COLUMN description TO description_id;

ALTER TABLE certificates ADD COLUMN title_en text;
ALTER TABLE certificates ADD COLUMN description_en text;
