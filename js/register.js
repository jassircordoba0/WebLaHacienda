import { auth } from "./firebase-config.js";
import { showToast } from "./utils.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email           = document.getElementById("email").value.trim();
  const password        = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showToast("Las contraseñas no coinciden", "error");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showToast("Cuenta creada correctamente", "success");
    setTimeout(() => { window.location.href = "/html/login.html"; }, 1000);
  } catch {
    showToast("Error al registrar. Verifica los datos.", "error");
  }
});
