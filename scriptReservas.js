// const { checkout } = require("../routes/reservas");

fetch("/routes/reservas/")
    .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
    .then(data => {

        for (const indice of data) {

            let reservasP = document.createElement("p") //creamos una variable para que cree un parrafo.
            reservasP.innerHTML += (`NOMBRE : ${indice.nombre}` + "&nbsp;&nbsp;&nbsp;&nbsp;" + "APELLIDO: " + indice.apellido + "&nbsp;&nbsp;&nbsp;&nbsp;" + "DNI: " + indice.dni + "&nbsp;&nbsp;&nbsp;&nbsp;" + "HABITACIÓN: " + indice.habitacion + "&nbsp;&nbsp;&nbsp;&nbsp;" + " CHECKIN: " + indice.checkin + "&nbsp;&nbsp;&nbsp;&nbsp;" + "CHECKOUT: " + indice.checkout);
            let botonCheckin = document.createElement("button");
            botonCheckin.id = `botonCheckin${indice.habitacion}`;
            botonCheckin.innerHTML += ("checkin");
            botonCheckin.value += indice.habitacion;

            document.getElementById("reservasGet").appendChild(reservasP); //metemos en el clientesGet.
            document.getElementById("reservasGet").appendChild(botonCheckin);


            document.querySelector(`#botonCheckin${indice.habitacion}`).addEventListener("click", function() { //esto se ejecuta directamente cuando le das al botón ya que usamos el addEventListener del click
                let datosReserva;
                if (botonCheckin.innerHTML == "checkin") {


                    datosReserva = { //este objeto lo mandamos al metodo put del habitaciones.js
                        habitacion: document.querySelector(`#botonCheckin${indice.habitacion}`).value,
                        estado: "ocupado" //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.

                    }
                } else {
                    datosReserva = { //este objeto lo mandamos al metodo put del habitaciones.js
                        habitacion: document.querySelector(`#botonCheckin${indice.habitacion}`).value,
                        estado: "libre" //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.

                    }

                }
                fetchPut(datosReserva, document.querySelector(`#botonCheckin${indice.habitacion}`));
            })
        }
    })


// AQUI VA EL POST DE RESERVAS---------------------------------------------------------------------------
let reservasCliente;
let fetchReservas;
document.querySelector("#botonReserv").addEventListener("click", function() { //esto se ejecuta directamente cuando le das al botón ya que usamos el addEventListener del click
    if (document.querySelector("#nombreReserv").value == "" || document.querySelector("#apellidoReserv").value == "" || document.querySelector("#dniReserv").value == "" || document.querySelector("#habitacionReserv").value == "" || document.querySelector("#checkinReserv").value == "" || document.querySelector("#checkoutReserv").value == "") {
        alert("rellene correctamente el formulario")
    } else {

        reservasCliente = { //este objeto lo mandamos al metodo put del clientes.js
            nombre: document.querySelector("#nombreReserv").value, //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.
            apellido: document.querySelector("#apellidoReserv").value,
            dni: document.querySelector("#dniReserv").value,
            habitacion: document.querySelector("#habitacionReserv").value,
            checkin: document.querySelector("#checkinReserv").value,
            checkout: document.querySelector("#checkoutReserv").value
        }
        fetchReservas = { //esto es un protocolo.
            method: "POST",
            body: JSON.stringify(reservasCliente),
            headers: {
                "Content-Type": "application/json; charset = UTF-8"
            }
        }
    };

    fetch("/routes/reservas/post/", fetchReservas)
        .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
        .then(data => {
            console.log(data);
            alert("reserva ejecutada correctamente")

        })
});

// // AQUI VA EL PUT DE RESERVAS-----------------------------------------------------------

function fetchPut(datosReserva, boton) {

    let fetchRes = { //esto es un protocolo para que se entiendan el front y el back.
        method: "PUT", //indicamos el metodo que vamos a utilizar
        body: JSON.stringify(datosReserva), //pasamos a string el objeto datosHabitacion
        headers: {
            "Content-Type": "application/json; charset = UTF-8"
        }
    }

    fetch("/routes/habitaciones/put/", fetchRes)
        .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
        .then(data => {
            console.log(data);
            if (boton.innerHTML == "checkin") {
                boton.innerHTML = "checkout"
            } else {
                boton.innerHTML = "checkin"

            }

        })
}