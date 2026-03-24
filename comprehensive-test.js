const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'tools-205-e15x2gis8-sas-projects-611869a5.vercel.app';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Test a single page
function testPage(url) {
  return new Promise((resolve) => {
    const req = https.get(`https://${url}`, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const html = data;
        
        // Check for fake static output
        const hasStaticFake = html.includes('resultValue.textContent = \'42\'') || 
                              html.includes('resultValue.textContent = "42"');
        
        // Check for wrong template indicators
        const hasGenericTextTool = html.includes('أدخل النص') || 
                                   html.includes('Enter text') ||
                                   html.includes('Entrez le texte');
        
        // Check for required elements based on tool type
        const hasScript = html.includes('<script>');
        const hasInput = html.includes('<input') || html.includes('<textarea') || html.includes('<select');
        const hasButton = html.includes('<button');
        
        resolve({
          status: res.statusCode,
          ok: res.statusCode === 200,
          hasStaticFake,
          hasGenericTextTool,
          hasScript,
          hasInput,
          hasButton
        });
      });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
  });
}

async function runFullTest() {
  console.log('🔍 فحص شامل شامل للموقع');
  console.log('='.repeat(60));
  console.log(`الرابط: https://${BASE_URL}\n`);
  
  const results = [];
  let totalTools = 0;
  let workingTools = 0;
  let fakeTools = 0;
  let wrongTemplateTools = 0;
  let brokenTools = 0;
  
  for (const lang of languages) {
    const langDir = `/root/.openclaw/workspace/demo-site/${lang}`;
    if (!fs.existsSync(langDir)) continue;
    
    const tools = fs.readdirSync(langDir).filter(f => {
      return fs.statSync(path.join(langDir, f)).isDirectory() && !f.startsWith('.');
    }).sort();
    
    console.log(`\n🌐 ${lang.toUpperCase()}: ${tools.length} أداة`);
    console.log('-'.repeat(60));
    
    const langResults = [];
    
    for (const tool of tools) {
      totalTools++;
      const url = `${BASE_URL}/${lang}/${tool}/`;
      const result = await testPage(url);
      
      langResults.push({ tool, ...result });
      
      if (result.ok && !result.hasStaticFake && !result.hasGenericTextTool) {
        workingTools++;
      } else if (result.hasStaticFake) {
        fakeTools++;
        console.log(`⚠️  ${tool} - وهمية (static output)`);
      } else if (result.hasGenericTextTool) {
        wrongTemplateTools++;
        console.log(`❌ ${tool} - قالب خاطئ (text tool template)`);
      } else if (!result.ok) {
        brokenTools++;
        console.log(`💥 ${tool} - HTTP ${result.status}`);
      }
    }
    
    const okCount = langResults.filter(r => r.ok && !r.hasStaticFake && !r.hasGenericTextTool).length;
    console.log(`✅ شغالة: ${okCount} | ⚠️ وهمية: ${langResults.filter(r => r.hasStaticFake).length} | ❌ قالب خاطئ: ${langResults.filter(r => r.hasGenericTextTool).length} | 💥 معطلة: ${langResults.filter(r => !r.ok).length}`);
    
    results.push({ lang, tools: langResults });
  }
  
  // Final Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 التقرير النهائي الشامل');
  console.log('='.repeat(60));
  
  console.log(`\n📈 الإحصائيات الكلية:`);
  console.log(`   إجمالي الأدوات المُختبرة: ${totalTools}`);
  console.log(`   ✅ شغالة (صحيحة): ${workingTools}`);
  console.log(`   ⚠️ وهمية (static): ${fakeTools}`);
  console.log(`   ❌ قالب خاطئ: ${wrongTemplateTools}`);
  console.log(`   💥 معطلة (HTTP error): ${brokenTools}`);
  console.log(`   📊 نسبة النجاح: ${((workingTools/totalTools)*100).toFixed(2)}%`);
  
  // Save report
  fs.writeFileSync('comprehensive-test-final.json', JSON.stringify({
    date: new Date().toISOString(),
    url: `https://${BASE_URL}`,
    summary: { total: totalTools, working: workingTools, fake: fakeTools, wrongTemplate: wrongTemplateTools, broken: brokenTools },
    byLanguage: results.map(r => ({
      lang: r.lang,
      total: r.tools.length,
      working: r.tools.filter(t => t.ok && !t.hasStaticFake && !t.hasGenericTextTool).length,
      fake: r.tools.filter(t => t.hasStaticFake).length,
      wrongTemplate: r.tools.filter(t => t.hasGenericTextTool).length,
      broken: r.tools.filter(t => !t.ok).length
    }))
  }, null, 2));
  
  console.log(`\n💾 التقرير المحفوظ: comprehensive-test-final.json`);
}

runFullTest().catch(console.error);
