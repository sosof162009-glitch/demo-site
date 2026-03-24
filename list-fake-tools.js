const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://tools-205-3g00akhbk-sas-projects-611869a5.vercel.app';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Known calculator templates with proper JS
const calculatorTemplates = {
  'age-calculator': 'birthDate',
  'average-calculator': 'numbers',
  'compound-interest-calculator': 'principal',
  'percentage-calculator': 'percent',
  'random-number-generator': 'minMax',
  'scientific-calculator': 'expression',
  'binary-to-decimal': 'binary',
  'decimal-to-binary': 'decimal',
  'decimal-to-hex': 'decimal',
  'decimal-to-octal': 'decimal',
  'hex-to-decimal': 'hex',
  'octal-to-decimal': 'octal',
  'countdown-timer': 'targetDate',
  'pomodoro-timer': 'duration',
  'calendar-generator': 'month',
  'date-difference-calculator': 'date1',
  'days-until-date': 'targetDate',
  'time-zone-converter': 'time',
  'unix-timestamp-converter': 'timestamp',
  'week-number-calculator': 'date',
  'working-days-calculator': 'startDate'
};

function checkTool(lang, tool) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}/${lang}/${tool}/`;
    const req = https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const html = data;
        const hasStaticFake = html.includes('resultvalue.textcontent = \'42\'') || 
                              html.includes('resultvalue.textcontent = "42"') ||
                              html.includes("resultvalue.textcontent = '42'") ||
                              html.includes('resultvalue.textcontent = `42`');
        resolve({ status: res.statusCode, hasStaticFake });
      });
    });
    req.on('error', () => resolve({ status: 0, hasStaticFake: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, hasStaticFake: false }); });
  });
}

async function listFakeTools() {
  console.log('🔍 جمع قائمة الأدوات الوهمية...\n');
  
  const fakeTools = {};
  
  for (const lang of languages) {
    const langDir = `/root/.openclaw/workspace/demo-site/${lang}`;
    if (!fs.existsSync(langDir)) continue;
    
    const tools = fs.readdirSync(langDir).filter(f => {
      return fs.statSync(path.join(langDir, f)).isDirectory() && !f.startsWith('.');
    });
    
    fakeTools[lang] = [];
    
    for (const tool of tools) {
      if (!calculatorTemplates[tool]) continue; // Skip non-calculator tools
      
      const result = await checkTool(lang, tool);
      if (result.hasStaticFake) {
        fakeTools[lang].push(tool);
      }
    }
    
    console.log(`${lang}: ${fakeTools[lang].length} أدوات وهمية`);
  }
  
  console.log('\n❌ قائمة الأدوات الوهمية:');
  for (const [lang, tools] of Object.entries(fakeTools)) {
    if (tools.length > 0) {
      console.log(`\n${lang.toUpperCase()}:`);
      tools.forEach(t => console.log(`  - ${t}`));
    }
  }
  
  // Save list
  fs.writeFileSync('fake-tools-list.json', JSON.stringify(fakeTools, null, 2));
  console.log('\n💾 القائمة المحفوظة: fake-tools-list.json');
}

listFakeTools();
