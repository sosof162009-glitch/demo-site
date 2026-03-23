const fs = require('fs');
const path = require('path');

// Load special tools logic
const specialToolsLogic = fs.readFileSync('./templates/logic/special-tools.js', 'utf8');

// Special tools with their types
const specialTools = [
  { slug: 'whatsapp-link-generator', type: 'whatsapp' },
  { slug: 'emoji-to-unicode', type: 'emoji-to-unicode' },
  { slug: 'unicode-to-emoji', type: 'unicode-to-emoji' },
  { slug: 'text-to-binary', type: 'text-to-binary' },
  { slug: 'binary-to-text', type: 'binary-to-text' },
  { slug: 'number-to-words', type: 'number-to-words' },
  { slug: 'roman-numeral-converter', type: 'roman' },
  { slug: 'screen-resolution-detector', type: 'screen-resolution' },
  { slug: 'browser-info-detector', type: 'browser-info' },
  { slug: 'internet-speed-test', type: 'speed-test' }
];

const languages = ['en', 'ar', 'fr', 'es', 'de'];

console.log('🔧 إصلاح أدوات Special Tools...\n');

let fixed = 0;
let errors = [];

for (const tool of specialTools) {
  console.log(`🛠️  ${tool.slug}`);
  
  for (const lang of languages) {
    try {
      const filePath = path.join(lang, tool.slug, 'index.html');
      if (!fs.existsSync(filePath)) {
        errors.push(`${tool.slug} (${lang}): File not found`);
        continue;
      }
      
      let html = fs.readFileSync(filePath, 'utf8');
      
      // Check if already has proper JS
      if (html.includes('initSpecialTool') || html.includes(`init${tool.type.charAt(0).toUpperCase()}`)) {
        console.log(`   ✅ ${lang} - Already has JS`);
        continue;
      }
      
      // Inject the logic
      const logicScript = `
    ${specialToolsLogic}
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initSpecialTool('${tool.type}');
    });
      `;
      
      // Replace or add script
      if (html.includes('<script>')) {
        html = html.replace(/<script>([\s\S]*?)<\/script>/, `<script>${logicScript}</script>`);
      } else {
        html = html.replace('</body>', `<script>${logicScript}</script>\n</body>`);
      }
      
      fs.writeFileSync(filePath, html);
      fixed++;
      console.log(`   ✅ ${lang} - Fixed`);
    } catch (err) {
      errors.push(`${tool.slug} (${lang}): ${err.message}`);
      console.log(`   ❌ ${lang} - Error: ${err.message}`);
    }
  }
}

console.log(`\n✅ Complete! Fixed ${fixed} files`);
if (errors.length > 0) {
  console.log(`\n⚠️  ${errors.length} errors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
