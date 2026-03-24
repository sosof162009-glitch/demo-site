const fs = require('fs');
const path = require('path');

const languages = ['en', 'ar', 'fr', 'es', 'de'];

console.log('🔧 إصلاح قوالب Special Tools...\n');

let fixed = 0;

// Fix Emoji to Unicode - create proper HTML
for (const lang of languages) {
  const filePath = path.join(lang, 'emoji-to-unicode', 'index.html');
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace the generic text tool section with emoji-specific one
    const oldPattern = /<!-- Text Input -->[\s\S]*?<script>\s*function processText\(\)[\s\S]*?<\/script>/;
    
    const newSection = `
                <!-- Emoji Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">Enter Emoji</label>
                    <input type="text" id="emojiInput" class="w-full p-4 text-4xl text-center rounded-lg border dark:border-gray-600 dark:bg-gray-700" placeholder="😀" maxlength="10">
                </div>

                <!-- Convert Button -->
                <button onclick="convertEmoji()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6">
                    Convert to Unicode
                </button>

                <!-- Output -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Unicode Result</label>
                    <input type="text" id="unicodeOutput" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-center text-lg bg-gray-50 dark:bg-gray-800" readonly>
                </div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    Copy Result
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
        
        document.getElementById('emojiInput').addEventListener('input', convertEmoji);
    </script>`;
    
    if (oldPattern.test(html)) {
      html = html.replace(oldPattern, newSection);
      fs.writeFileSync(filePath, html);
      fixed++;
      console.log(`✅ emoji-to-unicode/${lang}`);
    } else {
      console.log(`⚠️ emoji-to-unicode/${lang} - Pattern not found`);
    }
  }
}

console.log(`\n✅ تم إصلاح ${fixed} ملف`);
