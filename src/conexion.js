const Sequelize = require('sequelize');
require('dotenv').config();

const seq = new Sequelize('acamica', process.env.U, process.env.P,
{
    dialect:'mariadb',
    host: '127.0.0.1'
});

seq.authenticate().then(()=>{
    console.log('Conectado a la BD');
}).catch(err=>{
    console.error(err);
});

module.exports = seq;