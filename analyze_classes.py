#!/usr/bin/env python3
"""
Analyze Tailwind class usage across all HTML files
"""

import os
import re
from pathlib import Path
from collections import Counter

BASE_DIR = Path("/root/.openclaw/workspace/demo-site")

def extract_classes_from_file(filepath):
    """Extract all classes from an HTML file"""
    classes = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all class attributes
        class_pattern = r'\sclass="([^"]*)"'
        matches = re.findall(class_pattern, content)
        
        for match in matches:
            class_list = match.split()
            classes.extend(class_list)
        
        return classes
    except:
        return []

def main():
    all_classes = []
    
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
                classes = extract_classes_from_file(html_file)
                all_classes.extend(classes)
    
    # Count occurrences
    class_counts = Counter(all_classes)
    
    print("=" * 70)
    print("📊 Top 50 Most Used Tailwind Classes")
    print("=" * 70)
    print(f"{'Rank':<6} {'Class':<40} {'Count':<10} {'Usage %'}")
    print("-" * 70)
    
    total_classes = sum(class_counts.values())
    top_50 = class_counts.most_common(50)
    
    for i, (cls, count) in enumerate(top_50, 1):
        percentage = (count / len(all_classes)) * 100 if all_classes else 0
        print(f"{i:<6} {cls:<40} {count:<10} {percentage:.2f}%")
    
    print("=" * 70)
    print(f"\nTotal unique classes: {len(class_counts)}")
    print(f"Total class occurrences: {total_classes}")
    
    # Save to file
    with open(BASE_DIR / 'tailwind-usage-report.txt', 'w') as f:
        f.write("Top 100 Tailwind Classes by Usage\n")
        f.write("=" * 70 + "\n\n")
        for cls, count in class_counts.most_common(100):
            f.write(f"{cls}: {count}\n")
    
    print(f"\n📄 Full report saved to: tailwind-usage-report.txt")

if __name__ == "__main__":
    main()
