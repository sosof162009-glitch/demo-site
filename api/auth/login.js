// Vercel Serverless Function - Login Proxy
// Safe: Supabase keys are server-side only

export default async function handler(req, res) {
  // CORS headers for browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  try {
    // Server-side Supabase auth call (no CORS issues!)
    const response = await fetch('https://jgmpltmdncylcyrnuufe.supabase.co/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnbXBsdG1kbmN5bGN5cm51dWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDUwNjUsImV4cCI6MjA5MDcyMTA2NX0.ejBVAvG0l_04jdIDKb6MfBKt9FndyyRkvgB1m8RCJjU'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error_description || data.error || 'Login failed',
        code: data.error 
      });
    }
    
    // Success! Return tokens
    return res.status(200).json({
      success: true,
      user: data.user,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in
    });
    
  } catch (error) {
    console.error('Login proxy error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
