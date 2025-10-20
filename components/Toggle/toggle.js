// Get all DOM elements
const labelText = document.getElementById('labelText');
const toggleTitle = document.getElementById('toggleTitle');
const toggleOnColor = document.getElementById('toggleOnColor');
const toggleOffColor = document.getElementById('toggleOffColor');
const toggleThumbColor = document.getElementById('toggleThumbColor');
const labelColor = document.getElementById('labelColor');
const toggleSize = document.getElementById('toggleSize');
const toggleRadius = document.getElementById('toggleRadius');
const initialState = document.getElementById('initialState');
const transitionDuration = document.getElementById('transitionDuration');
const labelPositionInputs = document.querySelectorAll('input[name="labelPosition"]');
const togglePreview = document.getElementById('togglePreview');
const toggleInput = document.getElementById('toggleInput');
const labelLeft = document.getElementById('labelLeft');
const labelRight = document.getElementById('labelRight');
const generatedCode = document.getElementById('generatedCode');
const copyButton = document.getElementById('copyButton');
const onColorValue = document.getElementById('onColorValue');
const offColorValue = document.getElementById('offColorValue');
const thumbColorValue = document.getElementById('thumbColorValue');
const labelColorValue = document.getElementById('labelColorValue');
const sizeValue = document.getElementById('sizeValue');

// Settings for the toggle switch
let settings = {
    label: 'Toggle',
    title: 'Toggle switch',
    onColor: '#2563EB',
    offColor: '#374151',
    thumbColor: '#FFFFFF',
    labelColor: '#FFFFFF',
    size: 28,
    radius: 'rounded-full',
    isOn: false,
    duration: 300,
    labelPosition: 'left'
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
    
    // Set toggle state
    toggleInput.checked = settings.isOn;
    
    // Calculate dimensions
    const height = settings.size;
    const width = height * 1.85;
    const thumbSize = height - 4;
    const translateX = width - thumbSize - 4;
    
    // Update toggle appearance
    const toggle = togglePreview.querySelector('div');
    toggle.style.width = `${width}px`;
    toggle.style.height = `${height}px`;
    toggle.style.backgroundColor = settings.isOn ? settings.onColor : settings.offColor;
    
    // Update toggle classes
    toggle.className = `${settings.radius} peer peer-checked:bg-[${settings.onColor}] peer-checked:after:translate-x-[${translateX}px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[${settings.thumbColor}] after:${settings.radius} after:h-[${thumbSize}px] after:w-[${thumbSize}px] after:transition-all after:duration-[${settings.duration}ms]`;
    
    // Create a style for the thumb color
    const style = document.createElement('style');
    style.textContent = `#togglePreview div::after { background-color: ${settings.thumbColor} !important; }`;
    document.head.appendChild(style);
    
    // Update code display
    updateCode();
}

// Generate code based on current settings
function updateCode() {
    // Calculate dimensions
    const width = settings.size * 1.85;
    const thumbSize = settings.size - 4;
    const translateX = width - thumbSize - 4;
    
    // Create label HTML
    let labelHtml = '';
    if (settings.labelPosition === 'left') {
        labelHtml = `\n    <span class="mr-3 text-[${settings.labelColor}]">${settings.label}</span>`;
    } else if (settings.labelPosition === 'right') {
        labelHtml = `\n    <span class="ml-3 text-[${settings.labelColor}]">${settings.label}</span>`;
    }
    
    // Add title attribute if present
    const titleAttr = settings.title ? ` title="${settings.title}"` : '';
    
    // Build the HTML
    const html = `<label class="inline-flex items-center cursor-pointer"${titleAttr}>${settings.labelPosition === 'left' ? labelHtml : ''}
    <div class="relative">
        <input type="checkbox" class="sr-only peer"${settings.isOn ? ' checked' : ''}>
        <div class="w-[${width}px] h-[${settings.size}px] bg-[${settings.offColor}] ${settings.radius} peer peer-checked:bg-[${settings.onColor}] peer-checked:after:translate-x-[${translateX}px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[${settings.thumbColor}] after:${settings.radius} after:h-[${thumbSize}px] after:w-[${thumbSize}px] after:transition-all after:duration-[${settings.duration}ms]"></div>
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
        type: 'toggle',
        code,
        time: Date.now()
    });
    localStorage.setItem('elems', JSON.stringify(history));
}

// Event listeners for all controls

// Text inputs
labelText.addEventListener('input', () => {
    settings.label = labelText.value || 'Toggle';
    updatePreview();
});

toggleTitle.addEventListener('input', () => {
    settings.title = toggleTitle.value;
    updatePreview();
});

// Color inputs
toggleOnColor.addEventListener('input', () => {
    settings.onColor = toggleOnColor.value;
    onColorValue.textContent = settings.onColor;
    updatePreview();
});

toggleOffColor.addEventListener('input', () => {
    settings.offColor = toggleOffColor.value;
    offColorValue.textContent = settings.offColor;
    updatePreview();
});

toggleThumbColor.addEventListener('input', () => {
    settings.thumbColor = toggleThumbColor.value;
    thumbColorValue.textContent = settings.thumbColor;
    updatePreview();
});

labelColor.addEventListener('input', () => {
    settings.labelColor = labelColor.value;
    labelColorValue.textContent = settings.labelColor;
    updatePreview();
});

// Size and style inputs
toggleSize.addEventListener('input', () => {
    settings.size = parseInt(toggleSize.value);
    sizeValue.textContent = `${settings.size}px`;
    updatePreview();
});

toggleRadius.addEventListener('change', () => {
    settings.radius = toggleRadius.value;
    updatePreview();
});

// Toggle state inputs
initialState.addEventListener('change', () => {
    settings.isOn = initialState.value === 'true';
    toggleInput.checked = settings.isOn;
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

// Toggle click in preview
toggleInput.addEventListener('change', () => {
    settings.isOn = toggleInput.checked;
    initialState.value = settings.isOn ? 'true' : 'false';
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