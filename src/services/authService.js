import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  isFirebaseConfigured,
} from "./firebase";

const CONFIG_ERROR_MESSAGE =
  "Firebase is not configured. Add VITE_FIREBASE_* values to your environment.";

function assertFirebaseConfigured() {
  if (!isFirebaseConfigured) {
    throw new Error(CONFIG_ERROR_MESSAGE);
  }
}

export function mapFirebaseUser(user) {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
  };
}

export async function registerWithEmail({
  email,
  password,
}) {
  assertFirebaseConfigured();

  const credentials =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  return mapFirebaseUser(credentials.user);
}

export async function loginWithEmail({
  email,
  password,
}) {
  assertFirebaseConfigured();

  const credentials =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return mapFirebaseUser(credentials.user);
}

export async function loginWithGoogle() {
  assertFirebaseConfigured();

  const credentials = await signInWithPopup(
    auth,
    googleProvider
  );

  return mapFirebaseUser(credentials.user);
}

export async function logoutUser() {
  assertFirebaseConfigured();
  await signOut(auth);
}

export function watchAuthState(onChange) {
  if (!isFirebaseConfigured) {
    onChange(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    onChange(mapFirebaseUser(user));
  });
}
