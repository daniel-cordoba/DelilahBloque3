const { Schema, model } = require('mongoose');

const pedidos = new Schema({
    usuario: {type: String, required: true},
    idProductos: {type: String, required: true},
    metodoPago: {type: String, required: true},
    direccion: {type: String, required: true},
    estado: {type: String, required: true}
});

module.exports = model('pedidos', pedidos);