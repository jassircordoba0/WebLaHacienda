import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const path    = window.location.pathname;
const enLogin = path.endsWith("login.html");
const enReg   = path.endsWith("registro.html");
const enIndex = path.endsWith("index.html") || path.endsWith("/");
const prefijo = path.includes("/html/") ? "../" : "";

onAuthStateChanged(auth, (user) => {
    if (user && (enLogin || enReg)) {
        // Ya tiene sesión → no mostrar login/registro
        window.location.href = `${prefijo}index.html`;
        return;
    }

    if (!user && !enLogin && !enReg && !enIndex) {
        // Sin sesión en página protegida (no es index) → ir al login
        window.location.href = `${prefijo}html/login.html`;
        return;
    }

    if (enIndex) {
        const bannerCta  = document.getElementById("bannerCta");
        const btnLogout  = document.getElementById("btnLogout");
        const navItems   = document.querySelectorAll(".nav-group");
        const modalLogin = document.getElementById("modalLogin");
        const cerrarModal = document.getElementById("cerrarModalLogin");
        const btnVerServicios = document.getElementById("btnVerServicios");
        const btnVerMenu     = document.getElementById("btnVerMenu");

        // Cerrar modal
        cerrarModal?.addEventListener("click", () => modalLogin.classList.add("oculto"));
        modalLogin?.addEventListener("click", (e) => {
            if (e.target === modalLogin) modalLogin.classList.add("oculto");
        });

        if (user) {
            bannerCta?.classList.add("oculto");
            btnLogout?.classList.remove("oculto");
            navItems.forEach(el => el.classList.remove("oculto"));

            // Con sesión: navegar directo
            btnVerServicios?.addEventListener("click", () => { window.location.href = "html/servicios.html"; });
            btnVerMenu?.addEventListener("click",      () => { window.location.href = "html/menu.html"; });
        } else {
            bannerCta?.classList.remove("oculto");
            btnLogout?.classList.add("oculto");
            navItems.forEach(el => el.classList.add("oculto"));

            // Sin sesión: mostrar modal de aviso
            btnVerServicios?.addEventListener("click", () => modalLogin.classList.remove("oculto"));
            btnVerMenu?.addEventListener("click",      () => modalLogin.classList.remove("oculto"));
        }
    }
});
