import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUKxh3IYDi7AVuzELUCLdTvh9lNn8Uabo",
  // authDomain: "menuq-c9ede.firebaseapp.com",
  authDomain: "http://localhost:5173/",
  projectId: "menuq-c9ede",
  storageBucket: "menuq-c9ede.firebasestorage.app",
  messagingSenderId: "130853460127",
  appId: "1:130853460127:web:8b692106ac12f0d6636aaa",
  measurementId: "G-CL2XYP1T52"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);