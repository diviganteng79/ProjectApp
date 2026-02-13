import { auth } from "./firebase.js";
import { fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { seedUsersIfNeeded, findUserByKta, ktaToEmail } from "./store.js";

const DEV_KTA = "0812180001";

function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function initKtaCheck() {
  try {
    await seedUsersIfNeeded();
    setHint("Masukkan nomor KTA untuk lanjut, atau masuk sebagai tamu.");
  } catch (error) {
    console.error(error);
    alert(error.message || "Gagal menyiapkan data KTA.");
    setHint("Gagal mengakses database. Cek Rules Firestore Anda.");
  }
}

async function checkKta() {
  const kta = (document.getElementById("ktaCheck").value || "").trim();
  if (!kta) return alert("Isi nomor KTA terlebih dahulu");

  try {
    const user = await findUserByKta(kta);
    const methods = await fetchSignInMethodsForEmail(auth, ktaToEmail(kta));
    const isDevAuthOnly = kta === DEV_KTA && methods.length > 0;

    if (!user && !isDevAuthOnly) {
      alert("Nomor KTA belum terdaftar");
      setHint("Nomor KTA belum terdaftar oleh developer.");
      return;
    }

    localStorage.removeItem("guest_mode");
    sessionStorage.setItem("pending_kta", kta);
    location.href = methods.length ? "login.html" : "set-password.html";
  } catch (error) {
    console.error(error);
    alert(error.message || "Gagal memeriksa nomor KTA.");
    setHint("Gagal mengakses database. Cek Rules Firestore Anda.");
  }
}

function masukSebagaiTamu() {
  localStorage.removeItem("login");
  localStorage.setItem("guest_mode", "1");
  sessionStorage.removeItem("pending_kta");
  location.href = "dashboard.html";
}

window.checkKta = checkKta;
window.masukSebagaiTamu = masukSebagaiTamu;
initKtaCheck();
