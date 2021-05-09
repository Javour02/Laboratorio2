var formLab = document.getElementById('formLab');

formLab.addEventListener('submit', (e)=>{
    let json = {};
    json.nombre = document.getElementById('Nombre').value;
    json.cedula = document.getElementById('cedula').value;
    json.numero = 3;
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === 'success'){
                window.location.assign('./LabInicio.html');
            }else{
                alert('credencial incorrecta');
            }
        }
    };
    xhttp.open("POST", "/verificarIngresoLaboratorio");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
})