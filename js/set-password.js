function setHint(message) {
  document.getElementById("hint").textContent = message || "";
}

function getPendingKta() {
  return (sessionStorage.getItem("pending_kta") || "").trim();
}

async function initSetPassword() {
  await seedUsersIfNeeded();
  const kta = getPendingKta();
  if (!kta || !findUserByKta(kta)) {
    alert("Nomor KTA belum dipilih. Silakan cek KTA dulu.");
    location.href = "index.html";
    return;
  }
  setHint("Buat kata sandi untuk KTA: " + kta);
}

function createPassword() {
  const kta = getPendingKta();
  if (!kta) {
    alert("Nomor KTA belum dipilih.");
    location.href = "index.html";
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
    return;
  }

  localStorage.setItem("pass_" + kta, p1);
  alert("Kata sandi berhasil dibuat");
  location.href = "login.html";
}

initSetPassword();
