import { seedUsersIfNeeded, findUserByKta } from "./store.js";

async function initProfile() {
  await seedUsersIfNeeded();
  const kta = localStorage.getItem("login");
  const guest = localStorage.getItem("guest_mode") === "1";

  if (guest || !kta) {
    alert("Anda harus login untuk membuka profil.");
    location.href = "dashboard.html";
    return;
  }

  const u = await findUserByKta(kta);
  if (!u) {
    alert("Data akun tidak ditemukan");
    location.href = "index.html";
    return;
  }

  document.getElementById("foto").src = u.foto || "img/default.png";
}

function logout() {
  localStorage.removeItem("login");
  localStorage.removeItem("guest_mode");
  location.href = "index.html";
}

window.logout = logout;
initProfile();
