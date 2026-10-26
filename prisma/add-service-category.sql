-- Safe additive schema update for existing installations.
-- Existing service rows become facilities-management automatically.
ALTER TABLE IF EXISTS "Service"
  ADD COLUMN IF NOT EXISTS "category" TEXT NOT NULL DEFAULT 'facilities-management';
