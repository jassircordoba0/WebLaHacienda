import { auth } from "./firebase-config.js";
import { showToast } from "./utils.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast("¡Bienvenido!", "success");
    setTimeout(() => { window.location.href = "/index.html"; }, 800);
  } catch {
    showToast("Correo o contraseña incorrectos", "error");
  }
});
