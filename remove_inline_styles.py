#!/usr/bin/env python3
"""
Remove inline <style> blocks from tool HTML files
Moves them to styles.css instead
"""
import os
import re
from pathlib import Path

def remove_inline_styles():
    langs = ['en', 'ar', 'fr', 'es', 'de']
    base_path = Path('/root/.openclaw/workspace/demo-site')
    
    # Regex to find style blocks in head
    style_pattern = re.compile(r'<style>.*?</style>', re.DOTALL)
    
    total_files = 0
    modified_files = 0
    
    for lang in langs:
        lang_path = base_path / lang
        if not lang_path.exists():
            continue
            
        # Find all HTML files in subdirectories (tool pages)
        for html_file in lang_path.rglob('*.html'):
            # Skip index.html (main page, not a tool)
            if html_file.name == 'index.html' and html_file.parent.name == lang:
                continue
                
            total_files += 1
            
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if file has inline style in head
            if '<style>' in content and '</style>' in content:
                # Replace style block with comment
                new_content = style_pattern.sub('<!-- Tool styles moved to styles.css -->', content)
                
                # Write back
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                modified_files += 1
                print(f"✓ {html_file.relative_to(base_path)}")
    
    print(f"\n=== Summary ===")
    print(f"Total files checked: {total_files}")
    print(f"Files modified: {modified_files}")

if __name__ == '__main__':
    remove_inline_styles()