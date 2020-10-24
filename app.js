const express = require('express');
const app = express();
const sequelize =require('./src/conexion.js');

app.use(express.json());

app.get('/',(req, res)=>{
    console.log('Holi');
});

app.listen(3000,()=>{
    console.log('servidor corriendo en el puerto 3000');
});