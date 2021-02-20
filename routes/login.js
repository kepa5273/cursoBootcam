const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const router = express.Router();

router.use(express.urlencoded({ extend: false }));
router.use(express.json());



router.post("/login/", function(req, res) {
    let usuario = req.body.user;
    let password = req.body.password;
    let contraseniaCifrada = bcrypt.hashSync(password, 10);
    console.log("contraseña cifrada:" + contraseniaCifrada);
    let coincidencia = bcrypt.compareSync(password, contraseniaCifrada);
    console.log(coincidencia);
    let db = req.app.locals.db;
    if (coincidencia) {
        db.collection("login").insertOne({ username: usuario, password: contraseniaCifrada }, function(err, userUpdate) {
            // console.log(userUpdate);
            if (err !== null) {
                res.send({ mensaje: "Ha habido un error" });
            } else {
                if (userUpdate.result.n > 0) {
                    res.send({ mensaje: "Usuario creado" });
                } else {
                    res.send({ mensaje: "El usuario no se ha podido crear" });
                }
            }
        })
    }
});
router.post("/checkuser/", function(req, res) {
    let username = req.body.user;
    let password = req.body.password;
    let db = req.app.locals.db;
    db.collection("login")
        .find({ username: username })
        .toArray(function(err, arrayUsuario) {
            // console.log(arrayUsuario);
            if (err !== null) {
                res.send({ mensaje: "Ha habido un error", status: false });
            } else {
                if (arrayUsuario.length > 0) {
                    if (bcrypt.compareSync(password, arrayUsuario[0].password)) {
                        res.send({ mensaje: "Logueado correctamente", status: true });
                    } else {
                        res.send({ mensaje: "Contraseña incorrecta", status: false });
                    }
                } else {
                    res.send({ mensaje: "El usuario no existe", status: false });
                }
            }
        });
});
module.exports = router;