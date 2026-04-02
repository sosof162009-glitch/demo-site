-- ═══════════════════════════════════════════════════════════════════════
-- 205-Tools Admin Authentication Schema
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE IF EXISTS admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing table if exists (optional - remove in production if data matters)
-- DROP TABLE IF EXISTS admin_users;

-- ═══════════════════════════════════════════════════════════════════════
-- Create admin_users table
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- ═══════════════════════════════════════════════════════════════════════
-- Row Level Security (RLS) Policies
-- ═══════════════════════════════════════════════════════════════════════

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin users can view own data" ON admin_users;
DROP POLICY IF EXISTS "Only admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage all admin_users" ON admin_users;

-- Policy 1: Allow authenticated users to view their own admin record
CREATE POLICY "Admin users can view own data"
ON admin_users FOR SELECT
TO authenticated
USING (
    user_id = auth.uid() 
    AND is_active = true
);

-- Policy 2: Allow authenticated admin users to view all admin records
CREATE POLICY "Admins can view all admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE user_id = auth.uid() 
        AND is_active = true
    )
);

-- Policy 3: Only super_admins can insert/update/delete
CREATE POLICY "Super admins can manage admin_users"
ON admin_users FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE user_id = auth.uid() 
        AND role = 'super_admin'
        AND is_active = true
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE user_id = auth.uid() 
        AND role = 'super_admin'
        AND is_active = true
    )
);

-- ═══════════════════════════════════════════════════════════════════════
-- Function to update updated_at timestamp
-- ═══════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;

-- Create trigger
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════════════
-- Function to handle user login tracking
-- ═══════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE admin_users 
    SET last_login = NOW() 
    WHERE user_id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════════════════
-- Function to check if user is admin
-- ═══════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION is_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users 
        WHERE user_id = check_user_id 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════════════════════════════
-- Function to get current user admin status
-- ═══════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION get_current_user_admin_status()
RETURNS TABLE (
    is_admin BOOLEAN,
    role TEXT,
    email TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.is_active as is_admin,
        au.role,
        au.email
    FROM admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════════════════════════════
-- Insert existing admin user (wxxf16@gmail.com)
-- Note: This assumes the user already exists in auth.users
-- If not, they need to sign up first via the application
-- ═══════════════════════════════════════════════════════════════════════

-- First, let's create a helper function to insert admin by email
CREATE OR REPLACE FUNCTION add_admin_by_email(admin_email TEXT, admin_role TEXT DEFAULT 'admin')
RETURNS TEXT AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Look up the user_id from auth.users
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = admin_email;
    
    IF target_user_id IS NULL THEN
        RETURN 'User with email ' || admin_email || ' not found in auth.users. User must sign up first.';
    END IF;
    
    -- Insert into admin_users
    INSERT INTO admin_users (user_id, email, role, is_active, created_by)
    VALUES (target_user_id, admin_email, admin_role, true, auth.uid())
    ON CONFLICT (user_id) DO UPDATE
    SET role = admin_role,
        is_active = true,
        updated_at = NOW();
    
    RETURN 'Admin user ' || admin_email || ' added/updated successfully with role: ' || admin_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add the existing user as admin
-- Run this after the user has signed up in the application
SELECT add_admin_by_email('wxxf16@gmail.com', 'super_admin');

-- ═══════════════════════════════════════════════════════════════════════
-- Grant necessary permissions
-- ═══════════════════════════════════════════════════════════════════════
GRANT SELECT ON admin_users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_users TO service_role;

-- ═══════════════════════════════════════════════════════════════════════
-- Verification Query (run this to verify setup)
-- ═══════════════════════════════════════════════════════════════════════
/*
-- Check all admin users
SELECT * FROM admin_users;

-- Check if specific user is admin
SELECT is_admin('USER_UUID_HERE'::UUID);

-- Check current user's admin status
SELECT * FROM get_current_user_admin_status();

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'admin_users';
*/
