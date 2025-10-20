// DOM Elements
const loaderType = document.getElementById('loaderType');
const primaryColor = document.getElementById('primaryColor');
const secondaryColor = document.getElementById('secondaryColor');
const loaderSize = document.getElementById('loaderSize');
const animationDuration = document.getElementById('animationDuration');
const thickness = document.getElementById('thickness');
const thicknessControl = document.getElementById('thicknessControl');
const includeLabel = document.getElementById('includeLabel');
const labelText = document.getElementById('labelText');
const labelPosition = document.getElementById('labelPosition');
const labelOptions = document.getElementById('labelOptions');
const loaderPreview = document.getElementById('loaderPreview');
const generatedCode = document.getElementById('generatedCode');
const copyButton = document.getElementById('copyButton');
const primaryColorValue = document.getElementById('primaryColorValue');
const secondaryColorValue = document.getElementById('secondaryColorValue');
const sizeValue = document.getElementById('sizeValue');
const durationValue = document.getElementById('durationValue');
const thicknessValue = document.getElementById('thicknessValue');

// Settings object
let settings = {
    loaderType: 'spinner',
    primaryColor: '#3B82F6',
    secondaryColor: '#E5E7EB',
    size: 40,
    duration: 1,
    thickness: 3,
    includeLabel: false,
    labelText: 'Loading...',
    labelPosition: 'bottom'
};

// Update the preview based on current settings
function updatePreview() {
    // Clear previous content
    loaderPreview.innerHTML = '';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'flex items-center justify-center';
    
    // Set flexbox direction based on label position if label is included
    if (settings.includeLabel && (settings.labelPosition === 'left' || settings.labelPosition === 'right')) {
        container.classList.add(settings.labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row');
    } else if (settings.includeLabel && (settings.labelPosition === 'top' || settings.labelPosition === 'bottom')) {
        container.classList.add(settings.labelPosition === 'top' ? 'flex-col-reverse' : 'flex-col');
    }
    
    // Create loader based on type
    const loader = document.createElement('div');
    
    switch(settings.loaderType) {
        case 'spinner':
            loader.className = 'rounded-full animate-spin';
            loader.style.width = `${settings.size}px`;
            loader.style.height = `${settings.size}px`;
            loader.style.borderWidth = `${settings.thickness}px`;
            loader.style.borderColor = settings.secondaryColor;
            loader.style.borderTopColor = 'transparent';
            loader.style.borderStyle = 'solid';
            loader.style.animationDuration = `${settings.duration}s`;
            break;
            
        case 'dots':
            loader.className = 'flex space-x-1';
            
            // Create three bouncing dots
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.className = 'animate-bounce';
                dot.style.width = `${settings.size / 4}px`;
                dot.style.height = `${settings.size / 4}px`;
                dot.style.backgroundColor = settings.primaryColor;
                dot.style.borderRadius = '50%';
                dot.style.animationDuration = `${settings.duration}s`;
                dot.style.animationDelay = `${i * 0.1}s`;
                loader.appendChild(dot);
            }
            break;
            
        case 'pulse':
            loader.className = 'animate-pulse';
            loader.style.width = `${settings.size}px`;
            loader.style.height = `${settings.size}px`;
            loader.style.backgroundColor = settings.primaryColor;
            loader.style.borderRadius = '50%';
            loader.style.animationDuration = `${settings.duration}s`;
            break;
            
        case 'bar':
            loader.className = 'relative';
            loader.style.width = `${settings.size * 3}px`;
            loader.style.height = `${settings.size / 4}px`;
            loader.style.backgroundColor = settings.secondaryColor;
            loader.style.borderRadius = `${settings.thickness}px`;
            
            const progressBar = document.createElement('div');
            progressBar.className = 'absolute left-0 top-0 h-full';
            progressBar.style.width = '30%';
            progressBar.style.backgroundColor = settings.primaryColor;
            progressBar.style.borderRadius = `${settings.thickness}px`;
            progressBar.style.animation = `progressAnimation ${settings.duration * 1.5}s infinite ease-in-out`;
            
            // Add keyframe animation for progress bar
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes progressAnimation {
                    0% { width: 5%; left: 0; }
                    50% { width: 30%; }
                    100% { width: 5%; left: calc(100% - 5%); }
                }
            `;
            document.head.appendChild(style);
            
            loader.appendChild(progressBar);
            break;
            
        case 'ring':
            loader.className = 'animate-spin';
            loader.style.width = `${settings.size}px`;
            loader.style.height = `${settings.size}px`;
            loader.style.borderWidth = `${settings.thickness}px`;
            loader.style.borderRadius = '50%';
            loader.style.borderTopColor = settings.primaryColor;
            loader.style.borderRightColor = settings.secondaryColor;
            loader.style.borderBottomColor = settings.secondaryColor;
            loader.style.borderLeftColor = settings.secondaryColor;
            loader.style.borderStyle = 'solid';
            loader.style.animationDuration = `${settings.duration}s`;
            break;
    }
    
    container.appendChild(loader);
    
    // Add label if needed
    if (settings.includeLabel) {
        const label = document.createElement('div');
        label.textContent = settings.labelText;
        label.style.color = settings.primaryColor;
        
        // Set margin based on position
        if (settings.labelPosition === 'right') {
            label.className = 'ml-3';
        } else if (settings.labelPosition === 'left') {
            label.className = 'mr-3';
        } else if (settings.labelPosition === 'bottom') {
            label.className = 'mt-3';
        } else if (settings.labelPosition === 'top') {
            label.className = 'mb-3';
        }
        
        container.appendChild(label);
    }
    
    loaderPreview.appendChild(container);
    
    // Update the generated code
    updateCode();
}

// Update the code display
function updateCode() {
    let html = '';
    
    // Container class based on label position
    let containerClass = 'flex items-center justify-center';
    if (settings.includeLabel) {
        if (settings.labelPosition === 'left' || settings.labelPosition === 'right') {
            containerClass += settings.labelPosition === 'left' ? ' flex-row-reverse' : ' flex-row';
        } else {
            containerClass += settings.labelPosition === 'top' ? ' flex-col-reverse' : ' flex-col';
        }
    }
    
    html = `<div class="${containerClass}">\n`;
    
    // Add loader HTML based on type
    switch(settings.loaderType) {
        case 'spinner':
            html += `    <div class="w-[${settings.size}px] h-[${settings.size}px] border-[${settings.thickness}px] border-[${settings.secondaryColor}] border-t-transparent rounded-full animate-spin" style="animation-duration: ${settings.duration}s;"></div>\n`;
            break;
            
        case 'dots':
            html += `    <div class="flex space-x-1">\n`;
            for (let i = 0; i < 3; i++) {
                html += `        <div class="w-[${settings.size / 4}px] h-[${settings.size / 4}px] bg-[${settings.primaryColor}] rounded-full animate-bounce" style="animation-duration: ${settings.duration}s; animation-delay: ${i * 0.1}s;"></div>\n`;
            }
            html += `    </div>\n`;
            break;
            
        case 'pulse':
            html += `    <div class="w-[${settings.size}px] h-[${settings.size}px] bg-[${settings.primaryColor}] rounded-full animate-pulse" style="animation-duration: ${settings.duration}s;"></div>\n`;
            break;
            
        case 'bar':
            html += `    <div class="relative w-[${settings.size * 3}px] h-[${settings.size / 4}px] bg-[${settings.secondaryColor}] rounded-[${settings.thickness}px]">\n`;
            html += `        <div class="absolute left-0 top-0 h-full w-[30%] bg-[${settings.primaryColor}] rounded-[${settings.thickness}px]" style="animation: progressAnimation ${settings.duration * 1.5}s infinite ease-in-out;"></div>\n`;
            html += `    </div>\n`;
            html += `    <style>\n        @keyframes progressAnimation {\n            0% { width: 5%; left: 0; }\n            50% { width: 30%; }\n            100% { width: 5%; left: calc(100% - 5%); }\n        }\n    </style>\n`;
            break;
            
        case 'ring':
            html += `    <div class="w-[${settings.size}px] h-[${settings.size}px] border-[${settings.thickness}px] border-[${settings.secondaryColor}] border-t-[${settings.primaryColor}] rounded-full animate-spin" style="animation-duration: ${settings.duration}s;"></div>\n`;
            break;
    }
    
    // Add label if needed
    if (settings.includeLabel) {
        let labelClass = '';
        if (settings.labelPosition === 'right') {
            labelClass = 'ml-3';
        } else if (settings.labelPosition === 'left') {
            labelClass = 'mr-3';
        } else if (settings.labelPosition === 'bottom') {
            labelClass = 'mt-3';
        } else if (settings.labelPosition === 'top') {
            labelClass = 'mb-3';
        }
        
        html += `    <div class="${labelClass}" style="color: ${settings.primaryColor};">${settings.labelText}</div>\n`;
    }
    
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
        type: 'loader',
        code,
        time: Date.now()
    });
    localStorage.setItem('elems', JSON.stringify(history));
}

// Event Listeners
loaderType.addEventListener('change', () => {
    settings.loaderType = loaderType.value;
    
    // Show/hide thickness control for relevant loader types
    thicknessControl.classList.toggle('hidden', settings.loaderType === 'pulse');
    
    updatePreview();
});

primaryColor.addEventListener('input', () => {
    settings.primaryColor = primaryColor.value;
    primaryColorValue.textContent = settings.primaryColor;
    updatePreview();
});

secondaryColor.addEventListener('input', () => {
    settings.secondaryColor = secondaryColor.value;
    secondaryColorValue.textContent = settings.secondaryColor;
    updatePreview();
});

loaderSize.addEventListener('input', () => {
    settings.size = parseInt(loaderSize.value);
    sizeValue.textContent = `${settings.size}px`;
    updatePreview();
});

animationDuration.addEventListener('input', () => {
    settings.duration = parseFloat(animationDuration.value);
    durationValue.textContent = `${settings.duration}s`;
    updatePreview();
});

thickness.addEventListener('input', () => {
    settings.thickness = parseInt(thickness.value);
    thicknessValue.textContent = `${settings.thickness}px`;
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