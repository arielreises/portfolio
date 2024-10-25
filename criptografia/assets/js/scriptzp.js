function traduzirTexto() {
    const input = document.getElementById('inputText').value;
    let output = '';

    for (let char of input) {
        switch (char.toLowerCase()) {
            case 'z': output += 'p'; break;
            case 'e': output += 'o'; break;
            case 'n': output += 'l'; break;
            case 'i': output += 'a'; break;
            case 't': output += 'r'; break;
            case 'p': output += 'z'; break;
            case 'o': output += 'e'; break;
            case 'l': output += 'n'; break;
            case 'a': output += 'i'; break;
            case 'r': output += 't'; break;
            case 'á': output += 'í'; break;
            case 'í': output += 'á'; break;
            case 'à': output += 'ì'; break;
            case 'ì': output += 'à'; break;
            case 'ã': output += 'î'; break;
            case 'î': output += 'ã'; break;
            case 'é': output += 'ó'; break;
            case 'ó': output += 'é'; break;
            case 'è': output += 'ò'; break;
            case 'ò': output += 'è'; break;
            case 'ê': output += 'ô'; break;
            case 'ô': output += 'ê'; break;
            default: output += char;
        }
    }

    document.getElementById('outputText').value = output;
}
