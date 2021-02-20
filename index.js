const express = require('express')
const mongodb = require('mongodb');
const bcrypt = require("bcrypt");



let clientes = require('./routes/clientes');
let habitaciones = require('./routes/habitaciones');
let reservas = require('./routes/reservas');
let login = require('./routes/login');

const app = express();
app.use('/routes/clientes', clientes);
app.use('/routes/habitaciones', habitaciones);
app.use('/routes/reservas', reservas);
app.use('/routes/login', login)

let MongoClient = mongodb.MongoClient;
let db;

app.use(express.static('public'));
app.use(express.urlencoded({ extend: false }));
app.use(express.json());

MongoClient.connect('mongodb://127.0.0.1:27017', function(err, client) {
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db('hotel')
    }
});
app.listen(3000);