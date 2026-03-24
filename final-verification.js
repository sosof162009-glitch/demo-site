const https = require('https');

const BASE_URL = 'tools-205-cl18xmzs1-sas-projects-611869a5.vercel.app';

// Comprehensive test of fixed tools
const testTools = [
  // Previously fake tools
  { lang: 'ar', tool: 'binary-to-decimal', name: 'Binary → Decimal' },
  { lang: 'ar', tool: 'decimal-to-binary', name: 'Decimal → Binary' },
  { lang: 'ar', tool: 'percentage-calculator', name: 'Percentage Calculator' },
  { lang: 'fr', tool: 'hex-to-decimal', name: 'Hex → Decimal' },
  { lang: 'de', tool: 'octal-to-decimal', name: 'Octal → Decimal' },
  // Previously wrong template
  { lang: 'en', tool: 'hash-generator', name: 'Hash Generator' },
  { lang: 'en', tool: 'html-encoder', name: 'HTML Encoder' },
  { lang: 'en', tool: 'md5-generator', name: 'MD5 Generator' },
  { lang: 'en', tool: 'regex-tester', name: 'Regex Tester' },
  { lang: 'en', tool: 'sha256-generator', name: 'SHA256 Generator' },
  { lang: 'en', tool: 'url-encoder', name: 'URL Encoder' },
  { lang: 'en', tool: 'text-reverser', name: 'Text Reverser' },
  { lang: 'ar', tool: 'canonical-url-generator', name: 'Canonical URL Generator' },
  { lang: 'fr', tool: 'twitter-card-generator', name: 'Twitter Card Generator' },
  { lang: 'fr', tool: 'sitemap-xml-generator', name: 'Sitemap XML Generator' },
  // Control group (known working)
  { lang: 'en', tool: 'password-generator', name: 'Password Generator' },
  { lang: 'ar', tool: 'internet-speed-test', name: 'Internet Speed Test' },
];

function testPage(url) {
  return new Promise((resolve) => {
    const req = https.get(`https://${url}`, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const html = data;
        // Check for problems
        const hasStaticFake = html.includes('resultValue.textContent = \'42\'');
        const hasGenericText = html.includes('أدخل النص') || html.includes('processText()');
        const hasInputOutput = html.includes('id="input"') || html.includes('id="urlInput"');
        const hasResult = html.includes('id="result"') || html.includes('id="output"');
        
        resolve({
          status: res.statusCode,
          ok: res.statusCode === 200 && !hasStaticFake && !hasGenericText,
          hasFunctionality: hasInputOutput && hasResult
        });
      });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function runTest() {
  console.log('🔍 الفحص النهائي للأدوات المُصلحة');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  for (const { lang, tool, name } of testTools) {
    const url = `${BASE_URL}/${lang}/${tool}/`;
    const result = await testPage(url);
    
    if (result.ok && result.hasFunctionality) {
      console.log(`✅ ${lang}/${tool} - ${name}`);
      passed++;
    } else {
      console.log(`❌ ${lang}/${tool} - ${name} (HTTP ${result.status}, functionality: ${result.hasFunctionality})`);
      failed++;
    }
  }
  
  console.log('='.repeat(60));
  console.log(`✅ ناجح: ${passed}/${testTools.length}`);
  console.log(`❌ فاشل: ${failed}/${testTools.length}`);
  console.log(`📊 نسبة النجاح: ${((passed/testTools.length)*100).toFixed(1)}%`);
  console.log(`\n🌐 الرابط: https://${BASE_URL}`);
}

runTest();
