// servicios.js — Muestra una sección a la vez como tabs

const secciones = document.querySelectorAll(".seccion-servicio");
const items     = document.querySelectorAll(".item-lateral");

function mostrar(id) {
    secciones.forEach((s) => s.classList.toggle("visible", s.id === id));
    items.forEach((i) => i.classList.toggle("activo", i.dataset.target === id));
}

items.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        mostrar(item.dataset.target);
    });
});

// Mostrar la primera sección al cargar
mostrar(secciones[0].id);
