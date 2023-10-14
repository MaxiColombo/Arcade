const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
//REQUERIMOS DATA BASE
const db = require(path.join(__dirname, "../../database/models"));

const userController = {
    login: (req, res) => {
        res.render("login",{user: req.session.userLogged});
    },
    register: (req, res) => {
        db.Role.findAll().then(function (roles) {
            return res.render("register", { roles: roles,user: req.session.userLogged});
        });
    },
    createUser: (req, res) => {
        let roles = db.Role.findAll();
        let usersInDB = db.User.findOne({ where: { email: req.body.email } })
        Promise.all([roles, usersInDB])
            .then(function ([roles, userInDB]) {
                if (userInDB) {
                    return res.render('register', {
                        errors: {
                            email: {
                                msg: 'Este email ya está registrado'
                            }
                        }, roles: roles, oldData: req.body,user: req.session.userLogged

                    });
                }
                let resultValidation = validationResult(req);


                if (resultValidation.errors.length > 0) {
                    return res.render("register", { errors: resultValidation.mapped(), roles: roles, oldData: req.body });
                } else {
                    //Encriptar contraseña
                    let pass = bcrypt.hashSync(req.body.password, 10)
                    //Formularios
                    db.User.create({
                        name: req.body.name,
                        lastname: req.body.lastname,
                        dni: req.body.dni,
                        image: req.file ? req.file.filename : "default-users.jpg",
                        email: req.body.email,
                        roleId: req.body.role,
                        password: pass,
                        passwordConfirm: bcrypt.compareSync(req.body.passwordConfirm, pass),
                    });
                    let passwordConfirm = bcrypt.compareSync(req.body.passwordConfirm, pass)
                    if (passwordConfirm) {
                        res.redirect("/")
                    } else {
                        return res.render("register", {
                            errors: {
                                password: {
                                    msg: 'Los contraseñas nos son iguales'
                                }
                            }, roles: roles, oldData: req.body,user: req.session.userLogged
                        })
                    }
                }//else
            })

    },
    access: (req, res) => {
        db.User.findOne({where:{email:req.body.email}})
        .then(function(userToLogin){
            
            let resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                    return res.render("login", { errors: resultValidation.mapped(), oldData: req.body,user: req.session.userLogged });
            }
            if (userToLogin) {
                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                if (isOkThePassword) {
                    req.session.userLogged = userToLogin;
    
                    return res.redirect('/user/profile');
                }
                return res.render('login', {
                    errors: {
                        password: {
                            msg: 'La contraseña es incorrecta'
                        }
                    }, oldData: req.body,user: req.session.userLogged
                });
            }
    
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                },oldData: req.body,user: req.session.userLogged
            });
        });  
    },
    profile: (req, res) => {
        return res.render('profile',{
            user:req.session.userLogged
        })
    },
    logout:(req,res)=> {
        req.session.destroy()
        return res.redirect("/");
    },
    deleteUser:(req,res) => {
        db.User.destroy({
            where: {
              id: req.params.id
            }
          })
          res.redirect("/");
    }
};
module.exports = userController;
