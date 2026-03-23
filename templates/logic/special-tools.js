// Special Tools Logic
function initSpecialTool(type) {
    switch(type) {
        case 'whatsapp':
            initWhatsAppGenerator();
            break;
        case 'emoji-to-unicode':
            initEmojiToUnicode();
            break;
        case 'unicode-to-emoji':
            initUnicodeToEmoji();
            break;
        case 'text-to-binary':
            initTextToBinary();
            break;
        case 'binary-to-text':
            initBinaryToText();
            break;
        case 'number-to-words':
            initNumberToWords();
            break;
        case 'roman':
            initRomanConverter();
            break;
        case 'screen-resolution':
            initScreenResolution();
            break;
        case 'browser-info':
            initBrowserInfo();
            break;
        case 'speed-test':
            initSpeedTest();
            break;
    }
}

function initWhatsAppGenerator() {
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const resultDiv = document.getElementById('result');
    
    window.generateLink = function() {
        const phone = phoneInput.value.replace(/\D/g, '');
        const message = encodeURIComponent(messageInput.value || '');
        
        if (!phone) {
            alert('Please enter a phone number');
            return;
        }
        
        const link = `https://wa.me/${phone}${message ? '?text=' + message : ''}`;
        resultDiv.innerHTML = `
            <div class="p-4 bg-green-50 rounded-lg">
                <p class="font-medium mb-2">Your WhatsApp Link:</p>
                <a href="${link}" target="_blank" class="text-green-600 break-all">${link}</a>
                <button onclick="navigator.clipboard.writeText('${link}')" class="mt-2 px-4 py-2 bg-green-500 text-white rounded">Copy Link</button>
            </div>
        `;
    };
}

function initEmojiToUnicode() {
    const input = document.getElementById('emojiInput');
    const output = document.getElementById('unicodeOutput');
    
    input.addEventListener('input', () => {
        const text = input.value;
        let result = '';
        for (const char of text) {
            result += `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')} `;
        }
        output.value = result.trim();
    });
    
    window.copyResult = function() {
        navigator.clipboard.writeText(output.value);
    };
}

function initUnicodeToEmoji() {
    const input = document.getElementById('unicodeInput');
    const output = document.getElementById('emojiOutput');
    
    input.addEventListener('input', () => {
        const codes = input.value.split(/\s+/);
        let result = '';
        for (const code of codes) {
            const hex = code.replace('U+', '').replace('u+', '');
            result += String.fromCodePoint(parseInt(hex, 16));
        }
        output.value = result;
    });
    
    window.copyResult = function() {
        navigator.clipboard.writeText(output.value);
    };
}

function initTextToBinary() {
    const input = document.getElementById('textInput');
    const output = document.getElementById('binaryOutput');
    
    input.addEventListener('input', () => {
        const text = input.value;
        const binary = text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
        output.value = binary;
    });
    
    window.copyResult = function() {
        navigator.clipboard.writeText(output.value);
    };
}

function initBinaryToText() {
    const input = document.getElementById('binaryInput');
    const output = document.getElementById('textOutput');
    
    input.addEventListener('input', () => {
        const binary = input.value.replace(/\s/g, '');
        let text = '';
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substr(i, 8);
            text += String.fromCharCode(parseInt(byte, 2));
        }
        output.value = text;
    });
    
    window.copyResult = function() {
        navigator.clipboard.writeText(output.value);
    };
}

function initNumberToWords() {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    
    const input = document.getElementById('numberInput');
    const output = document.getElementById('wordsOutput');
    
    function convertToWords(n) {
        if (n === 0) return 'zero';
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + convertToWords(n % 100) : '');
        return 'number too large';
    }
    
    input.addEventListener('input', () => {
        const num = parseInt(input.value);
        output.value = isNaN(num) ? '' : convertToWords(num);
    });
    
    window.copyResult = function() {
        navigator.clipboard.writeText(output.value);
    };
}

function initRomanConverter() {
    const romanMap = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    
    window.toRoman = function() {
        let num = parseInt(document.getElementById('numberInput').value);
        let result = '';
        for (const [roman, value] of Object.entries(romanMap)) {
            while (num >= value) {
                result += roman;
                num -= value;
            }
        }
        document.getElementById('romanOutput').value = result;
    };
    
    window.fromRoman = function() {
        const roman = document.getElementById('romanInput').value.toUpperCase();
        let result = 0;
        let i = 0;
        while (i < roman.length) {
            const twoChar = roman.substr(i, 2);
            if (romanMap[twoChar]) {
                result += romanMap[twoChar];
                i += 2;
            } else {
                result += romanMap[roman[i]] || 0;
                i++;
            }
        }
        document.getElementById('numberOutput').value = result;
    };
}

function initScreenResolution() {
    const display = document.getElementById('resolutionDisplay');
    
    function updateResolution() {
        display.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 rounded">Screen Width: ${window.screen.width}px</div>
                <div class="p-4 bg-blue-50 rounded">Screen Height: ${window.screen.height}px</div>
                <div class="p-4 bg-green-50 rounded">Window Width: ${window.innerWidth}px</div>
                <div class="p-4 bg-green-50 rounded">Window Height: ${window.innerHeight}px</div>
                <div class="p-4 bg-purple-50 rounded">Pixel Ratio: ${window.devicePixelRatio}</div>
                <div class="p-4 bg-purple-50 rounded">Color Depth: ${window.screen.colorDepth}-bit</div>
            </div>
        `;
    }
    
    updateResolution();
    window.addEventListener('resize', updateResolution);
}

function initBrowserInfo() {
    const display = document.getElementById('browserInfo');
    
    const info = {
        'Browser': navigator.userAgent.split(')')[0] + ')',
        'Language': navigator.language,
        'Platform': navigator.platform,
        'Cookies Enabled': navigator.cookieEnabled,
        'Online': navigator.onLine,
        'Screen Size': `${window.screen.width} x ${window.screen.height}`,
        'Viewport': `${window.innerWidth} x ${window.innerHeight}`,
        'Color Depth': `${window.screen.colorDepth}-bit`,
        'Touch Support': 'ontouchstart' in window ? 'Yes' : 'No'
    };
    
    let html = '<div class="space-y-2">';
    for (const [key, value] of Object.entries(info)) {
        html += `
            <div class="flex justify-between p-3 bg-gray-50 rounded">
                <span class="font-medium">${key}:</span>
                <span>${value}</span>
            </div>
        `;
    }
    html += '</div>';
    display.innerHTML = html;
}

function initSpeedTest() {
    const result = document.getElementById('speedResult');
    const btn = document.getElementById('startTest');
    
    window.startSpeedTest = async function() {
        btn.disabled = true;
        btn.textContent = 'Testing...';
        result.innerHTML = 'Testing download speed...';
        
        // Simple speed test using image load time
        const imageUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
        const startTime = performance.now();
        
        try {
            const response = await fetch(imageUrl + '?t=' + Date.now());
            const blob = await response.blob();
            const endTime = performance.now();
            
            const duration = (endTime - startTime) / 1000; // seconds
            const bitsLoaded = blob.size * 8;
            const speedBps = bitsLoaded / duration;
            const speedMbps = (speedBps / 1024 / 1024).toFixed(2);
            
            result.innerHTML = `
                <div class="p-4 bg-green-50 rounded text-center">
                    <p class="text-2xl font-bold text-green-600">${speedMbps} Mbps</p>
                    <p class="text-sm text-gray-600">Download Speed</p>
                </div>
            `;
        } catch (err) {
            result.innerHTML = '<p class="text-red-500">Test failed. Please try again.</p>';
        }
        
        btn.disabled = false;
        btn.textContent = 'Start Test';
    };
}
