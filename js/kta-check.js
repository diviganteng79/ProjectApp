import { auth } from "./firebase.js";
import { fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { seedUsersIfNeeded, findUserByKta, ktaToEmail } from "./store.js";

function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function initKtaCheck() {
  try {
    await seedUsersIfNeeded();
    setHint("Masukkan nomor KTA untuk lanjut.");
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
    if (!user) {
      alert("Nomor KTA belum terdaftar");
      setHint("Nomor KTA belum terdaftar oleh developer.");
      return;
    }

    sessionStorage.setItem("pending_kta", kta);
    const methods = await fetchSignInMethodsForEmail(auth, ktaToEmail(kta));
    location.href = methods.length ? "login.html" : "set-password.html";
  } catch (error) {
    console.error(error);
    alert(error.message || "Gagal memeriksa nomor KTA.");
    setHint("Gagal mengakses database. Cek Rules Firestore Anda.");
  }
}

window.checkKta = checkKta;
initKtaCheck();
