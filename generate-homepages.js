// Generate homepages for all languages
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('tools-data.json', 'utf8'));

const translations = {
  ar: {
    title: '205-أدوات | 205 أداة مجانية',
    search: 'ابحث عن أداة...',
    tools: 'أدوات',
    categories: {
      Images: 'أدوات الصور',
      PDF: 'أدوات PDF',
      Text: 'أدوات النصوص',
      Developers: 'أدوات المطورين',
      Colors: 'أدوات الألوان',
      Math: 'أدوات الرياضيات',
      Time: 'أدوات الوقت',
      Units: 'أدوات الوحدات',
      SEO: 'أدوات SEO',
      Security: 'أدوات الأمان',
      Data: 'أدوات البيانات',
      Special: 'أدوات خاصة'
    }
  },
  en: {
    title: '205-Tools | 205 Free Online Tools',
    search: 'Search for a tool...',
    tools: 'tools',
    categories: {
      Images: 'Image Tools',
      PDF: 'PDF Tools',
      Text: 'Text Tools',
      Developers: 'Developer Tools',
      Colors: 'Color Tools',
      Math: 'Math Tools',
      Time: 'Time Tools',
      Units: 'Unit Converters',
      SEO: 'SEO Tools',
      Security: 'Security Tools',
      Data: 'Data Tools',
      Special: 'Special Tools'
    }
  },
  fr: {
    title: '205-Outils | 205 Outils En Ligne Gratuits',
    search: 'Rechercher un outil...',
    tools: 'outils',
    categories: {
      Images: 'Outils d\'Image',
      PDF: 'Outils PDF',
      Text: 'Outils de Texte',
      Developers: 'Outils de Développement',
      Colors: 'Outils de Couleur',
      Math: 'Outils Mathématiques',
      Time: 'Outils de Temps',
      Units: 'Convertisseurs',
      SEO: 'Outils SEO',
      Security: 'Outils de Sécurité',
      Data: 'Outils de Données',
      Special: 'Outils Spéciaux'
    }
  },
  es: {
    title: '205-Herramientas | 205 Herramientas Gratuitas',
    search: 'Buscar una herramienta...',
    tools: 'herramientas',
    categories: {
      Images: 'Herramientas de Imagen',
      PDF: 'Herramientas PDF',
      Text: 'Herramientas de Texto',
      Developers: 'Herramientas para Desarrolladores',
      Colors: 'Herramientas de Color',
      Math: 'Herramientas Matemáticas',
      Time: 'Herramientas de Tiempo',
      Units: 'Convertidores',
      SEO: 'Herramientas SEO',
      Security: 'Herramientas de Seguridad',
      Data: 'Herramientas de Datos',
      Special: 'Herramientas Especiales'
    }
  },
  de: {
    title: '205-Tools | 205 Kostenlose Online-Tools',
    search: 'Nach einem Tool suchen...',
    tools: 'Tools',
    categories: {
      Images: 'Bild-Tools',
      PDF: 'PDF-Tools',
      Text: 'Text-Tools',
      Developers: 'Entwickler-Tools',
      Colors: 'Farb-Tools',
      Math: 'Mathe-Tools',
      Time: 'Zeit-Tools',
      Units: 'Einheiten-Umrechner',
      SEO: 'SEO-Tools',
      Security: 'Sicherheits-Tools',
      Data: 'Daten-Tools',
      Special: 'Spezial-Tools'
    }
  }
};

const categoryEmojis = {
  Images: '🖼️',
  PDF: '📄',
  Text: '✍️',
  Developers: '💻',
  Colors: '🎨',
  Math: '🔢',
  Time: '⏱️',
  Units: '📐',
  SEO: '🌐',
  Security: '🔐',
  Data: '📊',
  Special: '🎯'
};

function generateHomepage(lang) {
  const t = translations[lang];
  const isRTL = lang === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Group tools by category
  const toolsByCategory = {};
  data.tools.forEach(tool => {
    if (!toolsByCategory[tool.category]) {
      toolsByCategory[tool.category] = [];
    }
    toolsByCategory[tool.category].push(tool);
  });
  
  let categoriesHtml = '';
  for (const [category, tools] of Object.entries(toolsByCategory)) {
    const emoji = categoryEmojis[category] || '🔧';
    const categoryName = t.categories[category] || category;
    
    let toolsHtml = tools.map(tool => {
      const icon = tool.icon || '🔧';
      return `
        <a href="${tool.slug}/" class="tool-card bg-white dark:bg-gray-800 p-3 rounded shadow text-center hover:shadow-lg transition">
          <div class="text-2xl mb-1">${icon}</div>
          <div class="text-sm font-medium">${tool.name}</div>
        </a>`;
    }).join('');
    
    categoriesHtml += `
      <section class="mb-8" data-category="${category.toLowerCase()}">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">${emoji} ${categoryName} (${tools.length})</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          ${toolsHtml}
        </div>
      </section>`;
  }
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t.title}</title>
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = { darkMode: 'class' };
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Tajawal:wght@400;500;700&display=swap');
body { font-family: ${isRTL ? "'Tajawal', sans-serif" : "'Inter', sans-serif"}; }
.tool-card:hover { transform: translateY(-3px); }
</style>
</head>
<body class="bg-gray-100 dark:bg-gray-900 dark:text-white">
<header class="bg-white dark:bg-gray-800 shadow p-4 sticky top-0 z-50">
<div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
<a href="./" class="text-2xl font-bold text-indigo-600">205-${lang === 'ar' ? 'أدوات' : lang === 'fr' ? 'Outils' : lang === 'es' ? 'Herramientas' : 'Tools'}</a>
<input type="text" id="search" placeholder="${t.search}" class="border dark:border-gray-600 dark:bg-gray-700 rounded-lg px-4 py-2 w-full md:w-96">
<select id="lang" class="border dark:border-gray-600 dark:bg-gray-700 rounded-lg px-4 py-2" onchange="window.location.href='../'+this.value+'/'">
<option value="ar" ${lang === 'ar' ? 'selected' : ''}>🇸🇦 العربية</option>
<option value="en" ${lang === 'en' ? 'selected' : ''}>🇬🇧 English</option>
<option value="fr" ${lang === 'fr' ? 'selected' : ''}>🇫🇷 Français</option>
<option value="es" ${lang === 'es' ? 'selected' : ''}>🇪🇸 Español</option>
<option value="de" ${lang === 'de' ? 'selected' : ''}>🇩🇪 Deutsch</option>
</select>
<button onclick="document.documentElement.classList.toggle('dark')" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">🌙</button>
</div>
</header>
<main class="container mx-auto p-4">
${categoriesHtml}
</main>
<footer class="bg-white dark:bg-gray-800 shadow mt-8 py-4 text-center">
<p>© 2026 205-Tools | ${t.title.split('|')[1] || 'Free Online Tools'}</p>
</footer>
<script>
document.getElementById('search').addEventListener('input', function(e) {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('.tool-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? 'block' : 'none';
  });
});
</script>
</body>
</html>`;
}

// Generate for all languages
const languages = ['ar', 'en', 'fr', 'es', 'de'];
for (const lang of languages) {
  const filePath = path.join(__dirname, lang, 'index.html');
  fs.writeFileSync(filePath, generateHomepage(lang));
  console.log(`✅ Generated ${lang}/index.html`);
}

console.log('✅ All language homepages generated!');
