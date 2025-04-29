/*
  # Create users and roles tables

  1. New Tables
    - `app_users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `role` (text)
      - `state` (text)
      - `kitchen` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `privileges` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  privileges text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create app_users table (named app_users to avoid conflict with auth.users)
CREATE TABLE IF NOT EXISTS app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL REFERENCES roles(name),
  state text NOT NULL DEFAULT 'All',
  kitchen text NOT NULL DEFAULT 'All',
  status text NOT NULL DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- Policies for roles table
CREATE POLICY "Roles are viewable by authenticated users"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Roles are manageable by administrators"
  ON roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM app_users
      WHERE app_users.id = auth.uid()
      AND app_users.role = 'Administrator'
    )
  );

-- Policies for app_users table
CREATE POLICY "Users are viewable by authenticated users"
  ON app_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users are manageable by administrators"
  ON app_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM app_users
      WHERE app_users.id = auth.uid()
      AND app_users.role = 'Administrator'
    )
  );

-- Insert initial roles
INSERT INTO roles (name, description, privileges) VALUES
  ('Administrator', 'Full system access and management capabilities', ARRAY[
    'Full system access',
    'User management',
    'Settings management',
    'View reports',
    'Add meal assessments',
    'Review meal assessments',
    'Manage meal assessments'
  ]),
  ('NAHCON Staff', 'Staff members with assessment capabilities', ARRAY[
    'Add meal assessments',
    'View own submissions',
    'View reports',
    'Review own assessments'
  ]),
  ('State Representative', 'State representatives for meal assessment', ARRAY[
    'View state reports',
    'Review meal assessments',
    'View own submissions'
  ]),
  ('Kitchen Representative', 'Kitchen representatives for meal assessment', ARRAY[
    'View kitchen reports',
    'Review meal assessments',
    'View own submissions'
  ])
ON CONFLICT (name) DO NOTHING;