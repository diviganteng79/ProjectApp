import { seedUsersIfNeeded, subscribeUsers } from "./store.js";

function isGuestMode() {
  return localStorage.getItem("guest_mode") === "1";
}

function toggleDevActions() {
  const kta = localStorage.getItem("login");
  const el = document.getElementById("devActions");
  if (!el) return;
  el.style.display = kta === "0812180001" ? "block" : "none";
}

function setupGuestProfilePrompt() {
  const profileLink = document.getElementById("profileLink");
  const prompt = document.getElementById("guestPrompt");
  const loginBtn = document.getElementById("guestLoginBtn");
  const cancelBtn = document.getElementById("guestCancelBtn");

  if (!profileLink || !prompt || !loginBtn || !cancelBtn) return;

  profileLink.addEventListener("click", (event) => {
    if (!isGuestMode()) return;
    event.preventDefault();
    prompt.style.display = "block";
  });

  loginBtn.addEventListener("click", () => {
    localStorage.removeItem("guest_mode");
    location.href = "index.html";
  });

  cancelBtn.addEventListener("click", () => {
    prompt.style.display = "none";
  });
}

function renderTable(d) {
  let h = "<tr><th>No</th><th>Nama</th><th>Status</th><th>KTA</th><th>Join</th></tr>";
  d.forEach((u, i) => {
    h += `<tr><td>${i + 1}</td><td>${u.nama || "-"}</td><td>${u.status || "-"}</td><td>${u.no_kta}</td><td>${u.join || "-"}</td></tr>`;
  });
  list.innerHTML = h;
}

async function initDashboard() {
  await seedUsersIfNeeded();
  const kta = localStorage.getItem("login");
  if (!kta && !isGuestMode()) {
    location.href = "index.html";
    return;
  }

  toggleDevActions();
  setupGuestProfilePrompt();
  subscribeUsers(renderTable);
}

initDashboard();
