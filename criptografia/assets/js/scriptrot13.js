function rot(s, i) {
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
    });
}

function traduzirTexto() {
    const input = document.getElementById('inputText').value;
    const rotValue = parseInt(document.getElementById('rotSelect').value, 10);
    const output = rot(input, rotValue);
    document.getElementById('outputText').value = output;
}
