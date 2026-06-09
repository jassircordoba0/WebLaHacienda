

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrgw6Cs0H-GYBUkbWkdN16C8iIx3uwIIU",
  authDomain: "haciendaesteli.firebaseapp.com",
  projectId: "haciendaesteli",
  storageBucket: "haciendaesteli.firebasestorage.app",
  messagingSenderId: "971452789344",
  appId: "1:971452789344:web:a93a4ea6b711ab78a84905",
  measurementId: "G-3YK0ZZ3YXP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);

export { auth, db };