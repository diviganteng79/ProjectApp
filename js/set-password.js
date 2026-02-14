import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { seedUsersIfNeeded, findUserByKta, ktaToEmail, setUserPasswordStatus } from "./store.js";

function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

function getPendingKta() {
  return (sessionStorage.getItem("pending_kta") || "").trim();
}

async function markPasswordStatus(kta) {
  try {
    await setUserPasswordStatus(kta, true);
  } catch (error) {
    // Jangan blokir alur pengguna jika update Firestore ditolak oleh rules.
    console.warn("Gagal menyimpan status hasPassword:", error);
  }
}

async function initSetPassword() {
  try {
    await seedUsersIfNeeded();
    const kta = getPendingKta();
    if (!kta || !(await findUserByKta(kta))) {
      alert("Nomor KTA belum dipilih. Silakan cek KTA dulu.");
      location.href = "index.html";
      return;
    }
    setHint("Buat kata sandi untuk KTA: " + kta);
  } catch (error) {
    console.error(error);
    alert(error.message || "Gagal menyiapkan halaman buat kata sandi.");
    setHint("Terjadi kendala saat mengakses data. Cek Rules Firestore.");
  }
}

async function createPassword() {
   if (p1 !== p2) return alert("Ulangi kata sandi tidak sama");

  try {
    const email = ktaToEmail(kta);
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length) {
      alert("Kata sandi sudah dibuat sebelumnya. Silakan login.");
      location.href = "login.html";
      return;
    }

    await createUserWithEmailAndPassword(auth, email, p1);
    alert("Kata sandi berhasil dibuat. Silakan login.");
    location.href = "login.html";
  } catch (error) {
    console.error(error);
    if (error?.code === "auth/weak-password") {
      alert("Kata sandi terlalu lemah. Gunakan minimal 6 karakter.");
      return;
    }
    if (error?.code === "auth/email-already-in-use") {
      alert("Kata sandi sudah pernah dibuat. Silakan login.");
      location.href = "login.html";
      return;
    }
    if (error?.code === "auth/operation-not-allowed") {
      alert("Metode Email/Password belum aktif di Firebase Authentication. Aktifkan di Sign-in method.");
      return;
    }
    if (error?.code === "auth/network-request-failed") {
      alert("Gagal terhubung ke Firebase. Periksa koneksi internet Anda.");
      return;
    }
    alert(error.message || "Gagal menyimpan kata sandi.");
  }
}

window.createPassword = createPassword;
initSetPassword();
