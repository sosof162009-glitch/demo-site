const https = require('https');

const BASE_URL = 'tools-205-cl18xmzs1-sas-projects-611869a5.vercel.app';

const testTools = [
  { lang: 'ar', tool: 'binary-to-decimal', name: 'Binary → Decimal' },
  { lang: 'ar', tool: 'decimal-to-binary', name: 'Decimal → Binary' },
  { lang: 'ar', tool: 'percentage-calculator', name: 'Percentage Calculator' },
  { lang: 'en', tool: 'hash-generator', name: 'Hash Generator' },
  { lang: 'en', tool: 'regex-tester', name: 'Regex Tester' },
  { lang: 'ar', tool: 'canonical-url-generator', name: 'Canonical URL Generator' },
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
        // Check for problems (fake tools)
        const hasStaticFake = html.includes('resultValue.textContent = \'42\'');
        // Check for generic template
        const hasGenericText = html.includes('أدخل النص') && html.includes('processText()');
        // Check for functionality (any input field + any result/output field)
        const hasInput = html.match(/id="(input|inputText|inputValue|urlInput|valueInput|totalInput|length)"/);
        const hasResult = html.match(/id="(result|output|resultValue)"/);
        const hasAction = html.match(/onclick="(convert|calculate|process|generate|testRegex|createPassword|startSpeedTest)\(\)"/);
        
        resolve({
          status: res.statusCode,
          ok: res.statusCode === 200 && !hasStaticFake && !hasGenericText,
          hasInput: !!hasInput,
          hasResult: !!hasResult,
          hasAction: !!hasAction
        });
      });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function runTest() {
  console.log('🔍 الفحص النهائي للأدوات');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  for (const { lang, tool, name } of testTools) {
    const url = `${BASE_URL}/${lang}/${tool}/`;
    const result = await testPage(url);
    
    if (result.ok && result.hasInput && result.hasResult && result.hasAction) {
      console.log(`✅ ${lang}/${tool} - ${name}`);
      passed++;
    } else {
      console.log(`❌ ${lang}/${tool} - ${name}`);
      console.log(`   HTTP: ${result.status}, Input: ${result.hasInput}, Result: ${result.hasResult}, Action: ${result.hasAction}`);
      failed++;
    }
  }
  
  console.log('='.repeat(60));
  console.log(`✅ ناجح: ${passed}/${testTools.length}`);
  console.log(`❌ فاشل: ${failed}/${testTools.length}`);
  console.log(`\n🌐 https://${BASE_URL}`);
}

runTest();
