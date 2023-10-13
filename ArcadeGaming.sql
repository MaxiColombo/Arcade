DROP DATABASE IF EXISTS `arcadeGaming`;
CREATE DATABASE `arcadeGaming`;
USE `arcadeGaming`;

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `price` INT NOT NULL,
   `discount` INT NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `categoryId` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `category` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `lastname` VARCHAR(255) NOT NULL,
   `dni` INT NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `roleId` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `role` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `carrito` (
    `id` INT AUTO_INCREMENT,
    `user_id` INT,
    `product_id` INT,
    `cantidad` INT,
    PRIMARY KEY (`id`)
);



insert into categories values (1, "Consolas"),(2,"Celulares"),(3,"Notebooks"),(4,"Dispositivos De Audio");

insert into roles values (1, "Administrador"),(2,"Cliente");

insert into products values (1,"Play Station 3",205000,5,"Consola PS5","bombay - out.png",1),
(2,"Play Station 4",90000,10,"Consola PS4","bombay - out.png",1),
(3,"S23",300000,12,"Samnsung S23","bombay - out.png",2),
(4,"Notebook Dell Inspiron 3515",232000,10,"Notebook de 15,6 pulgadas con gama de familia de procesadores desde AMD Athlon™ Silver 3050U, AMD Ryzen™ 5 3450U hasta AMD Ryzen™ 7 3700U gráficos Radeon™ Vega, diseño sustentable y reflexivo, y características clave para uso diario.","ronBacardi-out.jpg",3),
(5,"Parlante Bose SoundLink Revolve",13000,10,"Parlante Bose SoundLink Revolve II portátil con bluetooth waterproof luxe silver","Smirnoff-out.jpg",4),
(6,"Apple iPhone 14 ",400000,10,"Celular Iphone 14 Azul 128GB","fernet-out.jpg",2),
(7,"Parlante Bose Bass Module",614000,20,"Parlante Bose Bass Module 700 bose black 220V","Jägermeister-out.png",4);

insert into users values(1,"maximo","colombo",4498531,"maximocolombo2003@gmail.com","Troncotomas123#","Smirnoff-out.jpg",1);


ALTER TABLE `products` ADD CONSTRAINT `FK_dd99d9f6-f680-469a-88d6-8e23bd99c872` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_e02c9069-99cf-4730-b5b7-1c22f2465c96` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`)  ;