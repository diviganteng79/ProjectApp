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
async function setupLoginForm() {
  await seedUsersIfNeeded();
  const ktaEl = document.getElementById("kta");
  const passEl = document.getElementById("pass");
  const hintEl = document.getElementById("hint");

  function refreshState() {
    const kta = ktaEl.value.trim();
    if (!kta) {
      passEl.disabled = true;
      passEl.placeholder = "Password";
      hintEl.textContent = "Isi nomor KTA terlebih dahulu.";
      return;
    }

    const u = findUserByKta(kta);
    if (!u) {
      passEl.disabled = true;
      hintEl.textContent = "Nomor KTA belum didaftarkan developer.";
      return;
    }

    passEl.disabled = false;
    const savedPass = localStorage.getItem("pass_" + kta);
    if (savedPass) {
      passEl.placeholder = "Password";
      hintEl.textContent = "Masukkan password untuk login.";
    } else {
      passEl.placeholder = "Buat password baru";
      hintEl.textContent = "Login pertama: buat password baru Anda.";
    }
  }

  ktaEl.addEventListener("input", refreshState);
  refreshState();
}
function reset(){
 const kta=prompt("Nomor KTA");
 const p=prompt("Pesan");
 if(!kta||!p) return;
 location.href="mailto:diviganteng79@gmail.com?subject=Reset Sandi&body=No KTA:"+kta+"%0A"+p;
}

async function login() {
  await seedUsersIfNeeded();
  const kta = document.getElementById("kta").value.trim();
  const pass = document.getElementById("pass").value;

  if (!kta) {
    alert("Isi nomor KTA");
    return;
  }

  const u = findUserByKta(kta);
  if (!u) {
    alert("KTA tidak terdaftar");
    return;
  }

  const key = "pass_" + kta;
  const savedPass = localStorage.getItem(key);

  if (!savedPass) {
    if (!pass) {
      alert("Login pertama, silakan buat password baru.");
      return;
    }
    localStorage.setItem(key, pass);
    alert("Password berhasil dibuat. Login berhasil.");
  } else if (savedPass !== pass) {
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

setupLoginForm();
