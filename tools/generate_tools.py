import os

# Language configurations
LANGS = ['en', 'zh', 'es', 'fr', 'de']

# Tool definitions with translations
TOOLS = {
    'color': [
        {
            'id': 'color-picker',
            'names': {
                'en': 'Color Picker',
                'zh': '颜色选择器',
                'es': 'Selector de Color',
                'fr': 'Sélecteur de Couleur',
                'de': 'Farbwähler'
            },
            'desc': {
                'en': 'Pick colors and convert between formats',
                'zh': '选择颜色并在格式之间转换',
                'es': 'Selecciona colores y convierte entre formatos',
                'fr': 'Choisissez des couleurs et convertissez entre formats',
                'de': 'Wählen Sie Farben und konvertieren Sie zwischen Formaten'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label data-t="pickColor">Pick a Color</label>
        <input type="color" id="colorInput" value="#4f8ef7">
    </div>
    <div class="color-preview" id="colorPreview" style="background: #4f8ef7; color: white;">#4f8ef7</div>
    <div class="grid">
        <div class="input-group">
            <label>HEX</label>
            <input type="text" id="hexInput" value="#4f8ef7" oninput="updateFromHex()">
        </div>
        <div class="input-group">
            <label>RGB</label>
            <input type="text" id="rgbInput" readonly onclick="copyToClipboard(this.value)">
        </div>
        <div class="input-group">
            <label>HSL</label>
            <input type="text" id="hslInput" readonly onclick="copyToClipboard(this.value)">
        </div>
        <div class="input-group">
            <label>CMYK</label>
            <input type="text" id="cmykInput" readonly onclick="copyToClipboard(this.value)">
        </div>
    </div>
</div>
<script>
function updateFromPicker() {
    const hex = document.getElementById('colorInput').value;
    document.getElementById('hexInput').value = hex;
    updateAll(hex);
}
function updateFromHex() {
    let hex = document.getElementById('hexInput').value;
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        document.getElementById('colorInput').value = hex;
        updateAll(hex);
    }
}
function updateAll(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    document.getElementById('colorPreview').style.background = hex;
    document.getElementById('colorPreview').style.color = getTextColorForBackground(hex);
    document.getElementById('colorPreview').textContent = hex.toUpperCase();
    document.getElementById('rgbInput').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('hslInput').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    document.getElementById('cmykInput').value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
}
document.getElementById('colorInput').addEventListener('input', updateFromPicker);
updateAll('#4f8ef7');
</script>'''
        },
        {
            'id': 'hex-to-rgb',
            'names': {
                'en': 'HEX to RGB',
                'zh': 'HEX转RGB',
                'es': 'HEX a RGB',
                'fr': 'HEX vers RGB',
                'de': 'HEX zu RGB'
            },
            'desc': {
                'en': 'Convert HEX color codes to RGB values',
                'zh': '将HEX颜色代码转换为RGB值',
                'es': 'Convierte códigos HEX a valores RGB',
                'fr': 'Convertissez les codes HEX en valeurs RGB',
                'de': 'Konvertieren Sie HEX-Farbcodes in RGB-Werte'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label data-t="enterHex">Enter HEX Color</label>
        <input type="text" id="hexInput" placeholder="#4f8ef7" value="#4f8ef7">
    </div>
    <button class="btn" onclick="convertHexToRgb()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">RGB</div>
        <div class="result-value" id="rgbResult"></div>
    </div>
    <div class="color-preview" id="preview"></div>
</div>
<script>
function convertHexToRgb() {
    let hex = document.getElementById('hexInput').value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    const rgb = hexToRgb(hex);
    if (rgb) {
        document.getElementById('rgbResult').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.getElementById('preview').style.background = hex;
        document.getElementById('result').style.display = 'block';
    } else {
        alert('Invalid HEX color');
    }
}
convertHexToRgb();
</script>'''
        },
        {
            'id': 'rgb-to-hex',
            'names': {
                'en': 'RGB to HEX',
                'zh': 'RGB转HEX',
                'es': 'RGB a HEX',
                'fr': 'RGB vers HEX',
                'de': 'RGB zu HEX'
            },
            'desc': {
                'en': 'Convert RGB values to HEX color codes',
                'zh': '将RGB值转换为HEX颜色代码',
                'es': 'Convierte valores RGB a códigos HEX',
                'fr': 'Convertissez les valeurs RGB en codes HEX',
                'de': 'Konvertieren Sie RGB-Werte in HEX-Farbcodes'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>R (0-255)</label>
            <input type="number" id="rInput" min="0" max="255" value="79">
        </div>
        <div class="input-group">
            <label>G (0-255)</label>
            <input type="number" id="gInput" min="0" max="255" value="142">
        </div>
        <div class="input-group">
            <label>B (0-255)</label>
            <input type="number" id="bInput" min="0" max="255" value="247">
        </div>
    </div>
    <button class="btn" onclick="convertRgbToHex()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">HEX</div>
        <div class="result-value" id="hexResult"></div>
    </div>
    <div class="color-preview" id="preview"></div>
</div>
<script>
function convertRgbToHex() {
    const r = parseInt(document.getElementById('rInput').value) || 0;
    const g = parseInt(document.getElementById('gInput').value) || 0;
    const b = parseInt(document.getElementById('bInput').value) || 0;
    const hex = rgbToHex(r, g, b);
    document.getElementById('hexResult').textContent = hex.toUpperCase();
    document.getElementById('preview').style.background = hex;
    document.getElementById('result').style.display = 'block';
}
convertRgbToHex();
</script>'''
        },
        {
            'id': 'hex-to-hsl',
            'names': {
                'en': 'HEX to HSL',
                'zh': 'HEX转HSL',
                'es': 'HEX a HSL',
                'fr': 'HEX vers HSL',
                'de': 'HEX zu HSL'
            },
            'desc': {
                'en': 'Convert HEX color codes to HSL values',
                'zh': '将HEX颜色代码转换为HSL值',
                'es': 'Convierte códigos HEX a valores HSL',
                'fr': 'Convertissez les codes HEX en valeurs HSL',
                'de': 'Konvertieren Sie HEX-Farbcodes in HSL-Werte'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>HEX Color</label>
        <input type="text" id="hexInput" placeholder="#4f8ef7" value="#4f8ef7">
    </div>
    <button class="btn" onclick="convertHexToHsl()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">HSL</div>
        <div class="result-value" id="hslResult"></div>
    </div>
    <div class="color-preview" id="preview"></div>
</div>
<script>
function convertHexToHsl() {
    let hex = document.getElementById('hexInput').value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    const rgb = hexToRgb(hex);
    if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        document.getElementById('hslResult').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById('preview').style.background = hex;
        document.getElementById('result').style.display = 'block';
    } else {
        alert('Invalid HEX color');
    }
}
convertHexToHsl();
</script>'''
        },
        {
            'id': 'hsl-to-hex',
            'names': {
                'en': 'HSL to HEX',
                'zh': 'HSL转HEX',
                'es': 'HSL a HEX',
                'fr': 'HSL vers HEX',
                'de': 'HSL zu HEX'
            },
            'desc': {
                'en': 'Convert HSL values to HEX color codes',
                'zh': '将HSL值转换为HEX颜色代码',
                'es': 'Convierte valores HSL a códigos HEX',
                'fr': 'Convertissez les valeurs HSL en codes HEX',
                'de': 'Konvertieren Sie HSL-Werte in HEX-Farbcodes'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>H (0-360)</label>
            <input type="number" id="hInput" min="0" max="360" value="214">
        </div>
        <div class="input-group">
            <label>S (0-100)</label>
            <input type="number" id="sInput" min="0" max="100" value="91">
        </div>
        <div class="input-group">
            <label>L (0-100)</label>
            <input type="number" id="lInput" min="0" max="100" value="64">
        </div>
    </div>
    <button class="btn" onclick="convertHslToHex()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">HEX</div>
        <div class="result-value" id="hexResult"></div>
    </div>
    <div class="color-preview" id="preview"></div>
</div>
<script>
function convertHslToHex() {
    const h = parseInt(document.getElementById('hInput').value) || 0;
    const s = parseInt(document.getElementById('sInput').value) || 0;
    const l = parseInt(document.getElementById('lInput').value) || 0;
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    document.getElementById('hexResult').textContent = hex.toUpperCase();
    document.getElementById('preview').style.background = hex;
    document.getElementById('result').style.display = 'block';
}
convertHslToHex();
</script>'''
        },
        {
            'id': 'rgb-to-hsl',
            'names': {
                'en': 'RGB to HSL',
                'zh': 'RGB转HSL',
                'es': 'RGB a HSL',
                'fr': 'RGB vers HSL',
                'de': 'RGB zu HSL'
            },
            'desc': {
                'en': 'Convert RGB values to HSL format',
                'zh': '将RGB值转换为HSL格式',
                'es': 'Convierte valores RGB a formato HSL',
                'fr': 'Convertissez les valeurs RGB en format HSL',
                'de': 'Konvertieren Sie RGB-Werte in HSL-Format'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>R (0-255)</label>
            <input type="number" id="rInput" min="0" max="255" value="79">
        </div>
        <div class="input-group">
            <label>G (0-255)</label>
            <input type="number" id="gInput" min="0" max="255" value="142">
        </div>
        <div class="input-group">
            <label>B (0-255)</label>
            <input type="number" id="bInput" min="0" max="255" value="247">
        </div>
    </div>
    <button class="btn" onclick="convertRgbToHsl()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">HSL</div>
        <div class="result-value" id="hslResult"></div>
    </div>
</div>
<script>
function convertRgbToHsl() {
    const r = parseInt(document.getElementById('rInput').value) || 0;
    const g = parseInt(document.getElementById('gInput').value) || 0;
    const b = parseInt(document.getElementById('bInput').value) || 0;
    const hsl = rgbToHsl(r, g, b);
    document.getElementById('hslResult').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'hsl-to-rgb',
            'names': {
                'en': 'HSL to RGB',
                'zh': 'HSL转RGB',
                'es': 'HSL a RGB',
                'fr': 'HSL vers RGB',
                'de': 'HSL zu RGB'
            },
            'desc': {
                'en': 'Convert HSL values to RGB format',
                'zh': '将HSL值转换为RGB格式',
                'es': 'Convierte valores HSL a formato RGB',
                'fr': 'Convertissez les valeurs HSL en format RGB',
                'de': 'Konvertieren Sie HSL-Werte in RGB-Format'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>H (0-360)</label>
            <input type="number" id="hInput" min="0" max="360" value="214">
        </div>
        <div class="input-group">
            <label>S (0-100)</label>
            <input type="number" id="sInput" min="0" max="100" value="91">
        </div>
        <div class="input-group">
            <label>L (0-100)</label>
            <input type="number" id="lInput" min="0" max="100" value="64">
        </div>
    </div>
    <button class="btn" onclick="convertHslToRgb()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">RGB</div>
        <div class="result-value" id="rgbResult"></div>
    </div>
</div>
<script>
function convertHslToRgb() {
    const h = parseInt(document.getElementById('hInput').value) || 0;
    const s = parseInt(document.getElementById('sInput').value) || 0;
    const l = parseInt(document.getElementById('lInput').value) || 0;
    const rgb = hslToRgb(h, s, l);
    document.getElementById('rgbResult').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'color-contrast',
            'names': {
                'en': 'Color Contrast Checker',
                'zh': '颜色对比度检查器',
                'es': 'Comprobador de Contraste',
                'fr': 'Vérificateur de Contraste',
                'de': 'Farbkontrast-Prüfer'
            },
            'desc': {
                'en': 'Check contrast ratio between two colors for accessibility',
                'zh': '检查两种颜色之间的对比度以确保可访问性',
                'es': 'Verifica la relación de contraste entre dos colores',
                'fr': 'Vérifiez le rapport de contraste entre deux couleurs',
                'de': 'Prüfen Sie das Kontrastverhältnis zwischen zwei Farben'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label data-t="backgroundColor">Background Color</label>
            <input type="color" id="bgColor" value="#ffffff">
        </div>
        <div class="input-group">
            <label data-t="textColor">Text Color</label>
            <input type="color" id="textColor" value="#000000">
        </div>
    </div>
    <button class="btn" onclick="checkContrast()" data-t="check">Check</button>
    <div class="color-preview" id="preview" style="margin-top: 20px;">
        <span style="font-size: 1.5rem;">Sample Text</span>
    </div>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">Contrast Ratio</div>
        <div class="result-value" id="ratioResult"></div>
        <div id="wcagResult" style="margin-top: 10px;"></div>
    </div>
</div>
<script>
function checkContrast() {
    const bg = document.getElementById('bgColor').value;
    const text = document.getElementById('textColor').value;
    const preview = document.getElementById('preview');
    preview.style.background = bg;
    preview.style.color = text;
    const ratio = getContrastRatio(hexToRgb(bg), hexToRgb(text));
    document.getElementById('ratioResult').textContent = ratio.toFixed(2) + ':1';
    const aa = ratio >= 4.5 ? '✓ AA' : '✗ AA';
    const aaa = ratio >= 7 ? '✓ AAA' : '✗ AAA';
    const largeAA = ratio >= 3 ? '✓ AA Large' : '✗ AA Large';
    document.getElementById('wcagResult').innerHTML = `
        <span style="color: ${ratio >= 4.5 ? 'var(--success)' : 'var(--error)'}">${aa}</span> | 
        <span style="color: ${ratio >= 7 ? 'var(--success)' : 'var(--error)'}">${aaa}</span> | 
        <span style="color: ${ratio >= 3 ? 'var(--success)' : 'var(--error)'}">${largeAA}</span>
    `;
    document.getElementById('result').style.display = 'block';
}
checkContrast();
document.getElementById('bgColor').addEventListener('input', checkContrast);
document.getElementById('textColor').addEventListener('input', checkContrast);
</script>'''
        },
        {
            'id': 'color-blindness',
            'names': {
                'en': 'Color Blindness Simulator',
                'zh': '色盲模拟器',
                'es': 'Simulador de Daltonismo',
                'fr': 'Simulateur de Daltonisme',
                'de': 'Farbenblindheits-Simulator'
            },
            'desc': {
                'en': 'Simulate how colors appear to people with color blindness',
                'zh': '模拟色盲人士看到的颜色',
                'es': 'Simula cómo ven los colores las personas daltónicas',
                'fr': 'Simulez l\'apparence des couleurs pour les daltoniens',
                'de': 'Simulieren Sie, wie Farben für Farbenblinde aussehen'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Color</label>
        <input type="color" id="colorInput" value="#4f8ef7">
    </div>
    <div class="input-group">
        <label>Type</label>
        <select id="typeInput">
            <option value="protanopia">Protanopia (Red-blind)</option>
            <option value="deuteranopia">Deuteranopia (Green-blind)</option>
            <option value="tritanopia">Tritanopia (Blue-blind)</option>
            <option value="achromatopsia">Achromatopsia (Monochromacy)</option>
        </select>
    </div>
    <button class="btn" onclick="simulate()" data-t="simulate">Simulate</button>
    <div class="grid" style="margin-top: 20px;">
        <div>
            <div class="result-label">Original</div>
            <div class="color-preview" id="originalPreview"></div>
        </div>
        <div>
            <div class="result-label">Simulated</div>
            <div class="color-preview" id="simulatedPreview"></div>
        </div>
    </div>
</div>
<script>
function simulate() {
    const hex = document.getElementById('colorInput').value;
    const type = document.getElementById('typeInput').value;
    document.getElementById('originalPreview').style.background = hex;
    document.getElementById('originalPreview').textContent = hex;
    const simulated = applyColorBlindness(hex, type);
    document.getElementById('simulatedPreview').style.background = simulated;
    document.getElementById('simulatedPreview').textContent = simulated;
}
function applyColorBlindness(hex, type) {
    const rgb = hexToRgb(hex);
    let r = rgb.r, g = rgb.g, b = rgb.b;
    switch(type) {
        case 'protanopia':
            return rgbToHex(0.567*r + 0.433*g, 0.558*r + 0.442*g, 0.242*g + 0.758*b);
        case 'deuteranopia':
            return rgbToHex(0.625*r + 0.375*g, 0.7*r + 0.3*g, 0.3*g + 0.7*b);
        case 'tritanopia':
            return rgbToHex(0.95*r + 0.05*g, 0.433*g + 0.567*b, 0.475*g + 0.525*b);
        case 'achromatopsia':
            const gray = 0.299*r + 0.587*g + 0.114*b;
            return rgbToHex(gray, gray, gray);
    }
    return hex;
}
simulate();
</script>'''
        },
        {
            'id': 'gradient-generator',
            'names': {
                'en': 'CSS Gradient Generator',
                'zh': 'CSS渐变生成器',
                'es': 'Generador de Degradados CSS',
                'fr': 'Générateur de Dégradés CSS',
                'de': 'CSS-Verlaufsgenerator'
            },
            'desc': {
                'en': 'Generate beautiful CSS gradients',
                'zh': '生成漂亮的CSS渐变',
                'es': 'Genera hermosos degradados CSS',
                'fr': 'Générez de beaux dégradés CSS',
                'de': 'Generieren Sie schöne CSS-Verläufe'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>Color 1</label>
            <input type="color" id="color1" value="#4f8ef7">
        </div>
        <div class="input-group">
            <label>Color 2</label>
            <input type="color" id="color2" value="#f74f8e">
        </div>
    </div>
    <div class="input-group">
        <label>Direction</label>
        <select id="direction">
            <option value="to right">→ Left to Right</option>
            <option value="to left">← Right to Left</option>
            <option value="to bottom">↓ Top to Bottom</option>
            <option value="to top">↑ Bottom to Top</option>
            <option value="45deg">↘ 45°</option>
            <option value="135deg">↙ 135°</option>
            <option value="225deg">↖ 225°</option>
            <option value="315deg">↗ 315°</option>
        </select>
    </div>
    <button class="btn" onclick="generateGradient()" data-t="generate">Generate</button>
    <div class="color-preview" id="preview" style="height: 150px; margin: 20px 0;"></div>
    <div class="result-box">
        <div class="result-label">CSS Code</div>
        <div class="result-value" id="cssResult" style="font-size: 0.9rem; cursor: pointer;" onclick="copyToClipboard(this.textContent)"></div>
    </div>
</div>
<script>
function generateGradient() {
    const c1 = document.getElementById('color1').value;
    const c2 = document.getElementById('color2').value;
    const dir = document.getElementById('direction').value;
    const gradient = `linear-gradient(${dir}, ${c1}, ${c2})`;
    document.getElementById('preview').style.background = gradient;
    document.getElementById('cssResult').textContent = `background: ${gradient};`;
}
generateGradient();
</script>'''
        },
        {
            'id': 'color-shades',
            'names': {
                'en': 'Color Shades Generator',
                'zh': '颜色 shades 生成器',
                'es': 'Generador de Tonos de Color',
                'fr': 'Générateur de Nuances',
                'de': 'Farbton-Generator'
            },
            'desc': {
                'en': 'Generate lighter and darker shades of any color',
                'zh': '生成任意颜色的深浅变化',
                'es': 'Genera tonos más claros y oscuros de cualquier color',
                'fr': 'Générez des nuances plus claires et plus foncées',
                'de': 'Generieren Sie hellere und dunklere Farbtöne'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Base Color</label>
        <input type="color" id="baseColor" value="#4f8ef7">
    </div>
    <button class="btn" onclick="generateShades()" data-t="generate">Generate</button>
    <div style="margin-top: 20px;">
        <div class="result-label">Lighter Shades</div>
        <div id="lighterShades" style="display: flex; gap: 10px; flex-wrap: wrap; margin: 10px 0;"></div>
    </div>
    <div>
        <div class="result-label">Darker Shades</div>
        <div id="darkerShades" style="display: flex; gap: 10px; flex-wrap: wrap; margin: 10px 0;"></div>
    </div>
</div>
<script>
function generateShades() {
    const hex = document.getElementById('baseColor').value;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    let lighterHtml = '';
    let darkerHtml = '';
    for (let i = 1; i <= 5; i++) {
        const lightL = Math.min(95, hsl.l + i * 5);
        const darkL = Math.max(5, hsl.l - i * 5);
        const lightRgb = hslToRgb(hsl.h, hsl.s, lightL);
        const darkRgb = hslToRgb(hsl.h, hsl.s, darkL);
        const lightHex = rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b);
        const darkHex = rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b);
        lighterHtml += `<div style="width: 60px; height: 60px; background: ${lightHex}; border-radius: 8px; cursor: pointer;" onclick="copyToClipboard('${lightHex}')" title="${lightHex}"></div>`;
        darkerHtml += `<div style="width: 60px; height: 60px; background: ${darkHex}; border-radius: 8px; cursor: pointer;" onclick="copyToClipboard('${darkHex}')" title="${darkHex}"></div>`;
    }
    document.getElementById('lighterShades').innerHTML = lighterHtml;
    document.getElementById('darkerShades').innerHTML = darkerHtml;
}
generateShades();
</script>'''
        },
        {
            'id': 'color-palette',
            'names': {
                'en': 'Color Palette Generator',
                'zh': '调色板生成器',
                'es': 'Generador de Paletas',
                'fr': 'Générateur de Palettes',
                'de': 'Farbschema-Generator'
            },
            'desc': {
                'en': 'Generate harmonious color palettes',
                'zh': '生成和谐的调色板',
                'es': 'Genera paletas de colores armoniosas',
                'fr': 'Générez des palettes de couleurs harmonieuses',
                'de': 'Generieren Sie harmonische Farbschemata'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Base Color</label>
        <input type="color" id="baseColor" value="#4f8ef7">
    </div>
    <div class="input-group">
        <label>Palette Type</label>
        <select id="paletteType">
            <option value="complementary">Complementary</option>
            <option value="analogous">Analogous</option>
            <option value="triadic">Triadic</option>
            <option value="split">Split Complementary</option>
            <option value="tetradic">Tetradic</option>
        </select>
    </div>
    <button class="btn" onclick="generatePalette()" data-t="generate">Generate</button>
    <div id="palette" style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;"></div>
</div>
<script>
function generatePalette() {
    const hex = document.getElementById('baseColor').value;
    const type = document.getElementById('paletteType').value;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    let colors = [];
    switch(type) {
        case 'complementary':
            colors = [hsl, {h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l}];
            break;
        case 'analogous':
            colors = [{h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l}, hsl, {h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l}];
            break;
        case 'triadic':
            colors = [hsl, {h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l}, {h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l}];
            break;
        case 'split':
            colors = [hsl, {h: (hsl.h + 150) % 360, s: hsl.s, l: hsl.l}, {h: (hsl.h + 210) % 360, s: hsl.s, l: hsl.l}];
            break;
        case 'tetradic':
            colors = [hsl, {h: (hsl.h + 90) % 360, s: hsl.s, l: hsl.l}, {h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l}, {h: (hsl.h + 270) % 360, s: hsl.s, l: hsl.l}];
            break;
    }
    let html = '';
    colors.forEach(c => {
        const rgb2 = hslToRgb(c.h, c.s, c.l);
        const hex2 = rgbToHex(rgb2.r, rgb2.g, rgb2.b);
        html += `<div style="width: 100px; height: 100px; background: ${hex2}; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 600; color: ${getTextColorForBackground(hex2)}; cursor: pointer;" onclick="copyToClipboard('${hex2}')">${hex2}</div>`;
    });
    document.getElementById('palette').innerHTML = html;
}
generatePalette();
</script>'''
        },
        {
            'id': 'image-colors',
            'names': {
                'en': 'Image Color Extractor',
                'zh': '图片颜色提取器',
                'es': 'Extractor de Colores de Imagen',
                'fr': 'Extracteur de Couleurs d\'Image',
                'de': 'Bildfarben-Extraktor'
            },
            'desc': {
                'en': 'Extract dominant colors from images',
                'zh': '从图片中提取主色调',
                'es': 'Extrae colores dominantes de imágenes',
                'fr': 'Extrayez les couleurs dominantes des images',
                'de': 'Extrahieren Sie dominante Farben aus Bildern'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Upload Image</label>
        <input type="file" id="imageInput" accept="image/*">
    </div>
    <canvas id="canvas" style="display: none;"></canvas>
    <div id="imagePreview" style="max-width: 100%; margin: 20px 0; text-align: center;"></div>
    <button class="btn" onclick="extractColors()" data-t="extract">Extract Colors</button>
    <div id="colors" style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;"></div>
</div>
<script>
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '12px';
            document.getElementById('imagePreview').innerHTML = '';
            document.getElementById('imagePreview').appendChild(img);
            img.onload = function() {
                window.currentImage = img;
            };
        };
        reader.readAsDataURL(file);
    }
});
function extractColors() {
    if (!window.currentImage) return alert('Please upload an image first');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    ctx.drawImage(window.currentImage, 0, 0, 100, 100);
    const data = ctx.getImageData(0, 0, 100, 100).data;
    const colorMap = {};
    for (let i = 0; i < data.length; i += 4) {
        const r = Math.floor(data[i] / 16) * 16;
        const g = Math.floor(data[i+1] / 16) * 16;
        const b = Math.floor(data[i+2] / 16) * 16;
        const hex = rgbToHex(r, g, b);
        colorMap[hex] = (colorMap[hex] || 0) + 1;
    }
    const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 8);
    let html = '';
    sorted.forEach(([hex, count]) => {
        html += `<div style="width: 80px; height: 80px; background: ${hex}; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; color: ${getTextColorForBackground(hex)}; cursor: pointer;" onclick="copyToClipboard('${hex}')">${hex}</div>`;
    });
    document.getElementById('colors').innerHTML = html;
}
</script>'''
        },
        {
            'id': 'cmyk-to-rgb',
            'names': {
                'en': 'CMYK to RGB',
                'zh': 'CMYK转RGB',
                'es': 'CMYK a RGB',
                'fr': 'CMYK vers RGB',
                'de': 'CMYK zu RGB'
            },
            'desc': {
                'en': 'Convert CMYK color values to RGB',
                'zh': '将CMYK颜色值转换为RGB',
                'es': 'Convierte valores CMYK a RGB',
                'fr': 'Convertissez les valeurs CMYK en RGB',
                'de': 'Konvertieren Sie CMYK-Werte in RGB'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>C (0-100)</label>
            <input type="number" id="cInput" min="0" max="100" value="68">
        </div>
        <div class="input-group">
            <label>M (0-100)</label>
            <input type="number" id="mInput" min="0" max="100" value="42">
        </div>
        <div class="input-group">
            <label>Y (0-100)</label>
            <input type="number" id="yInput" min="0" max="100" value="0">
        </div>
        <div class="input-group">
            <label>K (0-100)</label>
            <input type="number" id="kInput" min="0" max="100" value="3">
        </div>
    </div>
    <button class="btn" onclick="convertCmykToRgb()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">RGB</div>
        <div class="result-value" id="rgbResult"></div>
    </div>
    <div class="color-preview" id="preview"></div>
</div>
<script>
function convertCmykToRgb() {
    const c = parseInt(document.getElementById('cInput').value) || 0;
    const m = parseInt(document.getElementById('mInput').value) || 0;
    const y = parseInt(document.getElementById('yInput').value) || 0;
    const k = parseInt(document.getElementById('kInput').value) || 0;
    const rgb = cmykToRgb(c, m, y, k);
    document.getElementById('rgbResult').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('preview').style.background = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('result').style.display = 'block';
}
convertCmykToRgb();
</script>'''
        },
        {
            'id': 'pantone-to-hex',
            'names': {
                'en': 'Pantone to HEX',
                'zh': 'Pantone转HEX',
                'es': 'Pantone a HEX',
                'fr': 'Pantone vers HEX',
                'de': 'Pantone zu HEX'
            },
            'desc': {
                'en': 'Convert Pantone colors to HEX codes (approximate)',
                'zh': '将Pantone颜色转换为HEX代码（近似）',
                'es': 'Convierte colores Pantone a códigos HEX (aproximado)',
                'fr': 'Convertissez les couleurs Pantone en codes HEX (approximatif)',
                'de': 'Konvertieren Sie Pantone-Farben in HEX-Codes (approximativ)'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Pantone Code</label>
        <select id="pantoneInput">
            <option value="#FEDD00">Yellow C</option>
            <option value="#FF6B00">Orange 021 C</option>
            <option value="#FF0000">Red 032 C</option>
            <option value="#FF00FF">Magenta C</option>
            <option value="#4B0082">Violet C</option>
            <option value="#0000FF">Blue 072 C</option>
            <option value="#00FFFF">Process Cyan C</option>
            <option value="#00FF00">Green C</option>
            <option value="#4f8ef7" selected>2995 C</option>
            <option value="#1a1a1a">Black C</option>
            <option value="#FFFFFF">White</option>
            <option value="#C0C0C0">Cool Gray 5 C</option>
            <option value="#FFD700">130 C (Gold)</option>
            <option value="#C0C0C0">877 C (Silver)</option>
            <option value="#FF1493">Rhodamine Red C</option>
            <option value="#00CED1">Process Blue C</option>
            <option value="#32CD32">Bright Green C</option>
            <option value="#FF4500">Warm Red C</option>
            <option value="#8A2BE2">Purple C</option>
            <option value="#20B2AA">Turquoise C</option>
        </select>
    </div>
    <button class="btn" onclick="convertPantone()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">HEX</div>
        <div class="result-value" id="hexResult"></div>
    </div>
    <div class="color-preview" id="preview"></div>
</div>
<script>
function convertPantone() {
    const hex = document.getElementById('pantoneInput').value;
    const name = document.getElementById('pantoneInput').options[document.getElementById('pantoneInput').selectedIndex].text;
    document.getElementById('hexResult').textContent = hex.toUpperCase();
    document.getElementById('preview').style.background = hex;
    document.getElementById('preview').textContent = name;
    document.getElementById('preview').style.color = getTextColorForBackground(hex);
    document.getElementById('result').style.display = 'block';
}
convertPantone();
</script>'''
        }
    ],
    'math': [
        {
            'id': 'calculator',
            'names': {
                'en': 'Calculator',
                'zh': '计算器',
                'es': 'Calculadora',
                'fr': 'Calculatrice',
                'de': 'Taschenrechner'
            },
            'desc': {
                'en': 'Basic arithmetic calculator',
                'zh': '基础算术计算器',
                'es': 'Calculadora aritmética básica',
                'fr': 'Calculatrice arithmétique de base',
                'de': 'Grundlegender arithmetischer Rechner'
            },
            'html': '''
<div class="card">
    <style>
        .calc-display { background: var(--bg-primary); padding: 20px; border-radius: 8px; text-align: right; font-size: 2rem; margin-bottom: 15px; overflow: hidden; }
        .calc-buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .calc-btn { padding: 20px; font-size: 1.2rem; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
        .calc-btn:hover { background: var(--border); }
        .calc-btn.operator { background: var(--accent); }
        .calc-btn.operator:hover { background: var(--accent-hover); }
        .calc-btn.equals { background: var(--success); grid-column: span 2; }
        .calc-btn.zero { grid-column: span 2; }
    </style>
    <div class="calc-display" id="display">0</div>
    <div class="calc-buttons">
        <button class="calc-btn" onclick="clearCalc()">C</button>
        <button class="calc-btn" onclick="append('/')">/</button>
        <button class="calc-btn" onclick="append('*')">×</button>
        <button class="calc-btn" onclick="backspace()">←</button>
        <button class="calc-btn" onclick="append('7')">7</button>
        <button class="calc-btn" onclick="append('8')">8</button>
        <button class="calc-btn" onclick="append('9')">9</button>
        <button class="calc-btn operator" onclick="append('-')">-</button>
        <button class="calc-btn" onclick="append('4')">4</button>
        <button class="calc-btn" onclick="append('5')">5</button>
        <button class="calc-btn" onclick="append('6')">6</button>
        <button class="calc-btn operator" onclick="append('+')">+</button>
        <button class="calc-btn" onclick="append('1')">1</button>
        <button class="calc-btn" onclick="append('2')">2</button>
        <button class="calc-btn" onclick="append('3')">3</button>
        <button class="calc-btn" onclick="append('.')">.</button>
        <button class="calc-btn zero" onclick="append('0')">0</button>
        <button class="calc-btn equals" onclick="calculate()">=</button>
    </div>
</div>
<script>
let current = '0';
function updateDisplay() { document.getElementById('display').textContent = current; }
function clearCalc() { current = '0'; updateDisplay(); }
function append(val) { if (current === '0') current = val; else current += val; updateDisplay(); }
function backspace() { current = current.slice(0, -1) || '0'; updateDisplay(); }
function calculate() { try { current = String(eval(current) || '0'); } catch { current = 'Error'; } updateDisplay(); }
</script>'''
        },
        {
            'id': 'scientific-calculator',
            'names': {
                'en': 'Scientific Calculator',
                'zh': '科学计算器',
                'es': 'Calculadora Científica',
                'fr': 'Calculatrice Scientifique',
                'de': 'Wissenschaftlicher Rechner'
            },
            'desc': {
                'en': 'Advanced calculator with scientific functions',
                'zh': '带科学函数的高级计算器',
                'es': 'Calculadora avanzada con funciones científicas',
                'fr': 'Calculatrice avancée avec fonctions scientifiques',
                'de': 'Erweiterter Rechner mit wissenschaftlichen Funktionen'
            },
            'html': '''
<div class="card">
    <style>
        .sci-display { background: var(--bg-primary); padding: 15px; border-radius: 8px; text-align: right; font-size: 1.5rem; margin-bottom: 10px; min-height: 50px; }
        .sci-buttons { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
        .sci-btn { padding: 12px 8px; font-size: 0.9rem; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary); cursor: pointer; }
        .sci-btn:hover { background: var(--border); }
        .sci-btn.fn { background: #2d3a4f; }
        .sci-btn.op { background: var(--accent); }
    </style>
    <div class="sci-display" id="sciDisplay">0</div>
    <div class="sci-buttons">
        <button class="sci-btn fn" onclick="sciClear()">C</button>
        <button class="sci-btn fn" onclick="sciFunc('sin')">sin</button>
        <button class="sci-btn fn" onclick="sciFunc('cos')">cos</button>
        <button class="sci-btn fn" onclick="sciFunc('tan')">tan</button>
        <button class="sci-btn fn" onclick="sciFunc('log')">log</button>
        <button class="sci-btn fn" onclick="sciFunc('ln')">ln</button>
        <button class="sci-btn fn" onclick="sciFunc('sqrt')">√</button>
        <button class="sci-btn fn" onclick="sciFunc('pow')">x²</button>
        <button class="sci-btn fn" onclick="sciAppend('(')">(</button>
        <button class="sci-btn fn" onclick="sciAppend(')')">)</button>
        <button class="sci-btn" onclick="sciAppend('7')">7</button>
        <button class="sci-btn" onclick="sciAppend('8')">8</button>
        <button class="sci-btn" onclick="sciAppend('9')">9</button>
        <button class="sci-btn op" onclick="sciAppend('/')">/</button>
        <button class="sci-btn fn" onclick="sciFunc('pi')">π</button>
        <button class="sci-btn" onclick="sciAppend('4')">4</button>
        <button class="sci-btn" onclick="sciAppend('5')">5</button>
        <button class="sci-btn" onclick="sciAppend('6')">6</button>
        <button class="sci-btn op" onclick="sciAppend('*')">×</button>
        <button class="sci-btn fn" onclick="sciFunc('e')">e</button>
        <button class="sci-btn" onclick="sciAppend('1')">1</button>
        <button class="sci-btn" onclick="sciAppend('2')">2</button>
        <button class="sci-btn" onclick="sciAppend('3')">3</button>
        <button class="sci-btn op" onclick="sciAppend('-')">-</button>
        <button class="sci-btn op" onclick="sciCalc()">=</button>
        <button class="sci-btn" onclick="sciAppend('0')" style="grid-column: span 2;">0</button>
        <button class="sci-btn" onclick="sciAppend('.')">.</button>
        <button class="sci-btn op" onclick="sciAppend('+')">+</button>
    </div>
</div>
<script>
let sciCurrent = '0';
function sciUpdate() { document.getElementById('sciDisplay').textContent = sciCurrent; }
function sciClear() { sciCurrent = '0'; sciUpdate(); }
function sciAppend(val) { sciCurrent = sciCurrent === '0' ? val : sciCurrent + val; sciUpdate(); }
function sciFunc(fn) {
    switch(fn) {
        case 'sin': sciCurrent = 'Math.sin(' + sciCurrent + ')'; break;
        case 'cos': sciCurrent = 'Math.cos(' + sciCurrent + ')'; break;
        case 'tan': sciCurrent = 'Math.tan(' + sciCurrent + ')'; break;
        case 'log': sciCurrent = 'Math.log10(' + sciCurrent + ')'; break;
        case 'ln': sciCurrent = 'Math.log(' + sciCurrent + ')'; break;
        case 'sqrt': sciCurrent = 'Math.sqrt(' + sciCurrent + ')'; break;
        case 'pow': sciCurrent = 'Math.pow(' + sciCurrent + ', 2)'; break;
        case 'pi': sciCurrent = sciCurrent === '0' ? 'Math.PI' : sciCurrent + 'Math.PI'; break;
        case 'e': sciCurrent = sciCurrent === '0' ? 'Math.E' : sciCurrent + 'Math.E'; break;
    }
    sciUpdate();
}
function sciCalc() { try { sciCurrent = String(eval(sciCurrent)); } catch { sciCurrent = 'Error'; } sciUpdate(); }
</script>'''
        },
        {
            'id': 'percentage',
            'names': {
                'en': 'Percentage Calculator',
                'zh': '百分比计算器',
                'es': 'Calculadora de Porcentajes',
                'fr': 'Calculateur de Pourcentages',
                'de': 'Prozentrechner'
            },
            'desc': {
                'en': 'Calculate percentages easily',
                'zh': '轻松计算百分比',
                'es': 'Calcula porcentajes fácilmente',
                'fr': 'Calculez les pourcentages facilement',
                'de': 'Berechnen Sie Prozentsätze einfach'
            },
            'html': '''
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">What is X% of Y?</h3>
    <div class="grid" style="grid-template-columns: 1fr auto 1fr auto;">
        <input type="number" id="p1" placeholder="X">
        <span style="align-self: center; padding: 0 10px;">%</span>
        <span style="align-self: center; padding: 0 10px;">of</span>
        <input type="number" id="v1" placeholder="Y">
    </div>
    <button class="btn" onclick="calc1()" style="margin: 15px 0;" data-t="calculate">Calculate</button>
    <div class="result-box" id="r1" style="display:none;"><div class="result-value" id="rv1"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">X is what % of Y?</h3>
    <div class="grid" style="grid-template-columns: 1fr auto 1fr;">
        <input type="number" id="p2" placeholder="X">
        <span style="align-self: center; padding: 0 10px;">is what % of</span>
        <input type="number" id="v2" placeholder="Y">
    </div>
    <button class="btn" onclick="calc2()" style="margin: 15px 0;" data-t="calculate">Calculate</button>
    <div class="result-box" id="r2" style="display:none;"><div class="result-value" id="rv2"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Percentage Change</h3>
    <div class="grid" style="grid-template-columns: 1fr auto 1fr;">
        <input type="number" id="fromVal" placeholder="From">
        <span style="align-self: center; padding: 0 10px;">→</span>
        <input type="number" id="toVal" placeholder="To">
    </div>
    <button class="btn" onclick="calc3()" style="margin: 15px 0;" data-t="calculate">Calculate</button>
    <div class="result-box" id="r3" style="display:none;"><div class="result-value" id="rv3"></div></div>
</div>
<script>
function calc1() { const p = parseFloat(document.getElementById('p1').value) || 0; const v = parseFloat(document.getElementById('v1').value) || 0; document.getElementById('rv1').textContent = (p * v / 100).toFixed(2); document.getElementById('r1').style.display = 'block'; }
function calc2() { const p = parseFloat(document.getElementById('p2').value) || 0; const v = parseFloat(document.getElementById('v2').value) || 0; document.getElementById('rv2').textContent = v ? ((p / v) * 100).toFixed(2) + '%' : '0%'; document.getElementById('r2').style.display = 'block'; }
function calc3() { const f = parseFloat(document.getElementById('fromVal').value) || 0; const t = parseFloat(document.getElementById('toVal').value) || 0; const change = f ? ((t - f) / f * 100).toFixed(2) : 0; document.getElementById('rv3').textContent = (change > 0 ? '+' : '') + change + '%'; document.getElementById('r3').style.display = 'block'; }
</script>'''
        },
        {
            'id': 'ratio',
            'names': {
                'en': 'Ratio Calculator',
                'zh': '比例计算器',
                'es': 'Calculadora de Razones',
                'fr': 'Calculateur de Ratios',
                'de': 'Verhältnisrechner'
            },
            'desc': {
                'en': 'Calculate and simplify ratios',
                'zh': '计算和简化比例',
                'es': 'Calcula y simplifica razones',
                'fr': 'Calculez et simplifiez les ratios',
                'de': 'Berechnen und vereinfachen Sie Verhältnisse'
            },
            'html': '''
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Simplify Ratio</h3>
    <div class="grid" style="grid-template-columns: 1fr auto 1fr;">
        <input type="number" id="r1a" placeholder="A">
        <span style="align-self: center; padding: 0 15px; font-size: 1.5rem;">:</span>
        <input type="number" id="r1b" placeholder="B">
    </div>
    <button class="btn" onclick="simplifyRatio()" style="margin: 15px 0;" data-t="simplify">Simplify</button>
    <div class="result-box" id="result1" style="display:none;"><div class="result-value" id="rv1"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Solve Proportion (A:B = C:D)</h3>
    <div class="grid" style="grid-template-columns: 1fr auto 1fr auto 1fr;">
        <input type="number" id="pA" placeholder="A">
        <span style="align-self: center; padding: 0 10px;">:</span>
        <input type="number" id="pB" placeholder="B">
        <span style="align-self: center; padding: 0 10px;">=</span>
        <input type="number" id="pC" placeholder="C">
    </div>
    <button class="btn" onclick="solveProportion()" style="margin: 15px 0;" data-t="solve">Find D</button>
    <div class="result-box" id="result2" style="display:none;"><div class="result-value" id="rv2"></div></div>
</div>
<script>
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
function simplifyRatio() { const a = parseInt(document.getElementById('r1a').value) || 0; const b = parseInt(document.getElementById('r1b').value) || 0; if (a && b) { const g = gcd(a, b); document.getElementById('rv1').textContent = (a/g) + ' : ' + (b/g); document.getElementById('result1').style.display = 'block'; } }
function solveProportion() { const a = parseFloat(document.getElementById('pA').value) || 0; const b = parseFloat(document.getElementById('pB').value) || 0; const c = parseFloat(document.getElementById('pC').value) || 0; if (a) { const d = (b * c) / a; document.getElementById('rv2').textContent = 'D = ' + d.toFixed(4); document.getElementById('result2').style.display = 'block'; } }
</script>'''
        },
        {
            'id': 'random-number',
            'names': {
                'en': 'Random Number Generator',
                'zh': '随机数生成器',
                'es': 'Generador de Números Aleatorios',
                'fr': 'Générateur de Nombres Aléatoires',
                'de': 'Zufallszahlengenerator'
            },
            'desc': {
                'en': 'Generate random numbers in a range',
                'zh': '在范围内生成随机数',
                'es': 'Genera números aleatorios en un rango',
                'fr': 'Générez des nombres aléatoires dans une plage',
                'de': 'Generieren Sie Zufallszahlen in einem Bereich'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>Min</label>
            <input type="number" id="minVal" value="1">
        </div>
        <div class="input-group">
            <label>Max</label>
            <input type="number" id="maxVal" value="100">
        </div>
        <div class="input-group">
            <label>Count</label>
            <input type="number" id="count" value="1" min="1" max="100">
        </div>
    </div>
    <div class="input-group">
        <label><input type="checkbox" id="unique"> Unique numbers only</label>
    </div>
    <button class="btn" onclick="generateRandom()" data-t="generate">Generate</button>
    <div class="result-box" id="result" style="display:none; margin-top: 20px;">
        <div class="result-value" id="randomResult" style="font-size: 2rem; text-align: center; padding: 20px;"></div>
    </div>
</div>
<script>
function generateRandom() {
    const min = parseInt(document.getElementById('minVal').value) || 0;
    const max = parseInt(document.getElementById('maxVal').value) || 100;
    const count = parseInt(document.getElementById('count').value) || 1;
    const unique = document.getElementById('unique').checked;
    if (unique && count > (max - min + 1)) { alert('Range too small for unique numbers'); return; }
    let results = [];
    let used = new Set();
    for (let i = 0; i < count; i++) {
        let num;
        do { num = Math.floor(Math.random() * (max - min + 1)) + min; } while (unique && used.has(num));
        used.add(num);
        results.push(num);
    }
    document.getElementById('randomResult').textContent = results.join(', ');
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'prime-checker',
            'names': {
                'en': 'Prime Number Checker',
                'zh': '质数检查器',
                'es': 'Verificador de Números Primos',
                'fr': 'Vérificateur de Nombres Premiers',
                'de': 'Primzahlprüfer'
            },
            'desc': {
                'en': 'Check if a number is prime',
                'zh': '检查数字是否为质数',
                'es': 'Verifica si un número es primo',
                'fr': 'Vérifiez si un nombre est premier',
                'de': 'Prüfen Sie, ob eine Zahl prim ist'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Enter a Number</label>
        <input type="number" id="numInput" placeholder="Enter number..." min="1">
    </div>
    <button class="btn" onclick="checkPrime()" data-t="check">Check</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-value" id="primeResult"></div>
    </div>
</div>
<script>
function isPrime(n) { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false; return true; }
function checkPrime() {
    const n = parseInt(document.getElementById('numInput').value);
    if (n < 1) { alert('Please enter a positive number'); return; }
    const prime = isPrime(n);
    document.getElementById('primeResult').innerHTML = prime ? `<span style="color: var(--success);">${n} is a PRIME number ✓</span>` : `<span style="color: var(--error);">${n} is NOT a prime number</span>`;
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'factorial',
            'names': {
                'en': 'Factorial Calculator',
                'zh': '阶乘计算器',
                'es': 'Calculadora de Factorial',
                'fr': 'Calculateur de Factorielle',
                'de': 'Fakultätsrechner'
            },
            'desc': {
                'en': 'Calculate factorial of a number (n!)',
                'zh': '计算数字的阶乘 (n!)',
                'es': 'Calcula el factorial de un número (n!)',
                'fr': 'Calculez la factorielle d\'un nombre (n!)',
                'de': 'Berechnen Sie die Fakultät einer Zahl (n!)'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Enter a Number (n)</label>
        <input type="number" id="numInput" placeholder="Enter number..." min="0" max="170">
    </div>
    <button class="btn" onclick="calcFactorial()" data-t="calculate">Calculate</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-label">n!</div>
        <div class="result-value" id="factResult"></div>
    </div>
</div>
<script>
function factorial(n) { if (n <= 1) return 1; let result = 1; for (let i = 2; i <= n; i++) result *= i; return result; }
function calcFactorial() {
    const n = parseInt(document.getElementById('numInput').value);
    if (n < 0 || n > 170) { alert('Please enter a number between 0 and 170'); return; }
    document.getElementById('factResult').textContent = factorial(n).toLocaleString();
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'fibonacci',
            'names': {
                'en': 'Fibonacci Generator',
                'zh': '斐波那契生成器',
                'es': 'Generador de Fibonacci',
                'fr': 'Générateur de Fibonacci',
                'de': 'Fibonacci-Generator'
            },
            'desc': {
                'en': 'Generate Fibonacci sequence',
                'zh': '生成斐波那契数列',
                'es': 'Genera la secuencia de Fibonacci',
                'fr': 'Générez la suite de Fibonacci',
                'de': 'Generieren Sie die Fibonacci-Folge'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Number of Terms</label>
        <input type="number" id="termsInput" value="10" min="1" max="50">
    </div>
    <button class="btn" onclick="generateFib()" data-t="generate">Generate</button>
    <div class="result-box" id="result" style="display:none; margin-top: 20px;">
        <div class="result-value" id="fibResult" style="font-size: 0.9rem; word-break: break-all;"></div>
    </div>
</div>
<script>
function generateFib() {
    const n = parseInt(document.getElementById('termsInput').value) || 10;
    let seq = [0, 1];
    for (let i = 2; i < n; i++) seq.push(seq[i-1] + seq[i-2]);
    document.getElementById('fibResult').textContent = seq.slice(0, n).join(', ');
    document.getElementById('result').style.display = 'block';
}
generateFib();
</script>'''
        },
        {
            'id': 'binary',
            'names': {
                'en': 'Binary Calculator',
                'zh': '二进制计算器',
                'es': 'Calculadora Binaria',
                'fr': 'Calculatrice Binaire',
                'de': 'Binärrechner'
            },
            'desc': {
                'en': 'Convert between binary and decimal',
                'zh': '二进制和十进制之间转换',
                'es': 'Convierte entre binario y decimal',
                'fr': 'Convertissez entre binaire et décimal',
                'de': 'Konvertieren Sie zwischen Binär und Dezimal'
            },
            'html': '''
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Decimal to Binary</h3>
    <div class="input-group">
        <label>Decimal Number</label>
        <input type="number" id="decInput" placeholder="Enter decimal...">
    </div>
    <button class="btn" onclick="toBinary()" data-t="convert">Convert</button>
    <div class="result-box" id="r1" style="display:none;"><div class="result-value" id="rv1"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Binary to Decimal</h3>
    <div class="input-group">
        <label>Binary Number</label>
        <input type="text" id="binInput" placeholder="Enter binary...">
    </div>
    <button class="btn" onclick="toDecimal()" data-t="convert">Convert</button>
    <div class="result-box" id="r2" style="display:none;"><div class="result-value" id="rv2"></div></div>
</div>
<script>
function toBinary() { const n = parseInt(document.getElementById('decInput').value); document.getElementById('rv1').textContent = n.toString(2); document.getElementById('r1').style.display = 'block'; }
function toDecimal() { const bin = document.getElementById('binInput').value; document.getElementById('rv2').textContent = parseInt(bin, 2); document.getElementById('r2').style.display = 'block'; }
</script>'''
        },
        {
            'id': 'hex-calculator',
            'names': {
                'en': 'Hex Calculator',
                'zh': '十六进制计算器',
                'es': 'Calculadora Hexadecimal',
                'fr': 'Calculateur Hexadécimal',
                'de': 'Hexadezimalrechner'
            },
            'desc': {
                'en': 'Convert between hexadecimal and decimal',
                'zh': '十六进制和十进制之间转换',
                'es': 'Convierte entre hexadecimal y decimal',
                'fr': 'Convertissez entre hexadécimal et décimal',
                'de': 'Konvertieren Sie zwischen Hexadezimal und Dezimal'
            },
            'html': '''
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Decimal to Hexadecimal</h3>
    <div class="input-group">
        <label>Decimal Number</label>
        <input type="number" id="decInput" placeholder="Enter decimal...">
    </div>
    <button class="btn" onclick="toHex()" data-t="convert">Convert</button>
    <div class="result-box" id="r1" style="display:none;"><div class="result-value" id="rv1"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Hexadecimal to Decimal</h3>
    <div class="input-group">
        <label>Hexadecimal Number</label>
        <input type="text" id="hexInput" placeholder="Enter hex (e.g., FF)...">
    </div>
    <button class="btn" onclick="hexToDec()" data-t="convert">Convert</button>
    <div class="result-box" id="r2" style="display:none;"><div class="result-value" id="rv2"></div></div>
</div>
<script>
function toHex() { const n = parseInt(document.getElementById('decInput').value); document.getElementById('rv1').textContent = '0x' + n.toString(16).toUpperCase(); document.getElementById('r1').style.display = 'block'; }
function hexToDec() { const hex = document.getElementById('hexInput').value; document.getElementById('rv2').textContent = parseInt(hex, 16); document.getElementById('r2').style.display = 'block'; }
</script>'''
        },
        {
            'id': 'roman-numerals',
            'names': {
                'en': 'Roman Numeral Converter',
                'zh': '罗马数字转换器',
                'es': 'Convertidor de Números Romanos',
                'fr': 'Convertisseur de Chiffres Romains',
                'de': 'Römische Zahlen Konverter'
            },
            'desc': {
                'en': 'Convert between numbers and Roman numerals',
                'zh': '数字和罗马数字之间转换',
                'es': 'Convierte entre números y romanos',
                'fr': 'Convertissez entre nombres et chiffres romains',
                'de': 'Konvertieren Sie zwischen Zahlen und römischen Zahlen'
            },
            'html': '''
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Number to Roman</h3>
    <div class="input-group">
        <label>Number (1-3999)</label>
        <input type="number" id="numInput" min="1" max="3999" placeholder="Enter number...">
    </div>
    <button class="btn" onclick="toRomanFn()" data-t="convert">Convert</button>
    <div class="result-box" id="r1" style="display:none;"><div class="result-value" id="rv1" style="font-size: 2rem;"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Roman to Number</h3>
    <div class="input-group">
        <label>Roman Numeral</label>
        <input type="text" id="romanInput" placeholder="Enter Roman numeral (e.g., MMXXIV)...">
    </div>
    <button class="btn" onclick="fromRomanFn()" data-t="convert">Convert</button>
    <div class="result-box" id="r2" style="display:none;"><div class="result-value" id="rv2"></div></div>
</div>
<script>
function toRomanFn() { const n = parseInt(document.getElementById('numInput').value); if (n < 1 || n > 3999) { alert('Please enter a number between 1 and 3999'); return; } document.getElementById('rv1').textContent = toRoman(n); document.getElementById('r1').style.display = 'block'; }
function fromRomanFn() { const r = document.getElementById('romanInput').value.toUpperCase(); document.getElementById('rv2').textContent = fromRoman(r); document.getElementById('r2').style.display = 'block'; }
</script>'''
        },
        {
            'id': 'currency',
            'names': {
                'en': 'Currency Converter',
                'zh': '货币转换器',
                'es': 'Conversor de Divisas',
                'fr': 'Convertisseur de Devises',
                'de': 'Währungsumrechner'
            },
            'desc': {
                'en': 'Convert between currencies (static rates)',
                'zh': '货币之间转换（静态汇率）',
                'es': 'Convierte entre divisas (tasas estáticas)',
                'fr': 'Convertissez entre devises (taux statiques)',
                'de': 'Konvertieren Sie zwischen Währungen (statische Kurse)'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>Amount</label>
            <input type="number" id="amount" value="100" min="0">
        </div>
        <div class="input-group">
            <label>From</label>
            <select id="fromCurr"></select>
        </div>
        <div class="input-group">
            <label>To</label>
            <select id="toCurr"></select>
        </div>
    </div>
    <button class="btn" onclick="convertCurrency()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none; margin-top: 20px;">
        <div class="result-value" id="currResult" style="font-size: 1.8rem;"></div>
    </div>
</div>
<script>
const currencies = Object.keys(CurrencyRates);
const fromSel = document.getElementById('fromCurr');
const toSel = document.getElementById('toCurr');
currencies.forEach(c => { fromSel.add(new Option(c, c)); toSel.add(new Option(c, c)); });
fromSel.value = 'USD'; toSel.value = 'EUR';
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const from = fromSel.value;
    const to = toSel.value;
    const rate = CurrencyRates[to] / CurrencyRates[from];
    const result = amount * rate;
    document.getElementById('currResult').textContent = result.toFixed(2) + ' ' + to;
    document.getElementById('result').style.display = 'block';
}
convertCurrency();
</script>'''
        }
    ],
    'date': [
        {
            'id': 'age-calculator',
            'names': {
                'en': 'Age Calculator',
                'zh': '年龄计算器',
                'es': 'Calculadora de Edad',
                'fr': 'Calculateur d\'Âge',
                'de': 'Altersrechner'
            },
            'desc': {
                'en': 'Calculate exact age from birthdate',
                'zh': '从出生日期计算确切年龄',
                'es': 'Calcula la edad exacta desde la fecha de nacimiento',
                'fr': 'Calculez l\'âge exact à partir de la date de naissance',
                'de': 'Berechnen Sie das genaue Alter aus dem Geburtsdatum'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Birth Date</label>
        <input type="date" id="birthDate">
    </div>
    <button class="btn" onclick="calcAge()" data-t="calculate">Calculate</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-value" id="ageResult"></div>
        <div id="ageDetails" style="margin-top: 15px; color: var(--text-secondary);"></div>
    </div>
</div>
<script>
function calcAge() {
    const birth = new Date(document.getElementById('birthDate').value);
    const now = new Date();
    if (!birth.getTime()) { alert('Please select a date'); return; }
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    document.getElementById('ageResult').textContent = years + ' years';
    document.getElementById('ageDetails').innerHTML = `${years} years, ${months} months, ${days} days<br>Total: ${totalDays.toLocaleString()} days`;
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'date-difference',
            'names': {
                'en': 'Date Difference Calculator',
                'zh': '日期差计算器',
                'es': 'Calculadora de Diferencia de Fechas',
                'fr': 'Calculateur de Différence de Dates',
                'de': 'Datumsdifferenzrechner'
            },
            'desc': {
                'en': 'Calculate days between two dates',
                'zh': '计算两个日期之间的天数',
                'es': 'Calcula los días entre dos fechas',
                'fr': 'Calculez les jours entre deux dates',
                'de': 'Berechnen Sie die Tage zwischen zwei Daten'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>Start Date</label>
            <input type="date" id="startDate">
        </div>
        <div class="input-group">
            <label>End Date</label>
            <input type="date" id="endDate">
        </div>
    </div>
    <button class="btn" onclick="calcDiff()" data-t="calculate">Calculate</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-value" id="diffResult"></div>
        <div id="diffDetails" style="margin-top: 15px; color: var(--text-secondary);"></div>
    </div>
</div>
<script>
function calcDiff() {
    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);
    if (!start.getTime() || !end.getTime()) { alert('Please select both dates'); return; }
    const diffMs = Math.abs(end - start);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);
    document.getElementById('diffResult').textContent = days + ' days';
    document.getElementById('diffDetails').innerHTML = `${weeks} weeks<br>${months} months<br>${years} years`;
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'day-of-week',
            'names': {
                'en': 'Day of Week Calculator',
                'zh': '星期计算器',
                'es': 'Calculadora de Día de la Semana',
                'fr': 'Calculateur de Jour de la Semaine',
                'de': 'Wochentagsrechner'
            },
            'desc': {
                'en': 'Find what day of the week for any date',
                'zh': '查找任何日期是星期几',
                'es': 'Encuentra el día de la semana para cualquier fecha',
                'fr': 'Trouvez le jour de la semaine pour n\'importe quelle date',
                'de': 'Finden Sie den Wochentag für jedes Datum'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Select Date</label>
        <input type="date" id="dateInput">
    </div>
    <button class="btn" onclick="calcDay()" data-t="calculate">Calculate</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-value" id="dayResult" style="font-size: 2rem;"></div>
    </div>
</div>
<script>
const days = {en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'], es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'], de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']};
function calcDay() {
    const date = new Date(document.getElementById('dateInput').value);
    if (!date.getTime()) { alert('Please select a date'); return; }
    const lang = getLang();
    document.getElementById('dayResult').textContent = days[lang][date.getDay()];
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'birthday-calculator',
            'names': {
                'en': 'Birthday Calculator',
                'zh': '生日计算器',
                'es': 'Calculadora de Cumpleaños',
                'fr': 'Calculateur d\'Anniversaire',
                'de': 'Geburtstagsrechner'
            },
            'desc': {
                'en': 'Calculate upcoming birthday and countdown',
                'zh': '计算即将到来的生日和倒计时',
                'es': 'Calcula el próximo cumpleaños y cuenta regresiva',
                'fr': 'Calculez le prochain anniversaire et le compte à rebours',
                'de': 'Berechnen Sie den nächsten Geburtstag und den Countdown'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Your Birth Date</label>
        <input type="date" id="birthDate">
    </div>
    <button class="btn" onclick="calcBirthday()" data-t="calculate">Calculate</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-value" id="bdayResult"></div>
        <div id="bdayDetails" style="margin-top: 15px; color: var(--text-secondary);"></div>
    </div>
</div>
<script>
function calcBirthday() {
    const birth = new Date(document.getElementById('birthDate').value);
    if (!birth.getTime()) { alert('Please select a date'); return; }
    const now = new Date();
    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
    const diffMs = nextBday - now;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const age = nextBday.getFullYear() - birth.getFullYear();
    document.getElementById('bdayResult').textContent = days + ' days left';
    document.getElementById('bdayDetails').innerHTML = `Next birthday: ${nextBday.toDateString()}<br>You will be: ${age} years old`;
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'countdown',
            'names': {
                'en': 'Countdown Timer',
                'zh': '倒计时器',
                'es': 'Temporizador de Cuenta Regresiva',
                'fr': 'Minuteur Compte à Rebours',
                'de': 'Countdown-Timer'
            },
            'desc': {
                'en': 'Create countdown to a specific date',
                'zh': '创建到特定日期的倒计时',
                'es': 'Crea una cuenta regresiva a una fecha específica',
                'fr': 'Créez un compte à rebours jusqu\'à une date spécifique',
                'de': 'Erstellen Sie einen Countdown zu einem bestimmten Datum'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Target Date & Time</label>
        <input type="datetime-local" id="targetDate">
    </div>
    <button class="btn" onclick="startCountdown()" data-t="start">Start</button>
    <button class="btn btn-secondary" onclick="stopCountdown()" data-t="stop">Stop</button>
    <div class="result-box" id="result" style="margin-top: 20px;">
        <div class="result-value" id="countdownDisplay" style="font-size: 2.5rem; text-align: center;">00:00:00:00</div>
    </div>
</div>
<script>
let countdownInterval;
function startCountdown() {
    const target = new Date(document.getElementById('targetDate').value);
    if (!target.getTime()) { alert('Please select date and time'); return; }
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) { clearInterval(countdownInterval); document.getElementById('countdownDisplay').textContent = 'Time\'s Up!'; return; }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('countdownDisplay').textContent = `${String(days).padStart(2,'0')}:${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    }, 1000);
}
function stopCountdown() { clearInterval(countdownInterval); }
</script>'''
        },
        {
            'id': 'stopwatch',
            'names': {
                'en': 'Stopwatch',
                'zh': '秒表',
                'es': 'Cronómetro',
                'fr': 'Chronomètre',
                'de': 'Stoppuhr'
            },
            'desc': {
                'en': 'Simple stopwatch with lap times',
                'zh': '带圈速的简单秒表',
                'es': 'Cronómetro simple con vueltas',
                'fr': 'Chronomètre simple avec tours',
                'de': 'Einfache Stoppuhr mit Rundenzeiten'
            },
            'html': '''
<div class="card">
    <div class="result-box" style="text-align: center;">
        <div class="result-value" id="stopwatchDisplay" style="font-size: 3rem;">00:00:00</div>
    </div>
    <div style="display: flex; gap: 10px; justify-content: center; margin: 20px 0;">
        <button class="btn" onclick="startStopwatch()" data-t="start">Start</button>
        <button class="btn btn-secondary" onclick="pauseStopwatch()" data-t="pause">Pause</button>
        <button class="btn btn-secondary" onclick="lapStopwatch()" data-t="lap">Lap</button>
        <button class="btn btn-secondary" onclick="resetStopwatch()" data-t="reset">Reset</button>
    </div>
    <div id="laps" style="max-height: 200px; overflow-y: auto; background: var(--bg-primary); border-radius: 8px; padding: 15px;"></div>
</div>
<script>
let swInterval, swStart, swElapsed = 0, swRunning = false;
function formatTime(ms) { const m = Math.floor(ms / 60000); const s = Math.floor((ms % 60000) / 1000); const cs = Math.floor((ms % 1000) / 10); return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(cs).padStart(2,'0')}`; }
function startStopwatch() { if (!swRunning) { swRunning = true; swStart = Date.now() - swElapsed; swInterval = setInterval(() => { swElapsed = Date.now() - swStart; document.getElementById('stopwatchDisplay').textContent = formatTime(swElapsed); }, 10); } }
function pauseStopwatch() { swRunning = false; clearInterval(swInterval); }
function lapStopwatch() { const lap = document.createElement('div'); lap.textContent = document.getElementById('stopwatchDisplay').textContent; lap.style.padding = '5px 0'; lap.style.borderBottom = '1px solid var(--border)'; document.getElementById('laps').prepend(lap); }
function resetStopwatch() { swRunning = false; clearInterval(swInterval); swElapsed = 0; document.getElementById('stopwatchDisplay').textContent = '00:00:00'; document.getElementById('laps').innerHTML = ''; }
</script>'''
        },
        {
            'id': 'timezone',
            'names': {
                'en': 'Time Zone Converter',
                'zh': '时区转换器',
                'es': 'Conversor de Zonas Horarias',
                'fr': 'Convertisseur de Fuseaux Horaires',
                'de': 'Zeitzonen-Konverter'
            },
            'desc': {
                'en': 'Convert time between time zones',
                'zh': '时区之间转换时间',
                'es': 'Convierte tiempo entre zonas horarias',
                'fr': 'Convertissez l\'heure entre fuseaux horaires',
                'de': 'Konvertieren Sie Zeit zwischen Zeitzonen'
            },
            'html': '''
<div class="card">
    <div class="input-group">
        <label>Date & Time</label>
        <input type="datetime-local" id="datetimeInput">
    </div>
    <div class="grid">
        <div class="input-group">
            <label>From Timezone</label>
            <select id="fromZone">
                <option value="UTC">UTC</option>
                <option value="America/New_York">New York (EST/EDT)</option>
                <option value="America/Los_Angeles">Los Angeles (PST/PDT)</option>
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Paris">Paris (CET/CEST)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Shanghai" selected>Shanghai (CST)</option>
                <option value="Australia/Sydney">Sydney (AEST)</option>
            </select>
        </div>
        <div class="input-group">
            <label>To Timezone</label>
            <select id="toZone">
                <option value="UTC">UTC</option>
                <option value="America/New_York" selected>New York (EST/EDT)</option>
                <option value="America/Los_Angeles">Los Angeles (PST/PDT)</option>
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Paris">Paris (CET/CEST)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Shanghai">Shanghai (CST)</option>
                <option value="Australia/Sydney">Sydney (AEST)</option>
            </select>
        </div>
    </div>
    <button class="btn" onclick="convertTimezone()" data-t="convert">Convert</button>
    <div class="result-box" id="result" style="display:none; margin-top: 20px;">
        <div class="result-value" id="timeResult" style="font-size: 1.5rem;"></div>
    </div>
</div>
<script>
function convertTimezone() {
    const dt = document.getElementById('datetimeInput').value;
    if (!dt) { alert('Please select date and time'); return; }
    const fromZone = document.getElementById('fromZone').value;
    const toZone = document.getElementById('toZone').value;
    const date = new Date(dt);
    const fromOffset = getOffset(date, fromZone);
    const toOffset = getOffset(date, toZone);
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const converted = new Date(utc + (toOffset * 60000));
    document.getElementById('timeResult').textContent = converted.toLocaleString() + ' ' + toZone;
    document.getElementById('result').style.display = 'block';
}
function getOffset(date, zone) { const d = new Date(date.toLocaleString('en-US', {timeZone: zone})); return (d - date) / 60000 + date.getTimezoneOffset(); }
</script>'''
        },
        {
            'id': 'unix-timestamp',
            'names': {
                'en': 'Unix Timestamp Converter',
                'zh': 'Unix时间戳转换器',
                'es': 'Conversor de Timestamp Unix',
                'fr': 'Convertisseur de Timestamp Unix',
                'de': 'Unix-Zeitstempel-Konverter'
            },
            'desc': {
                'en': 'Convert between Unix timestamps and dates',
                'zh': 'Unix时间戳和日期之间转换',
                'es': 'Convierte entre timestamps Unix y fechas',
                'fr': 'Convertissez entre timestamps Unix et dates',
                'de': 'Konvertieren Sie zwischen Unix-Zeitstempeln und Daten'
            },
            'html': '''
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Unix Timestamp to Date</h3>
    <div class="input-group">
        <label>Timestamp (seconds)</label>
        <input type="number" id="timestampInput" placeholder="e.g., 1700000000">
    </div>
    <button class="btn" onclick="tsToDate()" data-t="convert">Convert</button>
    <div class="result-box" id="r1" style="display:none;"><div class="result-value" id="rv1"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Date to Unix Timestamp</h3>
    <div class="input-group">
        <label>Date & Time</label>
        <input type="datetime-local" id="dateInput">
    </div>
    <button class="btn" onclick="dateToTs()" data-t="convert">Convert</button>
    <div class="result-box" id="r2" style="display:none;"><div class="result-value" id="rv2"></div></div>
</div>
<div class="card">
    <h3 style="margin-bottom: 15px; color: var(--accent);">Current Timestamp</h3>
    <button class="btn" onclick="currentTs()" data-t="getCurrent">Get Current</button>
    <div class="result-box" id="r3" style="display:none; margin-top: 15px;">
        <div style="display: grid; gap: 10px;">
            <div>Seconds: <span class="result-value" id="rv3s"></span></div>
            <div>Milliseconds: <span class="result-value" id="rv3ms"></span></div>
        </div>
    </div>
</div>
<script>
function tsToDate() { const ts = parseInt(document.getElementById('timestampInput').value); const date = new Date(ts * 1000); document.getElementById('rv1').textContent = date.toLocaleString(); document.getElementById('r1').style.display = 'block'; }
function dateToTs() { const dt = document.getElementById('dateInput').value; if (!dt) return; const date = new Date(dt); document.getElementById('rv2').textContent = Math.floor(date.getTime() / 1000); document.getElementById('r2').style.display = 'block'; }
function currentTs() { const now = Date.now(); document.getElementById('rv3s').textContent = Math.floor(now / 1000); document.getElementById('rv3ms').textContent = now; document.getElementById('r3').style.display = 'block'; }
</script>'''
        },
        {
            'id': 'working-days',
            'names': {
                'en': 'Working Days Calculator',
                'zh': '工作日计算器',
                'es': 'Calculadora de Días Laborables',
                'fr': 'Calculateur de Jours Ouvrés',
                'de': 'Arbeitstage-Rechner'
            },
            'desc': {
                'en': 'Calculate business days between dates',
                'zh': '计算日期之间的工作日',
                'es': 'Calcula días laborables entre fechas',
                'fr': 'Calculez les jours ouvrés entre dates',
                'de': 'Berechnen Sie Arbeitstage zwischen Daten'
            },
            'html': '''
<div class="card">
    <div class="grid">
        <div class="input-group">
            <label>Start Date</label>
            <input type="date" id="startDate">
        </div>
        <div class="input-group">
            <label>End Date</label>
            <input type="date" id="endDate">
        </div>
    </div>
    <button class="btn" onclick="calcWorkingDays()" data-t="calculate">Calculate</button>
    <div class="result-box" id="result" style="display:none;">
        <div class="result-value" id="wdResult"></div>
        <div id="wdDetails" style="margin-top: 15px; color: var(--text-secondary);"></div>
    </div>
</div>
<script>
function calcWorkingDays() {
    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);
    if (!start.getTime() || !end.getTime()) { alert('Please select both dates'); return; }
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const working = getWorkingDays(start, end);
    const weekends = totalDays - working;
    document.getElementById('wdResult').textContent = working + ' working days';
    document.getElementById('wdDetails').innerHTML = `Total days: ${totalDays}<br>Weekends: ${weekends}`;
    document.getElementById('result').style.display = 'block';
}
</script>'''
        },
        {
            'id': 'calendar',
            'names': {
                'en': 'Calendar Generator',
                'zh': '日历生成器',
                'es': 'Generador de Calendario',
                'fr': 'Générateur de Calendrier',
                'de': 'Kalendergenerator'
            },
            'desc': {
                'en': 'Generate a monthly calendar',
                'zh': '生成月度日历',
                'es': 'Genera un calendario mensual',
                'fr': 'Générez un calendrier mensuel',
                'de': 'Generieren Sie einen Monatskalender'
            },
            'html': '''
<div class="card">
    <div class="grid" style="grid-template-columns: 2fr 1fr auto;">
        <div class="input-group">
            <label>Month</label>
            <select id="month">
                <option value="0">January</option><option value="1">February</option><option value="2">March</option>
                <option value="3">April</option><option value="4">May</option><option value="5">June</option>
                <option value="6">July</option><option value="7">August</option><option value="8">September</option>
                <option value="9">October</option><option value="10">November</option><option value="11">December</option>
            </select>
        </div>
        <div class="input-group">
            <label>Year</label>
            <input type="number" id="year" value="2024">
        </div>
        <button class="btn" onclick="generateCalendar()" data-t="generate" style="align-self: end;">Generate</button>
    </div>
    <div id="calendar" style="margin-top: 20px;"></div>
</div>
<style>
.cal-table { width: 100%; border-collapse: collapse; }
.cal-table th, .cal-table td { padding: 12px; text-align: center; border: 1px solid var(--border); }
.cal-table th { background: var(--accent); color: white; }
.cal-table td { background: var(--bg-tertiary); }
.cal-table td.other { color: var(--text-muted); }
.cal-table td.today { background: var(--accent); color: white; font-weight: bold; }
.cal-header { text-align: center; font-size: 1.3rem; margin-bottom: 15px; color: var(--accent); }
</style>
<script>
const months = {en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']};
const days = {en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], zh: ['日', '一', '二', '三', '四', '五', '六'], es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'], de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']};
document.getElementById('month').value = new Date().getMonth();
document.getElementById('year').value = new Date().getFullYear();
function generateCalendar() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const lang = getLang();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    let html = `<div class="cal-header">${months[lang][month]} ${year}</div>`;
    html += '<table class="cal-table"><tr>' + days[lang].map(d => `<th>${d}</th>`).join('') + '</tr><tr>';
    for (let i = firstDay - 1; i >= 0; i--) html += `<td class="other">${daysInPrevMonth - i}</td>`;
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        html += `<td class="${isToday ? 'today' : ''}">${day}</td>`;
        if ((firstDay + day) % 7 === 0) html += '</tr><tr>';
    }
    const remaining = (7 - ((firstDay + daysInMonth) % 7)) % 7;
    for (let i = 1; i <= remaining; i++) html += `<td class="other">${i}</td>`;
    html += '</tr></table>';
    document.getElementById('calendar').innerHTML = html;
}
generateCalendar();
</script>'''
        }
    ]
}

# Template for each HTML file
HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - 205 Tools</title>
    <link rel="stylesheet" href="../../shared.css">
</head>
<body>
    <div class="language-selector">
        <select onchange="changeLang(this.value)">
            <option value="en" {sel_en}>English</option>
            <option value="zh" {sel_zh}>中文</option>
            <option value="es" {sel_es}>Español</option>
            <option value="fr" {sel_fr}>Français</option>
            <option value="de" {sel_de}>Deutsch</option>
        </select>
    </div>
    
    <header>
        <div class="container">
            <h1><span>205</span> Tools</h1>
        </div>
    </header>
    
    <div class="container">
        <div class="tool-container">
            <h2 class="tool-title">{title}</h2>
            <p class="tool-description">{description}</p>
            {content}
        </div>
    </div>
    
    <div class="footer">
        <p>{footer} - <a href="../../index.html">205 Tools</a></p>
    </div>
    
    <script src="../../shared.js"></script>
    <script>
        function changeLang(lang) {{
            const path = window.location.pathname;
            const newPath = path.replace(/\/(en|zh|es|fr|de)\//, '/' + lang + '/');
            window.location.href = newPath;
        }}
    </script>
    <style>
        @keyframes fadeInOut {{
            0% {{ opacity: 0; transform: translateX(-50%) translateY(20px); }}
            20% {{ opacity: 1; transform: translateX(-50%) translateY(0); }}
            80% {{ opacity: 1; transform: translateX(-50%) translateY(0); }}
            100% {{ opacity: 0; transform: translateX(-50%) translateY(-20px); }}
        }}
    </style>
</body>
</html>'''

# Generate all files
count = 0
for category, tools in TOOLS.items():
    for tool in tools:
        for lang in LANGS:
            # Create directory structure: tools/{category}/{lang}/
            dir_path = f'{category}/{lang}'
            os.makedirs(dir_path, exist_ok=True)
            
            # Generate HTML
            filename = f'{dir_path}/{tool["id"]}.html'
            sel_attrs = {f'sel_{l}': 'selected' if l == lang else '' for l in LANGS}
            
            html = HTML_TEMPLATE.format(
                lang=lang,
                title=tool['names'][lang],
                description=tool['desc'][lang],
                content=tool['html'],
                footer={'en': 'Part of 205 Tools Collection', 'zh': '205工具集的一部分', 'es': 'Parte de la colección de 205 herramientas', 'fr': 'Fait partie de la collection de 205 outils', 'de': 'Teil der 205-Tools-Sammlung'}[lang],
                sel_en=sel_attrs['sel_en'],
                sel_zh=sel_attrs['sel_zh'],
                sel_es=sel_attrs['sel_es'],
                sel_fr=sel_attrs['sel_fr'],
                sel_de=sel_attrs['sel_de']
            )
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(html)
            count += 1
            print(f'Created: {filename}')

print(f'\nTotal files created: {count}')
