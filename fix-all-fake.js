const fs = require('fs');
const path = require('path');

const languages = ['ar', 'fr', 'es', 'de'];

// Number converter logic
const numberConverterLogic = {
  'binary-to-decimal': {
    convert: (input) => parseInt(input, 2).toString(),
    placeholder: { ar: '1010101', fr: '1010101', es: '1010101', de: '1010101' },
    title: { ar: 'بايناري → عشري', fr: 'Binaire → Décimal', es: 'Binario → Decimal', de: 'Binär → Dezimal' }
  },
  'decimal-to-binary': {
    convert: (input) => parseInt(input).toString(2),
    placeholder: { ar: '85', fr: '85', es: '85', de: '85' },
    title: { ar: 'عشري → بايناري', fr: 'Décimal → Binaire', es: 'Decimal → Binario', de: 'Dezimal → Binär' }
  },
  'decimal-to-hex': {
    convert: (input) => parseInt(input).toString(16).toUpperCase(),
    placeholder: { ar: '255', fr: '255', es: '255', de: '255' },
    title: { ar: 'عشري → هكس', fr: 'Décimal → Hex', es: 'Decimal → Hex', de: 'Dezimal → Hex' }
  },
  'decimal-to-octal': {
    convert: (input) => parseInt(input).toString(8),
    placeholder: { ar: '64', fr: '64', es: '64', de: '64' },
    title: { ar: 'عشري → أوكتال', fr: 'Décimal → Octal', es: 'Decimal → Octal', de: 'Dezimal → Oktal' }
  },
  'hex-to-decimal': {
    convert: (input) => parseInt(input, 16).toString(),
    placeholder: { ar: 'FF', fr: 'FF', es: 'FF', de: 'FF' },
    title: { ar: 'هكس → عشري', fr: 'Hex → Décimal', es: 'Hex → Decimal', de: 'Hex → Dezimal' }
  },
  'octal-to-decimal': {
    convert: (input) => parseInt(input, 8).toString(),
    placeholder: { ar: '77', fr: '77', es: '77', de: '77' },
    title: { ar: 'أوكتال → عشري', fr: 'Octal → Décimal', es: 'Octal → Decimal', de: 'Oktal → Dezimal' }
  },
  'percentage-calculator': {
    calculate: (value, total) => ((parseFloat(value) / parseFloat(total)) * 100).toFixed(2),
    placeholder: { ar: { v: '25', t: '100' }, fr: { v: '25', t: '100' }, es: { v: '25', t: '100' }, de: { v: '25', t: '100' } },
    title: { ar: 'حاسبة النسبة المئوية', fr: 'Calculateur de Pourcentage', es: 'Calculadora de Porcentaje', de: 'Prozentrechner' }
  }
};

// Translations
const translations = {
  ar: { input: 'القيمة', total: 'المجموع', result: 'النتيجة', calculate: 'احسب', convert: 'تحويل', enterValue: 'أدخل القيمة', enterTotal: 'أدخل المجموع' },
  fr: { input: 'Valeur', total: 'Total', result: 'Résultat', calculate: 'Calculer', convert: 'Convertir', enterValue: 'Entrez la valeur', enterTotal: 'Entrez le total' },
  es: { input: 'Valor', total: 'Total', result: 'Resultado', calculate: 'Calcular', convert: 'Convertir', enterValue: 'Ingrese el valor', enterTotal: 'Ingrese el total' },
  de: { input: 'Wert', total: 'Gesamt', result: 'Ergebnis', calculate: 'Berechnen', convert: 'Konvertieren', enterValue: 'Wert eingeben', enterTotal: 'Gesamtwert eingeben' }
};

function fixNumberConverter(lang, tool) {
  const filePath = path.join('/root/.openclaw/workspace/demo-site', lang, tool, 'index.html');
  if (!fs.existsSync(filePath)) return { tool, status: 'not_found' };
  
  let html = fs.readFileSync(filePath, 'utf8');
  const config = numberConverterLogic[tool];
  const t = translations[lang];
  
  if (tool === 'percentage-calculator') {
    // Fix percentage calculator with two inputs
    const newBody = `                
                <!-- Inputs -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${t.input}</label>
                    <input id="valueInput" type="number" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-lg" placeholder="${config.placeholder[lang].v}">
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${t.total}</label>
                    <input id="totalInput" type="number" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-lg" placeholder="${config.placeholder[lang].t}">
                </div>

                <!-- Calculate Button -->
                <button onclick="calculate()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6" id="calcBtn">
                    ${t.calculate}
                </button>

                <!-- Result -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${t.result}</label>
                    <div id="resultValue" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-lg bg-gray-50 dark:bg-gray-800 text-center text-2xl font-bold text-indigo-600">--</div>
                </div>

    <script>
        function calculate() {
            const value = document.getElementById('valueInput').value;
            const total = document.getElementById('totalInput').value;
            const resultEl = document.getElementById('resultValue');
            
            if (!value || !total || isNaN(value) || isNaN(total) || total == 0) {
                resultEl.textContent = 'Invalid';
                return;
            }
            
            const percentage = ((parseFloat(value) / parseFloat(total)) * 100).toFixed(2);
            resultEl.textContent = percentage + '%';
        }
        
        // Auto-calculate on Enter
        document.getElementById('totalInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calculate();
        });
    </script>`;
    
    // Replace the body content
    html = html.replace(/(<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">)[\s\S]*?(<\/section>\s*<section class="py-12 bg-gray-100)/, '$1' + newBody + '$2');
  } else {
    // Fix number converters
    const newBody = `                
                <!-- Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${t.input}</label>
                    <input id="inputValue" type="text" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-lg" placeholder="${config.placeholder[lang]}">
                </div>

                <!-- Convert Button -->
                <button onclick="convert()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6" id="convBtn">
                    ${t.convert}
                </button>

                <!-- Result -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${t.result}</label>
                    <div id="resultValue" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-lg bg-gray-50 dark:bg-gray-800 text-center text-2xl font-bold text-indigo-600">--</div>
                </div>

    <script>
        function convert() {
            const input = document.getElementById('inputValue').value.trim();
            const resultEl = document.getElementById('resultValue');
            
            if (!input) {
                resultEl.textContent = 'Invalid';
                return;
            }
            
            try {
                ${getConverterCode(tool)}
            } catch (e) {
                resultEl.textContent = 'Error';
            }
        }
        
        // Auto-convert on Enter
        document.getElementById('inputValue')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') convert();
        });
    </script>`;
    
    html = html.replace(/(<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">)[\s\S]*?(<\/section>\s*<section class="py-12 bg-gray-100)/, '$1' + newBody + '$2');
  }
  
  fs.writeFileSync(filePath, html);
  return { tool, status: 'fixed' };
}

function getConverterCode(tool) {
  switch(tool) {
    case 'binary-to-decimal':
      return `const result = parseInt(input, 2);
                resultEl.textContent = isNaN(result) ? 'Invalid binary' : result.toString();`;
    case 'decimal-to-binary':
      return `const num = parseInt(input);
                resultEl.textContent = isNaN(num) ? 'Invalid number' : num.toString(2);`;
    case 'decimal-to-hex':
      return `const num = parseInt(input);
                resultEl.textContent = isNaN(num) ? 'Invalid number' : num.toString(16).toUpperCase();`;
    case 'decimal-to-octal':
      return `const num = parseInt(input);
                resultEl.textContent = isNaN(num) ? 'Invalid number' : num.toString(8);`;
    case 'hex-to-decimal':
      return `const result = parseInt(input, 16);
                resultEl.textContent = isNaN(result) ? 'Invalid hex' : result.toString();`;
    case 'octal-to-decimal':
      return `const result = parseInt(input, 8);
                resultEl.textContent = isNaN(result) ? 'Invalid octal' : result.toString();`;
  }
}

// Run fixes
const toolsToFix = [
  'binary-to-decimal', 'decimal-to-binary', 'decimal-to-hex', 
  'decimal-to-octal', 'hex-to-decimal', 'octal-to-decimal',
  'percentage-calculator'
];

console.log('🔧 Fixing fake number converters...\n');

let fixed = 0;
let errors = 0;

for (const lang of languages) {
  console.log(`\n🌐 ${lang.toUpperCase()}:`);
  for (const tool of toolsToFix) {
    const result = fixNumberConverter(lang, tool);
    if (result.status === 'fixed') {
      console.log(`  ✅ ${tool}`);
      fixed++;
    } else if (result.status === 'not_found') {
      console.log(`  ⚠️  ${tool} (not found)`);
    } else {
      console.log(`  ❌ ${tool}`);
      errors++;
    }
  }
}

console.log(`\n✅ Fixed: ${fixed} | ❌ Errors: ${errors}`);
console.log('Done!');
