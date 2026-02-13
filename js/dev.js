import { seedUsersIfNeeded, upsertUser, subscribeUsers, findUserByKta } from "./store.js";

function ensureDev() {
  const kta = localStorage.getItem("login");
  if (kta !== "0812180001") location.href = "index.html";
}

function readImageAsDataUrl(fileInput) {
  return new Promise((resolve, reject) => {
    const file = fileInput?.files?.[0];
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Gagal membaca file foto."));
    reader.readAsDataURL(file);
  });
}

function renderDevList(users) {
  let h = "<tr><th>No</th><th>KTA</th><th>Nama</th><th>Status</th><th>Join</th><th>Foto</th></tr>";
  users.forEach((u, i) => {
    h += `<tr><td>${i + 1}</td><td>${u.no_kta}</td><td>${u.nama || "-"}</td><td>${u.status || "-"}</td><td>${u.join || "-"}</td><td><img src="${
      u.foto || "img/default.png"
    }" width="48" height="64" style="object-fit:cover;"></td></tr>`;
  });
  document.getElementById("devList").innerHTML = h;
}

async function buat() {
  const no = document.getElementById("no").value.trim();
  const nama = document.getElementById("nama").value.trim();
  const status = document.getElementById("status").value.trim();
  const join = document.getElementById("join").value.trim();
  const fotoData = await readImageAsDataUrl(document.getElementById("fotoFile"));

  if (!no || !nama) {
    alert("Nomor KTA dan nama wajib diisi");
    return;
  }

  const d = { no_kta: no, nama, status, join, foto: fotoData || "img/default.png" };
  await upsertUser(d);
  document.getElementById("out").textContent = JSON.stringify(d, null, 2);
  alert("Data berhasil disimpan ke database global.");
}

async function gantiFotoUser() {
  const targetKta = document.getElementById("targetKta").value.trim();
  const fotoData = await readImageAsDataUrl(document.getElementById("targetFotoFile"));

  if (!targetKta) {
    alert("Isi nomor KTA target.");
    return;
  }

  if (!fotoData) {
    alert("Pilih foto dari galeri terlebih dahulu.");
    return;
  }

  const existing = await findUserByKta(targetKta);
  if (!existing) {
    alert("User dengan nomor KTA tersebut tidak ditemukan.");
    return;
  }

  await upsertUser({ ...existing, foto: fotoData });
  alert("Foto profil user berhasil diperbarui.");
}

async function initDevPage() {
  ensureDev();
  await seedUsersIfNeeded();
  subscribeUsers(renderDevList);
}

window.buat = buat;
window.gantiFotoUser = gantiFotoUser;
initDevPage();
