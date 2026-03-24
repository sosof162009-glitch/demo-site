const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://tools-205-26o8wm2zf-sas-projects-611869a5.vercel.app';

// Sample tools from each category
const samples = {
  'image-converter': ['jpg-to-png', 'png-to-webp', 'webp-to-jpg', 'avif-to-jpg'],
  'image-tools': ['image-resizer', 'image-cropper', 'image-compressor'],
  'pdf-tools': ['pdf-to-jpg', 'pdf-merge', 'pdf-split'],
  'text-tools': ['word-counter', 'character-counter', 'text-case-converter'],
  'developer-tools': ['json-formatter', 'json-validator', 'html-formatter'],
  'color-tools': ['color-picker', 'color-converter', 'color-palette-generator'],
  'math-numbers': ['bmi-calculator', 'percentage-calculator', 'age-calculator'],
  'date-time': ['date-calculator', 'time-converter', 'countdown-timer'],
  'unit-converter': ['length-converter', 'weight-converter', 'temperature-converter'],
  'seo-web': ['meta-tag-generator', 'open-graph-generator', 'favicon-generator'],
  'security': ['password-generator', 'md5-generator', 'sha256-generator'],
  'data-tools': ['csv-to-json', 'json-to-csv', 'base64-encoder'],
  'special': ['whatsapp-link-generator', 'emoji-to-unicode', 'internet-speed-test', 
              'unicode-to-emoji', 'text-to-binary', 'number-to-words', 
              'roman-numeral-converter', 'screen-resolution-detector', 'browser-info-detector']
};

const languages = ['en', 'ar', 'fr', 'es', 'de'];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode === 200, url });
    });
    req.on('error', () => resolve({ status: 0, ok: false, url }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false, url }); });
  });
}

async function runQuickTest() {
  console.log('🔍 اختبار سريع لعينات من كل فئة...\n');
  
  const results = { total: 0, ok: 0, failed: [] };
  
  for (const [category, tools] of Object.entries(samples)) {
    console.log(`\n📁 ${category}:`);
    
    for (const tool of tools) {
      // Test only EN for speed
      const url = `${BASE_URL}/en/${tool}/`;
      const result = await checkUrl(url);
      results.total++;
      
      if (result.ok) {
        results.ok++;
        console.log(`  ✅ ${tool}`);
      } else {
        results.failed.push({ category, tool, status: result.status });
        console.log(`  ❌ ${tool} (HTTP ${result.status})`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 النتائج:');
  console.log(`✅ شغالة: ${results.ok}/${results.total}`);
  console.log(`❌ معطلة: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ الأدوات المعطلة:');
    results.failed.forEach(f => console.log(`  - ${f.category}/${f.tool}`));
  }
  
  return results;
}

runQuickTest();
