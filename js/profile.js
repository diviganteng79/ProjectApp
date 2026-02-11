import { seedUsersIfNeeded, findUserByKta } from "./store.js";

async function initProfile() {
  await seedUsersIfNeeded();
  const kta = localStorage.getItem("login");
  if (!kta) {
    location.href = "index.html";
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
  location.href = "index.html";
}

window.logout = logout;
initProfile();
