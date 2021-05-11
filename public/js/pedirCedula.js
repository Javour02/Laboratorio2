
var elementosUsuario = {};

window.onload = function() {
    document.getElementById('div-paciente-registrado').style.display = 'none';
    document.getElementById('formulario-con-todo').style.display = 'none';

}

function pedirCedula(){
    let json = {};
    var cedula = document.getElementById('cedula-consultar-paciente').value;
    if(cedula === ''){  
        alert('Tiene que ingresar una cedula');
    }else{
        json.cedula = cedula;  
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                if(this.responseText===''){
                    console.log(this.responseText);
                    document.getElementById('Nombre').value = "";
                    document.getElementById('Apellidos').value = "";
                    document.getElementById('Correo').value = "";
                    document.getElementById('EPS').value = "";
                    document.getElementById('clave').style.display = 'block';
                    document.getElementById('div-paciente-registrado').style.display = 'none';
                    document.getElementById('formulario-con-todo').style.display = 'flex';
                    document.getElementById('cc').value = cedula;
                    document.getElementById('enviarFormularioCreacion').disabled = false;
                    document.getElementById('enviarFormularioActualizacion').style.display = 'none';
                    document.getElementById('enviarFormularioCreacion').style.display = 'flex';
                    document.getElementById('agendarExamenCreacion2').style.display = 'flex';
                    document.getElementById('agendarExamenCreacion2').disabled = true;
                }else{
                    document.getElementById('enviarFormularioActualizacion').style.display = 'flex';
                    document.getElementById('agendarExamenCreacion1').disabled = false;
                    document.getElementById('formulario-con-todo').style.display = 'none';
                    document.getElementById('div-paciente-registrado').style.display = 'flex';
                    elementosUsuario = JSON.parse(this.responseText);
                }
            }
        };
        xhttp.open("POST", "/pedirCedula");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(json));
    }
}

var formularioCreacion = document.getElementById('form-register');

formularioCreacion.addEventListener('submit', function(e){
    e.preventDefault();
    let json = {};
    json.nombre = document.getElementById('Nombre').value;
    json.apellido =document.getElementById('Apellidos').value;
    json.correo =document.getElementById('Correo').value;
    json.eps = document.getElementById('EPS').value;
    json.cedula = document.getElementById('cc').value;
    json.clave =document.getElementById('clave').value;
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert('Paciente Registrado');
                document.getElementById('enviarFormularioCreacion').disabled = true;
                document.getElementById('agendarExamenCreacion2').disabled = false;
            }
        };
    xhttp.open("POST", "/crearPaciente");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
});

function activarEdicionDeDatos(){
    document.getElementById('enviarFormularioActualizacion').disabled = false;
    document.getElementById('formulario-con-todo').style.display = 'flex';
    document.getElementById('Nombre').value = elementosUsuario.nombres;
    document.getElementById('Apellidos').value = elementosUsuario.apellidos;
    document.getElementById('Correo').value = elementosUsuario.correo;
    document.getElementById('EPS').value = elementosUsuario.eps;
    document.getElementById('cc').value = elementosUsuario.cedula;
    document.getElementById('clave').style.display = 'none';
    document.getElementById('enviarFormularioCreacion').style.display = 'none';
    document.getElementById('agendarExamenCreacion1').disabled = true;
    document.getElementById('agendarExamenCreacion2').style.display = 'none';
}

function cambiarPestaña(){
    window.location.assign('/Recepcion-agendar.html');
}
function actualizarPaciente(){
    let json = {};
    json.nombre = document.getElementById('Nombre').value;
    json.apellido =document.getElementById('Apellidos').value;
    json.correo =document.getElementById('Correo').value;
    json.eps = document.getElementById('EPS').value;
    json.cedula = document.getElementById('cc').value;
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert('Paciente Actualizado');
                document.getElementById('agendarExamenCreacion1').disabled = false;
                document.getElementById('enviarFormularioActualizacion').disabled = true;
                
            }
        };
    xhttp.open("POST", "/actualizarPaciente");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}
