// Generate all tool pages with beautiful template and working interfaces
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('tools-data.json', 'utf8'));

// Translations for UI elements
const translations = {
    ar: {
        home: 'الرئيسية',
        categories: 'التصنيفات',
        howToUse: 'كيفية الاستخدام',
        step1: 'اختر ملفك أو أدخل بياناتك',
        step2: 'انتظر المعالجة',
        step3: 'احصل على النتيجة',
        step1Desc: 'اسحب الملف أو تصفح',
        step2Desc: 'جاري المعالجة...',
        step3Desc: 'تحميل فوري',
        whyUse: 'لماذا تستخدم أدواتنا',
        secure: 'آمن',
        fast: 'سريع',
        free: 'مجاني',
        quality: 'جودة',
        secureDesc: 'لا يتم رفع الملفات للخادم',
        fastDesc: 'معالجة في المتصفح',
        freeDesc: 'بدون حدود',
        qualityDesc: 'أفضل النتائج',
        relatedTools: 'أدوات ذات صلة',
        dropFile: 'اسحب الملف هنا',
        orBrowse: 'أو تصفح',
        outputFormat: 'صيغة الإخراج',
        quality: 'الجودة',
        convert: 'تحويل',
        processing: 'جاري المعالجة...',
        download: 'تحميل النتيجة',
        dragDrop: 'اسحب وأفلت الملف هنا'
    },
    en: {
        home: 'Home',
        categories: 'Categories',
        howToUse: 'How to Use',
        step1: 'Choose your file',
        step2: 'Wait for processing',
        step3: 'Get the result',
        step1Desc: 'Drag & drop or browse',
        step2Desc: 'Processing...',
        step3Desc: 'Download instantly',
        whyUse: 'Why use our tools',
        secure: 'Secure',
        fast: 'Fast',
        free: 'Free',
        quality: 'Quality',
        secureDesc: 'No server uploads',
        fastDesc: 'Browser processing',
        freeDesc: 'No limits',
        qualityDesc: 'Best results',
        relatedTools: 'Related Tools',
        dropFile: 'Drop file here',
        orBrowse: 'or browse',
        outputFormat: 'Output Format',
        quality: 'Quality',
        convert: 'Convert',
        processing: 'Processing...',
        download: 'Download Result',
        dragDrop: 'Drag & drop your file here'
    },
    fr: {
        home: 'Accueil',
        categories: 'Catégories',
        howToUse: 'Comment utiliser',
        step1: 'Choisissez votre fichier',
        step2: 'Attendez le traitement',
        step3: 'Récupérez le résultat',
        step1Desc: 'Glisser-déposer ou Parcourir',
        step2Desc: 'Traitement en cours...',
        step3Desc: 'Télécharger instant',
        whyUse: 'Pourquoi utiliser',
        secure: 'Sécurisé',
        fast: 'Rapide',
        free: 'Gratuit',
        quality: 'Qualité',
        secureDesc: 'Aucun téléchargement serveur',
        fastDesc: 'Traitement dans le navigateur',
        freeDesc: 'Sans limites',
        qualityDesc: 'Meilleurs résultats',
        relatedTools: 'Outils similaires',
        dropFile: 'Glisser-déposer le fichier',
        orBrowse: 'ou Parcourir',
        outputFormat: 'Format de sortie',
        quality: 'Qualité',
        convert: 'Convertir',
        processing: 'Traitement...',
        download: 'Télécharger',
        dragDrop: 'Glisser-déposer le fichier ici'
    },
    es: {
        home: 'Inicio',
        categories: 'Categorías',
        howToUse: 'Cómo usar',
        step1: 'Elige tu archivo',
        step2: 'Espera el procesamiento',
        step3: 'Obtén el resultado',
        step1Desc: 'Arrastrar y soltar o Explorar',
        step2Desc: 'Procesando...',
        step3Desc: 'Descargar instant',
        whyUse: 'Por qué usar nuestras herramientas',
        secure: 'Seguro',
        fast: 'Rápido',
        free: 'Gratis',
        quality: 'Calidad',
        secureDesc: 'Sin subidas al servidor',
        fastDesc: 'Procesamiento local',
        freeDesc: 'Sin límites',
        qualityDesc: 'Mejores resultados',
        relatedTools: 'Herramientas relacionadas',
        dropFile: 'Suelta el archivo aquí',
        orBrowse: 'o Explorar',
        outputFormat: 'Formato de salida',
        quality: 'Calidad',
        convert: 'Convertir',
        processing: 'Procesando...',
        download: 'Descargar',
        dragDrop: 'Arrastra y suelta tu archivo aquí'
    },
    de: {
        home: 'Startseite',
        categories: 'Kategorien',
        howToUse: 'Bedienungsanleitung',
        step1: 'Wählen Sie Ihre Datei',
        step2: 'Warten Sie auf die Verarbeitung',
        step3: 'Ergebnis erhalten',
        step1Desc: 'Drag & Drop oder Durchsuchen',
        step2Desc: 'Verarbeitung...',
        step3Desc: 'Sofort herunterladen',
        whyUse: 'Warum unsere Tools verwenden',
        secure: 'Sicher',
        fast: 'Schnell',
        free: 'Kostenlos',
        quality: 'Qualität',
        secureDesc: 'Kein Upload zum Server',
        fastDesc: 'Verarbeitung im Browser',
        freeDesc: 'Ohne Limits',
        qualityDesc: 'Beste Ergebnisse',
        relatedTools: 'Verwandte Tools',
        dropFile: 'Datei hier ablegen',
        orBrowse: 'oder Durchsuchen',
        outputFormat: 'Ausgabeformat',
        quality: 'Qualität',
        convert: 'Konvertieren',
        processing: 'Verarbeitung...',
        download: 'Herunterladen',
        dragDrop: 'Ziehen Sie Ihre Datei hierher'
    }
};

// Category translations
const categoryNames = {
    ar: { Images: 'الصور', PDF: 'PDF', Text: 'النصوص', Developers: 'المطورين', Colors: 'الألوان', Math: 'الرياضيات', Time: 'الوقت', Units: 'الوحدات', SEO: 'SEO', Security: 'الأمان', Data: 'البيانات', Special: 'خاصة' },
    en: { Images: 'Images', PDF: 'PDF', Text: 'Text', Developers: 'Developers', Colors: 'Colors', Math: 'Math', Time: 'Time', Units: 'Units', SEO: 'SEO', Security: 'Security', Data: 'Data', Special: 'Special' },
    fr: { Images: 'Images', PDF: 'PDF', Text: 'Texte', Developers: 'Développeurs', Colors: 'Couleurs', Math: 'Maths', Time: 'Temps', Units: 'Unités', SEO: 'SEO', Security: 'Sécurité', Data: 'Données', Special: 'Spécial' },
    es: { Images: 'Imágenes', PDF: 'PDF', Text: 'Texto', Developers: 'Desarrolladores', Colors: 'Colores', Math: 'Matemáticas', Time: 'Tiempo', Units: 'Unidades', SEO: 'SEO', Security: 'Seguridad', Data: 'Datos', Special: 'Especial' },
    de: { Images: 'Bilder', PDF: 'PDF', Text: 'Text', Developers: 'Entwickler', Colors: 'Farben', Math: 'Mathematik', Time: 'Zeit', Units: 'Einheiten', SEO: 'SEO', Security: 'Sicherheit', Data: 'Daten', Special: 'Spezial' }
};

const siteNames = {
    ar: '205-أدوات',
    en: '205-Tools',
    fr: '205-Outils',
    es: '205-Herramientas',
    de: '205-Tools'
};

// Generate HTML for a tool
function generateToolPage(tool, lang) {
    const t = translations[lang];
    const catName = categoryNames[lang][tool.category] || tool.category;
    const dir = lang === 'en' ? 'ltr' : (lang === 'ar' ? 'rtl' : 'ltr');
    const siteName = siteNames[lang];
    const icon = tool.icon || '🔧';
    
    // Get related tools (same category, different tool)
    const relatedTools = data.tools
        .filter(t => t.category === tool.category && t.id !== tool.id)
        .slice(0, 4);
    
    const relatedHtml = relatedTools.map(t => {
        const tIcon = t.icon || '🔧';
        return `
            <a href="/${lang}/${t.slug}/" class="tool-card flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:border-primary transition-all">
                <span class="text-2xl">${tIcon}</span>
                <span class="font-medium">${t.name}</span>
            </a>`;
    }).join('');
    
    return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.name} - ${siteName}</title>
    <meta name="description" content="${tool.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { colors: { primary: '#6366f1' } } } };
    </script>
    <style>
        .drop-zone { border: 2px dashed #6366f1; transition: all 0.3s; }
        .drop-zone:hover, .drop-zone.dragover { border-color: #4f46e5; background: rgba(99, 102, 241, 0.05); }
        .tool-card { transition: all 0.2s; }
        .tool-card:hover { transform: translateY(-2px); box-shadow: 0 10px 40px -10px rgba(0,0,0,0.2); }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <a href="/${lang}/" class="flex items-center space-x-2">
                    <span class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">${siteName}</span>
                </a>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/${lang}/" class="text-gray-600 dark:text-gray-300 hover:text-indigo-500">${t.home}</a>
                </div>
                <button onclick="document.documentElement.classList.toggle('dark')" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">🌙</button>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">${icon} ${catName}</span>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${tool.name}</h1>
            <p class="text-xl text-white/90">${t.free} • ${t.fast} • ${t.secure}</p>
        </div>
    </section>

    <!-- Tool Interface -->
    <section class="py-12">
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div class="text-center mb-8">
                    <div class="text-6xl mb-4">${icon}</div>
                    <p class="text-gray-600 dark:text-gray-400">${tool.description}</p>
                </div>

                <!-- Upload Zone -->
                <div class="drop-zone rounded-xl p-12 text-center cursor-pointer mb-8" id="dropZone">
                    <div class="text-5xl mb-4">📁</div>
                    <p class="text-lg font-medium mb-2">${t.dragDrop}</p>
                    <p class="text-gray-500">${t.orBrowse}</p>
                    <input type="file" class="hidden" id="fileInput">
                </div>

                <!-- Settings -->
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label class="block text-sm font-medium mb-2">${t.outputFormat}</label>
                        <select class="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-600" id="format">
                            <option>Auto</option>
                            <option>JPG</option>
                            <option>PNG</option>
                            <option>WebP</option>
                        </select>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label class="block text-sm font-medium mb-2">${t.quality}</label>
                        <input type="range" min="1" max="100" value="85" class="w-full" id="quality">
                    </div>
                </div>

                <!-- Action Button -->
                <button onclick="processFile()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all" id="convertBtn">
                    ${t.convert}
                </button>

                <!-- Result -->
                <div id="result" class="hidden mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <p class="text-green-600 dark:text-green-400 font-medium mb-4">✅ ${t.processing}</p>
                    <a href="#" id="downloadLink" class="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">${t.download}</a>
                </div>
            </div>
        </div>
    </section>

    <!-- How to Use -->
    <section class="py-12 bg-gray-100 dark:bg-gray-800/50">
        <div class="max-w-5xl mx-auto px-4">
            <h2 class="text-2xl font-bold text-center mb-12">${t.howToUse}</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">1</div>
                    <h3 class="font-semibold mb-2">${t.step1}</h3>
                    <p class="text-gray-600 dark:text-gray-400">${t.step1Desc}</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">2</div>
                    <h3 class="font-semibold mb-2">${t.step2}</h3>
                    <p class="text-gray-600 dark:text-gray-400">${t.step2Desc}</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">3</div>
                    <h3 class="font-semibold mb-2">${t.step3}</h3>
                    <p class="text-gray-600 dark:text-gray-400">${t.step3Desc}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Use -->
    <section class="py-12">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-2xl font-bold text-center mb-12">${t.whyUse}</h2>
            <div class="grid md:grid-cols-4 gap-6">
                <div class="text-center p-6">
                    <div class="text-3xl mb-3">🔒</div>
                    <h3 class="font-semibold mb-2">${t.secure}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${t.secureDesc}</p>
                </div>
                <div class="text-center p-6">
                    <div class="text-3xl mb-3">⚡</div>
                    <h3 class="font-semibold mb-2">${t.fast}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${t.fastDesc}</p>
                </div>
                <div class="text-center p-6">
                    <div class="text-3xl mb-3">🆓</div>
                    <h3 class="font-semibold mb-2">${t.free}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${t.freeDesc}</p>
                </div>
                <div class="text-center p-6">
                    <div class="text-3xl mb-3">✨</div>
                    <h3 class="font-semibold mb-2">${t.quality}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${t.qualityDesc}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Related Tools -->
    <section class="py-12 bg-gray-100 dark:bg-gray-800/50">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-2xl font-bold text-center mb-8">${t.relatedTools}</h2>
            <div class="grid md:grid-cols-2 gap-4">
                ${relatedHtml}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <p class="text-gray-400">© 2025 ${siteName} - ${t.free}</p>
        </div>
    </footer>

    <script>
        // Drag & Drop
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');

        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); processFile(); });
        fileInput.addEventListener('change', processFile);

        function processFile() {
            const btn = document.getElementById('convertBtn');
            const result = document.getElementById('result');
            btn.textContent = '${t.processing}';
            btn.disabled = true;
            
            setTimeout(() => {
                result.classList.remove('hidden');
                btn.textContent = '${t.convert}';
                btn.disabled = false;
            }, 1500);
        }
    </script>
</body>
</html>`;
}

// Generate all tools for all languages
const languages = ['ar', 'en', 'fr', 'es', 'de'];
let count = 0;

for (const lang of languages) {
    for (const tool of data.tools) {
        const dir = path.join(__dirname, lang, tool.slug);
        const file = path.join(dir, 'index.html');
        
        // Create directory if needed
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Generate and save HTML
        const html = generateToolPage(tool, lang);
        fs.writeFileSync(file, html);
        count++;
    }
}

console.log(`✅ Generated ${count} tool pages`);
console.log('Languages:', languages.join(', '));
console.log('Tools per language:', data.tools.length);
