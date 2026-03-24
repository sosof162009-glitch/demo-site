const fs = require('fs');
const path = require('path');

const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Template for Emoji to Unicode
const emojiToUnicodeTemplate = (lang) => {
  const labels = {
    en: { input: 'Enter Emoji', output: 'Unicode Result', placeholder: 'Type or paste emoji here...', convert: 'Convert to Unicode', copy: 'Copy Result' },
    ar: { input: 'أدخل الإيموجي', output: 'نتيجة اليونيكود', placeholder: 'اكتب أو الصق الإيموجي هنا...', convert: 'تحويل إلى يونيكود', copy: 'نسخ النتيجة' },
    fr: { input: 'Entrer Emoji', output: 'Résultat Unicode', placeholder: 'Tapez ou collez l\'emoji ici...', convert: 'Convertir en Unicode', copy: 'Copier' },
    es: { input: 'Ingresar Emoji', output: 'Resultado Unicode', placeholder: 'Escribe o pega emoji aquí...', convert: 'Convertir a Unicode', copy: 'Copiar' },
    de: { input: 'Emoji Eingeben', output: 'Unicode Ergebnis', placeholder: 'Emoji hier eingeben...', convert: 'In Unicode Konvertieren', copy: 'Kopieren' }
  };
  const l = labels[lang];
  return `
                <!-- Emoji Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${l.input}</label>
                    <input type="text" id="emojiInput" class="w-full p-4 text-4xl text-center rounded-lg border dark:border-gray-600 dark:bg-gray-700" placeholder="${l.placeholder}" maxlength="10">
                </div>

                <!-- Convert Button -->
                <button onclick="convertEmoji()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    ${l.convert}
                </button>

                <!-- Output -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${l.output}</label>
                    <input type="text" id="unicodeOutput" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-center text-lg bg-gray-50 dark:bg-gray-800" readonly>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${l.copy}
                </button>

    <script>
        function convertEmoji() {
            const input = document.getElementById('emojiInput').value;
            const output = document.getElementById('unicodeOutput');
            let result = '';
            for (const char of input) {
                result += 'U+' + char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0') + ' ';
            }
            output.value = result.trim();
        }
        
        function copyResult() {
            const output = document.getElementById('unicodeOutput');
            output.select();
            document.execCommand('copy');
            alert('Copied!');
        }
        
        // Real-time conversion
        document.getElementById('emojiInput').addEventListener('input', convertEmoji);
    </script>`;
};

// Template for Unicode to Emoji
const unicodeToEmojiTemplate = (lang) => {
  const labels = {
    en: { input: 'Enter Unicode', output: 'Emoji Result', placeholder: 'e.g., U+1F600 U+1F601', convert: 'Convert to Emoji', copy: 'Copy Result' },
    ar: { input: 'أدخل اليونيكود', output: 'نتيجة الإيموجي', placeholder: 'مثال: U+1F600', convert: 'تحويل إلى إيموجي', copy: 'نسخ النتيجة' },
    fr: { input: 'Entrer Unicode', output: 'Résultat Emoji', placeholder: 'ex: U+1F600', convert: 'Convertir en Emoji', copy: 'Copier' },
    es: { input: 'Ingresar Unicode', output: 'Resultado Emoji', placeholder: 'ej: U+1F600', convert: 'Convertir a Emoji', copy: 'Copiar' },
    de: { input: 'Unicode Eingeben', output: 'Emoji Ergebnis', placeholder: 'z.B. U+1F600', convert: 'In Emoji Konvertieren', copy: 'Kopieren' }
  };
  const l = labels[lang];
  return `
                <!-- Unicode Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${l.input}</label>
                    <input type="text" id="unicodeInput" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono" placeholder="${l.placeholder}">
                </div>

                <!-- Convert Button -->
                <button onclick="convertUnicode()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    ${l.convert}
                </button>

                <!-- Output -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${l.output}</label>
                    <input type="text" id="emojiOutput" class="w-full p-4 text-4xl text-center rounded-lg border dark:border-gray-600 dark:bg-gray-700 bg-gray-50 dark:bg-gray-800" readonly>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${l.copy}
                </button>

    <script>
        function convertUnicode() {
            const input = document.getElementById('unicodeInput').value;
            const output = document.getElementById('emojiOutput');
            const codes = input.split(/\\s+/);
            let result = '';
            for (const code of codes) {
                const hex = code.replace('U+', '').replace('u+', '');
                result += String.fromCodePoint(parseInt(hex, 16));
            }
            output.value = result;
        }
        
        function copyResult() {
            const output = document.getElementById('emojiOutput');
            output.select();
            document.execCommand('copy');
            alert('Copied!');
        }
        
        document.getElementById('unicodeInput').addEventListener('input', convertUnicode);
    </script>`;
};

console.log('🔧 إصلاح قوالب Special Tools...\n');

let fixed = 0;

// Fix Emoji to Unicode
for (const lang of languages) {
  const filePath = path.join(lang, 'emoji-to-unicode', 'index.html');
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    // Replace the tool section
    const newSection = emojiToUnicodeTemplate(lang);
    html = html.replace(/<!-- Text Input -->[\\s\\S]*?<\\/script\\s*\\>/, newSection);
    fs.writeFileSync(filePath, html);
    fixed++;
    console.log(`✅ emoji-to-unicode/${lang}`);
  }
}

// Fix Unicode to Emoji
for (const lang of languages) {
  const filePath = path.join(lang, 'unicode-to-emoji', 'index.html');
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    const newSection = unicodeToEmojiTemplate(lang);
    html = html.replace(/<!-- Text Input -->[\\s\\S]*?<\\/script\\s*\\>/, newSection);
    fs.writeFileSync(filePath, html);
    fixed++;
    console.log(`✅ unicode-to-emoji/${lang}`);
  }
}

console.log(`\n✅ تم إصلاح ${fixed} ملف`);
