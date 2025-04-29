/*
  # Establish Auth and User Relationship
  
  1. Changes
    - Create app_users table with auth_id relationship
    - Set up RLS policies
    - Create user management trigger
  
  2. Security
    - Enable RLS
    - Add auth-based policies
    - Ensure secure user creation flow
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users are viewable by authenticated users" ON app_users;
DROP POLICY IF EXISTS "Users can view and edit their own profile" ON app_users;
DROP POLICY IF EXISTS "Roles are viewable by all users" ON roles;
DROP POLICY IF EXISTS "Roles are manageable by administrators" ON roles;

-- Create app_users table
CREATE TABLE IF NOT EXISTS app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE,
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
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- Create policies using auth.uid()
CREATE POLICY "Users are viewable by authenticated users"
  ON app_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view and edit their own profile"
  ON app_users
  FOR ALL
  TO authenticated
  USING (
    auth_id = auth.uid()
    OR
    (role = 'Administrator' AND auth_id = auth.uid())
  );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.app_users (
    auth_id,
    name,
    email,
    role,
    state,
    kitchen,
    status
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'NAHCON Staff'),
    COALESCE(NEW.raw_user_meta_data->>'state', 'All'),
    COALESCE(NEW.raw_user_meta_data->>'kitchen', 'All'),
    'Active'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  privileges text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on roles
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Create roles policies
CREATE POLICY "Roles are viewable by all users"
  ON roles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Roles are manageable by administrators"
  ON roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM app_users
      WHERE role = 'Administrator'
      AND auth_id = auth.uid()
    )
  );

-- Add foreign key after table creation
ALTER TABLE app_users
  ADD CONSTRAINT app_users_auth_id_fkey 
  FOREIGN KEY (auth_id) 
  REFERENCES auth.users(id)
  ON DELETE CASCADE;