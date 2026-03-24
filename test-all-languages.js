const https = require('https');
const fs = require('fs');

const toolsData = JSON.parse(fs.readFileSync('./tools-data.json', 'utf8'));
const baseUrl = 'tools-205-1sduooywf-sas-projects-611869a5.vercel.app';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

console.log('🚀 بدء اختبار شامل لـ 205 أداة × 5 لغات = 1,025 صفحة...\n');

const results = {
  total: 0,
  working: 0,
  failed: 0,
  byTool: {},
  byLanguage: { en: 0, ar: 0, fr: 0, es: 0, de: 0 },
  failedTools: []
};

async function testPage(lang, tool) {
  return new Promise((resolve) => {
    const url = `https://${baseUrl}/${lang}/${tool.slug}/`;
    const req = https.get(url, { timeout: 10000 }, (res) => {
      const status = res.statusCode;
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 20000) res.destroy();
      });
      
      res.on('end', () => {
        const hasJS = data.includes('function ') && 
                     (data.includes('addEventListener') || data.includes('onclick'));
        const hasCorrectTemplate = !data.includes('processText()') && 
                                   !data.includes('Enter text here');
        
        resolve({
          lang,
          tool: tool.name,
          slug: tool.slug,
          status,
          hasJS,
          hasCorrectTemplate,
          url
        });
      });
    });
    
    req.on('error', () => {
      resolve({ lang, tool: tool.name, slug: tool.slug, status: 'ERROR', hasJS: false, hasCorrectTemplate: false, url });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ lang, tool: tool.name, slug: tool.slug, status: 'TIMEOUT', hasJS: false, hasCorrectTemplate: false, url });
    });
  });
}

async function runAllTests() {
  const totalTests = toolsData.tools.length * languages.length;
  let tested = 0;
  
  for (const tool of toolsData.tools) {
    results.byTool[tool.id] = { name: tool.name, slug: tool.slug, status: {}, working: 0, failed: 0 };
    
    for (const lang of languages) {
      const result = await testPage(lang, tool);
      tested++;
      results.total++;
      
      const isWorking = result.status === 200 && result.hasJS;
      
      if (isWorking) {
        results.working++;
        results.byTool[tool.id].working++;
        results.byLanguage[lang]++;
      } else {
        results.failed++;
        results.byTool[tool.id].failed++;
        results.failedTools.push({
          tool: tool.name,
          lang,
          slug: tool.slug,
          status: result.status,
          hasJS: result.hasJS,
          url: result.url
        });
      }
      
      results.byTool[tool.id].status[lang] = isWorking ? '✅' : '❌';
      
      process.stdout.write(`\r📊 [${tested}/${totalTests}] ${tool.name} (${lang}) - ${isWorking ? '✅' : '❌'}`);
    }
    console.log(); // New line after each tool
  }
  
  generateReport();
}

function generateReport() {
  console.log('\n' + '='.repeat(70));
  console.log('📊 التقرير الشامل - اختبار 1,025 صفحة');
  console.log('='.repeat(70));
  
  console.log(`\n✅ الشغالة: ${results.working}/${results.total} (${Math.round(results.working/results.total*100)}%)`);
  console.log(`❌ الفاشلة: ${results.failed}/${results.total} (${Math.round(results.failed/results.total*100)}%)`);
  
  console.log('\n📁 حسب اللغة:');
  for (const [lang, count] of Object.entries(results.byLanguage)) {
    const total = toolsData.tools.length;
    const pct = Math.round((count / total) * 100);
    console.log(`  ${lang.toUpperCase()}: ${count}/${total} (${pct}%)`);
  }
  
  console.log('\n❌ الأدوات الفاشلة:');
  if (results.failedTools.length === 0) {
    console.log('  لا يوجد! ✅');
  } else {
    results.failedTools.forEach(t => {
      console.log(`  • ${t.tool} (${t.lang}) - ${t.status}`);
    });
  }
  
  // Save report
  fs.writeFileSync('final-comprehensive-test.json', JSON.stringify(results, null, 2));
  console.log('\n💾 تم حفظ التقرير: final-comprehensive-test.json');
}

runAllTests();
