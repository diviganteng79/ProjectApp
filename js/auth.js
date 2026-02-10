function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function initLoginForm() {
  await seedUsersIfNeeded();
  localStorage.setItem("pass_0812180001", "Devjsc");

  const pendingKta = (sessionStorage.getItem("pending_kta") || "").trim();
  if (pendingKta) {
    document.getElementById("kta").value = pendingKta;
  }
  setHint("Masukkan nomor KTA dan kata sandi.");
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
    alert("Kata sandi belum dibuat. Silakan cek KTA lagi.");
    sessionStorage.setItem("pending_kta", kta);
    location.href = "set-password.html";
    return;
  }

  if (savedPass !== pass) {
    alert("Password salah");
    return;
  }

  sessionStorage.removeItem("pending_kta");
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

initLoginForm();
