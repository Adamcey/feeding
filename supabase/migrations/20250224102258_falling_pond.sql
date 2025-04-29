/*
  # Fix RLS policies and setup initial data

  1. Tables
    - Create roles and app_users tables if they don't exist
    - Enable RLS on both tables
  
  2. Policies
    - Drop existing policies to avoid conflicts
    - Create new policies for roles and app_users tables
    - Public read access
    - Administrator-only write access
  
  3. Initial Data
    - Insert default roles with privileges
    - Insert default admin user
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

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Roles are viewable by all users" ON roles;
  DROP POLICY IF EXISTS "Roles are manageable by administrators" ON roles;
  DROP POLICY IF EXISTS "Users are viewable by all users" ON app_users;
  DROP POLICY IF EXISTS "Users are manageable by administrators" ON app_users;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Policies for roles table
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
    auth.jwt() ->> 'role' = 'Administrator'
  );

-- Policies for app_users table
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
    auth.jwt() ->> 'role' = 'Administrator'
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

-- Insert default admin user
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