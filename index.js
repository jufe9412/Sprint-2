// colocamos las dependencias // importaciones en NetBeans
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;

// colocamos las rutas internas
const user_routes = require("./routes/usuario");
const categ_routes = require("./routes/categoria");
const mensaje_routes = require("./routes/mensaje");
const quadbike_routes = require("./routes/quadbike");
const reserva_routes = require("./routes/reserva");

mongoose.Promise = global.Promise; // declaramos la promesa

app.use(bodyParser.urlencoded({extended:false}));
// app.use("/api",user_routes); ===>> se pasó a la condicion de la conexion a la DB

// Realizamos la promesa para conexion a la base de datos NoSQL
mongoose.connect("mongodb://localhost:27017/apiRestG11",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(() => {
    app.use("/api",user_routes);
    app.use("/api",categ_routes);
    app.use("/api",mensaje_routes);
    app.use("/api",quadbike_routes);
    app.use("/api",reserva_routes);

    app.listen(port, ()=> {
        console.log("El servidor corriendo en el puerto =", port);
    
    })
})
.catch(error => console.error(error)); 

// tambien se agregó a la condición de la conexion a la DB
/*app.listen(port, ()=> {
    console.log("El servidor corriendo en el puerto =", port);

})*/ 


