// History page component manager
const historyContent = document.getElementById('historyContent');
let lastScreenSize = window.innerWidth < 640 ? 'mobile' : 'desktop';

// DOM Elements cache - defined at the top for clarity
const domCache = {
  modal: null,
  previewContainer: null,
  modalTitle: null,
  componentType: null,
  componentDate: null,
  componentCode: null,
};

/**
 * MAIN FUNCTIONALITY
 */

// Display the history or empty state message
function loadHistory() {
  const history = getHistory();
  
  if (history.length === 0) {
    showEmptyState();
    return;
  }
  
  renderHistoryItems(history);
}

// Format nice date strings based on screen size
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[date.getDay()];
  
  // Simpler format for mobile
  if (window.innerWidth < 640) {
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) + 
           ` at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  } 
  
  // More detailed for desktop
  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) + 
         `, ${dayName} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}

// Copy component code to clipboard
function copyToClipboard(text, button) {
  const originalBtn = button.innerHTML;
  
  navigator.clipboard.writeText(text)
    .then(() => {
      // Update button to show success
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Copied!
      `;
      button.classList.add('text-green-400');
      
      // Reset after 2 seconds
      setTimeout(() => {
        button.innerHTML = originalBtn;
        button.classList.remove('text-green-400');
      }, 2000);
    })
    .catch(err => {
      console.error('Copy failed:', err);
      button.textContent = 'Failed';
    });
}

// Delete a specific history item
function deleteHistoryItem(index) {
  let history = getHistory();
  history.splice(index, 1);
  localStorage.setItem('elems', JSON.stringify(history));
  loadHistory();
}

// Clear all history after confirmation
function clearAllHistory() {
  if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
    localStorage.removeItem('elems');
    loadHistory();
  }
}

/**
 * UI RENDERING
 */

// Show empty state with call-to-action
function showEmptyState() {
  historyContent.innerHTML = `
    <div class="text-center py-8 sm:py-12">
      <a href="../generator/generator.html">
        <svg class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 border border-gray-500 rounded-xl cursor-pointer hover:text-gray-300 hover:border-gray-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </a>
      <h3 class="mt-2 text-sm font-medium text-gray-300">No history yet</h3>
      <p class="mt-1 text-xs sm:text-sm text-gray-500">Generate some elements to see them here.</p>
    </div>
  `;
}

// Render the list of history items
function renderHistoryItems(history) {
  // Create the container and header
  historyContent.innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
      <h2 class="text-lg sm:text-xl font-bold text-white">Generated Elements (${history.length})</h2>
      <button id="clearHistory" class="px-2 py-1 sm:px-3 sm:py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
        Clear All
      </button>
    </div>
    <div class="space-y-4" id="historyList"></div>
  `;
  
  const historyList = document.getElementById('historyList');
  
  // Sort by newest first
  history.sort((a, b) => b.time - a.time);
  
  // Create a card for each history item
  history.forEach((item, index) => {
    const card = createHistoryCard(item, index);
    historyList.appendChild(card);
  });
  
  // Set up event handlers for all buttons
  setupEventHandlers(history);
}

// Create a card for a single history item
function createHistoryCard(item, index) {
  const card = document.createElement('div');
  card.classList.add('bg-gray-800', 'rounded-lg', 'overflow-hidden', 'border', 
                     'border-gray-700', 'hover:border-gray-500', 'transition-all', 'duration-300');
  
  // Clean up code for display
  const formattedCode = item.code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const shortCode = formattedCode.length > 100 ? formattedCode.substring(0, 100) + '...' : formattedCode;
  
  card.innerHTML = `
    <div class="p-3 sm:p-4 flex justify-between items-center bg-gray-900 flex-wrap sm:flex-nowrap gap-2">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <div class="bg-indigo-500 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-white font-medium uppercase text-xs sm:text-sm">${item.type.charAt(0)}</span>
        </div>
        <h3 class="text-base sm:text-lg font-semibold text-white capitalize">${item.type} Component</h3>
      </div>
      <span class="text-xs text-gray-500 w-full sm:w-auto text-right">${formatDate(item.time)}</span>
    </div>
    
    <div class="p-3 sm:p-4">
      <div class="bg-gray-900 p-2 sm:p-3 rounded-md overflow-x-auto">
        <pre class="text-gray-300 text-xs sm:text-sm whitespace-pre-wrap"><code>${shortCode}</code></pre>
      </div>
    </div>
    
    <div class="flex border-t border-gray-700">
      <button data-index="${index}" class="preview-btn flex-1 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Preview
      </button>
      <button data-index="${index}" class="copy-btn flex-1 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-green-700 transition-colors flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy
      </button>
      <button data-index="${index}" class="delete-btn flex-1 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-red-700 transition-colors flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  `;
  
  return card;
}

// Add all event handlers to buttons
function setupEventHandlers(history) {
  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-index');
      copyToClipboard(history[idx].code, this);
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-index');
      deleteHistoryItem(idx);
    });
  });
  
  // Preview buttons
  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-index');
      openPreviewModal(history[idx]);
    });
  });
  
  // Clear all button
  const clearBtn = document.getElementById('clearHistory');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllHistory);
  }
}

/**
 * PREVIEW MODAL
 */

// Create modal if it doesn't exist yet
function createPreviewModal() {
  if (document.getElementById('previewModal')) return;
  
  // Create the modal element
  const modal = document.createElement('div');
  modal.id = 'previewModal';
  modal.className = 'fixed inset-0 z-50 hidden';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
    <div class="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
      <div class="bg-gray-800/80 rounded-lg shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center p-3 sm:p-4 border-b border-gray-700 sticky top-0 bg-gray-800/95 z-10">
          <h3 id="modalTitle" class="text-base sm:text-lg font-medium text-white">Component Preview</h3>
          <button id="closeModal" class="text-gray-400 hover:text-white">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4 sm:p-6">
          <div class="mb-4 sm:mb-6">
            <div id="componentType" class="text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2 capitalize"></div>
            <div id="componentDate" class="text-xs text-gray-500"></div>
          </div>
          <div class="p-3 sm:p-4 bg-gray-900 rounded-md mb-4 sm:mb-6 overflow-x-auto">
            <pre id="componentCode" class="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap break-all sm:break-normal"></pre>
          </div>
          <div class="p-3 sm:p-4 md:p-6 rounded-md bg-gray-900/50">
            <h4 class="text-xs sm:text-sm font-medium text-gray-400 mb-3 sm:mb-4">Preview:</h4>
            <div class="preview-container">
              <div id="previewContainer" class="preview-area"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Cache DOM elements for better performance
  domCache.modal = modal;
  domCache.modalTitle = document.getElementById('modalTitle');
  domCache.componentType = document.getElementById('componentType');
  domCache.componentDate = document.getElementById('componentDate');
  domCache.componentCode = document.getElementById('componentCode');
  domCache.previewContainer = document.getElementById('previewContainer');

  // Add event listeners
  document.getElementById('closeModal').addEventListener('click', closePreviewModal);
  
  // Close when clicking backdrop
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target === modal.querySelector('.absolute')) {
      closePreviewModal();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closePreviewModal();
    }
  });
}

// Open preview modal with a component
function openPreviewModal(item) {
  createPreviewModal();
  
  // Set modal content
  domCache.modalTitle.textContent = `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Component Preview`;
  domCache.componentType.textContent = `Component Type: ${item.type}`;
  domCache.componentDate.textContent = `Generated on: ${formatDate(item.time)}`;
  domCache.componentCode.textContent = item.code;
  
  // Store timestamp for responsive updates
  domCache.componentDate.dataset.timestamp = item.time;
  
  // Render preview based on component type
  renderComponentPreview(item);
  
  // Show modal and prevent background scrolling
  domCache.modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Render the appropriate preview for the component type
function renderComponentPreview(item) {
  // Clear previous preview
  domCache.previewContainer.innerHTML = '';
  
  // Create wrapper with appropriate styling
  const wrapper = document.createElement('div');
  
  // Pick the right layout based on component type
  switch(item.type.toLowerCase()) {
    case 'card':
      wrapper.className = 'w-full flex justify-center items-center p-2 sm:p-4';
      wrapper.innerHTML = `<div class="w-full sm:w-auto max-w-full">${item.code}</div>`;
      break;
      
    case 'toggle':
    case 'checkbox':
    case 'button':
      wrapper.className = 'flex justify-center items-center p-3 sm:p-6 bg-gray-800 rounded-lg';
      wrapper.innerHTML = item.code;
      break;
      
    case 'navbar':
      wrapper.className = 'w-full';
      wrapper.innerHTML = `<div class="bg-white rounded-md overflow-hidden w-full">${item.code}</div>`;
      break;
      
    default:
      wrapper.className = 'w-full flex justify-center';
      wrapper.innerHTML = item.code;
  }
  
  domCache.previewContainer.appendChild(wrapper);
  
  // Apply any interactive behavior the component needs
  makeComponentInteractive(item.type, wrapper);
}

// Add interactivity to preview components
function makeComponentInteractive(type, container) {
  // Common fixes for all types
  fixResponsiveWidths(container);
  
  // Type-specific fixes
  switch(type.toLowerCase()) {
    case 'navbar':
      // Make navbar static in preview
      const navbar = container.querySelector('nav');
      if (navbar) {
        navbar.style.position = 'static';
        navbar.classList.add('w-full');
      }
      break;
      
    case 'toggle':
    case 'checkbox':
      // Make toggles/checkboxes clickable for demo
      const input = container.querySelector('input[type="checkbox"]');
      if (input) {
        input.addEventListener('click', e => {
          e.preventDefault();
          input.checked = !input.checked;
        });
      }
      break;
  }
}

// Fix any responsive width issues in components
function fixResponsiveWidths(container) {
  // Fix max-width classes on mobile
  if (window.innerWidth < 640) {
    const elemWithMaxWidth = container.querySelector('[class*="max-w-"]');
    if (elemWithMaxWidth) {
      elemWithMaxWidth.classList.add('w-full');
      elemWithMaxWidth.style.maxWidth = '100%';
    }
  }
}

// Close the preview modal
function closePreviewModal() {
  domCache.modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * UTILITIES
 */

// Get history from localStorage
function getHistory() {
  return JSON.parse(localStorage.getItem('elems')) || [];
}

// Add responsive styles to document
function addResponsiveStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .preview-area {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
      width: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    }
    
    .preview-container {
      width: 100%;
      overflow-x: auto;
      background-color: rgba(17, 24, 39, 0.7);
      border-radius: 0.5rem;
      padding: 0.5rem;
    }
    
    /* Mobile styles */
    @media (max-width: 640px) {
      [class*="max-w-"] {
        max-width: 100% !important;
        width: 100% !important;
      }
      
      .preview-container [class*="max-w-"] {
        margin-left: auto;
        margin-right: auto;
      }
      
      #componentCode {
        font-size: 11px;
        line-height: 1.3;
      }
    }
    
    /* Code block styles */
    #componentCode {
      max-height: 150px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }
    
    /* Desktop styles */
    @media (min-width: 640px) {
      #componentCode {
        max-height: 200px;
        word-break: normal;
      }
      
      .preview-container {
        padding: 1rem;
      }
    }
    
    /* Modal responsive styles */
    @media (max-width: 640px) {
      .absolute.inset-0.flex.items-center.justify-center > div {
        width: 95%;
        max-height: 80vh;
      }
    }
    
    /* Hide scrollbars */
    .preview-container::-webkit-scrollbar { display: none; }
    .preview-container { scrollbar-width: none; }
  `;
  document.head.appendChild(style);
}

// Handle window resize events
function handleResize() {
  const isNowMobile = window.innerWidth < 640;
  const currentScreenSize = isNowMobile ? 'mobile' : 'desktop';
  
  // Only update if screen size category changed
  if (lastScreenSize !== currentScreenSize) {
    lastScreenSize = currentScreenSize;
    
    // Update date formats if modal is open
    if (domCache.componentDate && domCache.componentDate.dataset.timestamp) {
      const timestamp = parseInt(domCache.componentDate.dataset.timestamp);
      domCache.componentDate.textContent = `Generated on: ${formatDate(timestamp)}`;
    }
    
    // Fix responsive elements in preview
    if (domCache.previewContainer) {
      const container = domCache.previewContainer.querySelector('div');
      if (container) fixResponsiveWidths(container);
    }
  }
}

/**
 * INITIALIZATION
 */

// Initialize the history page
function init() {
  addResponsiveStyles();
  loadHistory();
  window.addEventListener('resize', handleResize);
}

// Start everything when page loads
window.onload = init;