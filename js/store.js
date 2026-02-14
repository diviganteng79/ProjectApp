import {
  db,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "./firebase.js";

const USERS_COLLECTION = "users";

function isPermissionDenied(error) {
  return error?.code === "permission-denied" || String(error?.message || "").includes("Missing or insufficient permissions");
}

function withFirestoreGuidance(error) {
  if (isPermissionDenied(error)) {
    const e = new Error(
      "Akses database ditolak. Atur Firestore Rules agar halaman cek KTA bisa membaca collection users (minimal read untuk users)."
    );
    e.original = error;
    return e;
  }
  return error;
}

export function ktaToEmail(kta) {
  return `${String(kta).trim()}@kta.app`;
}

export async function seedUsersIfNeeded() {
  // No-op by design.
  // Data seeding should be done from Firebase Console/Admin context, not from public clients.
  // This keeps Firestore rules secure and avoids requiring unauthenticated write access.
  return Promise.resolve();
}

export async function getUsers() {
  try {
    const q = query(collection(db, USERS_COLLECTION), orderBy("nama"));
    const snap = await getDocs(q);
    return snap.docs.map((x) => x.data());
  } catch (error) {
    throw withFirestoreGuidance(error);
  }
}

export async function findUserByKta(kta) {
  try {
    const ref = doc(db, USERS_COLLECTION, String(kta).trim());
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    throw withFirestoreGuidance(error);
  }
}

export async function upsertUser(user) {
  try {
    const kta = String(user.no_kta).trim();
    const ref = doc(db, USERS_COLLECTION, kta);
    const existing = await getDoc(ref);
    await setDoc(
      ref,
      {
        ...user,
        no_kta: kta,
        foto: user.foto || "img/default.png",
        createdAt: existing.exists() ? existing.data().createdAt || serverTimestamp() : serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    throw withFirestoreGuidance(error);
  }
}

export function subscribeUsers(callback) {
  const q = query(collection(db, USERS_COLLECTION), orderBy("nama"));
  return onSnapshot(
    q,
    (snap) => {
      const users = snap.docs.map((x) => x.data());
      callback(users);
    },
    (error) => {
      throw withFirestoreGuidance(error);
    }
  );
}

export async function setUserPasswordStatus(kta, hasPassword = true) {
  try {
    const ref = doc(db, USERS_COLLECTION, String(kta).trim());
    await setDoc(
      ref,
      {
        no_kta: String(kta).trim(),
        hasPassword: Boolean(hasPassword),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    throw withFirestoreGuidance(error);
  }
}
