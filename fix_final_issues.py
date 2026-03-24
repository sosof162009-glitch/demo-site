#!/usr/bin/env python3
"""
Comprehensive HTML Fix Script
- Move JavaScript from <head> to end of <body>
- Fix Copy/Download buttons to use "btn" class
- Fix strength bar HTML
- Add remaining mappings
"""

import re
from pathlib import Path
from collections import Counter

BASE_DIR = Path("/root/.openclaw/workspace/demo-site")

# Additional mappings for remaining classes
ADDITIONAL_MAPPINGS = {
    "text-yellow-700": "t-text-warning-dark",
    "text-yellow-600": "t-text-warning-dark",
    "bg-yellow-500": "t-state-warning-solid",
    "copy-btn": "btn",
    "tip-btn": "btn",
    "md:grid-cols-1": "",  # Remove - single column is default
}

def fix_html_file(filepath):
    """Fix a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find and extract JavaScript from head
        head_match = re.search(r'(<head>.*?)(<script>.*?</script>)(.*?)(<link[^>]*styles\.css[^>]*>)(.*?</head>)', content, re.DOTALL)
        
        if head_match:
            # Extract the script
            script_content = head_match.group(2)
            
            # Reconstruct head without the script
            new_head = head_match.group(1) + head_match.group(3) + head_match.group(4) + head_match.group(5)
            content = content.replace(head_match.group(0), new_head)
            
            # Add script before </body>
            content = content.replace('</body>', script_content + '\n</body>')
        
        # Fix Copy/Download buttons - add "btn" class if missing
        # Pattern: onclick="copy..." or onclick="download..." without btn class
        content = re.sub(
            r'(<button[^>]*onclick="(copy|download)[^"]*"[^>]*class="[^"]*)(?<![\'"])btn(?![\'"])([^"]*")',
            r'\1btn\3',
            content,
            flags=re.IGNORECASE
        )
        
        # Fix buttons that have copy/download onclick but no btn class at all
        def fix_button_classes(match):
            full_tag = match.group(0)
            if 'btn' not in full_tag:
                # Add btn class
                full_tag = full_tag.replace('class="', 'class="btn ')
            return full_tag
        
        content = re.sub(
            r'<button[^>]*onclick="[^"]*copy[^"]*"[^>]*class="[^"]*"[^>]*>',
            fix_button_classes,
            content,
            flags=re.IGNORECASE
        )
        
        content = re.sub(
            r'<button[^>]*onclick="[^"]*download[^"]*"[^>]*class="[^"]*"[^>]*>',
            fix_button_classes,
            content,
            flags=re.IGNORECASE
        )
        
        # Fix strength bar HTML
        # Old pattern: <div class="t-rounded-full"> <div id="strengthBar" class="t-transition" style="width: 0%"></div> </div>
        content = re.sub(
            r'<div[^>]*class="[^"]*t-rounded-full[^"]*"[^>]*>\s*<div[^>]*id="strengthBar"[^>]*class="[^"]*t-transition[^"]*"[^>]*style="[^"]*width:\s*0%[^"]*"[^>]*>',
            '<div class="t-strength-bar"><div id="strengthBar" class="t-strength-fill" style="width:0%;background:var(--error)"',
            content
        )
        
        # Apply additional mappings
        for old_class, new_class in ADDITIONAL_MAPPINGS.items():
            if new_class:
                content = content.replace(f'class="{old_class}"', f'class="{new_class}"')
                content = content.replace(f'class="{old_class} ', f'class="{new_class} ')
                content = content.replace(f' {old_class}"', f' {new_class}"')
            else:
                # Remove the class
                content = re.sub(rf'\s?{re.escape(old_class)}', '', content)
        
        # Fix remaining custom classes
        content = content.replace('cmyk-bar', 't-cmyk-bar')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False


def main():
    """Main function to process all HTML files"""
    
    files_processed = 0
    languages = ['en', 'ar', 'fr', 'es', 'de']
    
    for lang in languages:
        lang_dir = BASE_DIR / lang
        if not lang_dir.exists():
            continue
        
        for tool_dir in lang_dir.iterdir():
            if not tool_dir.is_dir():
                continue
            
            html_file = tool_dir / 'index.html'
            if html_file.exists():
                if fix_html_file(html_file):
                    files_processed += 1
                
                if files_processed % 100 == 0:
                    print(f"Processed {files_processed} files...")
    
    print(f"\n✅ Fixed {files_processed} files")


if __name__ == "__main__":
    main()
