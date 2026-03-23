// Image Converter Logic Template
// This will be embedded in each image converter tool

function initImageConverter(inputFormat, outputFormat) {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    let currentFile = null;
    let originalImage = null;

    // Event listeners
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value + '%';
    });

    function handleFile(file) {
        // Validate file type
        const validTypes = getValidTypes(inputFormat);
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid ' + inputFormat + ' image file');
            return;
        }

        currentFile = file;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                originalImage = img;
                document.getElementById('imagePreview').src = e.target.result;
                document.getElementById('uploadStep').classList.add('hidden');
                document.getElementById('previewStep').classList.remove('hidden');
                
                // Update file info
                document.getElementById('fileInfo').textContent = 
                    file.name + ' • ' + (file.size/1024/1024).toFixed(2) + ' MB';
                document.getElementById('dimensions').textContent = 
                    img.width + ' × ' + img.height + ' px';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function getValidTypes(format) {
        const typeMap = {
            'JPG': ['image/jpeg', 'image/jpg'],
            'JPEG': ['image/jpeg', 'image/jpg'],
            'PNG': ['image/png'],
            'WEBP': ['image/webp'],
            'GIF': ['image/gif'],
            'BMP': ['image/bmp'],
            'SVG': ['image/svg+xml'],
            'ICO': ['image/x-icon', 'image/vnd.microsoft.icon'],
            'TIFF': ['image/tiff', 'image/tif'],
            'AVIF': ['image/avif'],
            'HEIC': ['image/heic', 'image/heif']
        };
        return typeMap[format.toUpperCase()] || ['image/*'];
    }

    window.processImage = function() {
        if (!originalImage) return;

        const btn = document.querySelector('button[onclick="processImage()"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
        btn.disabled = true;

        setTimeout(() => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = originalImage.width;
                canvas.height = originalImage.height;
                
                // Fill white background for JPEG (in case of transparency)
                if (outputFormat.toLowerCase() === 'jpg' || outputFormat.toLowerCase() === 'jpeg') {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                
                ctx.drawImage(originalImage, 0, 0);
                
                const quality = qualitySlider.value / 100;
                const mimeType = 'image/' + outputFormat.toLowerCase().replace('jpg', 'jpeg');
                
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = url;
                    downloadLink.download = currentFile.name.replace(/\.[^/.]+$/, '') + '.' + outputFormat.toLowerCase();
                    
                    document.getElementById('previewStep').classList.add('hidden');
                    document.getElementById('resultStep').classList.remove('hidden');
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, mimeType, quality);
            } catch (err) {
                alert('Error processing image: ' + err.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }, 100);
    };

    window.resetTool = function() {
        currentFile = null;
        originalImage = null;
        document.getElementById('fileInput').value = '';
        document.getElementById('uploadStep').classList.remove('hidden');
        document.getElementById('previewStep').classList.add('hidden');
        document.getElementById('resultStep').classList.add('hidden');
        document.getElementById('imagePreview').src = '';
    };
}
