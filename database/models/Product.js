module.exports = function (sequelize, dataTypes) {
  let alias = "Product";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.INTEGER,
    },
    discount: {
      type: dataTypes.INTEGER,
    },
    description: {
      type: dataTypes.STRING,
    },
    image: {
      type: dataTypes.STRING,
    },
    categoryId: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "products",
    timestamps: false,
  };
  let Product = sequelize.define(alias, cols, config);

  return Product;
};
