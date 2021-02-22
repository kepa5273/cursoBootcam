fetch("/routes/clientes/")
    .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
    .then(data => {
        for (const indice of data) {
            let clientesP = document.createElement("p") //creamos una variable para que cree un parrafo.
            clientesP.innerHTML += ("NOMBRE :" + indice.nombre + "&nbsp;&nbsp;&nbsp;&nbsp; " + "APELLIDO :" + indice.apellido + "&nbsp;&nbsp;&nbsp;&nbsp; " + "DNI :" + indice.dni)
            document.getElementById("clientesGet").appendChild(clientesP); //metemos en el clientesGet.
        }
    });
// Editar cliente: Tendremos la opción de cambiar el nombre y el apellido de un cliente que ya está registrado en la BBDD. Tendremos una ruta en la que podremos indicar el dni de un usuario y los datos a modificar
let datosCliente;
document.querySelector("#boton").addEventListener("click", function() { //esto se ejecuta directamente cuando le das al botón ya que usamos el addEventListener del click
    if (document.querySelector("#nombrePut").value == "" || document.querySelector("#apellidoPut").value == "" || document.querySelector("#dniPut").value == "") {
        alert("rellene correctamente el formulario")
    } else {

        datosCliente = { //este objeto lo mandamos al metodo put del clientes.js
            nombre: document.querySelector("#nombrePut").value, //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.
            apellido: document.querySelector("#apellidoPut").value,
            dni: document.querySelector("#dniPut").value
        }
    }
    let fetchData = { //esto es un protocolo.
        method: "PUT",
        body: JSON.stringify(datosCliente),
        headers: {
            "Content-Type": "application/json; charset = UTF-8"
        }
    };

    fetch("/routes/clientes/put/", fetchData)
        .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
        .then(data => {
            console.log(data);

        })
});

// AQUI VAMOS A HACER EL DELETE DE CLIENTES------------------------------------------------------------------
let dniCliente;
let fetchDni;
document.querySelector("#botonDelete").addEventListener("click", function() { //esto se ejecuta directamente cuando le das al botón ya que usamos el addEventListener del click
    if (document.querySelector("#dniDelete").value == "") {
        alert("rellene correctamente el formulario")
    } else {

        dniCliente = { //este objeto lo mandamos al metodo delete del clientes.js
            dni: document.querySelector("#dniDelete").value //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.
        }


        fetchDni = { //esto es un protocolo.
            method: "DELETE",
            body: JSON.stringify(dniCliente),
            headers: {
                "Content-Type": "application/json; charset = UTF-8"
            }
        }
    };

    fetch("/routes/clientes/delete/", fetchDni)
        .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
        .then(data => {
            console.log(data);


        })
});