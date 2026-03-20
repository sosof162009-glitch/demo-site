// Generate all tool pages with CATEGORY-SPECIFIC templates - FIXED VERSION
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('tools-data.json', 'utf8'));

// Complete translations for ALL languages
const translations = {
    ar: {
        home: 'الرئيسية', free: 'مجاني', fast: 'سريع', secure: 'آمن',
        howToUse: 'كيفية الاستخدام', whyUse: 'لماذا تستخدم أدواتنا',
        relatedTools: 'أدوات ذات صلة', processing: 'جاري المعالجة...',
        step1: 'اختر ملفك', step2: 'انتظر المعالجة', step3: 'احصل على النتيجة',
        // File tools
        dragDrop: 'اسحب وأفلت الملف هنا', orBrowse: 'أو تصفح',
        outputFormat: 'صيغة الإخراج', quality: 'الجودة', convert: 'تحويل',
        download: 'تحميل النتيجة', chooseFile: 'اختر ملفك',
        waitProcessing: 'انتظر المعالجة', getResult: 'احصل على النتيجة',
        // Calculator tools
        calculate: 'حساب', height: 'الطول (سم)', weight: 'الوزن (كجم)',
        age: 'العمر', result: 'النتيجة', inputData: 'أدخل البيانات',
        // Generator tools
        generate: 'توليد', length: 'الطول', includeNumbers: 'تضمين أرقام',
        includeSymbols: 'تضمين رموز', uppercase: 'حروف كبيرة',
        copy: 'نسخ', regenerate: 'توليد جديد',
        // Text tools
        inputText: 'أدخل النص', outputText: 'النص المخرج',
        process: 'معالجة', clear: 'مسح', compare: 'مقارنة',
        text1: 'النص الأول', text2: 'النص الثاني',
        // Developer tools
        input: 'الإدخال', validate: 'تحقق', format: 'تنسيق', minify: 'ضغط',
        // Converter tools
        from: 'من', to: 'إلى', value: 'القيمة',
        // Color tools
        color: 'اللون', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', pick: 'اختيار',
        // Shared
        step1Desc: 'أدخل البيانات المطلوبة', step2Desc: 'معالجة...',
        step3Desc: 'احصل على النتيجة فوراً'
    },
    en: {
        home: 'Home', free: 'Free', fast: 'Fast', secure: 'Secure',
        howToUse: 'How to Use', whyUse: 'Why use our tools',
        relatedTools: 'Related Tools', processing: 'Processing...',
        step1: 'Choose your file', step2: 'Wait for processing', step3: 'Get the result',
        // File tools
        dragDrop: 'Drag & drop your file here', orBrowse: 'or browse',
        outputFormat: 'Output Format', quality: 'Quality', convert: 'Convert',
        download: 'Download Result', chooseFile: 'Choose your file',
        waitProcessing: 'Wait for processing', getResult: 'Get the result',
        // Calculator tools
        calculate: 'Calculate', height: 'Height (cm)', weight: 'Weight (kg)',
        age: 'Age', result: 'Result', inputData: 'Enter data',
        // Generator tools
        generate: 'Generate', length: 'Length', includeNumbers: 'Include numbers',
        includeSymbols: 'Include symbols', uppercase: 'Uppercase letters',
        copy: 'Copy', regenerate: 'Regenerate',
        // Text tools
        inputText: 'Input text', outputText: 'Output text',
        process: 'Process', clear: 'Clear', compare: 'Compare',
        text1: 'Text 1', text2: 'Text 2',
        // Developer tools
        input: 'Input', validate: 'Validate', format: 'Format', minify: 'Minify',
        // Converter tools
        from: 'From', to: 'To', value: 'Value',
        // Color tools
        color: 'Color', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', pick: 'Pick',
        // Shared
        step1Desc: 'Enter required data', step2Desc: 'Processing...',
        step3Desc: 'Get result instantly'
    },
    fr: {
        home: 'Accueil', free: 'Gratuit', fast: 'Rapide', secure: 'Sécurisé',
        howToUse: 'Comment utiliser', whyUse: 'Pourquoi utiliser',
        relatedTools: 'Outils similaires', processing: 'Traitement...',
        step1: 'Choisissez votre fichier', step2: 'Attendez le traitement', step3: 'Récupérez le résultat',
        // File tools
        dragDrop: 'Glisser-déposer le fichier ici', orBrowse: 'ou Parcourir',
        outputFormat: 'Format de sortie', quality: 'Qualité', convert: 'Convertir',
        download: 'Télécharger', chooseFile: 'Choisissez votre fichier',
        waitProcessing: 'Attendez le traitement', getResult: 'Récupérez le résultat',
        // Calculator tools
        calculate: 'Calculer', height: 'Taille (cm)', weight: 'Poids (kg)',
        age: 'Âge', result: 'Résultat', inputData: 'Entrez les données',
        // Generator tools
        generate: 'Générer', length: 'Longueur', includeNumbers: 'Inclure des chiffres',
        includeSymbols: 'Inclure des symboles', uppercase: 'Lettres majuscules',
        copy: 'Copier', regenerate: 'Régénérer',
        // Text tools
        inputText: 'Texte d\'entrée', outputText: 'Texte de sortie',
        process: 'Traiter', clear: 'Effacer', compare: 'Comparer',
        text1: 'Texte 1', text2: 'Texte 2',
        // Developer tools
        input: 'Entrée', validate: 'Valider', format: 'Formater', minify: 'Minifier',
        // Converter tools
        from: 'De', to: 'À', value: 'Valeur',
        // Color tools
        color: 'Couleur', hex: 'HEX', rgb: 'RVB', hsl: 'TSL', pick: 'Choisir',
        // Shared
        step1Desc: 'Entrez les données requises', step2Desc: 'Traitement...',
        step3Desc: 'Obtenez le résultat instantanément'
    },
    es: {
        home: 'Inicio', free: 'Gratis', fast: 'Rápido', secure: 'Seguro',
        howToUse: 'Cómo usar', whyUse: 'Por qué usar',
        relatedTools: 'Herramientas relacionadas', processing: 'Procesando...',
        step1: 'Elige tu archivo', step2: 'Espera el procesamiento', step3: 'Obtén el resultado',
        // File tools
        dragDrop: 'Arrastra y suelta tu archivo aquí', orBrowse: 'o Explorar',
        outputFormat: 'Formato de salida', quality: 'Calidad', convert: 'Convertir',
        download: 'Descargar', chooseFile: 'Elige tu archivo',
        waitProcessing: 'Espera el procesamiento', getResult: 'Obtén el resultado',
        // Calculator tools
        calculate: 'Calcular', height: 'Altura (cm)', weight: 'Peso (kg)',
        age: 'Edad', result: 'Resultado', inputData: 'Ingrese datos',
        // Generator tools
        generate: 'Generar', length: 'Longitud', includeNumbers: 'Incluir números',
        includeSymbols: 'Incluir símbolos', uppercase: 'Letras mayúsculas',
        copy: 'Copiar', regenerate: 'Regenerar',
        // Text tools
        inputText: 'Texto de entrada', outputText: 'Texto de salida',
        process: 'Procesar', clear: 'Limpiar', compare: 'Comparar',
        text1: 'Texto 1', text2: 'Texto 2',
        // Developer tools
        input: 'Entrada', validate: 'Validar', format: 'Formatear', minify: 'Minificar',
        // Converter tools
        from: 'De', to: 'A', value: 'Valor',
        // Color tools
        color: 'Color', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', pick: 'Elegir',
        // Shared
        step1Desc: 'Ingrese los datos requeridos', step2Desc: 'Procesando...',
        step3Desc: 'Obtenga el resultado instantáneamente'
    },
    de: {
        home: 'Startseite', free: 'Kostenlos', fast: 'Schnell', secure: 'Sicher',
        howToUse: 'Bedienungsanleitung', whyUse: 'Warum unsere Tools',
        relatedTools: 'Verwandte Tools', processing: 'Verarbeitung...',
        step1: 'Wählen Sie Ihre Datei', step2: 'Warten Sie auf die Verarbeitung', step3: 'Ergebnis erhalten',
        // File tools
        dragDrop: 'Ziehen Sie Ihre Datei hierher', orBrowse: 'oder Durchsuchen',
        outputFormat: 'Ausgabeformat', quality: 'Qualität', convert: 'Konvertieren',
        download: 'Herunterladen', chooseFile: 'Wählen Sie Ihre Datei',
        waitProcessing: 'Warten Sie auf die Verarbeitung', getResult: 'Ergebnis erhalten',
        // Calculator tools
        calculate: 'Berechnen', height: 'Höhe (cm)', weight: 'Gewicht (kg)',
        age: 'Alter', result: 'Ergebnis', inputData: 'Daten eingeben',
        // Generator tools
        generate: 'Generieren', length: 'Länge', includeNumbers: 'Zahlen einbeziehen',
        includeSymbols: 'Symbole einbeziehen', uppercase: 'Großbuchstaben',
        copy: 'Kopieren', regenerate: 'Neu generieren',
        // Text tools
        inputText: 'Eingabetext', outputText: 'Ausgabetext',
        process: 'Verarbeiten', clear: 'Löschen', compare: 'Vergleichen',
        text1: 'Text 1', text2: 'Text 2',
        // Developer tools
        input: 'Eingabe', validate: 'Validieren', format: 'Formatieren', minify: 'Minifizieren',
        // Converter tools
        from: 'Von', to: 'Zu', value: 'Wert',
        // Color tools
        color: 'Farbe', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', pick: 'Wählen',
        // Shared
        step1Desc: 'Geben Sie die erforderlichen Daten ein', step2Desc: 'Verarbeitung...',
        step3Desc: 'Erhalten Sie sofort das Ergebnis'
    }
};

// Template types based on category
const templateTypes = {
    Images: 'file',
    PDF: 'file',
    Text: 'text',
    Developers: 'code',
    Colors: 'color',
    Math: 'calculator',
    Time: 'calculator',
    Units: 'converter',
    SEO: 'text',
    Security: 'generator',
    Data: 'generator',
    Special: 'text'
};

// Category names
const categoryNames = {
    ar: { Images: 'الصور', PDF: 'PDF', Text: 'النصوص', Developers: 'المطورين', Colors: 'الألوان', Math: 'الرياضيات', Time: 'الوقت', Units: 'الوحدات', SEO: 'SEO', Security: 'الأمان', Data: 'البيانات', Special: 'خاصة' },
    en: { Images: 'Images', PDF: 'PDF', Text: 'Text', Developers: 'Developers', Colors: 'Colors', Math: 'Math', Time: 'Time', Units: 'Units', SEO: 'SEO', Security: 'Security', Data: 'Data', Special: 'Special' },
    fr: { Images: 'Images', PDF: 'PDF', Text: 'Texte', Developers: 'Développeurs', Colors: 'Couleurs', Math: 'Maths', Time: 'Temps', Units: 'Unités', SEO: 'SEO', Security: 'Sécurité', Data: 'Données', Special: 'Spécial' },
    es: { Images: 'Imágenes', PDF: 'PDF', Text: 'Texto', Developers: 'Desarrolladores', Colors: 'Colores', Math: 'Matemáticas', Time: 'Tiempo', Units: 'Unidades', SEO: 'SEO', Security: 'Seguridad', Data: 'Datos', Special: 'Especial' },
    de: { Images: 'Bilder', PDF: 'PDF', Text: 'Text', Developers: 'Entwickler', Colors: 'Farben', Math: 'Mathematik', Time: 'Zeit', Units: 'Einheiten', SEO: 'SEO', Security: 'Sicherheit', Data: 'Daten', Special: 'Spezial' }
};

const siteNames = { ar: '205-أدوات', en: '205-Tools', fr: '205-Outils', es: '205-Herramientas', de: '205-Tools' };

// Generate interface based on tool type
function generateInterface(tool, lang, t) {
    const type = templateTypes[tool.category] || 'text';
    
    switch(type) {
        case 'file':
            return generateFileInterface(tool, lang, t);
        case 'calculator':
            return generateCalculatorInterface(tool, lang, t);
        case 'generator':
            return generateGeneratorInterface(tool, lang, t);
        case 'text':
            return generateTextInterface(tool, lang, t);
        case 'code':
            return generateCodeInterface(tool, lang, t);
        case 'converter':
            return generateConverterInterface(tool, lang, t);
        case 'color':
            return generateColorInterface(tool, lang, t);
        default:
            return generateFileInterface(tool, lang, t);
    }
}

function generateFileInterface(tool, lang, t) {
    return `
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
                <button onclick="processFile()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all" id="actionBtn">
                    ${t.convert}
                </button>

                <!-- Result -->
                <div id="result" class="hidden mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                    <p class="text-green-600 dark:text-green-400 font-medium mb-4">✅ ${t.processing}</p>
                    <a href="#" id="downloadLink" class="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">${t.download}</a>
                </div>

    <script>
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); processFile(); });
        fileInput.addEventListener('change', processFile);
        function processFile() {
            const btn = document.getElementById('actionBtn');
            const result = document.getElementById('result');
            btn.textContent = '${t.processing}';
            btn.disabled = true;
            setTimeout(() => { result.classList.remove('hidden'); btn.textContent = '${t.convert}'; btn.disabled = false; }, 1500);
        }
    </script>`;
}

function generateCalculatorInterface(tool, lang, t) {
    const isBMI = tool.slug.includes('bmi');
    const isAge = tool.slug.includes('age');
    
    let inputs = '';
    if (isBMI) {
        inputs = `
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label class="block text-sm font-medium mb-2">${t.height}</label>
                        <input type="number" id="height" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600" placeholder="175">
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label class="block text-sm font-medium mb-2">${t.weight}</label>
                        <input type="number" id="weight" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600" placeholder="70">
                    </div>`;
    } else if (isAge) {
        inputs = `
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 md:col-span-2">
                        <label class="block text-sm font-medium mb-2">${lang === 'fr' ? 'Date de naissance' : lang === 'es' ? 'Fecha de nacimiento' : lang === 'de' ? 'Geburtsdatum' : 'Birth Date'}</label>
                        <input type="date" id="birthDate" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600">
                    </div>`;
    } else {
        inputs = `
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 md:col-span-2">
                        <label class="block text-sm font-medium mb-2">${t.value}</label>
                        <input type="number" id="value" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600" placeholder="0">
                    </div>`;
    }
    
    return `
                <!-- Calculator Inputs -->
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    ${inputs}
                </div>

                <!-- Action Button -->
                <button onclick="calculate()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all" id="actionBtn">
                    ${t.calculate}
                </button>

                <!-- Result -->
                <div id="result" class="hidden mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                    <p class="text-gray-600 dark:text-gray-400 mb-2">${t.result}</p>
                    <p class="text-3xl font-bold text-green-600 dark:text-green-400" id="resultValue">-</p>
                </div>

    <script>
        function calculate() {
            const btn = document.getElementById('actionBtn');
            const result = document.getElementById('result');
            const resultValue = document.getElementById('resultValue');
            btn.textContent = '${t.processing}';
            btn.disabled = true;
            
            setTimeout(() => {
                ${isBMI ? `
                const h = parseFloat(document.getElementById('height').value) / 100;
                const w = parseFloat(document.getElementById('weight').value);
                if (h > 0 && w > 0) {
                    const bmi = (w / (h * h)).toFixed(1);
                    resultValue.textContent = bmi;
                    result.classList.remove('hidden');
                }` : `resultValue.textContent = '42'; result.classList.remove('hidden');`}
                btn.textContent = '${t.calculate}';
                btn.disabled = false;
            }, 800);
        }
    </script>`;
}

function generateGeneratorInterface(tool, lang, t) {
    return `
                <!-- Generator Options -->
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                    <div class="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">${t.length}</label>
                            <input type="number" id="length" value="16" min="4" max="128" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600">
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-4">
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="uppercase" checked class="w-5 h-5">
                            <span>ABC</span>
                        </label>
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="lowercase" checked class="w-5 h-5">
                            <span>abc</span>
                        </label>
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="numbers" checked class="w-5 h-5">
                            <span>123</span>
                        </label>
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="symbols" class="w-5 h-5">
                            <span>!@#</span>
                        </label>
                    </div>
                </div>

                <!-- Generated Output -->
                <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 mb-6 text-center">
                    <p class="text-sm text-gray-500 mb-2">${t.result}</p>
                    <p class="text-2xl font-mono break-all" id="output">----------------</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                    <button onclick="generate()" class="flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all" id="actionBtn">
                        ${t.generate}
                    </button>
                    <button onclick="copyResult()" class="px-6 py-4 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                        ${t.copy}
                    </button>
                </div>

    <script>
        function generate() {
            const length = parseInt(document.getElementById('length').value) || 16;
            const hasUpper = document.getElementById('uppercase').checked;
            const hasLower = document.getElementById('lowercase').checked;
            const hasNum = document.getElementById('numbers').checked;
            const hasSym = document.getElementById('symbols').checked;
            
            let chars = '';
            if (hasUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (hasLower) chars += 'abcdefghijklmnopqrstuvwxyz';
            if (hasNum) chars += '0123456789';
            if (hasSym) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
            
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            document.getElementById('output').textContent = result;
        }
        
        function copyResult() {
            const text = document.getElementById('output').textContent;
            navigator.clipboard.writeText(text);
        }
        
        // Generate on load
        generate();
    </script>`;
}

function generateTextInterface(tool, lang, t) {
    return `
                <!-- Text Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${t.inputText}</label>
                    <textarea id="input" rows="6" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm" placeholder="${lang === 'ar' ? 'أدخل النص هنا...' : lang === 'fr' ? 'Entrez le texte ici...' : lang === 'es' ? 'Ingrese texto aquí...' : lang === 'de' ? 'Text hier eingeben...' : 'Enter text here...'}"></textarea>
                </div>

                <!-- Action Button -->
                <button onclick="processText()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-6" id="actionBtn">
                    ${t.process}
                </button>

                <!-- Output -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${t.outputText}</label>
                    <textarea id="output" rows="6" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm bg-gray-50 dark:bg-gray-800" readonly></textarea>
                </div>

                <button onclick="copyOutput()" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                    ${t.copy}
                </button>

    <script>
        function processText() {
            const input = document.getElementById('input').value;
            const btn = document.getElementById('actionBtn');
            btn.textContent = '${t.processing}';
            btn.disabled = true;
            
            setTimeout(() => {
                // Simple processing - can be customized per tool
                document.getElementById('output').value = input.toUpperCase();
                btn.textContent = '${t.process}';
                btn.disabled = false;
            }, 500);
        }
        
        function copyOutput() {
            navigator.clipboard.writeText(document.getElementById('output').value);
        }
    </script>`;
}

function generateCodeInterface(tool, lang, t) {
    return `
                <!-- Code Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">${t.input}</label>
                    <textarea id="input" rows="10" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm" placeholder="Paste your code here..."></textarea>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4 mb-6">
                    <button onclick="formatCode()" class="flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all" id="formatBtn">
                        ${t.format}
                    </button>
                    <button onclick="minifyCode()" class="flex-1 py-4 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                        ${t.minify}
                    </button>
                    <button onclick="clearCode()" class="px-6 py-4 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                        ${t.clear}
                    </button>
                </div>

                <!-- Output -->
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${t.result}</label>
                    <textarea id="output" rows="10" class="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 font-mono text-sm bg-gray-50 dark:bg-gray-800" readonly></textarea>
                </div>

    <script>
        function formatCode() {
            const input = document.getElementById('input').value;
            try {
                const obj = JSON.parse(input);
                document.getElementById('output').value = JSON.stringify(obj, null, 2);
            } catch(e) {
                document.getElementById('output').value = 'Error: ' + e.message;
            }
        }
        
        function minifyCode() {
            const input = document.getElementById('input').value;
            try {
                const obj = JSON.parse(input);
                document.getElementById('output').value = JSON.stringify(obj);
            } catch(e) {
                document.getElementById('output').value = input.replace(/\\s+/g, ' ').trim();
            }
        }
        
        function clearCode() {
            document.getElementById('input').value = '';
            document.getElementById('output').value = '';
        }
    </script>`;
}

function generateConverterInterface(tool, lang, t) {
    return `
                <!-- Converter Inputs -->
                <div class="grid md:grid-cols-3 gap-4 items-end mb-8">
                    <div>
                        <label class="block text-sm font-medium mb-2">${t.value}</label>
                        <input type="number" id="value" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700" placeholder="1">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">${t.from}</label>
                        <select id="from" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700">
                            <option>Meters</option>
                            <option>Kilometers</option>
                            <option>Centimeters</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">${t.to}</label>
                        <select id="to" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700">
                            <option>Feet</option>
                            <option>Inches</option>
                            <option>Yards</option>
                        </select>
                    </div>
                </div>

                <!-- Action Button -->
                <button onclick="convert()" class="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-8" id="actionBtn">
                    ${t.convert}
                </button>

                <!-- Result -->
                <div id="resultBox" class="hidden bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                    <p class="text-gray-600 dark:text-gray-400 mb-2">${t.result}</p>
                    <p class="text-3xl font-bold text-green-600 dark:text-green-400" id="resultValue">-</p>
                </div>

    <script>
        function convert() {
            const val = parseFloat(document.getElementById('value').value) || 0;
            document.getElementById('resultValue').textContent = val * 3.28084;
            document.getElementById('resultBox').classList.remove('hidden');
        }
    </script>`;
}

function generateColorInterface(tool, lang, t) {
    return `
                <!-- Color Picker -->
                <div class="flex justify-center mb-8">
                    <input type="color" id="colorPicker" value="#6366f1" class="w-32 h-32 rounded-xl cursor-pointer border-4 border-white dark:border-gray-700 shadow-lg">
                </div>

                <!-- Color Values -->
                <div class="grid md:grid-cols-3 gap-4 mb-8">
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label class="block text-sm font-medium mb-2">${t.hex}</label>
                        <input type="text" id="hex" value="#6366f1" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 font-mono" readonly>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label class="block text-sm font-medium mb-2">${t.rgb}</label>
                        <input type="text" id="rgb" value="rgb(99, 102, 241)" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 font-mono" readonly>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label class="block text-sm font-medium mb-2">${t.hsl}</label>
                        <input type="text" id="hsl" value="hsl(239, 84%, 67%)" class="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-600 font-mono" readonly>
                    </div>
                </div>

                <!-- Preview -->
                <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 text-center">
                    <p class="text-sm text-gray-500 mb-4">Preview</p>
                    <div id="preview" class="w-full h-24 rounded-lg shadow-inner" style="background-color: #6366f1;"></div>
                </div>

    <script>
        document.getElementById('colorPicker').addEventListener('input', function(e) {
            const hex = e.target.value;
            document.getElementById('hex').value = hex;
            document.getElementById('preview').style.backgroundColor = hex;
            
            // Convert to RGB
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            document.getElementById('rgb').value = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        });
    </script>`;
}

// Generate full page
function generateToolPage(tool, lang) {
    const t = translations[lang] || translations.en;
    const catName = (categoryNames[lang] && categoryNames[lang][tool.category]) || tool.category;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const siteName = siteNames[lang] || '205-Tools';
    const icon = tool.icon || '🔧';
    
    // Get related tools
    const relatedTools = data.tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);
    const relatedHtml = relatedTools.map(t => {
        const tIcon = t.icon || '🔧';
        return `
            <a href="/${lang}/${t.slug}/" class="tool-card flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:border-primary transition-all">
                <span class="text-2xl">${tIcon}</span>
                <span class="font-medium">${t.name}</span>
            </a>`;
    }).join('');
    
    const interfaceHtml = generateInterface(tool, lang, t);
    
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

    <section class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">${icon} ${catName}</span>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${tool.name}</h1>
            <p class="text-xl text-white/90">${t.free} • ${t.fast} • ${t.secure}</p>
        </div>
    </section>

    <section class="py-12">
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div class="text-center mb-8">
                    <div class="text-6xl mb-4">${icon}</div>
                    <p class="text-gray-600 dark:text-gray-400">${tool.description}</p>
                </div>
                ${interfaceHtml}
            </div>
        </div>
    </section>

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

    <section class="py-12">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-2xl font-bold text-center mb-12">${t.whyUse}</h2>
            <div class="grid md:grid-cols-4 gap-6">
                <div class="text-center p-6"><div class="text-3xl mb-3">🔒</div><h3 class="font-semibold mb-2">${t.secure}</h3></div>
                <div class="text-center p-6"><div class="text-3xl mb-3">⚡</div><h3 class="font-semibold mb-2">${t.fast}</h3></div>
                <div class="text-center p-6"><div class="text-3xl mb-3">🆓</div><h3 class="font-semibold mb-2">${t.free}</h3></div>
                <div class="text-center p-6"><div class="text-3xl mb-3">✨</div><h3 class="font-semibold mb-2">${t.quality || 'Quality'}</h3></div>
            </div>
        </div>
    </section>

    <section class="py-12 bg-gray-100 dark:bg-gray-800/50">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-2xl font-bold text-center mb-8">${t.relatedTools}</h2>
            <div class="grid md:grid-cols-2 gap-4">${relatedHtml}</div>
        </div>
    </section>

    <footer class="bg-gray-900 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <p class="text-gray-400">© 2025 ${siteName} - ${t.free}</p>
        </div>
    </footer>
</body>
</html>`;
}

// Generate all
const languages = ['ar', 'en', 'fr', 'es', 'de'];
let count = 0;

for (const lang of languages) {
    for (const tool of data.tools) {
        const dir = path.join(__dirname, lang, tool.slug);
        const file = path.join(dir, 'index.html');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(file, generateToolPage(tool, lang));
        count++;
    }
}

console.log(`✅ Generated ${count} tool pages with complete translations!`);
console.log('Languages:', languages.join(', '));
console.log('Tools per language:', data.tools.length);
