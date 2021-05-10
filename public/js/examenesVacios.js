window.onload = function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('respuestaExamenes').innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "/obtenerExamenesVacios");
    xhttp.send();
}

function ingresarResultado(index){
    console.log(index);
    let array = [];
    console.log(document.getElementById(`${index}`).value);
    for(var value of document.querySelectorAll(`[id=dato${index}]`).values()) {
        array.push(value.innerHTML);
    }
    let json = {}
    json.nombre = array[0];
    json.tipo = array[1];
    json.id = document.getElementById(`${index}`).value;
    json.agregar = 1;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.assign('./Editar-examen.html');
        }
    };
    xhttp.open("POST", "/pasarPantalla");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}