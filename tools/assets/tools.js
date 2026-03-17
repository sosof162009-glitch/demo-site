/**
 * ToolsHub - Shared JavaScript for All Tools
 * 205 Tools Website - Main Script File
 */

// ====================
// LANGUAGE MANAGEMENT
// ====================
const SUPPORTED_LANGUAGES = ['en', 'ar', 'fr', 'es', 'de'];
const DEFAULT_LANGUAGE = 'en';

function initLanguage() {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(en|ar|fr|es|de)\//);
    const currentLang = langMatch ? langMatch[1] : DEFAULT_LANGUAGE;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

function switchLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(en|ar|fr|es|de)\//, `/${lang}/`);
    window.location.href = newPath;
}

// ====================
// THEME MANAGEMENT
// ====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ====================
// MOBILE MENU
// ====================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
}

// ====================
// FILE UPLOAD HELPERS
// ====================
function handleFileUpload(input, callback, options = {}) {
    const files = input.files;
    if (!files || files.length === 0) return;
    
    const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
    const allowedTypes = options.allowedTypes || [];
    
    Array.from(files).forEach(file => {
        if (file.size > maxSize) {
            showNotification(`File too large: ${file.name}`, 'error');
            return;
        }
        
        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
            showNotification(`Invalid file type: ${file.name}`, 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => callback(file, e.target.result);
        reader.readAsDataURL(file);
    });
}

// ====================
// DOWNLOAD HELPERS
// ====================
function downloadFile(data, filename, mimeType = 'application/octet-stream') {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function downloadCanvas(canvas, filename, format = 'png', quality = 0.9) {
    const mimeType = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, quality);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ====================
// CLIPBOARD
// ====================
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copied to clipboard!', 'success');
    }
}

// ====================
// NOTIFICATIONS
// ====================
function showNotification(message, type = 'info', duration = 3000) {
    const existing = document.querySelector('.tool-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `tool-notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ====================
// VALIDATION HELPERS
// ====================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}

// ====================
// FORMATTING HELPERS
// ====================
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ====================
// DEBOUNCE & THROTTLE
// ====================
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====================
// TOOL INITIALIZATION
// ====================
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
    initMobileMenu();
});

// ====================
// ADSENSE HELPER
// ====================
function initAds() {
    // Ads will be loaded here if enabled
    const adsEnabled = localStorage.getItem('adsEnabled') !== 'false';
    if (adsEnabled && typeof adsbygoogle !== 'undefined') {
        document.querySelectorAll('.adsbygoogle').forEach(ad => {
            (adsbygoogle = window.adsbygoogle || []).push({});
        });
    }
}

// ====================
// ANALYTICS
// ====================
function trackToolUsage(toolName) {
    // Analytics tracking placeholder
    console.log('Tool used:', toolName);
}

// ====================
// ERROR HANDLING
// ====================
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo);
    return false;
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleFileUpload,
        downloadFile,
        downloadCanvas,
        copyToClipboard,
        showNotification,
        formatBytes,
        formatNumber,
        debounce,
        throttle,
        isValidEmail,
        isValidUrl,
        isValidJSON
    };
}