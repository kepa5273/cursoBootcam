const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extend: false }));
router.use(express.json());



router.get("/", function(req, res) {
    console.log(req);
    dbConnection = req.app.locals.db;
    dbConnection.collection('habitaciones').find().toArray(function(err, datos) {
        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {


            res.send(datos);
        }
    });

});

// METODO PUT''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

router.put("/put", function(req, res) {
    let habitacion = req.body.habitacion;
    let estado = req.body.estado;


    let dbConnection = req.app.locals.db;
    dbConnection.collection("habitaciones").updateOne({ habitacion: habitacion }, { $set: { estado: estado } }, function(err, datos) {

        if (err != null) {
            console.log(err);
            res.send({ mensaje: "error: " + err })
        } else {



            res.send(datos);


        }
    });
});

module.exports = router;