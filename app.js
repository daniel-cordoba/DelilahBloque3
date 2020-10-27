const express = require('express');
const app = express();
const sequelize =require('./src/conexion.js');
const jwt = require('jsonwebtoken');
const middleware = require('./src/middleware');

app.use(express.json());
const validacion = new middleware;

//ENDPOINT REGISTRO Y LOGIN
app.post('/registro', (req, res)=>{
    const {usuario, nombre_apellido, email, telefono, contrasenia} = req.body;
    const usuario_existe = 'SELECT usuario FROM usuarios WHERE usuario = ? OR email = ?;';
    sequelize.query(usuario_existe, 
        {
            replacements: [usuario, email],
            type: sequelize.QueryTypes.SELECT
        }).then(resp=>{           
            if(resp[0] === undefined){
                const inserto = 'INSERT INTO Usuarios (usuario, nombre_apellido, email, telefono, contrasenia) VALUES (?, ?, ?, ?, ?);';
                sequelize.query(inserto, 
                {
                    replacements:[usuario, nombre_apellido, email, telefono, contrasenia],
                    type: sequelize.QueryTypes.INSERT
                }).then(resp => {
                    console.log(resp);
                    res.status(200).json('Nuevo usuario registrado con éxito');
                }).catch(err=>{
                    console.log(err);
                    res.status(400).json('La solicitud contiene sintaxis errónea');
                });   
            }else{
                res.status(400).json('El usuario o email, ya están en uso');
            }
            
        }).catch(err=>{            
            console.error(err);
            res.status(400).json('La solicitud contiene sintaxis errónea');                
        });
    
});

app.post('/login', (req, res)=>{    
    const {usuario_mail, contrasenia} = req.body;
    const consulta = 'SELECT usuario, admin FROM usuarios WHERE (usuario = ? OR email = ?) AND contrasenia = ?;';
    sequelize.query(consulta, 
    {
        replacements:[usuario_mail, usuario_mail, contrasenia],
        type: sequelize.QueryTypes.SELECT
    }).then(resp => {
        console.log(resp);
        const payload = {
            user: resp[0].usuario,
            rol: resp[0].admin
        };
        const token = jwt.sign(payload, process.env.S);
        res.status(200).json('Login realizado con éxito, su token es el siguiente: ' + token);
    }).catch(err=>{
        console.error(err);
        res.status(404).json('Recurso no encontrado, usuario o contraseña incorrectas');
    }); 
});

//ENDPOINT PRODUCTOS
app.get('/productos', validacion.validarToken, (req, res)=>{
    console.log('GET productos');
    const productos = 'SELECT * FROM Menu';
    sequelize.query(productos)
    .then(resp=>{
        res.status(200).json(resp);
    }).catch(err=>{
        console.error(err);
        res.status(404).json('Recurso no encontrado');
    });
});

app.post('/productos', validacion.validarToken, validacion.validarAdmin, (req, res)=>{
    const {accion_ID, categoria, producto, precio, descripcion, disponible}=req.body;
    if (accion_ID === 0) {
        const productoAdd = 'INSERT INTO menu (categoria, producto, precio, descripcion, disponible) VALUES(?, ?, ?, ?, ?);';
    sequelize.query(productoAdd, 
        {
            replacements:[categoria, producto, precio, descripcion, disponible],
            type: sequelize.QueryTypes.INSERT
        }).then(resp=>{
            console.log(resp);
            res.status(200).json('Producto agregado con éxito');
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis o en la estructura');
        });
    } else if (accion_ID > 0){
        const productoEd = 'UPDATE menu SET categoria = ?, producto = ?, precio = ?, descripcion = ?, disponible = ? WHERE ID = '+accion_ID+';';
        sequelize.query(productoEd,
            { 
                replacements:[categoria, producto, precio, descripcion, disponible], 
                type: sequelize.QueryTypes.UPDATE
            }).then(resp=>{
                console.log(resp);
                res.status(200).json('Producto editado con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis o en la estructura');
            });        
    }else{
        console.error('A ingresado el parámetro "accion_ID" mal');
        res.status(400).json('A ingresado mal el parámetro "accion_ID", la solicitud no se pudo procesar');
    }    
});

app.delete('/productos/:ID', validacion.validarToken, validacion.validarAdmin, (req, res)=>{
    const ID = req.params;
    if(isNaN(ID.ID)){
        res.status(400).json('Error en la sintaxis o estructura de la petición');
    }else{
        sequelize.query('DELETE FROM menu WHERE ID = '+ID.ID+';')
        .then(resp=>{
            console.log(resp);
            if(resp[0].affectedRows === 0){
                res.status(404).json('El producto no fue encontrado'); 
            }else{
                res.status(200).json('Producto eliminado con éxito');
            }
            
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis o estructura de la petición');
        });
    }
});

//ENDPOINT PEDIDOS
app.get('/pedidos', validacion.validarToken, (req, res)=>{
    const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
    console.log(payload.rol);
    if (payload.rol === 1) {     
        const pedidos = 'SELECT * FROM pedidos;';
        sequelize.query(pedidos, {type: sequelize.QueryTypes.SELECT})
        .then(resp=>{
            console.log(resp);
            res.status(200).json(resp);
        }).catch(err=>{
            console.log(err);
            res.status(404).json('No se encuentra los pedidos');
        });   
    } else if(payload.rol === 0){
        const pedidos = 'SELECT * FROM pedidos WHERE usuario = "'+payload.user+'";';
        sequelize.query(pedidos, {type: sequelize.QueryTypes.SELECT})
        .then(resp=>{
            console.log(resp);
            res.status(200).json(resp);
        }).catch(err=>{
            console.log(err);
            res.status(404).json('No se encuentra los pedidos.');
        });   
    }

});

app.post('/pedidos', validacion.validarToken, (req, res)=>{
    const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
    const usuario = payload.user;
    const estado = "NUEVO";
    const {idProductos, metodoPago, direccion} = req.body;        
    const espacio = / /;
    if(espacio.test(idProductos)){
        return res.status(400).json('Pedido con datos inválidos, no se permiten espacios en la variable idProductos');
    }    
    const pedido = 'INSERT INTO pedidos (usuario, idProductos, metodoPago, direccion, estado) VALUES(?, ?, ?, ?, ?);'
    sequelize.query(pedido, 
        {
            replacements: [usuario, idProductos, metodoPago, direccion, estado],
            type: sequelize.QueryTypes.INSERT
        }).then(resp=>{
            console.log(resp);
            res.status(200).json('Pedido realizado exitosamente');
        }).catch(err=>{
            console.log(err);
            res.status(400).json('Pedido con datos inválidos');
        });
});

app.put('/pedidos', validacion.validarToken, validacion.validarAdmin, (req,res)=>{
    const {ID, estado} = req.body;
    if (estado === "nuevo" || estado === "confirmado" || estado === "preparando" || estado === "enviando" || estado === "entregado") {
        const estadoUpdate = 'UPDATE pedidos SET estado = "'+estado+'" WHERE ID = '+ID+';';
        sequelize.query(estadoUpdate, {type: sequelize.QueryTypes.UPDATE})
        .then(resp=>{
            console.log(resp);
            res.status(200).json('Pedido editado exitosamente');
        }).catch(err=>{
            console.log(err);
            res.status(400).json('Error en la sintaxis o estructura de la petición');
        });
    }else{
        res.status(400).json('Error en la sintaxis o estructura de la petición')
    }
        
});

app.listen(3000,()=>{
    console.log('servidor corriendo en el puerto 3000');
});