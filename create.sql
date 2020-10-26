CREATE DATABASE `delilah`;
USE `delilah`;

CREATE TABLE `menu` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`categoria` VARCHAR(50) NOT NULL,
	`producto` VARCHAR(50) NOT NULL,
	`precio` INT UNSIGNED NOT NULL,
	`descripcion` TINYTEXT NOT NULL,
	`disponible` TINYINT NOT NULL DEFAULT 0,
	PRIMARY KEY (`ID`)
)
COLLATE='latin1_swedish_ci'
;

INSERT INTO menu (categoria, producto, precio, descripcion, disponible)
VALUES ("Bebidas Calientes", "Espresso", 2500, "Bebida caliente, preparada con 25ml de agua y café, en máquina espresso.", "1"),
       ("Bebidas Calientes", "Americano", 2500, "Bebida caliente, preparada con 150ml de agua y café, en máquina espresso.", "1"),
       ("Bebidas Calientes", "Macchiato", 2700, "Bebida caliente, preparada con 25ml de agua, café y leche, en máquina espresso.", "1"),
       ("Bebidas Calientes", "Capuchino", 4500, "Bebida caliente, preparada con 25ml de agua, café y 150ml de leche cremada con capa de espuma densa, en máquina espresso.", "1"),
       ("Bebidas Calientes", "Latte", 4500, "Bebida caliente, preparada con 25ml de agua, café y 150ml de leche cremada con capa de espuma delgada, en máquina espresso.", "1"),
       ("Bebidas Calientes", "Mocca", 5000, "Bebida caliente, preparada con 25ml de agua, 15gr de cocoa, café y 150ml de leche cremada, en máquina espresso.", "1"),
       ("Bebidas Calientes", "Milo", 5000, "Bebida caliente, preparada con leche y milo.", "1"),
       ("Bebidas Calientes", "Tinto", 800, "Bebida caliente, tinto tradicional preparado en cafetera por método de goteo.", "1"),
       ("Bebidas Calientes", "Tinto", 3500, "Bebida caliente, preparada con 20gr de frutas desidratadas y 150ml de agua.", "1"),
       ("Bebidas Calientes", "Te Chai", 6000, "Bebida caliente, preparada con te chai y 150ml de leche cremada con lanceta.", "1"),
       ("Reposteria", "Torta de chocolate", 5000, "Porción de torta de chocolate.", "1"),
       ("Reposteria", "Torta de cereza", 4000, "Porción de torta de cereza.", "1"),
       ("Reposteria", "Torta de café", 5000, "Porción de torta de café.", "1"),
       ("Reposteria", "Dedito de queso", 1500, "Palito de queso envuelto en masa de pan.", "1"),
       ("Reposteria", "Rollo de canela", 2500, "Rollo de canela con salsa en base a queso crema dulce.", "1"),
       ("Reposteria", "Alfajor", 900, "Galleta dulce cubiera de coco y rellena de arequipe.", "1"),
       ("Reposteria", "Pastel hojaldrado de arequipe", 3500, "Pastel hojaldrado con capa de azucar y relleno de arequipe.", "1"),
       ("Reposteria", "Pastel hojaldrado hawaiano", 3500, "Pastel hojaldrado relleno con trozos de piña, jamón y queso.", "1"),
       ("Reposteria", "Pastel hojaldrado hawaiano", 3500, "Pastel hojaldrado relleno de queso, albaca y champiñones.", "1"),
       ("Reposteria", "Pastel hojaldrado de jamon y queso", 3500, "Pastel hojaldrado relleno de jamón y queso.", "1");

CREATE TABLE `usuarios` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`usuario` VARCHAR(50) NOT NULL,
	`nombre_apellido` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	`telefono` VARCHAR(50) NOT NULL,
	`contrasenia` VARCHAR(50) NOT NULL,
    `admin` TINYINT NOT NULL DEFAULT 0,
	PRIMARY KEY (`ID`)
)
COLLATE='latin1_swedish_ci'
;

INSERT INTO usuarios (usuario, nombre_apellido, email, telefono, contrasenia, admin)
VALUES ("admin", "admin", "admin@admin.com", "455867", "admin", "1"),
       ("cliente", "cliente", "cliente@cliente.com", "555555", "cliente", "0");
       
/* CREATE TABLE `Tokens` (
	`token` VARCHAR(200) NOT NULL
)
COLLATE='latin1_swedish_ci'
; */