const mongoose = require('./conexion.js');
const express = require('express');
const app = express();

app.listen(3000, function () {
    console.log('listening on 3000')
});

const menu = require('./models/menu');
const users = require('./models/users');
const pedidos = require('./models/pedidos');

//CREACION DEL MENU 
function add(categoryF, nameF, priceF, descriptionF, availableF) {
    let producto = {
        categoria: categoryF, 
        nombre: nameF, 
        precio: priceF, 
        descripcion: descriptionF, 
        disponible: availableF 
    };
    let menuAdd = new menu(producto);
    menuAdd.save();
}
add("Bebidas Calientes", "Espresso", 2500, "Bebida caliente, preparada con 25ml de agua y café, en máquina espresso.", true);
add("Bebidas Calientes", "Americano", 2500, "Bebida caliente, preparada con 150ml de agua y café, en máquina espresso.", true);
add("Bebidas Calientes", "Macchiato", 2700, "Bebida caliente, preparada con 25ml de agua, café y leche, en máquina espresso.", true);
add("Bebidas Calientes", "Capuchino", 4500, "Bebida caliente, preparada con 25ml de agua, café y 150ml de leche cremada con capa de espuma densa, en máquina espresso.", true);
add("Bebidas Calientes", "Latte", 4500, "Bebida caliente, preparada con 25ml de agua, café y 150ml de leche cremada con capa de espuma delgada, en máquina espresso.", true);
add("Bebidas Calientes", "Mocca", 5000, "Bebida caliente, preparada con 25ml de agua, 15gr de cocoa, café y 150ml de leche cremada, en máquina espresso.", true);
add("Bebidas Calientes", "Milo", 5000, "Bebida caliente, preparada con leche y milo.", true);
add("Bebidas Calientes", "Tinto", 800, "Bebida caliente, tinto tradicional preparado en cafetera por método de goteo.", true);
add("Bebidas Calientes", "Tinto", 3500, "Bebida caliente, preparada con 20gr de frutas desidratadas y 150ml de agua.", true);
add("Bebidas Calientes", "Te Chai", 6000, "Bebida caliente, preparada con te chai y 150ml de leche cremada con lanceta.", true);
add("Reposteria", "Torta de chocolate", 5000, "Porción de torta de chocolate.", true);
add("Reposteria", "Torta de cereza", 4000, "Porción de torta de cereza.", true);
add("Reposteria", "Torta de café", 5000, "Porción de torta de café.", true);
add("Reposteria", "Dedito de queso", 1500, "Palito de queso envuelto en masa de pan.", true);
add("Reposteria", "Rollo de canela", 2500, "Rollo de canela con salsa en base a queso crema dulce.", true);
add("Reposteria", "Alfajor", 900, "Galleta dulce cubiera de coco y rellena de arequipe.", true);
add("Reposteria", "Pastel hojaldrado de arequipe", 3500, "Pastel hojaldrado con capa de azucar y relleno de arequipe.", true);
add("Reposteria", "Pastel hojaldrado hawaiano", 3500, "Pastel hojaldrado relleno con trozos de piña, jamón y queso.", true);
add("Reposteria", "Pastel hojaldrado hawaiano", 3500, "Pastel hojaldrado relleno de queso, albaca y champiñones.", true);
add("Reposteria", "Pastel hojaldrado de jamon y queso", 3500, "Pastel hojaldrado relleno de jamón y queso.", true);

//CREACION DEL USUARIOS
function addUser(usuarioF, nombre_apellidoF, emailF, telefonoF, direccionF, contraseniaF, adminF) {
    let user = {
        usuario: usuarioF,
        nombre_apellido: nombre_apellidoF,
        email: emailF,
        telefono: telefonoF,
        direccion: direccionF,
        contrasenia: contraseniaF,
        admin: adminF
    }
    let newUser = new users(user);
    newUser.save();
}
addUser("admin", "admin", "admin@admin.com", "0000", "adminDir", "1234", true);
addUser("cliente", "cliente", "cliente@cliente.com", "0000", "adminDir", "1111", false);



