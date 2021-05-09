var recepcion = document.getElementById('botonRecepcion');
var admin = document.getElementById('botonAdmin');

function loginRec(){
    let json = {};
    json.cedula = document.getElementById('cedulaRec').value;
    json.numero = 1;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === 'success'){
                window.location.assign('./RecepcionInicio.html');
            }else{
                alert('credencial incorrecta');
            }
        }
    };
    xhttp.open("POST", "/verificarIngresoPersonal");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}

function loginAdmin(){
    let json = {};
    json.cedula = document.getElementById('cedulaAdministrador').value;
    json.numero = 2;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === 'success'){
                window.location.assign('./AdministrativoInicio.html');
            }else{
                alert('credencial incorrecta');
            }
        }
    };
    xhttp.open("POST", "/verificarIngresoPersonal");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}