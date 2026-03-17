// Shared utilities and translations for 205-tools
const Translations = {
  en: {
    home: 'Home',
    copy: 'Copy',
    copied: 'Copied!',
    calculate: 'Calculate',
    convert: 'Convert',
    generate: 'Generate',
    reset: 'Reset',
    start: 'Start',
    stop: 'Stop',
    pause: 'Pause',
    resume: 'Resume',
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
    selectLanguage: 'Select Language',
    footer: 'Part of 205 Tools Collection'
  },
  zh: {
    home: '首页',
    copy: '复制',
    copied: '已复制!',
    calculate: '计算',
    convert: '转换',
    generate: '生成',
    reset: '重置',
    start: '开始',
    stop: '停止',
    pause: '暂停',
    resume: '继续',
    error: '错误',
    success: '成功',
    loading: '加载中...',
    selectLanguage: '选择语言',
    footer: '205工具集的一部分'
  },
  es: {
    home: 'Inicio',
    copy: 'Copiar',
    copied: '¡Copiado!',
    calculate: 'Calcular',
    convert: 'Convertir',
    generate: 'Generar',
    reset: 'Reiniciar',
    start: 'Iniciar',
    stop: 'Detener',
    pause: 'Pausar',
    resume: 'Reanudar',
    error: 'Error',
    success: 'Éxito',
    loading: 'Cargando...',
    selectLanguage: 'Seleccionar Idioma',
    footer: 'Parte de la colección de 205 herramientas'
  },
  fr: {
    home: 'Accueil',
    copy: 'Copier',
    copied: 'Copié!',
    calculate: 'Calculer',
    convert: 'Convertir',
    generate: 'Générer',
    reset: 'Réinitialiser',
    start: 'Démarrer',
    stop: 'Arrêter',
    pause: 'Pause',
    resume: 'Reprendre',
    error: 'Erreur',
    success: 'Succès',
    loading: 'Chargement...',
    selectLanguage: 'Choisir la Langue',
    footer: 'Fait partie de la collection de 205 outils'
  },
  de: {
    home: 'Startseite',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    calculate: 'Berechnen',
    convert: 'Konvertieren',
    generate: 'Generieren',
    reset: 'Zurücksetzen',
    start: 'Starten',
    stop: 'Stoppen',
    pause: 'Pause',
    resume: 'Fortsetzen',
    error: 'Fehler',
    success: 'Erfolg',
    loading: 'Laden...',
    selectLanguage: 'Sprache Wählen',
    footer: 'Teil der 205-Tools-Sammlung'
  }
};

// Utility functions
function getLang() {
  const path = window.location.pathname;
  const match = path.match(/\/(en|zh|es|fr|de)\//);
  return match ? match[1] : 'en';
}

function t(key) {
  const lang = getLang();
  return Translations[lang]?.[key] || Translations.en[key] || key;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(t('copied'));
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 1000;
    animation: fadeInOut 2s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToCmyk(r, g, b) {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, m, y);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

function cmykToRgb(c, m, y, k) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function getLuminance({r, g, b}) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getTextColorForBackground(hex) {
  const rgb = hexToRgb(hex);
  const luminance = getLuminance(rgb);
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Roman numeral conversion
function toRoman(num) {
  const roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let str = '';
  for (let i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
}

function fromRoman(str) {
  const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    const curr = roman[str[i]];
    const next = roman[str[i + 1]];
    if (next && curr < next) num -= curr;
    else num += curr;
  }
  return num;
}

// Currency rates (static)
const CurrencyRates = {
  USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110, CNY: 6.45,
  AUD: 1.35, CAD: 1.25, CHF: 0.92, SEK: 8.5, NZD: 1.42,
  KRW: 1180, SGD: 1.35, HKD: 7.8, INR: 74, RUB: 73,
  BRL: 5.2, MXN: 20, ZAR: 14.5, TRY: 8.5, AED: 3.67
};

// Working days calculation
function getWorkingDays(start, end) {
  let count = 0;
  const cur = new Date(start);
  const endDate = new Date(end);
  while (cur <= endDate) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}
