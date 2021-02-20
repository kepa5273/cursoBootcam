const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extend: false }));
router.use(express.json());



router.get("/", function(req, res) {
    console.log(req);
    dbConnection = req.app.locals.db;
    dbConnection.collection('reservas').find().toArray(function(err, datos) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {

            console.log(datos);
            res.send(datos);
        }
    });

});

// AQUI VA EL POST DE RESERVAS----------------------------------------------------------------

router.post("/post", function(req, res) {
    let reservasPost = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        habitacion: req.body.habitacion,
        checkin: req.body.checkin,
        checkout: req.body.checkout
    }
    let dbConnection = req.app.locals.db;
    dbConnection.collection("reservas").insertOne(reservasPost, function(err, datos) {

        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {

            console.log(datos);
            res.send(datos);

        }
    });
});
module.exports = router;