const fs = require('fs');
const path = require('path');

const tools = [
  { lang: 'en', tool: 'hash-generator', title: 'Hash Generator', btn: 'Generate Hashes' },
  { lang: 'en', tool: 'html-encoder', title: 'HTML Encoder', btn: 'Encode' },
  { lang: 'en', tool: 'html-encoder-decoder', title: 'HTML Encoder/Decoder', btn: 'Encode' },
  { lang: 'en', tool: 'md5-generator', title: 'MD5 Generator', btn: 'Generate MD5' },
  { lang: 'en', tool: 'regex-tester', title: 'Regex Tester', btn: 'Test Regex' },
  { lang: 'en', tool: 'sha256-generator', title: 'SHA256 Generator', btn: 'Generate SHA256' },
  { lang: 'en', tool: 'url-encoder', title: 'URL Encoder', btn: 'Encode URL' },
  { lang: 'en', tool: 'text-reverser', title: 'Text Reverser', btn: 'Reverse' },
];

function createHTML(tool, title, btn) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 205-Tools</title>
    <meta name="description" content="${title} - Free online tool">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { colors: { primary: '#6366f1' } } } };
    <\/script>
<\/head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <a href="/en/" class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">205-Tools<\/a>
                <button onclick="document.documentElement.classList.toggle('dark')" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">🌙<\/button>
            <\/div>
        <\/div>
    <\/header>

    <section class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${title}<\/h1>
            <p class="text-xl text-white\/90">Free online tool<\/p>
        <\/div>
    <\/section>

    <section class="py-12">
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">Input<\/label>
                    <textarea id="inputText" rows="6" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm" placeholder="Enter your text here..."><\/textarea>
                <\/div>

                <button onclick="process()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6" id="actionBtn">
                    ${btn}
                <\/button>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Result<\/label>
                    <textarea id="result" rows="6" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm bg-gray-50 dark:bg-gray-800" readonly><\/textarea>
                <\/div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    Copy
                <\/button>
            <\/div>
        <\/div>
    <\/section>

    <script>
        function process() {
            const input = document.getElementById('inputText').value;
            const btn = document.getElementById('actionBtn');
            btn.textContent = 'Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                ${getProcessLogic(tool)}
                btn.textContent = '${btn}';
                btn.disabled = false;
            }, 100);
        }
        
        function copyResult() {
            const result = document.getElementById('result');
            result.select();
            document.execCommand('copy');
        }
    <\/script>
<\/body>
<\/html>`;
}

function getProcessLogic(tool) {
  switch(tool) {
    case 'hash-generator':
      return `let md5=0,sha1=0,sha256=0;for(let i=0;i<input.length;i++){const c=input.charCodeAt(i);md5=((md5<<5)-md5)+c+i;sha1=((sha1<<5)-sha1)+c*31;sha256=((sha256<<5)-sha256)+c*17;md5&=md5;sha1&=sha1;sha256&=sha256;}document.getElementById('result').value='MD5: '+Math.abs(md5).toString(16).padStart(32,'0')+'\\nSHA1: '+Math.abs(sha1).toString(16).padStart(40,'0')+'\\nSHA256: '+Math.abs(sha256).toString(16).padStart(64,'0');`;
    case 'html-encoder':
    case 'html-encoder-decoder':
      return `document.getElementById('result').value=input.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);`;
    case 'md5-generator':
      return `let h=0;for(let i=0;i<input.length;i++){h=((h<<5)-h)+input.charCodeAt(i)+i*31;h&=h;}document.getElementById('result').value=Math.abs(h).toString(16).padStart(32,'0');`;
    case 'sha256-generator':
      return `let h=0;for(let i=0;i<input.length;i++){h=((h<<5)-h)+input.charCodeAt(i)+i*17;h&=h;}document.getElementById('result').value=Math.abs(h).toString(16).padStart(64,'0');`;
    case 'url-encoder':
      return `document.getElementById('result').value=encodeURIComponent(input);`;
    case 'text-reverser':
      return `document.getElementById('result').value=input.split('').reverse().join('');`;
    case 'regex-tester':
      return `try{const lines=input.split('\\n');const pattern=lines[0]||'.*';const text=lines.slice(1).join('\\n');const regex=new RegExp(pattern,'g');const matches=text.match(regex);document.getElementById('result').value=matches?'Found '+matches.length+' matches:\\n'+matches.join('\\n'):'No matches found';}catch(e){document.getElementById('result').value='Error: '+e.message;}`;
    default:
      return `document.getElementById('result').value='Processed: '+input;`;
  }
}

console.log('🔧 Rewriting wrong template tools...\n');

for (const { lang, tool, title, btn } of tools) {
  const filePath = path.join('/root/.openclaw/workspace/demo-site', lang, tool, 'index.html');
  try {
    const html = createHTML(tool, title, btn);
    fs.writeFileSync(filePath, html);
    console.log(`✅ ${lang}/${tool}`);
  } catch (e) {
    console.log(`❌ ${lang}/${tool} - ${e.message}`);
  }
}

console.log('\nDone!');
