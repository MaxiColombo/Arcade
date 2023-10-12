
const { validationResult } = require('express-validator');
/* const fs = require("fs") */
const path = require("path");


const db = require(path.join(__dirname, '../../database/models'));
/* const sequelize = require("sequelize"); */

const productController = {
  products: (req, res) => {
    db.Product.findAll()
      .then(function (products) {
        return res.render("products", { products: products })
      })
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
  }


};


module.exports = productController;