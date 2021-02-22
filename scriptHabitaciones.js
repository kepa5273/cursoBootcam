fetch("/routes/habitaciones/")
    .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
    .then(data => {
        for (const indice of data) {
            let habitacionesP = document.createElement("p") //creamos una variable para que cree un parrafo.
            habitacionesP.innerHTML += ("Nº DE HABITACION : " + indice.habitacion + "&nbsp;&nbsp;&nbsp;&nbsp; " + "ESTADO : " + indice.estado)
            document.getElementById("habitacionesGet").appendChild(habitacionesP); //metemos en el clientesGet.
        }
    });

// METODO PUT PARA CAMBIAR EL ESTADO DE LAS BITACIONES''''''''''''''''''''''''''''''''''''''''''''''
// let datosHabitacion;
// document.querySelector("#botonHab").addEventListener("click", function() { //esto se ejecuta directamente cuando le das al botón ya que usamos el addEventListener del click
//     // if (document.querySelector("#habitacion").value == "" || document.querySelector("#estado").value == "") {
//     //     alert("rellene correctamnete el formulario")

//     // } else {
//     // }
//     let datosHabitacion = { //este objeto lo mandamos al metodo put del habitaciones.js
//         habitacion: document.querySelector("#habitacion").value, //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.
//         estado: document.querySelector("#estado").value,

//     }
//     datosHabitacion.estado.toLowerCase();
//     let fetchData = { //esto es un protocolo para que se entiendan el front y el back.
//         method: "PUT", //indicamos el metodo que vamos a utilizar
//         body: JSON.stringify(datosHabitacion), //pasamos a string el objeto datosHabitacion
//         headers: {
//             "Content-Type": "application/json; charset = UTF-8"
//         }
//     };
//     console.log(fetchData);
//     fetch("/routes/habitaciones/put/", fetchData)
//         .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
//         .then(data => {
//             console.log(data);
//             alert(`se ha modificado correctamente`)

//         })
// });