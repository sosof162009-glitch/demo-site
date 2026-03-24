const fs = require('fs');
const path = require('path');

const BASE_DIR = '/root/.openclaw/workspace/demo-site';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// All fake tools
const fakeTools = {
  datetime: ['calendar-generator', 'date-difference-calculator', 'days-until-date', 
             'time-zone-converter', 'unix-timestamp-converter', 'week-number-calculator', 
             'working-days-calculator', 'countdown-timer', 'pomodoro-timer'],
  math: ['age-calculator', 'average-calculator', 'compound-interest-calculator',
         'random-number-generator', 'scientific-calculator'],
  converter: ['binary-to-decimal', 'decimal-to-binary', 'decimal-to-hex',
              'decimal-to-octal', 'hex-to-decimal', 'octal-to-decimal']
};

// Translations
const texts = {
  'age-calculator': {
    en: { title: 'Age Calculator', birthDate: 'Birth Date', calculate: 'Calculate', age: 'Age', years: 'years', months: 'months', days: 'days' },
    ar: { title: 'حاسبة العمر', birthDate: 'تاريخ الميلاد', calculate: 'احسب', age: 'العمر', years: 'سنة', months: 'شهر', days: 'يوم' },
    fr: { title: 'Calculateur d\'Âge', birthDate: 'Date de naissance', calculate: 'Calculer', age: 'Âge', years: 'ans', months: 'mois', days: 'jours' },
    es: { title: 'Calculadora de Edad', birthDate: 'Fecha de nacimiento', calculate: 'Calcular', age: 'Edad', years: 'años', months: 'meses', days: 'días' },
    de: { title: 'Altersrechner', birthDate: 'Geburtsdatum', calculate: 'Berechnen', age: 'Alter', years: 'Jahre', months: 'Monate', days: 'Tage' }
  },
  'average-calculator': {
    en: { title: 'Average Calculator', numbers: 'Numbers (comma separated)', calculate: 'Calculate', average: 'Average', sum: 'Sum', count: 'Count' },
    ar: { title: 'حاسبة المتوسط', numbers: 'الأرقام (مفصولة بفاصلة)', calculate: 'احسب', average: 'المتوسط', sum: 'المجموع', count: 'العدد' },
    fr: { title: 'Calculateur de Moyenne', numbers: 'Nombres (séparés par virgule)', calculate: 'Calculer', average: 'Moyenne', sum: 'Somme', count: 'Compte' },
    es: { title: 'Calculadora de Promedio', numbers: 'Números (separados por coma)', calculate: 'Calcular', average: 'Promedio', sum: 'Suma', count: 'Conteo' },
    de: { title: 'Durchschnittsrechner', numbers: 'Zahlen (kommagetrennt)', calculate: 'Berechnen', average: 'Durchschnitt', sum: 'Summe', count: 'Anzahl' }
  },
  'compound-interest-calculator': {
    en: { title: 'Compound Interest', principal: 'Principal', rate: 'Rate (%)', years: 'Years', calculate: 'Calculate', result: 'Final Amount', interest: 'Interest Earned' },
    ar: { title: 'الفائدة المركبة', principal: 'المبلغ الأساسي', rate: 'نسبة الفائدة (%)', years: 'السنوات', calculate: 'احسب', result: 'المبلغ النهائي', interest: 'الفائدة' },
    fr: { title: 'Intérêts Composés', principal: 'Capital', rate: 'Taux (%)', years: 'Années', calculate: 'Calculer', result: 'Montant Final', interest: 'Intérêts' },
    es: { title: 'Interés Compuesto', principal: 'Capital', rate: 'Tasa (%)', years: 'Años', calculate: 'Calcular', result: 'Monto Final', interest: 'Intereses' },
    de: { title: 'Zinseszins', principal: 'Kapital', rate: 'Zinssatz (%)', years: 'Jahre', calculate: 'Berechnen', result: 'Endbetrag', interest: 'Zinsen' }
  },
  'random-number-generator': {
    en: { title: 'Random Number Generator', min: 'Minimum', max: 'Maximum', generate: 'Generate' },
    ar: { title: 'مولد الأرقام العشوائية', min: 'الحد الأدنى', max: 'الحد الأقصى', generate: 'ولد' },
    fr: { title: 'Générateur Aléatoire', min: 'Minimum', max: 'Maximum', generate: 'Générer' },
    es: { title: 'Generador Aleatorio', min: 'Mínimo', max: 'Máximo', generate: 'Generar' },
    de: { title: 'Zufallsgenerator', min: 'Minimum', max: 'Maximum', generate: 'Generieren' }
  },
  'scientific-calculator': {
    en: { title: 'Scientific Calculator', expression: 'Expression', calculate: 'Calculate', result: 'Result' },
    ar: { title: 'الحاسبة العلمية', expression: 'التعبير', calculate: 'احسب', result: 'النتيجة' },
    fr: { title: 'Calculatrice Scientifique', expression: 'Expression', calculate: 'Calculer', result: 'Résultat' },
    es: { title: 'Calculadora Científica', expression: 'Expresión', calculate: 'Calcular', result: 'Resultado' },
    de: { title: 'Wissenschaftlicher Rechner', expression: 'Ausdruck', calculate: 'Berechnen', result: 'Ergebnis' }
  }
};

console.log('🔧 بدء إصلاح الأدوات الوهمية...');
console.log(`📊 الإجمالي: ${Object.values(fakeTools).flat().length} أداة × 5 لغات = ${Object.values(fakeTools).flat().length * 5} ملف`);
console.log('\n⏳ جاري المعالجة...\n');

let fixedCount = 0;

// Fix math calculators
for (const tool of fakeTools.math) {
  console.log(`🔧 ${tool}...`);
  for (const lang of languages) {
    const dir = path.join(BASE_DIR, lang, tool);
    if (!fs.existsSync(dir)) continue;
    
    const filePath = path.join(dir, 'index.html');
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Check if already fixed
    if (!html.includes('resultValue.textContent = \'42\'') && 
        !html.includes('resultValue.textContent = "42"')) {
      continue;
    }
    
    const t = texts[tool]?.[lang] || texts[tool]?.en;
    if (!t) continue;
    
    let newSection = '';
    let newScript = '';
    
    if (tool === 'age-calculator') {
      newSection = `
                <div class="space-y-6 mb-8">
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <label class="block text-sm font-medium mb-2">${t.birthDate}</label>
                        <input type="date" id="birthDate" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600">
                        <button onclick="calculateAge()" class="mt-4 w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
                        <div id="result" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
                            <div class="text-3xl font-bold text-indigo-600"><span id="years">0</span> ${t.years}</div>
                            <div class="text-lg text-gray-600 dark:text-gray-400 mt-2"><span id="months">0</span> ${t.months}, <span id="days">0</span> ${t.days}</div>
                        </div>
                    </div>
                </div>`;
      newScript = `
    <script>
        function calculateAge() {
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
            document.getElementById('result').classList.remove('hidden');
        }
    </script>`;
    }
    
    // Apply fix
    if (newSection && newScript) {
      // Replace calculator section
      const calcPattern = /<div class="grid md:grid-cols-2 gap-6 mb-8">[\s\S]*?<button[^>]*>.*?<\/button>/;
      html = html.replace(calcPattern, newSection);
      
      // Replace script
      const scriptPattern = /<script>[\s\S]*?function calculate\(\)[\s\S]*?<\/script>/;
      html = html.replace(scriptPattern, newScript);
      
      fs.writeFileSync(filePath, html);
      fixedCount++;
    }
  }
}

console.log(`\n✅ تم إصلاح ${fixedCount} ملف`);
console.log('\n📋 ملاحظة: باقي الأدوات تحتاج قوالب مخصصة');
