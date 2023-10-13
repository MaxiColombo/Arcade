
const { validationResult } = require('express-validator');
/* const fs = require("fs") */
const path = require("path");
//PARA EL SEEKER
const sequelize = require("sequelize");
const Op = sequelize.Op;

const db = require(path.join(__dirname, '../../database/models'));
/* const sequelize = require("sequelize"); */

const productController = {
  products: (req, res) => {
    db.Product.findAll()
      .then(function (products) {
        return res.render("products", { products: products })
      })
  },
  search: (req, res) => {
    let search = "%" + req.body.seeker + "%";

    db.Product.findAll({ where: { name: { [Op.like]: search } } })
        .then(function (products) { // Cambiar "product" a "products"
            return res.render("products", { products: products });
        });
},
  create: (req, res) => {
    db.Category.findAll()
      .then(function (categories) {
        return res.render("create", { categories: categories })
      })

  },

  sendCreate: function (req, res) {
    let resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      db.Category.findAll()
        .then(function (categories) {
          return res.render("create", {
            errors: resultValidation.mapped(),
            oldData:req.body,
            categories: categories
          });
        })
    } else {
      db.Product.create({
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        description: req.body.description,
        image: req.file ? req.file.filename : "Smirnoff-out.jpg",
        categoryId: req.body.category,

      });
      res.redirect("/")
    }
  },


  detail: function (req, res) {
    db.Product.findByPk(req.params.id)
      .then(function (products) {
        res.render("productsDetail", { products: products })
      })

  },
  edit: function (req, res) {

    let askId = db.Product.findByPk(req.params.id);
    let category = db.Category.findAll();

    Promise.all([askId, category]).then(function ([product, categories]) {
      return res.render("edit", { product: product, categories: categories })
    })
  },
  update: function (req, res) {
    db.Product.update({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      description: req.body.description,
      image: req.file ? req.file.filename : "error.jpg",
      categoryId: req.body.category
    }, {
      where: {
        id: req.params.id
      }
    }
    );

    res.redirect("/products");
  },

  deleteView: function (req, res) {
    let askId = db.Product.findByPk(req.params.id);
    let category = db.Category.findAll();

    Promise.all([askId, category]).then(function ([product, categories]) {
      return res.render("deleteView", { product: product, categories: categories })
    })

  },
  delete: function (req, res) {

    db.Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect("/");
  },
  
    carrito: (req, res) => {

      const carritoItems = db.Carrito.findAll();
      const products = db.Product.findAll();
      
      Promise.all([products, carritoItems]).then(function ([products, carritoItems]) {
        return res.render("carrito", { products: products, carritoItems: carritoItems });
      });
  
    },
    agregarCarrito: function (req, res) {
      const productId = req.body.product_id; // Obtén el ID del producto de la URL
  
      // Verificar si el usuario ha iniciado sesión o recuperar el ID de usuario de otra manera
      const userId = req.user ? req.user.id : 1; // Supongamos que el ID de usuario es 1
  
      // Verificar si el producto ya está en el carrito del usuario
      db.Carrito.findOne({
          where: {
              user_id: userId,
              product_id: productId
          }
      }).then(function (entry) {
          if (entry) {
              // Si el producto ya está en el carrito, actualiza la cantidad
              entry.cantidad += 1;
              entry.save();
          } else {
              // Si el producto no está en el carrito, crea una nueva entrada
              db.Carrito.create({
                  user_id: userId,
                  product_id: productId,
                  cantidad: 1
              });
          }
  
          // Redirigir al usuario de vuelta a la página del carrito o a donde desees
          res.redirect("/products/carrito");
      });
  },
  deleteBuy: function (req, res) {

    db.Carrito.destroy({
      where: {
        product_id: req.params.id
      }
    })
    res.redirect("/products/carrito");
  },
  agregarCarrito: function (req, res) {
    const productId = req.body.product_id; // Obtén el ID del producto de la URL

    // Verificar si el usuario ha iniciado sesión o recuperar el ID de usuario de otra manera
    const userId = req.user ? req.user.id : 1; // Supongamos que el ID de usuario es 1

    // Verificar si el producto ya está en el carrito del usuario
    db.Carrito.findOne({
        where: {
            user_id: userId,
            product_id: productId
        }
    }).then(function (entry) {
        if (entry) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            entry.cantidad += 1;
            entry.save();
        } else {
            // Si el producto no está en el carrito, crea una nueva entrada
            db.Carrito.create({
                user_id: userId,
                product_id: productId,
                cantidad: 1
            });
        }

        // Redirigir al usuario de vuelta a la página del carrito o a donde desees
        res.redirect("/products/carrito");
    });
  },
addOneProductToCart: function (req, res) {
  const productId = req.params.id; // Obtén el ID del producto desde los parámetros de la URL

  // Verificar si el usuario ha iniciado sesión o recuperar el ID de usuario de otra manera
  const userId = req.user ? req.user.id : 1; // Supongamos que el ID de usuario es 1

  // Verificar si el producto ya está en el carrito del usuario
  db.Carrito.findOne({
    where: {
      user_id: userId,
      product_id: productId
    }
  }).then(function (entry) {
    if (entry) {
      // Si el producto ya está en el carrito, aumenta la cantidad en 1 unidad
      entry.cantidad += 1;
      entry.save();
    } else {
      // Si el producto no está en el carrito, crea una nueva entrada con cantidad 1
      db.Carrito.create({
        user_id: userId,
        product_id: productId,
        cantidad: 1
      });
    }

    // Redirigir al usuario de vuelta a la página del carrito o a donde desees
    res.redirect("/products/carrito");
  });
},

deleteOneProductFromCart: function (req, res) {
  const productId = req.params.id; // Obtén el ID del producto desde los parámetros de la URL

  // Verificar si el usuario ha iniciado sesión o recuperar el ID de usuario de otra manera
  const userId = req.user ? req.user.id : 1; // Supongamos que el ID de usuario es 1

  // Verificar si el producto ya está en el carrito del usuario
  db.Carrito.findOne({
    where: {
      user_id: userId,
      product_id: productId
    }
  }).then(function (entry) {
    if (entry) {
      // Si la cantidad es mayor que 1, disminuye la cantidad en 1 unidad
      if (entry.cantidad > 1) {
        entry.cantidad -= 1;
        entry.save();
      } else {
        // Si la cantidad es 1, elimina el producto del carrito
        entry.destroy();
      }
    }

    // Redirigir al usuario de vuelta a la página del carrito o a donde desees
    res.redirect("/products/carrito");
  });
}

};





module.exports = productController;