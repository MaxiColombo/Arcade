const fs = require("fs")
const path = require("path");

const mainController = {
  main: (req, res)=> {
   res.render("main");
}
};


module.exports = mainController;