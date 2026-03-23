const fs = require('fs');
const path = require('path');

// Load data
const toolsData = JSON.parse(fs.readFileSync('./tools-data.json', 'utf8'));

// Load logic templates
const imageConverterLogic = fs.readFileSync('./templates/logic/image-converter.js', 'utf8');
const textAnalyzerLogic = fs.readFileSync('./templates/logic/text-analyzer.js', 'utf8');
const generatorLogic = fs.readFileSync('./templates/logic/generator.js', 'utf8');
const pdfToolLogic = fs.readFileSync('./templates/logic/pdf-tool.js', 'utf8');
const codeEditorLogic = fs.readFileSync('./templates/logic/code-editor.js', 'utf8');
const calculatorLogic = fs.readFileSync('./templates/logic/calculator.js', 'utf8');

// Languages
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Tool categories and their logic types
const categoryLogicMap = {
  'Images': { type: 'image-converter', logic: imageConverterLogic },
  'Text': { type: 'text-analyzer', logic: textAnalyzerLogic },
  'SEO': { type: 'text-analyzer', logic: textAnalyzerLogic },
  'Security': { type: 'generator', logic: generatorLogic },
  'Colors': { type: 'generator', logic: generatorLogic },
  'Data': { type: 'generator', logic: generatorLogic },
  'PDF': { type: 'pdf-tool', logic: pdfToolLogic },
  'Developers': { type: 'code-editor', logic: codeEditorLogic },
  'Math': { type: 'calculator', logic: calculatorLogic },
  'Time': { type: 'calculator', logic: calculatorLogic },
  'Units': { type: 'calculator', logic: calculatorLogic }
};

console.log('🚀 Starting Logic Application...\n');

let stats = { processed: 0, errors: [] };

// Process tools that need logic
const categoriesToProcess = ['Images', 'Text', 'SEO', 'Security', 'Colors', 'Data', 'PDF', 'Developers', 'Math', 'Time', 'Units'];

for (const catName of categoriesToProcess) {
  const category = toolsData.categories.find(c => c.name_en === catName);
  if (!category) continue;
  
  const logicInfo = categoryLogicMap[catName];
  if (!logicInfo) {
    console.log(`  ⚠️ No logic defined for ${catName}`);
    continue;
  }
  
  console.log(`\n📁 Processing ${catName} (${logicInfo.type})...`);
  
  for (const toolId of category.tool_ids) {
    const tool = toolsData.tools.find(t => t.id === toolId);
    if (!tool) continue;
    
    console.log(`  🛠️  ${tool.name}`);
    
    for (const lang of languages) {
      try {
        const filePath = path.join(lang, tool.slug, 'index.html');
        if (!fs.existsSync(filePath)) {
          stats.errors.push(`${tool.name} (${lang}): File not found`);
          continue;
        }
        
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Inject logic based on type
        if (logicInfo.type === 'image-converter') {
          html = injectImageConverterLogic(html, tool);
        } else if (logicInfo.type === 'text-analyzer') {
          html = injectTextAnalyzerLogic(html, tool);
        } else if (logicInfo.type === 'generator') {
          html = injectGeneratorLogic(html, tool);
        } else if (logicInfo.type === 'pdf-tool') {
          html = injectPDFToolLogic(html, tool);
        } else if (logicInfo.type === 'code-editor') {
          html = injectCodeEditorLogic(html, tool);
        } else if (logicInfo.type === 'calculator') {
          html = injectCalculatorLogic(html, tool);
        }
        
        fs.writeFileSync(filePath, html);
        stats.processed++;
      } catch (err) {
        stats.errors.push(`${tool.name} (${lang}): ${err.message}`);
      }
    }
  }
}

function injectImageConverterLogic(html, tool) {
  // Extract input/output formats from tool name
  const nameLower = tool.name.toLowerCase();
  let inputFormat = 'JPG';
  let outputFormat = 'PNG';
  
  if (nameLower.includes(' to ')) {
    const parts = nameLower.split(' to ').map(s => s.trim().replace(' converter', '').toUpperCase());
    if (parts.length >= 2) {
      inputFormat = parts[0] || 'JPG';
      outputFormat = parts[1] || 'PNG';
    }
  }
  
  // Replace the script section with actual logic
  const logicScript = `
    ${imageConverterLogic}
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initImageConverter('${inputFormat}', '${outputFormat}');
    });
  `;
  
  // Find and replace the script tag content
  return html.replace(/\u003cscript\u003e([\s\S]*?)\u003c\/script\u003e/, `<script\u003e${logicScript}</script\u003e`);
}

function injectTextAnalyzerLogic(html, tool) {
  const logicScript = `
    ${textAnalyzerLogic}
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initTextAnalyzer();
    });
  `;
  
  return html.replace(/\u003cscript\u003e([\s\S]*?)\u003c\/script\u003e/, `<script\u003e${logicScript}</script\u003e`);
}

function injectGeneratorLogic(html, tool) {
  // Determine generator type
  const nameLower = tool.name.toLowerCase();
  let genType = 'random';
  if (nameLower.includes('password')) genType = 'password';
  else if (nameLower.includes('uuid')) genType = 'uuid';
  else if (nameLower.includes('pin')) genType = 'pin';
  
  const logicScript = `
    ${generatorLogic}
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initGenerator('${genType}');
    });
  `;
  
  return html.replace(/<script>([\s\S]*?)<\/script>/, `<script>${logicScript}</script>`);
}

function injectPDFToolLogic(html, tool) {
  const nameLower = tool.name.toLowerCase();
  let toolType = 'generic';
  if (nameLower.includes('merge')) toolType = 'merge';
  else if (nameLower.includes('split')) toolType = 'split';
  else if (nameLower.includes('compress')) toolType = 'compress';
  
  const logicScript = `
    ${pdfToolLogic}
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initPDFTool('${toolType}');
    });
  `;
  
  return html.replace(/<script>([\s\S]*?)<\/script>/, `<script>${logicScript}</script>`);
}

function injectCodeEditorLogic(html, tool) {
  const nameLower = tool.name.toLowerCase();
  let language = 'text';
  if (nameLower.includes('json')) language = 'json';
  else if (nameLower.includes('html')) language = 'html';
  else if (nameLower.includes('css')) language = 'css';
  else if (nameLower.includes('javascript') || nameLower.includes('js')) language = 'js';
  else if (nameLower.includes('sql')) language = 'sql';
  else if (nameLower.includes('xml')) language = 'xml';
  else if (nameLower.includes('yaml')) language = 'yaml';
  
  const logicScript = `
    ${codeEditorLogic}
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initCodeEditor('${language}');
    });
  `;
  
  return html.replace(/<script>([\s\S]*?)<\/script>/, `<script>${logicScript}</script>`);
}

function injectCalculatorLogic(html, tool) {
  const nameLower = tool.name.toLowerCase();
  let calcType = 'generic';
  if (nameLower.includes('bmi')) calcType = 'bmi';
  else if (nameLower.includes('loan') || nameLower.includes('mortgage')) calcType = 'loan';
  else if (nameLower.includes('percentage')) calcType = 'percentage';
  else if (nameLower.includes('binary')) calcType = 'binary';
  else if (nameLower.includes('hex')) calcType = 'hex';
  else if (nameLower.includes('temperature')) calcType = 'temperature';
  else if (nameLower.includes('length')) calcType = 'length';
  else if (nameLower.includes('weight')) calcType = 'weight';
  else if (nameLower.includes('area')) calcType = 'area';
  else if (nameLower.includes('volume')) calcType = 'volume';
  else if (nameLower.includes('age')) calcType = 'age';
  else if (nameLower.includes('time') || nameLower.includes('date')) calcType = 'time';
  
  const logicScript = `
    ${calculatorLogic}
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initCalculator('${calcType}');
    });
  `;
  
  return html.replace(/<script>([\s\S]*?)<\/script>/, `<script>${logicScript}</script>`);
}

console.log(`\n✅ Complete! Processed ${stats.processed} files`);
if (stats.errors.length > 0) {
  console.log(`\n⚠️  ${stats.errors.length} errors:`);
  stats.errors.forEach(e => console.log(`  - ${e}`));
}
