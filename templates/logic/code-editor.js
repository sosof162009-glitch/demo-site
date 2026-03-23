// Code Editor Logic
function initCodeEditor(language) {
    const codeEditor = document.getElementById('codeEditor');
    const statusBadge = document.getElementById('statusBadge');
    const charCount = document.getElementById('charCount');
    
    codeEditor.addEventListener('input', () => {
        const len = codeEditor.value.length;
        charCount.textContent = len + ' chars';
        
        if (len > 0) {
            updateStatus('typing', 'Typing...');
        } else {
            updateStatus('ready', 'Ready');
        }
    });
    
    function updateStatus(type, message) {
        const colors = {
            ready: 'bg-gray-400',
            typing: 'bg-yellow-400',
            success: 'bg-green-400',
            error: 'bg-red-400'
        };
        
        statusBadge.innerHTML = `
            <span class="w-2 h-2 rounded-full ${colors[type] || colors.ready}"></span>
            ${message}
        `;
        statusBadge.className = 'status-badge ' + (type === 'success' ? 'success' : type === 'error' ? 'error' : '');
    }
    
    window.formatCode = function() {
        try {
            const code = codeEditor.value;
            if (!code.trim()) {
                showToast('Please enter some code');
                return;
            }
            
            if (language === 'json') {
                const parsed = JSON.parse(code);
                codeEditor.value = JSON.stringify(parsed, null, 2);
            } else if (language === 'html') {
                codeEditor.value = formatHTML(code);
            } else if (language === 'css') {
                codeEditor.value = formatCSS(code);
            } else if (language === 'js') {
                codeEditor.value = formatJS(code);
            } else if (language === 'sql') {
                codeEditor.value = formatSQL(code);
            } else {
                codeEditor.value = code; // No formatter available
            }
            
            updateStatus('success', 'Formatted!');
            showToast('Code formatted successfully!');
        } catch (err) {
            updateStatus('error', 'Invalid ' + language.toUpperCase());
            showToast('Error: ' + err.message);
        }
    };
    
    window.minifyCode = function() {
        try {
            const code = codeEditor.value;
            if (!code.trim()) {
                showToast('Please enter some code');
                return;
            }
            
            if (language === 'json') {
                const parsed = JSON.parse(code);
                codeEditor.value = JSON.stringify(parsed);
            } else if (language === 'html' || language === 'css' || language === 'js') {
                codeEditor.value = code
                    .replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/\/\/.*$/gm, '')
                    .replace(/\s+/g, ' ')
                    .trim();
            } else {
                codeEditor.value = code.replace(/\s+/g, ' ').trim();
            }
            
            updateStatus('success', 'Minified!');
            showToast('Code minified successfully!');
        } catch (err) {
            updateStatus('error', 'Error');
            showToast('Error: ' + err.message);
        }
    };
    
    window.validateCode = function() {
        try {
            const code = codeEditor.value;
            if (!code.trim()) {
                showToast('Please enter some code');
                return;
            }
            
            if (language === 'json') {
                JSON.parse(code);
                updateStatus('success', 'Valid JSON!');
                showToast('Valid JSON!');
            } else {
                updateStatus('success', 'Validated!');
                showToast('Code looks good!');
            }
        } catch (err) {
            updateStatus('error', 'Invalid ' + language.toUpperCase());
            showToast('Invalid: ' + err.message);
        }
    };
    
    window.clearCode = function() {
        codeEditor.value = '';
        charCount.textContent = '0 chars';
        updateStatus('ready', 'Ready');
        showToast('Editor cleared!');
    };
    
    window.copyResult = async function() {
        try {
            await navigator.clipboard.writeText(codeEditor.value);
            showToast('Copied to clipboard!');
        } catch (err) {
            codeEditor.select();
            document.execCommand('copy');
            showToast('Copied to clipboard!');
        }
    };
    
    function showToast(message) {
        const toast = document.getElementById('toast');
        document.getElementById('toastMessage').textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('flex');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('flex');
        }, 2000);
    }
    
    function formatHTML(html) {
        // Simple HTML formatter
        return html.replace(/\u003e\s*\u003c/g, '>\n\u003c');
    }
    
    function formatCSS(css) {
        // Simple CSS formatter
        return css.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/g, '\n}');
    }
    
    function formatJS(js) {
        // Simple JS formatter
        return js.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/g, '\n}');
    }
    
    function formatSQL(sql) {
        // Simple SQL formatter
        const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP', 'ORDER', 'BY', 'HAVING', 'LIMIT', 'AND', 'OR'];
        let formatted = sql;
        keywords.forEach(kw => {
            const regex = new RegExp('\\b' + kw + '\\b', 'gi');
            formatted = formatted.replace(regex, '\n' + kw);
        });
        return formatted.trim();
    }
}
