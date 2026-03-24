const https = require('https');

const BASE_URL = 'tools-205-mssmbpobd-sas-projects-611869a5.vercel.app';

// Test a sample of fixed tools
const testTools = [
  // Fake tools that should be fixed
  { lang: 'ar', tool: 'binary-to-decimal', type: 'fake' },
  { lang: 'ar', tool: 'percentage-calculator', type: 'fake' },
  { lang: 'fr', tool: 'decimal-to-binary', type: 'fake' },
  // Wrong template tools that should be fixed
  { lang: 'en', tool: 'hash-generator', type: 'template' },
  { lang: 'en', tool: 'html-encoder', type: 'template' },
  { lang: 'en', tool: 'regex-tester', type: 'template' },
  { lang: 'ar', tool: 'canonical-url-generator', type: 'template' },
  { lang: 'fr', tool: 'twitter-card-generator', type: 'template' },
  // Known working tools
  { lang: 'en', tool: 'password-generator', type: 'working' },
  { lang: 'ar', tool: 'internet-speed-test', type: 'working' },
];

function testPage(url) {
  return new Promise((resolve) => {
    const req = https.get(`https://${url}`, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const html = data;
        const hasStaticFake = html.includes('resultValue.textContent = \'42\'');
        const hasGenericText = html.includes('أدخل النص') || html.includes('Enter text') || html.includes('processText()');
        resolve({ status: res.statusCode, ok: res.statusCode === 200 && !hasStaticFake && !hasGenericText });
      });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function runTest() {
  console.log('🔍 فحص عينة من الأدوات المُصلحة...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const { lang, tool, type } of testTools) {
    const url = `${BASE_URL}/${lang}/${tool}/`;
    const result = await testPage(url);
    
    if (result.ok) {
      console.log(`✅ ${lang}/${tool} (${type})`);
      passed++;
    } else {
      console.log(`❌ ${lang}/${tool} (${type}) - HTTP ${result.status}`);
      failed++;
    }
  }
  
  console.log(`\n✅ ناجح: ${passed} | ❌ فاشل: ${failed}`);
  console.log(`\nالرابط: https://${BASE_URL}`);
}

runTest();
