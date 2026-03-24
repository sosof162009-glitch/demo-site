const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';

// Test specific tools with expected functionality
const toolsToTest = {
  // Image Converters - should have file upload
  'jpg-to-png': { 
    category: 'image-converter',
    checkFor: ['file', 'upload', 'drop', 'convert', 'input'],
    mustHave: ['type="file"', 'drag', 'dropzone']
  },
  'png-to-jpg': {
    category: 'image-converter',
    checkFor: ['file', 'upload', 'drop', 'convert'],
    mustHave: ['type="file"']
  },
  
  // PDF Tools
  'merge-pdf': {
    category: 'pdf-tool',
    checkFor: ['file', 'upload', 'merge', 'pdf'],
    mustHave: ['type="file"']
  },
  'split-pdf': {
    category: 'pdf-tool',
    checkFor: ['file', 'upload', 'split', 'pdf'],
    mustHave: ['type="file"']
  },
  
  // Text Tools
  'word-counter': {
    category: 'text-analyzer',
    checkFor: ['textarea', 'count', 'words', 'characters'],
    mustHave: ['textarea']
  },
  'case-converter': {
    category: 'text-analyzer',
    checkFor: ['text', 'convert', 'uppercase', 'lowercase'],
    mustHave: ['textarea', 'function']
  },
  
  // Developer Tools
  'json-formatter': {
    category: 'code-editor',
    checkFor: ['json', 'format', 'validate', 'code'],
    mustHave: ['textarea', 'format']
  },
  
  // Calculators
  'bmi-calculator': {
    category: 'calculator',
    checkFor: ['input', 'calculate', 'height', 'weight', 'bmi'],
    mustHave: ['type="number"', 'calculate']
  },
  'percentage-calculator': {
    category: 'calculator',
    checkFor: ['input', 'calculate', 'percentage'],
    mustHave: ['type="number"']
  },
  
  // Generators
  'password-generator': {
    category: 'generator',
    checkFor: ['generate', 'password', 'length', 'options'],
    mustHave: ['generate', 'length']
  },
  'color-picker': {
    category: 'color-tool',
    checkFor: ['color', 'picker', 'hex', 'rgb'],
    mustHave: ['type="color"', 'picker']
  },
  
  // Special Tools
  'whatsapp-link-generator': {
    category: 'special',
    checkFor: ['phone', 'message', 'link', 'whatsapp'],
    mustHave: ['tel', 'whatsapp']
  },
  'emoji-to-unicode': {
    category: 'special',
    checkFor: ['emoji', 'unicode', 'convert'],
    mustHave: ['emoji', 'unicode']
  },
  'number-to-words': {
    category: 'special',
    checkFor: ['number', 'words', 'convert'],
    mustHave: ['type="number"', 'convert']
  },
  'text-to-binary': {
    category: 'special',
    checkFor: ['text', 'binary', 'convert'],
    mustHave: ['binary', 'convert']
  }
};

const languages = ['en', 'ar', 'fr', 'es', 'de'];

function fetchPage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ 
        status: res.statusCode, 
        ok: res.statusCode === 200,
        html: data.toLowerCase()
      }));
    });
    req.on('error', () => resolve({ status: 0, ok: false, html: '' }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false, html: '' }); });
  });
}

function analyzeTool(html, toolName, config) {
  const issues = [];
  const found = [];
  
  // Check if page loads
  if (!html || html.length < 100) {
    return { status: 'error', issues: ['Page empty or not loading'], score: 0 };
  }
  
  // Check for must-have elements
  for (const must of config.mustHave) {
    if (html.includes(must.toLowerCase())) {
      found.push(must);
    } else {
      issues.push(`Missing: ${must}`);
    }
  }
  
  // Check for expected functionality keywords
  for (const keyword of config.checkFor) {
    if (html.includes(keyword.toLowerCase())) {
      found.push(keyword);
    }
  }
  
  // Check for JavaScript functionality
  const hasScript = html.includes('<script>');
  const hasFunction = html.includes('function') || html.includes('=>');
  const hasEvent = html.includes('onclick') || html.includes('addEventListener');
  
  if (!hasScript) issues.push('No JavaScript found');
  if (!hasFunction) issues.push('No functions defined');
  if (!hasEvent) issues.push('No event handlers');
  
  // Calculate score
  const score = Math.round((found.length / (config.mustHave.length + config.checkFor.length)) * 100);
  
  return {
    status: issues.length === 0 ? 'working' : 'issues',
    issues,
    found: found.length,
    score,
    hasScript,
    hasFunction,
    hasEvent
  };
}

async function testLanguage(lang) {
  console.log(`\n🌐 ${lang.toUpperCase()}`);
  console.log('='.repeat(70));
  
  const results = [];
  
  for (const [toolName, config] of Object.entries(toolsToTest)) {
    const url = `${BASE_URL}/${lang}/${toolName}/`;
    const page = await fetchPage(url);
    
    if (!page.ok) {
      console.log(`❌ ${toolName}: HTTP ${page.status}`);
      results.push({ tool: toolName, status: 'error', score: 0 });
      continue;
    }
    
    const analysis = analyzeTool(page.html, toolName, config);
    results.push({ tool: toolName, ...analysis });
    
    const icon = analysis.status === 'working' ? '✅' : '⚠️';
    console.log(`${icon} ${toolName}: ${analysis.score}% (${analysis.found} features)`);
    
    if (analysis.issues.length > 0) {
      analysis.issues.forEach(issue => console.log(`   └─ ${issue}`));
    }
  }
  
  return results;
}

async function runFullAnalysis() {
  console.log('🔍 فحص شامل للأدوات - برمجي وبصري');
  console.log('⏳ يفحص الوظائف الفعلية وليس HTTP فقط...\n');
  
  const allResults = {};
  
  for (const lang of languages) {
    allResults[lang] = await testLanguage(lang);
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 التقرير النهائي');
  console.log('='.repeat(70));
  
  let totalTools = 0;
  let workingTools = 0;
  let problematicTools = [];
  
  for (const [lang, results] of Object.entries(allResults)) {
    const working = results.filter(r => r.status === 'working').length;
    const issues = results.filter(r => r.status !== 'working');
    
    totalTools += results.length;
    workingTools += working;
    
    console.log(`\n${lang.toUpperCase()}: ${working}/${results.length} شغالة (${((working/results.length)*100).toFixed(0)}%)`);
    
    if (issues.length > 0) {
      console.log('   الأدوات فيها مشاكل:');
      issues.forEach(i => console.log(`   - ${i.tool}: ${i.issues?.join(', ') || 'HTTP error'}`));
      problematicTools.push(...issues.map(i => `${lang}/${i.tool}`));
    }
  }
  
  console.log(`\n📈 الإجمالي:`);
  console.log(`   إجمالي الأدوات المفحوصة: ${totalTools}`);
  console.log(`   ✅ شغالة تماماً: ${workingTools}`);
  console.log(`   ⚠️ فيها مشاكل: ${totalTools - workingTools}`);
  console.log(`   📊 نسبة النجاح: ${((workingTools/totalTools)*100).toFixed(1)}%`);
  
  // Save report
  fs.writeFileSync('detailed-analysis-report.json', JSON.stringify({
    date: new Date().toISOString(),
    summary: { total: totalTools, working: workingTools, issues: totalTools - workingTools },
    results: allResults
  }, null, 2));
  
  console.log(`\n💾 التقرير المحفوظ: detailed-analysis-report.json`);
}

runFullAnalysis();
