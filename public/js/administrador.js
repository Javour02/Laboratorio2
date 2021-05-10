window.onload = function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            string = this.responseText.split(',');
            document.getElementById('examenes-dia').value = string[0];
            document.getElementById('examenes-historia').value = string[1];
            document.getElementById('clientes-dia').value = string[2];
            document.getElementById('clientes-historia').value = string[3];
            document.getElementById('ingresos-hoy').value = string[4];
            document.getElementById('ingresos-totales').value = string[5];
        }
    };
    xhttp.open("POST", "/administrador");
    xhttp.send();
}

function buscarPorCedula(){
    let json = {};
    cedula = document.getElementById('cedula').value;
    if(cedula === ""){
        alert('Escoja una fecha!!!!!!');
    }else{
        json.cedula = cedula;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                document.getElementById('examenes-pacientes').value = this.responseText;
            }
        };
        xhttp.open("POST", "/buscarCedulaAdmin");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(json));
    }
}

function buscarPorTipo(){
    let json = {};
    json.tipo = document.getElementById('tipo').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('ingresos-tipo').value = this.responseText;
        }
    };
    xhttp.open("POST", "/filtrarTipoAdmin");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}