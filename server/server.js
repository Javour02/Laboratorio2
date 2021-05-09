var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var laboratorio = require('./conexiones/laboratorio');
var personal = require('./conexiones/personal');
var mysql = require('mysql');
var app = express();

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

app.listen(app.get('port'), ()=>{
    console.log(`server listening to port ${app.get('port')}`);
});