function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

async function initKtaCheck() {
  await seedUsersIfNeeded();
  localStorage.setItem("pass_0812180001", "Devjsc");
  setHint("Masukkan nomor KTA untuk lanjut.");
}

async function checkKta() {
  await seedUsersIfNeeded();
  const kta = (document.getElementById("ktaCheck").value || "").trim();
  if (!kta) {
    alert("Isi nomor KTA terlebih dahulu");
    return;
  }

  const user = findUserByKta(kta);
  if (!user) {
    alert("Nomor KTA belum terdaftar");
    setHint("Nomor KTA belum terdaftar oleh developer.");
    return;
  }

  sessionStorage.setItem("pending_kta", kta);
  const hasPass = localStorage.getItem("pass_" + kta);
  location.href = hasPass ? "login.html" : "set-password.html";
}

initKtaCheck();
