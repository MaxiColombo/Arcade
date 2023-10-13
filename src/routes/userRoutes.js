const express = require("express");
const router = express.Router();
const multer = require("multer"); 
const path = require("path");

const {body} = require("express-validator");

const userController = require("../controllers/userController.js");

/* const { route } = require("./mainRoutes.js"); */
//MULTER (NPM INSTALL MULTER -> CONST MULTER -> STORAGE)
const storage = multer.diskStorage({
    destination:function(req, file , callback){
    callback(null,"public/images");
    },
    filename:function(req, file , callback){
        callback(null,file.fieldname + Date.now()+ "image" + path.extname(file.originalname)); //OJo con el fieldname ES CON D
    }
    });
    const upload = multer({storage: storage}); 

const validateRegister = [
    body("name").notEmpty().withMessage("Debe completar el nombre").bail().isLength({min:2}).withMessage("El minimo es de 2 caracteres"),
    body("lastname").notEmpty().withMessage("Debe completar el apellido"),/* .bail().isLength({max:20}).withMessage("El maximo es de 20 caracteres"), */
    body("dni").notEmpty().withMessage("Debe completar el dni").bail().isInt().withMessage("Debe ser un numero").bail().isLength({max:8}).withMessage("El maximo es de 8 caracteres").bail().isLength({min:7}).withMessage("El minimo de caracteres es 7"),
    body("email").notEmpty().withMessage("Debe completar el email").isEmail().withMessage("Debe ser un formato de email valido"),/* .bail().isLength({max:70}).withMessage("El maximo es de 70 caracteres"), */
    body("password").notEmpty().withMessage("Debe completar con una contraseña").bail().isLength({ min: 8 }).withMessage("La contraseña debe ser mayor de 8 caracteres")/* .bail()
    .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,).withMessage("Debe contener un caracter especial(@$.!#?&)") */,
    body("passwordConfirm").notEmpty().withMessage("Debe confirmar la contraseña").bail().isLength({max:30}).withMessage("El maximo es de 30 caracteres"),
    body("ProfileImage").custom((value,{req})=> {
        let file = req.file;
        let acceptedExt = [".jpg",".jpeg",".png",".gif"]
        if(!file){
            throw new Error("Debe subir una imagen")
    
        }else{
            let fileExt = path.extname(file.originalname);
            if (!acceptedExt.includes(fileExt)){
                throw new Error("Las extenciones aceptadas son"+ ", jpg"+", png"+", jpeg" +", gif")
            }
        }
        return true;
    })
    ]
const validateLogin = [
    body("email").notEmpty().withMessage("Debe colocar un email").bail().isEmail().withMessage("Debe ser de tipo email"),
    body("password").notEmpty().withMessage("Debe completar con una contraseña").bail().isLength({ min: 8 }).withMessage("La contraseña debe ser mayor de 8 caracteres")
]

const requireLogin = require("../middlewares/requireLogin");


//GET Y POST Login
router.get("/login",userController.login);
router.post("/login",validateLogin,userController.access);
//GET Y POST Register
router.get("/register",userController.register);
router.post("/register",upload.single("ProfileImage"),validateRegister,userController.createUser);
//GET Perfil
router.get("/profile",requireLogin,userController.profile);
//Logout
router.get("/logout",userController.logout);
//Delete User
router.get("/deleteUser/:id",userController.deleteUser);

module.exports = router;