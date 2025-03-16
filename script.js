const templateConfig = {
    ombox: {
        types: ['notice', 'speedy', 'content'],
        example: '{{ombox|type=speedy|text=This page may be deleted}}'
    },
    ambox: {
        types: ['notice', 'warning', 'serious'],
        example: '{{ambox|type=warning|text=Needs citations}}'
    },
    tmbox: {
        types: [],
        example: '{{tmbox|text=Closed discussion}}'
    },
    fmbox: {
        types: [],
        example: '{{fmbox|text=CC-BY-SA 4.0}}'
    }
};

// DOM Elements
const bannerText = document.getElementById('banner-text');
const generateButton = document.getElementById('generate-button');
const copyButton = document.getElementById('copy-button');
const output = document.getElementById('wikitext-output');

// Event Listeners
bannerText.addEventListener('input', updateGenerateButtonState);
document.getElementById('template-type').addEventListener('change', handleTemplateChange);
output.addEventListener('input', updateCopyButtonState);

// Initial setup
handleTemplateChange();

function updateGenerateButtonState() {
    generateButton.disabled = bannerText.value.trim() === '';
}

function updateCopyButtonState() {
    copyButton.disabled = output.value.trim() === '';
}

function handleTemplateChange() {
    const template = document.getElementById('template-type').value;
    const typeSelect = document.getElementById('banner-type');
    const typeSelector = document.getElementById('type-selector');

    typeSelect.innerHTML = templateConfig[template].types
        .map(type => `<option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>`)
        .join('');

    typeSelector.style.display = templateConfig[template].types.length ? 'block' : 'none';
    updateGenerateButtonState();
}

function generateCode() {
    const template = document.getElementById('template-type').value;
    const text = bannerText.value.trim();
    const type = document.getElementById('banner-type').value;

    let params = [];
    if (templateConfig[template].types.includes(type)) {
        params.push(`type=${type}`);
    }
    if (text) {
        params.push(`text=${encodeURIComponent(text)}`);
    }

    const code = `{{${template}${params.length ? '|' : ''}${params.join('|')}}}`;
    output.value = code;

    // Update preview
    const preview = document.getElementById('banner-preview');
    preview.className = `${template}${type ? ` ${template}-${type}` : ''}`;
    preview.textContent = text || templateConfig[template].example;

    // Trigger copy button state update
    output.dispatchEvent(new Event('input'));
}

function copyCode() {
    output.select();
    document.execCommand('copy');
}