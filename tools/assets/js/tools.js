/**
 * 205 Tools - Common Tool Utilities
 * Shared JavaScript functionality for all tools
 */

const Tools = {
  // Current language
  lang: document.documentElement.lang || 'en',
  
  // Translations
  t: function(key) {
    const translations = window.translations || {};
    return translations[key] || key;
  },

  // File size formatter
  formatFileSize: function(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Show notification
  notify: function(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
          : type === 'error'
          ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
          : '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
        }
      </svg>
      <span>${message}</span>
    `;
    
    const container = document.querySelector('.tool-container') || document.body;
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => alert.remove(), 5000);
  },

  // Show loading
  showLoading: function(message) {
    const loading = document.createElement('div');
    loading.id = 'global-loading';
    loading.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(10, 10, 15, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      gap: 16px;
    `;
    loading.innerHTML = `
      <div class="spinner"></div>
      <p style="color: var(--text-secondary);">${message}</p>
    `;
    document.body.appendChild(loading);
  },

  // Hide loading
  hideLoading: function() {
    const loading = document.getElementById('global-loading');
    if (loading) loading.remove();
  },

  // Download file
  downloadFile: function(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Copy to clipboard
  copyToClipboard: async function(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.notify(this.t('copied') || 'Copied to clipboard!');
    } catch (err) {
      this.notify(this.t('copyFailed') || 'Failed to copy', 'error');
    }
  },

  // Read file as DataURL
  readFileAsDataURL: function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // Read file as ArrayBuffer
  readFileAsArrayBuffer: function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  },

  // Read file as Text
  readFileAsText: function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },

  // Validate file type
  validateFileType: function(file, allowedTypes) {
    return allowedTypes.some(type => {
      if (type.includes('*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return file.type === type || file.name.toLowerCase().endsWith(type);
    });
  },

  // Get image dimensions
  getImageDimensions: function(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = src;
    });
  },

  // Create canvas from image
  createCanvasFromImage: function(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return { canvas, ctx };
  },

  // Apply image filter
  applyImageFilter: function(canvas, filter) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      filter(data, i);
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  },

  // Grayscale filter
  grayscale: function(data, i) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  },

  // Sepia filter
  sepia: function(data, i) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
  },

  // Brightness filter
  brightness: function(data, i, value) {
    data[i] = Math.min(255, Math.max(0, data[i] + value));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + value));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + value));
  },

  // Contrast filter
  contrast: function(data, i, value) {
    const factor = (259 * (value + 255)) / (255 * (259 - value));
    data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
    data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
    data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
  },

  // Sharpen filter
  sharpen: function(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const output = new Uint8ClampedArray(data);

    const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let val = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * w + (x + kx)) * 4 + c;
              val += data[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          output[(y * w + x) * 4 + c] = Math.min(255, Math.max(0, val));
        }
      }
    }

    imgData.data.set(output);
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  },

  // Noise reduction (simple blur)
  reduceNoise: function(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.filter = 'blur(0.5px)';
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    ctx.drawImage(tempCanvas, 0, 0);
    return canvas;
  },

  // Extract color palette
  extractPalette: function(canvas, colorCount = 5) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const colorMap = new Map();

    // Sample pixels
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    // Sort by frequency and return top colors
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, colorCount)
      .map(([color]) => color);
  },

  // Get dominant color
  getDominantColor: function(canvas) {
    const palette = this.extractPalette(canvas, 1);
    return palette[0] || '#000000';
  },

  // Blur background (keep subject)
  blurBackground: function(canvas, subjectRect) {
    const ctx = canvas.getContext('2d');
    
    // Create blurred version
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.filter = 'blur(20px)';
    tempCtx.drawImage(canvas, 0, 0);
    
    // Draw blurred background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    
    // Draw sharp subject (if rect provided)
    if (subjectRect) {
      ctx.filter = 'none';
      ctx.drawImage(
        canvas, 
        subjectRect.x, subjectRect.y, subjectRect.width, subjectRect.height,
        subjectRect.x, subjectRect.y, subjectRect.width, subjectRect.height
      );
    }
    
    return canvas;
  },

  // Create PDF from images
  createPDF: async function(images, options = {}) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF(options.orientation || 'p', 'mm', options.format || 'a4');
    
    for (let i = 0; i < images.length; i++) {
      if (i > 0) pdf.addPage();
      
      const img = images[i];
      const imgData = typeof img === 'string' ? img : await this.readFileAsDataURL(img);
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pageWidth - 20;
      const imgHeight = (imgWidth * 4) / 3; // Approximate aspect ratio
      
      const x = 10;
      const y = (pageHeight - imgHeight) / 2;
      
      pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
    }
    
    return pdf;
  },

  // Initialize upload area
  initUploadArea: function(elementId, options = {}) {
    const area = document.getElementById(elementId);
    if (!area) return;

    const input = area.querySelector('input[type="file"]');
    const preview = document.getElementById(options.previewId);

    // Click to upload
    area.addEventListener('click', () => input?.click());

    // Drag and drop
    area.addEventListener('dragover', (e) => {
      e.preventDefault();
      area.classList.add('drag-over');
    });

    area.addEventListener('dragleave', () => {
      area.classList.remove('drag-over');
    });

    area.addEventListener('drop', (e) => {
      e.preventDefault();
      area.classList.remove('drag-over');
      
      if (options.onDrop) {
        options.onDrop(e.dataTransfer.files);
      }
    });

    // File input change
    if (input) {
      input.addEventListener('change', () => {
        if (options.onSelect) {
          options.onSelect(input.files);
        }
      });
    }
  },

  // Initialize slider
  initSlider: function(sliderId, valueId, callback) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (!slider) return;

    slider.addEventListener('input', () => {
      if (valueDisplay) {
        valueDisplay.textContent = slider.value;
      }
      if (callback) {
        callback(slider.value);
      }
    });
  },

  // Format date
  formatDate: function(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  },

  // Debounce function
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: function(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Safe JSON parse
  safeJSONParse: function(str, defaultVal = null) {
    try {
      return JSON.parse(str);
    } catch {
      return defaultVal;
    }
  },

  // Generate unique ID
  generateId: function() {
    return Math.random().toString(36).substring(2, 15);
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class to body
  document.body.classList.add('loaded');
  
  // Initialize language selector
  const langSelector = document.querySelector('.language-selector');
  if (langSelector) {
    const currentLang = document.documentElement.lang;
    const activeOption = langSelector.querySelector(`.lang-option[href*="/${currentLang}/"]`);
    if (activeOption) {
      activeOption.classList.add('active');
    }
  }
});

// Expose to global scope
window.Tools = Tools;
