const fs = require('fs');
const path = require('path');

const languages = ['ar', 'fr', 'es', 'de'];

// Read EN template as base
const enHtml = fs.readFileSync(path.join(__dirname, 'en', 'percentage-calculator', 'index.html'), 'utf8');

const translations = {
  ar: {
    title: 'حاسبة النسبة المئوية',
    desc: 'احسب النسب المئوية، الزيادات، التخفيضات والفروقات',
    whatIs: 'ما هو',
    of: 'من',
    isWhat: 'هو ما نسبته',
    increase: 'زيادة',
    decrease: 'تخفيض',
    from: 'من',
    to: 'إلى',
    calculate: 'احسب',
    increaseLabel: 'زيادة/تخفيض',
    result: 'النتيجة'
  },
  fr: {
    title: 'Calculateur de Pourcentage',
    desc: 'Calcule les pourcentages, augmentations, réductions et différences',
    whatIs: 'Quel est',
    of: 'de',
    isWhat: 'Est quel pourcentage',
    increase: 'Augmentation',
    decrease: 'Réduction',
    from: 'De',
    to: 'À',
    calculate: 'Calculer',
    increaseLabel: 'Augmentation/Réduction',
    result: 'Résultat'
  },
  es: {
    title: 'Calculadora de Porcentaje',
    desc: 'Calcula porcentajes, aumentos, disminuciones y diferencias',
    whatIs: 'Qué es',
    of: 'de',
    isWhat: 'Es qué porcentaje',
    increase: 'Aumento',
    decrease: 'Disminución',
    from: 'De',
    to: 'A',
    calculate: 'Calcular',
    increaseLabel: 'Aumento/Disminución',
    result: 'Resultado'
  },
  de: {
    title: 'Prozentrechner',
    desc: 'Berechnet Prozentsätze, Erhöhungen, Verminderungen und Differenzen',
    whatIs: 'Was ist',
    of: 'von',
    isWhat: 'Ist welcher Prozentsatz',
    increase: 'Erhöhung',
    decrease: 'Verminderung',
    from: 'Von',
    to: 'Zu',
    calculate: 'Berechnen',
    increaseLabel: 'Erhöhung/Verminderung',
    result: 'Ergebnis'
  }
};

console.log('🔧 إعادة بناء percentage-calculator...\n');

for (const lang of languages) {
  const t = translations[lang];
  const filePath = path.join(__dirname, lang, 'percentage-calculator', 'index.html');
  
  if (!fs.existsSync(filePath)) continue;
  
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace the calculator section only
  const newCalculatorSection = `
                <!-- Calculator Inputs -->
                <div class="space-y-6 mb-8">
                    
                    <!-- What is X% of Y -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <h3 class="font-semibold mb-4 text-lg">${t.whatIs} X% ${t.of} Y</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <input type="number" id="percent1" placeholder="%" class="w-24 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <span>% ${t.of}</span>
                            <input type="number" id="value1" placeholder="0" class="w-32 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <button onclick="calc1()" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">${t.calculate}</button>
                        </div>
                        <div id="res1" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
                            <span class="text-2xl font-bold text-indigo-600" id="res1val"></span>
                        </div>
                    </div>
                    
                    <!-- X is what percent of Y -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <h3 class="font-semibold mb-4 text-lg">X ${t.isWhat} ${t.of} Y</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <input type="number" id="val2" placeholder="X" class="w-24 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <span>${t.isWhat}</span>
                            <input type="number" id="val3" placeholder="Y" class="w-24 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <button onclick="calc2()" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">${t.calculate}</button>
                        </div>
                        <div id="res2" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
                            <span class="text-2xl font-bold text-indigo-600" id="res2val"></span>
                            <span class="text-lg">%</span>
                        </div>
                    </div>
                    
                    <!-- Percentage Change -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <h3 class="font-semibold mb-4 text-lg">${t.increaseLabel}</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <input type="number" id="fromVal" placeholder="${t.from}" class="w-28 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <span>→</span>
                            <input type="number" id="toVal" placeholder="${t.to}" class="w-28 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <button onclick="calc3()" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">${t.calculate}</button>
                        </div>
                        <div id="res3" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
                            <span class="text-2xl font-bold text-indigo-600" id="res3val"></span>
                            <span>%</span>
                            <span id="changeDir" class="ml-2 font-semibold"></span>
                        </div>
                    </div>

                </div>

    <script>
        function calc1() {
            const p = parseFloat(document.getElementById('percent1').value);
            const v = parseFloat(document.getElementById('value1').value);
            const r = document.getElementById('res1');
            const rv = document.getElementById('res1val');
            if (!isNaN(p) && !isNaN(v)) {
                rv.textContent = ((p/100) * v).toFixed(2);
                r.classList.remove('hidden');
            }
        }
        function calc2() {
            const p = parseFloat(document.getElementById('val2').value);
            const w = parseFloat(document.getElementById('val3').value);
            const r = document.getElementById('res2');
            const rv = document.getElementById('res2val');
            if (!isNaN(p) && !isNaN(w) && w !== 0) {
                rv.textContent = ((p/w) * 100).toFixed(2);
                r.classList.remove('hidden');
            }
        }
        function calc3() {
            const f = parseFloat(document.getElementById('fromVal').value);
            const t = parseFloat(document.getElementById('toVal').value);
            const r = document.getElementById('res3');
            const rv = document.getElementById('res3val');
            const cd = document.getElementById('changeDir');
            if (!isNaN(f) && !isNaN(t) && f !== 0) {
                const ch = ((t-f)/f) * 100;
                rv.textContent = Math.abs(ch).toFixed(2);
                cd.textContent = ch >= 0 ? '↑' : '↓';
                cd.className = ch >= 0 ? 'ml-2 font-semibold text-green-600' : 'ml-2 font-semibold text-red-600';
                r.classList.remove('hidden');
            }
        }
    </script>`;

  // Replace from <!-- Calculator Inputs --> to before How to Use section
  const pattern = /<!-- Calculator Inputs -->[\s\S]*?(?=<section class="py-12 bg-gray-100")/;
  
  if (pattern.test(html)) {
    html = html.replace(pattern, newCalculatorSection + '\n            \u003c/div\u003e\n        \u003c/div\u003e\n    \u003c/section\u003e\n\n');
    fs.writeFileSync(filePath, html);
    console.log(`✅ ${lang}/percentage-calculator`);
  } else {
    console.log(`⚠️ ${lang} - Pattern not found, trying alternative...`);
    // Alternative approach - replace specific section
    const altPattern = /<div class="grid md:grid-cols-2 gap-6 mb-8">[\s\S]*?<!-- Action Button -->/;
    if (altPattern.test(html)) {
      html = html.replace(altPattern, newCalculatorSection.replace(/<!-- Calculator Inputs -->\n                /, ''));
      fs.writeFileSync(filePath, html);
      console.log(`✅ ${lang}/percentage-calculator (alt method)`);
    }
  }
}

console.log('\n✅ تم إصلاح percentage-calculator');
