// script.js — funções comuns usando Firestore (v10 modular)
import {
  collection, addDoc, getDocs, doc, getDoc,
  updateDoc, deleteDoc, onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { db, auth } from "./firebase-config.js";

/* Helpers visuais */
export function toastSuccess(title, text){
  if (window.Swal) Swal.fire({ icon: "success", title, text, timer: 1500, showConfirmButton:false });
  else alert(title + " — " + (text||""));
}
export function toastError(title, text){
  if (window.Swal) Swal.fire({ icon: "error", title, text }); else alert(title + " — " + (text||""));
}

/* Login */
export async function login(email, password){
  try{
    await signInWithEmailAndPassword(auth, email, password);
    toastSuccess("Login efetuado", "Redirecionando...");
    return true;
  }catch(err){
    toastError("Erro no login", err.message);
    return false;
  }
}

/* Logout */
export function logout(){
  signOut(auth).then(()=> window.location.href = "index.html");
}

/* Registrar Ferramental (Firestore) */
export async function registrarFerramental(data){
  try{
    const col = collection(db, "ferramentais");
    const r = await addDoc(col, data);
    toastSuccess("Registrado", "Ferramental cadastrado com sucesso.");
    return r.id;
  }catch(err){
    toastError("Erro ao registrar", err.message);
    return null;
  }
}

/* Buscar todos (snapshot -> array) */
export async function buscarTodos(){
  const col = collection(db, "ferramentais");
  const q = query(col, orderBy("dataRegistro", "desc"));
  const snap = await getDocs(q);
  const arr = [];
  snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
  return arr;
}

/* Buscar por id */
export async function buscarPorId(id){
  const d = await getDoc(doc(db, "ferramentais", id));
  if (!d.exists()) return null;
  return { id: d.id, ...d.data() };
}

/* Atualizar */
export async function atualizarFerramental(id, payload){
  try{
    await updateDoc(doc(db, "ferramentais", id), payload);
    toastSuccess("Atualizado", "Registro atualizado com sucesso.");
    return true;
  }catch(err){ toastError("Erro ao atualizar", err.message); return false; }
}

/* Remover */
export async function removerFerramental(id){
  try{
    await deleteDoc(doc(db, "ferramentais", id));
    toastSuccess("Removido", "Registro excluído.");
    return true;
  }catch(err){ toastError("Erro ao excluir", err.message); return false; }
}

/* Observador em tempo real para dashboard */
export function onFerramentaisChange(cb){
  const col = collection(db, "ferramentais");
  const q = query(col, orderBy("dataRegistro", "desc"));
  return onSnapshot(q, snapshot => {
    const arr = [];
    snapshot.forEach(d => arr.push({ id: d.id, ...d.data() }));
    cb(arr);
  }, err => console.error("onSnapshot error:", err));
}
