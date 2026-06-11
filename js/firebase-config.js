import { initializeApp }                        from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, setPersistence,
         browserLocalPersistence }              from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase }                          from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCrgw6Cs0H-GYBUkbWkdN16C8iIx3uwIIU",
  authDomain:        "haciendaesteli.firebaseapp.com",
  projectId:         "haciendaesteli",
  storageBucket:     "haciendaesteli.firebasestorage.app",
  messagingSenderId: "971452789344",
  appId:             "1:971452789344:web:a93a4ea6b711ab78a84905",
  measurementId:     "G-3YK0ZZ3YXP"
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getDatabase(app);

// Sesión persiste aunque se cierre el navegador
setPersistence(auth, browserLocalPersistence);
