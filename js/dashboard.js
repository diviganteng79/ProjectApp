(async()=>{
 const kta=localStorage.getItem("login");
 if(!kta) location.href="index.html";
 const r=await fetch("data/kta.json");
 const d=await r.json();
 let h="<tr><th>No</th><th>Nama</th><th>Status</th><th>KTA</th></tr>";
 d.forEach((u,i)=>{
  h+=`<tr><td>${i+1}</td><td>${u.nama}</td><td>${u.status}</td><td>${u.no_kta}</td></tr>`;
 });
 list.innerHTML=h;
})();
async function renderDashboard() {
  await seedUsersIfNeeded();
  const kta = localStorage.getItem("login");
  if (!kta) {
    location.href = "index.html";
    return;
  }

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
