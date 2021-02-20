const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extend: false }));
router.use(express.json());


let db;
router.get("/", function(req, res) {

    dbConnection = req.app.locals.db;
    dbConnection.collection('clientes').find().toArray(function(err, datos) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {

            console.log(datos);
            res.send(datos);
        }
    });

});
// Registrar  cliente:  Aquí  registramos  un  nuevo  cliente,  puesto  que  no  se  puede reservar una habitación si previamente no se ha registrado al cliente. Recibiremos losdatos de nombre, apellido y DNI y añadiremos los datos a la colección de Clientes

router.post("/post", function(req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("clientes").insertOne(req.body, function(err, datos) {

        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {

            console.log(datos);
            res.redirect('/clientes.html');

        }
    });
});
// Editar cliente: Tendremos la opción de cambiar el nombre y el apellido de un cliente que ya está registrado en la BBDD. Tendremos una ruta en la que podremos indicar el dni de un usuario y los datos a modificar

router.put("/put", function(req, res) {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let dni = req.body.dni;
    let dbConnection = req.app.locals.db;
    dbConnection.collection("clientes").updateOne({ dni: dni }, { $set: { nombre: nombre, apellido: apellido } }, function(err, datos) {

        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err })
        } else {
            // let mensaje = { texto: `has modificado ${nombre} ${apellido}` };


            res.send(datos);


        }
    });
});

router.delete("/delete", function(req, res) {
    // let nombre = req.body.nombre;
    // let apellido = req.body.apellido;
    let dni = req.body.dni;
    let dbConnection = req.app.locals.db;
    dbConnection.collection("clientes").deleteMany({ dni: dni }, function(err, datos) {

        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err })
        } else {



            res.send(datos);


        }
    });


})
module.exports = router;