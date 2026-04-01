#!/usr/bin/env python3
"""
Remove dark mode toggle and theme code from tool HTML files
"""
import os
import re
from pathlib import Path

def remove_dark_mode():
    langs = ['en', 'ar', 'fr', 'es', 'de']
    base_path = Path('/root/.openclaw/workspace/demo-site')
    
    total_files = 0
    modified_files = 0
    
    for lang in langs:
        lang_path = base_path / lang
        if not lang_path.exists():
            continue
            
        for html_file in lang_path.rglob('*.html'):
            # Skip index.html
            if html_file.name == 'index.html' and html_file.parent.name == lang:
                continue
                
            total_files += 1
            
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Remove theme toggle button from header
            # Pattern: <button onclick="document.documentElement.classList.toggle('dark')"...</button>
            content = re.sub(
                r'<button[^>]*onclick="[^"]*classList\.toggle\([\'"]dark[\'"]\)[^"]*"[^>]*>.*?</button>',
                '',
                content,
                flags=re.DOTALL
            )
            
            # Remove localStorage theme check
            # Pattern: if (localStorage.theme === 'dark' || ...)
            content = re.sub(
                r"if\s*\(\s*localStorage\.theme\s*===\s*[\'\"]dark[\'\"]\s*||.*?\)\s*\{[^}]*\}",
                '',
                content,
                flags=re.DOTALL
            )
            
            # Remove class="dark" from html tag
            content = re.sub(r'\s*class=[\'"]dark[\'"]', '', content)
            
            # Remove theme-icon related code
            content = re.sub(
                r"document\.getElementById\([\'\"]theme-icon[\'\"]\)\.textContent\s*=\s*[\'\"][^\'\"]*[\'\"];",
                '',
                content
            )
            
            if content != original:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                modified_files += 1
                print(f"✓ {html_file.relative_to(base_path)}")
    
    print(f"\n=== Summary ===")
    print(f"Total files checked: {total_files}")
    print(f"Files modified: {modified_files}")

if __name__ == '__main__':
    remove_dark_mode()