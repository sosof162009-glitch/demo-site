#!/usr/bin/env python3
"""
Tailwind CSS Cleaner for 205-Tools Project
 cleans all HTML files by removing Tailwind classes and replacing with semantic CSS classes
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

# Base directory
BASE_DIR = Path("/root/.openclaw/workspace/demo-site")

# Tailwind classes mapping to semantic classes
TAILWIND_MAP = {
    # Layout
    "container": "container",
    "mx-auto": "",
    "px-4": "",
    "py-4": "",
    "p-4": "",
    "p-6": "",
    "p-8": "",
    
    # Flex
    "flex": "flex",
    "flex-col": "flex-col",
    "items-center": "items-center",
    "justify-between": "justify-between",
    "justify-center": "justify-center",
    "gap-2": "gap-2",
    "gap-4": "gap-4",
    "gap-8": "gap-8",
    "space-x-2": "",
    "space-x-8": "",
    
    # Grid
    "grid": "grid",
    "grid-cols-2": "grid-2",
    "grid-cols-3": "grid-3",
    "grid-cols-4": "grid-4",
    "grid-cols-6": "grid-6",
    "md:grid-cols-4": "",
    "md:grid-cols-6": "",
    "lg:grid-cols-6": "",
    
    # Background colors - Dark theme
    "bg-white": "",
    "bg-gray-50": "",
    "bg-gray-100": "",
    "bg-gray-200": "",
    "bg-gray-700": "",
    "bg-gray-800": "",
    "bg-gray-900": "",
    "dark:bg-gray-700": "",
    "dark:bg-gray-800": "",
    "dark:bg-gray-900": "",
    
    # Cards
    "rounded": "",
    "rounded-lg": "",
    "rounded-xl": "",
    "rounded-2xl": "",
    "rounded-full": "",
    "shadow": "",
    "shadow-sm": "",
    "shadow-lg": "",
    "shadow-xl": "",
    "hover:shadow-lg": "",
    
    # Text colors
    "text-gray-600": "",
    "text-gray-900": "",
    "dark:text-gray-300": "",
    "dark:text-gray-100": "",
    "dark:text-white": "",
    "text-white": "",
    "text-indigo-500": "text-accent",
    "text-indigo-600": "text-accent",
    "bg-indigo-500": "",
    "bg-indigo-600": "",
    "from-indigo-500": "",
    "to-purple-600": "",
    
    # Typography
    "text-sm": "",
    "text-lg": "",
    "text-xl": "",
    "text-2xl": "",
    "text-4xl": "",
    "text-5xl": "",
    "text-6xl": "",
    "font-medium": "",
    "font-semibold": "",
    "font-bold": "",
    "font-mono": "font-mono",
    "text-center": "text-center",
    "text-left": "",
    "break-all": "",
    
    # Borders
    "border": "",
    "border-2": "",
    "border-gray-300": "",
    "border-gray-600": "",
    "dark:border-gray-600": "",
    "focus:border-indigo-500": "",
    
    # Form elements
    "w-full": "w-full",
    "max-w-4xl": "",
    "max-w-7xl": "",
    "sticky": "",
    "top-0": "",
    "z-50": "",
    
    # Transitions
    "transition": "",
    "transition-all": "",
    "hover:bg-gray-300": "",
    "dark:hover:bg-gray-600": "",
    "hover:text-indigo-500": "",
    
    # Spacing helpers to remove
    "mb-1": "mb-1",
    "mb-2": "mb-2",
    "mb-4": "mb-4",
    "mb-6": "mb-4",
    "mb-8": "mb-4",
    "mt-2": "mt-2",
    "mt-4": "",
    "mr-2": "",
    "ml-2": "",
    "my-4": "",
    
    # Hidden/show
    "hidden": "hidden",
    "block": "",
    "inline-block": "",
    
    # Gradient
    "bg-gradient-to-br": "",
    "bg-gradient-to-r": "",
    "via-purple-500": "",
    "to-pink-500": "",
    "from-white/20": "",
    "bg-clip-text": "",
    "text-transparent": "",
    
    # Special
    "tool-card": "tool-card",
    "cursor-pointer": "",
    "readonly": "",
    "disabled": "",
    "resize-none": "",
}

# Elements that should have specific classes
ELEMENT_CLASSES = {
    "header": "header",
    "footer": "footer",
    "main": "main",
    "section": "section",
    "h1": "",
    "h2": "",
    "h3": "",
    "p": "",
    "a": "",
    "button": "btn",
    "input": "",
    "textarea": "",
    "select": "",
    "label": "",
}

def clean_tailwind_classes(html_content):
    """Remove Tailwind classes and replace with semantic classes"""
    
    # Pattern to find class attributes
    class_pattern = r'\sclass="([^"]*)"'
    
    def replace_classes(match):
        original_classes = match.group(1)
        classes = original_classes.split()
        
        new_classes = set()
        for cls in classes:
            # Skip responsive prefixes (md:, lg:, sm:, xl:)
            if cls.startswith(('md:', 'lg:', 'sm:', 'xl:', 'dark:')):
                base_cls = cls.split(':', 1)[1]
                if base_cls in TAILWIND_MAP and TAILWIND_MAP[base_cls]:
                    new_classes.add(TAILWIND_MAP[base_cls])
                continue
            
            # Map the class
            if cls in TAILWIND_MAP:
                mapped = TAILWIND_MAP[cls]
                if mapped:
                    new_classes.add(mapped)
            # Keep unknown classes that might be custom
            elif not cls.startswith(('hover:', 'focus:', 'active:')):
                # Keep some utility classes if they're not Tailwind
                if cls not in ['transform', 'translate-y-0', 'duration-200', 'ease-in-out']:
                    pass  # Skip unknown Tailwind-like classes
        
        # Clean up and return
        new_classes.discard('')
        if new_classes:
            return f' class="{" ".join(sorted(new_classes))}"'
        return ''
    
    # Replace all class attributes
    cleaned = re.sub(class_pattern, replace_classes, html_content)
    
    return cleaned


def add_semantic_wrappers(html_content):
    """Add semantic container classes where needed"""
    
    # Add container class to direct children of body if not present
    html_content = re.sub(
        r'(<body[^>]*>)(?!\s*<div class="container")',
        r'\1\n<div class="container">',
        html_content
    )
    
    return html_content


def remove_dark_mode_toggle(html_content):
    """Remove dark mode toggle button and related JS"""
    
    # Remove dark mode toggle button
    html_content = re.sub(
        r'<button[^>]*onclick="document\.documentElement\.classList\.toggle\([\'"]dark[\'"]\)[^"]*"[^>]*>[^<]*</button>',
        '',
        html_content,
        flags=re.IGNORECASE
    )
    
    # Remove 🌙 button
    html_content = re.sub(
        r'<button[^>]*>🌙</button>',
        '',
        html_content
    )
    
    # Remove dark class from html tag
    html_content = re.sub(
        r'<html([^>]*)class="dark"',
        r'<html\1',
        html_content
    )
    
    return html_content


def convert_faq_to_details(html_content, lang='en'):
    """Convert FAQ section to native details/summary elements"""
    
    # Check if already has details elements
    if '<details>' in html_content:
        return html_content
    
    # Find FAQ section and convert
    # This is a simplified version - the actual conversion happens in the update script
    
    return html_content


def add_hreflang_xdefault(html_content, lang, tool_name):
    """Add hreflang x-default pointing to /en/ version"""
    
    if 'hreflang="x-default"' in html_content:
        return html_content
    
    # Find existing hreflang tags
    if '<link rel="alternate" hreflang="en"' in html_content:
        # Add x-default after en
        html_content = re.sub(
            r'(<link rel="alternate" hreflang="en"[^>]*>)',
            r'\1\n    <link rel="alternate" hreflang="x-default" href="https://tools-205-cl18xmzs1-sas-projects-611869a5.vercel.app/en/' + tool_name + '/">',
            html_content
        )
    else:
        # Add x-default in head
        html_content = re.sub(
            r'(</head>)',
            r'    <link rel="alternate" hreflang="x-default" href="https://tools-205-cl18xmzs1-sas-projects-611869a5.vercel.app/en/' + tool_name + '/">\n\1',
            html_content
        )
    
    return html_content


def process_file(filepath):
    """Process a single HTML file"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_length = len(content)
        
        # Extract lang and tool name from path
        parts = filepath.parts
        lang = parts[-3] if len(parts) >= 3 else 'en'
        tool_name = parts[-2] if len(parts) >= 2 else 'tool'
        
        # 1. Clean Tailwind classes
        content = clean_tailwind_classes(content)
        
        # 2. Remove dark mode toggle
        content = remove_dark_mode_toggle(content)
        
        # 3. Convert FAQ
        content = convert_faq_to_details(content, lang)
        
        # 4. Add hreflang x-default
        content = add_hreflang_xdefault(content, lang, tool_name)
        
        # 5. Add semantic wrappers
        content = add_semantic_wrappers(content)
        
        new_length = len(content)
        reduction = ((original_length - new_length) / original_length) * 100 if original_length > 0 else 0
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return {
            'file': str(filepath),
            'original_size': original_length,
            'new_size': new_length,
            'reduction': round(reduction, 2),
            'status': 'success'
        }
        
    except Exception as e:
        return {
            'file': str(filepath),
            'status': 'error',
            'error': str(e)
        }


def main():
    """Main function to process all HTML files"""
    
    results = []
    stats = {
        'total': 0,
        'success': 0,
        'errors': 0,
        'total_original_size': 0,
        'total_new_size': 0
    }
    
    # Find all HTML files in language directories
    languages = ['en', 'ar', 'fr', 'es', 'de']
    
    for lang in languages:
        lang_dir = BASE_DIR / lang
        if not lang_dir.exists():
            continue
        
        # Find all index.html files in tool directories
        for tool_dir in lang_dir.iterdir():
            if not tool_dir.is_dir():
                continue
            
            html_file = tool_dir / 'index.html'
            if html_file.exists():
                result = process_file(html_file)
                results.append(result)
                
                stats['total'] += 1
                if result['status'] == 'success':
                    stats['success'] += 1
                    stats['total_original_size'] += result.get('original_size', 0)
                    stats['total_new_size'] += result.get('new_size', 0)
                else:
                    stats['errors'] += 1
                
                # Progress indicator
                if stats['total'] % 100 == 0:
                    print(f"Processed {stats['total']} files...")
    
    # Save results
    with open(BASE_DIR / 'cleanup-results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "="*60)
    print("📊 Tailwind Cleanup Summary")
    print("="*60)
    print(f"Total files processed: {stats['total']}")
    print(f"✅ Successful: {stats['success']}")
    print(f"❌ Errors: {stats['errors']}")
    
    if stats['total_original_size'] > 0:
        total_reduction = ((stats['total_original_size'] - stats['total_new_size']) / stats['total_original_size']) * 100
        print(f"📦 Total size reduction: {total_reduction:.2f}%")
        print(f"   Original: {stats['total_original_size'] / 1024:.2f} KB")
        print(f"   New: {stats['total_new_size'] / 1024:.2f} KB")
    
    print("="*60)
    print(f"Results saved to: cleanup-results.json")


if __name__ == "__main__":
    main()
