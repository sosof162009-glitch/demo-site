#!/usr/bin/env python3
"""
Fix image converter files - remove old inline scripts, keep only initImageConverter
"""
import re
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

# New clean script template
script_template = '''    <script>
        // Initialize Image Converter
        document.addEventListener('DOMContentLoaded', () => {
            initImageConverter('{input}', '{output}');
        });
    </script>
</body>
</html>'''

def fix_image_converter(filepath, input_format, output_format):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the last </section> before </body>
    body_end = content.find('</body>')
    if body_end == -1:
        return False
    
    # Find the last </section>
    last_section = content.rfind('</section>', 0, body_end)
    if last_section == -1:
        return False
    
    # Keep everything up to and including </section>
    new_content = content[:last_section + len('</section>')]
    
    # Add the new clean script
    new_content += f'''
    <script>
        // Initialize Image Converter
        document.addEventListener('DOMContentLoaded', () => {{
            initImageConverter('{input_format}', '{output_format}');
        }});
    </script>
</body>
</html>'''
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return True

def get_formats(tool_name):
    """Extract input and output formats from tool name"""
    parts = tool_name.split('-')
    if len(parts) >= 3 and parts[1] == 'to':
        return parts[0].upper(), parts[2].upper()
    elif tool_name == 'compress-jpg':
        return 'JPG', 'JPG'
    elif tool_name == 'compress-png':
        return 'PNG', 'PNG'
    elif tool_name == 'image-resizer':
        return 'IMG', 'IMG'
    elif tool_name == 'image-cropper':
        return 'IMG', 'IMG'
    elif tool_name == 'image-to-grayscale':
        return 'IMG', 'IMG'
    elif tool_name == 'image-to-base64':
        return 'IMG', 'BASE64'
    elif tool_name == 'remove-exif':
        return 'IMG', 'IMG'
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
                    if fix_image_converter(html_file, input_fmt, output_fmt):
                        fixed_count += 1
                        print(f"✓ Fixed {lang}/{tool}")
    
    print(f"\n=== Fixed {fixed_count} files ===")

if __name__ == '__main__':
    main()