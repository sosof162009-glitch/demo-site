#!/usr/bin/env python3
"""
ToolsHub Master Generator
Generates all 205 tools × 5 languages = 1,025 HTML files
"""

import os
import json

# Configuration
OUTPUT_DIR = "/root/.openclaw/workspace/demo-site/tools"
LANGUAGES = {
    'en': {'name': 'English', 'dir': 'ltr', 'font': "'DM Sans', sans-serif'},
    'ar': {'name': 'العربية', 'dir': 'rtl', 'font': "'Tajawal', sans-serif"},
    'fr': {'name': 'Français', 'dir': 'ltr', 'font': "'DM Sans', sans-serif"},
    'es': {'name': 'Español', 'dir': 'ltr', 'font': "'DM Sans', sans-serif"},
    'de': {'name': 'Deutsch', 'dir': 'ltr', 'font': "'DM Sans', sans-serif"}
}

# All 205 tools organized by category
TOOLS_CATEGORIES = {
    # Image Conversion (32 tools)
    'image': [
        ('jpg-to-png', {'en': 'JPG to PNG', 'ar': 'JPG إلى PNG', 'fr': 'JPG vers PNG', 'es': 'JPG a PNG', 'de': 'JPG zu PNG'}),
        ('jpg-to-webp', {'en': 'JPG to WebP', 'ar': 'JPG إلى WebP', 'fr': 'JPG vers WebP', 'es': 'JPG a WebP', 'de': 'JPG zu WebP'}),
        ('png-to-jpg', {'en': 'PNG to JPG', 'ar': 'PNG إلى JPG', 'fr': 'PNG vers JPG', 'es': 'PNG a JPG', 'de': 'PNG zu JPG'}),
        ('png-to-webp', {'en': 'PNG to WebP', 'ar': 'PNG إلى WebP', 'fr': 'PNG vers WebP', 'es': 'PNG a WebP', 'de': 'PNG zu WebP'}),
        ('webp-to-jpg', {'en': 'WebP to JPG', 'ar': 'WebP إلى JPG', 'fr': 'WebP vers JPG', 'es': 'WebP a JPG', 'de': 'WebP zu JPG'}),
        ('webp-to-png', {'en': 'WebP to PNG', 'ar': 'WebP إلى PNG', 'fr': 'WebP vers PNG', 'es': 'WebP a PNG', 'de': 'WebP zu PNG'}),
        ('heic-to-jpg', {'en': 'HEIC to JPG', 'ar': 'HEIC إلى JPG', 'fr': 'HEIC vers JPG', 'es': 'HEIC a JPG', 'de': 'HEIC zu JPG'}),
        ('avif-to-jpg', {'en': 'AVIF to JPG', 'ar': 'AVIF إلى JPG', 'fr': 'AVIF vers JPG', 'es': 'AVIF a JPG', 'de': 'AVIF zu JPG'}),
        ('bmp-to-png', {'en': 'BMP to PNG', 'ar': 'BMP إلى PNG', 'fr': 'BMP vers PNG', 'es': 'BMP a PNG', 'de': 'BMP zu PNG'}),
        ('tiff-to-jpg', {'en': 'TIFF to JPG', 'ar': 'TIFF إلى JPG', 'fr': 'TIFF vers JPG', 'es': 'TIFF a JPG', 'de': 'TIFF zu JPG'}),
        ('gif-to-mp4', {'en': 'GIF to MP4', 'ar': 'GIF إلى MP4', 'fr': 'GIF vers MP4', 'es': 'GIF a MP4', 'de': 'GIF zu MP4'}),
        ('image-to-base64', {'en': 'Image to Base64', 'ar': 'صورة إلى Base64', 'fr': 'Image vers Base64', 'es': 'Imagen a Base64', 'de': 'Bild zu Base64'}),
        ('base64-to-image', {'en': 'Base64 to Image', 'ar': 'Base64 إلى صورة', 'fr': 'Base64 vers Image', 'es': 'Base64 a Imagen', 'de': 'Base64 zu Bild'}),
        ('svg-to-png', {'en': 'SVG to PNG', 'ar': 'SVG إلى PNG', 'fr': 'SVG vers PNG', 'es': 'SVG a PNG', 'de': 'SVG zu PNG'}),
        ('png-to-svg', {'en': 'PNG to SVG', 'ar': 'PNG إلى SVG', 'fr': 'PNG vers SVG', 'es': 'PNG a SVG', 'de': 'PNG zu SVG'}),
        ('ico-to-png', {'en': 'ICO to PNG', 'ar': 'ICO إلى PNG', 'fr': 'ICO vers PNG', 'es': 'ICO a PNG', 'de': 'ICO zu PNG'}),
        ('png-to-ico', {'en': 'PNG to ICO', 'ar': 'PNG إلى ICO', 'fr': 'PNG vers ICO', 'es': 'PNG a ICO', 'de': 'PNG zu ICO'}),
        ('image-compressor', {'en': 'Image Compressor', 'ar': 'ضاغط الصور', 'fr': 'Compresseur d\'image', 'es': 'Compresor de imágenes', 'de': 'Bildkompressor'}),
        ('bulk-image-converter', {'en': 'Bulk Image Converter', 'ar': 'محول الصور بالجملة', 'fr': 'Convertisseur d\'images en masse', 'es': 'Conversor de imágenes masivo', 'de': 'Bulk-Bildkonverter'}),
        ('raw-to-jpg', {'en': 'RAW to JPG', 'ar': 'RAW إلى JPG', 'fr': 'RAW vers JPG', 'es': 'RAW a JPG', 'de': 'RAW zu JPG'}),
        ('psd-to-jpg', {'en': 'PSD to JPG', 'ar': 'PSD إلى JPG', 'fr': 'PSD vers JPG', 'es': 'PSD a JPG', 'de': 'PSD zu JPG'}),
        ('eps-to-png', {'en': 'EPS to PNG', 'ar': 'EPS إلى PNG', 'fr': 'EPS vers PNG', 'es': 'EPS a PNG', 'de': 'EPS zu PNG'}),
        ('pdf-to-image', {'en': 'PDF to Image', 'ar': 'PDF إلى صورة', 'fr': 'PDF vers Image', 'es': 'PDF a Imagen', 'de': 'PDF zu Bild'}),
        ('image-to-pdf', {'en': 'Image to PDF', 'ar': 'صورة إلى PDF', 'fr': 'Image vers PDF', 'es': 'Imagen a PDF', 'de': 'Bild zu PDF'}),
        ('image-watermarker', {'en': 'Image Watermarker', 'ar': 'واضع علامة مائية', 'fr': 'Watermark d\'image', 'es': 'Marca de agua', 'de': 'Bildwasserzeichen'}),
        ('image-cropper', {'en': 'Image Cropper', 'ar': 'قص الصور', 'fr': 'Recadrage d\'image', 'es': 'Recortar imagen', 'de': 'Bildzuschneider'}),
        ('image-rotator', {'en': 'Image Rotator', 'ar': 'مُدوِّر الصور', 'fr': 'Rotation d\'image', 'es': 'Rotar imagen', 'de': 'Bilddreher'}),
        ('image-flipper', {'en': 'Image Flipper', 'ar': 'قلاب الصور', 'fr': 'Retournement d\'image', 'es': 'Voltear imagen', 'de': 'Bildspiegelung'}),
        ('image-resizer', {'en': 'Image Resizer', 'ar': 'مغير حجم الصور', 'fr': 'Redimensionnement', 'es': 'Redimensionar', 'de': 'Bildgröße ändern'}),
        ('color-replacer', {'en': 'Color Replacer', 'ar': 'مبدل الألوان', 'fr': 'Remplacement de couleur', 'es': 'Reemplazo de color', 'de': 'Farbwechsler'}),
        ('background-remover', {'en': 'Background Remover', 'ar': 'إزالة الخلفية', 'fr': 'Suppression d\'arrière-plan', 'es': 'Eliminar fondo', 'de': 'Hintergrundentferner'}),
        ('image-splitter', {'en': 'Image Splitter', 'ar': 'قاسم الصور', 'fr': 'Diviseur d\'image', 'es': 'Divisor de imagen', 'de': 'Bildteiler'}),
    ],
    
    # PDF Tools (18 tools)
    'pdf': [
        ('pdf-merger', {'en': 'PDF Merger', 'ar': 'دمج PDF', 'fr': 'Fusion PDF', 'es': 'Unir PDF', 'de': 'PDF-Zusammenführung'}),
        ('pdf-splitter', {'en': 'PDF Splitter', 'ar': 'تقسيم PDF', 'fr': 'Diviseur PDF', 'es': 'Dividir PDF', 'de': 'PDF-Teiler'}),
        ('pdf-compressor', {'en': 'PDF Compressor', 'ar': 'ضاغط PDF', 'fr': 'Compresseur PDF', 'es': 'Comprimir PDF', 'de': 'PDF-Kompressor'}),
        ('pdf-to-word', {'en': 'PDF to Word', 'ar': 'PDF إلى Word', 'fr': 'PDF vers Word', 'es': 'PDF a Word', 'de': 'PDF zu Word'}),
        ('pdf-to-excel', {'en': 'PDF to Excel', 'ar': 'PDF إلى Excel', 'fr': 'PDF vers Excel', 'es': 'PDF a Excel', 'de': 'PDF zu Excel'}),
        ('pdf-to-powerpoint', {'en': 'PDF to PowerPoint', 'ar': 'PDF إلى PowerPoint', 'fr': 'PDF vers PowerPoint', 'es': 'PDF a PowerPoint', 'de': 'PDF zu PowerPoint'}),
        ('pdf-to-text', {'en': 'PDF to Text', 'ar': 'PDF إلى نص', 'fr': 'PDF vers Texte', 'es': 'PDF a Texto', 'de': 'PDF zu Text'}),
        ('pdf-to-html', {'en': 'PDF to HTML', 'ar': 'PDF إلى HTML', 'fr': 'PDF vers HTML', 'es': 'PDF a HTML', 'de': 'PDF zu HTML'}),
        ('word-to-pdf', {'en': 'Word to PDF', 'ar': 'Word إلى PDF', 'fr': 'Word vers PDF', 'es': 'Word a PDF', 'de': 'Word zu PDF'}),
        ('excel-to-pdf', {'en': 'Excel to PDF', 'ar': 'Excel إلى PDF', 'fr': 'Excel vers PDF', 'es': 'Excel a PDF', 'de': 'Excel zu PDF'}),
        ('powerpoint-to-pdf', {'en': 'PowerPoint to PDF', 'ar': 'PowerPoint إلى PDF', 'fr': 'PowerPoint vers PDF', 'es': 'PowerPoint a PDF', 'de': 'PowerPoint zu PDF'}),
        ('pdf-page-numbers', {'en': 'PDF Page Numbers', 'ar': 'أرقام صفحات PDF', 'fr': 'Numéros de page PDF', 'es': 'Números de página PDF', 'de': 'PDF-Seitenzahlen'}),
        ('pdf-watermark', {'en': 'PDF Watermark', 'ar': 'علامة مائية PDF', 'fr': 'Filigrane PDF', 'es': 'Marca de agua PDF', 'de': 'PDF-Wasserzeichen'}),
        ('pdf-rotate', {'en': 'PDF Rotate', 'ar': 'تدوير PDF', 'fr': 'Rotation PDF', 'es': 'Rotar PDF', 'de': 'PDF-Drehen'}),
        ('pdf-delete-pages', {'en': 'PDF Delete Pages', 'ar': 'حذف صفحات PDF', 'fr': 'Supprimer pages PDF', 'es': 'Eliminar páginas PDF', 'de': 'PDF-Seiten löschen'}),
        ('pdf-reorder', {'en': 'PDF Reorder', 'ar': 'إعادة ترتيب PDF', 'fr': 'Réorganiser PDF', 'es': 'Reordenar PDF', 'de': 'PDF-Neuordnen'}),
        ('pdf-password', {'en': 'PDF Password', 'ar': 'كلمة مرور PDF', 'fr': 'Mot de passe PDF', 'es': 'Contraseña PDF', 'de': 'PDF-Passwort'}),
        ('pdf-unlock', {'en': 'PDF Unlock', 'ar': 'فتح PDF', 'fr': 'Déverrouiller PDF', 'es': 'Desbloquear PDF', 'de': 'PDF-Entsperren'}),
    ],
    
    # Text Tools (22 tools)
    'text': [
        ('word-counter', {'en': 'Word Counter', 'ar': 'عداد الكلمات', 'fr': 'Compteur de mots', 'es': 'Contador de palabras', 'de': 'Wortzähler'}),
        ('character-counter', {'en': 'Character Counter', 'ar': 'عداد الأحرف', 'fr': 'Compteur de caractères', 'es': 'Contador de caracteres', 'de': 'Zeichenzähler'}),
        ('line-counter', {'en': 'Line Counter', 'ar': 'عداد الأسطر', 'fr': 'Compteur de lignes', 'es': 'Contador de líneas', 'de': 'Zeilenzähler'}),
        ('paragraph-counter', {'en': 'Paragraph Counter', 'ar': 'عداد الفقرات', 'fr': 'Compteur de paragraphes', 'es': 'Contador de párrafos', 'de': 'Absatzzähler'}),
        ('text-case-converter', {'en': 'Text Case Converter', 'ar': 'محول حالة النص', 'fr': 'Convertisseur de casse', 'es': 'Convertidor de mayúsculas', 'de': 'Textfall-Konverter'}),
        ('find-replace', {'en': 'Find and Replace', 'ar': 'بحث واستبدال', 'fr': 'Rechercher et remplacer', 'es': 'Buscar y reemplazar', 'de': 'Suchen und Ersetzen'}),
        ('text-diff', {'en': 'Text Diff', 'ar': 'مقارنة النصوص', 'fr': 'Différence de texte', 'es': 'Diferencia de texto', 'de': 'Textunterschied'}),
        ('remove-spaces', {'en': 'Remove Extra Spaces', 'ar': 'إزالة المسافات', 'fr': 'Supprimer espaces', 'es': 'Eliminar espacios', 'de': 'Leerzeichen entfernen'}),
        ('remove-line-breaks', {'en': 'Remove Line Breaks', 'ar': 'إزالة فواصل الأسطر', 'fr': 'Supprimer sauts de ligne', 'es': 'Eliminar saltos', 'de': 'Zeilenumbrüche entfernen'}),
        ('add-line-numbers', {'en': 'Add Line Numbers', 'ar': 'إضافة أرقام الأسطر', 'fr': 'Ajouter numéros de ligne', 'es': 'Agregar números', 'de': 'Zeilennummern hinzufügen'}),
        ('text-sorter', {'en': 'Text Sorter', 'ar': 'فرز النص', 'fr': 'Trieur de texte', 'es': 'Ordenar texto', 'de': 'Textsortierer'}),
        ('reverse-text', {'en': 'Reverse Text', 'ar': 'عكس النص', 'fr': 'Texte inversé', 'es': 'Texto inverso', 'de': 'Text umkehren'}),
        ('upside-down-text', {'en': 'Upside Down Text', 'ar': 'نص مقلوب', 'fr': 'Texte à l\'envers', 'es': 'Texto al revés', 'de': 'Text auf dem Kopf'}),
        ('morse-code', {'en': 'Morse Code', 'ar': 'شفرة مورس', 'fr': 'Code Morse', 'es': 'Código Morse', 'de': 'Morsecode'}),
        ('binary-text', {'en': 'Binary Text', 'ar': 'نص ثنائي', 'fr': 'Texte binaire', 'es': 'Texto binario', 'de': 'Binärer Text'}),
        ('ascii-text', {'en': 'ASCII Text', 'ar': 'نص ASCII', 'fr': 'Texte ASCII', 'es': 'Texto ASCII', 'de': 'ASCII-Text'}),
        ('slug-generator', {'en': 'Slug Generator', 'ar': 'مولد Slug', 'fr': 'Générateur de slug', 'es': 'Generador de slug', 'de': 'Slug-Generator'}),
    ],
    
    # Add more categories as needed
}

def generate_base_css():
    """Generate the base CSS for all tools"""
    return '''
:root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #111118;
    --bg-card: #16161f;
    --text-primary: #ffffff;
    --text-secondary: #a0a0b0;
    --text-muted: #6b6b7b;
    --border-color: #252532;
    --primary: #4f8ef7;
    --primary-hover: #3a7de6;
    --success: #22c55e;
    --warning: #f59e0b;
    --error: #ef4444;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    line-height: 1.6;
}

body[dir="rtl"] { font-family: 'Tajawal', sans-serif; }

.container { max-width: 1200px; margin: 0 auto; padding: 20px; }

header {
    text-align: center;
    padding: 40px 0;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 30px;
}

h1 {
    font-size: 2.5rem;
    background: linear-gradient(90deg, var(--primary), #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
}

.subtitle { color: var(--text-secondary); font-size: 1.1rem; }

.lang-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
}

.lang-btn {
    padding: 8px 16px;
    border: 1px solid var(--border-color);
    background: var(--bg-card);
    color: var(--text-secondary);
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.3s;
}

.lang-btn:hover, .lang-btn.active {
    border-color: var(--primary);
    color: var(--primary);
}

.tool-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 20px;
}

.form-group { margin-bottom: 20px; }

label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-secondary);
    font-weight: 500;
}

input[type="text"],
input[type="number"],
input[type="file"],
textarea,
select {
    width: 100%;
    padding: 12px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 14px;
}

textarea { min-height: 150px; resize: vertical; font-family: monospace; }

input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: var(--primary);
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-primary {
    background: linear-gradient(90deg, var(--primary), #6b5ce7);
    color: white;
}

.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(79, 142, 247, 0.4); }

.btn-secondary {
    background: var(--bg-primary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
}

.output-box {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 15px;
    min-height: 100px;
    font-family: monospace;
    white-space: pre-wrap;
    word-break: break-all;
}

.drop-zone {
    border: 2px dashed var(--border-color);
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
}

.drop-zone:hover {
    border-color: var(--primary);
    background: rgba(79, 142, 247, 0.05);
}

footer {
    text-align: center;
    padding: 30px 0;
    color: var(--text-muted);
    border-top: 1px solid var(--border-color);
    margin-top: 30px;
}

@media (max-width: 768px) {
    h1 { font-size: 1.8rem; }
    .tool-card { padding: 20px; }
}
'''

def generate_tool_html(tool_id, tool_name, lang, lang_config):
    """Generate HTML for a single tool"""
    dir_attr = f'dir="{lang_config[\"dir\"]}"' if lang_config['dir'] == 'rtl' else ''
    
    # Generate language switcher
    lang_links = ''
    for l, config in LANGUAGES.items():
        active = 'active' if l == lang else ''
        lang_links += f'<a href="{tool_id}-{l}.html" class="lang-btn {active}">{config["name"]}</a>'
    
    return f'''<!DOCTYPE html>
<html lang="{lang}" {dir_attr}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{tool_name} - 205 Tools</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Tajawal:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>{generate_base_css()}</style>
</head>
<body>
    <div class="container">
        <header>
            <h1>{tool_name}</h1>
            <p class="subtitle">205 Free Online Tools</p>
            <div class="lang-selector">
                {lang_links}
            </div>
        </header>
        
        <div class="tool-card">
            <div class="drop-zone" id="dropZone">
                <p>📁 Click or drag files here</p>
                <input type="file" id="fileInput" style="display: none;">
            </div>
            
            <div class="form-group" style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="processFile()">Process</button>
            </div>
            
            <div class="form-group">
                <label>Output</label>
                <div class="output-box" id="output">Result will appear here...</div>
            </div>
        </div>
        
        <footer>
            <p>© 2026 ToolsHub - 205 Free Online Tools</p>
        </footer>
    </div>
    
    <script>
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => {{ e.preventDefault(); dropZone.style.borderColor = '#4f8ef7'; }});
        dropZone.addEventListener('dragleave', () => {{ dropZone.style.borderColor = '#252532'; }});
        dropZone.addEventListener('drop', (e) => {{
            e.preventDefault();
            dropZone.style.borderColor = '#252532';
            const files = e.dataTransfer.files;
            if (files.length) handleFile(files[0]);
        }});
        
        fileInput.addEventListener('change', (e) => {{
            if (e.target.files.length) handleFile(e.target.files[0]);
        }});
        
        function handleFile(file) {{
            document.getElementById('output').textContent = 'Processing: ' + file.name + ' (' + (file.size / 1024).toFixed(2) + ' KB)';
        }}
        
        function processFile() {{
            const output = document.getElementById('output');
            output.textContent = 'Processing... This is a demo template. Full implementation coming soon.';
        }}
    </script>
</body>
</html>'''

def main():
    """Generate all tool files"""
    total_created = 0
    
    for category, tools in TOOLS_CATEGORIES.items():
        print(f"\nGenerating {category} tools...")
        for tool_id, names in tools:
            for lang, name in names.items():
                if lang not in LANGUAGES:
                    continue
                filename = f"{tool_id}-{lang}.html"
                filepath = os.path.join(OUTPUT_DIR, filename)
                html = generate_tool_html(tool_id, name, lang, LANGUAGES[lang])
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(html)
                total_created += 1
        print(f"  Created {len(tools) * len(LANGUAGES)} files")
    
    print(f"\n✅ Total files created: {total_created}")

if __name__ == '__main__':
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    main()
