import { db }
from "./firebase-config.js";

import {
    ref,
    onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const contenedorMenu =
document.getElementById("contenedorMenu");

const botonesFiltro =
document.querySelectorAll(".filtro");

let menuCompleto = [];

let filtroActual = "all";


// ======================
// CARGAR MENU FIREBASE
// ======================

onValue(
    ref(db, "menu"),
    (snapshot) => {

        menuCompleto = [];

        snapshot.forEach((child) => {

            menuCompleto.push({

                id: child.key,

                ...child.val()

            });

        });

        renderizarMenu();

    }
);


// ======================
// FILTROS
// ======================

botonesFiltro.forEach((boton) => {

    boton.addEventListener("click", () => {

        botonesFiltro.forEach((btn) => {

            btn.classList.remove("active");

        });

        boton.classList.add("active");

        filtroActual =
        boton.dataset.filter;

        renderizarMenu();

    });

});


// ======================
// RENDER MENU
// ======================

function renderizarMenu(){

    contenedorMenu.innerHTML = "";

    const productosFiltrados =
    filtroActual === "all"

    ? menuCompleto

    : menuCompleto.filter(

        item =>
        item.categoria === filtroActual

    );

    productosFiltrados.forEach((item) => {

        contenedorMenu.innerHTML += `

        <div class="card-menu">

            <img
            src="${item.imagen}"
            alt="${item.nombre}">

            <div class="contenido-card">

                <h3>${item.nombre}</h3>

                <span>C$${item.precio}</span>

                <button
                class="btnDetalle"
                data-id="${item.id}">
                    Ver detalles →
                </button>

            </div>

        </div>

        `;

    });

    activarDetalles();

}


// ======================
// MODAL DETALLE
// ======================

const modalDetalle =
document.getElementById("modalDetalle");

const cerrarDetalle =
document.getElementById("cerrarDetalle");

cerrarDetalle.addEventListener("click", () => {

    modalDetalle.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === modalDetalle){

        modalDetalle.style.display = "none";

    }

});


// ======================
// ABRIR DETALLE
// ======================

function activarDetalles(){

    document
    .querySelectorAll(".btnDetalle")
    .forEach((btn) => {

        btn.addEventListener("click", () => {

            const id =
            btn.dataset.id;

            const producto =
            menuCompleto.find(

                item => item.id === id

            );

            document.getElementById(
                "detalleImagen"
            ).src = producto.imagen;

            document.getElementById(
                "detalleNombre"
            ).textContent =
            producto.nombre;

            document.getElementById(
                "detallePrecio"
            ).textContent =
            `C$${producto.precio}`;

            document.getElementById(
                "detalleDescripcion"
            ).textContent =
            producto.descripcion;

            document.getElementById(
                "detalleIngredientes"
            ).textContent =
            producto.ingredientes;

            modalDetalle.style.display =
            "flex";

        });

    });

}