const fs = require('fs');
const path = require('path');

// Load data
const toolsData = JSON.parse(fs.readFileSync('./tools-data.json', 'utf8'));

// Simple translations (inline for now)
const translations = {
  en: {
    upload_title: 'Upload your image',
    upload_desc: 'Drag & drop your image here',
    browse_button: 'Browse Files',
    preview_title: 'Preview',
    reset_button: 'Remove',
    settings_title: 'Conversion Settings',
    output_format: 'Output Format',
    quality_label: 'Quality',
    low_quality: 'Low',
    high_quality: 'High',
    convert_button: 'Convert',
    processing: 'Processing',
    success_title: 'Conversion Complete!',
    success_desc: 'Your image has been successfully converted.',
    download_button: 'Download',
    convert_another: 'Convert Another',
    how_to_use: 'How to Use',
    step1_title: 'Upload',
    step1_desc: 'Select your image file',
    step2_title: 'Adjust',
    step2_desc: 'Set quality and output format',
    step3_title: 'Download',
    step3_desc: 'Get your converted image',
    invalid_file: 'Please select a valid image file',
    maintain_ratio: 'Maintain aspect ratio'
  },
  ar: {
    upload_title: 'ارفع صورتك',
    upload_desc: 'اسحب وأفلت صورتك هنا',
    browse_button: 'استعراض الملفات',
    preview_title: 'معاينة',
    reset_button: 'إزالة',
    settings_title: 'إعدادات التحويل',
    output_format: 'صيغة الإخراج',
    quality_label: 'الجودة',
    low_quality: 'منخفضة',
    high_quality: 'عالية',
    convert_button: 'تحويل',
    processing: 'جاري المعالجة',
    success_title: 'اكتمل التحويل!',
    success_desc: 'تم تحويل صورتك بنجاح.',
    download_button: 'تحميل',
    convert_another: 'تحويل أخرى',
    how_to_use: 'كيفية الاستخدام',
    step1_title: 'الرفع',
    step1_desc: 'اختر ملف الصورة',
    step2_title: 'التعديل',
    step2_desc: 'ضبط الجودة وصيغة الإخراج',
    step3_title: 'التحميل',
    step3_desc: 'احصل على الصورة المحولة',
    invalid_file: 'الرجاء اختيار ملف صورة صالح',
    maintain_ratio: 'الحفاظ على نسبة العرض للارتفاع'
  }
};

// Template mapping
const templateMap = {
  'Images': 'image-converter.html',
  'PDF': 'pdf-tool.html', 
  'Text': 'text-analyzer.html',
  'Developers': 'code-editor.html',
  'Math': 'calculator.html',
  'Time': 'calculator.html',
  'Units': 'calculator.html',
  'Colors': 'generator.html',
  'Security': 'generator.html',
  'SEO': 'text-analyzer.html',
  'Data': 'code-editor.html',
  'Special': 'generator.html'
};

// Language settings
const languages = {
  en: { dir: 'ltr', name: 'English' },
  ar: { dir: 'rtl', name: 'Arabic' },
  fr: { dir: 'ltr', name: 'French' },
  es: { dir: 'ltr', name: 'Spanish' },
  de: { dir: 'ltr', name: 'German' }
};

// Load templates
function loadTemplate(name) {
  return fs.readFileSync(path.join('./templates', name), 'utf8');
}

// Generate image converter tool
function generateImageConverter(tool, lang, t) {
  let html = loadTemplate('image-converter.html');
  
  // Determine input/output formats
  const nameLower = tool.name.toLowerCase();
  let inputFormat = 'IMAGE';
  let outputFormat = 'PNG';
  
  if (nameLower.includes(' to ')) {
    const parts = nameLower.split(' to ').map(s => s.trim().replace(' converter', '').toUpperCase());
    if (parts.length >= 2) {
      inputFormat = parts[0] || 'IMAGE';
      outputFormat = parts[1] || 'PNG';
    }
  }
  
  // Basic replacements
  html = html.replace(/\{\{lang\}\}/g, lang);
  html = html.replace(/\{\{dir\}\}/g, languages[lang].dir);
  html = html.replace(/\{\{title\}\}/g, t.name || tool.name);
  html = html.replace(/\{\{description\}\}/g, t.description || tool.description);
  html = html.replace(/\{\{category\}\}/g, tool.category.toLowerCase());
  html = html.replace(/\{\{category_name\}\}/g, lang === 'ar' ? tool.category_ar : tool.category);
  html = html.replace(/\{\{icon\}\}/g, tool.icon || '📷');
  
  // Upload section
  html = html.replace(/\{\{upload_title\}\}/g, t.upload_title || 'Upload your image');
  html = html.replace(/\{\{upload_desc\}\}/g, t.upload_desc || `Drag & drop your ${inputFormat} image here`);
  html = html.replace(/\{\{browse_button\}\}/g, t.browse_button || 'Browse Files');
  html = html.replace(/\{\{accept_types\}\}/g, `.${inputFormat.toLowerCase()},image/${inputFormat.toLowerCase()}`);
  
  // Preview section
  html = html.replace(/\{\{preview_title\}\}/g, t.preview_title || 'Preview');
  html = html.replace(/\{\{reset_button\}\}/g, t.reset_button || 'Remove');
  
  // Settings section  
  html = html.replace(/\{\{settings_title\}\}/g, t.settings_title || 'Conversion Settings');
  html = html.replace(/\{\{output_format\}\}/g, t.output_format || 'Output Format');
  html = html.replace(/\{\{quality_label\}\}/g, t.quality_label || 'Quality');
  html = html.replace(/\{\{low_quality\}\}/g, t.low_quality || 'Low');
  html = html.replace(/\{\{high_quality\}\}/g, t.high_quality || 'High');
  html = html.replace(/\{\{default_format\}\}/g, outputFormat.toLowerCase());
  
  // Format buttons
  const formatButtons = `
    <button class="format-btn px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg font-medium transition-all hover:border-blue-500" data-format="png">PNG</button>
    <button class="format-btn px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg font-medium transition-all hover:border-blue-500" data-format="jpg">JPG</button>
    <button class="format-btn px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg font-medium transition-all hover:border-blue-500" data-format="webp">WebP</button>
  `;
  html = html.replace(/\{\{format_buttons\}\}/g, formatButtons);
  
  // Additional options
  html = html.replace(/\{\{additional_options\}\}/g, `
    <div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" id="maintainRatio" checked class="w-5 h-5 text-blue-500 rounded">
        <span>${t.maintain_ratio || 'Maintain aspect ratio'}</span>
      </label>
    </div>
  `);
  
  // Action button
  html = html.replace(/\{\{convert_button\}\}/g, t.convert_button || `Convert to ${outputFormat}`);
  html = html.replace(/\{\{processing\}\}/g, t.processing || 'Processing');
  
  // Result section
  html = html.replace(/\{\{success_title\}\}/g, t.success_title || 'Conversion Complete!');
  html = html.replace(/\{\{success_desc\}\}/g, t.success_desc || 'Your image has been successfully converted.');
  html = html.replace(/\{\{download_button\}\}/g, t.download_button || `Download ${outputFormat}`);
  html = html.replace(/\{\{convert_another\}\}/g, t.convert_another || 'Convert Another');
  
  // Steps
  html = html.replace(/\{\{how_to_use\}\}/g, t.how_to_use || 'How to Use');
  html = html.replace(/\{\{step1_title\}\}/g, t.step1_title || 'Upload');
  html = html.replace(/\{\{step1_desc\}\}/g, t.step1_desc || `Select your ${inputFormat} image file`);
  html = html.replace(/\{\{step2_title\}\}/g, t.step2_title || 'Adjust');
  html = html.replace(/\{\{step2_desc\}\}/g, t.step2_desc || 'Set quality and output format');
  html = html.replace(/\{\{step3_title\}\}/g, t.step3_title || 'Download');
  html = html.replace(/\{\{step3_desc\}\}/g, t.step3_desc || `Get your converted ${outputFormat} image`);
  
  // Error messages
  html = html.replace(/\{\{invalid_file\}\}/g, t.invalid_file || 'Please select a valid image file');
  
  return html;
}

// Generate PDF tool
function generatePDFTool(tool, lang, t) {
  let html = loadTemplate('pdf-tool.html');
  
  const isMerge = tool.name.toLowerCase().includes('merge');
  const isSplit = tool.name.toLowerCase().includes('split');
  const isCompress = tool.name.toLowerCase().includes('compress');
  
  html = html.replace(/\{\{lang\}\}/g, lang);
  html = html.replace(/\{\{dir\}\}/g, languages[lang].dir);
  html = html.replace(/\{\{title\}\}/g, t.name || tool.name);
  html = html.replace(/\{\{description\}\}/g, t.description || tool.description);
  html = html.replace(/\{\{category\}\}/g, 'pdf');
  html = html.replace(/\{\{category_name\}\}/g, lang === 'ar' ? 'PDF' : 'PDF');
  
  // Step labels
  html = html.replace(/\{\{step1_label\}\}/g, t.step1_label || 'Select Files');
  html = html.replace(/\{\{step2_label\}\}/g, t.step2_label || isMerge ? 'Organize' : 'Options');
  html = html.replace(/\{\{step3_label\}\}/g, t.step3_label || 'Download');
  
  // Upload
  html = html.replace(/\{\{upload_title\}\}/g, t.upload_title || 'Select PDF files');
  html = html.replace(/\{\{upload_desc\}\}/g, t.upload_desc || 'or drag and drop PDFs here');
  html = html.replace(/\{\{browse_button\}\}/g, t.browse_button || 'Choose File');
  html = html.replace(/\{\{multiple\}\}/g, isMerge ? 'multiple' : '');
  html = html.replace(/\{\{invalid_pdf\}\}/g, t.invalid_pdf || 'Please select valid PDF files');
  
  // Files section
  html = html.replace(/\{\{files_title\}\}/g, t.files_title || 'PDF Files');
  html = html.replace(/\{\{add_more\}\}/g, t.add_more || 'Add More');
  html = html.replace(/\{\{drag_tip\}\}/g, t.drag_tip || 'Drag files to reorder them');
  
  // Options
  html = html.replace(/\{\{options_title\}\}/g, t.options_title || 'Options');
  
  let optionsContent = '';
  if (isCompress) {
    optionsContent = `
      <div class="space-y-3">
        <p class="font-medium">${t.compression_level || 'Compression Level'}</p>
        <div class="range-option selected" data-level="low">
          <p class="font-semibold">${t.low_compression || 'Low'}</p>
          <p class="text-sm text-gray-500">${t.low_compression_desc || 'Better quality, larger file'}</p>
        </div>
        <div class="range-option" data-level="medium">
          <p class="font-semibold">${t.medium_compression || 'Medium'}</p>
          <p class="text-sm text-gray-500">${t.medium_compression_desc || 'Balanced quality and size'}</p>
        </div>
        <div class="range-option" data-level="high">
          <p class="font-semibold">${t.high_compression || 'High'}</p>
          <p class="text-sm text-gray-500">${t.high_compression_desc || 'Smaller file, lower quality'}</p>
        </div>
      </div>
    `;
  } else {
    optionsContent = `<p class="text-gray-500">${t.no_options || 'No additional options needed'}</p>`;
  }
  html = html.replace(/\{\{options_content\}\}/g, optionsContent);
  
  // Buttons
  html = html.replace(/\{\{back_button\}\}/g, t.back_button || 'Back');
  html = html.replace(/\{\{process_button\}\}/g, t.process_button || isMerge ? 'Merge PDFs' : isSplit ? 'Split PDF' : 'Process');
  
  // Processing & Result
  html = html.replace(/\{\{processing_title\}\}/g, t.processing_title || 'Processing...');
  html = html.replace(/\{\{processing_desc\}\}/g, t.processing_desc || 'Please wait while we process your files');
  html = html.replace(/\{\{success_title\}\}/g, t.success_title || 'Done!');
  html = html.replace(/\{\{success_desc\}\}/g, t.success_desc || 'Your PDF has been processed successfully');
  html = html.replace(/\{\{original_size\}\}/g, t.original_size || 'Original:');
  html = html.replace(/\{\{new_size\}\}/g, t.new_size || 'New size:');
  html = html.replace(/\{\{download_button\}\}/g, t.download_button || 'Download PDF');
  html = html.replace(/\{\{start_over\}\}/g, t.start_over || 'Start Over');
  
  return html;
}

// Generate text analyzer tool
function generateTextAnalyzer(tool, lang, t) {
  let html = loadTemplate('text-analyzer.html');
  
  html = html.replace(/\{\{lang\}\}/g, lang);
  html = html.replace(/\{\{dir\}\}/g, languages[lang].dir);
  html = html.replace(/\{\{title\}\}/g, t.name || tool.name);
  html = html.replace(/\{\{description\}\}/g, t.description || tool.description);
  html = html.replace(/\{\{category\}\}/g, tool.category.toLowerCase());
  html = html.replace(/\{\{category_name\}\}/g, lang === 'ar' ? tool.category_ar : tool.category);
  
  // Editor
  html = html.replace(/\{\{input_label\}\}/g, t.input_label || 'Enter your text');
  html = html.replace(/\{\{paste_btn\}\}/g, t.paste_btn || 'Paste');
  html = html.replace(/\{\{clear_btn\}\}/g, t.clear_btn || 'Clear');
  html = html.replace(/\{\{placeholder\}\}/g, t.placeholder || 'Type or paste your text here...');
  html = html.replace(/\{\{ready_text\}\}/g, t.ready_text || 'Ready');
  html = html.replace(/\{\{copy_btn\}\}/g, t.copy_btn || 'Copy');
  html = html.replace(/\{\{updated_text\}\}/g, t.updated_text || 'Updated');
  
  // Quick actions
  html = html.replace(/\{\{quick_actions\}\}/g, '');
  
  // Stats
  html = html.replace(/\{\{stats_title\}\}/g, t.stats_title || 'Statistics');
  html = html.replace(/\{\{words_label\}\}/g, t.words_label || 'Words');
  html = html.replace(/\{\{chars_label\}\}/g, t.chars_label || 'Characters');
  html = html.replace(/\{\{chars_no_spaces_label\}\}/g, t.chars_no_spaces_label || 'Without spaces');
  html = html.replace(/\{\{sentences_label\}\}/g, t.sentences_label || 'Sentences');
  html = html.replace(/\{\{paragraphs_label\}\}/g, t.paragraphs_label || 'Paragraphs');
  html = html.replace(/\{\{reading_time_label\}\}/g, t.reading_time_label || 'Reading time');
  html = html.replace(/\{\{speaking_time_label\}\}/g, t.speaking_time_label || 'Speaking time');
  
  // Toast messages
  html = html.replace(/\{\{pasted_message\}\}/g, t.pasted_message || 'Text pasted!');
  html = html.replace(/\{\{paste_error\}\}/g, t.paste_error || 'Could not paste');
  html = html.replace(/\{\{cleared_message\}\}/g, t.cleared_message || 'Text cleared!');
  html = html.replace(/\{\{copied_message\}\}/g, t.copied_message || 'Copied to clipboard!');
  
  return html;
}

// Main application
console.log('🚀 Starting Multi-Template Application...\n');

let stats = { processed: 0, errors: [] };

// Process all categories
const categoriesToProcess = ['Images', 'PDF', 'Text', 'Developers', 'Math', 'Colors', 'Security', 'SEO', 'Data', 'Time', 'Units'];

for (const catName of categoriesToProcess) {
  const category = toolsData.categories.find(c => c.name_en === catName);
  if (!category) continue;
  
  console.log(`\n📁 Processing ${catName}...`);
  
  // Get ALL tools from this category (not just first 5)
  const toolIds = category.tool_ids;
  
  for (const toolId of toolIds) {
    const tool = toolsData.tools.find(t => t.id === toolId);
    if (!tool) continue;
    
    const templateFile = templateMap[catName];
    if (!templateFile) {
      console.log(`  ⚠️ No template for ${tool.name}`);
      continue;
    }
    
    console.log(`  🛠️  ${tool.name}`);
    
    // Generate for each language
    for (const [lang, config] of Object.entries(languages)) {
      try {
        const t = translations[lang] || translations.en;
        
        let html;
        if (catName === 'Images') {
          html = generateImageConverter(tool, lang, t);
        } else if (catName === 'PDF') {
          html = generatePDFTool(tool, lang, t);
        } else if (catName === 'Text') {
          html = generateTextAnalyzer(tool, lang, t);
        } else {
          // Skip others for now
          continue;
        }
        
        // Write to file
        const dir = path.join(lang, tool.slug);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
        
        stats.processed++;
      } catch (err) {
        stats.errors.push(`${tool.name} (${lang}): ${err.message}`);
      }
    }
  }
}

console.log(`\n✅ Complete! Processed ${stats.processed} files`);
if (stats.errors.length > 0) {
  console.log(`\n⚠️  ${stats.errors.length} errors:`);
  stats.errors.forEach(e => console.log(`  - ${e}`));
}
