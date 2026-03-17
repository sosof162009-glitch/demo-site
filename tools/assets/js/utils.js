/**
 * 205 Tools - Shared Utilities
 */

// Copy to clipboard
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = btn.dataset.success || 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  });
}

// Download text as file
function downloadText(text, filename) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// QR Code Generator using QRCode.js
function generateQR(text, container, options = {}) {
  const defaultOptions = {
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  };
  const opts = { ...defaultOptions, ...options };
  
  container.innerHTML = '';
  new QRCode(container, {
    text: text,
    width: opts.width,
    height: opts.height,
    colorDark: opts.colorDark,
    colorLight: opts.colorLight,
    correctLevel: opts.correctLevel
  });
}

// Barcode Generator using JsBarcode
function generateBarcode(text, container, options = {}) {
  const defaultOptions = {
    format: 'CODE128',
    width: 2,
    height: 100,
    displayValue: true
  };
  const opts = { ...defaultOptions, ...options };
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  container.innerHTML = '';
  container.appendChild(svg);
  
  JsBarcode(svg, text, opts);
}

// Tab switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format number with commas
function formatNumber(num, decimals = 2) {
  return parseFloat(num).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}

// Validate URL
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Generate random ID
function generateId(length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
}

// Convert unit converter
function convertLength(value, from, to) {
  const toMeters = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    ft: 0.3048,
    in: 0.0254,
    mi: 1609.344,
    yd: 0.9144
  };
  const meters = value * toMeters[from];
  return meters / toMeters[to];
}

function convertWeight(value, from, to) {
  const toGrams = {
    g: 1,
    kg: 1000,
    mg: 0.001,
    lb: 453.592,
    oz: 28.3495,
    t: 1000000
  };
  const grams = value * toGrams[from];
  return grams / toGrams[to];
}

function convertTemperature(value, from, to) {
  let celsius;
  switch(from) {
    case 'C': celsius = value; break;
    case 'F': celsius = (value - 32) * 5/9; break;
    case 'K': celsius = value - 273.15; break;
  }
  switch(to) {
    case 'C': return celsius;
    case 'F': return celsius * 9/5 + 32;
    case 'K': return celsius + 273.15;
  }
}

function convertVolume(value, from, to) {
  const toLiters = {
    L: 1,
    mL: 0.001,
    gal: 3.78541,
    qt: 0.946353,
    pt: 0.473176,
    cup: 0.24,
    floz: 0.0295735
  };
  const liters = value * toLiters[from];
  return liters / toLiters[to];
}

function convertArea(value, from, to) {
  const toSqMeters = {
    m2: 1,
    km2: 1000000,
    ft2: 0.092903,
    acre: 4046.86,
    ha: 10000,
    mi2: 2589988.11
  };
  const sqMeters = value * toSqMeters[from];
  return sqMeters / toSqMeters[to];
}

function convertSpeed(value, from, to) {
  const toMps = {
    mps: 1,
    kmh: 0.277778,
    mph: 0.44704,
    knot: 0.514444,
    mach: 343
  };
  const mps = value * toMps[from];
  return mps / toMps[to];
}

function convertPressure(value, from, to) {
  const toPascal = {
    pa: 1,
    kpa: 1000,
    bar: 100000,
    psi: 6894.76,
    atm: 101325,
    mmhg: 133.322
  };
  const pascal = value * toPascal[from];
  return pascal / toPascal[to];
}

function convertEnergy(value, from, to) {
  const toJoules = {
    j: 1,
    kj: 1000,
    cal: 4.184,
    kcal: 4184,
    wh: 3600,
    kwh: 3600000,
    ev: 1.602e-19
  };
  const joules = value * toJoules[from];
  return joules / toJoules[to];
}

function convertPower(value, from, to) {
  const toWatts = {
    w: 1,
    kw: 1000,
    mw: 1000000,
    hp: 745.7,
    bhp: 745.7,
    ftlbs: 1.35582
  };
  const watts = value * toWatts[from];
  return watts / toWatts[to];
}

function convertData(value, from, to) {
  const toBytes = {
    b: 1,
    kb: 1024,
    mb: 1048576,
    gb: 1073741824,
    tb: 1099511627776,
    pb: 1125899906842624
  };
  const bytes = value * toBytes[from];
  return bytes / toBytes[to];
}

function convertTime(value, from, to) {
  const toSeconds = {
    s: 1,
    min: 60,
    h: 3600,
    d: 86400,
    wk: 604800,
    mo: 2592000,
    y: 31536000
  };
  const seconds = value * toSeconds[from];
  return seconds / toSeconds[to];
}

function convertAngle(value, from, to) {
  const toDegrees = {
    deg: 1,
    rad: 57.2958,
    grad: 0.9
  };
  const degrees = value * toDegrees[from];
  return degrees / toDegrees[to];
}

function convertFrequency(value, from, to) {
  const toHz = {
    hz: 1,
    khz: 1000,
    mhz: 1000000,
    ghz: 1000000000
  };
  const hz = value * toHz[from];
  return hz / toHz[to];
}

function convertFuelEconomy(value, from, to) {
  // Convert to L/100km first
  let lPer100km;
  if (from === 'mpg_us') lPer100km = 235.215 / value;
  else if (from === 'mpg_uk') lPer100km = 282.481 / value;
  else if (from === 'l100km') lPer100km = value;
  else if (from === 'kpl') lPer100km = 100 / value;
  
  if (to === 'mpg_us') return 235.215 / lPer100km;
  else if (to === 'mpg_uk') return 282.481 / lPer100km;
  else if (to === 'l100km') return lPer100km;
  else if (to === 'kpl') return 100 / lPer100km;
}

function convertResolution(value, from, to, dpi = 96) {
  // Convert to pixels first
  let pixels;
  if (from === 'px') pixels = value;
  else if (from === 'pt') pixels = value * dpi / 72;
  else if (from === 'dp') pixels = value * (dpi / 160);
  else if (from === 'rem') pixels = value * 16;
  
  if (to === 'px') return pixels;
  else if (to === 'pt') return pixels * 72 / dpi;
  else if (to === 'dp') return pixels / (dpi / 160);
  else if (to === 'rem') return pixels / 16;
}

function convertShoeSize(value, from, to) {
  // US to EU conversion
  const conversions = {
    'us_m': { 'eu': 33, 'uk': -0.5 },
    'us_w': { 'eu': 30.5, 'uk': -2 },
    'uk': { 'eu': 33.5, 'us_m': 0.5 },
    'eu': { 'us_m': -33, 'uk': -33.5 }
  };
  
  if (from === to) return value;
  
  // Simplified conversion logic
  let usMen;
  if (from === 'us_m') usMen = value;
  else if (from === 'us_w') usMen = value - 1.5;
  else if (from === 'uk') usMen = value + 0.5;
  else if (from === 'eu') usMen = (value - 33);
  
  if (to === 'us_m') return usMen;
  else if (to === 'us_w') return usMen + 1.5;
  else if (to === 'uk') return usMen - 0.5;
  else if (to === 'eu') return Math.round(usMen + 33);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    copyToClipboard,
    downloadText,
    generateQR,
    generateBarcode,
    switchTab,
    debounce,
    formatNumber,
    isValidURL,
    generateId,
    convertLength,
    convertWeight,
    convertTemperature,
    convertVolume,
    convertArea,
    convertSpeed,
    convertPressure,
    convertEnergy,
    convertPower,
    convertData,
    convertTime,
    convertAngle,
    convertFrequency,
    convertFuelEconomy,
    convertResolution,
    convertShoeSize
  };
}
