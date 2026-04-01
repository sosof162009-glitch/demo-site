/**
 * 205-Tools Admin Dashboard - Common JavaScript
 * Includes: Toast notifications, Session management, Utilities
 */

// ═══════════════════════════════════════════════════════════════
// Toast Notifications
// ═══════════════════════════════════════════════════════════════
function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--card);
        border: 1px solid ${type === 'success' ? 'var(--success)' : 'var(--error)')};
        color: ${type === 'success' ? 'var(--success)' : 'var(--error)')};
        padding: 12px 20px;
        border-radius: var(--radius);
        font-size: 0.875rem;
        font-weight: 600;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// Session Management
// ═══════════════════════════════════════════════════════════════
function checkAuth() {
    const session = sessionStorage.getItem('adminAuth');
    if (session !== 'true') {
        window.location.href = '/admin/login.html';
        return false;
    }
    
    const sessionData = JSON.parse(sessionStorage.getItem('adminSession') || '{}');
    
    // Check expiration
    if (sessionData.expires && Date.now() > sessionData.expires) {
        logout();
        return false;
    }
    
    // Display email in header if element exists
    const emailEl = document.getElementById('adminEmail');
    if (emailEl && sessionData.email) {
        emailEl.textContent = sessionData.email;
    }
    
    return true;
}

function logout() {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminSession');
    window.location.href = '/admin/login.html';
}

// ═══════════════════════════════════════════════════════════════
// Auto-init on page load (for non-login pages)
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    // Only check auth if this is not the login page
    if (!window.location.pathname.includes('login.html')) {
        checkAuth();
    }
});