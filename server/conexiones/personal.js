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