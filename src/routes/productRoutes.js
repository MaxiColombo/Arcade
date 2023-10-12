const express = require("express");
const router = express.Router();
const multer = require("multer"); 
const path = require("path");

const {body} = require("express-validator");

//MULTER (NPM INSTALL MULTER -> CONST MULTER -> STORAGE)
const storage = multer.diskStorage({
destination:function(req, file , callback){
callback(null,"public/images");
},
filename:function(req, file , callback){
    callback(null,file.fieldname + Date.now()+ "image" + path.extname(file.originalname)); //Ojo con el fieldname es asi no, fildname ME HIZO LA VIDA IMPOSIBLE
}
});
const upload = multer({storage: storage});    
//END MULTER

//EXPRESS-VALIDATOR
const validateProductCreateAndEdit = [
body("name").notEmpty().withMessage("Debe completar un nombre"),
body("price").notEmpty().withMessage("Debe colocar un precio"),
body("discount").notEmpty().withMessage("Debe colocar un descuento"),
body("description").notEmpty().withMessage("Debe colocar una descripcion al producto"),
body("file-image-products").custom((value,{req})=> {
    let file = req.file;
    let acceptedExt = [".jpg",".jpeg",".png",".gif"]
    if(!file){
        throw new Error("Debe subir una imagen")

    }else{
        let fileExt = path.extname(file.originalname);
        if (!acceptedExt.includes(fileExt)){
            throw new Error("Las extensiones aceptadas son"+ ", jpg"+", png"+", jpeg" +", gif")
        }
    }
    return true;
}),
]


//CONTROLLER
const productController = require("../controllers/productController.js");

const requireLogin = require("../middlewares/requireLogin");

//MAIN
router.get("/",requireLogin,productController.products);
//POST Y GET DE CREAR
router.get("/create",productController.create);
router.post("/create",upload.single("file-image-products"),validateProductCreateAndEdit,productController.sendCreate);
//GET PRODUCT DETAIL
router.get("/:id",productController.detail);
//PATCH Y GET DE EDITAR
router.get("/edit/:id",productController.edit);
router.patch("/edit/:id",upload.single("file-image-products"),validateProductCreateAndEdit,productController.update);
//DELETE
router.get("/delete/:id",productController.deleteView);
router.delete("/delete/:id",productController.delete);


module.exports = router;