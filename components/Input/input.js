// Initialize Feather Icons
feather.replace();

// DOM Elements
const inputType = document.getElementById('inputType');
const placeholder = document.getElementById('placeholder');
const inputValue = document.getElementById('inputValue');
const includeLabel = document.getElementById('includeLabel');
const labelText = document.getElementById('labelText');
const labelPosition = document.getElementById('labelPosition');
const labelOptions = document.getElementById('labelOptions');
const textColor = document.getElementById('textColor');
const bgColor = document.getElementById('bgColor');
const borderColor = document.getElementById('borderColor');
const focusColor = document.getElementById('focusColor');
const inputSize = document.getElementById('inputSize');
const borderRadius = document.getElementById('borderRadius');
const inputState = document.getElementById('inputState');
const width = document.getElementById('width');
const includeRightIcon = document.getElementById('includeRightIcon');
const rightIcon = document.getElementById('rightIcon');
const rightIconOptions = document.getElementById('rightIconOptions');
const inputPreview = document.getElementById('inputPreview');
const generatedCode = document.getElementById('generatedCode');
const copyButton = document.getElementById('copyButton');
const textColorValue = document.getElementById('textColorValue');
const bgColorValue = document.getElementById('bgColorValue');
const borderColorValue = document.getElementById('borderColorValue');
const focusColorValue = document.getElementById('focusColorValue');

// Settings object
let settings = {
    inputType: 'text',
    placeholder: 'Enter text here...',
    inputValue: '',
    includeLabel: true,
    labelText: 'Input Label',
    labelPosition: 'top',
    textColor: '#FFFFFF',
    bgColor: '#111827',
    borderColor: '#4B5563',
    focusColor: '#3B82F6',
    inputSize: 'md',
    borderRadius: 'rounded-md',
    inputState: 'default',
    width: 'w-full',
    includeRightIcon: false,
    rightIcon: 'check'
};

// Size mapping for padding and text size
const sizeClasses = {
    sm: {
        input: 'px-2 py-1 text-xs',
        icon: 'h-4 w-4'
    },
    md: {
        input: 'px-2.5 py-2 text-sm',
        icon: 'h-5 w-5'
    },
    lg: {
        input: 'px-3 py-3 text-base',
        icon: 'h-6 w-6'
    }
};

// Update the preview based on current settings
function updatePreview() {
    // Clear previous content
    inputPreview.innerHTML = '';
    
    // Create the container element
    const container = document.createElement('div');
    
    // Add label if needed
    if (settings.includeLabel) {
        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', 'previewInput');
        labelElement.textContent = settings.labelText;
        
        // Apply label positioning
        if (settings.labelPosition === 'top') {
            labelElement.className = 'block mb-2 text-sm font-medium';
            labelElement.style.color = settings.textColor;
            container.appendChild(labelElement);
        } else if (settings.labelPosition === 'left') {
            // For left-aligned label, use a different container layout
            container.className = 'flex items-center gap-4';
            labelElement.className = 'text-sm font-medium whitespace-nowrap';
            labelElement.style.color = settings.textColor;
            container.appendChild(labelElement);
        }
    }
    
    // Create the input wrapper for positioning icons
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'relative ' + settings.width;
    
    // Create the input element
    const input = document.createElement('input');
    input.setAttribute('type', settings.inputType);
    input.setAttribute('id', 'previewInput');
    input.setAttribute('placeholder', settings.placeholder);
    
    if (settings.inputValue) {
        input.value = settings.inputValue;
    }
    
    // Apply styling and state
    let inputClasses = `${settings.borderRadius} border focus:outline-none focus:ring-2 ${sizeClasses[settings.inputSize].input} ${settings.width}`;
    
    // Apply padding adjustments for icons
    if (settings.includeRightIcon) {
        inputClasses += ' pr-10';
    }
    
    // Apply border and focus colors
    inputClasses += ` border-[${settings.borderColor}] focus:border-[${settings.focusColor}] focus:ring-[${settings.focusColor}]/20`;
    
    input.className = inputClasses;
    input.style.backgroundColor = settings.bgColor;
    input.style.color = settings.textColor;
    
    // Apply input state
    if (settings.inputState === 'disabled') {
        input.setAttribute('disabled', 'disabled');
        input.classList.add('opacity-70', 'cursor-not-allowed');
    } else if (settings.inputState === 'readonly') {
        input.setAttribute('readonly', 'readonly');
        input.classList.add('cursor-default');
    }
    
    inputWrapper.appendChild(input);
    
    // Add right icon if needed
    if (settings.includeRightIcon) {
        const rightIconWrapper = document.createElement('div');
        rightIconWrapper.className = 'absolute inset-y-0 right-0 flex items-center pr-3';
        
        // If it's a password field with eye icon, make it interactive
        if (settings.inputType === 'password' && (settings.rightIcon === 'eye' || settings.rightIcon === 'eye-off')) {
            rightIconWrapper.classList.remove('pointer-events-none');
            rightIconWrapper.style.cursor = 'pointer';
            
            rightIconWrapper.addEventListener('click', function() {
                const inputField = this.previousSibling;
                const eyeIcon = this.querySelector('i');
                
                if (inputField.type === 'password') {
                    inputField.type = 'text';
                    eyeIcon.setAttribute('data-feather', 'eye-off');
                } else {
                    inputField.type = 'password';
                    eyeIcon.setAttribute('data-feather', 'eye');
                }
                
                feather.replace();
            });
        } else {
            rightIconWrapper.classList.add('pointer-events-none');
        }
        
        const iconSvg = document.createElement('i');
        iconSvg.setAttribute('data-feather', settings.rightIcon);
        iconSvg.className = sizeClasses[settings.inputSize].icon + ' text-gray-400';
        
        rightIconWrapper.appendChild(iconSvg);
        inputWrapper.appendChild(rightIconWrapper);
    }
    
    container.appendChild(inputWrapper);
    
    inputPreview.appendChild(container);
    
    // Initialize/replace feather icons
    feather.replace();
    
    // Update the generated code
    updateCode();
}

// Update the code display
function updateCode() {
    let html = '';
    
    // Create container element with appropriate layout
    if (settings.includeLabel && settings.labelPosition === 'left') {
        html = `<div class="flex items-center gap-4">\n`;
    } else {
        html = `<div>\n`;
    }
    
    // Add label if needed
    if (settings.includeLabel) {
        if (settings.labelPosition === 'top') {
            html += `    <label for="input" class="block mb-2 text-sm font-medium text-[${settings.textColor}]">${settings.labelText}</label>\n`;
        } else if (settings.labelPosition === 'left') {
            html += `    <label for="input" class="text-sm font-medium whitespace-nowrap text-[${settings.textColor}]">${settings.labelText}</label>\n`;
        }
    }
    
    // Create input wrapper if icons are used
    if (settings.includeRightIcon) {
        html += `    <div class="relative ${settings.width}">\n`;
    }
    
    // Input classes
    let inputClasses = `${settings.borderRadius} border ${sizeClasses[settings.inputSize].input} ${settings.width}`;
    
    // Apply padding adjustments for icons
    if (settings.includeRightIcon) {
        inputClasses += ' pr-10';
    }
    
    // Apply border and focus colors
    inputClasses += ` border-[${settings.borderColor}] focus:border-[${settings.focusColor}] focus:ring-[${settings.focusColor}]/20`;
    
    // Input state attributes
    let stateAttributes = '';
    if (settings.inputState === 'disabled') {
        stateAttributes = ' disabled class="opacity-70 cursor-not-allowed"';
    } else if (settings.inputState === 'readonly') {
        stateAttributes = ' readonly class="cursor-default"';
    }
    
    // Create the input element
    const placeholderAttr = ` placeholder="${settings.placeholder}"`;
    const valueAttr = settings.inputValue ? ` value="${settings.inputValue}"` : '';
    
    if (settings.includeRightIcon) {
        html += `        <input type="${settings.inputType}" id="input" class="${inputClasses} bg-[${settings.bgColor}] text-[${settings.textColor}] focus:outline-none focus:ring-2"${placeholderAttr}${valueAttr}${stateAttributes}>\n`;
    } else {
        html += `    <input type="${settings.inputType}" id="input" class="${inputClasses} bg-[${settings.bgColor}] text-[${settings.textColor}] focus:outline-none focus:ring-2"${placeholderAttr}${valueAttr}${stateAttributes}>\n`;
    }
    
    // Add right icon if needed
    if (settings.includeRightIcon) {
        const pointerClass = (settings.inputType === 'password' && (settings.rightIcon === 'eye' || settings.rightIcon === 'eye-off')) ? 
            'cursor-pointer' : 
            'pointer-events-none';
            
        html += `        <div class="absolute inset-y-0 right-0 flex items-center pr-3 ${pointerClass}">\n`;
        html += `            <svg xmlns="http://www.w3.org/2000/svg" class="${sizeClasses[settings.inputSize].icon} text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n`;
        
        // Add the appropriate icon path
        switch(settings.rightIcon) {
            case 'check':
                html += `                <polyline points="20 6 9 17 4 12"></polyline>\n`;
                break;
            case 'eye':
                html += `                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle>\n`;
                break;
            case 'eye-off':
                html += `                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line>\n`;
                break;
            case 'x':
                html += `                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>\n`;
                break;
            case 'chevron-down':
                html += `                <polyline points="6 9 12 15 18 9"></polyline>\n`;
                break;
            case 'alert-circle':
                html += `                <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>\n`;
                break;
            case 'search':
                html += `                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>\n`;
                break;
            case 'mail':
                html += `                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>\n`;
                break;
            case 'user':
                html += `                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>\n`;
                break;
            case 'lock':
                html += `                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>\n`;
                break;
        }
        
        html += `            </svg>\n`;
        html += `        </div>\n`;
        html += `    </div>\n`;
    }
    
    // Close the container div
    html += `</div>`;
    
    generatedCode.innerHTML = `<code>${escapeHTML(html)}</code>`;
}

// Escape HTML special characters
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
        type: 'input',
        code,
        time: Date.now()
    });
    localStorage.setItem('elems', JSON.stringify(history));
}

// Event Listeners
inputType.addEventListener('change', () => {
    settings.inputType = inputType.value;
    
    // Show eye icon if type is password
    if (settings.inputType === 'password' && settings.includeRightIcon) {
        if (rightIcon.value !== 'eye' && rightIcon.value !== 'eye-off') {
            rightIcon.value = 'eye';
            settings.rightIcon = 'eye';
        }
    }
    
    updatePreview();
});

placeholder.addEventListener('input', () => {
    settings.placeholder = placeholder.value;
    updatePreview();
});

inputValue.addEventListener('input', () => {
    settings.inputValue = inputValue.value;
    updatePreview();
});

includeLabel.addEventListener('change', () => {
    settings.includeLabel = includeLabel.checked;
    labelOptions.classList.toggle('hidden', !settings.includeLabel);
    updatePreview();
});

labelText.addEventListener('input', () => {
    settings.labelText = labelText.value;
    updatePreview();
});

labelPosition.addEventListener('change', () => {
    settings.labelPosition = labelPosition.value;
    updatePreview();
});

textColor.addEventListener('input', () => {
    settings.textColor = textColor.value;
    textColorValue.textContent = settings.textColor;
    updatePreview();
});

bgColor.addEventListener('input', () => {
    settings.bgColor = bgColor.value;
    bgColorValue.textContent = settings.bgColor;
    updatePreview();
});

borderColor.addEventListener('input', () => {
    settings.borderColor = borderColor.value;
    borderColorValue.textContent = settings.borderColor;
    updatePreview();
});

focusColor.addEventListener('input', () => {
    settings.focusColor = focusColor.value;
    focusColorValue.textContent = settings.focusColor;
    updatePreview();
});

inputSize.addEventListener('change', () => {
    settings.inputSize = inputSize.value;
    updatePreview();
});

borderRadius.addEventListener('change', () => {
    settings.borderRadius = borderRadius.value;
    updatePreview();
});

inputState.addEventListener('change', () => {
    settings.inputState = inputState.value;
    updatePreview();
});

width.addEventListener('change', () => {
    settings.width = width.value;
    updatePreview();
});

includeRightIcon.addEventListener('change', () => {
    settings.includeRightIcon = includeRightIcon.checked;
    rightIconOptions.classList.toggle('hidden', !settings.includeRightIcon);
    
    // Set eye icon as default for password fields
    if (settings.inputType === 'password' && settings.includeRightIcon) {
        rightIcon.value = 'eye';
        settings.rightIcon = 'eye';
    }
    
    updatePreview();
});

rightIcon.addEventListener('change', () => {
    settings.rightIcon = rightIcon.value;
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

// Initialize
updatePreview();