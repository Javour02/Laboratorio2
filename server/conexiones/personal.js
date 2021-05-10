const { json } = require("express");

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
        resultado+='<table><tr>'
        JSON.parse(JSON.stringify(result[0]),(k,v)=>{
            if(k !== '' && k!== 'idExamen'){
                resultado += `<th>${k}</th>`;
            }
        });
        resultado += `<th>Asistencia</th></tr>`;
        for(index in result){
            resultado+='<tr>'
            JSON.parse(JSON.stringify(result[index]), (k,v)=>{
                if(k !== "" && k!== 'idExamen'){
                    resultado+=`<td id='dato${index}' class="table-data">${v}</td>`;
                }
            });
            resultado+= `<td><input type="checkbox"></td></tr>`;
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