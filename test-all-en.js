const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';

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

async function testBatch(start, count) {
  const results = { ok: 0, failed: [] };
  const batch = allTools.slice(start, start + count);
  
  for (const tool of batch) {
    const url = `${BASE_URL}/en/${tool}/`;
    const result = await checkUrl(url);
    
    if (result.ok) {
      results.ok++;
    } else {
      results.failed.push({ tool, status: result.status });
    }
  }
  
  return results;
}

async function testAll() {
  const batchSize = 50;
  const totalBatches = Math.ceil(allTools.length / batchSize);
  let totalOk = 0;
  const allFailed = [];
  
  for (let i = 0; i < totalBatches; i++) {
    const start = i * batchSize;
    console.log(`\n📦 Batch ${i + 1}/${totalBatches} (أدوات ${start + 1} إلى ${Math.min(start + batchSize, allTools.length)})`);
    
    const result = await testBatch(start, batchSize);
    totalOk += result.ok;
    allFailed.push(...result.failed);
    
    console.log(`✅ ${result.ok}/${Math.min(batchSize, allTools.length - start)} شغالة`);
    if (result.failed.length > 0) {
      console.log(`❌ ${result.failed.length} معطلة`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 التقرير النهائي');
  console.log('='.repeat(60));
  console.log(`إجمالي الأدوات: ${allTools.length}`);
  console.log(`✅ شغالة: ${totalOk}`);
  console.log(`❌ معطلة: ${allFailed.length}`);
  console.log(`نسبة النجاح: ${((totalOk/allTools.length)*100).toFixed(1)}%`);
  
  if (allFailed.length > 0) {
    console.log('\n❌ الأدوات المعطلة:');
    allFailed.forEach(f => console.log(`  - ${f.tool} (HTTP ${f.status})`));
  }
  
  // Save report
  fs.writeFileSync('test-report-en.json', JSON.stringify({
    total: allTools.length,
    ok: totalOk,
    failed: allFailed,
    successRate: ((totalOk/allTools.length)*100).toFixed(1) + '%'
  }, null, 2));
}

testAll();
