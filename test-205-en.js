const https = require('https');
const fs = require('fs');

const toolsData = JSON.parse(fs.readFileSync('./tools-data.json', 'utf8'));
const baseUrl = 'tools-205-ctul3nwf9-sas-projects-611869a5.vercel.app';

console.log('🚀 اختبار شامل - 205 أداة (EN فقط)...\n');

const results = {
  total: 0,
  working: 0,
  failed: 0,
  byCategory: {},
  failedTools: []
};

// Initialize category counters
for (const cat of toolsData.categories) {
  results.byCategory[cat.name_en] = { total: cat.count, working: 0, failed: 0 };
}

async function testTool(tool) {
  return new Promise((resolve) => {
    const url = `https://${baseUrl}/en/${tool.slug}/`;
    const req = https.get(url, { timeout: 8000 }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; if (data.length > 15000) res.destroy(); });
      res.on('end', () => {
        const status = res.statusCode;
        const hasJS = data.includes('function ') && (data.includes('addEventListener') || data.includes('onclick'));
        const hasTemplate = data.includes('bg-gradient-to-r') || data.includes('drop-zone') || data.includes('textInput');
        resolve({ tool, status, hasJS, hasTemplate, url });
      });
    });
    req.on('error', () => resolve({ tool, status: 'ERROR', hasJS: false, hasTemplate: false, url }));
    req.setTimeout(8000, () => { req.destroy(); resolve({ tool, status: 'TIMEOUT', hasJS: false, hasTemplate: false, url }); });
  });
}

async function runTests() {
  let tested = 0;
  const total = toolsData.tools.length;
  
  for (const tool of toolsData.tools) {
    const result = await testTool(tool);
    tested++;
    results.total++;
    
    const isWorking = result.status === 200 && result.hasJS;
    
    if (isWorking) {
      results.working++;
      results.byCategory[tool.category].working++;
    } else {
      results.failed++;
      results.byCategory[tool.category].failed++;
      results.failedTools.push({
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        category: tool.category,
        status: result.status,
        hasJS: result.hasJS
      });
    }
    
    const icon = isWorking ? '✅' : '❌';
    console.log(`${icon} [${tested}/${total}] ${tool.name} (${tool.category})`);
  }
  
  generateReport();
}

function generateReport() {
  console.log('\n' + '='.repeat(70));
  console.log('📊 التقرير النهائي - 205 أداة');
  console.log('='.repeat(70));
  
  console.log(`\n✅ شغالة: ${results.working}/${results.total} (${Math.round(results.working/results.total*100)}%)`);
  console.log(`❌ فاشلة: ${results.failed}/${results.total} (${Math.round(results.failed/results.total*100)}%)`);
  
  console.log('\n📁 حسب الفئة:');
  for (const [cat, stats] of Object.entries(results.byCategory)) {
    const pct = Math.round((stats.working / stats.total) * 100);
    const icon = pct === 100 ? '✅' : pct >= 80 ? '⚠️' : '❌';
    console.log(`  ${icon} ${cat}: ${stats.working}/${stats.total} (${pct}%)`);
  }
  
  if (results.failedTools.length > 0) {
    console.log('\n❌ الأدوات الفاشلة:');
    results.failedTools.forEach(t => {
      console.log(`  • #${t.id} ${t.name} (${t.category}) - ${t.status} ${t.hasJS ? '(JS OK)' : '(No JS)'}`);
    });
  }
  
  fs.writeFileSync('test-205-en.json', JSON.stringify(results, null, 2));
  console.log('\n💾 تم حفظ التقرير: test-205-en.json');
}

runTests();
