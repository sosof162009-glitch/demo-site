// Generator Logic
function initGenerator(type, options) {
    let currentResult = '';
    let history = [];

    window.updateLength = function(value) {
        document.getElementById('lengthValue').textContent = value;
    };

    window.generate = function() {
        const btn = document.getElementById('generateBtn');
        btn.disabled = true;
        btn.innerHTML = '⏳ Generating...';

        setTimeout(() => {
            try {
                currentResult = generateContent(type);
                
                document.getElementById('resultDisplay').textContent = currentResult;
                document.getElementById('resultDisplay').classList.add('text-gray-900', 'dark:text-white');
                document.getElementById('actionButtons').classList.remove('hidden');
                
                // Add to history
                addToHistory(currentResult);
                
                // Calculate strength for passwords
                if (type === 'password') {
                    calculateStrength(currentResult);
                }
            } catch (err) {
                alert('Error generating: ' + err.message);
            }
            
            btn.disabled = false;
            btn.innerHTML = '⚡ Generate';
        }, 300);
    };

    function generateContent(type) {
        const length = parseInt(document.getElementById('lengthSlider').value);
        
        switch(type) {
            case 'password':
                return generatePassword(length);
            case 'uuid':
                return generateUUID();
            case 'pin':
                return generatePIN(length);
            default:
                return generateRandomString(length);
        }
    }

    function generatePassword(length) {
        const useUpper = document.getElementById('useUpper')?.checked ?? true;
        const useLower = document.getElementById('useLower')?.checked ?? true;
        const useNumbers = document.getElementById('useNumbers')?.checked ?? true;
        const useSymbols = document.getElementById('useSymbols')?.checked ?? true;
        
        let chars = '';
        if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useNumbers) chars += '0123456789';
        if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (chars === '') chars = 'abcdefghijklmnopqrstuvwxyz';
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generatePIN(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    function generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 12;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 13;
        
        const fill = document.getElementById('strengthFill');
        const text = document.getElementById('strengthText');
        const bar = document.getElementById('strengthBar');
        
        bar.classList.remove('hidden');
        fill.style.width = strength + '%';
        
        if (strength < 40) {
            fill.className = 'strength-fill strength-weak';
            text.textContent = 'Weak';
        } else if (strength < 70) {
            fill.className = 'strength-fill strength-medium';
            text.textContent = 'Medium';
        } else {
            fill.className = 'strength-fill strength-strong';
            text.textContent = 'Strong';
        }
    }

    window.copyResult = async function() {
        try {
            await navigator.clipboard.writeText(currentResult);
            showToast('Copied to clipboard!');
        } catch (err) {
            const textarea = document.createElement('textarea');
            textarea.value = currentResult;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('Copied to clipboard!');
        }
    };

    function addToHistory(item) {
        history.unshift({ value: item, time: new Date().toLocaleTimeString() });
        if (history.length > 5) history.pop();
        
        const container = document.getElementById('historyList');
        container.innerHTML = history.map(h => `
            <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <span class="font-mono text-sm truncate flex-1">${h.value}</span>
                <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-400">${h.time}</span>
                    <button onclick="navigator.clipboard.writeText('${h.value}')" class="p-1 text-gray-400 hover:text-pink-500">
                        📋
                    </button>
                </div>
            </div>
        `).join('');
        
        document.getElementById('historySection').classList.remove('hidden');
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 text-white rounded-xl shadow-2xl flex items-center gap-2 z-50';
        toast.innerHTML = `
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            ${message}
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
}
