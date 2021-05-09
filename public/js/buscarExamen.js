function buscarEx(){
    let json = {};
    fecha = document.getElementById('buscar-examen-fecha').value;
    if(fecha === ""){
        alert('Escoja una fecha!!!!!!');
    }else{
        json.fecha = fecha;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('resultados').innerHTML = this.responseText;
            }
        };
        xhttp.open("POST", "/buscarExamenFecha");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(json));
    }
}