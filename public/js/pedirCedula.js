

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let json = {};
    json.nombre = document.getElementById('Nombre').value;
    json.apellido = document.getElementById('Apellidos').value; 
    json.correo = document.getElementById('Correo').value; 
    json.eps = document.getElementById('EPS').value;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Usuario actualizado correctamente');
        }
    };
    xhttp.open("POST", "/update");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
});