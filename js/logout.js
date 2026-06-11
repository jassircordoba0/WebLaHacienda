import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btnLogout = document.getElementById("btnLogout");

btnLogout?.addEventListener("click", async () => {
  try { await signOut(auth); } catch { /* ignorar error de red */ }
  window.location.href = "/html/login.html";
});
