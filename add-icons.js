// Fix tools data and regenerate all tool pages with icons and working interfaces
const fs = require('fs');

// Load data
const data = JSON.parse(fs.readFileSync('tools-data.json', 'utf8'));

// Category icons mapping
const categoryIcons = {
    'Images': '🖼️',
    'PDF': '📄',
    'Text': '✍️',
    'Developers': '💻',
    'Colors': '🎨',
    'Math': '🔢',
    'Time': '⏱️',
    'Units': '📐',
    'SEO': '🌐',
    'Security': '🔐',
    'Data': '📊',
    'Special': '🎯'
};

// Tool-specific icons based on keywords
const toolIcons = {
    // Images
    'jpg-to-png': '📷', 'png-to-jpg': '🖼️', 'webp-to-jpg': '🌐', 'jpg-to-webp': '🌐',
    'png-to-webp': '🌐', 'webp-to-png': '🌐', 'heic-to-jpg': '📱', 'heic-to-png': '📱',
    'bmp-to-jpg': '🎨', 'bmp-to-png': '🎨', 'tiff-to-jpg': '📄', 'tiff-to-png': '📄',
    'gif-to-jpg': '🎬', 'gif-to-png': '🎬', 'svg-to-jpg': '🎨', 'svg-to-png': '🎨',
    'avif-to-jpg': '🆕', 'avif-to-png': '🆕', 'ico-to-jpg': '🎯', 'ico-to-png': '🎯',
    'jpg-to-gif': '🎬', 'png-to-gif': '🎬', 'jpg-to-ico': '🎯', 'png-to-ico': '🎯',
    'jpg-to-avif': '🆕', 'png-to-avif': '🆕', 'jpg-to-bmp': '🎨', 'png-to-bmp': '🎨',
    'webp-to-gif': '🎬', 'webp-to-avif': '🆕', 'gif-to-webp': '🌐', 'avif-to-webp': '🌐',
    'image-resizer': '📐', 'compress-jpg': '🗜️', 'compress-png': '🗜️', 'image-cropper': '✂️',
    'image-to-base64': '🔢', 'base64-to-image': '🖼️', 'remove-exif': '🛡️',
    'favicon-generator': '🎯', 'color-palette-extractor': '🎨', 'image-to-grayscale': '⚫',
    
    // PDF
    'pdf-to-jpg': '📄', 'pdf-to-png': '📄', 'pdf-to-webp': '📄', 'pdf-to-text': '📝',
    'pdf-metadata': '📋', 'jpg-to-pdf': '📷', 'png-to-pdf': '🖼️', 'images-to-pdf': '📑',
    'word-to-pdf': '📝', 'html-to-pdf': '🌐', 'merge-pdf': '🔗', 'split-pdf': '✂️',
    'compress-pdf': '🗜️', 'rotate-pdf': '🔄', 'pdf-watermark': '💧', 'pdf-page-numbers': '🔢',
    'reorder-pdf-pages': '📋', 'remove-pdf-password': '🔓',
    
    // Text
    'word-counter': '🔢', 'character-counter': '🔡', 'line-counter': '📏',
    'remove-duplicate-lines': '🗑️', 'sort-lines': '📊', 'reverse-text': '🔄',
    'case-converter': '🔠', 'remove-extra-spaces': '⬜', 'text-to-slug': '🔗',
    'remove-line-breaks': '➖', 'add-line-numbers': '🔢', 'text-diff-checker': '👁️',
    'find-and-replace': '🔍', 'lorem-ipsum-generator': '📝', 'random-text-generator': '🎲',
    'text-to-ascii-art': '🎨', 'fancy-text-generator': '✨', 'morse-code-translator': '📻',
    'reading-time-estimator': '⏱️', 'text-repeater': '🔁', 'upside-down-text': '🙃',
    'mirror-text': '🪞',
    
    // Developers
    'json-formatter': '📋', 'json-minifier': '🗜️', 'json-to-csv': '📊', 'json-to-xml': '📄',
    'json-to-yaml': '📄', 'csv-to-json': '📊', 'xml-to-json': '📄', 'yaml-to-json': '📄',
    'json-schema-validator': '✅', 'html-formatter': '🌐', 'html-minifier': '🗜️',
    'css-formatter': '🎨', 'css-minifier': '🗜️', 'js-minifier': '🗜️', 'sql-formatter': '🗄️',
    'html-entities-encoder': '🔢', 'html-entities-decoder': '🔡', 'base64-encoder': '🔢',
    'base64-decoder': '🔡', 'url-encoder': '🔗', 'url-decoder': '🔗',
    'md5-generator': '🔐', 'sha256-generator': '🔐', 'sha512-generator': '🔐',
    'jwt-decoder': '🔑', 'uuid-generator': '🆔', 'regex-tester': '🧪',
    'markdown-to-html': '📝',
    
    // Colors
    'hex-to-rgb': '🎨', 'rgb-to-hex': '🎨', 'hex-to-hsl': '🌈', 'hsl-to-hex': '🌈',
    'cmyk-to-rgb': '🖨️', 'rgb-to-cmyk': '🖨️', 'color-picker': '👁️', 'gradient-generator': '🌈',
    'color-palette-generator': '🎨', 'color-contrast-checker': '👁️', 'box-shadow-generator': '📦',
    'glassmorphism-generator': '🔮', 'neumorphism-generator': '⬜', 'border-radius-generator': '⭕',
    'text-shadow-generator': '📝',
    
    // Math
    'binary-to-decimal': '🔢', 'decimal-to-binary': '🔢', 'hex-to-decimal': '🔢',
    'decimal-to-hex': '🔢', 'octal-to-decimal': '🔢', 'decimal-to-octal': '🔢',
    'scientific-calculator': '🧮', 'percentage-calculator': '%️', 'bmi-calculator': '⚖️',
    'compound-interest-calculator': '💰', 'random-number-generator': '🎲', 'average-calculator': '📊',
    
    // Time
    'unix-timestamp-converter': '⏰', 'time-zone-converter': '🌍', 'date-difference-calculator': '📅',
    'age-calculator': '🎂', 'days-until-date': '📆', 'countdown-timer': '⏱️',
    'calendar-generator': '📅', 'week-number-calculator': '📊', 'working-days-calculator': '💼',
    'pomodoro-timer': '🍅',
    
    // Units
    'length-converter': '📏', 'weight-converter': '⚖️', 'temperature-converter': '🌡️',
    'area-converter': '📐', 'volume-converter': '💧', 'speed-converter': '⚡',
    'data-storage-converter': '💾', 'currency-converter': '💱', 'fuel-efficiency-converter': '⛽',
    'pressure-converter': '🌡️', 'energy-converter': '⚡', 'angle-converter': '📐',
    'shoe-size-converter': '👟', 'clothing-size-converter': '👕', 'screen-resolution-calculator': '🖥️',
    'aspect-ratio-calculator': '📺',
    
    // SEO
    'meta-tags-generator': '🏷️', 'robots-txt-generator': '🤖', 'sitemap-xml-generator': '🗺️',
    'utm-link-builder': '🔗', 'url-slug-generator': '🔗', 'open-graph-generator': '📱',
    'twitter-card-generator': '🐦', 'canonical-url-generator': '🔗', 'keyword-density-checker': '🔍',
    'word-count-seo': '🔢', 'html-to-markdown': '📝', 'http-status-codes': '📡',
    'hreflang-generator': '🌍', 'schema-markup-generator': '📋',
    
    // Security
    'password-generator': '🔐', 'password-strength-checker': '💪', 'random-pin-generator': '🔢',
    'privacy-policy-generator': '📄', 'terms-conditions-generator': '📜', 'cookie-policy-generator': '🍪',
    'hash-identifier': '🔍', 'ip-address-lookup': '🌐',
    
    // Data
    'csv-viewer': '📊', 'markdown-table-generator': '📝', 'html-table-to-csv': '📊',
    'csv-to-html-table': '📋', 'json-viewer': '👁️', 'fake-data-generator': '🎭',
    'qr-code-generator': '📱', 'qr-code-reader': '📷', 'barcode-generator': '📊', 'vcard-generator': '📇',
    
    // Special
    'whatsapp-link-generator': '💬', 'emoji-to-unicode': '😀', 'unicode-to-emoji': '😀',
    'text-to-binary': '0️⃣', 'binary-to-text': '1️⃣', 'number-to-words': '🔤',
    'roman-numeral-converter': '🏛️', 'screen-resolution-detector': '🖥️',
    'browser-info-detector': '🌐', 'internet-speed-test': '⚡'
};

// Add icon to each tool
for (const tool of data.tools) {
    // First try tool-specific icon
    if (toolIcons[tool.slug]) {
        tool.icon = toolIcons[tool.slug];
    } else {
        // Fall back to category icon
        tool.icon = categoryIcons[tool.category] || '🔧';
    }
}

// Save updated data
fs.writeFileSync('tools-data.json', JSON.stringify(data, null, 2));

console.log('✅ Added icons to all', data.tools.length, 'tools');
console.log('Sample:');
console.log('- jpg-to-png:', data.tools[0].icon);
console.log('- json-formatter:', data.tools.find(t => t.slug === 'json-formatter')?.icon);
console.log('- password-generator:', data.tools.find(t => t.slug === 'password-generator')?.icon);
