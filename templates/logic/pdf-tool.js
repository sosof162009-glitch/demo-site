// PDF Tool Logic
function initPDFTool(toolType) {
    let files = [];
    let draggedItem = null;

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    function handleFiles(fileList) {
        const pdfFiles = Array.from(fileList).filter(f => f.type === 'application/pdf');
        if (pdfFiles.length === 0) {
            alert('Please select valid PDF files');
            return;
        }
        files = [...files, ...pdfFiles];
        updateFileList();
        if (files.length > 0) goToStep(2);
    }

    function updateFileList() {
        document.getElementById('fileCount').textContent = files.length;
        const list = document.getElementById('fileList');
        list.innerHTML = '';
        
        files.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'file-item p-4 flex items-center gap-4 cursor-move';
            item.draggable = true;
            item.innerHTML = `
                <svg class="w-8 h-8 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                <div class="flex-1 min-w-0">
                    <p class="font-medium truncate">${file.name}</p>
                    <p class="text-sm text-gray-500">${(file.size/1024/1024).toFixed(2)} MB</p>
                </div>
                <button onclick="removeFile(${index})" class="p-2 text-gray-400 hover:text-red-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            `;
            
            item.addEventListener('dragstart', () => {
                draggedItem = index;
                item.classList.add('dragging');
            });
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                draggedItem = null;
            });
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (draggedItem !== null && draggedItem !== index) {
                    const temp = files[draggedItem];
                    files[draggedItem] = files[index];
                    files[index] = temp;
                    draggedItem = index;
                    updateFileList();
                }
            });
            
            list.appendChild(item);
        });
    }

    window.removeFile = function(index) {
        files.splice(index, 1);
        updateFileList();
        if (files.length === 0) goToStep(1);
    };

    window.addMoreFiles = function() {
        fileInput.click();
    };

    window.goToStep = function(step) {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step3').classList.add('hidden');
        document.getElementById(`step${step}`).classList.remove('hidden');
        
        for (let i = 1; i <= 3; i++) {
            const indicator = document.getElementById(`step${i}-indicator`);
            const line = document.getElementById(`line${i}-${i+1}`);
            
            if (i < step) {
                indicator.className = 'step-number completed';
                indicator.innerHTML = '✓';
                if (line) line.classList.add('completed');
            } else if (i === step) {
                indicator.className = 'step-number active';
                indicator.innerHTML = i;
            } else {
                indicator.className = 'step-number pending';
                indicator.innerHTML = i;
                if (line) line.classList.remove('completed');
            }
        }
    };

    window.processFiles = function() {
        goToStep(3);
        document.getElementById('processingView').classList.remove('hidden');
        document.getElementById('resultView').classList.add('hidden');
        
        setTimeout(() => {
            document.getElementById('processingView').classList.add('hidden');
            document.getElementById('resultView').classList.remove('hidden');
            
            const totalSize = files.reduce((sum, f) => sum + f.size, 0);
            document.getElementById('originalSize').textContent = (totalSize/1024/1024).toFixed(2) + ' MB';
            document.getElementById('newSize').textContent = ((totalSize * 0.7)/1024/1024).toFixed(2) + ' MB';
            
            // Create download link (placeholder)
            const blob = new Blob(['PDF processed'], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            document.getElementById('downloadLink').href = url;
            document.getElementById('downloadLink').download = 'processed.pdf';
        }, 2000);
    };

    window.startOver = function() {
        files = [];
        updateFileList();
        goToStep(1);
    };
}
