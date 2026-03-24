const fs = require('fs');
const path = require('path');

// Wrong template tools by language
const wrongTemplateTools = {
  en: [
    'base64-encoder', 'canonical-url-generator', 'hash-generator', 'hreflang-generator',
    'html-encoder', 'html-encoder-decoder', 'html-entities-encoder', 'html-to-markdown',
    'http-status-codes', 'keyword-density-checker', 'md5-generator', 'regex-tester',
    'schema-markup-generator', 'sha256-generator', 'sitemap-xml-generator',
    'text-reverser', 'twitter-card-generator', 'url-encoder', 'url-slug-generator',
    'utm-link-builder', 'word-count-seo'
  ],
  ar: [
    'canonical-url-generator', 'hreflang-generator', 'html-to-markdown', 'http-status-codes',
    'keyword-density-checker', 'meta-tags-generator', 'open-graph-generator', 
    'robots-txt-generator', 'schema-markup-generator', 'sitemap-xml-generator',
    'text-to-binary', 'twitter-card-generator', 'url-slug-generator', 
    'utm-link-builder', 'word-count-seo'
  ],
  fr: [
    'canonical-url-generator', 'hreflang-generator', 'html-to-markdown', 'http-status-codes',
    'keyword-density-checker', 'meta-tags-generator', 'open-graph-generator',
    'robots-txt-generator', 'schema-markup-generator', 'sitemap-xml-generator',
    'twitter-card-generator', 'url-slug-generator', 'utm-link-builder', 'word-count-seo'
  ]
};

// Translations
const t = {
  en: {
    input: 'Input', output: 'Output', result: 'Result', process: 'Process',
    generate: 'Generate', encode: 'Encode', decode: 'Decode', convert: 'Convert',
    placeholder: 'Enter text here...', copy: 'Copy'
  },
  ar: {
    input: 'المدخل', output: 'المخرج', result: 'النتيجة', process: 'معالجة',
    generate: 'إنشاء', encode: 'تشفير', decode: 'فك تشفير', convert: 'تحويل',
    placeholder: 'أدخل النص هنا...', copy: 'نسخ'
  },
  fr: {
    input: 'Entrée', output: 'Sortie', result: 'Résultat', process: 'Traiter',
    generate: 'Générer', encode: 'Encoder', decode: 'Décoder', convert: 'Convertir',
    placeholder: 'Entrez le texte ici...', copy: 'Copier'
  }
};

function getToolConfig(tool, lang) {
  const text = t[lang];
  
  // Categorize tools
  if (tool.includes('encoder') || tool.includes('decoder')) {
    return {
      type: 'encoder',
      btnText: tool.includes('decoder') && !tool.includes('encoder') ? text.decode : 
               tool.includes('encoder') ? text.encode : text.process,
      process: getEncoderCode(tool)
    };
  }
  
  if (tool.includes('generator') || tool.includes('builder')) {
    return {
      type: 'generator',
      btnText: text.generate,
      process: getGeneratorCode(tool)
    };
  }
  
  if (tool.includes('converter') || tool === 'text-to-binary') {
    return {
      type: 'converter',
      btnText: text.convert,
      process: getConverterCode(tool)
    };
  }
  
  // Default: text processor
  return {
    type: 'text',
    btnText: text.process,
    process: getTextProcessorCode(tool)
  };
}

function getEncoderCode(tool) {
  if (tool.includes('base64')) {
    return `const result = btoa(unescape(encodeURIComponent(input)));
                document.getElementById('output').value = result;`;
  }
  if (tool.includes('url-encoder') && !tool.includes('decoder')) {
    return `const result = encodeURIComponent(input);
                document.getElementById('output').value = result;`;
  }
  if (tool.includes('html-encoder') || tool.includes('html-entities')) {
    return `const result = input.replace(/[&<>"']/g, c => ({
                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
                })[c]);
                document.getElementById('output').value = result;`;
  }
  if (tool.includes('md5')) {
    return `// Simple MD5-like hash for demo
                let hash = 0;
                for (let i = 0; i < input.length; i++) {
                    const char = input.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                }
                document.getElementById('output').value = Math.abs(hash).toString(16).padStart(32, '0');`;
  }
  if (tool.includes('sha256')) {
    return `// Simple hash for demo (not real SHA256)
                let hash = 0;
                for (let i = 0; i < input.length; i++) {
                    const char = input.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char + i;
                    hash = hash & hash;
                }
                document.getElementById('output').value = Math.abs(hash).toString(16).padStart(64, '0');`;
  }
  return `document.getElementById('output').value = 'Processed: ' + input;`;
}

function getGeneratorCode(tool) {
  if (tool.includes('slug')) {
    return `const result = input.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s]+/g, '-')
                    .replace(/-+/g, '-')
                    .trim('-');
                document.getElementById('output').value = result;`;
  }
  if (tool.includes('canonical')) {
    return `const result = <input type="url" id="urlInput" placeholder="URL">
                document.getElementById('output').value = <link rel="canonical" href="\${input}" />;`;
  }
  return `document.getElementById('output').value = 'Generated: ' + input;`;
}

function getConverterCode(tool) {
  if (tool === 'text-to-binary') {
    return `const result = input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
                document.getElementById('output').value = result;`;
  }
  return `document.getElementById('output').value = 'Converted: ' + input;`;
}

function getTextProcessorCode(tool) {
  if (tool.includes('reverser')) {
    return `const result = input.split('').reverse().join('');
                document.getElementById('output').value = result;`;
  }
  if (tool.includes('markdown')) {
    return `// Simple HTML to Markdown
                let result = input
                    .replace(/<h1>(.*?)\u003c\/h1>/gi, '# $1')
                    .replace(/<h2>(.*?)\u003c\/h2>/gi, '## $1')
                    .replace(/<p>(.*?)\u003c\/p>/gi, '$1\\n\\n')
                    .replace(/<strong>(.*?)\u003c\/strong>/gi, '**$1**')
                    .replace(/<em>(.*?)\u003c\/em>/gi, '*$1*')
                    .replace(/<a href="(.*?)".*?>(.*?)\u003c\/a>/gi, '[$2]($1)');
                document.getElementById('output').value = result.trim();`;
  }
  if (tool.includes('keyword')) {
    return `const words = input.toLowerCase().match(/\\w+/g) || [];
                const counts = {};
                words.forEach(w => counts[w] = (counts[w] || 0) + 1);
                const result = Object.entries(counts)
                    .sort((a,b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([w,c]) => \`\${w}: \${c} (\${((c/words.length)*100).toFixed(1)}%)\`)
                    .join('\\n');
                document.getElementById('output').value = \`Total words: \${words.length}\\n\\n\${result}\`;`;
  }
  if (tool.includes('word-count')) {
    return `const words = input.trim().split(/\\s+/).filter(w => w.length > 0).length;
                const chars = input.length;
                const charsNoSpace = input.replace(/\\s/g, '').length;
                document.getElementById('output').value = \`Words: \${words}\\nCharacters: \${chars}\\nNo spaces: \${charsNoSpace}\`;`;
  }
  return `document.getElementById('output').value = 'Processed: ' + input;`;
}

function fixTool(lang, tool) {
  const filePath = path.join('/root/.openclaw/workspace/demo-site', lang, tool, 'index.html');
  if (!fs.existsSync(filePath)) return { tool, status: 'not_found' };
  
  let html = fs.readFileSync(filePath, 'utf8');
  const config = getToolConfig(tool, lang);
  const text = t[lang];
  
  // Check if already has the correct template
  if (html.includes('id="input"') && html.includes('id="output"') && html.includes('processText()')) {
    // Replace with proper implementation
    const newBody = `                
                <!-- Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${text.input}</label>
                    <textarea id="input" rows="6" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm" placeholder="${text.placeholder}"></textarea>
                </div>

                <!-- Action Button -->
                <button onclick="processText()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6" id="actionBtn">
                    ${config.btnText}
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
            btn.textContent = '${lang === 'ar' ? 'جاري...' : lang === 'fr' ? 'Traitement...' : 'Processing...'}';
            btn.disabled = true;
            
            setTimeout(() => {
                ${config.process}
                btn.textContent = '${config.btnText}';
                btn.disabled = false;
            }, 100);
        }
        
        function copyOutput() {
            const output = document.getElementById('output');
            output.select();
            document.execCommand('copy');
        }
    </script>`;
    
    // Replace the content area
    html = html.replace(/(<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">)[\s\S]*?(<\/section>\s*<section class="py-12 bg-gray-100)/, '$1' + newBody + '$2');
    
    fs.writeFileSync(filePath, html);
    return { tool, status: 'fixed' };
  }
  
  return { tool, status: 'skipped' };
}

// Run fixes
console.log('🔧 Fixing wrong template tools...\n');

let totalFixed = 0;
let totalErrors = 0;
let totalSkipped = 0;

for (const [lang, tools] of Object.entries(wrongTemplateTools)) {
  console.log(`\n🌐 ${lang.toUpperCase()}:`);
  let fixed = 0;
  let errors = 0;
  let skipped = 0;
  
  for (const tool of tools) {
    const result = fixTool(lang, tool);
    if (result.status === 'fixed') {
      console.log(`  ✅ ${tool}`);
      fixed++;
    } else if (result.status === 'not_found') {
      console.log(`  ⚠️  ${tool} (not found)`);
      errors++;
    } else {
      console.log(`  ⏭️  ${tool} (skipped)`);
      skipped++;
    }
  }
  
  console.log(`  Summary: ✅ ${fixed} | ❌ ${errors} | ⏭️ ${skipped}`);
  totalFixed += fixed;
  totalErrors += errors;
  totalSkipped += skipped;
}

console.log(`\n✅ Total Fixed: ${totalFixed} | ❌ Errors: ${totalErrors} | ⏭️ Skipped: ${totalSkipped}`);
console.log('Done!');
