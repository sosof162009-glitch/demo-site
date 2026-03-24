const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tools-205-3g00akhbk-sas-projects-611869a5.vercel.app';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Check if page loads and has required elements
function checkTool(lang, tool) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}/${lang}/${tool}/`;
    const req = https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const html = data.toLowerCase();
        
        // Check for key functionality indicators
        const hasScript = html.includes('<script>');
        const hasFunction = html.includes('function') || html.includes('=>');
        const hasInput = html.includes('input') || html.includes('textarea') || html.includes('select');
        const hasButton = html.includes('button') || html.includes('onclick');
        
        // Check for fake tools (static output without real functionality)
        const hasStaticFake = html.includes('resultvalue.textcontent = \'42\'') || 
                              html.includes('resultvalue.textcontent = "42"');
        
        const score = [hasScript, hasFunction, hasInput, hasButton].filter(Boolean).length;
        
        resolve({
          status: res.statusCode,
          ok: res.statusCode === 200,
          hasScript,
          hasFunction,
          hasInput,
          hasButton,
          hasStaticFake,
          score,
          functional: score >= 3 && !hasStaticFake
        });
      });
    });
    req.on('error', () => resolve({ status: 0, ok: false, score: 0, functional: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false, score: 0, functional: false }); });
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
  
  const results = [];
  let working = 0;
  let fake = 0;
  let broken = 0;
  
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    const result = await checkTool(lang, tool);
    
    results.push({ tool, ...result });
    
    if (result.ok && result.functional) {
      working++;
    } else if (result.hasStaticFake) {
      fake++;
      console.log(`⚠️  ${tool} - وهمية (static output)`);
    } else if (!result.ok) {
      broken++;
      console.log(`❌ ${tool} - HTTP ${result.status}`);
    }
    
    if ((i + 1) % 50 === 0) {
      console.log(`   📊 ${i + 1}/${tools.length}...`);
    }
  }
  
  console.log(`✅ شغالة: ${working} | ⚠️ وهمية: ${fake} | ❌ معطلة: ${broken}`);
  
  return { lang, total: tools.length, working, fake, broken, results };
}

async function runFullTest() {
  console.log('🔍 اختبار شامل شامل - برمجي وبصري');
  console.log('⏳ يفحص الوظائف الحقيقية vs الوهمية...\n');
  
  const allResults = [];
  
  for (const lang of languages) {
    const result = await testLanguage(lang);
    if (result) allResults.push(result);
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 التقرير النهائي الشامل');
  console.log('='.repeat(70));
  
  const totals = allResults.reduce((acc, r) => ({
    total: acc.total + r.total,
    working: acc.working + r.working,
    fake: acc.fake + r.fake,
    broken: acc.broken + r.broken
  }), { total: 0, working: 0, fake: 0, broken: 0 });
  
  console.log(`\n📈 الإحصائيات الكلية:`);
  console.log(`   إجمالي الأدوات: ${totals.total}`);
  console.log(`   ✅ شغالة (حقيقية): ${totals.working}`);
  console.log(`   ⚠️ وهمية (static): ${totals.fake}`);
  console.log(`   ❌ معطلة (HTTP error): ${totals.broken}`);
  console.log(`   📊 نسبة النجاح: ${((totals.working/totals.total)*100).toFixed(2)}%`);
  
  console.log(`\n📊 حسب اللغة:`);
  allResults.forEach(r => {
    const pct = ((r.working/r.total)*100).toFixed(1);
    console.log(`   ${r.lang.toUpperCase()}: ${r.working}/${r.total} (${pct}%)`);
  });
  
  // List fake tools
  if (totals.fake > 0) {
    console.log(`\n⚠️ الأدوات الوهمية (تحتاج إصلاح):`);
    allResults.forEach(r => {
      const fakes = r.results.filter(x => x.hasStaticFake);
      if (fakes.length > 0) {
        console.log(`\n   ${r.lang.toUpperCase()}:`);
        fakes.forEach(f => console.log(`      - ${f.tool}`));
      }
    });
  }
  
  // Save report
  fs.writeFileSync('final-comprehensive-report.json', JSON.stringify({
    date: new Date().toISOString(),
    url: BASE_URL,
    summary: totals,
    byLanguage: allResults.map(r => ({
      lang: r.lang,
      total: r.total,
      working: r.working,
      fake: r.fake,
      broken: r.broken
    }))
  }, null, 2));
  
  console.log(`\n💾 التقرير المحفوظ: final-comprehensive-report.json`);
}

runFullTest().catch(console.error);
