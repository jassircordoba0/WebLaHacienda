import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    const depth = window.location.pathname.includes('/html/') ? '../' : '';
    window.location.href = `${depth}html/login.html`;
  }
});
