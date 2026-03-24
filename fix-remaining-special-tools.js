const fs = require('fs');
const path = require('path');

const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Templates for each tool type
const templates = {
  'unicode-to-emoji': (lang) => `
                <!-- Unicode Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'أدخل اليونيكود' : 'Enter Unicode'}</label>
                    <input type="text" id="unicodeInput" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono" placeholder="U+1F600 U+1F601">
                </div>

                <button onclick="convertUnicode()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    ${lang === 'ar' ? 'تحويل إلى إيموجي' : 'Convert to Emoji'}
                </button>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'النتيجة' : 'Result'}</label>
                    <input type="text" id="emojiOutput" class="w-full p-4 text-4xl text-center rounded-lg border dark:border-gray-600 dark:bg-gray-700 bg-gray-50 dark:bg-gray-800" readonly>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${lang === 'ar' ? 'نسخ' : 'Copy'}
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
            alert('${lang === 'ar' ? 'تم النسخ!' : 'Copied!'}');
        }
        document.getElementById('unicodeInput').addEventListener('input', convertUnicode);
    </script>`,

  'text-to-binary': (lang) => `
                <!-- Text Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'أدخل النص' : 'Enter Text'}</label>
                    <textarea id="textInput" rows="4" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm" placeholder="${lang === 'ar' ? 'اكتب هنا...' : 'Type here...'}"></textarea>
                </div>

                <button onclick="convertToBinary()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    ${lang === 'ar' ? 'تحويل إلى باينري' : 'Convert to Binary'}
                </button>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'النتيجة' : 'Result'}</label>
                    <textarea id="binaryOutput" rows="4" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-xs bg-gray-50 dark:bg-gray-800" readonly></textarea>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${lang === 'ar' ? 'نسخ' : 'Copy'}
                </button>

    <script>
        function convertToBinary() {
            const input = document.getElementById('textInput').value;
            const output = document.getElementById('binaryOutput');
            const binary = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            output.value = binary;
        }
        function copyResult() {
            const output = document.getElementById('binaryOutput');
            output.select();
            document.execCommand('copy');
            alert('${lang === 'ar' ? 'تم النسخ!' : 'Copied!'}');
        }
        document.getElementById('textInput').addEventListener('input', convertToBinary);
    </script>`,

  'binary-to-text': (lang) => `
                <!-- Binary Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'أدخل الباينري' : 'Enter Binary'}</label>
                    <textarea id="binaryInput" rows="4" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-xs" placeholder="01001000 01101001"></textarea>
                </div>

                <button onclick="convertToText()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    ${lang === 'ar' ? 'تحويل إلى نص' : 'Convert to Text'}
                </button>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'النتيجة' : 'Result'}</label>
                    <textarea id="textOutput" rows="4" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm bg-gray-50 dark:bg-gray-800" readonly></textarea>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${lang === 'ar' ? 'نسخ' : 'Copy'}
                </button>

    <script>
        function convertToText() {
            const input = document.getElementById('binaryInput').value.replace(/\\s/g, '');
            const output = document.getElementById('textOutput');
            let text = '';
            for (let i = 0; i < input.length; i += 8) {
                const byte = input.substr(i, 8);
                text += String.fromCharCode(parseInt(byte, 2));
            }
            output.value = text;
        }
        function copyResult() {
            const output = document.getElementById('textOutput');
            output.select();
            document.execCommand('copy');
            alert('${lang === 'ar' ? 'تم النسخ!' : 'Copied!'}');
        }
        document.getElementById('binaryInput').addEventListener('input', convertToText);
    </script>`,

  'number-to-words': (lang) => `
                <!-- Number Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'أدخل الرقم' : 'Enter Number'}</label>
                    <input type="number" id="numberInput" class="w-full p-4 text-2xl text-center rounded-lg border dark:border-gray-600 dark:bg-gray-700" placeholder="123" max="9999">
                </div>

                <button onclick="convertToWords()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    ${lang === 'ar' ? 'تحويل إلى كلمات' : 'Convert to Words'}
                </button>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'النتيجة' : 'Result'}</label>
                    <input type="text" id="wordsOutput" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 text-lg bg-gray-50 dark:bg-gray-800 capitalize" readonly>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${lang === 'ar' ? 'نسخ' : 'Copy'}
                </button>

    <script>
        const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        
        function convertToWords() {
            const n = parseInt(document.getElementById('numberInput').value);
            const output = document.getElementById('wordsOutput');
            if (isNaN(n)) { output.value = ''; return; }
            if (n === 0) { output.value = 'zero'; return; }
            if (n < 10) { output.value = ones[n]; return; }
            if (n < 20) { output.value = teens[n - 10]; return; }
            if (n < 100) { output.value = tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : ''); return; }
            if (n < 1000) { output.value = ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + convertToWords(n % 100) : ''); return; }
            output.value = 'number too large';
        }
        function copyResult() {
            const output = document.getElementById('wordsOutput');
            output.select();
            document.execCommand('copy');
            alert('${lang === 'ar' ? 'تم النسخ!' : 'Copied!'}');
        }
        document.getElementById('numberInput').addEventListener('input', convertToWords);
    </script>`,

  'roman-numeral-converter': (lang) => `
                <!-- Number Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'أدخل الرقم' : 'Enter Number (1-3999)'}</label>
                    <input type="number" id="numberInput" class="w-full p-4 text-2xl text-center rounded-lg border dark:border-gray-600 dark:bg-gray-700" placeholder="2024" min="1" max="3999">
                </div>

                <button onclick="toRoman()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    ${lang === 'ar' ? 'تحويل إلى روماني' : 'Convert to Roman'}
                </button>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'النتيجة' : 'Roman Numeral'}</label>
                    <input type="text" id="romanOutput" class="w-full p-4 text-3xl text-center rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono bg-gray-50 dark:bg-gray-800" readonly>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${lang === 'ar' ? 'نسخ' : 'Copy'}
                </button>

    <script>
        function toRoman() {
            const num = parseInt(document.getElementById('numberInput').value);
            const output = document.getElementById('romanOutput');
            if (isNaN(num) || num < 1 || num > 3999) { output.value = ''; return; }
            const roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
            let result = '', n = num;
            for (const [r, v] of Object.entries(roman)) {
                while (n >= v) { result += r; n -= v; }
            }
            output.value = result;
        }
        function copyResult() {
            const output = document.getElementById('romanOutput');
            output.select();
            document.execCommand('copy');
            alert('${lang === 'ar' ? 'تم النسخ!' : 'Copied!'}');
        }
        document.getElementById('numberInput').addEventListener('input', toRoman);
    </script>`,

  'screen-resolution-detector': (lang) => `
                <div id="resolutionDisplay" class="grid grid-cols-2 gap-4 mb-6">
                    <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Screen Width</p>
                        <p class="text-3xl font-bold text-blue-600" id="screenWidth">--</p>
                        <p class="text-xs text-gray-500">px</p>
                    </div>
                    <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Screen Height</p>
                        <p class="text-3xl font-bold text-blue-600" id="screenHeight">--</p>
                        <p class="text-xs text-gray-500">px</p>
                    </div>
                    <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Window Width</p>
                        <p class="text-3xl font-bold text-green-600" id="windowWidth">--</p>
                        <p class="text-xs text-gray-500">px</p>
                    </div>
                    <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Window Height</p>
                        <p class="text-3xl font-bold text-green-600" id="windowHeight">--</p>
                        <p class="text-xs text-gray-500">px</p>
                    </div>
                    <div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Pixel Ratio</p>
                        <p class="text-3xl font-bold text-purple-600" id="pixelRatio">--</p>
                    </div>
                    <div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Color Depth</p>
                        <p class="text-3xl font-bold text-purple-600" id="colorDepth">--</p>
                        <p class="text-xs text-gray-500">bit</p>
                    </div>
                </div>

                <button onclick="updateResolution()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
                    ${lang === 'ar' ? 'تحديث' : 'Refresh'}
                </button>

    <script>
        function updateResolution() {
            document.getElementById('screenWidth').textContent = screen.width;
            document.getElementById('screenHeight').textContent = screen.height;
            document.getElementById('windowWidth').textContent = window.innerWidth;
            document.getElementById('windowHeight').textContent = window.innerHeight;
            document.getElementById('pixelRatio').textContent = window.devicePixelRatio.toFixed(2);
            document.getElementById('colorDepth').textContent = screen.colorDepth;
        }
        updateResolution();
        window.addEventListener('resize', updateResolution);
    </script>`,

  'browser-info-detector': (lang) => `
                <div id="browserInfo" class="space-y-3 mb-6">
                    <div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">Browser</span>
                        <span class="font-medium" id="browserName">--</span>
                    </div>
                    <div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">Language</span>
                        <span class="font-medium" id="browserLang">--</span>
                    </div>
                    <div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">Platform</span>
                        <span class="font-medium" id="platform">--</span>
                    </div>
                    <div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">Online</span>
                        <span class="font-medium" id="onlineStatus">--</span>
                    </div>
                    <div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">Cookies</span>
                        <span class="font-medium" id="cookiesEnabled">--</span>
                    </div>
                    <div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">Touch Support</span>
                        <span class="font-medium" id="touchSupport">--</span>
                    </div>
                </div>

                <button onclick="detectBrowser()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
                    ${lang === 'ar' ? 'تحديث' : 'Refresh'}
                </button>

    <script>
        function detectBrowser() {
            document.getElementById('browserName').textContent = navigator.userAgent.split(')')[0] + ')';
            document.getElementById('browserLang').textContent = navigator.language;
            document.getElementById('platform').textContent = navigator.platform;
            document.getElementById('onlineStatus').textContent = navigator.onLine ? '✅' : '❌';
            document.getElementById('cookiesEnabled').textContent = navigator.cookieEnabled ? '✅' : '❌';
            document.getElementById('touchSupport').textContent = 'ontouchstart' in window ? '✅' : '❌';
        }
        detectBrowser();
    </script>`
};

console.log('🔧 إصلاح قوالب Special Tools المتبقية...\n');

let fixed = 0;

const toolsToFix = ['unicode-to-emoji', 'text-to-binary', 'binary-to-text', 'number-to-words', 'roman-numeral-converter', 'screen-resolution-detector', 'browser-info-detector'];

for (const tool of toolsToFix) {
  for (const lang of languages) {
    const filePath = path.join(lang, tool, 'index.html');
    if (fs.existsSync(filePath)) {
      let html = fs.readFileSync(filePath, 'utf8');
      
      // Replace the generic text tool section
      const oldPattern = /<!-- Text Input -->[\s\S]*?<script>\s*function processText\(\)[\s\S]*?<\/script>/;
      
      if (oldPattern.test(html)) {
        const newSection = templates[tool](lang);
        html = html.replace(oldPattern, newSection);
        fs.writeFileSync(filePath, html);
        fixed++;
        console.log(`✅ ${tool}/${lang}`);
      } else {
        console.log(`⚠️ ${tool}/${lang} - Pattern not found`);
      }
    }
  }
}

console.log(`\n✅ تم إصلاح ${fixed} ملف`);
