import { seedUsersIfNeeded, subscribeUsers } from "./store.js";

function toggleDevActions() {
  const kta = localStorage.getItem("login");
  const el = document.getElementById("devActions");
  if (!el) return;
  el.style.display = kta === "0812180001" ? "block" : "none";
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
  if (!kta) {
    location.href = "index.html";
    return;
  }

  toggleDevActions();
  subscribeUsers(renderTable);
}

initDashboard();
