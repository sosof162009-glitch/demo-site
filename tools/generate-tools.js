const fs = require('fs');
const path = require('path');

const baseDir = '/root/.openclaw/workspace/demo-site/tools';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Tool definitions with templates
const tools = [
  {
    id: 'text-diff',
    titles: { en: 'Text Diff Compare', ar: 'مقارنة النصوص', fr: 'Comparaison de Texte', es: 'Comparar Textos', de: 'Text Vergleich' },
    descriptions: {
      en: 'Compare two texts and see the differences highlighted',
      ar: 'قارن بين نصين وشاهد الاختلافات مظللة',
      fr: 'Comparez deux textes et voyez les différences surlignées',
      es: 'Compara dos textos y ve las diferencias resaltadas',
      de: 'Vergleichen Sie zwei Texte und sehen Sie hervorgehobene Unterschiede'
    },
    enContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Text Diff Compare | 205 Tools</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/tools.css">
</head>
<body>
  <div class="lang-selector">
    <select onchange="window.location.href=this.value">
      <option value="text-diff.html" selected>English</option>
      <option value="../ar/text-diff.html">العربية</option>
      <option value="../fr/text-diff.html">Français</option>
      <option value="../es/text-diff.html">Español</option>
      <option value="../de/text-diff.html">Deutsch</option>
    </select>
  </div>

  <div class="tool-container">
    <header class="tool-header">
      <h1>Text Diff Compare</h1>
      <p>Compare two texts and see the differences highlighted</p>
    </header>

    <div class="tool-card">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="input-group">
          <label for="text1">Original Text:</label>
          <textarea id="text1" class="tool-textarea" placeholder="Enter original text..."></textarea>
        </div>
        <div class="input-group">
          <label for="text2">Modified Text:</label>
          <textarea id="text2" class="tool-textarea" placeholder="Enter modified text..."></textarea>
        </div>
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" onclick="compareDiff()">Compare</button>
        <button class="btn btn-secondary" onclick="clearAll()">Clear</button>
      </div>

      <div class="input-group" style="margin-top: 20px;">
        <label>Result:</label>
        <div id="diff-result" class="result-area" data-placeholder="Differences will appear here..."></div>
      </div>
    </div>
  </div>

  <script>
    function compareDiff() {
      const text1 = document.getElementById('text1').value;
      const text2 = document.getElementById('text2').value;
      const result = document.getElementById('diff-result');
      
      if (!text1 && !text2) {
        result.innerHTML = '';
        return;
      }
      
      const lines1 = text1.split('\\n');
      const lines2 = text2.split('\\n');
      let html = '';
      
      const maxLines = Math.max(lines1.length, lines2.length);
      
      for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        
        if (line1 === line2) {
          html += '<div class="diff-unchanged">' + escapeHtml(line1) + '</div>';
        } else {
          if (line1) html += '<div class="diff-removed">- ' + escapeHtml(line1) + '</div>';
          if (line2) html += '<div class="diff-added">+ ' + escapeHtml(line2) + '</div>';
        }
      }
      
      result.innerHTML = html || 'No differences found';
    }
    
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function clearAll() {
      document.getElementById('text1').value = '';
      document.getElementById('text2').value = '';
      document.getElementById('diff-result').innerHTML = '';
    }
  </script>
</body>
</html>`
  },
  {
    id: 'remove-spaces',
    titles: { en: 'Remove Extra Spaces', ar: 'إزالة المسافات الزائدة', fr: 'Supprimer Espaces', es: 'Eliminar Espacios', de: 'Leerzeichen Entfernen' },
    descriptions: {
      en: 'Remove extra spaces, tabs, and clean up your text',
      ar: 'أزل المسافات الزائدة والتبويبات ونظف نصك',
      fr: 'Supprimez les espaces superflus et nettoyez votre texte',
      es: 'Elimina espacios extra y limpia tu texto',
      de: 'Entfernen Sie überflüssige Leerzeichen und bereinigen Sie Ihren Text'
    },
    enContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Remove Extra Spaces | 205 Tools</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/tools.css">
</head>
<body>
  <div class="lang-selector">
    <select onchange="window.location.href=this.value">
      <option value="remove-spaces.html" selected>English</option>
      <option value="../ar/remove-spaces.html">العربية</option>
      <option value="../fr/remove-spaces.html">Français</option>
      <option value="../es/remove-spaces.html">Español</option>
      <option value="../de/remove-spaces.html">Deutsch</option>
    </select>
  </div>

  <div class="tool-container">
    <header class="tool-header">
      <h1>Remove Extra Spaces</h1>
      <p>Remove extra spaces, tabs, and clean up your text</p>
    </header>

    <div class="tool-card">
      <div class="input-group">
        <label for="text-input">Input Text:</label>
        <textarea id="text-input" class="tool-textarea" placeholder="Enter text with extra spaces..."></textarea>
      </div>

      <div class="options-group">
        <div class="option-item">
          <input type="checkbox" id="trim-lines" checked>
          <label for="trim-lines">Trim line spaces</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="remove-tabs" checked>
          <label for="remove-tabs">Replace tabs with spaces</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="single-spaces" checked>
          <label for="single-spaces">Multiple spaces to single</label>
        </div>
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" onclick="cleanSpaces()">Clean Spaces</button>
        <button class="btn btn-secondary" onclick="clearAll()">Clear</button>
      </div>

      <div class="input-group" style="margin-top: 20px;">
        <label for="text-output">Result:</label>
        <textarea id="text-output" class="tool-textarea" placeholder="Cleaned text will appear here..." readonly></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-success" onclick="copyResult()">Copy</button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast">
    <div class="toast-icon">✓</div>
    <span>Copied!</span>
  </div>

  <script>
    function cleanSpaces() {
      let text = document.getElementById('text-input').value;
      const trimLines = document.getElementById('trim-lines').checked;
      const removeTabs = document.getElementById('remove-tabs').checked;
      const singleSpaces = document.getElementById('single-spaces').checked;
      
      if (removeTabs) text = text.replace(/\\t/g, ' ');
      if (singleSpaces) text = text.replace(/ +/g, ' ');
      if (trimLines) {
        text = text.split('\\n').map(line => line.trim()).join('\\n');
      }
      
      document.getElementById('text-output').value = text.trim();
    }

    function copyResult() {
      const output = document.getElementById('text-output');
      output.select();
      document.execCommand('copy');
      showToast();
    }

    function showToast() {
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }

    function clearAll() {
      document.getElementById('text-input').value = '';
      document.getElementById('text-output').value = '';
    }
  </script>
</body>
</html>`
  },
  {
    id: 'remove-line-breaks',
    titles: { en: 'Remove Line Breaks', ar: 'إزالة فواصل الأسطر', fr: 'Supprimer Sauts', es: 'Eliminar Saltos', de: 'Zeilenumbrüche Entfernen' },
    descriptions: {
      en: 'Remove line breaks and paragraph breaks from your text',
      ar: 'أزل فواصل الأسطر والفقرات من نصك',
      fr: 'Supprimez les sauts de ligne et paragraphes',
      es: 'Elimina saltos de línea y párrafos',
      de: 'Entfernen Sie Zeilenumbrüche aus Ihrem Text'
    },
    enContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Remove Line Breaks | 205 Tools</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/tools.css">
</head>
<body>
  <div class="lang-selector">
    <select onchange="window.location.href=this.value">
      <option value="remove-line-breaks.html" selected>English</option>
      <option value="../ar/remove-line-breaks.html">العربية</option>
      <option value="../fr/remove-line-breaks.html">Français</option>
      <option value="../es/remove-line-breaks.html">Español</option>
      <option value="../de/remove-line-breaks.html">Deutsch</option>
    </select>
  </div>

  <div class="tool-container">
    <header class="tool-header">
      <h1>Remove Line Breaks</h1>
      <p>Remove line breaks and paragraph breaks from your text</p>
    </header>

    <div class="tool-card">
      <div class="input-group">
        <label for="text-input">Input Text:</label>
        <textarea id="text-input" class="tool-textarea" placeholder="Enter text with line breaks..."></textarea>
      </div>

      <div class="options-group">
        <div class="option-item">
          <input type="radio" name="break-type" id="remove-all" value="all" checked>
          <label for="remove-all">Remove all breaks</label>
        </div>
        <div class="option-item">
          <input type="radio" name="break-type" id="keep-paragraphs" value="paragraphs">
          <label for="keep-paragraphs">Keep paragraph breaks</label>
        </div>
        <div class="option-item">
          <input type="radio" name="break-type" id="replace-space" value="space">
          <label for="replace-space">Replace with spaces</label>
        </div>
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" onclick="removeBreaks()">Remove Breaks</button>
        <button class="btn btn-secondary" onclick="clearAll()">Clear</button>
      </div>

      <div class="input-group" style="margin-top: 20px;">
        <label for="text-output">Result:</label>
        <textarea id="text-output" class="tool-textarea" placeholder="Result will appear here..." readonly></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-success" onclick="copyResult()">Copy</button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast">
    <div class="toast-icon">✓</div>
    <span>Copied!</span>
  </div>

  <script>
    function removeBreaks() {
      let text = document.getElementById('text-input').value;
      const breakType = document.querySelector('input[name="break-type"]:checked').value;
      
      if (breakType === 'all') {
        text = text.replace(/[\\r\\n]+/g, ' ').trim();
      } else if (breakType === 'paragraphs') {
        text = text.replace(/[\\r\\n](?![\\r\\n])/g, ' ').replace(/[\\r\\n]{2,}/g, '\\n\\n').trim();
      } else if (breakType === 'space') {
        text = text.replace(/[\\r\\n]+/g, ' ').trim();
      }
      
      document.getElementById('text-output').value = text;
    }

    function copyResult() {
      const output = document.getElementById('text-output');
      output.select();
      document.execCommand('copy');
      showToast();
    }

    function showToast() {
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }

    function clearAll() {
      document.getElementById('text-input').value = '';
      document.getElementById('text-output').value = '';
    }
  </script>
</body>
</html>`
  }
];

// Generate translation templates
function translateContent(content, lang, tool) {
  if (lang === 'en') return content;
  
  let translated = content;
  translated = translated.replace('lang="en"', lang === 'ar' ? 'lang="ar" dir="rtl"' : 'lang="' + lang + '"');
  
  // Update language selector
  const langOptions = {
    ar: '<option value="text-diff.html">English</option><option value="../ar/text-diff.html" selected>العربية</option><option value="../fr/text-diff.html">Français</option><option value="../es/text-diff.html">Español</option><option value="../de/text-diff.html">Deutsch</option>',
    fr: '<option value="text-diff.html">English</option><option value="../ar/text-diff.html">العربية</option><option value="../fr/text-diff.html" selected>Français</option><option value="../es/text-diff.html">Español</option><option value="../de/text-diff.html">Deutsch</option>',
    es: '<option value="text-diff.html">English</option><option value="../ar/text-diff.html">العربية</option><option value="../fr/text-diff.html">Français</option><option value="../es/text-diff.html" selected>Español</option><option value="../de/text-diff.html">Deutsch</option>',
    de: '<option value="text-diff.html">English</option><option value="../ar/text-diff.html">العربية</option><option value="../fr/text-diff.html">Français</option><option value="../es/text-diff.html">Español</option><option value="../de/text-diff.html" selected>Deutsch</option>'
  };
  
  // Simple replacement for language-specific content
  if (lang === 'ar') {
    translated = translated.replace('<link href="https://fonts.googleapis.com/css2?family=DM+Sans', '<link href="https://fonts.googleapis.com/css2?family=Tajawal');
    translated = translated.replace("font-family: 'DM Sans'", "font-family: 'Tajawal'");
    translated = translated.replace('</head>', '<style>body { font-family: \'Tajawal\', sans-serif; }</style></head>');
  }
  
  return translated;
}

// Generate files
for (const tool of tools) {
  for (const lang of languages) {
    const dir = path.join(baseDir, lang);
    const filePath = path.join(dir, `${tool.id}.html`);
    
    let content = tool.enContent;
    
    if (lang !== 'en') {
      content = translateContent(content, lang, tool);
      // Update relative paths
      content = content.replace('href="../assets/', 'href="../../assets/');
      content = content.replace('href="text-diff.html"', 'href="../en/text-diff.html"');
      content = content.replace('href="../ar/', 'href="./');
      content = content.replace('href="../fr/', 'href="./');
      content = content.replace('href="../es/', 'href="./');
      content = content.replace('href="../de/', 'href="./');
    }
    
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
}

console.log('Done!');
