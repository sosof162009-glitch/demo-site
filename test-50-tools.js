const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';

// Get all tools from en directory
const enDir = '/root/.openclaw/workspace/demo-site/en';
const allTools = fs.readdirSync(enDir).filter(f => {
  const fullPath = path.join(enDir, f);
  return fs.statSync(fullPath).isDirectory() && f !== 'index.html' && !f.startsWith('.');
});

console.log(`🔍 إجمالي الأدوات: ${allTools.length}`);

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode === 200 });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function testAll() {
  const results = { ok: 0, failed: [] };
  
  // Test first 50 tools
  const testBatch = allTools.slice(0, 50);
  
  for (let i = 0; i < testBatch.length; i++) {
    const tool = testBatch[i];
    const url = `${BASE_URL}/en/${tool}/`;
    const result = await checkUrl(url);
    
    if (result.ok) {
      results.ok++;
      process.stdout.write(`✅ ${tool}\n`);
    } else {
      results.failed.push(tool);
      process.stdout.write(`❌ ${tool} (${result.status})\n`);
    }
  }
  
  console.log(`\n📊 النتائج: ${results.ok}/${testBatch.length} شغالة`);
  if (results.failed.length > 0) {
    console.log(`❌ المعطلة: ${results.failed.join(', ')}`);
  }
}

testAll();
