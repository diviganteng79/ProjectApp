const KTA_STORAGE_KEY = "kta_users_v1";

async function seedUsersIfNeeded() {
  if (localStorage.getItem(KTA_STORAGE_KEY)) return;
  try {
    const r = await fetch("data/kta.json", { cache: "no-store" });
    const d = await r.json();
    if (Array.isArray(d)) {
      localStorage.setItem(KTA_STORAGE_KEY, JSON.stringify(d));
      return;
    }
  } catch (_) {}
  localStorage.setItem(KTA_STORAGE_KEY, "[]");
}

function getUsers() {
  try {
    const raw = localStorage.getItem(KTA_STORAGE_KEY) || "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(KTA_STORAGE_KEY, JSON.stringify(users));
}

function findUserByKta(kta) {
  return getUsers().find((u) => u.no_kta === kta);
}

function upsertUser(user) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.no_kta === user.no_kta);
  if (idx >= 0) users[idx] = { ...users[idx], ...user };
  else users.push(user);
  saveUsers(users);
}
