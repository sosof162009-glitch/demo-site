const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = process.argv[2] || 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Get all tools from one language
function getTools(lang) {
  const toolsDir = path.join(__dirname, lang);
  if (!fs.existsSync(toolsDir)) return [];
  
  return fs.readdirSync(toolsDir)
    .filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory())
    .sort();
}

// Check if URL returns 200
function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 30000 }, (res) => {
      resolve({ 
        status: res.statusCode, 
        ok: res.statusCode === 200,
        url 
      });
    });
    req.on('error', () => resolve({ status: 0, ok: false, url }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, ok: false, url, timeout: true });
    });
  });
}

// Main test
async function runTest() {
  console.log('🔍 اختبار شامل لجميع الأدوات...\n');
  console.log(`URL: ${BASE_URL}\n`);
  
  const results = {
    total: 0,
    ok: 0,
    failed: [],
    byLang: {}
  };
  
  for (const lang of languages) {
    const tools = getTools(lang);
    results.byLang[lang] = { total: tools.length, ok: 0, failed: [] };
    
    console.log(`\n🌐 ${lang.toUpperCase()}: ${tools.length} أداة`);
    console.log('='.repeat(50));
    
    for (let i = 0; i < tools.length; i++) {
      const tool = tools[i];
      const url = `${BASE_URL}/${lang}/${tool}/`;
      const result = await checkUrl(url);
      
      results.total++;
      results.byLang[lang].total++;
      
      if (result.ok) {
        results.ok++;
        results.byLang[lang].ok++;
        process.stdout.write(`✅ ${tool} (${i+1}/${tools.length})\n`);
      } else {
        results.failed.push({ lang, tool, status: result.status });
        results.byLang[lang].failed.push(tool);
        process.stdout.write(`❌ ${tool} - HTTP ${result.status} (${i+1}/${tools.length})\n`);
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 التقرير النهائي');
  console.log('='.repeat(60));
  console.log(`إجمالي الصفحات: ${results.total}`);
  console.log(`✅ شغالة: ${results.ok}`);
  console.log(`❌ معطلة: ${results.failed.length}`);
  console.log(`نسبة النجاح: ${((results.ok/results.total)*100).toFixed(1)}%`);
  
  console.log('\n📈 حسب اللغة:');
  for (const lang of languages) {
    const r = results.byLang[lang];
    console.log(`  ${lang}: ${r.ok}/${r.total} (${((r.ok/r.total)*100).toFixed(0)}%)`);
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ الأدوات المعطلة:');
    results.failed.forEach(f => {
      console.log(`  - ${f.lang}/${f.tool} (HTTP ${f.status})`);
    });
  }
  
  // Save report
  const reportPath = path.join(__dirname, 'test-report-full.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 التقرير المحفوظ: ${reportPath}`);
  
  return results;
}

runTest().catch(console.error);
