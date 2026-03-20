// Homepage generator - creates HTML with all 205 tools
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('tools-data.json', 'utf8'));
const translations = require('./tools-translations.js');
const { toolsDataAr, toolsDataFr, toolsDataEs, toolsDataDe } = translations;

// Helper to get translated name
function getName(toolId, lang) {
    if (lang === 'ar') return toolsDataAr[toolId] || data.tools.find(t => t.id === toolId)?.name;
    if (lang === 'fr') return toolsDataFr[toolId] || data.tools.find(t => t.id === toolId)?.name;
    if (lang === 'es') return toolsDataEs[toolId] || data.tools.find(t => t.id === toolId)?.name;
    if (lang === 'de') return toolsDataDe[toolId] || data.tools.find(t => t.id === toolId)?.name;
    return data.tools.find(t => t.id === toolId)?.name;
}

// Category config
const catConfig = {
    'Images': { icon: '🖼️', color: 'blue', ar: 'الصور' },
    'PDF': { icon: '📄', color: 'red', ar: 'PDF' },
    'Text': { icon: '✍️', color: 'green', ar: 'النصوص' },
    'Developers': { icon: '💻', color: 'purple', ar: 'المطورين' },
    'Colors': { icon: '🎨', color: 'pink', ar: 'الألوان' },
    'Math': { icon: '🔢', color: 'yellow', ar: 'الرياضيات' },
    'Time': { icon: '⏱️', color: 'indigo', ar: 'الوقت' },
    'Units': { icon: '📐', color: 'teal', ar: 'الوحدات' },
    'SEO': { icon: '🌐', color: 'orange', ar: 'SEO' },
    'Security': { icon: '🔐', color: 'red', ar: 'الأمان' },
    'Data': { icon: '📊', color: 'cyan', ar: 'البيانات' },
    'Special': { icon: '🎯', color: 'violet', ar: 'خاصة' }
};

console.log('Use this script to generate the complete homepage');
console.log('Total tools:', data.tools.length);
console.log('Categories:', data.categories.length);
