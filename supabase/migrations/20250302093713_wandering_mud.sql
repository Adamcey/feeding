/*
  # Initial Schema Setup

  1. New Tables
    - `roles` - Stores role definitions and permissions
    - `app_users` - Stores user profiles linked to auth.users
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Initial Data
    - Create default roles
    - Create default admin user
*/

-- Create roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  privileges text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create app_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS app_users (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  state text NOT NULL DEFAULT 'All',
  kitchen text NOT NULL DEFAULT 'All',
  status text NOT NULL DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  -- Drop policies for roles table
  DROP POLICY IF EXISTS "Roles are viewable by all users" ON roles;
  DROP POLICY IF EXISTS "Roles are manageable by administrators" ON roles;
  
  -- Drop policies for app_users table
  DROP POLICY IF EXISTS "Users are viewable by all users" ON app_users;
  DROP POLICY IF EXISTS "Users are manageable by administrators" ON app_users;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create policies for roles table
CREATE POLICY "Roles are viewable by all users"
  ON roles
  FOR SELECT
  TO PUBLIC
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

-- Create policies for app_users table
CREATE POLICY "Users are viewable by all users"
  ON app_users
  FOR SELECT
  TO PUBLIC
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

-- Insert initial roles if they don't exist
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

-- Insert default admin user if it doesn't exist
INSERT INTO app_users (id, name, email, role, state, kitchen, status)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'System Administrator',
  'admin@nahcon.gov.ng',
  'Administrator',
  'All',
  'All',
  'Active'
) ON CONFLICT (id) DO NOTHING;