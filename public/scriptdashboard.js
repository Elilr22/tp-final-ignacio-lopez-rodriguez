
//referencias del formulario
const $form = document.querySelector("form");
const $nombre = document.getElementById("nombre");
const $tipo = document.getElementById("tipo");
const $edad = document.getElementById("edad");
const $raza = document.getElementById("raza");

//referencia a la seccion donde se van a mostrar las mascotas
const $section = document.querySelector("section")



let mascotaEditandoId = null;



//esta funcion es para mostrar las mascotas en el dashboard
const getMascotas = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No estás autenticado");
        window.location.href = "/index.html";
        return;
    }


    const respuestaServidor = await fetch("/api/mascotas", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const mascotas = await respuestaServidor.json()
    console.log(mascotas)

    $section.innerHTML = ""


    mascotas.forEach(mascota => {
        $section.innerHTML += `

        <div class="mascota">
            <h3>Nombre:${mascota.nombre}</h3>
            <p>Tipo:${mascota.tipo}</p>
            <p>Raza:${mascota.raza}</p>
            <p>Edad:${mascota.edad} años</p>

            <button onclick="actualizarMascota('${mascota._id}')">
            Actualizar
            </button>

            <button class="botonBorrar" onclick="borrarMascota('${mascota._id}')">
            Borrar
            </button>
        </div>
        
        `
    })


};
getMascotas()


//esta parte es para enviar el formulario
/* $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dataMascota = {
        nombre: $nombre.value,
        tipo: $tipo.value,
        edad: Number($edad.value),
        raza: $raza.value
    }


    if (!dataMascota.nombre || !dataMascota.tipo || !dataMascota.edad || !dataMascota.raza) {
        return alert("Todos los campos son obligatorios")
    }


    //METODO POST PARA ENVIAR LOS DATOS AL SERVIDOR
    const respuestaServidor = await fetch("/api/mascotas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataMascota)
    })


    const data = await respuestaServidor.json()
    alert(`Mascota ${data.nombre} creada con exito con id ${data._id}`)
    if (respuestaServidor.ok) {
        getMascotas()
    }



    $nombre.value = "";
    $tipo.value = "";
    $edad.value = "";
    $raza.value = "";
}); */
$form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dataMascota = {
        nombre: $nombre.value,
        tipo: $tipo.value,
        edad: Number($edad.value),
        raza: $raza.value
    };

    if (!dataMascota.nombre || !dataMascota.tipo || !dataMascota.edad || !dataMascota.raza) {
        return alert("Todos los campos son obligatorios");
    }

    // 🟡 SI estamos editando → UPDATE
    if (mascotaEditandoId) {

        const token = localStorage.getItem("token");

        const respuestaServidor = await fetch(`/api/mascotas/${mascotaEditandoId}`, {
            method: "PUT", // o PATCH
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataMascota)
        });

        if (respuestaServidor.ok) {
            alert("Mascota actualizada");
            mascotaEditandoId = null; // salir del modo edición
            getMascotas();
        }

    } else {
        // 🟢 Crear nueva mascota
        const token = localStorage.getItem("token");
        const respuestaServidor = await fetch("/api/mascotas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataMascota)
        });

        const data = await respuestaServidor.json();

        if (respuestaServidor.ok) {
            alert(`Mascota ${data.nombre} creada con éxito`);
            getMascotas();
        }
    }

    // Limpiar formulario
    $nombre.value = "";
    $tipo.value = "";
    $edad.value = "";
    $raza.value = "";
});




//borrar mascota
const borrarMascota = async (id) => {

    if (!confirm("¿Seguro que querés borrar esta mascota?")) return;
    const token = localStorage.getItem("token");
    console.log('Token en borrar mascota:', token)

    const respuestaServidor = await fetch(`/api/mascotas/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (respuestaServidor.ok) {
        alert("Mascota eliminada");
        getMascotas();
    } else {
        alert("Error al borrar");
    }
};



//actualizar mascota
const actualizarMascota = async (id) => {

    const respuestaServidor = await fetch(`/api/mascotas/${id}`,);
    const mascota = await respuestaServidor.json();

    // Cargar datos en el formulario
    $nombre.value = mascota.nombre;
    $tipo.value = mascota.tipo;
    $edad.value = mascota.edad;
    $raza.value = mascota.raza;

    mascotaEditandoId = id;

    alert("Editando mascota. Modificá los datos y presioná Enviar.");
};
