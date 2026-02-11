import { auth } from "./firebase.js";
import { fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { seedUsersIfNeeded, findUserByKta, ktaToEmail } from "./store.js";

function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function initKtaCheck() {
  await seedUsersIfNeeded();
  setHint("Masukkan nomor KTA untuk lanjut.");
}

async function checkKta() {
  const kta = (document.getElementById("ktaCheck").value || "").trim();
  if (!kta) return alert("Isi nomor KTA terlebih dahulu");

  const user = await findUserByKta(kta);
  if (!user) {
    alert("Nomor KTA belum terdaftar");
    setHint("Nomor KTA belum terdaftar oleh developer.");
    return;
  }

  sessionStorage.setItem("pending_kta", kta);
  const methods = await fetchSignInMethodsForEmail(auth, ktaToEmail(kta));
  location.href = methods.length ? "login.html" : "set-password.html";
}

window.checkKta = checkKta;
initKtaCheck();
