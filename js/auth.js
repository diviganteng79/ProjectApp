async function login(){
 const kta=document.getElementById("kta").value;
 const pass=document.getElementById("pass").value;
 const r=await fetch("data/kta.json");
 const d=await r.json();
 const u=d.find(x=>x.no_kta===kta);
 if(!u){alert("KTA tidak terdaftar");return;}
 const s=localStorage.getItem("pass_"+kta);
 if(!s){localStorage.setItem("pass_"+kta,pass);}
 else if(s!==pass){alert("Password salah");return;}
 localStorage.setItem("login",kta);
 location.href=kta==="0812180001"?"dev.html":"dashboard.html";
let selectedKta = "";

function showStep(stepId) {
  document.getElementById("step-kta").style.display = "none";
  document.getElementById("step-create").style.display = "none";
  document.getElementById("step-login").style.display = "none";
  document.getElementById(stepId).style.display = "block";
}
function reset(){
 const kta=prompt("Nomor KTA");
 const p=prompt("Pesan");
 if(!kta||!p) return;
 location.href="mailto:diviganteng79@gmail.com?subject=Reset Sandi&body=No KTA:"+kta+"%0A"+p;
}

function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function initAuth() {
  await seedUsersIfNeeded();
  const devPassKey = "pass_0812180001";
  if (!localStorage.getItem(devPassKey)) {
    localStorage.setItem(devPassKey, "Devjsc");
  }
  showStep("step-kta");
  setHint("Masukkan nomor KTA untuk melanjutkan.");
}

async function checkKta() {
  await seedUsersIfNeeded();
  const kta = (document.getElementById("ktaCheck").value || "").trim();
  if (!kta) {
    alert("Isi nomor KTA terlebih dahulu");
    setHint("Nomor KTA wajib diisi.");
    return;
  }

  const user = findUserByKta(kta);
  if (!user) {
    alert("Nomor KTA belum terdaftar");
    setHint("Nomor KTA belum terdaftar oleh developer.");
    return;
  }

  selectedKta = kta;

  const savedPass = localStorage.getItem("pass_" + kta);
  if (!savedPass) {
    document.getElementById("newPass").value = "";
    document.getElementById("confirmPass").value = "";
    showStep("step-create");
    setHint("KTA terdaftar. Silakan buat kata sandi.");
    return;
  }

  document.getElementById("kta").value = kta;
  document.getElementById("pass").value = "";
  showStep("step-login");
  setHint("KTA terdaftar. Silakan login.");
}

function createPassword() {
  const kta = selectedKta;
  if (!kta) {
    alert("Nomor KTA belum dipilih");
    showStep("step-kta");
    return;
  }

  const p1 = document.getElementById("newPass").value;
  const p2 = document.getElementById("confirmPass").value;

  if (!p1 || !p2) {
    alert("Isi kata sandi dan ulangi kata sandi");
    return;
  }

  if (p1 !== p2) {
    alert("Ulangi kata sandi tidak sama");
    setHint("Pastikan kata sandi dan ulangi kata sandi sama.");
    return;
  }

  localStorage.setItem("pass_" + kta, p1);
  alert("Kata sandi berhasil dibuat");

  document.getElementById("kta").value = kta;
  document.getElementById("pass").value = "";
  showStep("step-login");
  setHint("Kata sandi tersimpan. Silakan login.");
}

async function login() {
  await seedUsersIfNeeded();
  const kta = (document.getElementById("kta").value || "").trim();
  const pass = document.getElementById("pass").value;

  if (!kta) {
    alert("Isi nomor KTA");
    return;
  }

  const user = findUserByKta(kta);
  if (!user) {
    alert("KTA tidak terdaftar");
    return;
  }

  const savedPass = localStorage.getItem("pass_" + kta);
  if (!savedPass) {
    alert("Kata sandi belum dibuat. Silakan buat kata sandi terlebih dahulu.");
    selectedKta = kta;
    showStep("step-create");
    return;
  }

  if (savedPass !== pass) {
    alert("Password salah");
    return;
  }

  localStorage.setItem("login", kta);
  location.href = kta === "0812180001" ? "dev.html" : "dashboard.html";
}

function reset() {
  const kta = prompt("Nomor KTA");
  const p = prompt("Pesan");
  if (!kta || !p) return;
  location.href =
    "mailto:diviganteng79@gmail.com?subject=Reset Sandi&body=No KTA:" +
    encodeURIComponent(kta) +
    "%0A" +
    encodeURIComponent(p);
}

initAuth();
