const express = require('express');
const app = express();
const sequelize =require('./src/conexion.js');
const jwt = require('jsonwebtoken');
const middleware = require('./src/middleware');

app.use(express.json());
const validacion = new middleware;

//ENDPOINT REGISTRO Y LOGIN
app.post('/registro', (req, res)=>{
    console.log(req.body);
    const {usuario, nombre_apellido, email, telefono, contrasenia}=req.body;
    const inserto = 'INSERT INTO Usuarios (usuario, nombre_apellido, email, telefono, contrasenia) VALUES (?, ?, ?, ?, ?);';
    sequelize.query(inserto, 
        {
            replacements:[usuario, nombre_apellido, email, telefono, contrasenia],
            type: sequelize.QueryTypes.INSERT
        }).then(resp => {
            console.log(resp);
            res.status(200).json('Nuevo usuario registrado con éxito');
        }).catch(err=>console.log(err));
});

app.post('/login', (req, res)=>{
    console.log(req.body);
    const {usuario, contrasenia} = req.body;
    const consulta = 'SELECT usuario, admin FROM usuarios WHERE usuario = ? AND contrasenia = ?';
    sequelize.query(consulta, 
    {
        replacements:[usuario, contrasenia],
        type: sequelize.QueryTypes.SELECT
    }).then(resp => {
        console.log(resp);
        const payload = {
            user: resp[0].usuario,
            rol: resp[0].admin
        };
        const token = jwt.sign(payload, process.env.S);
        res.status(200).json(token);
        //GUARDANDO EL TOKEN
        const insertToken = 'INSERT INTO Tokens (token) VALUES ("' + token + '");';
        sequelize.query(insertToken, {type: sequelize.QueryTypes.INSERT})
            .then(()=>console.log('Token almacenado con exito'))
            .catch(err=>console.error(err));

    }).catch(err=>{
        console.error(err);
        res.status(404).json('Recurso no encontrado');
    }); 
});

//ENDPOINT PRODUCTOS
app.get('/productos', validacion.validarToken, (req, res)=>{
    console.log('GET productos');
    const productos = 'SELECT * FROM Menu';
    sequelize.query(productos)
    .then(resp=>{
        res.status(200).json(resp);
    }).catch(err=>console.error(err));
    //res.status(200).json('yay');
});

app.post('/productos', validacion.validarToken, validacion.validarAdmin, (req, res)=>{
    console.log('POST productos');
    console.log(req.body);
    const {accion_ID, categoria, producto, precio, descripcion, disponible}=req.body;
    if (accion_ID === 0) {
        console.log('AGREGAR');
        const productoAdd = 'INSERT INTO menu (categoria, producto, precio, descripcion, disponible) VALUES(?, ?, ?, ?, ?);';
    sequelize.query(productoAdd, 
        {
            replacements:[categoria, producto, precio, descripcion, disponible],
            type: sequelize.QueryTypes.INSERT
        }).then(resp=>{
            console.log(resp);
            res.status(200).json('Producto agregado con exito.');
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Ha ingresado mal alguna variable, la solicitud no se pudo procesar.');
        });
    } else if (accion_ID > 0){
        console.log('EDITAR');
        const productoEd = 'UPDATE menu SET categoria = ?, producto = ?, precio = ?, descripcion = ?, disponible = ? WHERE ID = '+accion_ID+';';
        sequelize.query(productoEd,
            { 
                replacements:[categoria, producto, precio, descripcion, disponible], 
                type: sequelize.QueryTypes.UPDATE
            }).then(resp=>{
                console.log(resp);
                res.status(200).json('Producto editado con éxito.');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Ha ingresado mal alguna variable, la solicitud no se pudo procesar.');
            });        
    }else{
        console.error('A ingresado el parámetro "accion_ID" mal');
        res.status(400).json('A ingresado el parámetro "accion_ID" mal, la solicitud no se pudo procesar.');
    }    
});




app.listen(3000,()=>{
    console.log('servidor corriendo en el puerto 3000');
});