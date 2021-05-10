window.onload = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var string = this.responseText.split(',');
            document.getElementById('nombreTitulo').innerHTML = string[0];
            switch(string[1]){
                case 'Hemograma':
                    document.getElementById('div-Hemograma').style.display = 'flex';
                    break;
                case 'Perfil lipidico':
                    console.log('este');
                    document.getElementById('div-perfilLipidico').style.display = "flex";
                    break;
                case 'Perfil hepatico':
                    document.getElementById('div-PerfilHepatico').style.display = 'flex';
                    break;
                case 'Perfil tiroideo':
                    document.getElementById('div-PerfilTrioide').style.display = 'flex';
                    break;
            }
        }
    };
    xhttp.open("POST", "/pasarPantalla");
    xhttp.send();
}

function hemograma(){
    let json = {};
    json.hemoglobina = document.getElementById('hemoglobinaResultado-1').value;
    json.hematocrito = document.getElementById('hemoglobinaResultado-2').value;
    json.globulosBlancos = document.getElementById('hemoglobinaResultado-3').value;
    json.plaquetas = document.getElementById('hemoglobinaResultado-4').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Resultado Ingresado Correctamente :)');
        }
    };
    xhttp.open("POST", "/agregarResultado");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}

function perfilLipidico(){
    let json = {};
    json.colesterol = document.getElementById('perfilLipidicoresultado-1').value;
    json.LDL = document.getElementById('perfilLipidicoresultado-2').value;
    json.HDL = document.getElementById('perfilLipidicoresultado-3').value;
    json.Triglicerido = document.getElementById('perfilLipidicoresultado-4').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Resultado Ingresado Correctamente :)');
        }
    };
    xhttp.open("POST", "/agregarResultado");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}

function perfilHepatico(){
    let json = {};
    json.bilirubinaTotal = document.getElementById('PerfilHepaticoresultado-1').value;
    json.bilirubinaDirecta = document.getElementById('PerfilHepaticoresultado-2').value;
    json.AST = document.getElementById('PerfilHepaticoresultado-3').value;
    json.LDH = document.getElementById('PerfilHepaticoresultado-4').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Resultado Ingresado Correctamente :)');
        }
    };
    xhttp.open("POST", "/agregarResultado");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}

function PerfilTiroideo(){
    let json = {};
    json.TSH = document.getElementById('PerfilTrioideresultado-2').value;
    json.T3 = document.getElementById('PerfilTrioideresultado-3').value;
    json.T4 = document.getElementById('PerfilTrioideresultado-4').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Resultado Ingresado Correctamente :)');
        }
    };
    xhttp.open("POST", "/agregarResultado");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
}