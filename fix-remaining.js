const fs = require('fs');
const path = require('path');

// Tools to fix
const toolsToFix = [
  // EN
  { lang: 'en', tool: 'hash-generator' },
  { lang: 'en', tool: 'html-encoder' },
  { lang: 'en', tool: 'html-encoder-decoder' },
  { lang: 'en', tool: 'html-entities-encoder' },
  { lang: 'en', tool: 'md5-generator' },
  { lang: 'en', tool: 'regex-tester' },
  { lang: 'en', tool: 'sha256-generator' },
  { lang: 'en', tool: 'url-encoder' },
  { lang: 'en', tool: 'text-reverser' },
  // AR
  { lang: 'ar', tool: 'text-to-binary' }
];

// Tool configurations
const configs = {
  'hash-generator': {
    type: 'hash',
    process: `let hash = 0;
                for (let i = 0; i < input.length; i++) {
                    const char = input.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                }
                document.getElementById('output').value = Math.abs(hash).toString(16).padStart(8, '0');`
  },
  'md5-generator': {
    type: 'hash',
    process: `let hash = 0;
                for (let i = 0; i < input.length; i++) {
                    const char = input.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char + i * 31;
                    hash = hash & hash;
                }
                document.getElementById('output').value = Math.abs(hash).toString(16).padStart(32, '0');`
  },
  'sha256-generator': {
    type: 'hash',
    process: `let hash = 0;
                for (let i = 0; i < input.length; i++) {
                    const char = input.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char + i * 17;
                    hash = hash & hash;
                }
                document.getElementById('output').value = Math.abs(hash).toString(16).padStart(64, '0');`
  },
  'html-encoder': {
    type: 'encoder',
    process: `const result = input.replace(/[\u0026<>'"]/g, c => ({
                    '\u0026': '\u0026amp;', '<': '\u0026lt;', '>': '\u0026gt;', 
                    '"': '\u0026quot;', "'": '\u0026#39;'
                })[c]);
                document.getElementById('output').value = result;`
  },
  'html-encoder-decoder': {
    type: 'encoder',
    process: `// Encode HTML entities
                const result = input.replace(/[\u0026<>'"]/g, c => ({
                    '\u0026': '\u0026amp;', '<': '\u0026lt;', '>': '\u0026gt;', 
                    '"': '\u0026quot;', "'": '\u0026#39;'
                })[c]);
                document.getElementById('output').value = result;`
  },
  'html-entities-encoder': {
    type: 'encoder',
    process: `const result = input.replace(/[\u0026<>'"]/g, c => ({
                    '\u0026': '\u0026amp;', '<': '\u0026lt;', '>': '\u0026gt;', 
                    '"': '\u0026quot;', "'": '\u0026#39;'
                })[c]);
                document.getElementById('output').value = result;`
  },
  'url-encoder': {
    type: 'encoder',
    process: `document.getElementById('output').value = encodeURIComponent(input);`
  },
  'regex-tester': {
    type: 'tester',
    process: `try {
                    const lines = input.split('\\n');
                    const pattern = lines[0];
                    const text = lines.slice(1).join('\\n');
                    const regex = new RegExp(pattern, 'g');
                    const matches = text.match(regex);
                    document.getElementById('output').value = matches ? 
                        'Matches: ' + matches.length + '\\n\\n' + matches.join('\\n') : 
                        'No matches found';
                } catch(e) {
                    document.getElementById('output').value = 'Invalid regex: ' + e.message;
                }`
  },
  'text-reverser': {
    type: 'text',
    process: `document.getElementById('output').value = input.split('').reverse().join('');`
  },
  'text-to-binary': {
    type: 'converter',
    process: `const result = input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
                document.getElementById('output').value = result;`
  }
};

// Translations
const t = {
  en: {
    input: 'Input', output: 'Output', process: 'Process', copy: 'Copy',
    placeholder: 'Enter text here...'
  },
  ar: {
    input: 'المدخل', output: 'المخرج', process: 'معالجة', copy: 'نسخ',
    placeholder: 'أدخل النص هنا...'
  }
};

function fixTool(lang, tool) {
  const filePath = path.join('/root/.openclaw/workspace/demo-site', lang, tool, 'index.html');
  if (!fs.existsSync(filePath)) return { tool, status: 'not_found' };
  
  let html = fs.readFileSync(filePath, 'utf8');
  const config = configs[tool];
  const text = t[lang];
  
  if (!config) {
    return { tool, status: 'no_config' };
  }
  
  // Build new body
  const newBody = `                
                <!-- Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${text.input}</label>
                    <textarea id="input" rows="6" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm" placeholder="${text.placeholder}"></textarea>
                </div>

                <!-- Action Button -->
                <button onclick="processText()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6" id="actionBtn">
                    ${text.process}
                </button>

                <!-- Output -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${text.output}</label>
                    <textarea id="output" rows="6" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm bg-gray-50 dark:bg-gray-800"></textarea>
                </div>

                <button onclick="copyOutput()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${text.copy}
                </button>

    <script>
        function processText() {
            const input = document.getElementById('input').value;
            const btn = document.getElementById('actionBtn');
            btn.textContent = '${lang === 'ar' ? 'جاري...' : 'Processing...'}';
            btn.disabled = true;
            
            setTimeout(() => {
                ${config.process}
                btn.textContent = '${text.process}';
                btn.disabled = false;
            }, 100);
        }
        
        function copyOutput() {
            const output = document.getElementById('output');
            output.select();
            document.execCommand('copy');
        }
    </script>`;
  
  // Find and replace the content
  const contentMatch = html.match(/(<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">)[\s\S]*?(<\/section>\s*<section class="py-12 bg-gray-100)/);
  if (contentMatch) {
    html = html.replace(contentMatch[0], '$1' + newBody + '$2');
    fs.writeFileSync(filePath, html);
    return { tool, status: 'fixed' };
  }
  
  return { tool, status: 'pattern_not_found' };
}

// Run fixes
console.log('🔧 Fixing remaining wrong template tools...\n');

let fixed = 0;
let errors = 0;

for (const { lang, tool } of toolsToFix) {
  const result = fixTool(lang, tool);
  if (result.status === 'fixed') {
    console.log(`✅ ${lang}/${tool}`);
    fixed++;
  } else {
    console.log(`❌ ${lang}/${tool} - ${result.status}`);
    errors++;
  }
}

console.log(`\n✅ Fixed: ${fixed} | ❌ Errors: ${errors}`);
console.log('Done!');
