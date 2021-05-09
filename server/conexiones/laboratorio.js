var cedulaLab = '';

exports.ingreso = (con,req,res)=>{
    let query = `SELECT count(*) as cuenta from personal where nombreCompleto = '${req.body.nombre}' AND cedula = '${req.body.cedula}' AND tipo = ${req.body.numero}`;
    con.query(query, (err, result)=>{
        console.log(JSON.stringify(result));
        if(result[0].cuenta == 0){
            res.send('fail');
        }else{
            cedulaLab = req.body.cedula;
            res.send('success');
        }
    });
}

exports.examenesVacios = (con, res)=>{
    let query = `SELECT p.nombres as nombrePaciente, t.nombre as nombreTipo from examen e
    JOIN pacientes p USING(idPaciente)
    JOIN tipo t USING(idTipo)
    WHERE json_resultados IS NULL`;
    con.query(query, (err, result)=>{
        if (err) throw err;
        var resultado = '<table><tr>'
        JSON.parse(JSON.stringify(result[0]),(k,v)=>{
            if(k !== ''){
                resultado += `<th>${k}</th>`;
            }
        });
        resultado += `<th>Ingresar Resultado</th></tr>`;
        for(index in result){
            resultado+='<tr>'
            JSON.parse(JSON.stringify(result[index]), (k,v)=>{
                if(k !== ""){
                    resultado+=`<td  class="table-data">${v}</td>`;
                }
            });
            resultado+='<td><button class="btn btn-primary">EDITAR</button></td></tr>'
        }
        resultado += '</table>'
        res.send(resultado);
    });
}

exports.examenesFechaLab = (con, req, res)=>{
    let query = `SELECT idPersonal from personal where cedula = '${cedulaLab}'`;
    con.query(query, (err, result)=>{
        console.log(result[0].idPersonal);
        let query2 = `SELECT CONCAT(p.nombres,' ', p.apellidos) as nombrePaciente, e.fecha_final, e.json_resultados from examen e
        JOIN pacientes p USING(idPaciente)
         where fecha_final = '${req.body.fecha}' AND idPersonal = ${result[0].idPersonal}`;
        con.query(query2, (err, result)=>{
            let respuesta = '';
            console.log( JSON.stringify(result));
            let json = JSON.stringify(result).replace(/\\/g, '');
            let json2 = json.replace(/"{/g, '{');
            let json3 = JSON.parse(json2.replace(/}"/g, '}'));
            console.log(json3);
            for(index in json3){
                respuesta += '<table class="tabla"><tr>';
                JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                    console.log(k);
                    if(k !== "" && k !== 'json_resultados'){
                        respuesta+=`<th class="table-header">${k}</th>`;
                    }
                });
                respuesta+='</tr><tr>';
                JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                    if(k !== "" && k !== 'json_resultados'){
                        respuesta+=`<td  class="table-data">${v}</td>`;
                    }
                });
                respuesta+='</tr></table>';
            }
            res.send(respuesta);
        });
    });
}

exports.filtrarCedula = (con,req,res)=>{
    let query = `SELECT e.fecha_inicio as fechaInicial, e.fecha_final as fechaFinal, t.nombre as nombreExamen,  e.json_resultados as resultados  from examen e 
    JOIN pacientes p USING(idPaciente)
    JOIN tipo t USING(idTipo)
    WHERE p.cedula = '${req.body.cedula}'`;
    con.query(query, (err, result)=>{
        var respuesta = '';
        let json = JSON.stringify(result).replace(/\\/g, '');
        let json2 = json.replace(/"{/g, '{');
        console.log(result);
        let json3 = JSON.parse(json2.replace(/}"/g, '}'));
        console.log(json3);
        console.log(json[111]);
        for(index in json3){
            respuesta += '<table class="tabla"><tr>';
            JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                console.log(k);
                if(k !== "" && k !== 'resultados'){
                    
                    respuesta+=`<th class="table-header">${k}</th>`;
                }
            });
            respuesta+='</tr><tr>';
            JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                if(k !== "" && k !== 'resultados'){
                    respuesta+=`<td  class="table-data">${v}</td>`;
                }
            });
            respuesta+='</tr></table>';
        }
        res.send(respuesta);
    })
}

exports.filtrarTipo = (con,req,res)=>{
    let query = `SELECT CONCAT(p.nombres, ' ', p.apellidos) as nombreCompleto, e.fecha_inicio as fechaInicial, e.fecha_final as fechaFinal, t.nombre as nombreExamen,  e.json_resultados as resultados  from examen e 
    JOIN pacientes p USING(idPaciente)
    JOIN tipo t USING(idTipo)
    WHERE t.nombre = '${req.body.tipo}'`;
    con.query(query, (err, result)=>{
        var respuesta = '';
        let json = JSON.stringify(result).replace(/\\/g, '');
        let json2 = json.replace(/"{/g, '{');
        console.log(result);
        let json3 = JSON.parse(json2.replace(/}"/g, '}'));
        console.log(json3);
        console.log(json[111]);
        for(index in json3){
            respuesta += '<table class="tabla"><tr>';
            JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                console.log(k);
                if(k !== "" && k !== 'resultados'){
                    
                    respuesta+=`<th class="table-header">${k}</th>`;
                }
            });
            respuesta+='</tr><tr>';
            JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                if(k !== "" && k !== 'resultados'){
                    respuesta+=`<td  class="table-data">${v}</td>`;
                }
            });
            respuesta+='</tr></table>';
        }
        res.send(respuesta);
    })
}