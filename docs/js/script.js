// script.js — versão compatível com GitHub Pages (sem import/export)

// --- Inicialização Firebase (substitua se necessário) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, getDoc,
  updateDoc, deleteDoc, doc, query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// Configuração do Firebase (substitua pela sua)
const firebaseConfig = {
  apiKey: "AIzaSyAAMyXl5uWSWYNAy-... (EXEMPLO)",
  authDomain: "dacsovel-53481.firebaseapp.com",
  projectId: "dacsovel-53481",
  storageBucket: "dacsovel-53481.appspot.com",
  messagingSenderId: "37867522513",
  appId: "1:37867522513:web:336d687e3fc8408bd138f0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- Helpers visuais ---
function toastSuccess(title, text) {
  if (window.Swal)
    Swal.fire({ icon: "success", title, text, timer: 1500, showConfirmButton: false });
  else alert(title + " — " + (text || ""));
}

function toastError(title, text) {
  if (window.Swal) Swal.fire({ icon: "error", title, text });
  else alert(title + " — " + (text || ""));
}

// --- Login / Logout ---
async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toastSuccess("Login efetuado", "Redirecionando...");
    return true;
  } catch (err) {
    toastError("Erro no login", err.message);
    return false;
  }
}

function logout() {
  signOut(auth).then(() => window.location.href = "index.html");
}

// --- CRUD: Ferramentais ---
async function registrarFerramental(data) {
  try {
    const col = collection(db, "ferramentais");
    const r = await addDoc(col, data);
    toastSuccess("Registrado", "Ferramental cadastrado com sucesso.");
    return r.id;
  } catch (err) {
    toastError("Erro ao registrar", err.message);
    return null;
  }
}

async function buscarTodos() {
  try {
    const col = collection(db, "ferramentais");
    const q = query(col, orderBy("dataRegistro", "desc"));
    const snap = await getDocs(q);
    const arr = [];
    snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
    return arr;
  } catch (err) {
    console.error("Erro ao buscar todos:", err);
    throw err;
  }
}

async function buscarPorId(id) {
  try {
    const d = await getDoc(doc(db, "ferramentais", id));
    if (!d.exists()) return null;
    return { id: d.id, ...d.data() };
  } catch (err) {
    console.error("Erro ao buscar por ID:", err);
    throw err;
  }
}

async function atualizarFerramental(id, payload) {
  try {
    await updateDoc(doc(db, "ferramentais", id), payload);
    toastSuccess("Atualizado", "Registro atualizado com sucesso.");
    return true;
  } catch (err) {
    toastError("Erro ao atualizar", err.message);
    return false;
  }
}

async function removerFerramental(id) {
  try {
    await deleteDoc(doc(db, "ferramentais", id));
    toastSuccess("Removido", "Registro excluído.");
    return true;
  } catch (err) {
    toastError("Erro ao excluir", err.message);
    return false;
  }
}

function onFerramentaisChange(cb) {
  const col = collection(db, "ferramentais");
  const q = query(col, orderBy("dataRegistro", "desc"));
  return onSnapshot(q, snapshot => {
    const arr = [];
    snapshot.forEach(d => arr.push({ id: d.id, ...d.data() }));
    cb(arr);
  }, err => console.error("onSnapshot error:", err));
}

// Torna todas as funções globais (acessíveis pelo consultar.html)
window.db = db;
window.auth = auth;
window.login = login;
window.logout = logout;
window.buscarTodos = buscarTodos;
window.removerFerramental = removerFerramental;
window.registrarFerramental = registrarFerramental;
window.atualizarFerramental = atualizarFerramental;
window.buscarPorId = buscarPorId;
window.onFerramentaisChange = onFerramentaisChange;
window.toastSuccess = toastSuccess;
window.toastError = toastError;
