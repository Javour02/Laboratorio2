function filtrar(){
    let json = {};
    json.tipo = document.getElementById('tipo').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('resultados').innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "/filtrarTipo");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}