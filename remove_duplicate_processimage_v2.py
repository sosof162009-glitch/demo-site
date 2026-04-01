#!/usr/bin/env python3
"""
Remove duplicate processImage function from image converter tools
The standalone processImage (in first script block) should be removed
Keep initImageConverter which defines window.processImage
"""
import os
import re
from pathlib import Path

def remove_duplicate_processimage():
    langs = ['en', 'ar', 'fr', 'es', 'de']
    base_path = Path('/root/.openclaw/workspace/demo-site')
    
    total_files = 0
    modified_files = 0
    
    # List of image converter tools
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
    
    for lang in langs:
        lang_path = base_path / lang
        if not lang_path.exists():
            continue
            
        for tool in image_tools:
            tool_dirs = [
                lang_path / tool,
                lang_path / f"{tool}-converter"
            ]
            
            for tool_dir in tool_dirs:
                if not tool_dir.exists():
                    continue
                    
                html_file = tool_dir / 'index.html'
                if not html_file.exists():
                    continue
                
                total_files += 1
                
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original = content
                
                # Find the first <script> block that contains standalone processImage
                # and remove the processImage function from it
                
                # Pattern to find standalone processImage function
                # This matches: function processImage() { ... } including nested braces
                def find_processimage_block(text):
                    start = text.find('function processImage()')
                    if start == -1:
                        return None
                    
                    # Find the opening brace
                    brace_start = text.find('{', start)
                    if brace_start == -1:
                        return None
                    
                    # Count braces to find the matching closing brace
                    brace_count = 1
                    pos = brace_start + 1
                    while brace_count > 0 and pos < len(text):
                        if text[pos] == '{':
                            brace_count += 1
                        elif text[pos] == '}':
                            brace_count -= 1
                        pos += 1
                    
                    return (start, pos)
                
                block = find_processimage_block(content)
                if block:
                    start, end = block
                    # Remove the function and trailing whitespace
                    content = content[:start] + content[end:]
                    # Clean up extra newlines
                    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
                    
                    modified_files += 1
                    print(f"✓ {html_file.relative_to(base_path)}")
                    
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(content)
    
    print(f"\n=== Summary ===")
    print(f"Total files checked: {total_files}")
    print(f"Files modified: {modified_files}")

if __name__ == '__main__':
    remove_duplicate_processimage()