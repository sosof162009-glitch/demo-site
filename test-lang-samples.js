const https = require('https');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';

// Sample tools to test in each language
const sampleTools = [
  'jpg-to-png', 'word-counter', 'json-formatter', 'password-generator',
  'bmi-calculator', 'color-picker', 'whatsapp-link-generator', 
  'emoji-to-unicode', 'number-to-words', 'case-converter'
];

const languages = ['ar', 'fr', 'es', 'de'];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode === 200 });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function testSamples() {
  console.log('🔍 اختبار عينات من كل لغة...\n');
  
  const results = {};
  
  for (const lang of languages) {
    console.log(`\n🌐 ${lang.toUpperCase()}:`);
    let ok = 0;
    
    for (const tool of sampleTools) {
      const url = `${BASE_URL}/${lang}/${tool}/`;
      const result = await checkUrl(url);
      
      if (result.ok) {
        ok++;
        process.stdout.write(`✅ ${tool} `);
      } else {
        process.stdout.write(`❌ ${tool} `);
      }
    }
    
    results[lang] = { ok, total: sampleTools.length };
    console.log(`\n   ${ok}/${sampleTools.length} شغالة`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 النتائج:');
  console.log('='.repeat(60));
  
  const totalOk = Object.values(results).reduce((s, r) => s + r.ok, 0);
  const total = Object.values(results).reduce((s, r) => s + r.total, 0);
  
  console.log(`الإجمالي: ${totalOk}/${total} (${((totalOk/total)*100).toFixed(0)}%)`);
  
  for (const [lang, r] of Object.entries(results)) {
    console.log(`  ${lang}: ${r.ok}/${r.total}`);
  }
}

testSamples();
