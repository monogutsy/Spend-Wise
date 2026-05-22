import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredConfigKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "appId",
];

export const isFirebaseConfigured =
  requiredConfigKeys.every((key) =>
    Boolean(firebaseConfig[key])
  );

let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  const firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
}

export { auth, googleProvider };
