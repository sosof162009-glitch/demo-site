const https = require('https');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';

// Correct tool names
const corrections = {
  'image-compressor': 'compress-jpg',
  'pdf-merge': 'merge-pdf', 
  'pdf-split': 'split-pdf',
  'text-case-converter': 'case-converter',
  'date-calculator': 'date-difference-calculator',
  'time-converter': 'time-zone-converter',
  'color-converter': null // Need to check
};

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode === 200, url });
    });
    req.on('error', () => resolve({ status: 0, ok: false, url }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false, url }); });
  });
}

async function testCorrections() {
  console.log('🔍 اختبار الأسماء الصحيحة...\n');
  
  for (const [oldName, newName] of Object.entries(corrections)) {
    if (!newName) continue;
    const url = `${BASE_URL}/en/${newName}/`;
    const result = await checkUrl(url);
    console.log(`${oldName} → ${newName}: ${result.ok ? '✅' : '❌'} (${result.status})`);
  }
}

testCorrections();
