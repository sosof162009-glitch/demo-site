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
    "mx-auto": "t-container",
    "max-w-4xl": "t-container-sm",
    "max-w-5xl": "t-container-md", 
    "max-w-6xl": "t-container-lg",
    "max-w-7xl": "t-container",
    "px-4": "",
    "sm:px-6": "",
    "lg:px-8": "",
    
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
    "mt-6": "t-mt-lg",
    "mt-8": "t-mt-xl",
    
    # Spacing - Margin X
    "mr-2": "t-mr-sm",
    "ml-2": "t-ml-sm",
    "mr-3": "t-mr-sm",
    
    # Spacing - Margin Y
    "my-4": "t-my-md",
    
    # Spacing - Padding
    "p-1": "t-p-xs",
    "p-2": "t-p-xs",
    "p-3": "t-p-sm",
    "p-4": "t-p-md",
    "p-6": "t-p-lg",
    "p-8": "t-p-xl",
    "p-12": "t-p-2xl",
    
    # Spacing - Padding X/Y
    "px-3": "t-px-sm",
    "px-4": "t-px-md",
    "px-6": "t-px-lg",
    "px-8": "t-px-xl",
    "py-1": "t-py-xs",
    "py-2": "t-py-xs",
    "py-3": "t-py-sm",
    "py-4": "t-py-md",
    "py-6": "t-py-lg",
    "py-8": "t-py-lg",
    "py-10": "t-py-lg",
    "py-12": "t-py-xl",
    "py-16": "t-py-2xl",
    
    # Flexbox
    "flex": "t-flex",
    "flex-col": "t-flex-col",
    "items-center": "t-items-center",
    "justify-center": "t-justify-center",
    "justify-between": "t-justify-between",
    "gap-2": "t-gap-sm",
    "gap-4": "t-gap-md",
    "gap-6": "t-gap-lg",
    "gap-8": "t-gap-lg",
    "gap-1": "t-gap-xs",
    "gap-3": "t-gap-md",
    
    # Space X/Y (child selectors)
    "space-x-2": "t-space-x-sm",
    "space-x-3": "t-space-x-md",
    "space-x-8": "t-space-x-lg",
    "space-y-2": "t-space-y-sm",
    "space-y-3": "t-space-y-md",
    "space-y-4": "t-space-y-md",
    "space-y-6": "t-space-y-lg",
    
    # Grid
    "grid": "t-grid",
    "grid-cols-2": "t-grid-2",
    "grid-cols-3": "t-grid-3",
    "grid-cols-4": "t-grid-4",
    "grid-cols-6": "t-grid-6",
    "grid-cols-7": "t-grid-7",
    
    # Responsive Grid
    "md:grid-cols-2": "t-grid-md-2",
    "md:grid-cols-3": "t-grid-md-3",
    "md:grid-cols-4": "t-grid-md-4",
    "md:grid-cols-6": "t-grid-md-6",
    "lg:grid-cols-3": "t-grid-lg-3",
    "lg:grid-cols-6": "t-grid-lg-6",
    
    # Grid Columns
    "lg:col-span-1": "t-col-span-1",
    "lg:col-span-2": "t-col-span-2",
    
    # Cards
    "card": "t-card",
    "bg-white": "t-card",
    "dark:bg-gray-800": "t-card",
    "dark:bg-gray-700": "t-card-hover",
    "dark:bg-gray-900": "t-page-wrapper",
    "bg-gray-900": "t-surface",
    
    # Borders & Radius
    "border": "t-border",
    "rounded": "t-rounded-sm",
    "rounded-lg": "t-rounded",
    "rounded-xl": "t-rounded-lg",
    "rounded-2xl": "t-rounded-xl",
    "rounded-full": "t-rounded-full",
    "border-2": "t-border-2",
    "border-4": "t-border-4",
    "border-b": "t-border-b",
    "border-t": "t-border-t",
    "border-none": "t-border-none",
    "border-dashed": "t-border-dashed",
    
    # Shadows
    "shadow-sm": "t-shadow-sm",
    "shadow-lg": "t-shadow",
    "shadow-xl": "t-shadow-lg",
    "shadow-2xl": "t-shadow-2xl",
    "shadow-inner": "t-shadow-inner",
    
    # Transitions
    "transition-all": "t-transition",
    "transition-colors": "t-transition-colors",
    "hover:shadow-lg": "t-hover-shadow",
    "hover:border-primary": "t-hover-accent",
    "dark:hover:bg-gray-600": "t-hover-surface",
    
    # Tool Card
    "tool-card": "t-tool-card",
    "stat-card": "t-stat-card",
    "upload-zone": "t-upload-zone",
    
    # Responsive Typography
    "md:text-5xl": "t-text-md-5xl",
    
    # Responsive Flex
    "sm:flex-row": "t-flex-sm-row",
    
    # Flex utilities
    "flex-wrap": "t-flex-wrap",
    "flex-1": "t-flex-1",
    "flex-shrink-0": "t-flex-shrink-0",
    "items-end": "t-items-end",
    
    # Text utilities
    "truncate": "t-truncate",
    "break-all": "t-break-all",
    "uppercase": "t-uppercase",
    "capitalize": "t-capitalize",
    "leading-relaxed": "t-leading-relaxed",
    
    # Form utilities
    "resize-none": "t-resize-none",
    "cursor-pointer": "t-cursor-pointer",
    
    # Opacity
    "opacity-50": "t-opacity-50",
    
    # Overflow
    "overflow-x-auto": "t-overflow-x-auto",
    
    # Min width
    "min-w-0": "t-min-w-0",
    
    # Background
    "bg-transparent": "t-bg-transparent",
    
    # Position
    "relative": "t-relative",
    "absolute": "t-absolute",
    "fixed": "t-fixed",
    "inset-0": "t-inset-0",
    
    # Animation
    "animate-spin": "t-animate-spin",
    
    # Container XS
    "max-w-2xl": "t-container-xs",
    "max-w-sm": "t-container-xs",
    
    # Text Colors (Semantic)
    "text-red-500": "t-text-error",
    "text-red-600": "t-text-error",
    "text-green-500": "t-text-success",
    "text-green-400": "t-text-success-light",
    "text-green-600": "t-text-success",
    "text-blue-500": "t-text-accent",
    "text-amber-600": "t-text-warning",
    "text-emerald-500": "t-text-success",
    "text-indigo-600": "t-text-accent",
    "text-purple-600": "t-text-accent",
    "text-blue-600": "t-text-accent",
    
    # Background States
    "bg-red-100": "t-state-error",
    "bg-green-100": "t-state-success",
    "bg-green-50": "t-state-success-light",
    "bg-blue-100": "t-state-info",
    "bg-blue-50": "t-state-info-light",
    "bg-purple-100": "t-state-purple",
    "bg-purple-50": "t-state-purple-light",
    "bg-pink-100": "t-state-pink",
    "bg-emerald-100": "t-state-success",
    "bg-yellow-50": "t-state-warning-light",
    "bg-indigo-50": "t-state-info-light",
    # Gray surfaces
    "bg-gray-50": "t-surface-2",
    "bg-gray-100": "t-surface-3",
    "bg-gray-200": "t-surface-4",
    
    # Border States
    "border-red-200": "t-state-error",
    "border-red-500": "t-border-error",
    
    # Responsive Flex
    "md:flex": "t-flex-md",
    
    # Focus
    "focus:outline-none": "t-focus-none",
}

# Classes to remove (not needed in dark-only theme)
CLASSES_TO_REMOVE = [
    # Gradients
    "bg-gradient-to-r", "bg-gradient-to-br", "from-indigo-500",
    "to-purple-600", "via-purple-500", "to-pink-500",
    "bg-clip-text", "text-transparent", "from-white/20",
    "from-blue-500", "from-red-500", "from-emerald-500",
    "to-orange-500", "to-cyan-500", "to-amber-500",
    "via-teal-500", "via-orange-500", "via-purple-600",
    "from-blue-600",
    # Dark mode variants
    "bg-gray-700", "dark:bg-gray-600", "dark:bg-gray-700", "dark:bg-gray-800",
    "text-gray-900", "dark:text-gray-100", "dark:text-gray-300",
    "dark:text-gray-400", "dark:text-white", "text-gray-500",
    "dark:border-gray-700", "dark:border-gray-600",
    "border-gray-200", "border-gray-300", "border-gray-600",
    "focus:border-indigo-500", "hover:text-indigo-500",
    "hover:bg-gray-300", "dark:hover:bg-gray-600",
    "bg-indigo-100", "dark:bg-indigo-900",
    "text-emerald-600", "dark:text-emerald-400",
    "dark:bg-gray-800/50", "bg-white/20", "text-white/90",
    # Dark mode with opacity
    "dark:bg-blue-900/30", "dark:bg-red-900/30", "dark:bg-green-900/30",
    "dark:bg-purple-900/30", "dark:bg-pink-900/30", "dark:hover:bg-red-900/50",
    "dark:bg-emerald-900/30", "dark:hover:bg-emerald-900/50",
    "dark:bg-blue-900/20", "dark:bg-green-900/20",
    "dark:bg-purple-900/20", "dark:bg-yellow-900/20",
    "dark:bg-indigo-900/20", "dark:hover:bg-indigo-900/30",
    "dark:text-amber-400", "dark:text-red-400", "dark:text-green-400",
    "dark:text-indigo-400", "dark:text-yellow-400", "dark:text-purple-400",
    # Old hover colors
    "hover:border-blue-500", "hover:bg-gray-200", "hover:text-red-600",
    "hover:text-red-500", "hover:bg-red-200", "hover:bg-green-600",
    "hover:bg-blue-600", "hover:text-blue-500", "hover:shadow-blue-500/25",
    "hover:border-red-400", "hover:text-pink-500",
    "hover:bg-red-600", "hover:bg-indigo-600",
    "hover:bg-emerald-200", "hover:text-emerald-500",
    "hover:bg-indigo-100", "hover:bg-indigo-500",
    # Width/Height fixed sizes
    "h-16", "min-h-screen", "h-5", "w-5", "w-16",
    "h-2", "h-4", "h-8", "h-10", "h-12", "h-20", "h-24", "h-32", "h-80",
    "w-2", "w-4", "w-8", "w-10", "w-12", "w-20", "w-24", "w-32",
    "w-8", "w-10", "w-20",
    # Positioning helpers
    "left-1/2", "top-1/2", "top-24", "bottom-8",
    "-translate-x-1/2", "-translate-y-1/2",
    # Colors
    "bg-blue-500", "bg-red-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500",
    # Effects
    "opacity-25", "opacity-75", "backdrop-blur-sm",
    "border-t-transparent", "border-white",
    # Animation helpers
    "transform", "translate-y-0", "duration-200", "ease-in-out",
    # Invalid classes
    "op", "||",
    # Responsive padding/margin that we don't need
    "sm:px-6", "lg:px-8", "py-12", "py-8",
]

def convert_classes(class_string, unmatched_counter):
    """Convert Tailwind classes to CSS classes"""
    classes = class_string.split()
    new_classes = []
    converted = 0
    removed = 0
    
    # Check if we have specialized container (t-container-sm, t-container-md, etc.)
    has_specialized_container = any(c in classes for c in ['t-container-sm', 't-container-md', 't-container-lg', 't-container-xs'])
    
    # Check if this is a generate button that needs 'btn' class
    is_generate_button = False
    if 't-w-full' in classes and 't-py-md' in classes and 't-text-primary' in classes and 't-rounded-lg' in classes:
        is_generate_button = True
    
    for cls in classes:
        # Skip classes that should be removed
        if cls in CLASSES_TO_REMOVE:
            removed += 1
            continue
        
        # If we have specialized container, skip generic t-container and t-px-md
        if has_specialized_container and cls in ['t-container', 't-px-md', 't-px-lg', 't-px-xl', 't-px-sm']:
            removed += 1
            continue
        
        # If this is a generate button, replace the long class list with 'btn'
        if is_generate_button and cls in ['t-w-full', 't-py-md', 't-text-primary', 't-rounded-lg', 
                                           't-font-semibold', 't-text-lg', 't-hover-shadow', 
                                           't-transition', 't-mb-xl']:
            removed += 1
            continue
        
        # Check for responsive prefixes
        if cls.startswith(('md:', 'lg:', 'sm:', 'xl:')):
            if cls in TAILWIND_TO_CSS:
                mapped = TAILWIND_TO_CSS[cls]
                if mapped:
                    new_classes.append(mapped)
                    converted += 1
                else:
                    removed += 1
                continue
            else:
                # Unmatched responsive class
                removed += 1
                unmatched_counter[cls] += 1
                continue
        
        # Map the class
        if cls in TAILWIND_TO_CSS:
            mapped = TAILWIND_TO_CSS[cls]
            if mapped:
                # If this is a generate button, add 'btn' class
                if is_generate_button and not any('btn' in c for c in new_classes):
                    new_classes.append('btn')
                    converted += 1
                new_classes.append(mapped)
                converted += 1
            else:
                removed += 1
        else:
            # Check if it's a Tailwind class (has hyphens and lowercase)
            if '-' in cls and cls.islower() and not cls.startswith(('t-', 'js-')):
                # Likely a Tailwind class we missed
                removed += 1
                unmatched_counter[cls] += 1
            else:
                # Keep custom classes
                new_classes.append(cls)
    
    # Add 'btn' class for generate buttons if not already added
    if is_generate_button and 'btn' not in new_classes:
        new_classes.insert(0, 'btn')
        converted += 1
    
    # Remove duplicates from new_classes while preserving order
    seen = set()
    deduped_classes = []
    for c in new_classes:
        if c not in seen:
            seen.add(c)
            deduped_classes.append(c)
    new_classes = deduped_classes
    
    return " ".join(new_classes) if new_classes else "", converted, removed


def process_html_file(filepath, unmatched_counter):
    """Process a single HTML file"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove Tailwind CDN
        content = re.sub(r'<script src="https://cdn\.tailwindcss\.com"></script>\n?', '', content)
        content = re.sub(r'<script>[^\u003c]*tailwind\.config[^\u003c]*</script>\n?', '', content, flags=re.DOTALL)
        
        # Add local CSS link if not present
        if 'styles.css' not in content:
            css_link = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">'''
            content = re.sub(r'(</head>)', css_link + '\n\1', content)
        
        # Remove dark mode toggle
        content = re.sub(r'<button[^\u003e]*onclick="document\.documentElement\.classList\.toggle\(\'dark\'\)[^"]*"[^\u003e]*>[^\u003c]*</button>\n?', '', content, flags=re.IGNORECASE)
        content = re.sub(r'<button[^\u003e]*>🌙</button>\n?', '', content)
        
        # Remove dark class from html
        content = re.sub(r'<html([^\u003e]*)class="dark"', r'<html\1', content)
        
        # Convert class attributes
        total_converted = 0
        total_removed = 0
        
        def replace_classes(match):
            nonlocal total_converted, total_removed
            class_content = match.group(1)
            new_classes, c, r = convert_classes(class_content, unmatched_counter)
            total_converted += c
            total_removed += r
            if new_classes:
                return f' class="{new_classes}"'
            return ''
        
        content = re.sub(r'\sclass="([^"]*)"', replace_classes, content)
        
        # Clean up empty class attributes
        content = re.sub(r'\sclass=""', '', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True, total_converted, total_removed
        
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False, 0, 0


def main():
    """Main function to process all HTML files"""
    
    unmatched_classes = Counter()
    files_processed = 0
    total_converted = 0
    total_removed = 0
    
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
                success, c, r = process_html_file(html_file, unmatched_classes)
                if success:
                    files_processed += 1
                    total_converted += c
                    total_removed += r
                
                if files_processed % 100 == 0:
                    print(f"Processed {files_processed} files...")
    
    # Save report
    report = {
        "files_processed": files_processed,
        "classes_converted": total_converted,
        "classes_removed": total_removed,
        "unmatched_classes": dict(unmatched_classes.most_common(50))
    }
    
    with open(BASE_DIR / 'conversion-report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "="*60)
    print("📊 Conversion Summary")
    print("="*60)
    print(f"Files processed: {files_processed}")
    print(f"Classes converted: {total_converted}")
    print(f"Classes removed: {total_removed}")
    print(f"Unmatched classes: {len(unmatched_classes)}")
    print("="*60)
    
    if unmatched_classes:
        print("\n⚠️  Top 20 Unmatched Classes:")
        for cls, count in unmatched_classes.most_common(20):
            print(f"  {cls}: {count}")


if __name__ == "__main__":
    main()
