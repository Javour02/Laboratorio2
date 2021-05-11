var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var laboratorio = require('./conexiones/laboratorio');
var personal = require('./conexiones/personal');
var mysql = require('mysql');
var app = express();
var nombreEditar = '';
var nombreTipo = '';
var idExamen = '';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SolyLuna0802",
    database: "laboratorio"
});

app.set('port', process.env.PORT || 5700);

app.post('/verificarIngresoPersonal',(req,res)=>{
    personal.ingreso(con, req, res);
});

app.post('/verificarIngresoLaboratorio', (req,res)=>{
    laboratorio.ingreso(con, req, res);
});

app.post('/obtenerExamenesVacios', (req, res)=>{
    laboratorio.examenesVacios(con, res);
});

app.post('/buscarExamenFecha', (req,res)=>{
    laboratorio.examenesFechaLab(con, req, res);
});

app.post('/filtrarCedula', (req,res)=>{
    laboratorio.filtrarCedula(con, req, res);
});

app.post('/filtrarTipo', (req,res)=>{
    laboratorio.filtrarTipo(con, req, res);
});

app.post('/pasarPantalla', (req,res)=>{
    info = req.body;
    if(info.agregar===1){
        nombreEditar = info.nombre;
        nombreTipo = info.tipo;
        idExamen = info.id;
        res.end();
    }else{
        res.send(`${nombreEditar},${nombreTipo}`);
    }
});

app.post('/agregarResultado', (req,res)=>{
    req.examen = idExamen;
    laboratorio.agregarResultado(con,req,res);
});

app.post('/recepcion', (req,res)=>{
    personal.recepcion(con,res);
});

app.post('/administrador', (req, res)=>{
    personal.administrador(con,res);
});

app.post('/buscarCedulaAdmin', (req,res)=>{
    personal.buscarCedulaAdmin(con, req, res);
})

app.post('/filtrarTipoAdmin', (req, res)=>{
    personal.filtrarTipoAdmin(con,req,res);
});


app.post('/mostrarInfoTipo', (req,res)=>{
    personal.verDetallesExamen(con, req, res);
});

app.post('/agendar', (req, res)=>{
    personal.agendarExamen(con, req, res);
});

app.listen(app.get('port'), ()=>{
    console.log(`server listening to port ${app.get('port')}`);
});