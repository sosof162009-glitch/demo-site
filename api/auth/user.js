// Vercel Serverless Function - Get User Info
// Checks admin_users table for role

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  try {
    // Get user from Supabase Auth
    const userResponse = await fetch('https://jgmpltmdncylcyrnuufe.supabase.co/auth/v1/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnbXBsdG1kbmN5bGN5cm51dWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDUwNjUsImV4cCI6MjA5MDcyMTA2NX0.ejBVAvG0l_04jdIDKb6MfBKt9FndyyRkvgB1m8RCJjU'
      }
    });
    
    if (!userResponse.ok) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    const userData = await userResponse.json();
    
    // Check admin_users table
    const adminResponse = await fetch(
      `https://jgmpltmdncylcyrnuufe.supabase.co/rest/v1/admin_users?user_id=eq.${userData.id}&select=*`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'apikey': process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnbXBsdG1kbmN5bGN5cm51dWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDUwNjUsImV4cCI6MjA5MDcyMTA2NX0.ejBVAvG0l_04jdIDKb6MfBKt9FndyyRkvgB1m8RCJjU'
        }
      }
    );
    
    const adminData = await adminResponse.json();
    
    return res.status(200).json({
      user: userData,
      admin: adminData[0] || null,
      isAdmin: adminData.length > 0 && adminData[0].is_active
    });
    
  } catch (error) {
    console.error('User info error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
