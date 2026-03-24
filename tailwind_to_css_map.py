#!/usr/bin/env python3
"""
Tailwind to CSS Classes Converter
Converts Tailwind classes to t-* classes in all HTML files
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict, Counter

BASE_DIR = Path("/root/.openclaw/workspace/demo-site")

# Complete Tailwind -> CSS mapping
TAILWIND_TO_CSS = {
    # Typography Sizes
    "text-xs": "t-text-xs",
    "text-sm": "t-text-sm",
    "text-base": "t-text-base",
    "text-lg": "t-text-lg",
    "text-xl": "t-text-xl",
    "text-2xl": "t-text-2xl",
    "text-3xl": "t-text-3xl",
    "text-4xl": "t-text-4xl",
    "text-5xl": "t-text-5xl",
    "text-6xl": "t-text-6xl",
    
    # Font Weights
    "font-normal": "t-font-normal",
    "font-medium": "t-font-medium",
    "font-semibold": "t-font-semibold",
    "font-bold": "t-font-bold",
    "font-mono": "t-font-mono",
    
    # Text Alignment
    "text-center": "t-text-center",
    "text-left": "t-text-left",
    "text-right": "t-text-right",
    
    # Text Colors
    "text-gray-400": "t-text-muted-light",
    "text-gray-500": "t-text-muted",
    "text-gray-600": "t-text-muted",
    "text-gray-900": "t-text-primary",
    "text-white": "t-text-primary",
    
    # Layout - Containers
    "container": "t-container",
    "mx-auto": "",
    
    # Display
    "block": "t-block",
    "inline-block": "t-inline-block",
    "hidden": "t-hidden",
    "w-full": "t-w-full",
    
    # Site Header
    "sticky": "t-site-header",
    "top-0": "",
    "z-50": "",
    
    # Spacing - Margin Bottom
    "mb-1": "t-mb-xs",
    "mb-2": "t-mb-sm",
    "mb-3": "t-mb-sm",
    "mb-4": "t-mb-md",
    "mb-6": "t-mb-lg",
    "mb-8": "t-mb-xl",
    "mb-12": "t-mb-2xl",
    
    # Spacing - Margin Top
    "mt-1": "t-mt-xs",
    "mt-2": "t-mt-sm",
    "mt-4": "t-mt-md",
    
    # Spacing - Margin X
    "mr-2": "t-mr-sm",
    "ml-2": "t-ml-sm",
    
    # Spacing - Margin Y
    "my-4": "t-my-md",
    
    # Spacing - Padding
    "p-2": "t-p-xs",
    "p-4": "t-p-md",
    "p-6": "t-p-lg",
    "p-8": "t-p-xl",
    
    # Spacing - Padding X/Y
    "px-4": "t-px-md",
    "py-1": "t-py-xs",
    "py-3": "t-py-sm",
    "py-4": "t-py-md",
    "py-8": "t-py-lg",
    "py-12": "t-py-xl",
    
    # Flexbox
    "flex": "t-flex",
    "flex-col": "t-flex-col",
    "items-center": "t-items-center",
    "justify-center": "t-justify-center",
    "justify-between": "t-justify-between",
    "gap-2": "t-gap-sm",
    "gap-4": "t-gap-md",
    "gap-8": "t-gap-lg",
    
    # Space X (child selectors)
    "space-x-2": "t-space-x-sm",
    "space-x-3": "t-space-x-md",
    "space-x-8": "t-space-x-lg",
    
    # Grid
    "grid": "t-grid",
    "grid-cols-2": "t-grid-2",
    "grid-cols-3": "t-grid-3",
    "grid-cols-4": "t-grid-4",
    "grid-cols-6": "t-grid-6",
    
    # Responsive Grid
    "md:grid-cols-2": "t-grid-md-2",
    "md:grid-cols-4": "t-grid-md-4",
    "md:grid-cols-6": "t-grid-md-6",
    "lg:grid-cols-6": "t-grid-lg-6",
    
    # Cards
    "bg-white": "t-card",
    "dark:bg-gray-800": "t-card",
    "dark:bg-gray-700": "t-card-hover",
    "dark:bg-gray-900": "t-page-wrapper",
    
    # Borders & Radius
    "rounded": "t-rounded-sm",
    "rounded-lg": "t-rounded",
    "rounded-xl": "t-rounded-lg",
    "rounded-2xl": "t-rounded-xl",
    "rounded-full": "t-rounded-full",
    
    # Shadows
    "shadow-sm": "t-shadow-sm",
    "shadow-lg": "t-shadow",
    "shadow-xl": "t-shadow-lg",
    
    # Transitions
    "transition-all": "t-transition",
    "transition-colors": "t-transition-colors",
    "hover:shadow-lg": "t-hover-shadow",
    "hover:border-primary": "t-hover-accent",
    "dark:hover:bg-gray-600": "t-hover-surface",
    
    # Tool Card
    "tool-card": "t-tool-card",
    
    # Responsive Typography
    "md:text-5xl": "t-text-md-5xl",
}

# Classes to remove (not needed in dark-only theme)
CLASSES_TO_REMOVE = [
    "bg-white", "bg-gray-50", "bg-gray-100", "bg-gray-200",
    "dark:bg-gray-800/50", "bg-white/20", "text-white/90",
    "bg-gradient-to-r", "bg-gradient-to-br", "from-indigo-500",
    "to-purple-600", "via-purple-500", "to-pink-500",
    "bg-clip-text", "text-transparent", "from-white/20",
    "bg-gray-700", "dark:bg-gray-700", "dark:bg-gray-800",
    "text-gray-900", "dark:text-gray-100", "dark:text-gray-300",
    "dark:text-gray-400", "dark:text-white", "text-gray-500",
    "dark:border-gray-700", "dark:border-gray-600",
    "border-gray-200", "border-gray-300", "border-gray-600",
    "focus:border-indigo-500", "hover:text-indigo-500",
    "hover:bg-gray-300", "dark:hover:bg-gray-600",
    "bg-indigo-100", "dark:bg-indigo-900",
    "text-emerald-600", "dark:text-emerald-400",
    "h-16", "min-h-screen", "h-5", "w-5", "w-16",
    "transform", "translate-y-0", "duration-200", "ease-in-out",
    "max-w-7xl", "max-w-6xl", "max-w-5xl", "max-w-4xl",
    "px-4", "sm:px-6", "lg:px-8", "py-12", "py-8",
    "bg-gray-50", "bg-gray-100",
]

unmatched_classes = Counter()
files_processed = 0
classes_converted = 0
classes_removed = 0

def convert_classes(class_string):
    """Convert Tailwind classes to CSS classes"""
    global classes_converted, classes_removed
    
    classes = class_string.split()
    new_classes = []
    
    for cls in classes:
        # Skip classes that should be removed
        if cls in CLASSES_TO_REMOVE:
            classes_removed += 1
            continue
        
        # Check for responsive prefixes
        if cls.startswith(('md:', 'lg:', 'sm:', 'xl:')):
            base_cls = cls
            if base_cls in TAILWIND_TO_CSS:
                mapped = TAILWIND_TO_CSS[base_cls]
                if mapped:
                    new_classes.append(mapped)
                    classes_converted += 1
                else:
                    classes_removed += 1
                continue
        
        # Map the class
        if cls in TAILWIND_TO_CSS:
            mapped = TAILWIND_TO_CSS[cls]
            if mapped:
                new_classes.append(mapped)
                classes_converted += 1
            else:
                classes_removed += 1
        else:
            # Keep custom classes (not Tailwind)
            if not cls.startswith(('hover:', 'focus:', 'active:', 'dark:')):
                new_classes.append(cls)
            else:
                classes_removed += 1
                unmatched_classes[cls] += 1
    
    return " ".join(new_classes) if new_classes else ""


def process_html_file(filepath):
    """Process a single HTML file"""
    global files_processed
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove Tailwind CDN
        content = re.sub(r'<script src="https://cdn\.tailwindcss\.com"></script>\n?', '', content)
        content = re.sub(r'<script>[^<]*tailwind\.config[^<]*</script>\n?', '', content, flags=re.DOTALL)
        
        # Add local CSS link if not present
        if 'styles.css' not in content:
            css_link = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">'''
            content = re.sub(r'(</head>)', css_link + '\n\1', content)
        
        # Remove dark mode toggle
        content = re.sub(r'<button[^>]*onclick="document\.documentElement\.classList\.toggle\(\'dark\'\)[^"]*"[^>]*>[^<]*</button>\n?', '', content, flags=re.IGNORECASE)
        content = re.sub(r'<button[^>]*>🌙</button>\n?', '', content)
        
        # Remove dark class from html
        content = re.sub(r'<html([^>]*)class="dark"', r'<html\1', content)
        
        # Convert class attributes
        def replace_classes(match):
            class_content = match.group(1)
            new_classes = convert_classes(class_content)
            if new_classes:
                return f' class="{new_classes}"'
            return ''
        
        content = re.sub(r'\sclass="([^"]*)"', replace_classes, content)
        
        # Clean up empty class attributes
        content = re.sub(r'\sclass=""', '', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        files_processed += 1
        return True
        
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False


def main():
    """Main function to process all HTML files"""
    
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
                process_html_file(html_file)
                
                if files_processed % 100 == 0:
                    print(f"Processed {files_processed} files...")
    
    # Save report
    report = {
        "files_processed": files_processed,
        "classes_converted": classes_converted,
        "classes_removed": classes_removed,
        "unmatched_classes": dict(unmatched_classes.most_common(50))
    }
    
    with open(BASE_DIR / 'conversion-report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "="*60)
    print("📊 Conversion Summary")
    print("="*60)
    print(f"Files processed: {files_processed}")
    print(f"Classes converted: {classes_converted}")
    print(f"Classes removed: {classes_removed}")
    print(f"Unmatched classes: {len(unmatched_classes)}")
    print("="*60)
    
    if unmatched_classes:
        print("\n⚠️  Top 20 Unmatched Classes:")
        for cls, count in unmatched_classes.most_common(20):
            print(f"  {cls}: {count}")


if __name__ == "__main__":
    main()
