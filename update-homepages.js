const fs = require('fs');
const path = require('path');

const DOMAIN = 'tools-205-cl18xmzs1-sas-projects-611869a5.vercel.app';

function updateHomepage(lang) {
    const filePath = path.join('/root/.openclaw/workspace/demo-site', lang, 'index.html');
    if (!fs.existsSync(filePath)) return { lang, status: 'not_found' };
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // 1. Remove Tailwind
    html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g, '');
    html = html.replace(/<script>[\s\S]*?tailwind\.config[\s\S]*?<\/script>/g, '');
    
    // 2. Add local CSS and DM Sans
    const cssLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">`;
    
    html = html.replace(/(<head>[\s\S]*?)(<\/head>)/, `$1${cssLink}\n$2`);
    
    // 3. Remove dark mode toggle
    html = html.replace(/<button[^>]*onclick="document\.documentElement\.classList\.toggle\('dark'\)"[^>]*>[^<]*<\/button>/g, '');
    html = html.replace(/<button[^>]*🌙[^>]*><\/button>/g, '');
    
    // 4. Fix canonical
    html = html.replace(/https:\/\/205-tools-hub\.netlify\.app/g, `https://${DOMAIN}`);
    
    // 5. Add x-default hreflang
    if (!html.includes('hreflang="x-default"')) {
        const hreflangTag = `<link rel="alternate" hreflang="x-default" href="https://${DOMAIN}/en/">`;
        html = html.replace(/(<link rel="alternate" hreflang="en"[^>]*>)/, `$1\n${hreflangTag}`);
    }
    
    // 6. Remove dark class
    html = html.replace(/class="dark"/g, '');
    
    // 7. Clean up Tailwind classes
    html = html.replace(/bg-white dark:bg-gray-800/g, 'card');
    html = html.replace(/bg-gray-100 dark:bg-gray-900/g, '');
    
    fs.writeFileSync(filePath, html);
    return { lang, status: 'updated' };
}

console.log('Updating homepages...\n');

for (const lang of ['en', 'ar', 'fr', 'es', 'de']) {
    const result = updateHomepage(lang);
    console.log(`${lang}: ${result.status}`);
}

console.log('\nDone!');
