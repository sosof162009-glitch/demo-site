const fs = require('fs');
const path = require('path');

const BASE_DIR = '/root/.openclaw/workspace/demo-site';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

const converters = [
  { tool: 'binary-to-decimal', from: 'binary', to: 'decimal', base: 2 },
  { tool: 'decimal-to-binary', from: 'decimal', to: 'binary', base: 2 },
  { tool: 'decimal-to-hex', from: 'decimal', to: 'hex', base: 16 },
  { tool: 'decimal-to-octal', from: 'decimal', to: 'octal', base: 8 },
  { tool: 'hex-to-decimal', from: 'hex', to: 'decimal', base: 16 },
  { tool: 'octal-to-decimal', from: 'octal', to: 'decimal', base: 8 }
];

const texts = {
  'binary-to-decimal': {
    en: { from: 'Binary', to: 'Decimal', convert: 'Convert', placeholder: '101010' },
    ar: { from: 'باينري', to: 'عشري', convert: 'حول', placeholder: '101010' },
    fr: { from: 'Binaire', to: 'Décimal', convert: 'Convertir', placeholder: '101010' },
    es: { from: 'Binario', to: 'Decimal', convert: 'Convertir', placeholder: '101010' },
    de: { from: 'Binär', to: 'Dezimal', convert: 'Konvertieren', placeholder: '101010' }
  },
  'decimal-to-binary': {
    en: { from: 'Decimal', to: 'Binary', convert: 'Convert', placeholder: '42' },
    ar: { from: 'عشري', to: 'باينري', convert: 'حول', placeholder: '42' },
    fr: { from: 'Décimal', to: 'Binaire', convert: 'Convertir', placeholder: '42' },
    es: { from: 'Decimal', to: 'Binario', convert: 'Convertir', placeholder: '42' },
    de: { from: 'Dezimal', to: 'Binär', convert: 'Konvertieren', placeholder: '42' }
  },
  'decimal-to-hex': {
    en: { from: 'Decimal', to: 'Hexadecimal', convert: 'Convert', placeholder: '255' },
    ar: { from: 'عشري', to: 'هكس', convert: 'حول', placeholder: '255' },
    fr: { from: 'Décimal', to: 'Hexadécimal', convert: 'Convertir', placeholder: '255' },
    es: { from: 'Decimal', to: 'Hexadecimal', convert: 'Convertir', placeholder: '255' },
    de: { from: 'Dezimal', to: 'Hexadezimal', convert: 'Konvertieren', placeholder: '255' }
  },
  'decimal-to-octal': {
    en: { from: 'Decimal', to: 'Octal', convert: 'Convert', placeholder: '64' },
    ar: { from: 'عشري', to: 'أوكتال', convert: 'حول', placeholder: '64' },
    fr: { from: 'Décimal', to: 'Octal', convert: 'Convertir', placeholder: '64' },
    es: { from: 'Decimal', to: 'Octal', convert: 'Convertir', placeholder: '64' },
    de: { from: 'Dezimal', to: 'Oktal', convert: 'Konvertieren', placeholder: '64' }
  },
  'hex-to-decimal': {
    en: { from: 'Hexadecimal', to: 'Decimal', convert: 'Convert', placeholder: 'FF' },
    ar: { from: 'هكس', to: 'عشري', convert: 'حول', placeholder: 'FF' },
    fr: { from: 'Hexadécimal', to: 'Décimal', convert: 'Convertir', placeholder: 'FF' },
    es: { from: 'Hexadecimal', to: 'Decimal', convert: 'Convertir', placeholder: 'FF' },
    de: { from: 'Hexadezimal', to: 'Dezimal', convert: 'Konvertieren', placeholder: 'FF' }
  },
  'octal-to-decimal': {
    en: { from: 'Octal', to: 'Decimal', convert: 'Convert', placeholder: '77' },
    ar: { from: 'أوكتال', to: 'عشري', convert: 'حول', placeholder: '77' },
    fr: { from: 'Octal', to: 'Décimal', convert: 'Convertir', placeholder: '77' },
    es: { from: 'Octal', to: 'Decimal', convert: 'Convertir', placeholder: '77' },
    de: { from: 'Oktal', to: 'Dezimal', convert: 'Konvertieren', placeholder: '77' }
  }
};

console.log('🔧 إصلاح محولات أنظمة الأرقام (6 أدوات × 5 لغات = 30 ملف)\n');

let fixed = 0;
let errors = [];

for (const { tool, from, to } of converters) {
  console.log(`🔧 ${tool} (${from} → ${to})...`);
  
  for (const lang of languages) {
    const filePath = path.join(BASE_DIR, lang, tool, 'index.html');
    if (!fs.existsSync(filePath)) {
      errors.push(`${lang}/${tool}: not found`);
      continue;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    const isFake = html.includes('resultValue.textContent = \'42\'') || 
                   html.includes('resultValue.textContent = "42"');
    if (!isFake) continue;
    
    const t = texts[tool][lang];
    
    const newSection = `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium mb-1">${t.from}</label>
            <input type="text" id="inputVal" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 font-mono" placeholder="${t.placeholder}">
          </div>
          <div class="text-2xl text-gray-400 pt-6">→</div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium mb-1">${t.to}</label>
            <input type="text" id="outputVal" readonly class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-800 font-mono bg-gray-100 dark:bg-gray-700">
          </div>
        </div>
        <button onclick="convert()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.convert}</button>
      </div>`;
    
    let newScript = '';
    if (tool === 'binary-to-decimal') {
      newScript = `function convert() { const v = document.getElementById('inputVal').value; const res = parseInt(v, 2); document.getElementById('outputVal').value = isNaN(res) ? 'Invalid' : res; }`;
    } else if (tool === 'decimal-to-binary') {
      newScript = `function convert() { const v = parseInt(document.getElementById('inputVal').value); document.getElementById('outputVal').value = isNaN(v) ? 'Invalid' : v.toString(2); }`;
    } else if (tool === 'decimal-to-hex') {
      newScript = `function convert() { const v = parseInt(document.getElementById('inputVal').value); document.getElementById('outputVal').value = isNaN(v) ? 'Invalid' : v.toString(16).toUpperCase(); }`;
    } else if (tool === 'decimal-to-octal') {
      newScript = `function convert() { const v = parseInt(document.getElementById('inputVal').value); document.getElementById('outputVal').value = isNaN(v) ? 'Invalid' : v.toString(8); }`;
    } else if (tool === 'hex-to-decimal') {
      newScript = `function convert() { const v = document.getElementById('inputVal').value; const res = parseInt(v, 16); document.getElementById('outputVal').value = isNaN(res) ? 'Invalid' : res; }`;
    } else if (tool === 'octal-to-decimal') {
      newScript = `function convert() { const v = document.getElementById('inputVal').value; const res = parseInt(v, 8); document.getElementById('outputVal').value = isNaN(res) ? 'Invalid' : res; }`;
    }
    
    // Replace section
    const sectionPattern = /<div class="grid md:grid-cols-2 gap-6 mb-8"[>\s\S]*?<button[^>]*>[^\u003c]*<\/button>/;
    if (sectionPattern.test(html)) {
      html = html.replace(sectionPattern, `<div class="space-y-6 mb-8">${newSection}</div>`);
    } else {
      errors.push(`${lang}/${tool}: pattern not found`);
      continue;
    }
    
    // Replace script
    const scriptPattern = /<script>[\s\S]*?function convert\(\)[\s\S]*?resultValue\.textContent = ['"`]42['"`][\s\S]*?<\/script>/;
    if (scriptPattern.test(html)) {
      html = html.replace(scriptPattern, `<script>${newScript}</script>`);
    } else {
      html = html.replace('</body>', `<script>${newScript}</script>\n</body>`);
    }
    
    fs.writeFileSync(filePath, html);
    fixed++;
    process.stdout.write('.');
  }
  console.log(' ✓');
}

console.log(`\n✅ تم إصلاح ${fixed} ملف`);
if (errors.length > 0) {
  console.log(`\n⚠️ أخطاء (${errors.length}):`);
  errors.slice(0, 10).forEach(e => console.log(`   - ${e}`));
  if (errors.length > 10) console.log(`   ... و ${errors.length - 10} أخطاء أخرى`);
}
