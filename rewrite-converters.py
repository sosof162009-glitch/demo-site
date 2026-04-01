#!/usr/bin/env python3
"""
Completely rewrite image converter HTML files with clean structure
"""
import re
from pathlib import Path

image_tools = [
    'jpg-to-png', 'jpg-to-pdf', 'jpg-to-webp', 'jpg-to-gif', 'jpg-to-bmp', 'jpg-to-ico', 'jpg-to-avif',
    'png-to-jpg', 'png-to-pdf', 'png-to-webp', 'png-to-gif', 'png-to-bmp', 'png-to-ico', 'png-to-avif',
    'webp-to-jpg', 'webp-to-png', 'webp-to-pdf', 'webp-to-gif', 'webp-to-avif',
    'gif-to-jpg', 'gif-to-png', 'gif-to-webp', 'gif-to-pdf',
    'bmp-to-jpg', 'bmp-to-png', 'bmp-to-webp',
    'ico-to-jpg', 'ico-to-png',
    'avif-to-jpg', 'avif-to-png', 'avif-to-webp',
    'heic-to-jpg', 'heic-to-png',
    'tiff-to-jpg', 'tiff-to-png',
    'svg-to-jpg', 'svg-to-png',
    'compress-jpg', 'compress-png',
    'image-resizer', 'image-cropper', 'image-to-grayscale', 'image-to-base64',
    'remove-exif', 'favicon-generator'
]

def get_html_template(input_fmt, output_fmt):
    return f'''<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{input_fmt} to {output_fmt} Converter - 205-Tools</title>
    <meta name="description" content="Converts {input_fmt} images to {output_fmt} format using browser Canvas API.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../../assets/styles.css">
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
    <header class="bg-white dark:bg-gray-800 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/en/" class="text-xl font-bold text-blue-600">205-Tools</a>
            <nav>
                <a href="/en/images/" class="text-gray-600 dark:text-gray-300 hover:text-blue-600">← Images</a>
            </nav>
        </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-12">
        <div class="text-center mb-8">
            <span class="text-blue-600 font-medium">📷 Images</span>
            <h1 class="text-4xl font-bold mt-2">{input_fmt} to {output_fmt} Converter</h1>
            <p class="text-gray-600 dark:text-gray-400 mt-2">Convert your images easily and securely in the browser.</p>
        </div>

        <!-- Upload Step -->
        <div id="uploadStep" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <div id="dropZone" class="border-3 border-dashed border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-12 text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all">
                <input type="file" id="fileInput" class="hidden" accept="image/*">
                <div class="text-6xl mb-4">📷</div>
                <h3 class="text-xl font-semibold mb-2">Upload your image</h3>
                <p class="text-gray-500 mb-4">Drag & drop your image here</p>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Browse Files</button>
            </div>
        </div>

        <!-- Preview Step -->
        <div id="previewStep" class="hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <h3 class="text-xl font-semibold mb-4">Preview</h3>
            <div class="mb-4">
                <img id="imagePreview" class="max-w-full rounded-lg max-h-96 mx-auto" src="" alt="Preview">
            </div>
            <div class="flex justify-between items-center mb-4 text-sm text-gray-600">
                <span id="fileInfo">filename.jpg • 0 MB</span>
                <span id="dimensions">0 × 0 px</span>
            </div>
            <button onclick="resetTool()" class="text-red-500 hover:text-red-600 text-sm mb-4">✕ Remove</button>

            <!-- Settings -->
            <div class="border-t dark:border-gray-700 pt-4 mb-4">
                <h4 class="font-medium mb-2">Quality</h4>
                <input type="range" id="qualitySlider" min="1" max="100" value="90" class="w-full">
                <div class="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Low</span>
                    <span id="qualityValue" class="text-blue-600 font-semibold">90%</span>
                    <span>High</span>
                </div>
            </div>

            <button onclick="processImage()" id="convertBtn" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Convert
            </button>
        </div>

        <!-- Result Step -->
        <div id="resultStep" class="hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <div class="text-5xl mb-4">✅</div>
            <h3 class="text-xl font-semibold mb-2">Conversion Complete!</h3>
            <p class="text-gray-600 mb-6">Your image has been successfully converted.</p>
            <div class="flex gap-4 justify-center">
                <a id="downloadLink" href="#" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download
                </a>
                <button onclick="resetTool()" class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                    Convert Another
                </button>
            </div>
        </div>
    </main>

    <script>
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const qualitySlider = document.getElementById('qualitySlider');
        const qualityValue = document.getElementById('qualityValue');
        let currentFile = null;
        let originalImage = null;

        dropZone.addEventListener('click', () => fileInput.click());
        
        dropZone.addEventListener('dragover', (e) => {{
            e.preventDefault();
            dropZone.classList.add('dragover');
        }});
        
        dropZone.addEventListener('dragleave', () => {{
            dropZone.classList.remove('dragover');
        }});
        
        dropZone.addEventListener('drop', (e) => {{
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
        }});
        
        fileInput.addEventListener('change', (e) => {{
            if (e.target.files.length) handleFile(e.target.files[0]);
        }});

        qualitySlider.addEventListener('input', (e) => {{
            qualityValue.textContent = e.target.value + '%';
        }});

        function handleFile(file) {{
            if (!file.type.startsWith('image/')) {{
                alert('Please select a valid image file');
                return;
            }}
            currentFile = file;
            
            const reader = new FileReader();
            reader.onload = (e) => {{
                const img = new Image();
                img.onload = () => {{
                    originalImage = img;
                    document.getElementById('imagePreview').src = e.target.result;
                    document.getElementById('uploadStep').classList.add('hidden');
                    document.getElementById('previewStep').classList.remove('hidden');
                    document.getElementById('fileInfo').textContent = file.name + ' • ' + (file.size/1024/1024).toFixed(2) + ' MB';
                    document.getElementById('dimensions').textContent = img.width + ' × ' + img.height + ' px';
                }};
                img.src = e.target.result;
            }};
            reader.readAsDataURL(file);
        }}

        window.processImage = function() {{
            if (!originalImage) return;
            
            const btn = document.getElementById('convertBtn');
            btn.innerHTML = 'Processing...';
            btn.disabled = true;

            setTimeout(() => {{
                try {{
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    canvas.width = originalImage.width;
                    canvas.height = originalImage.height;
                    
                    if ('{output_fmt}'.toLowerCase() === 'jpg' || '{output_fmt}'.toLowerCase() === 'jpeg') {{
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }}
                    
                    ctx.drawImage(originalImage, 0, 0);
                    
                    const quality = qualitySlider.value / 100;
                    const mimeType = 'image/' + '{output_fmt}'.toLowerCase().replace('jpg', 'jpeg');
                    
                    canvas.toBlob((blob) => {{
                        const url = URL.createObjectURL(blob);
                        document.getElementById('downloadLink').href = url;
                        document.getElementById('downloadLink').download = currentFile.name.replace(/\.[^/.]+$/, '') + '.{output_fmt.lower()}';
                        
                        document.getElementById('previewStep').classList.add('hidden');
                        document.getElementById('resultStep').classList.remove('hidden');
                        
                        btn.innerHTML = '<svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15\"/></svg> Convert';
                        btn.disabled = false;
                    }}, mimeType, quality);
                }} catch (err) {{
                    alert('Error: ' + err.message);
                    btn.innerHTML = '<svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15\"/></svg> Convert';
                    btn.disabled = false;
                }}
            }}, 500);
        }};

        window.resetTool = function() {{
            currentFile = null;
            originalImage = null;
            fileInput.value = '';
            document.getElementById('uploadStep').classList.remove('hidden');
            document.getElementById('previewStep').classList.add('hidden');
            document.getElementById('resultStep').classList.add('hidden');
            document.getElementById('imagePreview').src = '';
            document.getElementById('convertBtn').innerHTML = '<svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15\"/></svg> Convert';
            document.getElementById('convertBtn').disabled = false;
        }};
    </script>
</body>
</html>'''

def get_formats(tool_name):
    parts = tool_name.split('-')
    if len(parts) >= 3 and parts[1] == 'to':
        return parts[0].upper(), parts[2].upper()
    elif tool_name == 'compress-jpg':
        return 'JPG', 'JPG'
    elif tool_name == 'compress-png':
        return 'PNG', 'PNG'
    elif tool_name in ['image-resizer', 'image-cropper', 'image-to-grayscale', 'remove-exif']:
        return 'IMG', 'IMG'
    elif tool_name == 'image-to-base64':
        return 'IMG', 'BASE64'
    elif tool_name == 'favicon-generator':
        return 'IMG', 'ICO'
    return 'IMG', 'IMG'

def main():
    langs = ['en', 'ar', 'fr', 'es', 'de']
    base_path = Path('/root/.openclaw/workspace/demo-site')
    
    fixed_count = 0
    
    for lang in langs:
        for tool in image_tools:
            tool_dir = base_path / lang / tool
            if tool_dir.exists():
                html_file = tool_dir / 'index.html'
                if html_file.exists():
                    input_fmt, output_fmt = get_formats(tool)
                    html = get_html_template(input_fmt, output_fmt)
                    
                    # For non-EN languages, adjust the lang attribute
                    if lang == 'ar':
                        html = html.replace('lang="en"', 'lang="ar"').replace('dir="ltr"', 'dir="rtl"')
                    elif lang == 'fr':
                        html = html.replace('lang="en"', 'lang="fr"')
                    elif lang == 'es':
                        html = html.replace('lang="en"', 'lang="es"')
                    elif lang == 'de':
                        html = html.replace('lang="en"', 'lang="de"')
                    
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(html)
                    
                    fixed_count += 1
                    print(f"✓ Rewrote {lang}/{tool}")
    
    print(f"\n=== Rewrote {fixed_count} files ===")

if __name__ == '__main__':
    main()