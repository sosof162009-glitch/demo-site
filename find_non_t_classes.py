#!/usr/bin/env python3
import re
from pathlib import Path
from collections import Counter

BASE_DIR = Path('/root/.openclaw/workspace/demo-site')
all_non_t_classes = Counter()

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
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                matches = re.findall(r'class="([^"]*)"', content)
                for match in matches:
                    classes = match.split()
                    for cls in classes:
                        # Skip t-* classes, empty, or obvious non-classes
                        if not cls.startswith('t-') and cls and len(cls) < 50:
                            # Skip common inline JS or invalid class names
                            if not any(x in cls for x in ['=', '<', '>', '"', "'", '(', ')', ';', '{', '}', '[', ']']):
                                all_non_t_classes[cls] += 1
            except Exception as e:
                print(f"Error in {html_file}: {e}")

print('Classes without t- prefix (top 150):')
print('=' * 60)
for cls, count in all_non_t_classes.most_common(150):
    print(f'{cls}: {count}')

print(f"\nTotal unique non-t classes: {len(all_non_t_classes)}")
