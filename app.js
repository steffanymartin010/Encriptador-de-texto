let encryptedTexts = [];
let decryptedTexts = [];

document.getElementById('encryptButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value.trim();
    const outputAreaTitle = document.querySelector('.output-area h2');

    if (inputText && inputText.length > 0) {
        const encryptedText = btoa(inputText);
        encryptedTexts.push(encryptedText);
        updateOutputList(encryptedTexts, "Texto Encriptado");
        outputAreaTitle.textContent = "Texto Encriptado";
        document.getElementById('inputText').value = "";
        hideAlert();
        checkClearButtonState();
    } else {
        showAlert();
    }
});

document.getElementById('decryptButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value.trim();
    const outputAreaTitle = document.querySelector('.output-area h2');

    if (inputText && inputText.length > 0) {
        try {
            const decryptedText = atob(inputText);
            decryptedTexts.push(decryptedText);
            updateOutputList(decryptedTexts, "Texto Desencriptado");
            outputAreaTitle.textContent = "Texto Desencriptado";
            document.getElementById('inputText').value = "";
            hideAlert();
            checkClearButtonState();
        } catch (e) {
            alert("Texto no válido para desencriptar");
            showAlert();
        }
    } else {
        showAlert();
    }
});

document.getElementById('clearButton').addEventListener('click', () => {
    encryptedTexts = [];
    decryptedTexts = [];
    document.getElementById('outputList').innerHTML = '';
    document.getElementById('outputList').style.display = 'none';
    checkClearButtonState();
});

document.getElementById('inputText').addEventListener('input', () => {
    const inputText = document.getElementById('inputText').value;
    if (inputText.trim().length > 0) {
        hideAlert();
    }
});

// Asegúrate de que el botón de limpiar esté deshabilitado al cargar la página
window.addEventListener('load', () => {
    checkClearButtonState();
});

function updateOutputList(texts, title) {
    const outputList = document.getElementById('outputList');
    outputList.innerHTML = texts.map(text => `
        <div class="output-item">
            <p>${text}</p>
            <span class="copy-icon" onclick="copyToClipboard('${text}')">&#x1F4CB;</span>
        </div>
    `).join('');
    outputList.style.display = 'block';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}

function showAlert() {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.style.display = 'block';
    document.getElementById('outputList').style.display = 'none';
}

function hideAlert() {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.style.display = 'none';
}

function checkClearButtonState() {
    const clearButton = document.getElementById('clearButton');
    const hasTexts = encryptedTexts.length > 0 || decryptedTexts.length > 0;

    if (hasTexts) {
        clearButton.disabled = false;
        clearButton.style.backgroundColor = '#007bff';
    } else {
        clearButton.disabled = true;
        clearButton.style.backgroundColor = 'gray';
    }
}