const https = require('https');

// List of tools to test
const toolsToTest = [
  // Images (10 samples)
  { cat: 'Images', slug: 'jpg-to-png', name: 'JPG to PNG' },
  { cat: 'Images', slug: 'png-to-jpg', name: 'PNG to JPG' },
  { cat: 'Images', slug: 'webp-to-jpg', name: 'WebP to JPG' },
  { cat: 'Images', slug: 'heic-to-jpg', name: 'HEIC to JPG' },
  { cat: 'Images', slug: 'image-resizer', name: 'Image Resizer' },
  { cat: 'Images', slug: 'compress-jpg', name: 'Compress JPG' },
  { cat: 'Images', slug: 'image-to-base64', name: 'Image to Base64' },
  { cat: 'Images', slug: 'favicon-generator', name: 'Favicon Generator' },
  
  // PDF (5 samples)
  { cat: 'PDF', slug: 'pdf-to-jpg', name: 'PDF to JPG' },
  { cat: 'PDF', slug: 'merge-pdf', name: 'Merge PDF' },
  { cat: 'PDF', slug: 'split-pdf', name: 'Split PDF' },
  { cat: 'PDF', slug: 'compress-pdf', name: 'Compress PDF' },
  { cat: 'PDF', slug: 'jpg-to-pdf', name: 'JPG to PDF' },
  
  // Text (5 samples)
  { cat: 'Text', slug: 'character-counter', name: 'Character Counter' },
  { cat: 'Text', slug: 'case-converter', name: 'Case Converter' },
  { cat: 'Text', slug: 'reverse-text', name: 'Reverse Text' },
  { cat: 'Text', slug: 'lorem-ipsum', name: 'Lorem Ipsum' },
  { cat: 'Text', slug: 'morse-code', name: 'Morse Code' },
  
  // Developers (8 samples)
  { cat: 'Developers', slug: 'json-minifier', name: 'JSON Minifier' },
  { cat: 'Developers', slug: 'csv-to-json', name: 'CSV to JSON' },
  { cat: 'Developers', slug: 'html-formatter', name: 'HTML Formatter' },
  { cat: 'Developers', slug: 'css-minifier', name: 'CSS Minifier' },
  { cat: 'Developers', slug: 'base64-encoder', name: 'Base64 Encoder' },
  { cat: 'Developers', slug: 'md5-hash', name: 'MD5 Hash' },
  { cat: 'Developers', slug: 'uuid-generator', name: 'UUID Generator' },
  { cat: 'Developers', slug: 'regex-tester', name: 'Regex Tester' },
  
  // Math (5 samples)
  { cat: 'Math', slug: 'binary-to-decimal', name: 'Binary to Decimal' },
  { cat: 'Math', slug: 'scientific-calculator', name: 'Scientific Calculator' },
  { cat: 'Math', slug: 'percentage-calculator', name: 'Percentage Calculator' },
  { cat: 'Math', slug: 'compound-interest', name: 'Compound Interest' },
  { cat: 'Math', slug: 'random-number', name: 'Random Number' },
  
  // Colors (5 samples)
  { cat: 'Colors', slug: 'hex-to-rgb', name: 'HEX to RGB' },
  { cat: 'Colors', slug: 'color-picker', name: 'Color Picker' },
  { cat: 'Colors', slug: 'css-gradient', name: 'CSS Gradient' },
  { cat: 'Colors', slug: 'color-palette', name: 'Color Palette' },
  { cat: 'Colors', slug: 'glassmorphism', name: 'Glassmorphism' },
  
  // Security (4 samples)
  { cat: 'Security', slug: 'password-strength', name: 'Password Strength' },
  { cat: 'Security', slug: 'pin-generator', name: 'PIN Generator' },
  { cat: 'Security', slug: 'privacy-policy', name: 'Privacy Policy' },
  { cat: 'Security', slug: 'ip-lookup', name: 'IP Lookup' },
  
  // SEO (4 samples)
  { cat: 'SEO', slug: 'meta-tags', name: 'Meta Tags' },
  { cat: 'SEO', slug: 'sitemap-xml', name: 'Sitemap XML' },
  { cat: 'SEO', slug: 'utm-builder', name: 'UTM Builder' },
  { cat: 'SEO', slug: 'keyword-density', name: 'Keyword Density' },
  
  // Data (4 samples)
  { cat: 'Data', slug: 'csv-viewer', name: 'CSV Viewer' },
  { cat: 'Data', slug: 'fake-data', name: 'Fake Data' },
  { cat: 'Data', slug: 'qr-code', name: 'QR Code' },
  { cat: 'Data', slug: 'barcode', name: 'Barcode' },
  
  // Time (4 samples)
  { cat: 'Time', slug: 'timestamp', name: 'Unix Timestamp' },
  { cat: 'Time', slug: 'timezone', name: 'Time Zone' },
  { cat: 'Time', slug: 'date-difference', name: 'Date Difference' },
  { cat: 'Time', slug: 'age-calculator', name: 'Age Calculator' },
  
  // Units (5 samples)
  { cat: 'Units', slug: 'length', name: 'Length' },
  { cat: 'Units', slug: 'weight', name: 'Weight' },
  { cat: 'Units', slug: 'temperature', name: 'Temperature' },
  { cat: 'Units', slug: 'currency', name: 'Currency' },
  { cat: 'Units', slug: 'speed', name: 'Speed' }
];

const baseUrl = 'demo-site-4jbi.vercel.app';

console.log('🚀 Starting Tool Tests...\n');

async function testTool(tool) {
  return new Promise((resolve) => {
    const url = `https://${baseUrl}/en/${tool.slug}/`;
    const req = https.get(url, (res) => {
      const status = res.statusCode;
      let hasJS = false;
      let hasTemplate = false;
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 50000) res.destroy(); // Limit data
      });
      
      res.on('end', () => {
        // Check for JavaScript
        hasJS = data.includes('function init') || 
                data.includes('document.addEventListener') ||
                data.includes('window.');
        
        // Check for template features
        hasTemplate = data.includes('dropZone') || 
                     data.includes('textInput') ||
                     data.includes('codeEditor') ||
                     data.includes('generateBtn');
        
        const statusEmoji = status === 200 ? '✅' : status === 404 ? '❌' : '⚠️';
        
        resolve({
          ...tool,
          status,
          hasJS,
          hasTemplate,
          ok: status === 200 && hasJS && hasTemplate
        });
      });
    });
    
    req.on('error', () => {
      resolve({ ...tool, status: 'ERROR', hasJS: false, hasTemplate: false, ok: false });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ ...tool, status: 'TIMEOUT', hasJS: false, hasTemplate: false, ok: false });
    });
  });
}

async function runTests() {
  const results = [];
  
  for (const tool of toolsToTest) {
    const result = await testTool(tool);
    results.push(result);
    
    const status = result.ok ? '✅ OK' : result.status === 200 ? '⚠️ Partial' : `❌ ${result.status}`;
    console.log(`${status} | ${result.cat} | ${result.name}`);
  }
  
  console.log('\n📊 Summary:');
  console.log(`Total: ${results.length}`);
  console.log(`OK: ${results.filter(r => r.ok).length}`);
  console.log(`Partial: ${results.filter(r => r.status === 200 && !r.ok).length}`);
  console.log(`Failed: ${results.filter(r => r.status !== 200).length}`);
  
  // Save results
  const fs = require('fs');
  fs.writeFileSync('test-results.json', JSON.stringify(results, null, 2));
  console.log('\n💾 Results saved to test-results.json');
}

runTests();
