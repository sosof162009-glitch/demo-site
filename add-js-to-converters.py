#!/usr/bin/env python3
"""
Add initImageConverter function to all image converter HTML files
"""
from pathlib import Path

# Image converter tools
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

JS_FUNCTION = '''
<script>
// Image Converter Logic
function initImageConverter(inputFormat, outputFormat) {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    let currentFile = null;
    let originalImage = null;

    // Event listeners
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value + '%';
    });

    function handleFile(file) {
        const validTypes = getValidTypes(inputFormat);
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid ' + inputFormat + ' image file');
            return;
        }

        currentFile = file;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                originalImage = img;
                document.getElementById('imagePreview').src = e.target.result;
                document.getElementById('uploadStep').classList.add('hidden');
                document.getElementById('previewStep').classList.remove('hidden');
                
                document.getElementById('fileInfo').textContent = 
                    file.name + ' • ' + (file.size/1024/1024).toFixed(2) + ' MB';
                document.getElementById('dimensions').textContent = 
                    img.width + ' × ' + img.height + ' px';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function getValidTypes(format) {
        const typeMap = {
            'JPG': ['image/jpeg', 'image/jpg'],
            'JPEG': ['image/jpeg', 'image/jpg'],
            'PNG': ['image/png'],
            'WEBP': ['image/webp'],
            'GIF': ['image/gif'],
            'BMP': ['image/bmp'],
            'SVG': ['image/svg+xml'],
            'ICO': ['image/x-icon', 'image/vnd.microsoft.icon'],
            'TIFF': ['image/tiff', 'image/tif'],
            'AVIF': ['image/avif'],
            'HEIC': ['image/heic', 'image/heif'],
            'IMG': ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
        };
        return typeMap[format.toUpperCase()] || ['image/*'];
    }

    window.processImage = function() {
        if (!originalImage) return;

        const btn = document.querySelector('button[onclick="processImage()"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
        btn.disabled = true;

        setTimeout(() => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = originalImage.width;
                canvas.height = originalImage.height;
                
                if (outputFormat.toLowerCase() === 'jpg' || outputFormat.toLowerCase() === 'jpeg') {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                
                ctx.drawImage(originalImage, 0, 0);
                
                const quality = qualitySlider.value / 100;
                const mimeType = 'image/' + outputFormat.toLowerCase().replace('jpg', 'jpeg');
                
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = url;
                    downloadLink.download = currentFile.name.replace(/\.[^/.]+$/, '') + '.' + outputFormat.toLowerCase();
                    
                    document.getElementById('previewStep').classList.add('hidden');
                    document.getElementById('resultStep').classList.remove('hidden');
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, mimeType, quality);
            } catch (err) {
                alert('Error processing image: ' + err.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }, 100);
    };

    window.resetTool = function() {
        currentFile = null;
        originalImage = null;
        document.getElementById('fileInput').value = '';
        document.getElementById('uploadStep').classList.remove('hidden');
        document.getElementById('previewStep').classList.add('hidden');
        document.getElementById('resultStep').classList.add('hidden');
        document.getElementById('imagePreview').src = '';
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initImageConverter('{input}', '{output}');
});
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
                    with open(html_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Remove everything from </body> to end and replace with our script
                    body_end = content.find('</body>')
                    if body_end != -1:
                        content = content[:body_end]
                        
                        input_fmt, output_fmt = get_formats(tool)
                        new_script = JS_FUNCTION.replace('{input}', input_fmt).replace('{output}', output_fmt)
                        
                        content += new_script
                        
                        with open(html_file, 'w', encoding='utf-8') as f:
                            f.write(content)
                        
                        fixed_count += 1
                        print(f"✓ {lang}/{tool}")
    
    print(f"\n=== Fixed {fixed_count} files ===")

if __name__ == '__main__':
    main()