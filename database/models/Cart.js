module.exports = function (sequelize, dataTypes) {
  let alias = "Carrito";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
    product_id: {
      type: dataTypes.INTEGER,
    },
    cantidad: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "carrito",
    timestamps: false,
  };
  let Carrito = sequelize.define(alias, cols, config);
  return Carrito;
};

/* CREATE TABLE `carrito` (
    `id` INT AUTO_INCREMENT,
    `user_id` INT,
    `product_id` INT,
    `cantidad` INT,
    PRIMARY KEY (`id`)
); */
