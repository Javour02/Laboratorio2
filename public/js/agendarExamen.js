function changeTipo(){
    let json = {};
    var tipo = document.getElementById("tipo").value;
    if(tipo === ""){
    }else{
        json.tipo = tipo;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('respuesta-Tipo').innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "/mostrarInfoTipo");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
    }  
}

function agendarExamen(){
    let nombreTipo = document.getElementById("tipo").value;
    let fecha = document.getElementById("fecha-cita").value;
    console.log(fecha);
    if(nombreTipo === "" || fecha === ""){
     alert('Debe escoger un tipo de examen y fecha en la que lo tomara!');
    }else{
     let json = {}
     json.tipo = nombreTipo;
     json.fecha = fecha;
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert('Examen agendado correctamente');
         }
     };
     xhttp.open("POST", "/agendar");
     xhttp.setRequestHeader("Content-Type", "application/json");
     xhttp.send(JSON.stringify(json));
    }
 }