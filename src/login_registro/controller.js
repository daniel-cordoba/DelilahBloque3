const express = require('express');
const app = express();
const sequelize =require('../conexion.js');

app.use(express.json());

/* app.get('/estudiantes',(req, res)=>{
    console.log(req.query);
    let consulta= req.query.nombre?'SELECT * FROM estudiantes WHERE Nombre = ?':'SELECT * FROM estudiantes';
    sequelize.query(consulta, 
    {
        replacements:[req.query.nombre],
        type: sequelize.QueryTypes.SELECT
    }).then(resul=>{
        console.log("respuesta de BD");
        
        res.status(200).json(resul);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}); */

