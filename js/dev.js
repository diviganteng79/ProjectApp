import { seedUsersIfNeeded, upsertUser, subscribeUsers } from "./store.js";

function ensureDev() {
  const kta = localStorage.getItem("login");
  if (kta !== "0812180001") location.href = "index.html";
}

function renderDevList(users) {
  let h = "<tr><th>No</th><th>KTA</th><th>Nama</th><th>Status</th><th>Join</th></tr>";
  users.forEach((u, i) => {
    h += `<tr><td>${i + 1}</td><td>${u.no_kta}</td><td>${u.nama || "-"}</td><td>${u.status || "-"}</td><td>${u.join || "-"}</td></tr>`;
  });
  document.getElementById("devList").innerHTML = h;
}

async function buat() {
  const no = document.getElementById("no").value.trim();
  const nama = document.getElementById("nama").value.trim();
  const status = document.getElementById("status").value.trim();
  const join = document.getElementById("join").value.trim();

  if (!no || !nama) {
    alert("Nomor KTA dan nama wajib diisi");
    return;
  }

  const d = { no_kta: no, nama, status, join, foto: "img/default.png" };
  await upsertUser(d);
  document.getElementById("out").textContent = JSON.stringify(d, null, 2);
  alert("Data berhasil disimpan ke database global.");
}

async function initDevPage() {
  ensureDev();
  await seedUsersIfNeeded();
  subscribeUsers(renderDevList);
}

window.buat = buat;
initDevPage();
