function toggleDevActions() {
  const kta = localStorage.getItem("login");
  const el = document.getElementById("devActions");
  if (!el) return;
  el.style.display = kta === "0812180001" ? "block" : "none";
}

async function renderDashboard() {
  await seedUsersIfNeeded();
  const kta = localStorage.getItem("login");
  if (!kta) {
    location.href = "index.html";
    return;
  }

  toggleDevActions();

  const d = getUsers();
  let h = "<tr><th>No</th><th>Nama</th><th>Status</th><th>KTA</th><th>Join</th></tr>";
  d.forEach((u, i) => {
    h += `<tr><td>${i + 1}</td><td>${u.nama || "-"}</td><td>${u.status || "-"}</td><td>${u.no_kta}</td><td>${u.join || "-"}</td></tr>`;
  });
  list.innerHTML = h;
}

window.addEventListener("storage", (e) => {
  if (e.key === KTA_STORAGE_KEY) renderDashboard();
});

renderDashboard();
setInterval(renderDashboard, 2000);
