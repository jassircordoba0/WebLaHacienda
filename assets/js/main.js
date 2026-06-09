// main.js - Lógica JS básica para La Hacienda

document.addEventListener('DOMContentLoaded', function() {
    // Cargar el contenido HTML de la página de inicio
    fetch('../html/section-inicio.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('contenido-inicio').innerHTML = html;
            // Navegación activa
            const navItems = document.querySelectorAll('nav li');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    navItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        });
});