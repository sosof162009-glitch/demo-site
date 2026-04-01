#!/usr/bin/env python3
"""
Remove inline <style> blocks from tool HTML files (head section only)
Moves them to styles.css instead
"""
import os
import re
from pathlib import Path

def remove_inline_styles():
    langs = ['en', 'ar', 'fr', 'es', 'de']
    base_path = Path('/root/.openclaw/workspace/demo-site')
    
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
            
            original = content
            
            # Only remove style block in head section (before </head>)
            # Pattern: <style>...</style> that's in the head section
            head_end = content.find('</head>')
            if head_end == -1:
                continue
                
            head_content = content[:head_end]
            body_content = content[head_end:]
            
            # Find style block in head only
            style_match = re.search(r'<style>.*?</style>', head_content, re.DOTALL)
            if style_match:
                # Replace with comment
                head_content = head_content[:style_match.start()] + '<!-- Tool styles moved to styles.css -->' + head_content[style_match.end():]
                content = head_content + body_content
                
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                modified_files += 1
                print(f"✓ {html_file.relative_to(base_path)}")
    
    print(f"\n=== Summary ===")
    print(f"Total files checked: {total_files}")
    print(f"Files modified: {modified_files}")

if __name__ == '__main__':
    remove_inline_styles()