const fs = require('fs');
const path = require('path');

const BASE_DIR = '/root/.openclaw/workspace/demo-site';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Tool configurations with HTML and JS
const toolConfigs = {
  'age-calculator': {
    inputs: (t) => `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-medium mb-2">${t.birthDate}</label>
        <input type="date" id="birthDate" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600">
        <button onclick="calculate()" class="mt-4 w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
        <div id="resultBox" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div class="text-3xl font-bold text-indigo-600"><span id="years">0</span> ${t.years}</div>
          <div class="text-lg text-gray-600 dark:text-gray-400 mt-2"><span id="months">0</span> ${t.months}, <span id="days">0</span> ${t.days}</div>
        </div>
      </div>`,
    script: `
      function calculate() {
        const birth = new Date(document.getElementById('birthDate').value);
        if (isNaN(birth.getTime())) return;
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
        if (months < 0) { years--; months += 12; }
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('resultBox').classList.remove('hidden');
      }`
  },
  'average-calculator': {
    inputs: (t) => `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-medium mb-2">${t.numbers}</label>
        <textarea id="numbers" rows="3" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 font-mono" placeholder="10, 20, 30, 40, 50"></textarea>
        <button onclick="calculate()" class="mt-4 w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
        <div id="resultBox" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div><div class="text-sm text-gray-500">${t.sum}</div><div id="sumVal" class="text-xl font-bold text-indigo-600"></div></div>
            <div><div class="text-sm text-gray-500">${t.count}</div><div id="countVal" class="text-xl font-bold text-indigo-600"></div></div>
            <div><div class="text-sm text-gray-500">${t.average}</div><div id="avgVal" class="text-xl font-bold text-indigo-600"></div></div>
          </div>
        </div>
      </div>`,
    script: `
      function calculate() {
        const nums = document.getElementById('numbers').value.split(/[,,\\n]+/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        if (nums.length === 0) return;
        const sum = nums.reduce((a, b) => a + b, 0);
        document.getElementById('sumVal').textContent = sum.toFixed(2);
        document.getElementById('countVal').textContent = nums.length;
        document.getElementById('avgVal').textContent = (sum / nums.length).toFixed(2);
        document.getElementById('resultBox').classList.remove('hidden');
      }`
  },
  'compound-interest-calculator': {
    inputs: (t) => `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div><label class="block text-sm font-medium mb-1">${t.principal}</label><input type="number" id="principal" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600" placeholder="10000"></div>
        <div><label class="block text-sm font-medium mb-1">${t.rate}</label><input type="number" id="rate" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600" placeholder="5"></div>
        <div><label class="block text-sm font-medium mb-1">${t.years}</label><input type="number" id="years" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600" placeholder="10"></div>
        <button onclick="calculate()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
        <div id="resultBox" class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
          <div class="grid grid-cols-2 gap-4">
            <div><div class="text-sm text-gray-500">${t.result}</div><div id="finalAmount" class="text-2xl font-bold text-indigo-600"></div></div>
            <div><div class="text-sm text-gray-500">${t.interest}</div><div id="totalInterest" class="text-2xl font-bold text-green-600"></div></div>
          </div>
        </div>
      </div>`,
    script: `
      function calculate() {
        const P = parseFloat(document.getElementById('principal').value);
        const r = parseFloat(document.getElementById('rate').value) / 100;
        const t = parseFloat(document.getElementById('years').value);
        if (!P || !r || !t) return;
        const amount = P * Math.pow(1 + r, t);
        document.getElementById('finalAmount').textContent = amount.toFixed(2);
        document.getElementById('totalInterest').textContent = (amount - P).toFixed(2);
        document.getElementById('resultBox').classList.remove('hidden');
      }`
  },
  'random-number-generator': {
    inputs: (t) => `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div><label class="block text-sm font-medium mb-1">${t.min}</label><input type="number" id="minVal" value="1" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
          <div><label class="block text-sm font-medium mb-1">${t.max}</label><input type="number" id="maxVal" value="100" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        </div>
        <button onclick="generate()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.generate}</button>
        <div id="resultBox" class="mt-4 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div id="resultValue" class="text-5xl font-bold text-indigo-600"></div>
        </div>
      </div>`,
    script: `
      function generate() {
        const min = parseInt(document.getElementById('minVal').value);
        const max = parseInt(document.getElementById('maxVal').value);
        if (min >= max) return;
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('resultValue').textContent = num;
        document.getElementById('resultBox').classList.remove('hidden');
      }`
  },
  'scientific-calculator': {
    inputs: (t) => `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <div class="grid grid-cols-4 gap-2 mb-4">
          <button onclick="addOp('sin(')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">sin</button>
          <button onclick="addOp('cos(')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">cos</button>
          <button onclick="addOp('tan(')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">tan</button>
          <button onclick="addOp('log(')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">log</button>
          <button onclick="addOp('sqrt(')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">√</button>
          <button onclick="addOp('^')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">x^y</button>
          <button onclick="addOp('(')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">(</button>
          <button onclick="addOp(')')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">)</button>
          <button onclick="addOp('PI')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">π</button>
          <button onclick="addOp('E')" class="p-2 bg-gray-200 dark:bg-gray-600 rounded">e</button>
          <button onclick="clearExpr()" class="p-2 bg-red-200 dark:bg-red-900 rounded">C</button>
          <button onclick="backspace()" class="p-2 bg-red-200 dark:bg-red-900 rounded">⌫</button>
        </div>
        <input type="text" id="expr" readonly class="w-full p-4 text-xl font-mono text-center rounded-lg border dark:border-gray-600 dark:bg-gray-800 mb-4">
        <div class="grid grid-cols-4 gap-2 mb-4">
          ${[7,8,9,'/'].map(x => `\u003cbutton onclick="addOp('${x}')" class="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg text-xl font-bold"\u003e${x}\u003c/button\u003e`).join('')}
          ${[4,5,6,'*'].map(x => `\u003cbutton onclick="addOp('${x}')" class="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg text-xl font-bold"\u003e${x}\u003c/button\u003e`).join('')}
          ${[1,2,3,'-'].map(x => `\u003cbutton onclick="addOp('${x}')" class="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg text-xl font-bold"\u003e${x}\u003c/button\u003e`).join('')}
          ${[0,'.','=','+'].map(x => x === '=' ? `\u003cbutton onclick="calculate()" class="p-4 bg-indigo-500 text-white rounded-lg text-xl font-bold"\u003e=\u003c/button\u003e` : `\u003cbutton onclick="addOp('${x}')" class="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg text-xl font-bold"\u003e${x}\u003c/button\u003e`).join('')}
        </div>
        <div id="resultBox" class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div id="resultValue" class="text-3xl font-bold text-indigo-600"></div>
        </div>
      </div>`,
    script: `
      let expr = '';
      function addOp(op) { expr += op; document.getElementById('expr').value = expr; }
      function clearExpr() { expr = ''; document.getElementById('expr').value = ''; document.getElementById('resultBox').classList.add('hidden'); }
      function backspace() { expr = expr.slice(0, -1); document.getElementById('expr').value = expr; }
      function calculate() {
        try {
          let e = expr.replace(/sin\\(/g, 'Math.sin(').replace(/cos\\(/g, 'Math.cos(').replace(/tan\\(/g, 'Math.tan(')
                      .replace(/log\\(/g, 'Math.log10(').replace(/sqrt\\(/g, 'Math.sqrt(').replace(/\\^/g, '**')
                      .replace(/PI/g, 'Math.PI').replace(/E/g, 'Math.E');
          const res = eval(e);
          document.getElementById('resultValue').textContent = res;
          document.getElementById('resultBox').classList.remove('hidden');
        } catch { document.getElementById('resultValue').textContent = 'Error'; document.getElementById('resultBox').classList.remove('hidden'); }
      }`
  }
};

// Translations for each tool
const translations = {
  'age-calculator': {
    en: { birthDate: 'Birth Date', calculate: 'Calculate', years: 'years', months: 'months', days: 'days' },
    ar: { birthDate: 'تاريخ الميلاد', calculate: 'احسب', years: 'سنة', months: 'شهر', days: 'يوم' },
    fr: { birthDate: 'Date de naissance', calculate: 'Calculer', years: 'ans', months: 'mois', days: 'jours' },
    es: { birthDate: 'Fecha de nacimiento', calculate: 'Calcular', years: 'años', months: 'meses', days: 'días' },
    de: { birthDate: 'Geburtsdatum', calculate: 'Berechnen', years: 'Jahre', months: 'Monate', days: 'Tage' }
  },
  'average-calculator': {
    en: { numbers: 'Numbers (comma separated)', calculate: 'Calculate', average: 'Average', sum: 'Sum', count: 'Count' },
    ar: { numbers: 'الأرقام (مفصولة بفاصلة)', calculate: 'احسب', average: 'المتوسط', sum: 'المجموع', count: 'العدد' },
    fr: { numbers: 'Nombres (séparés par virgule)', calculate: 'Calculer', average: 'Moyenne', sum: 'Somme', count: 'Compte' },
    es: { numbers: 'Números (separados por coma)', calculate: 'Calcular', average: 'Promedio', sum: 'Suma', count: 'Conteo' },
    de: { numbers: 'Zahlen (kommagetrennt)', calculate: 'Berechnen', average: 'Durchschnitt', sum: 'Summe', count: 'Anzahl' }
  },
  'compound-interest-calculator': {
    en: { principal: 'Principal Amount', rate: 'Interest Rate (%)', years: 'Years', calculate: 'Calculate', result: 'Final Amount', interest: 'Interest Earned' },
    ar: { principal: 'المبلغ الأساسي', rate: 'نسبة الفائدة (%)', years: 'السنوات', calculate: 'احسب', result: 'المبلغ النهائي', interest: 'الفائدة' },
    fr: { principal: 'Capital', rate: 'Taux (%)', years: 'Années', calculate: 'Calculer', result: 'Montant Final', interest: 'Intérêts' },
    es: { principal: 'Capital', rate: 'Tasa (%)', years: 'Años', calculate: 'Calcular', result: 'Monto Final', interest: 'Intereses' },
    de: { principal: 'Kapital', rate: 'Zinssatz (%)', years: 'Jahre', calculate: 'Berechnen', result: 'Endbetrag', interest: 'Zinsen' }
  },
  'random-number-generator': {
    en: { min: 'Minimum', max: 'Maximum', generate: 'Generate' },
    ar: { min: 'الحد الأدنى', max: 'الحد الأقصى', generate: 'ولد' },
    fr: { min: 'Minimum', max: 'Maximum', generate: 'Générer' },
    es: { min: 'Mínimo', max: 'Máximo', generate: 'Generar' },
    de: { min: 'Minimum', max: 'Maximum', generate: 'Generieren' }
  },
  'scientific-calculator': {
    en: {}, ar: {}, fr: {}, es: {}, de: {}
  }
};

console.log('🔧 إصلاح حاسبات رياضية (5 أدوات × 5 لغات = 25 ملف)\n');

let fixed = 0;
let errors = [];

for (const [tool, config] of Object.entries(toolConfigs)) {
  console.log(`🔧 ${tool}...`);
  
  for (const lang of languages) {
    const filePath = path.join(BASE_DIR, lang, tool, 'index.html');
    if (!fs.existsSync(filePath)) {
      errors.push(`${lang}/${tool}: file not found`);
      continue;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Check if fake
    const isFake = html.includes('resultValue.textContent = \'42\'') || 
                   html.includes('resultValue.textContent = "42"');
    
    if (!isFake) continue;
    
    const t = translations[tool][lang];
    const newInputs = config.inputs(t);
    const newScript = config.script;
    
    // Replace calculator section
    const sectionPattern = /<div class="grid md:grid-cols-2 gap-6 mb-8"[>\s\S]*?<!-- Action Button -->[>\s\S]*?<button[^>]*calculate[^>]*>[>\s\S]*?<\/button>/;
    
    if (sectionPattern.test(html)) {
      html = html.replace(sectionPattern, `<div class="space-y-6 mb-8">${newInputs}</div>`);
    } else {
      // Try alternative pattern
      const altPattern = /<div class="grid md:grid-cols-2 gap-6 mb-8"[>\s\S]*?<button[^>]*>[^\u003c]*<\/button>/;
      if (altPattern.test(html)) {
        html = html.replace(altPattern, `<div class="space-y-6 mb-8">${newInputs}</div>`);
      } else {
        errors.push(`${lang}/${tool}: pattern not found`);
        continue;
      }
    }
    
    // Replace script
    const scriptPattern = /<script>[\s\S]*?function calculate\(\)[\s\S]*?resultValue\.textContent = ['"`]42['"`][\s\S]*?<\/script>/;
    if (scriptPattern.test(html)) {
      html = html.replace(scriptPattern, `<script>${newScript}</script>`);
    } else {
      // Append script before closing body
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
  errors.forEach(e => console.log(`   - ${e}`));
}
