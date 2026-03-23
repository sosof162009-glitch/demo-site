const https = require('https');
const fs = require('fs');

// Load tools data
const toolsData = JSON.parse(fs.readFileSync('./tools-data.json', 'utf8'));
const baseUrl = 'demo-site-4jbi.vercel.app';

console.log('🚀 بدء اختبار شامل لـ 205 أداة...\n');

const results = {
  working: [],
  notFound: [],
  partial: [],
  byCategory: {}
};

// Initialize category counters
for (const cat of toolsData.categories) {
  results.byCategory[cat.name_en] = { total: cat.count, working: 0, failed: 0 };
}

async function testTool(tool) {
  return new Promise((resolve) => {
    const url = `https://${baseUrl}/en/${tool.slug}/`;
    const req = https.get(url, (res) => {
      const status = res.statusCode;
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 30000) res.destroy();
      });
      
      res.on('end', () => {
        // Check for JavaScript functionality
        const hasInitFunction = data.includes('function init') || 
                               data.includes('initImageConverter') ||
                               data.includes('initTextAnalyzer') ||
                               data.includes('initGenerator') ||
                               data.includes('initCodeEditor') ||
                               data.includes('initCalculator') ||
                               data.includes('initPDFTool');
        
        const hasEventListeners = data.includes('addEventListener') ||
                                  data.includes('document.addEventListener');
        
        const hasTemplateFeatures = data.includes('dropZone') || 
                                    data.includes('textInput') ||
                                    data.includes('codeEditor') ||
                                    data.includes('generateBtn') ||
                                    data.includes('fileInput');
        
        const hasWorkingJS = hasInitFunction || hasEventListeners;
        
        resolve({
          id: tool.id,
          name: tool.name,
          slug: tool.slug,
          category: tool.category,
          status,
          hasWorkingJS,
          hasTemplateFeatures,
          url
        });
      });
    });
    
    req.on('error', () => {
      resolve({
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        category: tool.category,
        status: 'ERROR',
        hasWorkingJS: false,
        hasTemplateFeatures: false,
        url: `https://${baseUrl}/en/${tool.slug}/`
      });
    });
    
    req.setTimeout(15000, () => {
      req.destroy();
      resolve({
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        category: tool.category,
        status: 'TIMEOUT',
        hasWorkingJS: false,
        hasTemplateFeatures: false,
        url: `https://${baseUrl}/en/${tool.slug}/`
      });
    });
  });
}

async function runAllTests() {
  const totalTools = toolsData.tools.length;
  let tested = 0;
  
  console.log(`الإجمالي: ${totalTools} أداة\n`);
  
  for (const tool of toolsData.tools) {
    const result = await testTool(tool);
    tested++;
    
    if (result.status === 200 && result.hasWorkingJS) {
      results.working.push(result);
      results.byCategory[result.category].working++;
      console.log(`✅ [${tested}/${totalTools}] ${tool.name}`);
    } else if (result.status === 200) {
      results.partial.push(result);
      results.byCategory[result.category].working++;
      console.log(`⚠️  [${tested}/${totalTools}] ${tool.name} - JS ناقص`);
    } else {
      results.notFound.push(result);
      results.byCategory[result.category].failed++;
      console.log(`❌ [${tested}/${totalTools}] ${tool.name} - ${result.status}`);
    }
  }
  
  // Generate report
  generateReport();
}

function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 التقرير النهائي - اختبار 205 أداة');
  console.log('='.repeat(60));
  
  console.log(`\n✅ شغالة 100%: ${results.working.length} أداة`);
  console.log(`⚠️  JavaScript ناقص: ${results.partial.length} أداة`);
  console.log(`❌ غير موجودة (404): ${results.notFound.length} أداة`);
  
  console.log('\n📁 حسب الفئة:');
  console.log('-'.repeat(60));
  for (const [cat, stats] of Object.entries(results.byCategory)) {
    const pct = Math.round((stats.working / stats.total) * 100);
    const status = pct === 100 ? '✅' : pct >= 50 ? '⚠️' : '❌';
    console.log(`${status} ${cat}: ${stats.working}/${stats.total} (${pct}%)`);
  }
  
  // Save detailed report
  const report = {
    date: new Date().toISOString(),
    url: `https://${baseUrl}`,
    summary: {
      total: 205,
      working: results.working.length,
      partial: results.partial.length,
      notFound: results.notFound.length
    },
    byCategory: results.byCategory,
    working: results.working,
    partial: results.partial,
    notFound: results.notFound
  };
  
  fs.writeFileSync('comprehensive-test-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 تم حفظ التقرير في: comprehensive-test-report.json');
  
  // Print not found tools
  if (results.notFound.length > 0) {
    console.log('\n❌ الأدوات المفقودة (404):');
    console.log('-'.repeat(60));
    for (const tool of results.notFound) {
      console.log(`  • ${tool.name} (${tool.slug})`);
    }
  }
  
  // Print partial tools
  if (results.partial.length > 0) {
    console.log('\n⚠️  الأدوات التي تحتاج تحديث JavaScript:');
    console.log('-'.repeat(60));
    for (const tool of results.partial) {
      console.log(`  • ${tool.name} (${tool.slug})`);
    }
  }
}

runAllTests();
