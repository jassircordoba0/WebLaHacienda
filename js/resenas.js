import { db } from "./firebase-config.js";
import { showToast } from "./utils.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ===============================
// MODAL
// ===============================

const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const cerrarModal = document.getElementById("cerrarModal");

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

const estrellas = document.querySelectorAll(".estrella");
let calificacionSeleccionada = 0;

estrellas.forEach((estrella, index) => {
    estrella.addEventListener("click", () => {
        calificacionSeleccionada = index + 1;
        actualizarEstrellas(calificacionSeleccionada);
    });

    estrella.addEventListener("mouseover", () => {
        actualizarEstrellas(index + 1);
    });

    estrella.addEventListener("mouseout", () => {
        actualizarEstrellas(calificacionSeleccionada);
    });
});

function actualizarEstrellas(cantidad) {
    estrellas.forEach((estrella, index) => {
        estrella.classList.toggle("activa", index < cantidad);
    });
}


// ===============================
// GUARDAR RESEÑA
// ===============================

const formResena = document.getElementById("formResena");

formResena.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreResena").value.trim();
    const comentario = document.getElementById("comentarioResena").value.trim();

    if (calificacionSeleccionada === 0) {
        showToast("Selecciona una calificación", "error");
        return;
    }

    try {
        await push(ref(db, "resenas"), {
            nombre,
            comentario,
            estrellas: calificacionSeleccionada,
            fecha: new Date().toISOString()
        });

        showToast("Reseña enviada correctamente", "success");

        formResena.reset();
        calificacionSeleccionada = 0;
        actualizarEstrellas(0);
        modal.style.display = "none";

    } catch (error) {
        console.error(error);
        showToast("Error al guardar la reseña", "error");
    }
});


// ===============================
// MOSTRAR RESEÑAS
// ===============================

const contenedorResenas = document.getElementById("contenedorResenas");

onValue(ref(db, "resenas"), (snapshot) => {
    contenedorResenas.innerHTML = "";

    if (!snapshot.exists()) {
        const p = document.createElement("p");
        p.textContent = "No hay reseñas todavía.";
        contenedorResenas.appendChild(p);
        return;
    }

    snapshot.forEach((child) => {
        const resena = child.val();

        // Clamp estrellas 1-5 para evitar loops maliciosos
        const numEstrellas = Math.min(Math.max(parseInt(resena.estrellas) || 0, 0), 5);

        const card = document.createElement("div");
        card.className = "card-resena";

        const usuario = document.createElement("div");
        usuario.className = "usuario";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-user";

        const h3 = document.createElement("h3");
        h3.textContent = resena.nombre;

        usuario.appendChild(icon);
        usuario.appendChild(h3);

        const estrellasDiv = document.createElement("div");
        estrellasDiv.className = "estrellas";
        estrellasDiv.textContent = "★".repeat(numEstrellas);

        const p = document.createElement("p");
        p.textContent = resena.comentario;

        const span = document.createElement("span");
        span.textContent = "❞";

        card.appendChild(usuario);
        card.appendChild(estrellasDiv);
        card.appendChild(p);
        card.appendChild(span);
        contenedorResenas.appendChild(card);
    });
});
