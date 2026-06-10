import { db } from "./firebase-config.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const contenedorMenu = document.getElementById("contenedorMenu");
const botonesFiltro = document.querySelectorAll(".filtro");

let menuCompleto = [];
let filtroActual = "all";


// ======================
// CARGAR MENU FIREBASE
// ======================

onValue(ref(db, "menu"), (snapshot) => {
    menuCompleto = [];
    snapshot.forEach((child) => {
        menuCompleto.push({ id: child.key, ...child.val() });
    });
    renderizarMenu();
});


// ======================
// FILTROS
// ======================

botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
        botonesFiltro.forEach((btn) => btn.classList.remove("active"));
        boton.classList.add("active");
        filtroActual = boton.dataset.filter;
        renderizarMenu();
    });
});


// ======================
// RENDER MENU
// ======================

function renderizarMenu() {
    contenedorMenu.innerHTML = "";

    const productosFiltrados = filtroActual === "all"
        ? menuCompleto
        : menuCompleto.filter(item => item.categoria === filtroActual);

    productosFiltrados.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card-menu";

        const img = document.createElement("img");
        img.src = item.imagen;
        img.alt = item.nombre;

        const contenido = document.createElement("div");
        contenido.className = "contenido-card";

        const h3 = document.createElement("h3");
        h3.textContent = item.nombre;

        const span = document.createElement("span");
        span.textContent = `C$${item.precio}`;

        const btn = document.createElement("button");
        btn.className = "btnDetalle";
        btn.textContent = "Ver detalles →";
        btn.addEventListener("click", () => abrirDetalle(item.id));

        contenido.appendChild(h3);
        contenido.appendChild(span);
        contenido.appendChild(btn);
        card.appendChild(img);
        card.appendChild(contenido);
        contenedorMenu.appendChild(card);
    });
}


// ======================
// MODAL DETALLE
// ======================

const modalDetalle = document.getElementById("modalDetalle");
const cerrarDetalle = document.getElementById("cerrarDetalle");

cerrarDetalle.addEventListener("click", () => {
    modalDetalle.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modalDetalle) {
        modalDetalle.style.display = "none";
    }
});

function abrirDetalle(id) {
    const producto = menuCompleto.find(item => item.id === id);
    if (!producto) return;

    document.getElementById("detalleImagen").src = producto.imagen;
    document.getElementById("detalleNombre").textContent = producto.nombre;
    document.getElementById("detallePrecio").textContent = `C$${producto.precio}`;
    document.getElementById("detalleDescripcion").textContent = producto.descripcion;
    document.getElementById("detalleIngredientes").textContent = producto.ingredientes;

    modalDetalle.style.display = "flex";
}
