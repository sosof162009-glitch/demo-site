const fs = require('fs');
const path = require('path');

const BASE_DIR = '/root/.openclaw/workspace/demo-site';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

const datetimeTools = [
  { tool: 'calendar-generator', type: 'calendar' },
  { tool: 'date-difference-calculator', type: 'datediff' },
  { tool: 'days-until-date', type: 'daysuntil' },
  { tool: 'time-zone-converter', type: 'timezone' },
  { tool: 'unix-timestamp-converter', type: 'timestamp' },
  { tool: 'week-number-calculator', type: 'weeknum' },
  { tool: 'working-days-calculator', type: 'workdays' },
  { tool: 'countdown-timer', type: 'countdown' },
  { tool: 'pomodoro-timer', type: 'pomodoro' }
];

const texts = {
  'calendar-generator': {
    en: { year: 'Year', month: 'Month', generate: 'Generate Calendar' },
    ar: { year: 'السنة', month: 'الشهر', generate: 'ولد التقويم' },
    fr: { year: 'Année', month: 'Mois', generate: 'Générer Calendrier' },
    es: { year: 'Año', month: 'Mes', generate: 'Generar Calendario' },
    de: { year: 'Jahr', month: 'Monat', generate: 'Kalender Erstellen' }
  },
  'date-difference-calculator': {
    en: { date1: 'First Date', date2: 'Second Date', calculate: 'Calculate Difference' },
    ar: { date1: 'التاريخ الأول', date2: 'التاريخ الثاني', calculate: 'احسب الفرق' },
    fr: { date1: 'Première Date', date2: 'Deuxième Date', calculate: 'Calculer Différence' },
    es: { date1: 'Primera Fecha', date2: 'Segunda Fecha', calculate: 'Calcular Diferencia' },
    de: { date1: 'Erstes Datum', date2: 'Zweites Datum', calculate: 'Differenz Berechnen' }
  },
  'days-until-date': {
    en: { target: 'Target Date', calculate: 'Calculate Days' },
    ar: { target: 'التاريخ المستهدف', calculate: 'احسب الأيام' },
    fr: { target: 'Date Cible', calculate: 'Calculer Jours' },
    es: { target: 'Fecha Objetivo', calculate: 'Calcular Días' },
    de: { target: 'Zieldatum', calculate: 'Tage Berechnen' }
  },
  'time-zone-converter': {
    en: { time: 'Time', from: 'From Zone', to: 'To Zone', convert: 'Convert' },
    ar: { time: 'الوقت', from: 'من المنطقة', to: 'إلى المنطقة', convert: 'حول' },
    fr: { time: 'Heure', from: 'De', to: 'À', convert: 'Convertir' },
    es: { time: 'Hora', from: 'De', to: 'A', convert: 'Convertir' },
    de: { time: 'Zeit', from: 'Von', to: 'Nach', convert: 'Konvertieren' }
  },
  'unix-timestamp-converter': {
    en: { timestamp: 'Unix Timestamp', convert: 'Convert', now: 'Use Current Time' },
    ar: { timestamp: 'الطابع الزمني', convert: 'حول', now: 'الوقت الحالي' },
    fr: { timestamp: 'Timestamp Unix', convert: 'Convertir', now: 'Heure Actuelle' },
    es: { timestamp: 'Timestamp Unix', convert: 'Convertir', now: 'Hora Actual' },
    de: { timestamp: 'Unix Timestamp', convert: 'Konvertieren', now: 'Aktuelle Zeit' }
  },
  'time-zone-converter': {
    en: { time: 'Local Time', convert: 'Show Times', zones: 'Major Cities' },
    ar: { time: 'الوقت المحلي', convert: 'عرض الأوقات', zones: 'المدن الرئيسية' },
    fr: { time: 'Heure Locale', convert: 'Afficher', zones: 'Grandes Villes' },
    es: { time: 'Hora Local', convert: 'Mostrar', zones: 'Ciudades Principales' },
    de: { time: 'Ortszeit', convert: 'Anzeigen', zones: 'Großstädte' }
  },
  'week-number-calculator': {
    en: { date: 'Date', calculate: 'Calculate Week Number' },
    ar: { date: 'التاريخ', calculate: 'احسب رقم الأسبوع' },
    fr: { date: 'Date', calculate: 'Calculer N° Semaine' },
    es: { date: 'Fecha', calculate: 'Calcular N° Semana' },
    de: { date: 'Datum', calculate: 'Wochennummer Berechnen' }
  },
  'working-days-calculator': {
    en: { start: 'Start Date', end: 'End Date', calculate: 'Calculate Working Days' },
    ar: { start: 'تاريخ البدء', end: 'تاريخ الانتهاء', calculate: 'احسب أيام العمل' },
    fr: { start: 'Date Début', end: 'Date Fin', calculate: 'Calculer Jours Ouvrés' },
    es: { start: 'Fecha Inicio', end: 'Fecha Fin', calculate: 'Calcular Días Laborables' },
    de: { start: 'Startdatum', end: 'Enddatum', calculate: 'Werktage Berechnen' }
  },
  'countdown-timer': {
    en: { target: 'Target Date/Time', start: 'Start Countdown' },
    ar: { target: 'التاريخ/الوقت المستهدف', start: 'ابدأ العد التنازلي' },
    fr: { target: 'Date/Heure Cible', start: 'Démarrer' },
    es: { target: 'Fecha/Hora Objetivo', start: 'Iniciar' },
    de: { target: 'Zieldatum/-zeit', start: 'Starten' }
  },
  'pomodoro-timer': {
    en: { work: 'Work (min)', break: 'Break (min)', start: 'Start Pomodoro' },
    ar: { work: 'عمل (دقيقة)', break: 'استراحة (دقيقة)', start: 'ابدأ بومودورو' },
    fr: { work: 'Travail (min)', break: 'Pause (min)', start: 'Démarrer Pomodoro' },
    es: { work: 'Trabajo (min)', break: 'Descanso (min)', start: 'Iniciar Pomodoro' },
    de: { work: 'Arbeit (min)', break: 'Pause (min)', start: 'Pomodoro Starten' }
  }
};

function generateSection(tool, type, t) {
  if (type === 'calendar') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium mb-1">${t.year}</label><input type="number" id="year" value="${new Date().getFullYear()}" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
          <div><label class="block text-sm font-medium mb-1">${t.month}</label><select id="month" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600">${[0,1,2,3,4,5,6,7,8,9,10,11].map(m => `\u003coption value="${m}"\u003e${m+1}\u003c/option\u003e`).join('')}\u003c/select\u003e\u003c/div\u003e
        </div>
        <button onclick="generate()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.generate}</button>
        <div id="calendar" class="mt-4 hidden"></div>
      </div>`;
  } else if (type === 'datediff') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div><label class="block text-sm font-medium mb-1">${t.date1}</label><input type="date" id="date1" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        <div><label class="block text-sm font-medium mb-1">${t.date2}</label><input type="date" id="date2" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        <button onclick="calculate()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
        <div id="result" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center text-2xl font-bold text-indigo-600"></div>
      </div>`;
  } else if (type === 'daysuntil') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div><label class="block text-sm font-medium mb-1">${t.target}</label><input type="date" id="targetDate" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        <button onclick="calculate()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
        <div id="result" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div id="days" class="text-4xl font-bold text-indigo-600"></div>
          <div class="text-gray-500">days</div>
        </div>
      </div>`;
  } else if (type === 'timestamp') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div class="flex gap-2">
          <input type="number" id="timestamp" class="flex-1 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 font-mono" placeholder="1700000000">
          <button onclick="useNow()" class="px-4 py-3 bg-gray-200 dark:bg-gray-600 rounded-lg">${t.now}</button>
        </div>
        <button onclick="convert()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.convert}</button>
        <div id="result" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden"></div>
      </div>`;
  } else if (type === 'timezone') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div><label class="block text-sm font-medium mb-1">${t.time}</label><input type="datetime-local" id="localTime" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        <button onclick="showTimes()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.convert}</button>
        <div id="result" class="mt-4 hidden space-y-2"></div>
      </div>`;
  } else if (type === 'weeknum') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div><label class="block text-sm font-medium mb-1">${t.date}</label><input type="date" id="date" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        <button onclick="calculate()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
        <div id="result" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div id="week" class="text-4xl font-bold text-indigo-600"></div>
        </div>
      </div>`;
  } else if (type === 'workdays') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium mb-1">${t.start}</label><input type="date" id="start" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
          <div><label class="block text-sm font-medium mb-1">${t.end}</label><input type="date" id="end" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        </div>
        <button onclick="calculate()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.calculate}</button>
        <div id="result" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div id="days" class="text-4xl font-bold text-indigo-600"></div>
        </div>
      </div>`;
  } else if (type === 'countdown') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div><label class="block text-sm font-medium mb-1">${t.target}</label><input type="datetime-local" id="target" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        <button onclick="start()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.start}</button>
        <div id="display" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div class="text-4xl font-bold text-indigo-600 font-mono">00:00:00:00</div>
        </div>
      </div>`;
  } else if (type === 'pomodoro') {
    return `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium mb-1">${t.work}</label><input type="number" id="work" value="25" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
          <div><label class="block text-sm font-medium mb-1">${t.break}</label><input type="number" id="break" value="5" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600"></div>
        </div>
        <button onclick="start()" class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">${t.start}</button>
        <div id="display" class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hidden text-center">
          <div id="timer" class="text-4xl font-bold text-indigo-600 font-mono">25:00</div>
          <div id="status" class="mt-2 text-lg">Work</div>
        </div>
      </div>`;
  }
  return '';
}

function generateScript(type) {
  if (type === 'calendar') {
    return `function generate() {
      const y = parseInt(document.getElementById('year').value);
      const m = parseInt(document.getElementById('month').value);
      const first = new Date(y, m, 1);
      const last = new Date(y, m + 1, 0);
      let html = '\u003cdiv class="grid grid-cols-7 gap-1 text-center text-sm"\u003e';
      ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => html += '\u003cdiv class="font-bold p-2"\u003e'+d+'\u003c/div\u003e');
      for (let i = 0; i < first.getDay(); i++) html += '\u003cdiv\u003e\u003c/div\u003e';
      for (let d = 1; d <= last.getDate(); d++) {
        const isToday = new Date().toDateString() === new Date(y, m, d).toDateString();
        html += '\u003cdiv class="p-2 '+(isToday?'bg-indigo-500 text-white rounded':'')+'"\u003e'+d+'\u003c/div\u003e';
      }
      html += '\u003c/div\u003e';
      document.getElementById('calendar').innerHTML = html;
      document.getElementById('calendar').classList.remove('hidden');
    }`;
  } else if (type === 'datediff') {
    return `function calculate() {
      const d1 = new Date(document.getElementById('date1').value);
      const d2 = new Date(document.getElementById('date2').value);
      if (isNaN(d1) || isNaN(d2)) return;
      const diff = Math.abs(d2 - d1);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('result').textContent = days + ' days';
      document.getElementById('result').classList.remove('hidden');
    }`;
  } else if (type === 'daysuntil') {
    return `function calculate() {
      const target = new Date(document.getElementById('targetDate').value);
      const today = new Date();
      if (isNaN(target)) return;
      const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
      document.getElementById('days').textContent = diff;
      document.getElementById('result').classList.remove('hidden');
    }`;
  } else if (type === 'timestamp') {
    return `function useNow() { document.getElementById('timestamp').value = Math.floor(Date.now()/1000); }
    function convert() {
      const ts = parseInt(document.getElementById('timestamp').value) * 1000;
      const d = new Date(ts);
      document.getElementById('result').innerHTML = '\u003cdiv class="text-lg"\u003e' + d.toLocaleString() + '\u003c/div\u003e';
      document.getElementById('result').classList.remove('hidden');
    }`;
  } else if (type === 'timezone') {
    return `function showTimes() {
      const input = document.getElementById('localTime').value;
      if (!input) return;
      const d = new Date(input);
      const cities = [
        {n:'UTC', z:'UTC'},
        {n:'New York', z:'America/New_York'},
        {n:'London', z:'Europe/London'},
        {n:'Paris', z:'Europe/Paris'},
        {n:'Tokyo', z:'Asia/Tokyo'},
        {n:'Dubai', z:'Asia/Dubai'},
        {n:'Sydney', z:'Australia/Sydney'}
      ];
      let html = '';
      cities.forEach(c => {
        const time = d.toLocaleTimeString('en-US', {timeZone: c.z, hour: '2-digit', minute: '2-digit'});
        html += '\u003cdiv class="flex justify-between p-2 bg-white dark:bg-gray-800 rounded"\u003e\u003cspan\u003e' + c.n + '\u003c/span\u003e\u003cspan class="font-bold"\u003e' + time + '\u003c/span\u003e\u003c/div\u003e';
      });
      document.getElementById('result').innerHTML = html;
      document.getElementById('result').classList.remove('hidden');
    }`;
  } else if (type === 'weeknum') {
    return `function calculate() {
      const d = new Date(document.getElementById('date').value);
      if (isNaN(d)) return;
      const onejan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
      document.getElementById('week').textContent = 'Week ' + week;
      document.getElementById('result').classList.remove('hidden');
    }`;
  } else if (type === 'workdays') {
    return `function calculate() {
      const s = new Date(document.getElementById('start').value);
      const e = new Date(document.getElementById('end').value);
      if (isNaN(s) || isNaN(e)) return;
      let count = 0;
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        if (d.getDay() !== 0 && d.getDay() !== 6) count++;
      }
      document.getElementById('days').textContent = count;
      document.getElementById('result').classList.remove('hidden');
    }`;
  } else if (type === 'countdown') {
    return `let interval;
    function start() {
      clearInterval(interval);
      const target = new Date(document.getElementById('target').value);
      if (isNaN(target)) return;
      document.getElementById('display').classList.remove('hidden');
      interval = setInterval(() => {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) { clearInterval(interval); document.getElementById('display').innerHTML = '\u003cdiv class="text-4xl font-bold text-green-600"\u003eDone!\u003c/div\u003e'; return; }
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const m = Math.floor((diff % (1000*60*60)) / (1000*60));
        const s = Math.floor((diff % (1000*60)) / 1000);
        document.querySelector('#display .font-mono').textContent = d+'d '+String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
      }, 1000);
    }`;
  } else if (type === 'pomodoro') {
    return `let interval, isWork = true;
    function start() {
      clearInterval(interval);
      const work = parseInt(document.getElementById('work').value) || 25;
      const brk = parseInt(document.getElementById('break').value) || 5;
      document.getElementById('display').classList.remove('hidden');
      let time = work * 60;
      function tick() {
        const m = Math.floor(time / 60), s = time % 60;
        document.getElementById('timer').textContent = String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
        document.getElementById('status').textContent = isWork ? 'Work' : 'Break';
        if (time > 0) { time--; } else { isWork = !isWork; time = (isWork ? work : brk) * 60; }
      }
      tick();
      interval = setInterval(tick, 1000);
    }`;
  }
  return '';
}

console.log('🔧 إصلاح أدوات الزمن والتاريخ (9 أدوات × 5 لغات = 45 ملف)\n');

let fixed = 0;
let errors = [];

for (const { tool, type } of datetimeTools) {
  console.log(`🔧 ${tool}...`);
  
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
    
    const t = texts[tool]?.[lang] || texts[tool]?.en;
    const section = generateSection(tool, type, t);
    const script = generateScript(type);
    
    if (!section || !script) {
      errors.push(`${lang}/${tool}: no template`);
      continue;
    }
    
    // Replace section
    const sectionPattern = /<div class="grid md:grid-cols-2 gap-6 mb-8"[>\s\S]*?<button[^>]*>[^\u003c]*<\/button>/;
    if (sectionPattern.test(html)) {
      html = html.replace(sectionPattern, `<div class="space-y-6 mb-8">${section}</div>`);
    } else {
      errors.push(`${lang}/${tool}: pattern not found`);
      continue;
    }
    
    // Replace script
    const scriptPattern = /<script>[\s\S]*?function[\s\S]*?resultValue\.textContent = ['"`]42['"`][\s\S]*?<\/script>/;
    if (scriptPattern.test(html)) {
      html = html.replace(scriptPattern, `<script>${script}</script>`);
    } else {
      html = html.replace('</body>', `<script>${script}</script>\n</body>`);
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
  errors.slice(0, 5).forEach(e => console.log(`   - ${e}`));
  if (errors.length > 5) console.log(`   ... و ${errors.length - 5} أخطاء أخرى`);
}
