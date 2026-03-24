const fs = require('fs');
const path = require('path');

const tools = [
  { lang: 'en', tool: 'canonical-url-generator', title: 'Canonical URL Generator', btn: 'Generate', inputLabel: 'URL', outputLabel: 'Canonical Tag' },
  { lang: 'ar', tool: 'canonical-url-generator', title: 'مولد الرابط الأساسي', btn: 'إنشاء', inputLabel: 'الرابط', outputLabel: 'وسم الأساسي' },
  { lang: 'fr', tool: 'canonical-url-generator', title: 'Générateur URL Canonique', btn: 'Générer', inputLabel: 'URL', outputLabel: 'Tag Canonique' },
];

function createHTML(lang, title, btn, inputLabel, outputLabel) {
  const placeholder = lang === 'ar' ? 'https://example.com/page' : lang === 'fr' ? 'https://exemple.com/page' : 'https://example.com/page';
  const copyText = lang === 'ar' ? 'نسخ' : lang === 'fr' ? 'Copier' : 'Copy';
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 205-Tools<\/title>
    <meta name="description" content="${title}">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { colors: { primary: '#6366f1' } } } };
    <\/script>
<\/head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <a href="/${lang}/" class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">205-Tools<\/a>
                <button onclick="document.documentElement.classList.toggle('dark')" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">🌙<\/button>
            <\/div>
        <\/div>
    <\/header>

    <section class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${title}<\/h1>
            <p class="text-xl text-white\/90">SEO Tool<\/p>
        <\/div>
    <\/section>

    <section class="py-12">
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${inputLabel}<\/label>
                    <input type="url" id="urlInput" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm" placeholder="${placeholder}">
                <\/div>

                <button onclick="generate()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6" id="actionBtn">
                    ${btn}
                <\/button>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${outputLabel}<\/label>
                    <textarea id="result" rows="3" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm bg-gray-50 dark:bg-gray-800" readonly><\/textarea>
                <\/div>

                <button onclick="copyResult()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${copyText}
                <\/button>
            <\/div>
        <\/div>
    <\/section>

    <script>
        function generate() {
            const url = document.getElementById('urlInput').value.trim();
            if (!url) return;
            const tag = <link rel="canonical" href="\${url}" />;
            document.getElementById('result').value = tag;
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

console.log('🔧 Fixing remaining canonical-url-generator tools...\n');

for (const { lang, tool, title, btn, inputLabel, outputLabel } of tools) {
  const filePath = path.join('/root/.openclaw/workspace/demo-site', lang, tool, 'index.html');
  try {
    const html = createHTML(lang, title, btn, inputLabel, outputLabel);
    fs.writeFileSync(filePath, html);
    console.log(`✅ ${lang}/${tool}`);
  } catch (e) {
    console.log(`❌ ${lang}/${tool} - ${e.message}`);
  }
}

console.log('\nDone!');
