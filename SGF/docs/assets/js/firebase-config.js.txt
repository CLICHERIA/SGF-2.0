// firebase-config.js (Firestore + Auth) — coloque suas credenciais aqui
// ATENÇÃO: substitua os valores entre <> pelos de seu projeto Firebase.
// Você pode copiar (somente) os valores do console Firebase > Configurações do Projeto.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

/* === 1) Substitua estas chaves com as suas (do Firebase console) ===
const firebaseConfig = {
  apiKey: "AIzaSyAAMyXl5uWSWYNAy-qZBy3N3yU84mdS73w",
  authDomain: "dacsovel-53481.firebaseapp.com",
  projectId: "dacsovel-53481",
  storageBucket: "dacsovel-53481.firebasestorage.app",
  messagingSenderId: "37867522513",
  appId: "1:37867522513:web:336d687e3fc8408bd138f0",
};
==================================================================== */

/* === Exemplo (apenas referência — NÃO comite credenciais sensíveis) ===
const firebaseConfig = {
  apiKey: "AIzaSyAAMyXl5uWSWYNAy-... (EXEMPLO)",
  authDomain: "dacsovel-53481.firebaseapp.com",
  projectId: "dacsovel-53481",
  storageBucket: "dacsovel-53481.appspot.com",
  messagingSenderId: "37867522513",
  appId: "1:37867522513:web:336d687e3fc8408bd138f0"
};
==================================================================== */

/* ====== Coloque o objeto real aqui ====== */
const firebaseConfig = {
  apiKey: "<COLE_AQUI>",
  authDomain: "<COLE_AQUI>",
  projectId: "<COLE_AQUI>",
  storageBucket: "<COLE_AQUI>",
  messagingSenderId: "<COLE_AQUI>",
  appId: "<COLE_AQUI>"
};
/* ======================================= */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
