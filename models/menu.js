const { Schema, model } = require('mongoose');

const menu = new Schema({
    categoria: {type: String, required: true},
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    disponible: {type: Boolean, required: true}
});

module.exports = model('menu', menu);