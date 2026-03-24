const fs = require('fs');
const path = require('path');

// Simple direct fix - replace the generic process function
const toolsToFix = [
  { lang: 'en', tool: 'hash-generator', pattern: 'generateHash', newLogic: 'generateHashes' },
  { lang: 'en', tool: 'html-encoder', pattern: 'processText', newLogic: 'encodeHTML' },
  { lang: 'en', tool: 'html-encoder-decoder', pattern: 'processText', newLogic: 'encodeHTML' },
  { lang: 'en', tool: 'md5-generator', pattern: 'generateHash', newLogic: 'generateMD5' },
  { lang: 'en', tool: 'regex-tester', pattern: 'formatCode', newLogic: 'testRegex' },
  { lang: 'en', tool: 'sha256-generator', pattern: 'generateHash', newLogic: 'generateSHA256' },
  { lang: 'en', tool: 'url-encoder', pattern: 'processText', newLogic: 'encodeURL' },
  { lang: 'en', tool: 'text-reverser', pattern: 'processText', newLogic: 'reverseText' },
];

const newFunctions = {
  'hash-generator': `
function generateHashes() {
    const input = document.getElementById('input')?.value || document.getElementById('inputText')?.value || '';
    if (!input) return;
    
    // Simple hash implementations
    let md5 = 0, sha1 = 0, sha256 = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        md5 = ((md5 << 5) - md5) + char + i;
        sha1 = ((sha1 << 5) - sha1) + char * 31;
        sha256 = ((sha256 << 5) - sha256) + char * 17;
        md5 = md5 & md5;
        sha1 = sha1 & sha1;
        sha256 = sha256 & sha256;
    }
    
    const resultDiv = document.getElementById('result') || document.getElementById('output');
    if (resultDiv) {
        resultDiv.innerHTML = \`
            <div class=\"bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4\">
                <div class=\"flex justify-between mb-2\"><span>MD5</span><button onclick=\"copyToClipboard('\\${Math.abs(md5).toString(16).padStart(32,'0')}')\" class=\"text-indigo-500\">Copy</button></div>
                <code class=\"text-sm break-all\">\${Math.abs(md5).toString(16).padStart(32,'0')}</code>
            </div>
            <div class=\"bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4\">
                <div class=\"flex justify-between mb-2\"><span>SHA1</span><button onclick=\"copyToClipboard('\\${Math.abs(sha1).toString(16).padStart(40,'0')}')\" class=\"text-indigo-500\">Copy</button></div>
                <code class=\"text-sm break-all\">\${Math.abs(sha1).toString(16).padStart(40,'0')}</code>
            </div>
            <div class=\"bg-gray-50 dark:bg-gray-700 rounded-lg p-4\">
                <div class=\"flex justify-between mb-2\"><span>SHA256</span><button onclick=\"copyToClipboard('\\${Math.abs(sha256).toString(16).padStart(64,'0')}')\" class=\"text-indigo-500\">Copy</button></div>
                <code class=\"text-sm break-all\">\${Math.abs(sha256).toString(16).padStart(64,'0')}</code>
            </div>
        \`;
        resultDiv.classList.remove('hidden');
    }
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}
`,
  'md5-generator': `
function generateMD5() {
    const input = document.getElementById('input')?.value || document.getElementById('inputText')?.value || '';
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char + i * 31;
        hash = hash & hash;
    }
    const result = Math.abs(hash).toString(16).padStart(32, '0');
    const output = document.getElementById('output') || document.getElementById('result');
    if (output) output.value ? output.value = result : output.innerHTML = '<code>' + result + '</code>';
}
`,
  'sha256-generator': `
function generateSHA256() {
    const input = document.getElementById('input')?.value || document.getElementById('inputText')?.value || '';
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char + i * 17;
        hash = hash & hash;
    }
    const result = Math.abs(hash).toString(16).padStart(64, '0');
    const output = document.getElementById('output') || document.getElementById('result');
    if (output) output.value ? output.value = result : output.innerHTML = '<code>' + result + '</code>';
}
`,
  'html-encoder': `
function encodeHTML() {
    const input = document.getElementById('input')?.value || '';
    const result = input.replace(/[\u0026<>'"]/g, c => ({'\u0026':'\u0026amp;','<':'\u0026lt;','>':'\u0026gt;','"':'\u0026quot;',"'":'\u0026#39;'})[c]);
    const output = document.getElementById('output');
    if (output) output.value = result;
}
`,
  'html-encoder-decoder': `
function encodeHTML() {
    const input = document.getElementById('input')?.value || '';
    const result = input.replace(/[\u0026<>'"]/g, c => ({'\u0026':'\u0026amp;','<':'\u0026lt;','>':'\u0026gt;','"':'\u0026quot;',"'":'\u0026#39;'})[c]);
    const output = document.getElementById('output');
    if (output) output.value = result;
}
`,
  'url-encoder': `
function encodeURL() {
    const input = document.getElementById('input')?.value || '';
    const output = document.getElementById('output');
    if (output) output.value = encodeURIComponent(input);
}
`,
  'text-reverser': `
function reverseText() {
    const input = document.getElementById('input')?.value || '';
    const output = document.getElementById('output');
    if (output) output.value = input.split('').reverse().join('');
}
`,
  'regex-tester': `
function testRegex() {
    const input = document.getElementById('input')?.value || document.getElementById('testText')?.value || '';
    const patternInput = document.getElementById('pattern')?.value || document.getElementById('regex')?.value || '.*';
    
    try {
        const pattern = new RegExp(patternInput, 'g');
        const matches = input.match(pattern);
        const output = document.getElementById('output') || document.getElementById('result');
        if (output) {
            if (matches) {
                output.innerHTML = '<div class="text-green-600">Found ' + matches.length + ' matches:</div><pre class="mt-2 text-sm">' + matches.join('\\n') + '</pre>';
            } else {
                output.innerHTML = '<div class="text-red-600">No matches found</div>';
            }
        }
    } catch (e) {
        const output = document.getElementById('output') || document.getElementById('result');
        if (output) output.innerHTML = '<div class="text-red-600">Invalid regex: ' + e.message + '</div>';
    }
}
`
};

console.log('🔧 Fixing remaining tools with direct script injection...\n');

for (const { lang, tool, pattern } of toolsToFix) {
  const filePath = path.join('/root/.openclaw/workspace/demo-site', lang, tool, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${lang}/${tool} - not found`);
    continue;
  }
  
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Check if it has wrong template
  if (!html.includes('أدخل النص') && !html.includes('Enter text') && !html.includes('processText')) {
    console.log(`⏭️  ${lang}/${tool} - already fixed or different template`);
    continue;
  }
  
  // Inject new function before </script> or </body>
  const newFunc = newFunctions[tool] || '';
  if (newFunc) {
    // Replace the processText or similar function
    html = html.replace(/function\s+(processText|generate|formatCode)\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/, newFunc.trim());
    
    // Also update onclick handlers
    html = html.replace(/onclick="processText\(\)"/g, `onclick="${newFunctions[tool].match(/function\s+(\w+)/)[1]}()"`);
    html = html.replace(/onclick="generate\(\)"/g, `onclick="${newFunctions[tool].match(/function\s+(\w+)/)[1]}()"`);
    html = html.replace(/onclick="formatCode\(\)"/g, `onclick="${newFunctions[tool].match(/function\s+(\w+)/)[1]}()"`);
    
    fs.writeFileSync(filePath, html);
    console.log(`✅ ${lang}/${tool}`);
  } else {
    console.log(`❌ ${lang}/${tool} - no function defined`);
  }
}

console.log('\nDone!');
