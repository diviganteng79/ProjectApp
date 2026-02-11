(async()=>{
import { seedUsersIfNeeded, subscribeUsers } from "./store.js";
 const kta=localStorage.getItem("login");

 if(!kta) location.href="index.html";
function toggleDevActions() {
 const r=await fetch("data/kta.json");
  const kta = localStorage.getItem("login");
 const d=await r.json();
  const el = document.getElementById("devActions");
 let h="<tr><th>No</th><th>Nama</th><th>Status</th><th>KTA</th></tr>";
  if (!el) return;
 d.forEach((u,i)=>{
  el.style.display = kta === "0812180001" ? "block" : "none";
  h+=`<tr><td>${i+1}</td><td>${u.nama}</td><td>${u.status}</td><td>${u.no_kta}</td></tr>`;
}
 });

 list.innerHTML=h;
function renderTable(d) {
})();
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
