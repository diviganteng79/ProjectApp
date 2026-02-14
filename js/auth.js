import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { seedUsersIfNeeded, findUserByKta, ktaToEmail, setUserPasswordStatus } from "./store.js";

function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function markPasswordStatus(kta) {
  try {
    await setUserPasswordStatus(kta, true);
  } catch (error) {
    console.warn("Gagal menyimpan status hasPassword:", error);
  }
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
      const methods = await fetchSignInMethodsForEmail(auth, ktaToEmail(kta));
      if (!methods.length) {
        alert("Akun KTA ini belum memiliki kata sandi. Silakan buat kata sandi dulu.");
        sessionStorage.setItem("pending_kta", kta);
        location.href = "set-password.html";
        return;
      }
      alert("Password salah. Silakan coba lagi.");
      return;
    }
    alert("Gagal login: " + e.message);
    return;
  }

  await markPasswordStatus(kta);

  sessionStorage.removeItem("pending_kta");
  localStorage.setItem("login", kta);
  localStorage.removeItem("guest_mode");
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
