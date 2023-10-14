//npm init -y
//npm install express
const express = require('express')
const app = express()

//ESTO ES PARA EL METODO POST (INSTALAR EXPRESS Y EXPRESS GENERATOR SI O SI- si no nos llegan datos al form)
app.use(express.urlencoded({extended: false})); //Esto es para formData
app.use(express.json())
//path
const path = require("path");

//Le decimos donde esta la ruta publica -- Usamos recursos estaticos
app.use(express.static("./public"));

//PARA EL METODO PATCH 
const methodOverride = require('method-override');
app.use(methodOverride('_method'));



//PARA EL SESSION
const session = require('express-session');
app.use(session({
  secret: "ProyectoSoloMaxi",
  resave: true,
  saveUninitialized: true
}));
//Llamamos a las rutas
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

//PARA UTILIZAR EL ISLOGGED EN TODA LA PAGINA, ya que esta en el pie -- SI O SI MAS ABAJO DEL Session ya que esto proviene del session
const usserLoggedMiddleware = require("./middlewares/usserLoggedMiddleware");
app.use(usserLoggedMiddleware);


app.use("/user",userRoutes);
app.use("/products",productRoutes);
app.use("/",mainRoutes);
app.use((req, res, next)=>{
  res.status(404).render("error404")
})
//EJS (Clase 20 - Esto le hace saber donde esta la carpeta views para no tener que escribir el path.resolve en el CONTROLLER)
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, 'views'));

//Hacer correr el servidor
app.listen(3310,() => {
    console.log("Servidor Running http://localhost:3310");
});















//OTRA MANERA DE INICIAR SERVIDOR

/* const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/main.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port); */