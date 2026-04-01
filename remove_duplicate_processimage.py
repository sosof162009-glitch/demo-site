#!/usr/bin/env python3
"""
Remove duplicate processImage function from image converter tools
Keep only initImageConverter
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
                
                # Find and remove the standalone processImage function
                # Pattern: function processImage() { ... } before initImageConverter
                # This is tricky - we need to remove the first occurrence only
                
                # Look for the pattern where processImage is defined standalone
                # and remove everything up to initImageConverter
                
                # Pattern to match the duplicate processImage function
                pattern = r'function\s+processImage\s*\(\s*\)\s*\{[^}]*\{[^}]*\}[^}]*\}'
                
                # Find all matches
                matches = list(re.finditer(pattern, content, re.DOTALL))
                
                if len(matches) >= 2:
                    # Remove the first occurrence (the standalone one)
                    first_match = matches[0]
                    start, end = first_match.span()
                    content = content[:start] + content[end:]
                    modified_files += 1
                    print(f"✓ {html_file.relative_to(base_path)}")
                
                if content != original:
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(content)
    
    print(f"\n=== Summary ===")
    print(f"Total files checked: {total_files}")
    print(f"Files modified: {modified_files}")

if __name__ == '__main__':
    remove_duplicate_processimage()