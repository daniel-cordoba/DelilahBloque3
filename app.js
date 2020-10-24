const express = require('express');
const app = express();
const sequelize =require('./src/conexion.js');
const jwt = require('jsonwebtoken');

app.use(express.json());

//LOGIN-REGISTRO
app.post('/registro', (req, res)=>{
    console.log(req.body);
    const {usuario, nombre_apellido, email, telefono, contrasenia}=req.body;
    let inserto = 'INSERT INTO Usuarios (usuario, nombre_apellido, email, telefono, contrasenia) VALUES (?, ?, ?, ?, ?);';
    sequelize.query(inserto, 
        {
            replacements:[usuario, nombre_apellido, email, telefono, contrasenia],
            type: sequelize.QueryTypes.INSERT
        }).then(resp => {
            console.log(resp);
            res.status(200).json(resp);
        });




    //LOGIN
    /* let consulta= 'SELECT usuario FROM usuarios WHERE ID = ? AND contrasenia = ?';
    sequelize.query(consulta, 
    {
        replacements:[usuario, contrasenia],
        type: sequelize.QueryTypes.SELECT
    }).then(resp => {
        console.log(resp);
        const payload = {user: resp[0].usuario};
        const token = jwt.sign(payload, process.env.S);
        res.status(200).json(token);

    }).catch(err=>console.error(err)); */
    
        

    
    /* sel.login(user, pass, sequelize).then(resp=>{
        const payload = {user: resp[0].usuario};
        const token = jwt.sign(payload, process.env.S);
        res.status(200).json(token);
    }).catch(err=>{
        res.status(500).json(err);
    }) */
});

app.listen(3000,()=>{
    console.log('servidor corriendo en el puerto 3000');
});