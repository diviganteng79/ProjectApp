import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { seedUsersIfNeeded, findUserByKta, ktaToEmail } from "./store.js";

function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function initLoginForm() {
  await seedUsersIfNeeded();
  const pendingKta = (sessionStorage.getItem("pending_kta") || "").trim();
  if (pendingKta) {
    document.getElementById("kta").value = pendingKta;
  }
  setHint("Masukkan nomor KTA dan kata sandi.");
}

async function login() {
  const kta = (document.getElementById("kta").value || "").trim();
  const pass = document.getElementById("pass").value;

  if (!kta) return alert("Isi nomor KTA");
  if (!pass) return alert("Isi kata sandi");

  const user = await findUserByKta(kta);
  if (!user) return alert("KTA tidak terdaftar");

  try {
    await signInWithEmailAndPassword(auth, ktaToEmail(kta), pass);
  } catch (e) {
    if (e.code === "auth/invalid-credential") {
      alert("Password salah / akun belum dibuat");
      return;
    }
    alert("Gagal login: " + e.message);
    return;
  }

  sessionStorage.removeItem("pending_kta");
  localStorage.setItem("login", kta);
  location.href = kta === "0812180001" ? "dev.html" : "dashboard.html";
}

function reset() {
  const kta = prompt("Nomor KTA");
  const p = prompt("Pesan");
  if (!kta || !p) return;
  location.href =
    "mailto:diviganteng79@gmail.com?subject=Reset Sandi&body=No KTA:" +
    encodeURIComponent(kta) +
    "%0A" +
    encodeURIComponent(p);
}

window.login = login;
window.reset = reset;
initLoginForm();
