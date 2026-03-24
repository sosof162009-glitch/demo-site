const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode === 200 });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function testLanguage(lang) {
  const langDir = `/root/.openclaw/workspace/demo-site/${lang}`;
  if (!fs.existsSync(langDir)) return null;
  
  const tools = fs.readdirSync(langDir).filter(f => {
    const fullPath = path.join(langDir, f);
    return fs.statSync(fullPath).isDirectory() && !f.startsWith('.');
  }).sort();
  
  console.log(`\n🌐 ${lang.toUpperCase()}: ${tools.length} أداة`);
  console.log('='.repeat(60));
  
  let ok = 0;
  const failed = [];
  let lastLog = Date.now();
  
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    const url = `${BASE_URL}/${lang}/${tool}/`;
    const result = await checkUrl(url);
    
    if (result.ok) {
      ok++;
    } else {
      failed.push({ tool, status: result.status });
      console.log(`  ❌ ${tool} (HTTP ${result.status})`);
    }
    
    // Log progress every 50 tools
    if ((i + 1) % 50 === 0) {
      console.log(`  📊 ${i + 1}/${tools.length} اختيرت... (${ok} شغالة)`);
    }
  }
  
  console.log(`✅ النتيجة: ${ok}/${tools.length} شغالة (${((ok/tools.length)*100).toFixed(1)}%)`);
  
  return { lang, total: tools.length, ok, failed };
}

async function runFullTest() {
  console.log('🔍 اختبار شامل لكل الأدوات في كل اللغات...');
  console.log('⏳ هذا قد يستغرق 10-15 دقيقة...\n');
  
  const results = [];
  
  for (const lang of languages) {
    const result = await testLanguage(lang);
    if (result) results.push(result);
  }
  
  // Final Report
  console.log('\n' + '='.repeat(70));
  console.log('📊 التقرير النهائي الشامل');
  console.log('='.repeat(70));
  
  const grandTotal = results.reduce((s, r) => s + r.total, 0);
  const grandOk = results.reduce((s, r) => s + r.ok, 0);
  const grandFailed = results.reduce((s, r) => s + r.failed.length, 0);
  
  console.log(`\n📈 الإحصائيات الكلية:`);
  console.log(`   إجمالي الصفحات: ${grandTotal}`);
  console.log(`   ✅ شغالة: ${grandOk}`);
  console.log(`   ❌ معطلة: ${grandFailed}`);
  console.log(`   📊 نسبة النجاح: ${((grandOk/grandTotal)*100).toFixed(2)}%`);
  
  console.log(`\n📊 حسب اللغة:`);
  results.forEach(r => {
    const pct = ((r.ok/r.total)*100).toFixed(1);
    console.log(`   ${r.lang.toUpperCase()}: ${r.ok}/${r.total} (${pct}%)`);
  });
  
  if (grandFailed > 0) {
    console.log(`\n❌ الأدوات المعطلة:`);
    results.forEach(r => {
      if (r.failed.length > 0) {
        console.log(`\n   ${r.lang.toUpperCase()}:`);
        r.failed.forEach(f => console.log(`      - ${f.tool} (HTTP ${f.status})`));
      }
    });
  } else {
    console.log(`\n🎉 مبروك! كل الأدوات شغالة في كل اللغات!`);
  }
  
  // Save detailed report
  const report = {
    date: new Date().toISOString(),
    summary: {
      total: grandTotal,
      ok: grandOk,
      failed: grandFailed,
      successRate: ((grandOk/grandTotal)*100).toFixed(2) + '%'
    },
    byLanguage: results.map(r => ({
      language: r.lang,
      total: r.total,
      ok: r.ok,
      failed: r.failed.length,
      failedTools: r.failed
    }))
  };
  
  fs.writeFileSync('full-test-report.json', JSON.stringify(report, null, 2));
  console.log(`\n💾 التقرير المحفوظ: full-test-report.json`);
}

runFullTest().catch(console.error);
