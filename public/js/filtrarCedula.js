function filtrar(){
    let json = {};
    let cedula = document.getElementById('cedula-consultar-paciente').value;
    console.log('llegue');
    if(cedula === ''){
        alert('Ingrese Cedula!!');
    }else{
        json.cedula = cedula;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('resultados').innerHTML = this.responseText;
            }
        };
        xhttp.open("POST", "/filtrarCedula");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(json));
    }
}