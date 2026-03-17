/* Additional helper functions for image conversion tools */

// Range slider value updates
document.addEventListener('DOMContentLoaded', () => {
  // Quality range slider
  const qualityRange = document.getElementById('qualityRange');
  if (qualityRange) {
    const qualityValue = document.getElementById('qualityValue');
    qualityRange.addEventListener('input', () => {
      if (qualityValue) qualityValue.textContent = qualityRange.value + '%';
    });
  }
  
  // Font size range slider
  const fontSizeRange = document.getElementById('fontSizeRange');
  if (fontSizeRange) {
    const fontSizeValue = document.getElementById('fontSizeValue');
    fontSizeRange.addEventListener('input', () => {
      if (fontSizeValue) fontSizeValue.textContent = fontSizeRange.value + 'px';
    });
  }
  
  // Opacity range slider
  const opacityRange = document.getElementById('opacityRange');
  if (opacityRange) {
    const opacityValue = document.getElementById('opacityValue');
    opacityRange.addEventListener('input', () => {
      if (opacityValue) opacityValue.textContent = opacityRange.value + '%';
    });
  }
  
  // Tolerance range slider
  const toleranceRange = document.getElementById('toleranceRange');
  if (toleranceRange) {
    const toleranceValue = document.getElementById('toleranceValue');
    toleranceRange.addEventListener('input', () => {
      if (toleranceValue) toleranceValue.textContent = toleranceRange.value;
    });
  }
  
  // Rotate angle slider
  const rotateAngle = document.getElementById('rotateAngle');
  if (rotateAngle) {
    const rotateValue = document.getElementById('rotateValue');
    rotateAngle.addEventListener('input', () => {
      if (rotateValue) rotateValue.textContent = rotateAngle.value + '°';
    });
  }
});

// Handle bulk file selection
let bulkFiles = [];

function handleBulkFiles(files) {
  bulkFiles = Array.from(files);
  const fileCount = document.getElementById('fileCount');
  const fileListContainer = document.getElementById('fileListContainer');
  
  if (fileCount) fileCount.textContent = bulkFiles.length;
  if (fileListContainer) fileListContainer.style.display = 'block';
  
  if (bulkFiles.length > 0) {
    currentFile = bulkFiles[0];
    loadImage(currentFile);
    
    const convertBtn = document.getElementById('convertBtn');
    if (convertBtn) convertBtn.disabled = false;
    
    showToast(bulkFiles.length + ' files selected', 'success');
  }
}

function clearBulkFiles() {
  bulkFiles = [];
  const fileCount = document.getElementById('fileCount');
  const fileListContainer = document.getElementById('fileListContainer');
  const bulkUploadInput = document.getElementById('bulkUploadInput');
  
  if (fileCount) fileCount.textContent = '0';
  if (fileListContainer) fileListContainer.style.display = 'none';
  if (bulkUploadInput) bulkUploadInput.value = '';
  
  removeFile();
}

// Copy to clipboard function
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!', 'success');
    }).catch(() => {
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showToast('Copied to clipboard!', 'success');
  } catch (err) {
    showToast('Failed to copy', 'error');
  }
  
  document.body.removeChild(textArea);
}

// Update crop dimensions when image loads
function updateCropDimensions(width, height) {
  const cropWidth = document.getElementById('cropWidth');
  const cropHeight = document.getElementById('cropHeight');
  
  if (cropWidth) cropWidth.max = width;
  if (cropHeight) cropHeight.max = height;
  if (cropWidth && !cropWidth.value) cropWidth.value = Math.floor(width / 2);
  if (cropHeight && !cropHeight.value) cropHeight.value = Math.floor(height / 2);
}

// Update resize dimensions when image loads
function updateResizeDimensions(width, height) {
  const resizeWidth = document.getElementById('resizeWidth');
  const resizeHeight = document.getElementById('resizeHeight');
  
  if (resizeWidth && !resizeWidth.value) resizeWidth.value = width;
  if (resizeHeight && !resizeHeight.value) resizeHeight.value = height;
}

// Override loadImage to update dimensions
const originalLoadImage = loadImage;
loadImage = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        originalImage = img;
        showPreview(img);
        
        // Update dimension inputs
        updateCropDimensions(img.naturalWidth, img.naturalHeight);
        updateResizeDimensions(img.naturalWidth, img.naturalHeight);
        
        resolve(img);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Batch download function
function downloadBatch(results, prefix = 'converted') {
  results.forEach((result, index) => {
    setTimeout(() => {
      if (result.dataUrl) {
        downloadFile(result.dataUrl, `${prefix}_${index + 1}.${result.extension || 'png'}`);
      }
    }, index * 300);
  });
  showToast(`Downloading ${results.length} files...`, 'success');
}

// Image comparison slider (for before/after)
function createComparisonSlider(beforeUrl, afterUrl, container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'comparison-slider';
  wrapper.style.cssText = `
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 12px;
  `;
  
  const afterImg = document.createElement('img');
  afterImg.src = afterUrl;
  afterImg.style.cssText = 'width: 100%; display: block;';
  
  const beforeWrapper = document.createElement('div');
  beforeWrapper.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    border-right: 3px solid #4f8ef7;
  `;
  
  const beforeImg = document.createElement('img');
  beforeImg.src = beforeUrl;
  beforeImg.style.cssText = 'width: 200%; max-width: none;';
  
  beforeWrapper.appendChild(beforeImg);
  wrapper.appendChild(afterImg);
  wrapper.appendChild(beforeWrapper);
  
  // Slider handle
  const handle = document.createElement('div');
  handle.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: #4f8ef7;
    border-radius: 50%;
    cursor: ew-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  handle.innerHTML = '↔';
  wrapper.appendChild(handle);
  
  // Drag functionality
  let isDragging = false;
  
  handle.addEventListener('mousedown', () => isDragging = true);
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = wrapper.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;
    beforeWrapper.style.width = percent + '%';
    handle.style.left = percent + '%';
    beforeImg.style.width = (100 / percent * 100) + '%';
  });
  
  container.appendChild(wrapper);
}

// Preset crop ratios
function setCropPreset(ratio) {
  if (!originalImage) return;
  
  const width = originalImage.naturalWidth || originalImage.width;
  const height = originalImage.naturalHeight || originalImage.height;
  
  let newWidth, newHeight;
  
  switch(ratio) {
    case '1:1':
      newWidth = newHeight = Math.min(width, height);
      break;
    case '16:9':
      newHeight = width * 9 / 16;
      newWidth = width;
      if (newHeight > height) {
        newWidth = height * 16 / 9;
        newHeight = height;
      }
      break;
    case '4:3':
      newHeight = width * 3 / 4;
      newWidth = width;
      if (newHeight > height) {
        newWidth = height * 4 / 3;
        newHeight = height;
      }
      break;
    default:
      return;
  }
  
  const cropWidth = document.getElementById('cropWidth');
  const cropHeight = document.getElementById('cropHeight');
  
  if (cropWidth) cropWidth.value = Math.floor(newWidth);
  if (cropHeight) cropHeight.value = Math.floor(newHeight);
}

// Export functions for use in tool scripts
window.handleBulkFiles = handleBulkFiles;
window.clearBulkFiles = clearBulkFiles;
window.copyToClipboard = copyToClipboard;
window.downloadBatch = downloadBatch;
window.createComparisonSlider = createComparisonSlider;
window.setCropPreset = setCropPreset;
