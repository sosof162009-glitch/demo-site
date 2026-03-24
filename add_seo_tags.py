#!/usr/bin/env python3
"""
Add SEO Tags and WebApplication Schema
Adds:
1. WebApplication Schema
2. Canonical URL
3. hreflang for all 5 languages + x-default
"""

import json
from pathlib import Path
from collections import Counter

BASE_DIR = Path("/root/.openclaw/workspace/demo-site")
DOMAIN = "https://tools-205-jxheof3ba-sas-projects-611869a5.vercel.app"

LANGUAGES = ['en', 'ar', 'fr', 'es', 'de']

def get_tool_name_from_slug(slug):
    """Convert slug to readable name"""
    return slug.replace('-', ' ').title()

def create_webapp_schema(lang, slug, tool_name):
    """Create WebApplication schema"""
    schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool_name,
        "description": f"Free online {tool_name} tool - 205-Tools",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "url": f"{DOMAIN}/{lang}/{slug}/",
        "inLanguage": lang
    }
    return json.dumps(schema, ensure_ascii=False)

def create_hreflang_tags(lang, slug):
    """Create hreflang and canonical tags"""
    tags = []
    
    # Canonical
    tags.append(f'<link rel="canonical" href="{DOMAIN}/{lang}/{slug}/">')
    
    # hreflang for each language
    for l in LANGUAGES:
        tags.append(f'<link rel="alternate" hreflang="{l}" href="{DOMAIN}/{l}/{slug}/">')
    
    # x-default
    tags.append(f'<link rel="alternate" hreflang="x-default" href="{DOMAIN}/en/{slug}/">')
    
    return '\n'.join(tags)

def process_html_file(filepath):
    """Process a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract lang and slug from path
        parts = filepath.parts
        # Find the language folder
        lang = None
        slug = None
        for i, part in enumerate(parts):
            if part in LANGUAGES and i + 1 < len(parts):
                lang = part
                slug = parts[i + 1]
                break
        
        if not lang or not slug:
            print(f"⚠️ Could not detect lang/slug for {filepath}")
            return False
        
        tool_name = get_tool_name_from_slug(slug)
        
        # Create schemas and tags
        webapp_schema = create_webapp_schema(lang, slug, tool_name)
        hreflang_tags = create_hreflang_tags(lang, slug)
        
        # Check if WebApplication schema already exists
        if 'WebApplication' in content:
            # Update existing
            content = content.replace(
                '<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList"',
                f'<script type="application/ld+json">{webapp_schema}</script>\n    <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList"'
            )
        else:
            # Add new WebApplication schema before BreadcrumbList
            content = content.replace(
                '<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList"',
                f'<script type="application/ld+json">{webapp_schema}</script>\n    <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList"'
            )
        
        # Add hreflang and canonical after styles.css
        if 'rel="canonical"' not in content:
            content = content.replace(
                '<link rel="stylesheet" href="/assets/styles.css">',
                f'<link rel="stylesheet" href="/assets/styles.css">\n    {hreflang_tags}'
            )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False

def main():
    """Main function to process all HTML files"""
    
    files_processed = 0
    
    for lang in LANGUAGES:
        lang_dir = BASE_DIR / lang
        if not lang_dir.exists():
            continue
        
        for tool_dir in lang_dir.iterdir():
            if not tool_dir.is_dir():
                continue
            
            html_file = tool_dir / 'index.html'
            if html_file.exists():
                if process_html_file(html_file):
                    files_processed += 1
                
                if files_processed % 100 == 0:
                    print(f"Processed {files_processed} files...")
    
    print(f"\n✅ Added SEO tags to {files_processed} files")


if __name__ == "__main__":
    main()
