import { auth } from "./firebase-config.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// FORM
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async(e) => {

    e.preventDefault();

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Inicio de sesión exitoso");

        window.location.href = "index.html";

    }catch(error){

        alert("Correo o contraseña incorrectos");

        console.log(error);

    }

});