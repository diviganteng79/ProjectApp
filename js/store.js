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

export function ktaToEmail(kta) {
  return `${String(kta).trim()}@kta.app`;
}

export async function seedUsersIfNeeded() {
  const devRef = doc(db, USERS_COLLECTION, "0812180001");
  const devSnap = await getDoc(devRef);
  if (!devSnap.exists()) {
    await setDoc(devRef, {
      no_kta: "0812180001",
      nama: "Developer",
      status: "Developer",
      join: "01/2024",
      foto: "img/default.png",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
}

export async function getUsers() {
  const q = query(collection(db, USERS_COLLECTION), orderBy("nama"));
  const snap = await getDocs(q);
  return snap.docs.map((x) => x.data());
}

export async function findUserByKta(kta) {
  const ref = doc(db, USERS_COLLECTION, String(kta).trim());
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function upsertUser(user) {
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
}

export function subscribeUsers(callback) {
  const q = query(collection(db, USERS_COLLECTION), orderBy("nama"));
  return onSnapshot(q, (snap) => {
    const users = snap.docs.map((x) => x.data());
    callback(users);
  });
}
