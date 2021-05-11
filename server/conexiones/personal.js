var cedulaPaciente = '';


exports.ingreso = (con,req,res)=>{
    let query = `SELECT count(*) as cuenta from personal where cedula = '${req.body.cedula}' AND tipo = ${req.body.numero}`;
    con.query(query, (err, result)=>{
        console.log(JSON.stringify(result[0]));
        if(result[0].cuenta == 0){
            res.send('fail');
        }else{
            res.send('success');
        }
    });
}

exports.recepcion = (con,res)=>{
    let query = `SELECT CONCAT(p.nombres,' ',p.apellidos) as nombrePaciente, t.nombre, CONCAT(Year(e.fecha_cita),'-', Month(e.fecha_cita),'-', Day(e.fecha_cita)) as fecha from examen e
    JOIN tipo t USING(idTipo)
    JOIN pacientes p USING(idPaciente)
    ORDER BY fecha_cita`;
    con.query(query, (err, result)=>{
        let resultado = '';
        console.log(JSON.stringify(result));
        resultado+='<table class="tabla"><tr>'
        JSON.parse(JSON.stringify(result[0]),(k,v)=>{
            if(k !== '' && k!== 'idExamen'){
                resultado += `<th class="table-header">${k}</th>`;
            }
        });
        resultado += `<th class="table-header">Asistencia</th></tr>`;
        for(index in result){
            resultado+='<tr>'
            JSON.parse(JSON.stringify(result[index]), (k,v)=>{
                if(k !== "" && k!== 'idExamen'){
                    resultado+=`<td id='dato${index}' class="table-data">${v}</td>`;
                }
            });
            resultado+= `<td class="table-data"><input type="checkbox"></td></tr>`;
        }
        resultado += '</table>'
        res.send(resultado);
    });
}

exports.administrador = (con, res)=>{
    let queryHoy = `SELECT COUNT(*) as cuentaHoy from examen
    where fecha_final = CURDATE()`;
    let queryHistoria = `SELECT COUNT(*) cuentaHistoria from examen WHERE fecha_final IS NOT NULL`;
    let queryDiaHoy = `SELECT COUNT(DISTINCT idPaciente) as pacientesAtendidosHoy 
    from examen e
    WHERE fecha_final = CURDATE() AND json_resultados IS NOT NULL`;
    let queryDiaGeneral = `SELECT COUNT(DISTINCT idPaciente) as pacientesAtendidos 
    from examen e WHERE json_resultados IS NOT NULL`;
    let query = `SELECT SUM(t.costo) as ganadoHoy from tipo t
    JOIN examen e USING(idTipo)
    WHERE fecha_inicio = CURDATE()`;
    let queryTotal = `SELECT SUM(t.costo) as ganadoHistoria from tipo t
    JOIN examen e USING(idTipo)`;
    respuesta = '';
    con.query(queryHoy, (err, result)=>{
        if(err) throw err;
        respuesta+=`${result[0].cuentaHoy},`
    })
    con.query(queryHistoria, (err, result)=>{
        if(err) throw err;
        respuesta+=`${result[0].cuentaHistoria},`
    })
    con.query(queryDiaHoy, (err, result)=>{
        if(err) throw err;  
        respuesta+=`${result[0].pacientesAtendidosHoy},`
    })
    con.query(queryDiaGeneral, (err, result)=>{
        if(err) throw err;
        respuesta+=`${result[0].pacientesAtendidos},`
    })
    con.query(query, (err, result)=>{
        if(err) throw err;
        respuesta+=`${result[0].ganadoHoy},`
    })
    con.query(queryTotal, (err, result)=>{
        if(err) throw err;
        respuesta+=`${result[0].ganadoHistoria},`
        console.log(respuesta);
        res.send(respuesta);
    })
}

exports.buscarCedulaAdmin = (con,req,res)=>{
    let query = `SELECT COUNT(*) as cuentaCedula from pacientes 
    JOIN examen USING(idPaciente)
    where cedula = '${req.body.cedula}'`;
    con.query(query, (err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result[0].cuentaCedula));
    });
}

exports.filtrarTipoAdmin = (con, req, res)=>{
    let query = `SELECT COUNT(*) cuentaCedula from examen e
    JOIN tipo t USING(idTipo)
    where t.nombre ='${req.body.tipo}'`;
    con.query(query, (err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result[0].cuentaCedula));
    });
}

exports.verDetallesExamen = (con, req, res)=>{
    let query = `SELECT descripcion, recomendaciones, costo, tiempo_aprox from tipo where nombre = '${req.body.tipo}'`;
    con.query(query, (err, result)=>{
        if(err) throw err;
        let resultado = '<table class="tabla"><tr>'
        JSON.parse(JSON.stringify(result[0]), function(k, v){
            if(k!==""){
                resultado+=`<th class="table-header">${k}</th>`;
            }
        });
        resultado+="</tr><tr>"
        JSON.parse(JSON.stringify(result[0]), function(k, v){
            if(k!==""){
                resultado+=`<td class="table-data">${v}</td>`;
            }
        });
        resultado+="</tr></table>";
        res.send(resultado);
    });
}

exports.agendarExamen = (con, req, res)=>{
    let queryIdTipo = `SELECT idTipo from tipo where nombre = '${req.body.tipo}'`;
    let queryIdPaciente = `SELECT idPaciente from pacientes where cedula = '${cedulaPaciente}'`;
    con.query(queryIdTipo, (err, result)=>{
        if(err) throw err;
        let idTipo = result[0].idTipo;
        con.query(queryIdPaciente, (err, result)=>{
            if(err) throw err;
            let idPaciente = result[0].idPaciente;
            let queryAgendar = `INSERT INTO examen (fecha_inicio, fecha_cita, idPaciente, idTipo) VALUES (CURDATE(),'${req.body.fecha}', ${idPaciente}, ${idTipo})`;
            con.query(queryAgendar, (err, result)=>{
                if (err) throw err;
                res.send('success');
            });
        });
    });
}

exports.pedirCedula = (con, req, res)=>{
    cedulaPaciente = req.body.cedula;
    let query = `SELECT nombres, apellidos, correo, eps, cedula from pacientes where cedula = '${cedulaPaciente}' `;
    con.query(query, (err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result[0]));
    });
}

exports.crearPaciente = (con, req, res)=>{
    var info = req.body;
    let process = `INSERT INTO pacientes (nombres, apellidos, cedula, correo, eps, clave) VALUES ('${info.nombre}','${info.apellido}','${info.cedula}','${info.correo}','${info.eps}','${info.clave}')`;
    con.query(process, (err, result) => {
        if (err) throw err;
        cedulaPaciente = info.cedula;
        res.send('success');
    })
}

exports.actualizarPaciente = (con,req,res)=>{
    let info = req.body;
    con.query(`UPDATE pacientes set nombres = '${info.nombre}', apellidos = '${info.apellido}', correo = '${info.correo}', eps = '${info.eps}', cedula = '${info.cedula}' where cedula = '${cedulaPaciente}'`,
    (err,result)=>{
        if(err) throw err;
        res.send('success');
    });
}
