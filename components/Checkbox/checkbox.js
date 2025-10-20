// Get all DOM elements
const labelText = document.getElementById('labelText');
const checkboxTitle = document.getElementById('checkboxTitle');
const checkedColor = document.getElementById('checkedColor');
const uncheckedColor = document.getElementById('uncheckedColor');
const checkColor = document.getElementById('checkColor');
const labelColor = document.getElementById('labelColor');
const checkboxSize = document.getElementById('checkboxSize');
const borderRadius = document.getElementById('borderRadius');
const initialState = document.getElementById('initialState');
const transitionDuration = document.getElementById('transitionDuration');
const borderStyle = document.getElementById('borderStyle');
const labelPositionInputs = document.querySelectorAll('input[name="labelPosition"]');
const checkboxPreview = document.getElementById('checkboxPreview');
const checkboxInput = document.getElementById('checkboxInput');
const labelLeft = document.getElementById('labelLeft');
const labelRight = document.getElementById('labelRight');
const generatedCode = document.getElementById('generatedCode');
const copyButton = document.getElementById('copyButton');
const checkedColorValue = document.getElementById('checkedColorValue');
const uncheckedColorValue = document.getElementById('uncheckedColorValue');
const checkColorValue = document.getElementById('checkColorValue');
const labelColorValue = document.getElementById('labelColorValue');
const sizeValue = document.getElementById('sizeValue');

// Settings for the checkbox
let settings = {
    label: 'Remember me',
    title: 'Checkbox',
    checkedColor: '#2563EB',
    uncheckedColor: '#1F2937',
    checkColor: '#FFFFFF',
    labelColor: '#FFFFFF',
    size: 20,
    borderRadius: 'rounded-md',
    isChecked: false,
    duration: 200,
    borderStyle: 'border',
    labelPosition: 'right'
};

// Update the visual preview
function updatePreview() {
    // Handle label text and position
    labelLeft.textContent = settings.label;
    labelRight.textContent = settings.label;
    
    labelLeft.classList.toggle('hidden', settings.labelPosition !== 'left');
    labelRight.classList.toggle('hidden', settings.labelPosition !== 'right');
    
    // Set colors
    labelLeft.style.color = settings.labelColor;
    labelRight.style.color = settings.labelColor;
    
    // Set checkbox state
    checkboxInput.checked = settings.isChecked;
    
    // Update checkbox appearance
    const checkboxDiv = checkboxPreview.querySelector('div');
    const checkIcon = checkboxPreview.querySelector('svg');
    
    // Set size
    checkboxDiv.style.width = `${settings.size}px`;
    checkboxDiv.style.height = `${settings.size}px`;
    
    // Calculate checkmark size and position
    const checkSize = Math.max(Math.floor(settings.size * 0.6), 12);
    const checkTop = Math.floor((settings.size - checkSize) / 2);
    const checkLeft = Math.floor((settings.size - checkSize) / 2);
    
    checkIcon.style.width = `${checkSize}px`;
    checkIcon.style.height = `${checkSize}px`;
    checkIcon.style.top = `${checkTop}px`;
    checkIcon.style.left = `${checkLeft}px`;
    checkIcon.style.color = settings.checkColor;
    
    // Update checkbox classes
    checkboxDiv.className = `${settings.size === 'custom' ? 'w-custom h-custom' : `w-${settings.size} h-${settings.size}`} bg-[${settings.uncheckedColor}] ${settings.borderStyle} border-gray-600 ${settings.borderRadius} peer peer-checked:bg-[${settings.checkedColor}] peer-checked:border-[${settings.checkedColor}] transition-all duration-[${settings.duration}ms]`;
    
    checkboxDiv.style.backgroundColor = settings.uncheckedColor;
    
    if (settings.isChecked) {
        checkboxDiv.style.backgroundColor = settings.checkedColor;
        checkboxDiv.style.borderColor = settings.checkedColor;
    }
    
    // Update code display
    updateCode();
}

// Generate code based on current settings
function updateCode() {
    // Create label HTML based on position
    let labelHtml = '';
    if (settings.labelPosition === 'left') {
        labelHtml = `\n    <span class="mr-3 text-[${settings.labelColor}]">${settings.label}</span>`;
    } else if (settings.labelPosition === 'right') {
        labelHtml = `\n    <span class="ml-3 text-[${settings.labelColor}]">${settings.label}</span>`;
    }
    
    // Calculate checkmark size and position
    const checkSize = Math.max(Math.floor(settings.size * 0.6), 12);
    const checkTop = Math.floor((settings.size - checkSize) / 2);
    const checkLeft = Math.floor((settings.size - checkSize) / 2);
    
    // Add title attribute if present
    const titleAttr = settings.title ? ` title="${settings.title}"` : '';
    
    // Build the HTML
    const html = `<label class="inline-flex items-center cursor-pointer"${titleAttr}>${settings.labelPosition === 'left' ? labelHtml : ''}
    <div class="relative">
        <input type="checkbox" class="sr-only peer"${settings.isChecked ? ' checked' : ''}>
        <div class="w-[${settings.size}px] h-[${settings.size}px] bg-[${settings.uncheckedColor}] ${settings.borderStyle} border-gray-600 ${settings.borderRadius} peer peer-checked:bg-[${settings.checkedColor}] peer-checked:border-[${settings.checkedColor}] transition-all duration-[${settings.duration}ms]"></div>
        <svg class="absolute w-[${checkSize}px] h-[${checkSize}px] top-[${checkTop}px] left-[${checkLeft}px] text-[${settings.checkColor}] opacity-0 peer-checked:opacity-100 transition-opacity duration-[${settings.duration}ms]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>${settings.labelPosition === 'right' ? labelHtml : ''}
</label>`;
    
    // Display the escaped HTML
    generatedCode.innerHTML = `<code>${escapeHTML(html)}</code>`;
}

// Escape special characters for HTML display
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Save code to localStorage history
function saveToHistory(code) {
    const history = JSON.parse(localStorage.getItem('elems')) || [];
    history.push({
        type: 'checkbox',
        code,
        time: Date.now()
    });
    localStorage.setItem('elems', JSON.stringify(history));
}

// Event listeners for all controls

// Text inputs
labelText.addEventListener('input', () => {
    settings.label = labelText.value || 'Remember me';
    updatePreview();
});

checkboxTitle.addEventListener('input', () => {
    settings.title = checkboxTitle.value;
    updatePreview();
});

// Color inputs
checkedColor.addEventListener('input', () => {
    settings.checkedColor = checkedColor.value;
    checkedColorValue.textContent = settings.checkedColor;
    updatePreview();
});

uncheckedColor.addEventListener('input', () => {
    settings.uncheckedColor = uncheckedColor.value;
    uncheckedColorValue.textContent = settings.uncheckedColor;
    updatePreview();
});

checkColor.addEventListener('input', () => {
    settings.checkColor = checkColor.value;
    checkColorValue.textContent = settings.checkColor;
    updatePreview();
});

labelColor.addEventListener('input', () => {
    settings.labelColor = labelColor.value;
    labelColorValue.textContent = settings.labelColor;
    updatePreview();
});

// Size and style inputs
checkboxSize.addEventListener('input', () => {
    settings.size = parseInt(checkboxSize.value);
    sizeValue.textContent = `${settings.size}px`;
    updatePreview();
});

borderRadius.addEventListener('change', () => {
    settings.borderRadius = borderRadius.value;
    updatePreview();
});

borderStyle.addEventListener('change', () => {
    settings.borderStyle = borderStyle.value;
    updatePreview();
});

// Checkbox state inputs
initialState.addEventListener('change', () => {
    settings.isChecked = initialState.value === 'true';
    checkboxInput.checked = settings.isChecked;
    updatePreview();
});

transitionDuration.addEventListener('input', () => {
    settings.duration = parseInt(transitionDuration.value);
    updatePreview();
});

// Label position radio buttons
labelPositionInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (input.checked) {
            settings.labelPosition = input.value;
            updatePreview();
        }
    });
});

// Checkbox click in preview
checkboxInput.addEventListener('change', () => {
    settings.isChecked = checkboxInput.checked;
    initialState.value = settings.isChecked ? 'true' : 'false';
    updatePreview();
});

// Copy button click
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

// Initialize the preview on page load
updatePreview();