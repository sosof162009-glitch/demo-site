/**
 * 205-tools - Image Conversion Suite - Shared JavaScript
 * Common utilities and functionality for all image conversion tools
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeTool();
});

/**
 * Initialize common tool functionality
 */
function initializeTool() {
  setupUploadArea();
  setupLanguageSelector();
  setupDragAndDrop();
}

/**
 * Setup upload area click handlers
 */
function setupUploadArea() {
  const uploadAreas = document.querySelectorAll('.upload-area');
  uploadAreas.forEach(area => {
    const input = area.querySelector('.upload-input');
    if (input) {
      area.addEventListener('click', () => input.click());
      input.addEventListener('change', (e) => handleFileSelect(e.target.files[0]));
    }
  });
}

/**
 * Setup language selector
 */
function setupLanguageSelector() {
  const selector = document.getElementById('languageSelector');
  if (selector) {
    selector.addEventListener('change', (e) => {
      const lang = e.target.value;
      const currentPath = window.location.pathname;
      const toolName = currentPath.split('/').pop();
      window.location.href = `/${lang}/${toolName}`;
    });
  }
}

/**
 * Setup drag and drop functionality
 */
function setupDragAndDrop() {
  const uploadAreas = document.querySelectorAll('.upload-area');
  
  uploadAreas.forEach(area => {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      area.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      area.addEventListener(eventName, () => area.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      area.addEventListener(eventName, () => area.classList.remove('dragover'), false);
    });

    area.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    }, false);
  });
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * Global file state
 */
let currentFile = null;
let originalImage = null;

/**
 * Handle file selection
 */
function handleFileSelect(file) {
  if (!file) return;
  
  currentFile = file;
  
  // Update UI
  updateFileInfo(file);
  
  // Load image if applicable
  if (file.type.startsWith('image/')) {
    loadImage(file);
  }
  
  // Enable convert button
  const convertBtn = document.getElementById('convertBtn');
  if (convertBtn) {
    convertBtn.disabled = false;
  }
  
  showToast('File loaded successfully', 'success');
}

/**
 * Update file info display
 */
function updateFileInfo(file) {
  const fileInfo = document.getElementById('fileInfo');
  if (fileInfo) {
    const fileName = fileInfo.querySelector('.file-info-name');
    const fileSize = fileInfo.querySelector('.file-info-size');
    if (fileName) fileName.textContent = file.name;
    if (fileSize) fileSize.textContent = formatFileSize(file.size);
    fileInfo.classList.remove('hidden');
  }
  
  const uploadArea = document.querySelector('.upload-area');
  if (uploadArea) {
    uploadArea.classList.add('uploaded');
  }
}

/**
 * Remove selected file
 */
function removeFile() {
  currentFile = null;
  originalImage = null;
  
  const fileInfo = document.getElementById('fileInfo');
  if (fileInfo) {
    fileInfo.classList.add('hidden');
  }
  
  const uploadInput = document.getElementById('uploadInput');
  if (uploadInput) {
    uploadInput.value = '';
  }
  
  const uploadArea = document.querySelector('.upload-area');
  if (uploadArea) {
    uploadArea.classList.remove('uploaded');
  }
  
  const previewArea = document.getElementById('previewArea');
  if (previewArea) {
    previewArea.innerHTML = '';
    previewArea.classList.add('hidden');
  }
  
  const convertBtn = document.getElementById('convertBtn');
  if (convertBtn) {
    convertBtn.disabled = true;
  }
  
  hideResult();
}

/**
 * Load image from file
 */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        originalImage = img;
        showPreview(img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Show image preview
 */
function showPreview(img) {
  const previewArea = document.getElementById('previewArea');
  if (previewArea) {
    previewArea.innerHTML = `<img src="${img.src}" alt="Preview" class="preview-image">`;
    previewArea.classList.remove('hidden');
  }
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };
  
  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span> ${message}`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

/**
 * Show progress bar
 */
function showProgress() {
  const progressContainer = document.getElementById('progressContainer');
  if (progressContainer) {
    progressContainer.classList.add('active');
  }
}

function hideProgress() {
  const progressContainer = document.getElementById('progressContainer');
  if (progressContainer) {
    progressContainer.classList.remove('active');
  }
}

function updateProgress(percent) {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  if (progressFill) {
    progressFill.style.width = percent + '%';
  }
  if (progressText) {
    progressText.textContent = percent + '%';
  }
}

/**
 * Show result area
 */
function showResult() {
  const resultArea = document.getElementById('resultArea');
  if (resultArea) {
    resultArea.classList.add('active');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function hideResult() {
  const resultArea = document.getElementById('resultArea');
  if (resultArea) {
    resultArea.classList.remove('active');
  }
}

/**
 * Download file
 */
function downloadFile(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Download started', 'success');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
  URL.revokeObjectURL(url);
}

/**
 * Convert image format using canvas
 */
function convertImageFormat(img, format, quality = 0.9) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  
  // Handle transparency for JPEG
  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  ctx.drawImage(img, 0, 0);
  
  return canvas.toDataURL(format, quality);
}

/**
 * Get file extension from MIME type
 */
function getExtensionFromMimeType(mimeType) {
  const extensions = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/svg+xml': 'svg',
    'image/avif': 'avif',
    'image/heic': 'heic',
    'image/heif': 'heif',
    'application/pdf': 'pdf'
  };
  return extensions[mimeType] || 'bin';
}

/**
 * Get MIME type from format name
 */
function getMimeType(format) {
  const types = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'svg': 'image/svg+xml',
    'avif': 'image/avif',
    'heic': 'image/heic',
    'heif': 'image/heif',
    'pdf': 'application/pdf',
    'ico': 'image/x-icon'
  };
  return types[format.toLowerCase()] || 'image/png';
}

/**
 * Compress image
 */
function compressImage(img, maxWidth, maxHeight, quality, format = 'image/jpeg') {
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;
  
  // Calculate new dimensions
  if (maxWidth && width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }
  if (maxHeight && height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }
  
  ctx.drawImage(img, 0, 0, width, height);
  
  return canvas.toDataURL(format, quality);
}

/**
 * Create ICO file from image (simplified version)
 */
function createIcoFromImage(img, sizes = [16, 32, 48, 64]) {
  // ICO format requires multiple sizes
  // This is a simplified implementation
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 32, 32);
  ctx.drawImage(img, 0, 0, 32, 32);
  
  return canvas.toDataURL('image/png');
}

/**
 * Base64 utilities
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function base64ToFile(base64String, filename, mimeType = 'image/png') {
  const byteString = atob(base64String.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new File([ab], filename, { type: mimeType });
}

/**
 * Create ZIP file from multiple files
 */
async function createZip(files) {
  // Simplified ZIP creation - in production, use JSZip library
  showToast('Bulk download starting...', 'info');
  files.forEach((file, index) => {
    setTimeout(() => {
      downloadFile(file.data, file.name);
    }, index * 500);
  });
}

/**
 * Validate file type
 */
function validateFileType(file, acceptedTypes) {
  if (!acceptedTypes || acceptedTypes.length === 0) return true;
  
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  return acceptedTypes.some(type => {
    if (type.includes('*')) {
      return fileType.startsWith(type.replace('/*', ''));
    }
    return fileType === type || fileName.endsWith(type.replace('image/', '.'));
  });
}

/**
 * Get image dimensions
 */
function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Crop image
 */
function cropImage(img, x, y, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  
  return canvas;
}

/**
 * Rotate image
 */
function rotateImage(img, degrees) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (degrees === 90 || degrees === 270) {
    canvas.width = img.naturalHeight || img.height;
    canvas.height = img.naturalWidth || img.width;
  } else {
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
  }
  
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(img, -(img.naturalWidth || img.width) / 2, -(img.naturalHeight || img.height) / 2);
  
  return canvas;
}

/**
 * Flip image
 */
function flipImage(img, direction) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  
  if (direction === 'horizontal') {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
  }
  
  ctx.drawImage(img, 0, 0);
  
  return canvas;
}

/**
 * Replace color in image
 */
function replaceColor(img, targetColor, replacementColor, tolerance = 30) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Parse colors
  const target = hexToRgb(targetColor);
  const replacement = hexToRgb(replacementColor);
  
  if (!target || !replacement) return canvas;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    const distance = Math.sqrt(
      Math.pow(r - target.r, 2) + 
      Math.pow(g - target.g, 2) + 
      Math.pow(b - target.b, 2)
    );
    
    if (distance <= tolerance) {
      data[i] = replacement.r;
      data[i + 1] = replacement.g;
      data[i + 2] = replacement.b;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Split image into grid
 */
function splitImage(img, rows, cols) {
  const pieces = [];
  const pieceWidth = (img.naturalWidth || img.width) / cols;
  const pieceHeight = (img.naturalHeight || img.height) / rows;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const canvas = document.createElement('canvas');
      canvas.width = pieceWidth;
      canvas.height = pieceHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        img,
        col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight,
        0, 0, pieceWidth, pieceHeight
      );
      
      pieces.push(canvas);
    }
  }
  
  return pieces;
}

/**
 * Basic background removal (chromakey for green/white backgrounds)
 */
function removeBackground(img, bgColor = 'auto', tolerance = 50) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Auto-detect background from corners
  let targetR, targetG, targetB;
  if (bgColor === 'auto') {
    // Sample from corners
    const corners = [0, (canvas.width - 1) * 4, (canvas.height - 1) * canvas.width * 4, ((canvas.height - 1) * canvas.width + (canvas.width - 1)) * 4];
    let totalR = 0, totalG = 0, totalB = 0;
    corners.forEach(idx => {
      totalR += data[idx];
      totalG += data[idx + 1];
      totalB += data[idx + 2];
    });
    targetR = totalR / 4;
    targetG = totalG / 4;
    targetB = totalB / 4;
  } else {
    const rgb = hexToRgb(bgColor);
    if (rgb) {
      targetR = rgb.r;
      targetG = rgb.g;
      targetB = rgb.b;
    }
  }
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    const distance = Math.sqrt(
      Math.pow(r - targetR, 2) + 
      Math.pow(g - targetG, 2) + 
      Math.pow(b - targetB, 2)
    );
    
    if (distance <= tolerance) {
      data[i + 3] = 0; // Set alpha to 0
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Add watermark to image
 */
function addWatermark(img, text, options = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const {
    position = 'bottom-right',
    fontSize = Math.min(canvas.width, canvas.height) / 20,
    color = 'rgba(255, 255, 255, 0.7)',
    font = 'Arial'
  } = options;
  
  ctx.font = `${fontSize}px ${font}`;
  ctx.fillStyle = color;
  
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;
  const textHeight = fontSize;
  
  let x, y;
  const padding = 20;
  
  switch (position) {
    case 'top-left':
      x = padding;
      y = textHeight + padding;
      break;
    case 'top-right':
      x = canvas.width - textWidth - padding;
      y = textHeight + padding;
      break;
    case 'bottom-left':
      x = padding;
      y = canvas.height - padding;
      break;
    case 'bottom-right':
    default:
      x = canvas.width - textWidth - padding;
      y = canvas.height - padding;
      break;
    case 'center':
      x = (canvas.width - textWidth) / 2;
      y = (canvas.height + textHeight) / 2;
      break;
  }
  
  // Draw shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillText(text, x + 2, y + 2);
  
  // Draw text
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  
  return canvas;
}

/**
 * Create SVG from image (trace outline - simplified)
 */
function imageToSvg(img) {
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  // Create simplified SVG with embedded image
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <image href="${canvas.toDataURL('image/png')}" width="${width}" height="${height}"/>
</svg>`;
  
  return svg;
}

/**
 * Images to PDF (simplified)
 */
async function imagesToPDF(images) {
  // In production, use libraries like pdf-lib or jsPDF
  // This is a placeholder that creates individual downloads
  showToast('PDF creation requires additional libraries', 'warning');
  images.forEach((img, index) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    
    setTimeout(() => {
      downloadFile(canvas.toDataURL('image/jpeg'), `page_${index + 1}.jpg`);
    }, index * 300);
  });
}

/**
 * PDF to images (placeholder - requires PDF.js in production)
 */
async function pdfToImages(file) {
  showToast('PDF processing requires PDF.js library', 'warning');
  return [];
}

/**
 * Process HEIC/HEIF images
 */
async function processHeic(file) {
  // In production, use heic2any library
  showToast('HEIC processing requires heic2any library', 'warning');
  return null;
}

/**
 * Process RAW images
 */
async function processRaw(file) {
  // In production, use libraries like raw-decoder
  showToast('RAW processing requires specialized libraries', 'warning');
  return null;
}

/**
 * Process PSD files
 */
async function processPsd(file) {
  // In production, use ag-psd library
  showToast('PSD processing requires ag-psd library', 'warning');
  return null;
}

/**
 * Process EPS files
 */
async function processEps(file) {
  // EPS requires server-side processing or specialized libraries
  showToast('EPS processing requires server-side conversion', 'warning');
  return null;
}

/**
 * Apply blur effect to image
 */
function applyBlur(img, radius) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.filter = `blur(${radius}px)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Adjust image brightness
 */
function adjustBrightness(img, value) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.filter = `brightness(${100 + value}%)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Adjust image contrast
 */
function adjustContrast(img, value) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.filter = `contrast(${100 + value}%)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Apply sepia effect to image
 */
function applySepia(img, value) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.filter = `sepia(${value}%)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Convert image to grayscale
 */
function applyGrayscale(img, value) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.filter = `grayscale(${value}%)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Invert image colors
 */
function applyInvert(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  ctx.filter = 'invert(100%)';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Convert GIF to MP4 (requires ffmpeg.js in production)
 */
async function gifToMp4(file) {
  showToast('GIF to MP4 requires ffmpeg.js library', 'warning');
  return null;
}

/**
 * Bulk process multiple files
 */
async function bulkProcess(files, processFn) {
  const results = [];
  const total = files.length;
  
  for (let i = 0; i < files.length; i++) {
    updateProgress(Math.round((i / total) * 100));
    try {
      const result = await processFn(files[i]);
      results.push(result);
    } catch (error) {
      showToast(`Error processing ${files[i].name}`, 'error');
    }
  }
  
  updateProgress(100);
  return results;
}
