// DOM Elements
const includeHeader = document.getElementById('includeHeader');
const includeImage = document.getElementById('includeImage');
const includeBody = document.getElementById('includeBody');
const includeFooter = document.getElementById('includeFooter');
const cardWidth = document.getElementById('cardWidth');
const cardHeight = document.getElementById('cardHeight');
const cardBgColor = document.getElementById('cardBgColor');
const cardTextColor = document.getElementById('cardTextColor');
const borderRadius = document.getElementById('borderRadius');
const shadowSize = document.getElementById('shadowSize');
const borderStyle = document.getElementById('borderStyle');
const borderColor = document.getElementById('borderColor');
const headerTitle = document.getElementById('headerTitle');
const imageHeight = document.getElementById('imageHeight');
const imagePosition = document.getElementById('imagePosition');
const bodyText = document.getElementById('bodyText');
const footerText = document.getElementById('footerText');
const includeButton = document.getElementById('includeButton');
const buttonText = document.getElementById('buttonText');
const cardPreview = document.getElementById('cardPreview');
const generatedCode = document.getElementById('generatedCode');
const copyButton = document.getElementById('copyButton');
const bgColorValue = document.getElementById('bgColorValue');
const textColorValue = document.getElementById('textColorValue');
const borderColorValue = document.getElementById('borderColorValue');
const headerOptions = document.getElementById('headerOptions');
const imageOptions = document.getElementById('imageOptions');
const bodyOptions = document.getElementById('bodyOptions');
const footerOptions = document.getElementById('footerOptions');

// Card settings
let settings = {
    includeHeader: true,
    includeImage: true,
    includeBody: true,
    includeFooter: false,
    cardWidth: 'max-w-md',
    cardHeight: 'auto',
    bgColor: '#1F2937',
    textColor: '#FFFFFF',
    borderRadius: 'rounded-md',
    shadowSize: 'shadow',
    borderStyle: 'border',
    borderColor: '#374151',
    headerTitle: 'Card Title',
    imageHeight: 'h-48',
    imagePosition: 'top',
    bodyText: 'This is a sample card with customizable options. You can adjust various settings to create the perfect card for your project.',
    footerText: 'Card Footer',
    includeButton: true,
    buttonText: 'Learn More'
};

// Update the preview
function updatePreview() {
    // Update settings
    updateSettings();

    // Build card HTML
    const cardHTML = buildCardHTML();

    // Update preview
    cardPreview.innerHTML = cardHTML;

    // Update code
    updateCode();
}

// Update settings object from inputs
function updateSettings() {
    settings.includeHeader = includeHeader.checked;
    settings.includeImage = includeImage.checked;
    settings.includeBody = includeBody.checked;
    settings.includeFooter = includeFooter.checked;
    settings.cardWidth = cardWidth.value;
    settings.cardHeight = cardHeight.value;
    settings.bgColor = cardBgColor.value;
    settings.textColor = cardTextColor.value;
    settings.borderRadius = borderRadius.value;
    settings.shadowSize = shadowSize.value;
    settings.borderStyle = borderStyle.value;
    settings.borderColor = borderColor.value;
    settings.headerTitle = headerTitle.value;
    settings.imageHeight = imageHeight.value;
    settings.imagePosition = imagePosition.value;
    settings.bodyText = bodyText.value;
    settings.footerText = footerText.value;
    settings.includeButton = includeButton.checked;
    settings.buttonText = buttonText.value;
    
    // Toggle option visibility
    headerOptions.classList.toggle('hidden', !settings.includeHeader);
    imageOptions.classList.toggle('hidden', !settings.includeImage);
    bodyOptions.classList.toggle('hidden', !settings.includeBody);
    footerOptions.classList.toggle('hidden', !settings.includeFooter);
}

// Build card HTML based on settings
function buildCardHTML() {
    let html = '';
    
    // Start card container
    html = `<div class="${settings.cardWidth} ${settings.cardHeight !== 'auto' ? settings.cardHeight : ''} overflow-hidden ${settings.borderRadius} ${settings.shadowSize} ${settings.borderStyle} border-[${settings.borderColor}] bg-[${settings.bgColor}]">`;
    
    // Image at top
    if (settings.includeImage && settings.imagePosition === 'top') {
        html += `
    <div class="${settings.imageHeight} bg-gray-500"></div>`;
    }
    
    // Header
    if (settings.includeHeader) {
        html += `
    <div class="px-6 py-4 ${settings.borderStyle !== 'border-none' ? 'border-b border-[' + settings.borderColor + ']' : ''}">
        <h3 class="text-lg font-medium text-[${settings.textColor}]">${settings.headerTitle}</h3>
    </div>`;
    }
    
    // Body
    if (settings.includeBody) {
        html += `
    <div class="px-6 py-4">
        <p class="text-[${settings.textColor}]">${settings.bodyText}</p>
    </div>`;
    }
    
    // Image at bottom
    if (settings.includeImage && settings.imagePosition === 'bottom') {
        html += `
    <div class="${settings.imageHeight} bg-gray-500"></div>`;
    }
    
    // Footer
    if (settings.includeFooter) {
        html += `
    <div class="px-6 py-4 ${settings.borderStyle !== 'border-none' ? 'border-t border-[' + settings.borderColor + ']' : ''}">
        <div class="flex items-center justify-between">
            <span class="text-sm text-[${settings.textColor}]">${settings.footerText}</span>`;
        
        if (settings.includeButton) {
            html += `
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">${settings.buttonText}</button>`;
        }
        
        html += `
        </div>
    </div>`;
    }
    
    // Close card container
    html += `
</div>`;

    return html;
}

// Update the code display
function updateCode() {
    generatedCode.innerHTML = `<code>${escapeHTML(buildCardHTML())}</code>`;
}

// Escape HTML for code display
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Save to history
function saveToHistory(code) {
    const history = JSON.parse(localStorage.getItem('elems')) || [];
    history.push({
        type: 'card',
        code,
        time: Date.now()
    });
    localStorage.setItem('elems', JSON.stringify(history));
}

// Event Listeners

// Structure checkboxes
includeHeader.addEventListener('change', updatePreview);
includeImage.addEventListener('change', updatePreview);
includeBody.addEventListener('change', updatePreview);
includeFooter.addEventListener('change', updatePreview);

// Card dimensions
cardWidth.addEventListener('change', updatePreview);
cardHeight.addEventListener('change', updatePreview);

// Colors
cardBgColor.addEventListener('input', () => {
    bgColorValue.textContent = cardBgColor.value;
    updatePreview();
});

cardTextColor.addEventListener('input', () => {
    textColorValue.textContent = cardTextColor.value;
    updatePreview();
});

borderColor.addEventListener('input', () => {
    borderColorValue.textContent = borderColor.value;
    updatePreview();
});

// Styling
borderRadius.addEventListener('change', updatePreview);
shadowSize.addEventListener('change', updatePreview);
borderStyle.addEventListener('change', updatePreview);

// Content options
headerTitle.addEventListener('input', updatePreview);
imageHeight.addEventListener('change', updatePreview);
imagePosition.addEventListener('change', updatePreview);
bodyText.addEventListener('input', updatePreview);
footerText.addEventListener('input', updatePreview);
includeButton.addEventListener('change', updatePreview);
buttonText.addEventListener('input', updatePreview);

// Copy button
copyButton.addEventListener('click', () => {
    const codeText = generatedCode.textContent;
    
    navigator.clipboard.writeText(codeText)
        .then(() => {
            const oldText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            copyButton.classList.replace('bg-green-600', 'bg-blue-600');
            copyButton.classList.replace('hover:bg-green-700', 'hover:bg-blue-700');
            
            setTimeout(() => {
                copyButton.textContent = oldText;
                copyButton.classList.replace('bg-blue-600', 'bg-green-600');
                copyButton.classList.replace('hover:bg-blue-700', 'hover:bg-green-700');
            }, 2000);
            
            saveToHistory(codeText);
        })
        .catch(err => {
            console.error('Copy failed:', err);
            copyButton.textContent = 'Copy failed';
        });
});

// Initialize the preview
updatePreview();