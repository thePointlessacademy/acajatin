// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOFY1qjGY0HILis8grqnQ7jVpoY7utlgs",
  authDomain: "pointlessacademy.firebaseapp.com",
  databaseURL: "https://pointlessacademy-default-rtdb.firebaseio.com",
  projectId: "pointlessacademy",
  storageBucket: "pointlessacademy.appspot.com",
  messagingSenderId: "303334837126",
  appId: "1:303334837126:web:3f346a76d65b77ec85ba07",
  measurementId: "G-TP5QJ2JP6G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore();
export const storage = getStorage(app);

export { auth, provider, db };
