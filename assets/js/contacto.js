// EFECTO REDES SOCIALES

const redes = document.querySelectorAll(".red-social");

redes.forEach(red => {

    red.addEventListener("mouseenter", () => {

        red.style.transform = "translateY(-10px) scale(1.05)";

    });

    red.addEventListener("mouseleave", () => {

        red.style.transform = "translateY(0) scale(1)";

    });

});