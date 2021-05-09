exports.ingreso = (con,req,res)=>{
    let query = `SELECT count(*) as cuenta from personal where nombreCompleto = '${req.body.nombre}' AND cedula = '${req.body.cedula}' AND tipo = ${req.body.numero}`;
    con.query(query, (err, result)=>{
        console.log(JSON.stringify(result));
        if(result[0].cuenta == 0){
            res.send('fail');
        }else{
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