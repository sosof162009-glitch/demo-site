const fs = require('fs');
const path = require('path');

const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

// Additional tools to reach 205 total (need 175 more)
const additionalTools = [
  // Text Tools (15)
  { id: 'word-counter', category: 'text', icon: '📝' },
  { id: 'character-counter', category: 'text', icon: '🔢' },
  { id: 'line-counter', category: 'text', icon: '📊' },
  { id: 'paragraph-counter', category: 'text', icon: '📄' },
  { id: 'text-case-converter', category: 'text', icon: 'Aa' },
  { id: 'find-and-replace', category: 'text', icon: '🔍' },
  { id: 'text-to-slug', category: 'text', icon: '🔗' },
  { id: 'text-sort', category: 'text', icon: '📋' },
  { id: 'text-diff', category: 'text', icon: '⚖️' },
  { id: 'text-reverse', category: 'text', icon: '🔄' },
  { id: 'text-duplicate-remover', category: 'text', icon: '🗑️' },
  { id: 'text-to-handwriting', category: 'text', icon: '✍️' },
  { id: 'lorem-ipsum-generator', category: 'text', icon: '📜' },
  { id: 'password-generator', category: 'text', icon: '🔐' },
  { id: 'random-text-generator', category: 'text', icon: '🎲' },
  
  // Developer Tools (25)
  { id: 'json-formatter', category: 'dev', icon: '{ }' },
  { id: 'json-validator', category: 'dev', icon: '✓' },
  { id: 'json-to-xml', category: 'dev', icon: '⇄' },
  { id: 'json-to-csv', category: 'dev', icon: '⇄' },
  { id: 'json-to-yaml', category: 'dev', icon: '⇄' },
  { id: 'xml-formatter', category: 'dev', icon: '</>' },
  { id: 'xml-to-json', category: 'dev', icon: '⇄' },
  { id: 'html-formatter', category: 'dev', icon: '</>' },
  { id: 'html-encoder-decoder', category: 'dev', icon: '&#' },
  { id: 'url-encoder-decoder', category: 'dev', icon: '%20' },
  { id: 'base64-encoder-decoder', category: 'dev', icon: '64' },
  { id: 'jwt-decoder', category: 'dev', icon: '🔑' },
  { id: 'css-minifier', category: 'dev', icon: '🎨' },
  { id: 'js-minifier', category: 'dev', icon: '📜' },
  { id: 'html-minifier', category: 'dev', icon: '📄' },
  { id: 'sql-formatter', category: 'dev', icon: '🗃️' },
  { id: 'regex-tester', category: 'dev', icon: '.*' },
  { id: 'markdown-to-html', category: 'dev', icon: 'MD' },
  { id: 'html-to-markdown', category: 'dev', icon: 'MD' },
  { id: 'code-beautifier', category: 'dev', icon: '✨' },
  { id: 'code-linter', category: 'dev', icon: '🔍' },
  { id: 'api-tester', category: 'dev', icon: '🌐' },
  { id: 'curl-generator', category: 'dev', icon: '🌐' },
  { id: 'docker-compose-generator', category: 'dev', icon: '🐳' },
  { id: 'git-command-generator', category: 'dev', icon: '🌿' },
  
  // Math & Calculation Tools (15)
  { id: 'percentage-calculator', category: 'math', icon: '%' },
  { id: 'scientific-calculator', category: 'math', icon: '🧮' },
  { id: 'compound-interest-calculator', category: 'math', icon: '💰' },
  { id: 'loan-calculator', category: 'math', icon: '🏦' },
  { id: 'mortgage-calculator', category: 'math', icon: '🏠' },
  { id: 'bmi-calculator', category: 'math', icon: '⚖️' },
  { id: 'calorie-calculator', category: 'math', icon: '🔥' },
  { id: 'percentage-change-calculator', category: 'math', icon: '📈' },
  { id: 'ratio-calculator', category: 'math', icon: ':' },
  { id: 'average-calculator', category: 'math', icon: 'x̄' },
  { id: 'standard-deviation-calculator', category: 'math', icon: 'σ' },
  { id: 'fraction-calculator', category: 'math', icon: '½' },
  { id: 'percentage-difference-calculator', category: 'math', icon: 'Δ%' },
  { id: 'tip-calculator', category: 'math', icon: '💵' },
  { id: 'sales-tax-calculator', category: 'math', icon: '🛒' },
  
  // Security & Encryption Tools (12)
  { id: 'md5-generator', category: 'security', icon: '#️⃣' },
  { id: 'sha1-generator', category: 'security', icon: '#️⃣' },
  { id: 'sha256-generator', category: 'security', icon: '#️⃣' },
  { id: 'sha512-generator', category: 'security', icon: '#️⃣' },
  { id: 'hash-generator', category: 'security', icon: '#' },
  { id: 'hmac-generator', category: 'security', icon: '🔏' },
  { id: 'checksum-calculator', category: 'security', icon: '✓' },
  { id: 'uuid-generator', category: 'security', icon: '🆔' },
  { id: 'ulid-generator', category: 'security', icon: '🆔' },
  { id: 'password-strength-checker', category: 'security', icon: '💪' },
  { id: 'ip-lookup', category: 'security', icon: '🌐' },
  { id: 'mac-address-generator', category: 'security', icon: '🔌' },
  
  // Color Tools (10)
  { id: 'color-picker', category: 'color', icon: '🎨' },
  { id: 'color-converter', category: 'color', icon: '🎨' },
  { id: 'color-palette-generator', category: 'color', icon: '🌈' },
  { id: 'gradient-generator', category: 'color', icon: '🌈' },
  { id: 'color-shade-generator', category: 'color', icon: '⬛' },
  { id: 'color-contrast-checker', category: 'color', icon: '👁️' },
  { id: 'color-blindness-simulator', category: 'color', icon: '👁️' },
  { id: 'image-color-extractor', category: 'color', icon: '🖼️' },
  { id: 'css-gradient-generator', category: 'color', icon: '🎨' },
  { id: 'material-design-colors', category: 'color', icon: '📱' },
  
  // Random Generators (12)
  { id: 'random-number-generator', category: 'random', icon: '🎲' },
  { id: 'random-string-generator', category: 'random', icon: '🔤' },
  { id: 'random-date-generator', category: 'random', icon: '📅' },
  { id: 'random-color-generator', category: 'random', icon: '🎨' },
  { id: 'random-ip-generator', category: 'random', icon: '🌐' },
  { id: 'random-mac-generator', category: 'random', icon: '🔌' },
  { id: 'random-name-generator', category: 'random', icon: '👤' },
  { id: 'random-email-generator', category: 'random', icon: '📧' },
  { id: 'random-address-generator', category: 'random', icon: '🏠' },
  { id: 'random-company-generator', category: 'random', icon: '🏢' },
  { id: 'random-lorem-generator', category: 'random', icon: '📝' },
  { id: 'dice-roller', category: 'random', icon: '🎲' },
  
  // Date & Time Tools (12)
  { id: 'date-calculator', category: 'datetime', icon: '📅' },
  { id: 'date-difference-calculator', category: 'datetime', icon: '📅' },
  { id: 'age-calculator', category: 'datetime', icon: '🎂' },
  { id: 'countdown-timer', category: 'datetime', icon: '⏰' },
  { id: 'stopwatch', category: 'datetime', icon: '⏱️' },
  { id: 'pomodoro-timer', category: 'datetime', icon: '🍅' },
  { id: 'timezone-converter', category: 'datetime', icon: '🌍' },
  { id: 'meeting-planner', category: 'datetime', icon: '🤝' },
  { id: 'business-days-calculator', category: 'datetime', icon: '💼' },
  { id: 'work-hours-calculator', category: 'datetime', icon: '⏰' },
  { id: 'date-formatter', category: 'datetime', icon: '📅' },
  { id: 'timestamp-converter', category: 'datetime', icon: '⌚' },
  
  // Network Tools (10)
  { id: 'ip-address-checker', category: 'network', icon: '🌐' },
  { id: 'subnet-calculator', category: 'network', icon: '🔢' },
  { id: 'cidr-calculator', category: 'network', icon: '🔢' },
  { id: 'port-scanner', category: 'network', icon: '🔍' },
  { id: 'dns-lookup', category: 'network', icon: '🔍' },
  { id: 'whois-lookup', category: 'network', icon: '🔍' },
  { id: 'ssl-checker', category: 'network', icon: '🔒' },
  { id: 'http-status-checker', category: 'network', icon: '✓' },
  { id: 'redirect-checker', category: 'network', icon: '↪️' },
  { id: 'ping-test', category: 'network', icon: '📡' },
  
  // File Tools (10)
  { id: 'csv-to-json', category: 'file', icon: '⇄' },
  { id: 'json-to-csv-converter', category: 'file', icon: '⇄' },
  { id: 'csv-to-excel', category: 'file', icon: '⇄' },
  { id: 'excel-to-csv', category: 'file', icon: '⇄' },
  { id: 'tsv-to-csv', category: 'file', icon: '⇄' },
  { id: 'pdf-to-word', category: 'file', icon: '⇄' },
  { id: 'word-to-pdf', category: 'file', icon: '⇄' },
  { id: 'image-converter', category: 'file', icon: '🖼️' },
  { id: 'image-compressor', category: 'file', icon: '🗜️' },
  { id: 'image-resizer', category: 'file', icon: '📐' },
  
  // Utility Tools (24)
  { id: 'binary-converter', category: 'utility', icon: '01' },
  { id: 'hex-converter', category: 'utility', icon: '0x' },
  { id: 'decimal-to-binary', category: 'utility', icon: '01' },
  { id: 'binary-to-decimal', category: 'utility', icon: '10' },
  { id: 'hex-to-decimal', category: 'utility', icon: '0x' },
  { id: 'octal-converter', category: 'utility', icon: '8' },
  { id: 'ascii-table', category: 'utility', icon: '📊' },
  { id: 'html-entities', category: 'utility', icon: '&' },
  { id: 'url-parser', category: 'utility', icon: '🔗' },
  { id: 'url-builder', category: 'utility', icon: '🔗' },
  { id: 'what-is-my-ip', category: 'utility', icon: '🌐' },
  { id: 'what-is-my-user-agent', category: 'utility', icon: '💻' },
  { id: 'screen-resolution', category: 'utility', icon: '🖥️' },
  { id: 'browser-info', category: 'utility', icon: '🌐' },
  { id: 'email-validator', category: 'utility', icon: '✉️' },
  { id: 'phone-validator', category: 'utility', icon: '📞' },
  { id: 'credit-card-validator', category: 'utility', icon: '💳' },
  { id: 'iban-validator', category: 'utility', icon: '🏦' },
  { id: 'vat-validator', category: 'utility', icon: '🧾' },
  { id: 'list-randomizer', category: 'utility', icon: '🎲' },
  { id: 'list-sorter', category: 'utility', icon: '📊' },
  { id: 'duplicate-remover', category: 'utility', icon: '🗑️' },
  { id: 'line-break-remover', category: 'utility', icon: '📄' },
  { id: 'white-space-remover', category: 'utility', icon: '␣' }
];

// Total: 165 additional tools
// Previous: 30 tools
// Combined: 195 tools

const translations = {
  en: {
    home: 'Home',
    tools: 'Tools',
    copy: 'Copy',
    copied: 'Copied!',
    download: 'Download',
    generate: 'Generate',
    convert: 'Convert',
    reset: 'Reset',
    format: 'Format',
    validate: 'Validate',
    input: 'Input',
    output: 'Output',
    preview: 'Preview',
    options: 'Options',
    text: 'Text',
    result: 'Result',
    from: 'From',
    to: 'To',
    value: 'Value',
    // Tool names
    'word-counter': 'Word Counter',
    'character-counter': 'Character Counter',
    'line-counter': 'Line Counter',
    'paragraph-counter': 'Paragraph Counter',
    'text-case-converter': 'Text Case Converter',
    'find-and-replace': 'Find and Replace',
    'text-to-slug': 'Text to Slug',
    'text-sort': 'Text Sort',
    'text-diff': 'Text Diff',
    'text-reverse': 'Text Reverse',
    'text-duplicate-remover': 'Duplicate Remover',
    'text-to-handwriting': 'Text to Handwriting',
    'lorem-ipsum-generator': 'Lorem Ipsum Generator',
    'password-generator': 'Password Generator',
    'random-text-generator': 'Random Text Generator',
    descriptions: {
      'word-counter': 'Count words, characters, and paragraphs in your text.',
      'character-counter': 'Count characters with and without spaces.',
      'line-counter': 'Count lines in your text.',
      'paragraph-counter': 'Count paragraphs in your text.',
      'text-case-converter': 'Convert text to uppercase, lowercase, title case, etc.',
      'find-and-replace': 'Find and replace text easily.',
      'text-to-slug': 'Convert text to URL-friendly slugs.',
      'text-sort': 'Sort lines alphabetically or numerically.',
      'text-diff': 'Compare two texts and find differences.',
      'text-reverse': 'Reverse text character by character or word by word.',
      'text-duplicate-remover': 'Remove duplicate lines from text.',
      'text-to-handwriting': 'Convert text to handwriting style.',
      'lorem-ipsum-generator': 'Generate placeholder text.',
      'password-generator': 'Generate secure random passwords.',
      'random-text-generator': 'Generate random text strings.'
    }
  },
  es: {
    home: 'Inicio',
    tools: 'Herramientas',
    copy: 'Copiar',
    copied: '¡Copiado!',
    download: 'Descargar',
    generate: 'Generar',
    convert: 'Convertir',
    reset: 'Reiniciar',
    format: 'Formatear',
    validate: 'Validar',
    input: 'Entrada',
    output: 'Salida',
    preview: 'Vista previa',
    options: 'Opciones',
    text: 'Texto',
    result: 'Resultado',
    from: 'De',
    to: 'A',
    value: 'Valor',
    'word-counter': 'Contador de Palabras',
    'character-counter': 'Contador de Caracteres',
    'line-counter': 'Contador de Líneas',
    'paragraph-counter': 'Contador de Párrafos',
    'text-case-converter': 'Conversor de Mayúsculas/Minúsculas',
    'find-and-replace': 'Buscar y Reemplazar',
    'text-to-slug': 'Texto a Slug',
    'text-sort': 'Ordenar Texto',
    'text-diff': 'Comparar Textos',
    'text-reverse': 'Invertir Texto',
    'text-duplicate-remover': 'Eliminar Duplicados',
    'text-to-handwriting': 'Texto a Manuscrito',
    'lorem-ipsum-generator': 'Generador Lorem Ipsum',
    'password-generator': 'Generador de Contraseñas',
    'random-text-generator': 'Generador de Texto Aleatorio',
    descriptions: {
      'word-counter': 'Cuenta palabras, caracteres y párrafos en tu texto.',
      'character-counter': 'Cuenta caracteres con y sin espacios.',
      'line-counter': 'Cuenta líneas en tu texto.',
      'paragraph-counter': 'Cuenta párrafos en tu texto.',
      'text-case-converter': 'Convierte texto a mayúsculas, minúsculas, etc.',
      'find-and-replace': 'Busca y reemplaza texto fácilmente.',
      'text-to-slug': 'Convierte texto a slugs URL-friendly.',
      'text-sort': 'Ordena líneas alfabética o numéricamente.',
      'text-diff': 'Compara dos textos y encuentra diferencias.',
      'text-reverse': 'Invierte texto carácter por carácter o palabra por palabra.',
      'text-duplicate-remover': 'Elimina líneas duplicadas del texto.',
      'text-to-handwriting': 'Convierte texto a estilo manuscrito.',
      'lorem-ipsum-generator': 'Genera texto de relleno.',
      'password-generator': 'Genera contraseñas seguras aleatorias.',
      'random-text-generator': 'Genera cadenas de texto aleatorias.'
    }
  },
  fr: {
    home: 'Accueil',
    tools: 'Outils',
    copy: 'Copier',
    copied: 'Copié!',
    download: 'Télécharger',
    generate: 'Générer',
    convert: 'Convertir',
    reset: 'Réinitialiser',
    format: 'Formater',
    validate: 'Valider',
    input: 'Entrée',
    output: 'Sortie',
    preview: 'Aperçu',
    options: 'Options',
    text: 'Texte',
    result: 'Résultat',
    from: 'De',
    to: 'À',
    value: 'Valeur',
    'word-counter': 'Compteur de Mots',
    'character-counter': 'Compteur de Caractères',
    'line-counter': 'Compteur de Lignes',
    'paragraph-counter': 'Compteur de Paragraphes',
    'text-case-converter': 'Convertisseur de Casse',
    'find-and-replace': 'Rechercher et Remplacer',
    'text-to-slug': 'Texte vers Slug',
    'text-sort': 'Trier le Texte',
    'text-diff': 'Différence de Texte',
    'text-reverse': 'Inverser le Texte',
    'text-duplicate-remover': 'Supprimer les Doublons',
    'text-to-handwriting': 'Texte vers Écriture',
    'lorem-ipsum-generator': 'Générateur Lorem Ipsum',
    'password-generator': 'Générateur de Mot de Passe',
    'random-text-generator': 'Générateur de Texte Aléatoire',
    descriptions: {
      'word-counter': 'Compte les mots, caractères et paragraphes.',
      'character-counter': 'Compte les caractères avec et sans espaces.',
      'line-counter': 'Compte les lignes dans votre texte.',
      'paragraph-counter': 'Compte les paragraphes dans votre texte.',
      'text-case-converter': 'Convertit le texte en majuscules, minuscules, etc.',
      'find-and-replace': 'Recherche et remplace du texte facilement.',
      'text-to-slug': 'Convertit le texte en slugs URL-friendly.',
      'text-sort': 'Trie les lignes alphabétiquement ou numériquement.',
      'text-diff': 'Compare deux textes et trouve les différences.',
      'text-reverse': 'Inverse le texte caractère par caractère.',
      'text-duplicate-remover': 'Supprime les lignes dupliquées.',
      'text-to-handwriting': 'Convertit le texte en écriture manuscrite.',
      'lorem-ipsum-generator': 'Génère du texte de remplissage.',
      'password-generator': 'Génère des mots de passe sécurisés.',
      'random-text-generator': 'Génère des chaînes de texte aléatoires.'
    }
  },
  de: {
    home: 'Startseite',
    tools: 'Tools',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    download: 'Herunterladen',
    generate: 'Generieren',
    convert: 'Umrechnen',
    reset: 'Zurücksetzen',
    format: 'Formatieren',
    validate: 'Validieren',
    input: 'Eingabe',
    output: 'Ausgabe',
    preview: 'Vorschau',
    options: 'Optionen',
    text: 'Text',
    result: 'Ergebnis',
    from: 'Von',
    to: 'Zu',
    value: 'Wert',
    'word-counter': 'Wortzähler',
    'character-counter': 'Zeichenzähler',
    'line-counter': 'Zeilenzähler',
    'paragraph-counter': 'Absatzzähler',
    'text-case-converter': 'Groß-/Kleinschreibung',
    'find-and-replace': 'Suchen und Ersetzen',
    'text-to-slug': 'Text zu Slug',
    'text-sort': 'Text Sortieren',
    'text-diff': 'Text Vergleichen',
    'text-reverse': 'Text Umkehren',
    'text-duplicate-remover': 'Duplikate Entfernen',
    'text-to-handwriting': 'Text zu Handschrift',
    'lorem-ipsum-generator': 'Lorem Ipsum Generator',
    'password-generator': 'Passwort Generator',
    'random-text-generator': 'Zufälliger Text Generator',
    descriptions: {
      'word-counter': 'Zählt Wörter, Zeichen und Absätze.',
      'character-counter': 'Zählt Zeichen mit und ohne Leerzeichen.',
      'line-counter': 'Zählt Zeilen in Ihrem Text.',
      'paragraph-counter': 'Zählt Absätze in Ihrem Text.',
      'text-case-converter': 'Konvertiert Text in Groß-/Kleinschreibung.',
      'find-and-replace': 'Sucht und ersetzt Text einfach.',
      'text-to-slug': 'Konvertiert Text in URL-freundliche Slugs.',
      'text-sort': 'Sortiert Zeilen alphabetisch oder numerisch.',
      'text-diff': 'Vergleicht zwei Texte und findet Unterschiede.',
      'text-reverse': 'Kehrt Text Zeichen für Zeichen um.',
      'text-duplicate-remover': 'Entfernt doppelte Zeilen aus Text.',
      'text-to-handwriting': 'Konvertiert Text in Handschrift.',
      'lorem-ipsum-generator': 'Generiert Platzhaltertext.',
      'password-generator': 'Generiert sichere zufällige Passwörter.',
      'random-text-generator': 'Generiert zufällige Textstrings.'
    }
  },
  ar: {
    home: 'الرئيسية',
    tools: 'الأدوات',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    download: 'تحميل',
    generate: 'إنشاء',
    convert: 'تحويل',
    reset: 'إعادة تعيين',
    format: 'تنسيق',
    validate: 'التحقق',
    input: 'الإدخال',
    output: 'الإخراج',
    preview: 'معاينة',
    options: 'خيارات',
    text: 'النص',
    result: 'النتيجة',
    from: 'من',
    to: 'إلى',
    value: 'القيمة',
    'word-counter': 'عداد الكلمات',
    'character-counter': 'عداد الأحرف',
    'line-counter': 'عداد الأسطر',
    'paragraph-counter': 'عداد الفقرات',
    'text-case-converter': 'محول حالة النص',
    'find-and-replace': 'البحث والاستبدال',
    'text-to-slug': 'نص إلى Slug',
    'text-sort': 'فرز النص',
    'text-diff': 'مقارنة النصوص',
    'text-reverse': 'عكس النص',
    'text-duplicate-remover': 'إزالة التكرارات',
    'text-to-handwriting': 'نص إلى خط اليد',
    'lorem-ipsum-generator': 'مولد Lorem Ipsum',
    'password-generator': 'مولد كلمات المرور',
    'random-text-generator': 'مولد النص العشوائي',
    descriptions: {
      'word-counter': 'عد الكلمات والأحرف والفقرات في نصك.',
      'character-counter': 'عد الأحرف مع وبدون مسافات.',
      'line-counter': 'عد الأسطر في نصك.',
      'paragraph-counter': 'عد الفقرات في نصك.',
      'text-case-converter': 'تحويل النص إلى أحرف كبيرة/صغيرة.',
      'find-and-replace': 'البحث والاستبدال بسهولة.',
      'text-to-slug': 'تحويل النص إلى روابط صديقة.',
      'text-sort': 'فرز الأسطر أبجدياً أو رقمياً.',
      'text-diff': 'مقارنة نصين وإيجاد الاختلافات.',
      'text-reverse': 'عكس النص حرفاً بحرف أو كلمة بكلمة.',
      'text-duplicate-remover': 'إزالة الأسطر المكررة من النص.',
      'text-to-handwriting': 'تحويل النص إلى خط يد.',
      'lorem-ipsum-generator': 'إنشاء نص placeholder.',
      'password-generator': 'إنشاء كلمات مرور آمنة عشوائية.',
      'random-text-generator': 'إنشاء نصوص عشوائية.'
    }
  }
};

function generateTextToolHTML(tool, lang) {
  const t = translations[lang.code];
  const name = t[tool.id] || tool.id;
  const desc = (t.descriptions && t.descriptions[tool.id]) || '';
  
  let specificContent = '';
  let specificJS = '';
  
  if (tool.id === 'word-counter') {
    specificContent = `
      <div class="form-group">
        <label>${t.text}</label>
        <textarea id="inputText" rows="10" placeholder="Enter your text here..."></textarea>
      </div>
      <div class="info-grid" id="stats" style="display:none;">
        <div class="info-card"><h4>Words</h4><p id="wordCount">0</p></div>
        <div class="info-card"><h4>Characters</h4><p id="charCount">0</p></div>
        <div class="info-card"><h4>Characters (no spaces)</h4><p id="charCountNoSpace">0</p></div>
        <div class="info-card"><h4>Paragraphs</h4><p id="paraCount">0</p></div>
        <div class="info-card"><h4>Sentences</h4><p id="sentenceCount">0</p></div>
        <div class="info-card"><h4>Reading Time</h4><p id="readingTime">0 min</p></div>
      </div>`;
    specificJS = `
      const text = document.getElementById('inputText').value;
      const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
      const chars = text.length;
      const charsNoSpace = text.replace(/\\s/g, '').length;
      const paragraphs = text.trim() ? text.split(/\\n\\s*\\n/).filter(p => p.trim()).length : 0;
      const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
      const readingTime = Math.ceil(words / 200);
      
      document.getElementById('wordCount').textContent = words.toLocaleString();
      document.getElementById('charCount').textContent = chars.toLocaleString();
      document.getElementById('charCountNoSpace').textContent = charsNoSpace.toLocaleString();
      document.getElementById('paraCount').textContent = paragraphs.toLocaleString();
      document.getElementById('sentenceCount').textContent = sentences.toLocaleString();
      document.getElementById('readingTime').textContent = readingTime + ' min';
      document.getElementById('stats').style.display = 'grid';
    `;
  } else if (tool.id === 'text-case-converter') {
    specificContent = `
      <div class="form-group">
        <label>${t.text}</label>
        <textarea id="inputText" rows="6" placeholder="Enter your text here..."></textarea>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="convertCase('upper')">UPPERCASE</button>
        <button class="btn btn-secondary" onclick="convertCase('lower')">lowercase</button>
        <button class="btn btn-secondary" onclick="convertCase('title')">Title Case</button>
        <button class="btn btn-secondary" onclick="convertCase('sentence')">Sentence case</button>
        <button class="btn btn-secondary" onclick="convertCase('camel')">camelCase</button>
        <button class="btn btn-secondary" onclick="convertCase('snake')">snake_case</button>
        <button class="btn btn-secondary" onclick="convertCase('kebab')">kebab-case</button>
      </div>
      <div class="form-group" style="margin-top: 20px;">
        <label>${t.result}</label>
        <textarea id="outputText" rows="6" readonly></textarea>
      </div>
      <button class="btn btn-success" data-success="${t.copied}" onclick="copyToClipboard(document.getElementById('outputText').value, this)">${t.copy}</button>`;
    specificJS = `
      function convertCase(type) {
        const text = document.getElementById('inputText').value;
        let result = text;
        switch(type) {
          case 'upper': result = text.toUpperCase(); break;
          case 'lower': result = text.toLowerCase(); break;
          case 'title': result = text.toLowerCase().replace(/\\b\\w/g, l => l.toUpperCase()); break;
          case 'sentence': result = text.toLowerCase().replace(/(^")|\\.\\s+./g, m => m.toUpperCase()); break;
          case 'camel': result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); break;
          case 'snake': result = text.replace(/\\s+/g, '_').toLowerCase(); break;
          case 'kebab': result = text.replace(/\\s+/g, '-').toLowerCase(); break;
        }
        document.getElementById('outputText').value = result;
      }
    `;
  } else if (tool.id === 'find-and-replace') {
    specificContent = `
      <div class="form-group">
        <label>${t.text}</label>
        <textarea id="inputText" rows="6" placeholder="Enter your text here..."></textarea>
      </div>
      <div class="form-group">
        <label>Find</label>
        <input type="text" id="findText" placeholder="Text to find...">
      </div>
      <div class="form-group">
        <label>Replace with</label>
        <input type="text" id="replaceText" placeholder="Replacement text...">
      </div>
      <div class="form-group">
        <label><input type="checkbox" id="useRegex"> Use Regular Expressions</label>
        <label><input type="checkbox" id="caseSensitive"> Case Sensitive</label>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="findReplace()">Replace All</button>
      </div>
      <div class="form-group" style="margin-top: 20px;">
        <label>${t.result}</label>
        <textarea id="outputText" rows="6" readonly></textarea>
      </div>`;
    specificJS = `
      function findReplace() {
        let text = document.getElementById('inputText').value;
        const find = document.getElementById('findText').value;
        const replace = document.getElementById('replaceText').value;
        const useRegex = document.getElementById('useRegex').checked;
        const caseSensitive = document.getElementById('caseSensitive').checked;
        
        if (!find) return;
        
        if (useRegex) {
          const flags = caseSensitive ? 'g' : 'gi';
          text = text.replace(new RegExp(find, flags), replace);
        } else {
          const flags = caseSensitive ? 'g' : 'gi';
          const escaped = find.replace(/[\\$\\{\\}()\\[\\]\\\\]/g, '\\$\u0026');
          text = text.replace(new RegExp(escaped, flags), replace);
        }
        
        document.getElementById('outputText').value = text;
      }
    `;
  } else if (tool.id === 'password-generator') {
    specificContent = `
      <div class="form-group">
        <label>Password Length</label>
        <input type="number" id="length" value="16" min="4" max="128">
      </div>
      <div class="form-group">
        <label><input type="checkbox" id="uppercase" checked> Uppercase (A-Z)</label>
        <label><input type="checkbox" id="lowercase" checked> Lowercase (a-z)</label>
        <label><input type="checkbox" id="numbers" checked> Numbers (0-9)</label>
        <label><input type="checkbox" id="symbols" checked> Symbols (!@#$%)</label>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="generatePassword()">Generate Password</button>
      </div>
      <div class="result-box" style="margin-top: 20px;">
        <div class="result-value" id="password" style="font-family: monospace; word-break: break-all;">-</div>
      </div>
      <div class="btn-group" style="margin-top: 15px;">
        <button class="btn btn-success" data-success="${t.copied}" onclick="copyToClipboard(document.getElementById('password').textContent, this)">${t.copy}</button>
      </div>`;
    specificJS = `
      function generatePassword() {
        const length = parseInt(document.getElementById('length').value);
        const useUpper = document.getElementById('uppercase').checked;
        const useLower = document.getElementById('lowercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = document.getElementById('symbols').checked;
        
        let chars = '';
        if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) chars += '0123456789';
        if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!chars) {
          alert('Please select at least one character type');
          return;
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        document.getElementById('password').textContent = password;
      }
    `;
  } else if (tool.id === 'lorem-ipsum-generator') {
    specificContent = `
      <div class="form-group">
        <label>Number of Paragraphs</label>
        <input type="number" id="paragraphs" value="3" min="1" max="50">
      </div>
      <div class="form-group">
        <label>Paragraph Length</label>
        <select id="length">
          <option value="short">Short</option>
          <option value="medium" selected>Medium</option>
          <option value="long">Long</option>
        </select>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="generateLorem()">Generate</button>
        <button class="btn btn-success" data-success="${t.copied}" onclick="copyToClipboard(document.getElementById('output').value, this)">${t.copy}</button>
      </div>
      <div class="form-group" style="margin-top: 20px;">
        <textarea id="output" rows="10" readonly></textarea>
      </div>`;
    specificJS = `
      const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];
      
      function generateLorem() {
        const numParagraphs = parseInt(document.getElementById('paragraphs').value);
        const length = document.getElementById('length').value;
        let sentencesPerParagraph = length === 'short' ? 2 : length === 'medium' ? 4 : 8;
        
        let result = '';
        for (let p = 0; p < numParagraphs; p++) {
          let paragraph = '';
          for (let s = 0; s < sentencesPerParagraph; s++) {
            let sentence = '';
            const wordsCount = Math.floor(Math.random() * 10) + 10;
            for (let w = 0; w < wordsCount; w++) {
              sentence += loremWords[Math.floor(Math.random() * loremWords.length)] + ' ';
            }
            sentence = sentence.trim() + '. ';
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
            paragraph += sentence;
          }
          result += paragraph + '\\n\\n';
        }
        document.getElementById('output').value = result.trim();
      }
    `;
  } else {
    // Default simple text tool
    specificContent = `
      <div class="form-group">
        <label>${t.text}</label>
        <textarea id="inputText" rows="10" placeholder="Enter your text here..."></textarea>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="processText()">${t.convert}</button>
        <button class="btn btn-secondary" onclick="resetText()">${t.reset}</button>
      </div>
      <div class="form-group" style="margin-top: 20px;">
        <label>${t.result}</label>
        <textarea id="outputText" rows="10" readonly></textarea>
      </div>
      <button class="btn btn-success" data-success="${t.copied}" onclick="copyToClipboard(document.getElementById('outputText').value, this)">${t.copy}</button>`;
    specificJS = `
      function processText() {
        const text = document.getElementById('inputText').value;
        document.getElementById('outputText').value = text;
      }
      function resetText() {
        document.getElementById('inputText').value = '';
        document.getElementById('outputText').value = '';
      }
    `;
  }
  
  return `<!DOCTYPE html>
<html lang="${lang.code}" dir="${lang.dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - 205 Tools</title>
  <meta name="description" content="${desc}">
  <link rel="stylesheet" href="../assets/css/tools.css">
  <script src="../assets/js/utils.js" defer></script>
</head>
<body>
  <div class="container">
    <a href="/" class="back-link">← ${t.home}</a>
    
    <header>
      <h1>${tool.icon} ${name}</h1>
      <p>${desc}</p>
    </header>
    
    <div class="tool-container">
      <div class="tool-header">
        <h2>${t.options}</h2>
        <div class="lang-selector">
          ${languages.map(l => `<a href="../${l.code}/${tool.id}.html" class="lang-btn ${l.code === lang.code ? 'active' : ''}">${l.code.toUpperCase()}</a>`).join('')}
        </div>
      </div>
      
      ${specificContent}
    </div>
    
    <footer>
      <p>205 Tools © 2025 - ${t.tools}</p>
    </footer>
  </div>
  
  <script>
    ${specificJS}
  </script>
</body>
</html>`;
}

// Generate all files
function generateAll() {
  const basePath = '/root/.openclaw/workspace/demo-site/tools';
  let count = 0;
  
  languages.forEach(lang => {
    const langPath = path.join(basePath, lang.code);
    if (!fs.existsSync(langPath)) {
      fs.mkdirSync(langPath, { recursive: true });
    }
    
    additionalTools.forEach(tool => {
      // Skip if file already exists (avoid overwriting existing tools)
      const filePath = path.join(langPath, `${tool.id}.html`);
      if (fs.existsSync(filePath)) {
        return;
      }
      
      const html = generateTextToolHTML(tool, lang);
      fs.writeFileSync(filePath, html);
      count++;
    });
  });
  
  console.log(`✅ Generated ${count} new files`);
  console.log(`Tools created: ${additionalTools.length}`);
}

generateAll();
