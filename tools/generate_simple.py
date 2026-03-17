#!/usr/bin/env python3
"""
ToolsHub Master Generator - Simplified Version
Generates tool templates for 205 tools
"""

import os

OUTPUT_DIR = "/root/.openclaw/workspace/demo-site/tools"
LANGUAGES = ['en', 'ar', 'fr', 'es', 'de']

# Tool names in different languages
TOOL_NAMES = {
    # Image tools
    'jpg-to-png': {'en': 'JPG to PNG', 'ar': 'JPG إلى PNG', 'fr': 'JPG vers PNG', 'es': 'JPG a PNG', 'de': 'JPG zu PNG'},
    'png-to-jpg': {'en': 'PNG to JPG', 'ar': 'PNG إلى JPG', 'fr': 'PNG vers JPG', 'es': 'PNG a JPG', 'de': 'PNG zu JPG'},
    'image-resizer': {'en': 'Image Resizer', 'ar': 'تغيير حجم الصورة', 'fr': 'Redimensionner', 'es': 'Redimensionar', 'de': 'Größe ändern'},
}

def generate_html(tool_id, lang):
    name = TOOL_NAMES.get(tool_id, {}).get(lang, tool_id.replace('-', ' ').title())
    dir_attr = 'dir="rtl"' if lang == 'ar' else ''
    
    lang_links = ''
    for l in LANGUAGES:
        active = 'active' if l == lang else ''
        lang_links += f'<a href="{tool_id}-{l}.html" class="lang-btn {active}">{l.upper()}</a>'
    
    return f'''<!DOCTYPE html>
<html lang="{lang}" {dir_attr}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} - 205 Tools</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Tajawal:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/tools.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>{name}</h1>
            <p class="subtitle">205 Free Online Tools</p>
            <div class="lang-selector">
                {lang_links}
            </div>
        </header>
        
        <div class="tool-card">
            <p>Tool functionality coming soon...</p>
        </div>
        
        <footer>
            <p>© 2026 ToolsHub</p>
        </footer>
    </div>
    <script src="assets/tools.js"></script>
</body>
</html>'''

def main():
    count = 0
    for tool_id in TOOL_NAMES:
        for lang in LANGUAGES:
            filepath = os.path.join(OUTPUT_DIR, f"{tool_id}-{lang}.html")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(generate_html(tool_id, lang))
            count += 1
    print(f"Created {count} files")

if __name__ == '__main__':
    main()
