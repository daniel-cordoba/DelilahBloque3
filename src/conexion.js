const Sequelize = require('sequelize');
require('dotenv').config();

const seq = new Sequelize('delilah', process.env.U, process.env.P,
{
    dialect:'mysql',
    host: process.env.H,
    port: process.env.PORT
});

seq.authenticate()
.then(()=>console.log('Conectado a la base de datos.'))
.catch(err=>console.error(err));

module.exports = seq;