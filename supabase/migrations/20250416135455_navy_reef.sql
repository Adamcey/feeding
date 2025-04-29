/*
  # Meal Management Schema

  1. New Tables
    - `meal_requests`
      - `id` (uuid, primary key)
      - `state` (text)
      - `kitchen` (text)
      - `meal_type` (text)
      - `menu` (text)
      - `delivery_date_time` (timestamptz)
      - `total_pilgrims` (integer)
      - `special_diet_count` (integer)
      - `special_diet_details` (text)
      - `additional_notes` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `meal_assessments`
      - `id` (uuid, primary key)
      - `meal_request_id` (uuid, references meal_requests)
      - `state` (text)
      - `accommodation_name` (text)
      - `kitchen_name` (text)
      - `meal_type` (text)
      - `menu` (text)
      - `delivery_time` (time)
      - `total_pilgrims` (integer)
      - `total_meals_served` (integer)
      - `shortfall` (integer)
      - `quantity_adequate` (text)
      - `quality_adequate` (text)
      - `special_diet_adequate` (text)
      - `provisions` (jsonb)
      - `utensils_adequate` (text)
      - `hygiene_status` (jsonb)
      - `remarks` (text)
      - `state_review_status` (text)
      - `kitchen_review_status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for proper access control based on user roles
*/

-- Create meal_requests table
CREATE TABLE IF NOT EXISTS meal_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state text NOT NULL,
  kitchen text NOT NULL,
  meal_type text NOT NULL,
  menu text NOT NULL,
  delivery_date_time timestamptz NOT NULL,
  total_pilgrims integer NOT NULL,
  special_diet_count integer DEFAULT 0,
  special_diet_details text,
  additional_notes text,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meal_assessments table
CREATE TABLE IF NOT EXISTS meal_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_request_id uuid REFERENCES meal_requests(id),
  state text NOT NULL,
  accommodation_name text NOT NULL,
  kitchen_name text NOT NULL,
  meal_type text NOT NULL,
  menu text NOT NULL,
  delivery_time time NOT NULL,
  total_pilgrims integer NOT NULL,
  total_meals_served integer NOT NULL,
  shortfall integer NOT NULL,
  quantity_adequate text NOT NULL,
  quality_adequate text NOT NULL,
  special_diet_adequate text NOT NULL,
  provisions jsonb NOT NULL DEFAULT '{"fruits": false, "water": false, "juices": false}'::jsonb,
  utensils_adequate text NOT NULL,
  hygiene_status jsonb NOT NULL DEFAULT '{"sufra": "", "wasteDisposal": ""}'::jsonb,
  remarks text,
  state_review_status text NOT NULL DEFAULT 'Pending',
  kitchen_review_status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE meal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_assessments ENABLE ROW LEVEL SECURITY;

-- Policies for meal_requests
CREATE POLICY "Users can view all meal requests"
  ON meal_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "State representatives can create meal requests for their state"
  ON meal_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM app_users
      WHERE app_users.auth_id = auth.uid()
      AND app_users.role = 'State Representative'
      AND app_users.state = state
    )
  );

CREATE POLICY "State representatives can update their own requests"
  ON meal_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM app_users
      WHERE app_users.auth_id = auth.uid()
      AND app_users.role = 'State Representative'
      AND app_users.state = state
    )
  );

-- Policies for meal_assessments
CREATE POLICY "Users can view all meal assessments"
  ON meal_assessments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "NAHCON staff can create meal assessments"
  ON meal_assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM app_users
      WHERE app_users.auth_id = auth.uid()
      AND app_users.role = 'NAHCON Staff'
    )
  );

CREATE POLICY "State representatives can review assessments for their state"
  ON meal_assessments
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM app_users
      WHERE app_users.auth_id = auth.uid()
      AND (
        (app_users.role = 'State Representative' AND app_users.state = state)
        OR
        (app_users.role = 'Kitchen Representative' AND app_users.kitchen = kitchen_name)
      )
    )
  );