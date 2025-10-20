const historyContent = document.getElementById('historyContent');

// Function to load history from localStorage
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('elems')) || [];
    
    if (history.length === 0) {
        historyContent.innerHTML = `
            <div class="text-center py-12">
                <a href="../../generator/generator.html">
                    <svg class="mx-auto h-12 w-12 text-gray-400 border border-gray-500 rounded-xl cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </a>
                <h3 class="mt-2 text-sm font-medium text-gray-300">No history yet</h3>
                <p class="mt-1 text-sm text-gray-500">Generate some elements to see them here.</p>
            </div>
        `;
        return;
    }
    
    historyContent.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-white">Generated Elements (${history.length})</h2>
            <button id="clearHistory" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
                Clear All
            </button>
        </div>
        <div class="space-y-4" id="historyList"></div>
    `;
    
    const historyList = document.getElementById('historyList');
    
    // Sort history by most recent first
    history.sort((a, b) => b.time - a.time);
    
    history.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('bg-gray-800', 'rounded-lg', 'overflow-hidden', 'border', 'border-gray-700', 'hover:border-gray-500', 'transition-all', 'duration-300');
        
        // Format the generated code for better display
        const formattedCode = item.code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        card.innerHTML = `
            <div class="p-4 flex justify-between items-center bg-gray-900">
                <div class="flex items-center space-x-3">
                    <div class="bg-indigo-500 h-10 w-10 rounded-full flex items-center justify-center">
                        <span class="text-white font-medium uppercase">${item.type.charAt(0)}</span>
                    </div>
                    <h3 class="text-lg font-semibold text-white capitalize">${item.type} Component</h3>
                </div>
                <span class="text-xs text-gray-500">${formatDate(item.time)}</span>
            </div>
            
            <div class="p-4">
                <div class="bg-gray-900 p-3 rounded-md overflow-x-auto">
                    <pre class="text-gray-300 text-sm whitespace-pre-wrap"><code>${formattedCode}</code></pre>
                </div>
            </div>
            
            <div class="flex border-t border-gray-700">
                <button data-index="${index}" class="preview-btn flex-1 py-2 text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                </button>
                <button data-index="${index}" class="copy-btn flex-1 py-2 text-gray-300 hover:bg-green-700 transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                </button>
                <button data-index="${index}" class="delete-btn flex-1 py-2 text-gray-300 hover:bg-red-700 transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
        `;
        
        historyList.appendChild(card);
    });
    
    // Add event listeners for copy buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            copyToClipboard(history[index].code, this);
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteHistoryItem(index);
        });
    });
    
    // Add event listeners for preview buttons
    document.querySelectorAll('.preview-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            openPreviewModal(history[index]);
        });
    });
    
    // Add event listener for clear all button
    const clearButton = document.getElementById('clearHistory');
    if (clearButton) {
        clearButton.addEventListener('click', clearAllHistory);
    }
}

// Function to create the preview modal
function createPreviewModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('previewModal')) {
        const modal = document.createElement('div');
        modal.id = 'previewModal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div class="absolute inset-0 flex items-center justify-center p-4">
                <div class="bg-gray-800/80 rounded-lg shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
                    <div class="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-gray-800/95 z-10">
                        <h3 id="modalTitle" class="text-lg font-medium text-white">Component Preview</h3>
                        <button id="closeModal" class="text-gray-400 hover:text-white">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="p-6">
                        <div class="mb-6">
                            <div id="componentType" class="text-sm font-medium text-gray-400 mb-2 capitalize"></div>
                            <div id="componentDate" class="text-xs text-gray-500"></div>
                        </div>
                        <div class="p-4 bg-gray-900 rounded-md mb-6 overflow-x-auto">
                            <pre id="componentCode" class="text-xs text-gray-300"></pre>
                        </div>
                        <div class="p-4 md:p-6 rounded-md bg-gray-900/50">
                            <h4 class="text-sm font-medium text-gray-400 mb-4">Preview:</h4>
                            <div class="preview-container">
                                <div id="previewContainer" class="preview-area"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('closeModal').addEventListener('click', closePreviewModal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target === modal.querySelector('.absolute')) {
                closePreviewModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closePreviewModal();
            }
        });
    }
}

// Function to open the preview modal with component data
function openPreviewModal(item) {
    createPreviewModal();
    
    const modal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const componentType = document.getElementById('componentType');
    const componentDate = document.getElementById('componentDate');
    const componentCode = document.getElementById('componentCode');
    const previewContainer = document.getElementById('previewContainer');
    
    modalTitle.textContent = `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Component Preview`;
    componentType.textContent = `Component Type: ${item.type}`;
    componentDate.textContent = `Generated on: ${formatDate(item.time)}`;
    componentCode.textContent = item.code;
    
    // Clear previous preview
    previewContainer.innerHTML = '';
    
    // Create a responsive wrapper based on component type
    const previewWrapper = document.createElement('div');
    
    // Apply specific styling based on component type
    switch(item.type.toLowerCase()) {
        case 'card':
            // For cards, create a responsive wrapper with proper width constraints
            previewWrapper.className = 'w-full flex justify-center items-center p-4';
            previewWrapper.innerHTML = `
                <div class="w-full sm:w-auto max-w-full">
                    ${item.code}
                </div>
            `;
            break;
            
        case 'toggle':
        case 'checkbox':
        case 'button':
            // For small UI elements, center them
            previewWrapper.className = 'flex justify-center items-center p-6 bg-gray-800 rounded-lg';
            previewWrapper.innerHTML = item.code;
            break;
            
        default:
            // Default handling for other component types
            previewWrapper.className = 'w-full flex justify-center';
            previewWrapper.innerHTML = item.code;
    }
    
    previewContainer.appendChild(previewWrapper);
    
    // Add any component-specific scripts or styles if needed
    applyComponentSpecificBehavior(item.type, previewWrapper);
    
    // Show modal with a fade-in effect
    modal.classList.remove('hidden');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Function to apply component-specific behaviors
function applyComponentSpecificBehavior(type, container) {
    switch(type.toLowerCase()) {
        case 'card':
            // Make sure any max-width classes don't overflow the container
            const cardElement = container.querySelector('[class*="max-w-"]');
            if (cardElement) {
                // Ensure the card is responsive
                if (window.innerWidth < 640) { // Mobile viewport
                    cardElement.classList.add('w-full');
                    // Remove any fixed width classes that might cause overflow
                    cardElement.classList.remove(
                        'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl',
                        'max-w-4xl', 'max-w-5xl', 'max-w-6xl', 'max-w-7xl'
                    );
                    cardElement.style.maxWidth = '100%';
                }
            }
            break;
            
        case 'toggle':
            // Make sure toggle functionality works in preview
            const toggleInput = container.querySelector('input[type="checkbox"]');
            if (toggleInput) {
                toggleInput.addEventListener('click', (e) => {
                    // Allow clicking but prevent default to avoid state changes in preview
                    e.preventDefault();
                    // Toggle the checked state for demonstration
                    toggleInput.checked = !toggleInput.checked;
                });
            }
            break;
            
        case 'checkbox':
            // Make sure checkbox functionality works in preview
            const checkboxInput = container.querySelector('input[type="checkbox"]');
            if (checkboxInput) {
                checkboxInput.addEventListener('click', (e) => {
                    // Allow clicking but prevent default to avoid state changes in preview
                    e.preventDefault();
                    // Toggle the checked state for demonstration
                    checkboxInput.checked = !checkboxInput.checked;
                });
            }
            break;
    }
}

// Function to close the preview modal
function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    modal.classList.add('hidden');
    
    // Re-enable body scrolling
    document.body.style.overflow = '';
}

// Helper function to format date consistently with date, day and time
function formatDate(timestamp) {
    const date = new Date(timestamp);
    
    // Get day of week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    
    // Format as: "Oct 19, Monday at 2:30 PM"
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) + 
           `, ${dayName} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}

// Function to copy code to clipboard
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text)
        .then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
            `;
            button.classList.add('text-green-400');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('text-green-400');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            button.textContent = 'Copy failed';
        });
}

// Function to delete a history item
function deleteHistoryItem(index) {
    let history = JSON.parse(localStorage.getItem('elems')) || [];
    history.splice(index, 1);
    localStorage.setItem('elems', JSON.stringify(history));
    loadHistory();
}

// Function to clear all history
function clearAllHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('elems');
        loadHistory();
    }
}

// Add styles for responsive preview container
const style = document.createElement('style');
style.textContent = `
    .preview-area {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100px;
        width: 100%;
        font-family: 'Inter', sans-serif;
        overflow: hidden;
    }
    
    .preview-container {
        width: 100%;
        overflow-x: auto;
        background-color: rgba(17, 24, 39, 0.7);
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    /* Responsive adjustments for different components */
    @media (max-width: 640px) {
        [class*="max-w-"] {
            max-width: 100% !important;
            width: 100% !important;
        }
        
        /* Make cards more mobile-friendly */
        .preview-container [class*="max-w-"] {
            margin-left: auto;
            margin-right: auto;
        }
    }
    
    /* Ensure proper scrolling for code blocks */
    #componentCode {
        max-height: 200px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-word;
    }
    
    /* Make the modal more responsive */
    @media (max-width: 640px) {
        .absolute.inset-0.flex.items-center.justify-center.p-4 > div {
            width: 95%;
            max-height: 80vh;
        }
    }
`;
document.head.appendChild(style);

// Handle window resize to adjust component display
window.addEventListener('resize', () => {
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
        // Find card components and make them responsive on resize
        const cardElement = previewContainer.querySelector('[class*="max-w-"]');
        if (cardElement) {
            if (window.innerWidth < 640) {
                cardElement.classList.add('w-full');
                cardElement.style.maxWidth = '100%';
            } else {
                cardElement.style.maxWidth = '';
            }
        }
    }
});

// Load history on page load
window.onload = loadHistory;