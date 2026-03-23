# Multi-Template Application Script

This script applies the new unique templates to existing tools.

## Usage

```bash
node apply-templates.js
```

## Mapping

### Image Tools (42 tools) → image-converter.html
- JPG to PNG, PNG to JPG, WebP converters, etc.

### PDF Tools (18 tools) → pdf-tool.html
- Merge PDF, Split PDF, Compress PDF, etc.

### Text Tools (22 tools) → text-analyzer.html
- Word Counter, Character Counter, etc.

### Developer Tools (28 tools) → code-editor.html
- JSON Formatter, HTML Encoder, etc.

### Math Tools (12 tools) → calculator.html
- BMI Calculator, Loan Calculator, etc.

### Security/Data Tools → generator.html
- Password Generator, UUID Generator, etc.

## Categories and Templates

| Category | Count | Template |
|----------|-------|----------|
| Images | 42 | image-converter.html |
| PDF | 18 | pdf-tool.html |
| Text | 22 | text-analyzer.html |
| Developers | 28 | code-editor.html |
| Math | 12 | calculator.html |
| Colors | 15 | generator.html |
| SEO | 14 | text-analyzer.html |
| Security | 8 | generator.html |
| Data | 10 | code-editor.html |
| Date/Time | 10 | calculator.html |
| Units | 16 | calculator.html |
| Total | 205 | 6 templates |

## Process

1. Read existing tool data
2. Select appropriate template
3. Replace placeholders with translations
4. Add tool-specific logic
5. Write to all 5 languages
6. Verify output
