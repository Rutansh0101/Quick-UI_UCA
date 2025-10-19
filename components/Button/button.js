const buttonText = document.getElementById('buttonText');
const buttonTextColor = document.getElementById('buttonTextColor');
const buttonPreview = document.getElementById('buttonPreview');
const generatedCode = document.getElementById('generatedCode');
const copyButton = document.getElementById('copyButton');
const colorValueSpan = document.getElementById('colorValue');
const transitionDuration = document.getElementById('transitionDuration');
const buttonBorderColor = document.getElementById('buttonBorderColor');
const buttonBorderWidth = document.getElementById('buttonBorderWidth');
const borderColorValue = document.getElementById('borderColorValue');

let btnSettings = {
    text: 'Button',
    title: 'Button Component',
    text_color: "#ffffff",
    color: '#2563EB',
    borderRadius: '0',
    padding: '8',
    hoverEffect: 'none',
    transitionDuration: '300',
    borderColor: '#2563EB',
    borderWidth: '2'
};

function updateCode() {
    // Base classes with dynamic values
    let classes = `px-${btnSettings.padding * 2} py-${btnSettings.padding} bg-[${btnSettings.color}] text-[${btnSettings.text_color}]`;
    
    // Add border styles if width is greater than 0
    if (parseInt(btnSettings.borderWidth) > 0) {
        classes += ` border-[${btnSettings.borderWidth}px] border-[${btnSettings.borderColor}]`;
    }
    
    // Add border radius
    if (btnSettings.borderRadius !== '0') {
        classes += ` rounded-[${btnSettings.borderRadius}px]`;
    } else {
        classes += ' rounded';
    }
    
    // Add hover effects
    if (btnSettings.hoverEffect === 'darken') {
        classes += ' hover:brightness-80';
    } else if (btnSettings.hoverEffect === 'lighten') {
        classes += ' hover:brightness-140';
    } else if (btnSettings.hoverEffect === 'scale') {
        classes += ' hover:scale-105 transform';
    }
    
    // Add transition with dynamic duration
    classes += ` transition duration-[${btnSettings.transitionDuration}ms]`;
    
    // Generate the final HTML
    const html = `<button class="${classes}"${btnSettings.title ? ` title="${btnSettings.title}"` : ''}>
    ${btnSettings.text || 'Button'}
</button>`;
    
    generatedCode.innerHTML = `<code>${escapeHTML(html)}</code>`;
}

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

buttonText.addEventListener('input', (e) => {
    btnSettings.text = e.target.value || 'Button';
    buttonPreview.textContent = btnSettings.text;
    updateCode();
});

const buttonTitle = document.getElementById('buttonTitle');
buttonTitle.addEventListener('input', (e) => {
    btnSettings.title = e.target.value;
    buttonPreview.title = btnSettings.title || 'Button Component';
    updateCode();
});

const buttonColor = document.getElementById('buttonColor');
buttonColor.addEventListener('input', (e) => {
    btnSettings.color = e.target.value;
    buttonPreview.style.backgroundColor = btnSettings.color;
    colorValueSpan.textContent = btnSettings.color;
    updateCode();
});

const buttonBorderRadius = document.getElementById('buttonBorderRadius');
buttonBorderRadius.addEventListener('input', (e) => {
    btnSettings.borderRadius = e.target.value;
    buttonPreview.style.borderRadius = `${btnSettings.borderRadius}px`;
    updateCode();
});

const buttonPadding = document.getElementById('buttonPadding');
buttonPadding.addEventListener('input', (e) => {
    btnSettings.padding = e.target.value;
    buttonPreview.style.padding = `${btnSettings.padding}px ${btnSettings.padding * 2}px`;
    updateCode();
});

buttonTextColor.addEventListener('input', (e) => {
    btnSettings.text_color = e.target.value;
    buttonPreview.style.color = btnSettings.text_color;
    const textColorValue = document.getElementById("textColorValue");
    textColorValue.textContent = btnSettings.text_color;
    updateCode();
});

// Border Color implementation
buttonBorderColor.addEventListener('input', (e) => {
    btnSettings.borderColor = e.target.value;
    buttonPreview.style.borderColor = btnSettings.borderColor;
    borderColorValue.textContent = btnSettings.borderColor;
    updateCode();
});

// Border Width implementation
buttonBorderWidth.addEventListener('input', (e) => {
    btnSettings.borderWidth = e.target.value;
    
    if (parseInt(e.target.value) > 0) {
        buttonPreview.style.borderWidth = `${btnSettings.borderWidth}px`;
        buttonPreview.style.borderStyle = 'solid';
    } else {
        buttonPreview.style.borderWidth = '0';
        buttonPreview.style.borderStyle = 'none';
    }
    
    updateCode();
});

const buttonHoverEffect = document.getElementById('hoverEffect');
buttonHoverEffect.addEventListener('change', (e) => {
    btnSettings.hoverEffect = e.target.value;
    
    buttonPreview.classList.remove(
        'hover:brightness-80', 
        'hover:brightness-140', 
        'hover:scale-105', 
        'transform'
    );
    
    if (e.target.value === 'darken') {
        buttonPreview.classList.add('hover:brightness-80');
    } else if (e.target.value === 'lighten') {
        buttonPreview.classList.add('hover:brightness-140');
    } else if (e.target.value === 'scale') {
        buttonPreview.classList.add('hover:scale-105', 'transform');
    }
    
    updateCode();
});

transitionDuration.addEventListener('input', (e) => {
    btnSettings.transitionDuration = e.target.value;
    buttonPreview.style.transitionDuration = `${btnSettings.transitionDuration}ms`;
    updateCode();
});

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
        })
        .catch(err => {
            console.error('Copy failed:', err);
            copyButton.textContent = 'Copy failed';
        });

    const elems = localStorage.getItem("elems");
    const newElem = {
        type: "button",
        code: generatedCode.textContent,
        settings: btnSettings,
        time: Date.now()
    }
    if(elems) {
        const parsedElems = JSON.parse(elems);
        parsedElems.push(newElem);
        localStorage.setItem("elems", JSON.stringify(parsedElems));    
    }
    else {
        const newElems = [];
        newElems.push(newElem);
        localStorage.setItem("elems", JSON.stringify(newElems) );
    }
});

// Initialize the preview with border styles
function initializeButtonPreview() {
    // Set initial border properties if border width > 0
    if (parseInt(btnSettings.borderWidth) > 0) {
        buttonPreview.style.borderWidth = `${btnSettings.borderWidth}px`;
        buttonPreview.style.borderStyle = 'solid';
        buttonPreview.style.borderColor = btnSettings.borderColor;
    }
    
    // Set initial transition duration
    buttonPreview.style.transitionDuration = `${btnSettings.transitionDuration}ms`;
}

// Call initialization and update code on page load
initializeButtonPreview();
updateCode();
