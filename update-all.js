const fs = require('fs');
const path = require('path');

const DOMAIN = 'tools-205-cl18xmzs1-sas-projects-611869a5.vercel.app';

// Schema templates
function getBreadcrumbSchema(lang, toolName) {
    const langNames = { en: 'Home', ar: 'الرئيسية', fr: 'Accueil', es: 'Inicio', de: 'Startseite' };
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": langNames[lang] || 'Home',
                "item": `https://${DOMAIN}/${lang}/`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": toolName,
                "item": `https://${DOMAIN}/${lang}/${toolName}/`
            }
        ]
    };
}

function getHowToSchema(toolName, description) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to use ${toolName}`,
        "description": description,
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Open the tool",
                "text": "Navigate to the tool page in your browser",
                "url": `https://${DOMAIN}/en/${toolName}/`
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Enter your input",
                "text": "Type or paste your data into the input field",
                "url": `https://${DOMAIN}/en/${toolName}/`
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Process the data",
                "text": "Click the action button to process your input",
                "url": `https://${DOMAIN}/en/${toolName}/`
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Get results",
                "text": "Copy or download your processed output",
                "url": `https://${DOMAIN}/en/${toolName}/`
            }
        ]
    };
}

function getFAQSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is this tool free to use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all tools on 205-Tools are completely free to use with no registration required."
                }
            },
            {
                "@type": "Question",
                "name": "Is my data secure?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all processing happens in your browser. Your data never leaves your device or is sent to any server."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use these tools offline?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, once the page loads, most tools work without an internet connection."
                }
            },
            {
                "@type": "Question",
                "name": "Do you store any of my data?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, we don't store any data. Everything is processed locally in your browser."
                }
            },
            {
                "@type": "Question",
                "name": "What browsers are supported?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All modern browsers including Chrome, Firefox, Safari, and Edge are fully supported."
                }
            },
            {
                "@type": "Question",
                "name": "Are there any file size limits?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Limits depend on your browser's memory. Most tools handle files up to 100MB."
                }
            },
            {
                "@type": "Question",
                "name": "Can I share a link to my results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Results are not stored on our servers, but you can copy and share the output manually."
                }
            },
            {
                "@type": "Question",
                "name": "How do I report a bug?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can report bugs through our contact page or GitHub repository."
                }
            }
        ]
    };
}

// FAQ HTML using native details/summary
function getFAQHTML(lang) {
    const t = {
        en: { q1: 'Is this tool free?', q2: 'Is my data secure?', q3: 'Can I use offline?', q4: 'Do you store data?', q5: 'Supported browsers?', q6: 'File size limits?', q7: 'Share results?', q8: 'Report bugs?' },
        ar: { q1: 'هل الأداة مجانية؟', q2: 'هل بياناتي آمنة؟', q3: 'هل يعمل بدون إنترنت؟', q4: 'هل تخزنون البيانات؟', q5: 'المتصفحات المدعومة؟', q6: 'حدود حجم الملف؟', q7: 'مشاركة النتائج؟', q8: 'الإبلاغ عن أخطاء؟' },
        fr: { q1: 'Cet outil est-il gratuit?', q2: 'Mes données sont-elles sécurisées?', q3: 'Fonctionne-t-il hors ligne?', q4: 'Stockez-vous les données?', q5: 'Navigateurs supportés?', q6: 'Limites de taille?', q7: 'Partager les résultats?', q8: 'Signaler un bug?' },
        es: { q1: '¿Es gratis?', q2: '¿Mis datos están seguros?', q3: '¿Funciona sin conexión?', q4: '¿Almacenan datos?', q5: '¿Navegadores soportados?', q6: '¿Límites de tamaño?', q7: '¿Compartir resultados?', q8: '¿Reportar errores?' },
        de: { q1: 'Ist das Tool kostenlos?', q2: 'Sind meine Daten sicher?', q3: 'Funktioniert es offline?', q4: 'Speichern Sie Daten?', q5: 'Unterstützte Browser?', q6: 'Dateigrößenlimits?', q7: 'Ergebnisse teilen?', q8: 'Fehler melden?' }
    };
    
    const a = {
        en: { a1: 'Yes, completely free.', a2: 'Yes, processed in browser.', a3: 'Yes, after loading.', a4: 'No data stored.', a5: 'All modern browsers.', a6: 'Up to 100MB.', a7: 'Copy output manually.', a8: 'Via contact page.' },
        ar: { a1: 'نعم، مجانية بالكامل.', a2: 'نعم، المعالجة في المتصفح.', a3: 'نعم بعد التحميل.', a4: 'لا يتم تخزين البيانات.', a5: 'جميع المتصفحات الحديثة.', a6: 'حتى 100 ميجابايت.', a7: 'انسخ المخرج يدوياً.', a8: 'عبر صفحة الاتصال.' },
        fr: { a1: 'Oui, totalement gratuit.', a2: 'Oui, traitement local.', a3: 'Oui après chargement.', a4: 'Aucune donnée stockée.', a5: 'Tous les navigateurs.', a6: "Jusqu'à 100Mo.", a7: 'Copiez manuellement.', a8: 'Via page contact.' },
        es: { a1: 'Sí, completamente gratis.', a2: 'Sí, procesado local.', a3: 'Sí después de cargar.', a4: 'No se almacenan datos.', a5: 'Todos los navegadores.', a6: 'Hasta 100MB.', a7: 'Copiar manualmente.', a8: 'Vía página de contacto.' },
        de: { a1: 'Ja, völlig kostenlos.', a2: 'Ja, lokale Verarbeitung.', a3: 'Ja nach dem Laden.', a4: 'Keine Daten gespeichert.', a5: 'Alle modernen Browser.', a6: 'Bis zu 100MB.', a7: 'Manuell kopieren.', a8: 'Über Kontaktseite.' }
    };
    
    const l = lang in t ? lang : 'en';
    
    return `
    <section class="faq-section">
        <div class="container">
            <h2 class="text-center mb-4">FAQ</h2>
            
            <details>
                <summary>${t[l].q1}</summary>
                <div>${a[l].a1}</div>
            </details>
            
            <details>
                <summary>${t[l].q2}</summary>
                <div>${a[l].a2}</div>
            </details>
            
            <details>
                <summary>${t[l].q3}</summary>
                <div>${a[l].a3}</div>
            </details>
            
            <details>
                <summary>${t[l].q4}</summary>
                <div>${a[l].a4}</div>
            </details>
            
            <details>
                <summary>${t[l].q5}</summary>
                <div>${a[l].a5}</div>
            </details>
            
            <details>
                <summary>${t[l].q6}</summary>
                <div>${a[l].a6}</div>
            </details>
            
            <details>
                <summary>${t[l].q7}</summary>
                <div>${a[l].a7}</div>
            </details>
            
            <details>
                <summary>${t[l].q8}</summary>
                <div>${a[l].a8}</div>
            </details>
        </div>
    </section>`;
}

// Process a single HTML file
function processFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Extract language and tool name from path
    const parts = filePath.split('/');
    const lang = parts[parts.length - 3];
    const tool = parts[parts.length - 2];
    
    // Get title from HTML
    const titleMatch = html.match(/<title>(.+?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(' - 205-Tools', '') : tool;
    
    // 1. Remove Tailwind CDN
    html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"\u003e<\/script\u003e/g, '');
    html = html.replace(/<script\u003e[\s\S]*?tailwind\.config[\s\S]*?<\/script\u003e/g, '');
    
    // 2. Add local CSS and DM Sans font
    const cssLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">`;
    
    html = html.replace(/(<head>[\s\S]*?)(<\/head>)/, `$1${cssLink}\n$2`);
    
    // 3. Remove dark mode toggle button
    html = html.replace(/<button[^\u003e]*onclick="document\.documentElement\.classList\.toggle\('dark'\)"[^\u003e]*>[^<]*<\/button>/g, '');
    html = html.replace(/<button[^\u003e]*🌙[^\u003e]*><\/button>/g, '');
    
    // 4. Fix canonical URL
    html = html.replace(/https:\/\/205-tools-hub\.netlify\.app/g, `https://${DOMAIN}`);
    
    // 5. Add hreflang x-default
    if (!html.includes('hreflang="x-default"')) {
        const hreflangTag = `<link rel="alternate" hreflang="x-default" href="https://${DOMAIN}/en/${tool}/">`;
        html = html.replace(/(<link rel="alternate" hreflang="en"[^\u003e]*>)/, `$1\n${hreflangTag}`);
    }
    
    // 6. Add Schema markup before </head>
    const schemas = [
        getBreadcrumbSchema(lang, title),
        getHowToSchema(tool, `How to use ${title}`),
        getFAQSchema()
    ];
    
    const schemaScript = schemas.map(s => `    <script type="application/ld+json">${JSON.stringify(s)}<\/script>`).join('\n');
    
    html = html.replace(/(<\/head>)/, `${schemaScript}\n$1`);
    
    // 7. Replace old FAQ with native details/summary
    // Find FAQ section and replace it
    const faqRegex = /<section[^\u003e]*faq[^\u003e]*>[\s\S]*?<\/section>/i;
    if (faqRegex.test(html)) {
        html = html.replace(faqRegex, getFAQHTML(lang));
    } else {
        // Add FAQ before footer if not exists
        html = html.replace(/(<footer>)/, getFAQHTML(lang) + '\n$1');
    }
    
    // 8. Remove dark class toggle from html
    html = html.replace(/class="dark"/g, '');
    html = html.replace(/document\.documentElement\.classList\.add\('dark'\)/g, '');
    
    // 9. Clean up old inline styles that referenced Tailwind
    html = html.replace(/bg-white dark:bg-gray-800/g, 'card');
    html = html.replace(/text-gray-900 dark:text-gray-100/g, '');
    html = html.replace(/bg-gray-50 dark:bg-gray-900/g, '');
    
    fs.writeFileSync(filePath, html);
    return { tool, lang, status: 'updated' };
}

// Main execution
console.log('🔧 Updating all HTML files...\n');

const languages = ['en', 'ar', 'fr', 'es', 'de'];
let updated = 0;
let errors = 0;

for (const lang of languages) {
    const langDir = path.join('/root/.openclaw/workspace/demo-site', lang);
    if (!fs.existsSync(langDir)) continue;
    
    const tools = fs.readdirSync(langDir).filter(f => {
        return fs.statSync(path.join(langDir, f)).isDirectory() && !f.startsWith('.');
    });
    
    console.log(`\n🌐 ${lang.toUpperCase()}: ${tools.length} tools`);
    
    for (const tool of tools) {
        const filePath = path.join(langDir, tool, 'index.html');
        if (fs.existsSync(filePath)) {
            try {
                processFile(filePath);
                updated++;
                process.stdout.write('.');
            } catch (e) {
                errors++;
                console.log(`\n❌ ${lang}/${tool}: ${e.message}`);
            }
        }
    }
}

console.log(`\n\n✅ Updated: ${updated} files`);
console.log(`❌ Errors: ${errors} files`);
console.log('\nDone!');
