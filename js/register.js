import { auth } from "./firebase-config.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// FORM
const registerForm =
document.getElementById("registerForm");

registerForm.addEventListener("submit", async(e) => {

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    // VALIDAR
    if(password !== confirmPassword){

        alert("Las contraseñas no coinciden");

        return;

    }

    try{

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Cuenta creada correctamente");

        window.location.href = "html/login.html";

    }catch(error){

        alert("Error al registrar usuario");

        console.log(error);

    }

});