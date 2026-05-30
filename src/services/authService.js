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

function createConfigError() {
  return new Error(CONFIG_ERROR_MESSAGE);
}

function ensureFirebaseConfigured() {
  if (!isFirebaseConfigured || !auth) {
    return false;
  }

  return true;
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
  if (!ensureFirebaseConfigured()) {
    return Promise.reject(createConfigError());
  }

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
  if (!ensureFirebaseConfigured()) {
    return Promise.reject(createConfigError());
  }

  const credentials =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return mapFirebaseUser(credentials.user);
}

export async function loginWithGoogle() {
  if (
    !ensureFirebaseConfigured() ||
    !googleProvider
  ) {
    return Promise.reject(createConfigError());
  }

  const credentials = await signInWithPopup(
    auth,
    googleProvider
  );

  return mapFirebaseUser(credentials.user);
}

export async function logoutUser() {
  if (!ensureFirebaseConfigured()) {
    return;
  }
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
