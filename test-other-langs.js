const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';
const languages = ['ar', 'fr', 'es', 'de'];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode === 200 });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function testLanguage(lang) {
  const langDir = `/root/.openclaw/workspace/demo-site/${lang}`;
  if (!fs.existsSync(langDir)) {
    console.log(`⚠️ Language ${lang} not found`);
    return null;
  }
  
  const tools = fs.readdirSync(langDir).filter(f => {
    const fullPath = path.join(langDir, f);
    return fs.statSync(fullPath).isDirectory() && !f.startsWith('.');
  });
  
  console.log(`\n🌐 ${lang.toUpperCase()}: ${tools.length} أداة`);
  console.log('='.repeat(50));
  
  let ok = 0;
  const failed = [];
  
  for (const tool of tools) {
    const url = `${BASE_URL}/${lang}/${tool}/`;
    const result = await checkUrl(url);
    
    if (result.ok) {
      ok++;
    } else {
      failed.push({ tool, status: result.status });
    }
  }
  
  console.log(`✅ ${ok}/${tools.length} شغالة (${((ok/tools.length)*100).toFixed(0)}%)`);
  if (failed.length > 0) {
    console.log(`❌ ${failed.length} معطلة`);
  }
  
  return { lang, total: tools.length, ok, failed };
}

async function testAllLanguages() {
  console.log('🔍 اختبار بقية اللغات...\n');
  
  const results = [];
  for (const lang of languages) {
    const result = await testLanguage(lang);
    if (result) results.push(result);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 التقرير النهائي لكل اللغات');
  console.log('='.repeat(60));
  
  const totalTools = results.reduce((sum, r) => sum + r.total, 0);
  const totalOk = results.reduce((sum, r) => sum + r.ok, 0);
  
  console.log(`إجمالي الأدوات: ${totalTools}`);
  console.log(`✅ شغالة: ${totalOk}`);
  console.log(`❌ معطلة: ${totalTools - totalOk}`);
  console.log(`نسبة النجاح: ${((totalOk/totalTools)*100).toFixed(1)}%`);
  
  console.log('\n📈 حسب اللغة:');
  results.forEach(r => {
    console.log(`  ${r.lang}: ${r.ok}/${r.total} (${((r.ok/r.total)*100).toFixed(0)}%)`);
    if (r.failed.length > 0) {
      r.failed.forEach(f => console.log(`    ❌ ${f.tool}`));
    }
  });
  
  // Save report
  fs.writeFileSync('test-report-all-langs.json', JSON.stringify({
    results,
    summary: { total: totalTools, ok: totalOk, failed: totalTools - totalOk }
  }, null, 2));
}

testAllLanguages();
