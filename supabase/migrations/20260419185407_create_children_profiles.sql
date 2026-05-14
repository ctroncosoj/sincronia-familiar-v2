/*
  # Create children profiles table

  1. New Tables
    - `children`
      - `id` (uuid, primary key, auto-generated)
      - `user_id` (uuid, references auth.users – nullable for anonymous/local use)
      - `name` (text, child's name)
      - `dosha` (text, nullable – Vata | Pitta | Kapha, reserved for future Ayurveda features)
      - `birth_date` (date, nullable – reserved for future nakshatra/dosha calculations)
      - `notes` (text, nullable – free-form notes)
      - `sort_order` (integer, for manual ordering)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `children` table
    - Authenticated users can only access their own children records
    - Anonymous session_id stored in local storage handles guest access client-side (no DB row for anonymous)

  3. Notes
    - The `dosha` column is intentionally left nullable and unconstrained at DB level
      to allow graceful future additions without a migration.
    - `user_id` is nullable to allow future guest-to-user upgrade path.
*/

CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  dosha text DEFAULT NULL,
  birth_date date DEFAULT NULL,
  notes text DEFAULT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own children"
  ON children FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own children"
  ON children FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own children"
  ON children FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own children"
  ON children FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS children_user_id_idx ON children(user_id);
