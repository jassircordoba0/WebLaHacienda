import { db }
from "./firebase-config.js";

import {
    ref,
    push,
    onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ===============================
// MODAL
// ===============================

const modal =
document.getElementById("modal");

const abrirModal =
document.getElementById("abrirModal");

const cerrarModal =
document.getElementById("cerrarModal");

abrirModal.addEventListener("click", () => {

    modal.style.display = "flex";

});

cerrarModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});


// ===============================
// ESTRELLAS
// ===============================

const estrellas =
document.querySelectorAll(".estrella");

let calificacionSeleccionada = 0;

estrellas.forEach((estrella, index) => {

    estrella.addEventListener("click", () => {

        calificacionSeleccionada = index + 1;

        actualizarEstrellas(
            calificacionSeleccionada
        );

    });

    estrella.addEventListener("mouseover", () => {

        actualizarEstrellas(index + 1);

    });

    estrella.addEventListener("mouseout", () => {

        actualizarEstrellas(
            calificacionSeleccionada
        );

    });

});

function actualizarEstrellas(cantidad) {

    estrellas.forEach((estrella, index) => {

        if (index < cantidad) {

            estrella.classList.add("activa");

        } else {

            estrella.classList.remove("activa");

        }

    });

}


// ===============================
// GUARDAR RESEÑA
// ===============================

const formResena =
document.getElementById("formResena");

formResena.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const nombre =
        document.getElementById(
            "nombreResena"
        ).value;

        const comentario =
        document.getElementById(
            "comentarioResena"
        ).value;

        if (
            calificacionSeleccionada === 0
        ) {

            alert(
                "Selecciona una calificación"
            );

            return;

        }

        try {

            await push(
                ref(db, "resenas"),
                {
                    nombre,
                    comentario,
                    estrellas:
                        calificacionSeleccionada,
                    fecha:
                        new Date().toISOString()
                }
            );

            alert(
                "Reseña enviada correctamente"
            );

            formResena.reset();

            calificacionSeleccionada = 0;

            actualizarEstrellas(0);

            modal.style.display = "none";

        } catch (error) {

            console.error(error);

            alert(
                "Error al guardar la reseña"
            );

        }

    }
);


// ===============================
// MOSTRAR RESEÑAS
// ===============================

const contenedorResenas =
document.getElementById(
    "contenedorResenas"
);

onValue(
    ref(db, "resenas"),
    (snapshot) => {

        contenedorResenas.innerHTML = "";

        if (!snapshot.exists()) {

            contenedorResenas.innerHTML =
                "<p>No hay reseñas todavía.</p>";

            return;

        }

        snapshot.forEach((child) => {

            const resena =
            child.val();

            let estrellasHTML = "";

            for (
                let i = 0;
                i < resena.estrellas;
                i++
            ) {

                estrellasHTML += "★";

            }

            contenedorResenas.innerHTML += `

            <div class="card-resena">

                <div class="usuario">

                    <i class="fa-solid fa-user"></i>

                    <h3>${resena.nombre}</h3>

                </div>

                <div class="estrellas">
                    ${estrellasHTML}
                </div>

                <p>
                    ${resena.comentario}
                </p>

                <span>❞</span>

            </div>

            `;

        });

    }
);