// Text Analyzer Logic
function initTextAnalyzer() {
    const textInput = document.getElementById('textInput');
    
    textInput.addEventListener('input', analyzeText);
    
    function analyzeText() {
        const text = textInput.value;
        
        // Word count
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        animateNumber('wordCount', words);
        
        // Character count
        animateNumber('charCount', text.length);
        
        // Characters without spaces
        animateNumber('charCountNoSpaces', text.replace(/\s/g, '').length);
        
        // Sentences
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        animateNumber('sentenceCount', sentences);
        
        // Paragraphs
        const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
        animateNumber('paragraphCount', paragraphs || (text.trim() ? 1 : 0));
        
        // Reading time (avg 200 wpm)
        const readingMinutes = words / 200;
        document.getElementById('readingTime').textContent = formatTime(readingMinutes);
        
        // Speaking time (avg 130 wpm)
        const speakingMinutes = words / 130;
        document.getElementById('speakingTime').textContent = formatTime(speakingMinutes);
        
        // Update timestamp
        const now = new Date();
        document.getElementById('lastUpdated').textContent = 'Updated ' + now.toLocaleTimeString();
    }
    
    function animateNumber(id, target) {
        const element = document.getElementById(id);
        element.textContent = target;
        element.style.transform = 'scale(1.2)';
        setTimeout(() => element.style.transform = 'scale(1)', 150);
    }
    
    function formatTime(minutes) {
        if (minutes < 1) return Math.round(minutes * 60) + 's';
        if (minutes < 60) return Math.round(minutes) + 'm';
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return hours + 'h ' + mins + 'm';
    }
    
    window.pasteText = async function() {
        try {
            const text = await navigator.clipboard.readText();
            textInput.value = text;
            analyzeText();
            showToast('Text pasted!');
        } catch (err) {
            showToast('Could not paste from clipboard');
        }
    };
    
    window.clearText = function() {
        textInput.value = '';
        analyzeText();
        showToast('Text cleared!');
    };
    
    window.copyResult = async function() {
        try {
            await navigator.clipboard.writeText(textInput.value);
            showToast('Copied to clipboard!');
        } catch (err) {
            textInput.select();
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
    
    // Initialize
    analyzeText();
}
