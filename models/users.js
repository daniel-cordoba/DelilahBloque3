const { Schema, model } = require('mongoose');

const users = new Schema({
    usuario: {type: String, required: true},
    nombre_apellido: {type: String, required: true},
    email: {type: String, required: true},
    telefono: {type: String, required: true},
    contrasenia: {type: String, required: true},
    admin: {type: Boolean}
});

module.exports = model('users', users);