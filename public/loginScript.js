document.querySelector("#botonReg").addEventListener("click", function() { //esto se ejecuta directamente cuando le das al botón ya que usamos el addEventListener del click


    let registroCliente = { //este objeto lo mandamos al metodo put del clientes.js
        user: document.querySelector("#userReg").value, //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.
        password: document.querySelector("#passwordReg").value,

    }

    let fetchData = { //esto es un protocolo.
        method: "POST",
        body: JSON.stringify(registroCliente),
        headers: {
            "Content-Type": "application/json; charset = UTF-8"
        }
    };

    fetch("/routes/login/login/", fetchData)
        .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
        .then(data => {
            alert(data.mensaje);

        })
});

// AQUI VA EL BOTON PARA LOGEARSE-----------------------------------------------------------------------------------------------

document.querySelector("#botonLog").addEventListener("click", function() { //esto se ejecuta directamente cuando le das al botón ya que usamos el addEventListener del click


    let loginCliente = { //este objeto lo mandamos al metodo put del clientes.js
        user: document.querySelector("#userLog").value, //el valor que meto en el imput con la id #nombrePut lo mete en la propiedad nombre dentro del objeto.
        password: document.querySelector("#passwordLog").value,

    }

    let fetchData = { //esto es un protocolo.
        method: "POST",
        body: JSON.stringify(loginCliente),
        headers: {
            "Content-Type": "application/json; charset = UTF-8"
        }
    };

    fetch("/routes/login/checkuser/", fetchData)
        .then(response => response.json()) //va a recibir un Json(es lo que le quiere decir)
        .then(data => {
            if (data.status == true) {
                alert(data.mensaje);
                location.href = "http://localhost:3000/logindex.html"
            } else {
                alert(data.mensaje);
            }


        })
});