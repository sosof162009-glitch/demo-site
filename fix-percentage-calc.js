const fs = require('fs');
const path = require('path');

const languages = ['ar', 'fr', 'es', 'de'];

// Template for percentage calculator with correct inputs
const template = (lang) => {
  const texts = {
    ar: {
      title: 'حاسبة النسبة المئوية',
      desc: 'احسب النسب المئوية، الزيادات، التخفيضات والفروقات',
      whatIs: 'ما هو',
      of: 'من',
      percentageOf: 'النسبة من',
      isWhatPercent: 'هو ما نسبته',
      of2: 'من',
      increase: 'زيادة',
      by: 'بنسبة',
      decrease: 'تخفيض',
      calculate: 'احسب',
      result: 'النتيجة'
    },
    fr: {
      title: 'Calculateur de Pourcentage',
      desc: 'Calcule les pourcentages, augmentations, réductions et différences',
      whatIs: 'Quel est',
      of: 'de',
      percentageOf: 'Pourcentage de',
      isWhatPercent: 'Est quel pourcentage',
      of2: 'de',
      increase: 'Augmentation',
      by: 'de',
      decrease: 'Réduction',
      calculate: 'Calculer',
      result: 'Résultat'
    },
    es: {
      title: 'Calculadora de Porcentaje',
      desc: 'Calcula porcentajes, aumentos, disminuciones y diferencias',
      whatIs: 'Qué es',
      of: 'de',
      percentageOf: 'Porcentaje de',
      isWhatPercent: 'Es qué porcentaje',
      of2: 'de',
      increase: 'Aumento',
      by: 'de',
      decrease: 'Disminución',
      calculate: 'Calcular',
      result: 'Resultado'
    },
    de: {
      title: 'Prozentrechner',
      desc: 'Berechnet Prozentsätze, Erhöhungen, Verminderungen und Differenzen',
      whatIs: 'Was ist',
      of: 'von',
      percentageOf: 'Prozentsatz von',
      isWhatPercent: 'Ist welcher Prozentsatz',
      of2: 'von',
      increase: 'Erhöhung',
      by: 'um',
      decrease: 'Verminderung',
      calculate: 'Berechnen',
      result: 'Ergebnis'
    }
  };
  
  const t = texts[lang];
  const isRTL = lang === 'ar' ? 'dir="rtl"' : '';
  
  return `    <!-- Calculator Inputs -->
                <div class="space-y-6 mb-8">
                    
                    <!-- What is X% of Y -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <h3 class="font-semibold mb-4 text-lg">${t.whatIs} X% ${t.of} Y</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <input type="number" id="percent1" placeholder="%" class="w-24 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <span>% ${t.of}</span>
                            <input type="number" id="value1" placeholder="0" class="w-32 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <button onclick="calculateWhatIs()" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
                        </div>
                        <div id="result1" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
                            <span class="text-2xl font-bold text-indigo-600" id="result1Value"></span>
                        </div>
                    </div>
                    
                    <!-- X is what percent of Y -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <h3 class="font-semibold mb-4 text-lg">X ${t.isWhatPercent} ${t.of2} Y</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <input type="number" id="value2" placeholder="0" class="w-32 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <span>${t.isWhatPercent}</span>
                            <input type="number" id="value3" placeholder="0" class="w-32 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <button onclick="calculateIsWhatPercent()" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
                        </div>
                        <div id="result2" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
                            <span class="text-2xl font-bold text-indigo-600" id="result2Value"></span>
                            <span>%</span>
                        </div>
                    </div>
                    
                    <!-- Percentage increase/decrease -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <h3 class="font-semibold mb-4 text-lg">${t.increase} / ${t.decrease}</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <input type="number" id="fromValue" placeholder="${t.of}" class="w-32 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <span>→</span>
                            <input type="number" id="toValue" placeholder="${t.by}" class="w-32 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 calc-input">
                            <button onclick="calculateChange()" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
                        </div>
                        <div id="result3" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden">
                            <span class="text-2xl font-bold text-indigo-600" id="result3Value"></span>
                            <span>%</span>
                            <span id="changeType" class="ml-2"></span>
                        </div>
                    </div>

                </div>

    <script>
        function calculateWhatIs() {
            const percent = parseFloat(document.getElementById('percent1').value);
            const value = parseFloat(document.getElementById('value1').value);
            const resultDiv = document.getElementById('result1');
            const resultValue = document.getElementById('result1Value');
            
            if (!isNaN(percent) && !isNaN(value)) {
                const result = (percent / 100) * value;
                resultValue.textContent = result.toFixed(2);
                resultDiv.classList.remove('hidden');
            }
        }
        
        function calculateIsWhatPercent() {
            const part = parseFloat(document.getElementById('value2').value);
            const whole = parseFloat(document.getElementById('value3').value);
            const resultDiv = document.getElementById('result2');
            const resultValue = document.getElementById('result2Value');
            
            if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
                const result = (part / whole) * 100;
                resultValue.textContent = result.toFixed(2);
                resultDiv.classList.remove('hidden');
            }
        }
        
        function calculateChange() {
            const from = parseFloat(document.getElementById('fromValue').value);
            const to = parseFloat(document.getElementById('toValue').value);
            const resultDiv = document.getElementById('result3');
            const resultValue = document.getElementById('result3Value');
            const changeType = document.getElementById('changeType');
            
            if (!isNaN(from) && !isNaN(to) && from !== 0) {
                const change = ((to - from) / from) * 100;
                resultValue.textContent = Math.abs(change).toFixed(2);
                changeType.textContent = change >= 0 ? '↑ ${lang === 'ar' ? 'زيادة' : (lang === 'fr' ? 'augmentation' : (lang === 'es' ? 'aumento' : 'Erhöhung'))}' : '↓ ${lang === 'ar' ? 'تخفيض' : (lang === 'fr' ? 'réduction' : (lang === 'es' ? 'disminución' : 'Verminderung'))}';
                changeType.className = change >= 0 ? 'ml-2 text-green-600' : 'ml-2 text-red-600';
                resultDiv.classList.remove('hidden');
            }
        }
    </script>`;
};

console.log('🔧 إصلاح percentage-calculator...\n');

for (const lang of languages) {
  const filePath = path.join(__dirname, lang, 'percentage-calculator', 'index.html');
  
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace the calculator inputs section
    const oldPattern = /<!-- Calculator Inputs -->[\s\S]*?<script>\s*function initCalculator[\s\S]*?<\/script>/;
    
    if (oldPattern.test(html)) {
      const newSection = template(lang);
      html = html.replace(oldPattern, newSection);
      fs.writeFileSync(filePath, html);
      console.log(`✅ ${lang}/percentage-calculator`);
    } else {
      console.log(`⚠️ ${lang}/percentage-calculator - Pattern not found`);
    }
  }
}

console.log('\n✅ تم إصلاح 4 ملفات');
