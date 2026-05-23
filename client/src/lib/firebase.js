import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSpZjF_43y3zlTohzGl460uYbZzqpNwIs",
  authDomain: "calvaryprema-9ed2d.firebaseapp.com",
  projectId: "calvaryprema-9ed2d",
  storageBucket: "calvaryprema-9ed2d.firebasestorage.app",
  messagingSenderId: "72077173332",
  appId: "1:72077173332:web:02a836a5c8e3034d9883c1",
  measurementId: "G-5XBGBPQ6Q9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analyticsPromise = isSupported().then((ok) => ok ? getAnalytics(app) : null);
export default app;
